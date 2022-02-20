module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    colors: {
      'off-white': '#FFF4E9',
    },
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
};
