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
			// const result = extractColumnToList(chartData);
			const hours = extractColumnToList(chartData, 0);

			const endDate = new Date("2024-03-04T00:00:00");
			const startDate = new Date(endDate.getTime() - 72*60*60*1000);

			const trace1 = {
				x: hours,
				y: extractColumnToList(chartData, 1),
				type: "bar",
				marker: {
					color: "#3ABCDE",
					size: 10,
					symbol: `
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="1" y="13" width="6" height="11" fill="#64B583"/>
							<rect x="9" y="8" width="6" height="16" fill="#64B583"/>
							<rect x="17" y="2" width="6" height="22" fill="#64B583"/>
						</svg>
					`,
				},
				name: 'EV Charger Energy (kWh)',
				hovertemplate: "On <b>%{x}</b><br>" + 'EV Charger Energy (kWh)' + "<b>%{y:.0f} kWh</b><extra></extra>"
			};

			const trace2 = {
				x: hours,
				y: extractColumnToList(chartData, 7),
				type: "bar",
				marker: {
					color: "#64B583"
				},
				name: 'Battery System Charging Energy (kWh)',
				hovertemplate: "On <b>%{x}</b><br>" + 'Battery System Charging Energy (kWh)' + " <b>%{y:.0f} kWh</b><extra></extra>"
			};

			const trace3 = {
				x: hours,
				y: extractColumnToList(chartData, 5),
				type: "bar",
				marker: {
					color: "#ffffff"
				},
				name: 'Building Energy (kWh)',
				hovertemplate: "On <b>%{x}</b><br>" + 'Building Energy (kWh)' + "<b>%{y:.0f} kWh</b><extra></extra>"
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
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
				},
				yaxis: {
					tick0: 20,
					dtick: 10,
					title: "kWh",
					color: "white",
					tickfont: {
						family: "Helvetica",
						color: "white",
						size: 15
					},
					fixedrange: true,
					gridcolor: 'rgba( 255, 255, 255, 0.1 )',
					linecolor: 'rgba( 255, 255, 255, 0.1 )',
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