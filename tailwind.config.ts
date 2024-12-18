import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		sm: '640px',
  		md: '768px',
  		lg: '960px',
  		xl: '1280px'
  	},
  	fontFamily: {
  		primary: 'var(--font-jetbrainsMono)'
  	},
  	extend: {
  		colors: {
  			light: {
  				primary: '#F8FAFC',
  				secondary: '#D9EAFD',
  				tertiary: '#BCCCDC',
  				text: '#272727'
  			},
  			dark: {
  				primary: '#1E201E',
  				secondary: '#3C3D37',
  				tertiary: '#697565',
  				text: '#ECDFCC'
  			},
  			text: {}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
} satisfies Config;
