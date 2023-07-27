<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import { chartConfig } from '../chart-config';
	import { chartLayout } from './chart-layout';

	import sampleResponse from '../../../data/PC.json';

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
			// const result = extractColumnToList(sampleResponse);
			const hours = extractColumnToList(sampleResponse, 0);

			const endDate = new Date("2024-03-04T00:00:00");
			const startDate = new Date(endDate.getTime() - 72*60*60*1000);

			const seriesName1 = "Building Energy Consumption (kWh)"
			const seriesName2 = "Battery Energy Charged (kWh)"
			const seriesName3 = "EV Charger Energy Delivered (kWh)"

			const trace1 = {
				x: hours,
				y: extractColumnToList(sampleResponse, 1),
				type: "bar",
				marker: { color: "#3ABCDE" },
				name: seriesName1,
				hovertemplate: "On <b>%{x}</b><br>" + seriesName1 + "<b>%{y:.0f} kWh</b><extra></extra>"
			};

			const trace2 = {
				x: hours,
				y: extractColumnToList(sampleResponse, 7),
				type: "bar",
				marker: {color: "#64B583"},
				name: seriesName2,
				hovertemplate: "On <b>%{x}</b><br>" + seriesName2 + " <b>%{y:.0f} kWh</b><extra></extra>"
			};

			const trace3 = {
				x: hours,
				y: extractColumnToList(sampleResponse, 5),
				type: "bar",
				marker: {color: "#ffffff" },
				name: seriesName3,
				hovertemplate: "On <b>%{x}</b><br>" + seriesName3 + "<b>%{y:.0f} kWh</b><extra></extra>"
			};

			const data = [trace3, trace1, trace2];

			const layout = {
				barmode: "stack",
				// common layout props
				...chartLayout,

				showlegend : true,
				bargap: 0.35,
				legend : {
					x : 1, xanchor: 'auto',
					y : 1.1, yanchor: "bottom",
					traceorder : 'normal',
					orientation: "h",
					font : {
						family : 'Helvetica',
						size : 14,
						color : 'white'
					},
				},
				xaxis: {
					title: "",
					type: "date",
					color: "white",
					tickfont: {
						family: "Helvetica",
						size: 18
					},
					dtick: 6 * 60 * 60 * 1000,
					tickformat: '%I% %p',
				},
				yaxis: {
					tick0: 20,
					title: "kWh",
					color: "white",
					dtick: 20,
					tickfont: {
						family: "Helvetica",
						color: "white",
						size: 15
					},
					fixedrange: true,
				},

				// common layout props
				...chartLayout
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