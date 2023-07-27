/** @type {import('tailwindcss').Config} */
export default {
  content: [
		'./src/**/*.{html,js,svelte,ts}'
	],
  theme: {
    extend: {},
		colors:{
			'transparent': 'transparent',
			'text': '#0F172A',
			'bg': '#040932',
			'black': '#000000',
			'white': '#ffffff',
			'gray-dark': '#526073',
			'gray-light': '#E0E0E0',
			'blue': '#052597',
			'green': '#A9D4B7',

			'swatch-1': '#64B583',
			'swatch-2': '#F59E0B',
			'swatch-3': '#ffffff',
			'swatch-4': '#3ABCDE',
			'swatch-5': '',
			'swatch-6': '#788AA2',
			'swatch-7': '#F5F3E8',
			'swatch-8': '#546EC8',
			'swatch-9': '#8EDBCD',
		},
		container:{
			center: true,
			padding: '20px',
			screens: {
        sm: '100%',
				// md: '768px',
				lg: '1366px',
        xl: '1728px',
      },
		}
  },
  plugins: [],
}

