import { writable } from 'svelte/store';

export const RegionTooltipStore = writable({
	delayElapsed: false,
    inRegions: false,
	content: "",
    x:0,
    y:0
});
