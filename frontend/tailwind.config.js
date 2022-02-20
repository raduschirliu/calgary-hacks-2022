module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#FFF4E9',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
