<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

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
			const guageColor    = "#F59E0B"
			const trace1 = {
				type: "indicator",
				mode: "gauge",
				plot_bgcolor: "transparent",
				value: chartData.solar_generated_kw,
				//         , font: { size: 16 } },
				gauge: {
					axis: {
						visible: false,
						range: [0, chartData.total_solar_capacity_kw ],
					},
					bar: {
						color: guageColor,
						line: {width : 0},
						thickness: 1
					},
					borderwidth: 1,
					bordercolor: guageColor,
					steps:[
						{
							range:[0, chartData.total_solar_capacity_kw],
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
				height: 200,

				...gaugeLayout,

				margin:{
					t:20, r : 20, b: 20, l: 20
				},
				paper_bgcolor : "transparent",
				font:{
					color:"white",
					family:"Inter"
				},
				title: {
					text: `<span style="font-size: 14px; color: #E0E0E0;">${``}Generating<span><br><span style="font-size: 20px;color: #fff;"><b>${''}275kW<span></b>`,
					// font: { size: 20 }
				},
				annotations:[
					{
						xref:'paper',
						yref:'paper',
						xanchor:'right',
						yanchor:'top',
						x: 1.10,
						y:.08,
						showarrow:false,
						text: `Est. Solar Capacity <br><b> ${chartData.total_solar_capacity_kw} kW</b>`
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
		<GaugeNeedle id={ `${id}-needle`} value={ chartData.solar_generated_kw/chartData.total_solar_capacity_kw }/>
	{/if}

</div>

{#if isLoading }
	<!-- <Loading/> -->
	<Loader1/>
{/if}