module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#FFF4E9',
        'peach': '#FF9677',
        'dark-peach': '#92675D'
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
