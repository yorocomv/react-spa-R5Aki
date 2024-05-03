import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  'html, body': {
    bg: '#dcd0c0',
    backgroundImage:
      "url(\"data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(34, 29%, 81%, 1)'/><path d='M46.2 20a6 7.5 0 0 1-6 7.5 6 7.5 0 0 1-5.8-7.5 6 7.5 0 0 1 5.9-7.5 6 7.5 0 0 1 6 7.5zM5.8 20a6 7.5 0 0 1-6 7.5A6 7.5 0 0 1-6 20a6 7.5 0 0 1 6-7.5A6 7.5 0 0 1 6 20zM26 40.3a6 7.5 0 0 1-6 7.5 6 7.5 0 0 1-5.9-7.5 6 7.5 0 0 1 6-7.5 6 7.5 0 0 1 6 7.5zM26-.3a6 7.5 0 0 1-6 7.5 6 7.5 0 0 1-5.9-7.5 6 7.5 0 0 1 6-7.5 6 7.5 0 0 1 6 7.5zM-5.7 47q2.5-1.5 5.4-1.5T5.2 47q2.5 1.6 4.6 3.4 2.2 2 4.7 3.5t5.5 1.6q3-.1 5.4-1.6c2.4-1.5 3.2-2.2 4.7-3.5q2.2-1.9 4.6-3.4 2.5-1.5 5.5-1.6 3 0 5.4 1.5V33.6q-2.5 1.5-5.4 1.6-3-.1-5.5-1.6T30.1 30t-4.7-3.4T20 25t-5.5 1.6c-2.5 1.6-3.2 2.2-4.7 3.4q-2.2 2-4.6 3.5Q2.7 35-.3 35.2q-3 0-5.4-1.6zM45.6-6.9q-2.5 1.5-5.4 1.5T34.7-7q-2.5-1.5-4.6-3.4-2.2-2-4.7-3.5-2.5-1.6-5.4-1.6-3 .1-5.5 1.6c-2.5 1.5-3.2 2.2-4.7 3.5Q7.6-8.5 5.2-7 2.7-5.5-.3-5.4q-3 0-5.4-1.5V6.4q2.5-1.5 5.4-1.6 3 .1 5.5 1.6T9.8 10t4.7 3.4T20 15t5.4-1.6c2.4-1.6 3.2-2.2 4.7-3.4q2.2-2 4.6-3.5 2.5-1.5 5.5-1.6 3 0 5.4 1.6z'  stroke-width='0.5' stroke='hsla(34, 13%, 66%, 1)' fill='none'/></pattern></defs><rect width='100vw' height='100lvh' transform='translate(0,0)' fill='url(%23a)'/></svg>\")",
    color: '#0e0e0e',
    fontFamily: '"Segoe UI Emoji", "BIZ UDPGothic", sans-serif',
    lineHeight: '1.75rem',
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // JSX スタイル
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  // グローバルスタイル
  globalCss,
});
