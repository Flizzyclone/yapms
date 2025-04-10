<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'House of Commons',
			routes: [
				{
					label: 'Commons 2024',
					modalLabel: 'House of Commons 2024',
					route: '/app/gbr/commons/2024/blank'
				},
				{
					label: 'Commons 2019',
					modalLabel: 'House of Commons 2019',
					route: '/app/gbr/commons/2019/blank'
				},
				{
					label: '2024 Results',
					modalLabel: '2024 House of Commons Results',
					route: '/app/gbr/commons/2024185/results'
				},
				{
					label: '2019 Results',
					modalLabel: '2019 House of Commons Results',
					route: '/app/gbr/commons/2019/results'
				}
			]
		},
		{
			label: 'Counties',
			routes: [
				{
					label: 'Historic Counties',
					route: '/app/gbr/counties/1844/blank'
				},
				{
					label: 'Counties and Unitary Authorities',
					route: '/app/gbr/counties/2023/blank'
				}
			]
		}
	];

	const imageLinks = [
		{
			label: 'Palace of Westminster by derwiki',
			route: 'https://pixabay.com/photos/palace-london-parliament-big-ben-530055/'
		},
		{
			label: 'Tower Bridge by Kaique Rocha',
			route: 'https://www.pexels.com/photo/view-of-people-near-bayside-1563230/'
		},
		{
			label: 'Stonehenge by Bernd Feurich',
			route:
				'https://www.pexels.com/photo/photo-of-the-stonehenge-historical-landmark-in-england-2497520/'
		},
		{
			label: 'Edinburgh Castle by Frederick Adegoke Snr.',
			route: 'https://www.pexels.com/photo/edinburgh-castle-on-the-mountain-14643999/'
		}
	];
</script>

<MapCard name="United Kingdom" bg="gbr" {imageLinks} {groups} square />
