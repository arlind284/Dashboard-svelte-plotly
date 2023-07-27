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
			const hours = extractColumnToList( chartData, 0 );
			// Create traces for the three lines
			const trace1 = {
				x: hours,
				y: extractColumnToList(chartData, 1),
				name: 'Solar Generated (kW)<br><i>without battery </i>',
				type: 'scatter',
				line: {
					color: "F59E0B", width: 1
				},
				hovertemplate: "On <b>%{x}</b><br><br> you generated <b>%{y:.0f} kW</b></b> of solar<extra></extra>"
			};

			const trace2 = {
				x: hours,
				y: extractColumnToList(chartData, 2),
				name: 'Total On Site Production (kW)<br><i>with battery</i>',
				type: 'scatter',
				line: {color: "white", width: 3},
				hovertemplate: "On <b>%{x}</b><br> you producted a total of <b>%{y:.0f} kW</b><extra></extra>"
			};

			const data = [trace1, trace2];

			const layout = {
				// common layout props
				...chartLayout,
				title:{
					text:'Site Production (kW)',
					font: {color: 'FFFFFF'},
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
					family: "Helvetica"
				},
				xaxis:{
					tickfont:{
						color:'#FFFFFF'
					},
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
				},
				yaxis:{title: "kW",
					tickfont: {
					family: "Helvetica",
					size: 15},
					dtick: 20,
					color:'#FFFFFF',
					drange: [20, null],
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