<script lang="ts">
	import GaugeEvChargers from "$lib/components/Charts/gaugeCharts/GaugeEVChargers.svelte";
	import Panel from "$lib/components/Panel.svelte";

	import getData from "$lib/utils/getData";
	import dataIS from '$lib/data/IS.json';

</script>

	<h3 class="text-[27px] mb-[20px] w-full">150kW Max Capability EV Chargers</h3>
	<div class="grid grid-cols-4 gap-[30px] mb-[15px] w-full">
		<Panel className="bg-[#252951] !flex-initial flex !justify-center !items-center with-hover">
			<GaugeEvChargers id="ev-charger-1" chartData={ dataIS } layoutProps={ { title: { text: '<b>Charger 1</b>' }, margin:{	t:25, r : 20, b: 20, l: 20 }, annotations:[] } }/>
		</Panel>
		<Panel className="bg-[#252951] !flex-initial flex !justify-center !items-center with-hover">
			<GaugeEvChargers id="ev-charger-2" chartData={ dataIS } layoutProps={ { title: { text: '<b>Charger 2</b>' }, margin:{	t:25, r : 20, b: 20, l: 20 }, annotations:[] } }/>
		</Panel>
		<Panel className="bg-[#252951] !flex-initial flex !justify-center !items-center with-hover">
			<GaugeEvChargers id="ev-charger-3" chartData={ dataIS } layoutProps={ { title: { text: '<b>Charger 3</b>' }, margin:{	t:25, r : 20, b: 20, l: 20 }, annotations:[] } }/>
		</Panel>
		<Panel className="bg-[#252951] !flex-initial flex !justify-center !items-center with-hover">
			<GaugeEvChargers id="ev-charger-4" chartData={ dataIS } layoutProps={ { title: { text: '<b>Charger 4</b>' }, margin:{	t:25, r : 20, b: 20, l: 20 }, annotations:[] } }/>
		</Panel>
	</div>

	<h3 class="text-[27px] mb-[20px] w-full">100kW Max Capability EV Chargers</h3>
	<div class="grid grid-cols-4 gap-[30px] mb-[15px] w-full">
		<Panel className="bg-[#252951] !flex-initial flex !justify-center !items-center with-hover">
			<GaugeEvChargers id="ev-charger-5" chartData={ dataIS } layoutProps={ { title: { text: '<b>Charger 5</b>' }, margin:{	t:25, r : 20, b: 20, l: 20 }, annotations:[] } }/>
		</Panel>
		<Panel className="bg-[#252951] !flex-initial flex !justify-center !items-center with-hover">
			<GaugeEvChargers id="ev-charger-6" chartData={ dataIS } layoutProps={ { title: { text: '<b>Charger 6</b>' }, margin:{	t:25, r : 20, b: 20, l: 20 }, annotations:[] } }/>
		</Panel>
		<Panel className="bg-[#252951] !flex-initial flex !justify-center !items-center with-hover">
			<GaugeEvChargers id="ev-charger-7" chartData={ dataIS } layoutProps={ { title: { text: '<b>Charger 7</b>' }, margin:{	t:25, r : 20, b: 20, l: 20 }, annotations:[
				{
					xref:'paper',
					yref:'paper',
					xanchor:'right',
					yanchor:'top',
					x: 1.1,
					y:.08,
					showarrow:false,
					text: `Max Capacity<br><b>250kW</b>`
				},] } }/>
		</Panel>
	</div>