<script lang="ts">
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import { importfromStatesFun } from '$lib/utils/importMap';

	export let load: Function;
	export let loading: boolean;

	let statesFunFiles: FileList;
</script>

<details class="collapse bg-base-200">
	<summary class="collapse-title text-xl font-medium">Tool-Specific Imports</summary>
	<div class="collapse-content">
		<div class="flex flex-col gap-2">
			<h3 class="font-light text-lg">
				Open from <a class="underline" href="https://tonymoo2228.github.io/StatesFun/">Statesfun</a>
			</h3>
			<div class="flex flex-row gap-x-2">
				<input
					type="file"
					accept=".json"
					class="file-input file-input-primary w-full"
					bind:files={statesFunFiles}
				/>
				<button
					class="btn btn-secondary gap-1 flex-nowrap"
					on:click={() => {
						load(importfromStatesFun, statesFunFiles);
					}}
					disabled={!statesFunFiles || statesFunFiles.length < 1 || loading}
				>
					<ArrowUpTray class="w-5 h-5" />
					<span>Load</span>
				</button>
			</div>
		</div>
	</div>
</details>
