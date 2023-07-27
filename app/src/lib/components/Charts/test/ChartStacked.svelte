<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	import { chartConfig } from '../chart-config.js';
	import { chartLayout } from '../barCharts/chart-layout.js';

	// import sampleResponse from './data/24hC.json';

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		 script.onload = () => {

			const layout = {

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

				// common layout props
				...chartLayout
			};

			Plotly.newPlot( 'plot-container' , data, layout, chartConfig );
		};

	});
</script>

<div
	id="plot-container"
	class={ classNames( [
		'plot-container'
	] )}
/>