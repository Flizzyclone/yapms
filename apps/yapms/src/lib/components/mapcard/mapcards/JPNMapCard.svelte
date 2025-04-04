<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'House 2024',
					modalLabel: 'House of Representatives 2024',
					route: '/app/jpn/house/2022330/blank'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'House 2021',
					modalLabel: 'House of Representatives 2021',
					route: '/app/jpn/house/2021305/blank'
				}
			]
		}
	];
</script>

<MapCard
	name="Japan"
	bg="jpn"
	attribution="Photo by Kakidai"
	attributionLink="https://en.wikipedia.org/wiki/National_Diet_Building#/media/File:National_Diet_Building_02.jpg"
	{groups}
/>
