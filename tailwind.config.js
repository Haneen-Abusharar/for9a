/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	  ],
	theme: {
		screens: {
			'md': '800px',
		}
	},
	variants: {},
	plugins: [
		
	]
}
