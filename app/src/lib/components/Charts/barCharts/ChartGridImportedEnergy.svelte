<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import { chartConfig } from '../chart-config';
	import { chartLayout } from './chart-layout';

	import { extractColumnToList } from '../chart-utils';

	import Loader1 from "$lib/components/Loaders/Loader1.svelte";

	// PROPS
	export let id: string;
	export let chartData = {};
	let isLoading = true;

	onMount( () => {
		const script = document.createElement('script');
		script.src = "https://cdn.plot.ly/plotly-latest.min.js"
		document.head.append(script);

		const renderChart = ( id: string ) => {
			const hours = extractColumnToList(chartData, 0)

			const trace1 = {
				x: hours,
				y: extractColumnToList(chartData, 1),
				type: "bar",
				name: "Battery State of Charge (kWh and %)",
				marker: {
					color: "#788AA1",
				},
			};

			const data = [ trace1 ];

			const layout = {
				// common layout props
				...chartLayout,
				showlegend : false,
				font:{
					family:"Inter",
					color : 'white'
				},
				bargap: 0.35,
				legend : {
					x : 1, xanchor: 'auto',
					y : 1.1, yanchor: "bottom",
					traceorder : 'normal',
					font : {
							size : 14,
					}
				},
				xaxis: {
					title: "",
					type:"date",
					tickformat: '%I% %p',
					color: "white",
					tickfont: {
						size: 15,
					},
					dtick: 6 * 60 * 60 * 1000,
					tick0: 0,
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
				},

				yaxis: {
					side: "left",
					dtick: 10,
					title: "kWh",
					color: "white",
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
					tick0: 0,
					fixedrange: true,
					tickfont: {
						size: 15,
					},
				},
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

<div
	id={ id }
	class={ classNames( [
		'plot-container',
		'w-full',
	] ) }
/>

{#if isLoading }
	<!-- <Loading/> -->
	<Loader1/>
{/if}