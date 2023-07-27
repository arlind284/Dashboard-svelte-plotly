// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	const Plotly:{
		newPlot: (
			id?: string, data: unknown[],
			layout?: unknown,
			config?: unknown,
			newPlot?: ( id: string, data: unknown, layout: unknown ) => void
		) => void;
	}
}

export {};
