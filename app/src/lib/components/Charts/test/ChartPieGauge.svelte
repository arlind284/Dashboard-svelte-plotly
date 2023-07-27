<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";
	import { needle } from './shapes/needle';

	export let className: string = '';
	export let COLOR: string = 'rgb(72, 210, 45)';
	export let VALUE: number = 70;

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		script.onload = () => {
			const needleObj = needle( VALUE );

			// const SCORE_VALUES = [
			// 	{ label: "Very poor", color: 'rgb(229, 60, 26)' },
			// 	{ label: "Poor", color: 'rgb(229, 128, 26)' },
			// 	{ label: "Average", color: 'rgb(229, 161, 26)' },
			// 	{ label: "Good", color: 'rgb(183, 210, 45)' },
			// 	{ label: "Excellent", color: 'rgb(72, 210, 45)' }
			// ];

			const SCORE_VALUES = [
				{ label: "Very poor", color: COLOR },
				{ label: "Poor", color: COLOR },
				{ label: "Average", color: COLOR },
				{ label: "Good", color: COLOR },
				{ label: "Excellent", color: COLOR }
			];

			const score_value = ({
				type: "indicator",
				mode: "number",
				value: VALUE,
				domain: {
					x: [0,1],
					y: [0.2,0.4]
				}
			})

			var data = [
				score_value,
				{
					values: [14, 14, 14, 14, 14, 30],
					labels: [...SCORE_VALUES.map(s => s.label), " " ],
					marker: {
						colors: [
							...SCORE_VALUES.map(s => s.color),
							'rgba(255, 255, 255, 0)'
						],
						line: {
								width: 0,
								color: '#040932'
						}
					},
					rotation: -126,
					name: "PieGauge",
					hole: 0.75,
					type: 'pie',
					direction: "clockwise",
					sort: false,
					showlegend: false,
					hoverinfo: "none",
					textinfo: "none",
					textposition: "outside",
				}
			];

			const layout = {
				width: 500,
				height: 500,
				paper_bgcolor: 'transparent',
				shapes: [
					{
						...needleObj
					}
				],
			};
			Plotly.newPlot(
				'chart-pie-gauge-container',
				data,
				layout
			);
		};
	});
</script>

<div
	id="chart-pie-gauge-container"
	class={ classNames( [ className ] )}
/>