/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		zIndex: {
			'100': 100
		},
		screens: {
			'xs': '200px',
			'sm': '450px',
			'md': '800px',
			'lg': '1024px',
		},

	},
	variants: {},
	plugins: [
		require('@tailwindcss/line-clamp'),
	]
}
