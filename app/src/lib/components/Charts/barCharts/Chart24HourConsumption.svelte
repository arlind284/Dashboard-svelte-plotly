<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import { chartConfig } from '../chart-config';
	import { chartLayout } from './chart-layout';

	import sampleResponse from "$lib/data/24hC.json";

	import { extractColumnToList } from '../chart-utils';

	import Loader1 from "$lib/components/Loaders/Loader1.svelte";

	// PROPS
	export let id: string='chart-24h-consumption';
	export let chartData = sampleResponse;
	let isLoading = true;

	onMount( () => {
		const script = document.createElement('script');
		script.src = "https://cdn.plot.ly/plotly-latest.min.js"
		document.head.append(script);

		const renderChart = ( id: string ) => {
			const hours = extractColumnToList( chartData, 0);

			// Create traces for the three lines
			const trace1 = {
				x: hours,
				y: extractColumnToList(chartData, 5),
				name: 'Site Load (kW) (kW)<br><i>Including EV Charger load</i>',
				type: 'scatter',
				line: {
					color: "546EC8"
				},
				hovertemplate: "On <b>%{x}</b><br>Site load was <b>%{y:.0f} kW</b></b><extra></extra>"
			};

			const trace2 = {
				x: hours,
				y: extractColumnToList(chartData, 3),
				name: 'Imported from Grid (kW)<br><i>Billed Meter</i>',
				type: 'scatter',
				line: {
					color: "788AA1",
					width: 3
				},
				hovertemplate: "On <b>%{x}</b><br> your were billed for <b>%{y:.0f} kW</b><br> after offsetting site demand with your solar and battery</b><extra></extra>"
			};

			const trace3 = {
				x: hours,
				y: extractColumnToList( chartData, 0),
				name: 'EV Charger Load (kW)<br><i></i>',
				type: 'scatter',
				line: {
					color: "3ABCDE",
					width: 1,
					dash: "dot"
				},
				hovertemplate: "On <b>%{x}</b><br>Total EV Charger load was <b>%{y:.0f} kW</b><extra></extra>"
			};

			const data = [trace1, trace2, trace3];

			const layout = {
				// common layout props
				...chartLayout,
				title:{
					text:'Site Consumption (kW)',
					font: { color: 'FFFFFF' },
					xanchor:'left',
					yanchor:'top',
					family: "Helvetica",
					//xref:'paper',
					//yref:'paper',
					x:.05,
					// y:-0.05
				},
				legend:	{
					font: {color: "FFFFFF"},
					orientation:'h',
					xanchor:'right',
					yanchor:'top',
					x: 1,
					y: 1.15,
					family: "Helvetica",
					legend_tracegroupgap: 15
				},
				xaxis:{
					tickfont:{
						color:'#FFFFFF'
					},
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
				},
				yaxis:{
					title: "kW",
					tickfont: {
						family: "Helvetica",
						size: 15
					},
					dtick: 5,
					// ticklen: 8,
					tickwidth: 1,
					color:'#FFFFFF',
					drange: [20, null],
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
					fixedrange: true,
				},

			};

			Plotly.newPlot( id , data, layout, chartConfig );
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