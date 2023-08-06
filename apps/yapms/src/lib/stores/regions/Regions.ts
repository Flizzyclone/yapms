import type Region from '$lib/types/Region';
import { blendHexes, calculateLumaHEX } from '$lib/utils/luma';
import { derived, writable, get } from 'svelte/store';
import { TossupCandidateStore, CandidatesStore } from '../Candidates';
import { ModeStore } from '../Mode';
import { disableRegion, editRegion, fillRegion, lockRegion, splitRegion } from './regionActions';
import { InteractionStore } from '../Interaction';
import { browser } from '$app/environment';

/**
 * Stores the state of all regions.
 */
export const RegionsStore = writable<Region[]>([]);

/**
  When the region store changes,
  update the colors of the regions in the DOM
*/
RegionsStore.subscribe((regions) => {
	if (browser) {
		const patterns = document?.getElementById("map-div")?.querySelector('svg')?.querySelectorAll('pattern');
		patterns?.forEach((pattern) => pattern.remove());
	}
	
	regions.forEach((region) => {
		// reduce extra counts
		let totalVotes = region.candidates.reduce(
			(totalVotes, candidate) => totalVotes + candidate.count,
			0
		);
		const maxVotes = region.value;
		if (totalVotes < maxVotes) {
			// if there are less votes than the max, add the difference the tossup candidate
			region.candidates[0].count += region.value - totalVotes;
		} else if (totalVotes > region.value) {
			while (totalVotes > region.value) {
				for (const candidate of region.candidates) {
					if (candidate.count > 0) {
						candidate.count--;
						totalVotes--;
					}
					if (totalVotes <= region.value) {
						break;
					}
				}
			}
		}

		// get the winner(s) of the district
		const maxValue = region.candidates.reduce(
			(prev, current) => (prev > current.count ? prev : current.count),
			region.candidates[0].count
	  	);
		const winners = region.disabled
			? [{
					candidate: get(TossupCandidateStore),
					count: 0,
					margin: 0
			  }]
			: region.candidates.filter((candidate) => candidate.count === maxValue);


		// set the margin of the new winner
		let marginIndex = winners[0].margin ?? 0;
		if (marginIndex >= winners[0].candidate.margins.length) {
			marginIndex = winners[0].candidate.margins.length - 1;
		} else if (marginIndex < 0) {
			marginIndex = 0;
		}

		let fill = '';
		let lumaColor = '';
		if (winners.length === 1) {
			fill = winners[0].candidate.margins[marginIndex]?.color
			lumaColor = fill;
		} else {
			const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
			pattern.setAttribute('patternUnits','userSpaceOnUse');
			pattern.setAttribute('width',`${10*winners.length}`);
			pattern.setAttribute('height','10')
			pattern.setAttribute('patternTransform','rotate(45)')
			let name = 'repeat';
			winners.forEach((winner,i: number) => {
				const line = document.createElementNS('http://www.w3.org/2000/svg','line')
				line.setAttribute('stroke',winner.candidate.margins[0].color);
				line.setAttribute('x1',`${5+(10*i)}`);
				line.setAttribute('x2',`${5+(10*i)}`);
				line.setAttribute('y1','0');
				line.setAttribute('y2','10');
				line.setAttribute('stroke-width',`10`);
				pattern.appendChild(line);
				name += `-${winner.candidate.id}`;
			})
			pattern.setAttribute('id',name);
			const mapSVG = document?.getElementById("map-div")?.querySelector('svg');
			mapSVG?.appendChild(pattern);
			fill = `url(#${name})`;
			const colors = winners.map((winner) => winner.candidate.margins[0].color);
			lumaColor = `#${blendHexes(colors)}`;
		}

		region.nodes.region.style.fill = fill;
		region.disabled || region.locked || region.permaLocked
			? (region.nodes.region.style.fillOpacity = '0.25')
			: (region.nodes.region.style.fillOpacity = '1'); //Transparent if disabled
		if (region.nodes.button) {
			region.nodes.button.style.fill = fill;
			region.disabled || region.locked || region.permaLocked
				? (region.nodes.button.style.fillOpacity = '0.25')
				: (region.nodes.button.style.fillOpacity = '1'); //Transparent if disabled
		}
		if (region.nodes.text) {
			region.nodes.text.style.color =
				calculateLumaHEX(lumaColor) > 0.5 ? 'black' : 'white';
			const valueText = region.nodes.text.querySelector('[value-text]');
			if (valueText) {
				valueText.innerHTML = region.value.toString();
			}
			region.permaLocked
				? (region.nodes.text.style.opacity = '0')
				: (region.nodes.text.style.opacity = '1');
		}
	});
});

