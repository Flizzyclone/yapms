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

	const imageLinks = [
		{
			label: 'UN Headquarters by Charles Parker',
			route: 'https://www.pexels.com/photo/modern-city-with-skyscrapers-and-residential-buildings-located-near-river-5847579/'
		},
		{
			label: 'Earth by Pixabay',
			route: 'https://www.pexels.com/photo/planet-earth-87651/'
		}
	];
</script>

<MapCard
	name="World"
	bg="glb"
	{imageLinks}
	{groups}
/>
