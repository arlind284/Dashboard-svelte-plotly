<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from "svelte";

	onMount( () => {
		const script = document.createElement('script');
   	script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   	document.head.append(script);

		 script.onload = () => {
			// basic gauge
			const maxValue      = 365;
			const currentValue  = 250;
			const stateText     = "Imported Grid Power"
			const maxText       = "Site Load"
			const guageColor    = "#788AA1"

			const trace1 = {
				type: "indicator",
				mode: "gauge",
				plot_bgcolor: "rgba(0,0,0,0)",
				value: currentValue,
				//         , font: { size: 16 } },
				gauge: {
					axis: {
						visible: false,
						range: [0, maxValue],
					},
					bar: {
						color: guageColor,
						line: { width : 0 },
						thickness: 1
					},
					borderwidth: 1,
					bordercolor: guageColor,
					steps:[
						{
							range:[0, currentValue],
							color: "transparent",
							line: {
								color: guageColor,
								width: 1
							}
						}
					],
				}
			};

			const data = [trace1]

			const layout = {
				width: 264,
				height: 230,
				automargin: true,
				margin:{t:50,r :35,l :35,b :25},
				paper_bgcolor : "transparent",
				font:{
					color: "white",
					family: "Arial"
				},
				annotations:[
					{
						xref:'paper',
						yref:'paper',
						xanchor:'right',
						yanchor:'top',
						x:1,
						y:.15,
						showarrow:false,
						text: maxText +"<br><b>" + maxValue + " kW</b>"
					},
					{
						xref:'paper',
						yref:'paper',
						xanchor:'center',
						yanchor:'top',
						x:.5,
						y: 1.2,
						showarrow:false,
						text: stateText + "<br><b>" + currentValue + " kW</br>",
						font: {
							size: 14
						}
					}
				]
			};

			const config = {
				responsive: true,
				displaylogo: false,
				modeBarButtonsToRemove: [
					//2D
					// 'pan2d','zoom2d',
					'select2d', 'lasso2d', 'autoScale2d', 'resetScale2d',  'zoomIn2d', 'zoomOut2d',
					//3D
					'zoom3d', 'pan3d', 'orbitRotation', 'tableRotation', 'handleDrag3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3',
					// Cartesian
					'hoverClosestCartesian', 'hoverCompareCartesian',
					// Geo
					'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo',
					// Other
					'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toImage', 'sendDataToCloud', 'toggleSpikelines', 'resetViewMapbox'
				],
			}

			Plotly.newPlot( 'plot-container', data, layout, config );

		};
	});
</script>

<div
	id="plot-container"
	class={ classNames( [
		'plot-container'
	] )}
/>