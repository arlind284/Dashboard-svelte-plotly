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
			const barColor = "#64B583";

			const hours = extractColumnToList(chartData, 0)

			const trace1 = {
				x: hours,
				y:  extractColumnToList(chartData, 1),
				type: "bar",
				marker: {color: barColor},
				name: "Battery State of Charge (kWh and %)",
			};

			const trace2 = {
				x: hours,
				y:  extractColumnToList(chartData, 2),
				text:  extractColumnToList(chartData, 1),
				textposition: "none",
				type: "bar",
				marker: {color: barColor},
				name: "Battery State of Charge (kWh and %)",
				yaxis: "y2",
				showlegend: false,
				hovertemplate: "On <b>%{x}</b><br><br>battery was <b>%{y:.0f}%</b> full" + "<br>(<b>%{text:.0f} kWh</b> remaining)<extra></extra>"
			};
			const data = [trace1, trace2];

			const layout = {
				// common layout props
				...chartLayout,

				showlegend : true,
				font:{
					family:"Inter",
					color : 'white'
				},
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
					color: "white",
					tickfont: {
						size: 15,
					},
					dtick: 6 * 60 * 60 * 1000,
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
				},

				yaxis1: {
					tick0: 20,
					title: "kWh",
					color: "white",
					tickfont: {
						size: 15,
					},
					dtick: 20,
					side: "left",
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
					fixedrange: true,
				},
				yaxis2:{
					title: "%",
					overlaying:'n',
					showgrid: false,
					side:'right',
					showlegend: true,
					color: "white",
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