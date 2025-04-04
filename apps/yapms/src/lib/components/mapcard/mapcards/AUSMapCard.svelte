<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'House of Reps',
			routes: [
				{
					label: 'House 2025',
					modalLabel: 'House of Representatives 2025',
					route: '/app/aus/house/2025001/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 House of Representatives Results',
					route: '/app/aus/house/2022/results'
				},
				
			]
		},
		{
			label: 'Senate',
			routes: [
				{
					label: 'Senate',
					route: '/app/aus/senate'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 Senate Results',
					route: '/app/aus/senate/2022/results'
				}
			]
		},
		{
			label: '2022 Elections',
			routes: [
				{
					label: 'Senate 2022',
					route: '/app/aus/senate/2022/blank'
				},
				{
					label: 'House 2022',
					modalLabel: 'House of Representatives 2022',
					route: '/app/aus/house/2022/blank'
				}
			]
		},	
		{
			label: '',
			routes: [
				{
					label: 'States & Territories',
					route: '/app/aus/states/2023/blank'
				}
			]
		}
	];

	const imageLinks = [
		{
			label: 'Parliament House by Ben McCarthy',
			route: 'https://commons.wikimedia.org/wiki/File:Parliament_house3.jpg'
		},
		{
			label: 'Sydney by Allyson Fernando',
			route: 'https://www.pexels.com/photo/drone-shot-of-the-famous-sydney-opera-house-in-australia-7549817/'
		},
		{
			label: 'Brisbane by Valeriia Miller',
			route: 'https://www.pexels.com/photo/photo-of-bridge-and-buildings-during-golden-hour-2516657/'
		},
		{
			label: 'Uluru by Jonas Schallenberg',
			route: 'https://www.pexels.com/photo/uluru-rock-formation-in-central-australia-6610368/'
		}
	]
</script>

<MapCard
	name="Australia"
	bg="aus"
	{imageLinks}
	{groups}
	full
/>
