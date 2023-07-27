<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import { chartConfig } from '../chart-config';
	import { chartLayout } from './chart-layout';

	import data72hEV from '$lib/data/72hEV.json';

	import { extractColumnToList } from '../chart-utils';

	import Loader1 from "$lib/components/Loaders/Loader1.svelte";

	// PROPS
	export let id: string = "chart-72h-ev4";
	export let chartData = data72hEV;
	let isLoading = true;

	onMount( () => {
		const script = document.createElement('script');
		script.src = "https://cdn.plot.ly/plotly-latest.min.js"
		document.head.append(script);

		const renderChart = ( id: string ) => {
			const barColor = "#3ABCDE";

			const hours = extractColumnToList(chartData, 0);

			const trace1 = {
				x: hours,
				y: extractColumnToList(chartData, 1),
				type: "bar",
				marker: {color: barColor},
				name: "Combined EV Charger Energy Consumption (kWh)",
				hovertemplate: "On <b>%{x}</b><br>EV Chargers Consumed <b>%{y:.0f} kWh</b><extra></extra>"
			};

			const data = [ trace1 ];

			const layout = {
				// common layout props
				...chartLayout,

				showlegend : true,
				legend : {
					x : 1, xanchor: 'auto',
					y : 1.1, yanchor: "bottom",
					traceorder : 'normal',
					font : {
						family : 'Helvetica',
						size : 14,
						color : 'white',
					}
				},
				xaxis: {
					title: "",
					type:"date",
					color: "white",
					tickfont: {
						family: "Helvetica",
						size: 14
					},
					dtick: 6 * 60 * 60 * 1000,
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
				},
				yaxis: {
					tick0: 20,
					title: "kWh",
					tickfont: {
						family: "Helvetica",
						size: 14
					},
					dtick: 20,
					color: "white",
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
					fixedrange: true,
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
	] )}
/>

{#if isLoading }
	<!-- <Loading/> -->
	<Loader1/>
{/if}