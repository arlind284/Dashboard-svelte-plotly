<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import { chartConfig } from '../chart-config';
	import { chartLayout } from './chart-layout';

	import sampleResponse from '../../../data/72hPP.json';

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
			const barColor1 = "#F59E0B"
			const barColor2 = "#64B583"

			// const result = extractColumnToList(sampleResponse);
			const hours = extractColumnToList( chartData, 0 );

			const trace1 = {
				x: hours,
				y: extractColumnToList(chartData, 1),
				type: "bar",
				marker: {color: barColor1},
				name: "Solar Energy Generated (kWh)",
				hovertemplate: "On <b>%{x}</b><br>" + "Solar Energy Generated (kWh)" + "<b>%{y:.0f} kWh</b><extra></extra>"
			};

			const trace2 = {
				x: hours,
				y: extractColumnToList(chartData, 2),
				type: "bar",
				marker: {color: barColor2},
				name: "Battery Energy Discharged (kWh)",
				hovertemplate: "On <b>%{x}</b><br>" + "Battery Energy Discharged (kWh)" + " <b>%{y:.0f} kWh</b><extra></extra>"
			};

			const data = [trace1, trace2];

			const layout1 = {
				//title: "72 Hour Solar Generation Data",
				showlegend : true,
				height: 530,
				plot_bgcolor: 'transparent',
				paper_bgcolor: 'transparent',
				legend : {
					x : 1, xanchor: 'auto',
					y : 1.1, yanchor: "bottom",
					traceorder : 'normal',
					font : {
						family : 'Helvetica', // This is probably not inline with the Figma
						size : 14, // This is probably not inline with the Figma
						color : '#000' // This is probably not inline with the Figma
					}
				},
				xaxis: {
					title: "", type:"date",
					tickfont: {
						family: "Helvetica",
						size: 18
					},
					dtick: 6 * 60 * 60 * 1000
				},
				yaxis: {
					tick0: 20,
					title: "kWh",
					tickfont: {
						family: "Helvetica", // This is probably not inline with the Figma
						size: 15
					}, // This is probably not inline with the Figma
					dtick: 20,
				},
			};

			const layout = {
				barmode: "stack",
				// common layout props
				...chartLayout,
				showlegend : true,
				height: 530,
				plot_bgcolor: '#040932',
				paper_bgcolor: '#040932',
				legend : {
					x : 1, xanchor: 'auto',
					y : 1.1, yanchor: "bottom",
					traceorder : 'normal',
					orientation: "h",
					font : {
						family : 'Helvetica',
						size : 14,
						color : 'white'
					}
				},
				xaxis: {
					title: "",
					type: "date",
					color: "white",
					dtick: 6 * 60 * 60 * 1000,
					tickfont: {
						family: "Helvetica",
						size: 18
					},
				},
				yaxis: {
					tick0: 20,
					title: "kWh",
					color: "white",
					tickfont: {
						family: "Helvetica",
						color: "white",
						size: 15
					},
					dtick: 20,
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