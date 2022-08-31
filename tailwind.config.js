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
			'md': '800px',

		},
		
	},
	variants: {},
	plugins: [
		require('@tailwindcss/line-clamp'),
	]
}
