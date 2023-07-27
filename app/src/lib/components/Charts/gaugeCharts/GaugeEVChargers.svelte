<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import { chartConfig } from '../chart-config';
	import { gaugeLayout } from './gauge-layout';

	import Loader1 from "$lib/components/Loaders/Loader1.svelte";

	import GaugeNeedle from "$lib/components/Charts/gaugeCharts/GaugeNeedle.svelte";

	// PROPS
	export let chartData = {};
	export let layoutProps: { [key: string]: any } = {};
	export let id: string;
	let isLoading = true;

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		const renderChart = ( string ) => {
			const guageColor    = "#3ABCDE";

			const trace1 = {
				type: "indicator",
				mode: "gauge",
				plot_bgcolor: "rgba(0,0,0,0)",
				value: chartData.ev_charger_load_kw,
				//         , font: { size: 16 } },
				gauge: {
					axis: {
						visible: false,
						range: [0, chartData.ev_charger_capacity_kw],
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
							range:[0, chartData.ev_charger_capacity_kw],
							color: "transparent",
							line: {
								color: guageColor,
								width: 1
							}
						}
					],
				}
			};

			const data = [trace1];

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
					text: `<span style="font-size: 14px; color: #E0E0E0;">${``}Delivering<span><br><span style="font-size: 20px;color: #fff;"><b>${''}230kW<span></b>`,
					// font: { size: 20 }
				},
				annotations:[
					{
						xref:'paper',
						yref:'paper',
						xanchor:'right',
						yanchor:'top',
						x: 1.1,
						y:.08,
						showarrow:false,
						text: `Est. Charging Capacity <br><b> ${ chartData.ev_charger_capacity_kw} kW</b>`
					},
					// {
					// 	xref:'paper',
					// 	yref:'paper',
					// 	xanchor:'center',
					// 	yanchor:'top',
					// 	x:.5,
					// 	y: 1.2,
					// 	showarrow:false,
					// 	text: sampleResponse.ev_charger_state + "<br><b>" + sampleResponse.ev_charger_load_kw + " kW</br>",
					// 	font: { size: 14 }
					// }
				],

				// passed in props
				...layoutProps
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
		<GaugeNeedle id={ `${id}-needle`} value={ chartData.ev_charger_load_kw/chartData.ev_charger_capacity_kw }/>
	{/if}
</div>

{#if isLoading }
	<!-- <Loading/> -->
	<Loader1/>
{/if}