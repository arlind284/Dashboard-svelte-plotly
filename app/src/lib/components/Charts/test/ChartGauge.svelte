<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";
	import { needle } from './shapes/needle';

	export let className: string = '';
	export let VALUE: number = 70;
	export let COLOR: string = 'rgb(72, 210, 45)';

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		script.onload = () => {
			const needleObj = needle( VALUE );
			const data = [
				{
					domain: { x: [0, 1], y: [0, 1] },
					value: VALUE,
					title: { text: "Speed" },
					type: "indicator",
					mode: "gauge+number",
					delta: { reference: 400 },
					gauge: { axis: { range: [ 0, 600] } }
				}
			];

			const layout = {
				width: 500,
				height: 500,
				paper_bgcolor: 'transparent',
				shapes: [
					{
						...needleObj,
						// xsizemode: 'pixel',
						// ysizemode: 'pixel',
						// x0: 250,
						// y0: 0,
						// x1: 250,
						// y1: 400,
					}
				],
			};
			Plotly.newPlot(
				'chart-gauge-container',
				data,
				layout,
				{
					responsive: true,
					modeBarButtonsToRemove: ['toImage'],
					modeBarButtonsToAdd: [],
					displaylogo: false
				}
			);
		};


	});
</script>

<div
	id="chart-gauge-container"
	class={ classNames( [ className ] )}
/>