/**
  When the region store changes,
  create a derived store that contains the count of each candidate.

  Candidates will be undefined if they are not in the region store
 */
export const CandidateCounts = derived(RegionsStore, ($RegionStore) => {
	const candidates = new Map<string, number>(); //Use default counts if included in map
	for (const candidate of get(CandidatesStore)) {
		candidates.set(candidate.id, candidate.defaultCount);
	}
	$RegionStore.forEach((region) => {
		region.candidates.forEach((candidate) => {
			const currentCount = candidates.get(candidate.candidate.id);
			if (currentCount !== undefined) {
				candidates.set(candidate.candidate.id, currentCount + candidate.count);
			} else {
				candidates.set(candidate.candidate.id, candidate.count);
			}
		});
	});
	return candidates;
});

/**
 * When the region store changes,
 * create a derived store that contains the count of each candidate for each margin.
 *
 * Candidates will be undefined if they are not in the region store.
 */
export const CandidateCountsMargins = derived(RegionsStore, ($RegionStore) => {
	const candidates = new Map<string, number[]>();
	for (const candidate of get(CandidatesStore)) {
		//Account for default counts
		candidates.set(candidate.id, [candidate.defaultCount]);
	}
	$RegionStore.forEach((region) => {
		region.candidates.forEach((candidate) => {
			const currentCount = candidates.get(candidate.candidate.id);
			if (currentCount !== undefined) {
				if (currentCount[candidate.margin] === undefined) {
					currentCount[candidate.margin] = candidate.count;
				} else {
					currentCount[candidate.margin] += candidate.count;
				}
				candidates.set(candidate.candidate.id, currentCount);
			} else {
				const newCounts: number[] = [];
				newCounts[candidate.margin] = candidate.count;
				candidates.set(candidate.candidate.id, newCounts);
			}
		});
	});
	return candidates;
});

export const setPointerEvents = (): void => {
	const regions = get(RegionsStore);
	for (const region of regions) {
		if (region.permaLocked) {
			continue;
		}

		region.nodes.region.onclick = () => {
			const currentMode = get(ModeStore);
			switch (currentMode) {
				case 'fill':
					fillRegion(region.id, true);
					break;
				case 'split':
					splitRegion(region.id);
					break;
				case 'edit':
					editRegion(region.id);
					break;
				case 'disable':
					disableRegion(region.id);
					break;
				case 'lock':
					lockRegion(region.id);
					break;
			}
		};

		region.nodes.region.onmousemove = () => {
			const currentMode = get(ModeStore);
			const currentInteractions = get(InteractionStore);
			if (currentMode === 'fill' && currentInteractions.has('KeyF')) {
				fillRegion(region.id, false);
			}
		};

		if (region.nodes.button !== null) {
			region.nodes.button.onpointerdown = region.nodes.region.onpointerdown;
			region.nodes.button.onmousedown = region.nodes.region.onmousedown;
		}
	}
};

export const setTransitionStyle = (): void => {
	const regions = get(RegionsStore);
	for (const region of regions) {
		region.nodes.region.style.transition = 'fill 0.2s ease-in-out';
		if (region.nodes.text !== null) {
			for (const child of region.nodes.text.children) {
				(child as HTMLElement).style.transition = 'color 0.2s ease-in-out';
			}
			region.nodes.text.style.transition = 'fill 0.2s ease-in-out';
		}
		if (region.nodes.button !== null) {
			region.nodes.button.style.transition = 'fill 0.2s ease-in-out';
		}
	}
};

export const setCursorStyle = (): void => {
	const regions = get(RegionsStore);
	for (const region of regions) {
		region.nodes.region.style.cursor = 'pointer';
		if (region.nodes.text !== null) {
			region.nodes.text.style.pointerEvents = 'none';
		}
		if (region.nodes.button !== null) {
			region.nodes.button.style.cursor = 'pointer';
		}
	}
};
