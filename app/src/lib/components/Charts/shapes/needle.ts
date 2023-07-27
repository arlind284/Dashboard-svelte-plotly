// https://observablehq.com/@arronhunt/building-a-gauge-meter-with-plotly

export const needle = ( VALUE: number ) => {
	const degrees = ( radians: number ) => radians * (180/ Math.PI);
	const radians = ( theta: number ) => theta * Math.PI / 180;

	const mapData = ( value: number ) => value * (285 - 35) / 100 - 35;

	function drawBezierSemicircle( x0 :number,y0 :number,x1 :number,y1 :number ) {
		const c = 0.551915024494;

		// Find the distance between the points (hypotenuse)
		const d = Math.hypot((x0-x1),(y0-y1))
		// Scale the control handle radius by multiplying the diameter by `c`
		const r = d/2 * c
		// The midpoint of the baseline
		const mid = [(x0+x1)/2,(y0+y1)/2]
		// Returns positive 1 if up, and -1 if down
		const direction = ((x0 < x1) ? 1 : -1);
		// Calculate the overall rotation of the circle
		const rot = degrees(Math.atan((y1-mid[1])/(x1-mid[0])));
		// The parallel angle to the rotation
		const rotParallel = radians((direction * 90) + rot);
		// The apex of the semicircle
		const apex = [Math.cos(rotParallel)*(d/2)+mid[0],Math.sin(rotParallel)*(d/2)+mid[1]]

		// Each anchor point needed to draw two bezier curves that make up the semicircle
		const p0 = [x0+Math.cos(rotParallel)*r,y0+Math.sin(rotParallel)*r];
		const p1 = [apex[0]-Math.cos(radians(rot))*r*direction,apex[1]-Math.sin(radians(rot))*r*direction]
		const p2 = [apex[0]+Math.cos(radians(rot))*r*direction,apex[1]+Math.sin(radians(rot))*r*direction]
		const p3 = [x1+Math.cos(rotParallel)*r,y1+Math.sin(rotParallel)*r];
		return ({
			structs: `
				M ${x0},${y0}
				L ${x1},${y1}
				M ${mid[0]},${mid[1]}
				L ${apex[0]} ${apex[1]}
			`,
			handles: `
				M ${x0},${y0}
				L ${p0[0]},${p0[1]}
				M ${apex[0]},${apex[1]}
				L ${p1[0]} ${p1[1]} 
				M ${apex[0]},${apex[1]}
				L ${p2[0]} ${p2[1]}
				M ${x1},${y1}
				L ${p3[0]} ${p3[1]}
			`,
			path: `
				M ${x0},${y0}
				C ${p0[0]},${p0[1]}
					${p1[0]},${p1[1]}
					${apex[0]} ${apex[1]}
				C ${p2[0]} ${p2[1]}
					${p3[0]} ${p3[1]}
					${x1} ${y1}
			`
		});
	}

	const needle = {
		type: 'path',
		path: ( () => {
			const radius = 0.35;
			const size = 0.025;

			const theta = mapData( VALUE );
			const rads = radians(theta);
			const x1 = -1 * radius * Math.cos(rads) + 0.5;
			const y1 = radius * Math.sin(rads) + 0.5;
			const p0 = [-1 * size * Math.cos(radians(theta-90)) + 0.5,
								size * Math.sin(radians(theta-90)) + 0.5]
			const p1 = [-1 * size * Math.cos(radians(theta+90)) + 0.5,
								size * Math.sin(radians(theta+90)) + 0.5]
			return `
				M ${x1} ${y1}
				L ${p0[0]} ${p0[1]}
				L ${p1[0]} ${p1[1]}
				${drawBezierSemicircle(p1[0],p1[1],p0[0],p0[1]).path}
				Z`;
		} )(),
		fillcolor: '#fff',
		line: {
			width: 0
		}
	};

	return needle;
}