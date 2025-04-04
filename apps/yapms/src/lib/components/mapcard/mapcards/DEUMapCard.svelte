<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'Bundestag',
			routes: [
				{
					label: 'Bundestag 2021',
					route: '/app/deu/bundestag/2021269/blank'
				},
				{
					label: '2021 Results',
					modalLabel: '2021 Bundestag Results',
					route: '/app/deu/bundestag/2021269/results'
				}
			]	
		},
		{
			label: '',
			routes: [
				{
					label: 'Bundesrat',
					route: '/app/deu/bundesrat/2023001/blank'
				},
				{
					label: 'States',
					route: '/app/deu/states/2023001/blank'
				}
			]
		}	
	];

	const imageLinks = [
		{
			label: 'Reichstag by Guy Percival',
			route: 'https://www.publicdomainpictures.net/en/view-image.php?image=307270&picture=reichstag-building-in-berlin'
		},
		{
			label: 'Neuschwanstein Castle by Kylene Hashimoto',
			route: 'https://www.pexels.com/photo/white-castle-surrounded-by-trees-1334441/'
		}
	]
</script>

<MapCard
	name="Germany"
	bg="deu"
	{imageLinks}
	{groups}
/>
