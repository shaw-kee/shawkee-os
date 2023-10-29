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
    extend: {},
  },
  plugins: [],
};
