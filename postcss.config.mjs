/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009', // Purane browsers ke liye flexbox fix
    },
    'postcss-preset-env': {
      stage: 1, // Maximum modern features ko purani CSS mein badalne ke liye
      features: {
        'custom-properties': false, // Tailwind variables ko safe rakhne ke liye
      },
    },
  },
};

export default config;