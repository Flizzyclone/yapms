<script lang="ts">
	import { CandidatesStore } from '$lib/stores/Candidates';
	import {
		CandidateModalStore,
		AddCandidateModalStore,
		PresetColorsModalStore,
		PresetColorsModalSelectedStore
	} from '$lib/stores/Modals';
	import { v4 as uuidv4 } from 'uuid';
	import ModalBase from '../ModalBase.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { dndzone, type DndEvent } from 'svelte-dnd-action'

	let id = 0;

	let newName = 'New Candidate';
	let newColors = [{id:0, color:'#000000'}];

	PresetColorsModalSelectedStore.subscribe((presetColors) => {
		if (presetColors.length !== 0) {
			newColors = presetColors.map((color) => {
				return {id: id++, color: color }
			});
		}
	});

	function addColor() {
		newColors = [...newColors, {id: ++id, color: '#000000'}];
	}

	function removeColor(index: number) {
		if (newColors.length > 1) {
			newColors = newColors.toSpliced(index, 1);
		}
	}

	function close() {
		if ($PresetColorsModalStore.open === true) {
			return;
		}
		$AddCandidateModalStore.open = false;
		$CandidateModalStore.open = true;
		newName = 'New Candidate';
		newColors = [{id:0, color:'#000000'}];
		id = 0;
	}

	function selectPresetColor() {
		$PresetColorsModalStore.open = true;
		$AddCandidateModalStore.open = false;
	}

	function confirm() {
		CandidatesStore.update((candidates) => [
			...candidates,
			{
				id: uuidv4(),
				defaultCount: 0,
				name: newName,
				margins: newColors.map((color) => {
					return { color: color.color };
				})
			}
		]);
		close();
	}

	function handleDrop(e: CustomEvent<DndEvent<{id: number, color:string}>>) {
		newColors = e.detail.items;
	}

	function handleLabelClick(event: Event & { currentTarget: EventTarget & HTMLLabelElement }) {
		const elem = document.getElementById(event.currentTarget.htmlFor);
		elem?.click();
	}
</script>

<ModalBase title="Add Candidate" store={AddCandidateModalStore} onClose={close}>
	<div slot="content" class="flex flex-col gap-4">
		<input
			type="text"
			placeholder="Candidate Name"
			class="input input-sm w-full"
			bind:value={newName}
		/>
		<div class="flex flex-row flex-wrap gap-4 justify-center" use:dndzone="{{items: newColors, dropTargetStyle:{}}}" on:consider="{handleDrop}" on:finalize="{handleDrop}">
			{#each newColors as color, index (color.id)}
				<div class="join">
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<label on:click={handleLabelClick} for="input-{color.id}" class="w-12 h-8 join-item" style="background: {color.color};">
						<input
							id="input-{color.id}"
							class="h-10 w-0"
							type="color"
							value={color.color}
							on:input={(change) => {
								color.color = change.currentTarget.value;
							}}
							on:change={(change) => {
								newColors[index].color = change.currentTarget.value;
							}}
						/>
					</label>
					<button
						class="btn btn-sm btn-error join-item"
						on:click={() => removeColor(index)}
						disabled={newColors.length === 1}
					>
						<Trash class="w-6 h-6" />
					</button>
				</div>
			{/each}
		</div>
	</div>
	<div slot="action" class="flex w-full gap-2">
		<button class="btn btn-secondary" on:click={selectPresetColor}> Preset Colors </button>
		<button class="btn btn-primary" on:click={addColor}>Add Color</button>
		<div class="grow"></div>
		<button class="btn btn-success" on:click={confirm}>Add Candidate</button>
	</div>
</ModalBase>
