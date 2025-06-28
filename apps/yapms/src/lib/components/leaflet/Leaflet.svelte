<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import 'leaflet/dist/leaflet.css';

    let L = $state(undefined);

    //TODO: type annotation!
    let map = $state<L.map | undefined>(undefined);
    let mapElement = $state<HTMLDivElement | undefined>(undefined);

    onMount(async () => {
        const L = await import('leaflet');
        map = L.map(mapElement, {zoomSnap: 0.01})
        //map.setView([-41.47207765, 146.15880365], 7.5);
        //set base params
        map.fitBounds([
            [ -43.739252389491554, 143.818166672005248],
            [ -39.202931919803987, 148.499155371827044]
        ], {padding: [4,4]})

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    })

    onDestroy(() => {
        map?.remove();
        map = undefined;
    })
</script>

<div class="w-full h-full" bind:this={mapElement}>

</div>