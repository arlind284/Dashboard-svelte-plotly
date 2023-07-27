<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";
	import { needle } from '$lib/components/Charts/shapes/needle';

	import { chartConfig } from '../chart-config';
	import { gaugeLayout } from './gauge-layout';

	// PROPS
	export let id: string;
	export let value: number=0; // between 0 and 1

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		const renderChart = ( id: string ) => {
			const guageColor    = "transparent"

			const needleObj = needle( value * 100 );

			const trace1 = {
				type: "indicator",
				mode: "gauge",
				gauge: {
					axis: {
						visible: false,
					},
					bordercolor: guageColor,
					steps: [
						{
							range:[ 0, 0 ],
							color: "transparent",
						}
					],
				}
			};

			const data = [trace1]

			const layout = {
				height : 200,
				...gaugeLayout,
				margin:{
					t: 20, r : 20, b: 20, l: 20
				},
				paper_bgcolor : "transparent",
				shapes: [
					{
						...needleObj,
					}
				],
			};

			Plotly.newPlot( id, data, layout, chartConfig );
		}

		script.onload = () => {
			const chartEl = document.getElementById(id);
			chartEl ? renderChart( id ) : console.log( `chartEl #${ id } not found` );
		};

	});
</script>

<div
	id={ id }
	class={ classNames( [
		'GaugeNeedle',
		'plot-container',
		'flex justify-center',
	] )}
/>

<style lang="scss">
	.GaugeNeedle{
		position: absolute;
		bottom: -20px;
		left: 0;
	}
</style>