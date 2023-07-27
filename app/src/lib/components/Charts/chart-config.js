export const chartConfig = {
	responsive: true,
	displaylogo: false,
	scrollZoom: true,
	modeBarButtonsToRemove: [
		//2D
		// 'pan2d','zoom2d', 'resetScale2d'
		'select2d', 'lasso2d', 'autoScale2d', 'zoomIn2d', 'zoomOut2d',
		//3D
		'zoom3d', 'pan3d', 'orbitRotation', 'tableRotation', 'handleDrag3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3',
		// Cartesian
		'hoverClosestCartesian', 'hoverCompareCartesian',
		// Geo
		'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo',
		// Other
		// ,
		'hoverClosestGl2d', 'hoverClosestPie', 'resetViews', 'toggleHover', 'toImage', 'sendDataToCloud', 'toggleSpikelines', 'resetViewMapbox'
	],
};
