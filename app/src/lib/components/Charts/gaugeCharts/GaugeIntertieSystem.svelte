<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";
	import { needle } from '$lib/components/Charts/shapes/needle';
	
	import { chartConfig } from '../chart-config';
	import { gaugeLayout } from './gauge-layout';

	import Loader1 from "$lib/components/Loaders/Loader1.svelte";
	import GaugeNeedle from "$lib/components/Charts/gaugeCharts/GaugeNeedle.svelte";

	// PROPS
	export let chartData = {};
	export let id: string;
	let isLoading = true;

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		const renderChart = ( id: string ) => {
			const guageColor="#788AA1";

			// const needleObj = needle( chartData.grid_imported_kw / chartData.site_load_kw * 100 );

			const trace1 = {
				type: "indicator",
				mode: "gauge",
				value: chartData.grid_imported_kw,

				gauge: {
					axis: {
						visible: false,
						range: [0, chartData.site_load_kw ],
					},
					bar: {
						color: guageColor,
						line: {
							width : 0
						},
						thickness: 1
					},
					borderwidth: 1,
					bordercolor: guageColor,
					steps: [
						{
							range:[ 0, chartData.grid_imported_kw ],
							color: "transparent",
							line: {
								color: guageColor,
								width: 1
							}
						}
					],
				}
			};

			const data = [trace1]

			const layout = {
				// width : '100%',
				// automargin: true,
				height : 200,

				...gaugeLayout,

				margin:{
					t: 20, r : 20, b: 20, l: 20
				},
				paper_bgcolor : "transparent",
				font:{
					color:"white",
					family:"Inter"
				},
				title: {
					text: `<span style="font-size: 14px; color: #E0E0E0;">${ chartData.grid_load_state }<span><br><span style="font-size: 20px;color: #fff;"><b>${ chartData.site_load_kw} kW<span></b>`,
					// font: { size: 20 }
				},
				// shapes: [
				// 	{
				// 		...needleObj,
				// 	}
				// ],
				annotations:[
					{
						xref:'paper',
						yref:'paper',
						xanchor:'right',
						yanchor:'top',
						x: 1.05,
						y:.08,
						showarrow:false,
						text: `Site Load <br><b> ${ chartData.site_load_kw } kW</b>`,
						font: {
							// size: 14
						}
					},
				]
			};

			Plotly.newPlot( id, data, layout, chartConfig );
		}

		script.onload = () => {
			isLoading = false;
			const chartEl = document.getElementById(id);
			chartEl ? renderChart( id ) : console.log( `chartEl #${ id } not found` );
		};

	});
</script>

<div class="div relative">
	<div
		id={ id }
		class={ classNames( [
			'plot-container',
			'flex justify-center'
		] )}
	/>

	{#if !isLoading }
		<GaugeNeedle id={ `${id}-needle`} value={ chartData.grid_imported_kw / chartData.site_load_kw }/>
	{/if}
</div>

{#if isLoading }
	<!-- <Loading/> -->
	<Loader1/>
{/if}