<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'National Assembly',
			routes: [
				{
					label: 'National Assembly 2019',
					route: '/app/zaf/assembly/2019128/blank'
				},
				{
					label: '2019 Results',
					modalLabel: '2019 National Assembly Results',
					route: '/app/zaf/assembly/2019128/results'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'Provinces',
					route: '/app/zaf/provinces'
				},
				{
					label: 'Municipalities',
					route: '/app/zaf/municipalities/2019275/blank'
				}
			]
		}
	];
</script>

<MapCard
	name="South Africa"
	bg="zaf"
	attribution="Photo by Clayton"
	attributionLink="https://www.pexels.com/photo/the-statue-of-nelson-mandela-on-the-union-buildings-grounds-pretoria-gauteng-south-africa-10527763/"
	{groups}
/>
