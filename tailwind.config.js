/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        premiere: '#00005B',
        youtube: '#FF0000',
      },
    },
  },
  plugins: [],
};
