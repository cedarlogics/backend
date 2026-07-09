/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ff0088',
          600: '#ff1493',
          700: '#ff4fa3',
          800: '#ff69b4',
          900: '#ff85c2',
        },
        dark: {
          bg: '#050308',
          secondary: '#0a0713',
          tertiary: '#10081d',
          card: '#151021',
          elevated: '#1b1029',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
