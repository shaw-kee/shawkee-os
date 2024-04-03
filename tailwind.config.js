/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['8px', '16px'],
      sm: ['12px', '20px'],
      md: ['16px', '24px'],
      lg: ['20px', '28px'],
    },
    extend: {
      colors: {
        'calc-function': '#676569E6',
        'calc-operator': '#ff970e',
        'calc-number': '#807e82E6',
      },
    },
  },
  plugins: [],
};
