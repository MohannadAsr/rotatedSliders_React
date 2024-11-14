/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    container: {
      center: true,
    },

    extend: {
      colors: {
        primary: '#8E354C',
        primary_dark: '#6E293C',
        primary_darker: '#571B34',
        secondary: '#E4A328',
        secondary_light: '#E3C57D',
        secondary_dark: '#A27F3E',
        dark: '#2F2F2F',
        success: '#4BB543',
        third: '#FA7147',
        light: '#fff',
        warning: '#f0ad4e',
      },
      fontSize: {
        '20xl': '7rem',
      },
      container: {
        center: true,

        screens: {
          xl: '1240px',
        },
      },
    },
  },
  plugins: [],
};
