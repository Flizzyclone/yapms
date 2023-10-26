<script lang="ts">
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';

	const projectionOptions = ['Mercator', 'Albers USA'];
</script>

<details class="collapse bg-base-200">
	<summary class="collapse-title text-xl font-medium">Import Options</summary>
	<div class="collapse-content">
		<div class="flex flex-col gap-2">
			<div class="form-control w-full">
				<label class="label flex-col cursor-pointer items-start justify-start space-y-2">
					<span class="label-text">Map Projection</span>
					<select
						class="select select-bordered w-full capitalize"
						bind:value={$ImportedSVGStore.options.projection}
					>
						{#each projectionOptions as projection}
							<option>{projection}</option>
						{/each}
					</select>
				</label>
			</div>
		</div>
	</div>
</details>
