<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'House of Commons',
			routes: [
				{
					label: 'House of Commons',
					route: '/app/can/commons/next/blank'
				},
				{
					label: '2021 Results',
					modalLabal: '2021 Commons Results',
					route: '/app/can/commons/2021/results'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'Provinces',
					route: '/app/can/provinces'
				},
				{
					label: 'Senate',
					route: '/app/can/senate'
				}
			]
		}
	];

	const imageLinks = [
		{
			label: 'Parliament Hill by Tetyana Kovyrina',
			route: 'https://www.pexels.com/photo/photo-of-beige-and-green-castle-1045915/'
		},
		{
			label: 'Toronto by Andre Furtado',
			route: 'https://www.pexels.com/photo/high-rise-buildings-photo-800694/'
		},
		{
			label: 'Montreal by Cyrill',
			route: 'https://www.pexels.com/photo/skyscrapers-in-city-at-sunset-19739618/'
		},
		{
			label: 'Vancouver by Adi K',
			route: 'https://www.pexels.com/photo/bird-s-eye-view-photography-of-high-rise-buildings-2382868/'
		}
	]
</script>

<MapCard
	name="Canada"
	bg="can"
	{imageLinks}
	{groups}
/>
