import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  'html, body': {
    bg: '#dcd0c0',
    color: '#0e0e0e',
    fontFamily: '"Segoe UI Emoji", "BIZ UDPGothic", sans-serif',
    lineHeight: '1.75rem',
  },
  button: {
    color: { base: 'teal.950', _active: 'teal.100' },
    bg: { base: 'teal.400', _hover: 'teal.500', _active: 'teal.600' },
    fontWeight: 'bold',
    py: 1,
    px: 3,
    m: 0.5,
    borderRadius: 'sm',
    boxShadow: 'sm',
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
