/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  `./src/pages/**/*.{js,jsx,ts,tsx}`,
	  `./src/components/**/*.{js,jsx,ts,tsx}`,
	],
	theme: {
	  extend: {
		backgroundImage: {
		  'gradient': 'linear-gradient(to right,  #51ADC6, #006E9F)',
		},
		colors: {
		  primary: "#0270A0",
		  primaryHover: "#1d4ed8",
		  secondary: "#51ADC6",
		},
		boxShadow:{
		  helmi: "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02);"
		},
		screens: {
		  'max-765': { 'max': '765px' },
		},
	  },
	},
	plugins: [],
  }