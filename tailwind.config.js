/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            blue: {
                light: '#03a9f41a',
                DEFAULT: '#03A9F4',
            },
            black: {
                DEFAULT: '#101112',
            },
            gray: {
                light: '#DADADA',
                DEFAULT: '#C2C2C2',
                dark: '#515151',
            },
            white: {
                light: "#F4F8FB",
                DEFAULT: '#FFFFFF',
            }
        },
        fontFamily: {
            sans: ['var(--font-inter)'],
        },
        borderRadius: {
            DEFAULT: '0.625rem',
        }
    },
  },
  plugins: [],
}
