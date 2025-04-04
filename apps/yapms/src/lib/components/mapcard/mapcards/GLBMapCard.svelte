<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'Countries (UN)',
					route: '/app/glb/countries/2020078/blank'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'Countries (NE)',
					route: '/app/glb/countries/2020078/natural_earth'
				}
			]
		}
	];
</script>

<MapCard
	name="World"
	bg="glb"
	attribution="Photo by hallidayfineart"
	attributionLink="https://www.lse.ac.uk/News/Latest-news-from-LSE/2022/i-September-22/New-survey-finds-public-support-for-increasing-UN-authority-over-member-states"
	{groups}
/>
