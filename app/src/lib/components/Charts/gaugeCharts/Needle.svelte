<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import sampleResponse from '../../../data/BS.json';

	import { chartConfig } from '../chart-config';
	import { gaugeLayout } from './gauge-layout';

	import { needle } from '$lib/components/Charts/shapes/needle';

	export let id: string;

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		script.onload = () => {
			const needleObj = needle( sampleResponse.inverter_power_kw / sampleResponse.site_load_kw * 100 );

			const data=[];

			const layout = {
				width: 280,
				height : 200,
				margin:{
					t:20, r : 20, b: 20, l: 20
				},
				shapes: [
					{
						...needleObj,
					}
				],
			};

			Plotly.newPlot( 'gauge-needle', data, layout, chartConfig );

		};

	});

</script>

<div
	id="gauge-needle"
	class={ classNames( [
		'plot-container'
	] )}
/>