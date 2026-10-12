/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: { sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        navy:  '#00194C',
        ink:   '#3D4F74',
        brand: '#0164FF',
        deep:  '#002395',
        amber: '#FFAE00',
        gold:  '#E5BE1F',
        star:  '#F6D201',
        cream: '#F6F6EE',
        chip:  '#D9EEFF',
        card:  '#F9FCFF',
        edge:  '#E6F1FD',
        soft:  '#5965A7',
        foot:  '#1A2436',
      },
      maxWidth: { page: '1290px' },
    },
  },
  plugins: [],
};
