<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	export let className: string = '';
	export let COLOR: string = '#64B583';

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		script.onload = () => {
			const data = [
				{
					type: 'bar',
					x: ['date1', 'date2', 'date3'],
					y: [20, 14, 23],
				}
			];
			const layout = {
				width: 500,
				height: 500,
				paper_bgcolor: 'transparent',
				plot_bgcolor: 'transparent',
			};
			Plotly.newPlot(
				'chart-bar-container',
				data,
				layout,
				{
					modeBarButtonsToRemove: [
						//2D
						'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d',
						//3D
						'zoom3d', 'pan3d', 'orbitRotation', 'tableRotation', 'handleDrag3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3',
						// Cartesian
						'hoverClosestCartesian', 'hoverCompareCartesian',
						// Geo
						'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo',
						// Other
						'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toImage', 'sendDataToCloud', 'toggleSpikelines', 'resetViewMapbox'
					],
					modeBarButtonsToAdd: [],
					displaylogo: false
				}
			);
		}
	});
</script>

<div
	id="chart-bar-container"
	class={ classNames( [ className ] )}
/>