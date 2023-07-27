<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import { chartConfig } from '../chart-config';
	import { chartLayout } from './chart-layout';

	import { extractColumnToList } from '../chart-utils';

	import Loader1 from '$lib/components/Loaders/Loader1.svelte';
	import data72hS from '$lib/data/72hS.json';

	// PROPS
	export let id: string;
	export let chartData = data72hS;
	let isLoading = true;

	onMount( () => {
		const script = document.createElement('script');
		script.src = "https://cdn.plot.ly/plotly-latest.min.js"
		document.head.append(script);

		const renderChart = ( id: string ) => {
			const barColor = "#F59E0B";

			// const result = extractColumnToList(sampleResponse);

			const hours = extractColumnToList(chartData, 0);

			const trace1 = {
				x: hours,
				y: extractColumnToList(chartData, 1),
				type: "bar",
				marker: {color: barColor},
				name: "Solar Generation (kWh)",
				hovertemplate: "On <b>%{x}</b><br>solar generated <b>%{y:.0f} kWh</b><extra></extra>"
			};

			const data = [ trace1 ];

			const layout = {
				//title: "72 Hour Solar Generation Data",
				// common layout props
				...chartLayout,

				showlegend : true,
				legend : {
					x : 1, xanchor: 'auto',
					y : 1.1, yanchor: "bottom",
					traceorder : 'normal',
					font : {
						family : 'Helvetica', // This is probably not inline with the Figma
						size : 14, // This is probably not inline with the Figma
						color : 'white' // This is probably not inline with the Figma
					}
				},
				xaxis: {
					title: "",
					type:"date",
					tickfont: {
						family: "Helvetica",
						color: "white",
						size: 18
					},
					dtick: 6 * 60 * 60 * 1000,
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
				},
				yaxis: {
					tick0: 20,
					title: "kWh",
					color: "white",
					tickfont: {
						family: "Helvetica", // This is probably not inline with the Figma
						size: 15,
					}, // This is probably not inline with the Figma
					dtick: 20,
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