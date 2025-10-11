import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  html: {
    minHeight: '100lvh',
    backgroundColor: '#dcd0c0',
    backgroundImage:
      "linear-gradient(180deg, rgba(255, 255, 255, 0) 0lvh, rgba(35, 0, 0, 0) 75lvh, rgba(35, 0, 0, .2) 200lvh, rgba(35, 0, 0, .3) 300lvh), url('/bg.svg')",
    color: '#0e0e0e',
    fontFamily: '"Segoe UI Emoji", "BIZ UDPGothic", sans-serif',
    fontSize: 'clamp(12px, 1.74vw, 16px)',
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
    extend: {
      tokens: {
        shadows: {
          '2xs': {
            value: `
              0.5px 1px 1px hsl(0 0% 0% / 0.25)
            `,
          },
          xs: {
            value: `
              1px 2px 2px hsl(0 0% 0% / 0.25)
            `,
          },
          sm: {
            value: `
              1px 2px 2px hsl(0 0% 0% / 0.2),
              2px 4px 4px hsl(0 0% 0% / 0.2)
            `,
          },
          md: {
            value: `
              1px 2px 2px hsl(0 0% 0% / 0.18),
              2px 4px 4px hsl(0 0% 0% / 0.18),
              3px 6px 6px hsl(0 0% 0% / 0.18)
            `,
          },
          lg: {
            value: `
              1px 2px 2px hsl(0 0% 0% / 0.16),
              2px 4px 4px hsl(0 0% 0% / 0.16),
              4px 8px 8px hsl(0 0% 0% / 0.16),
              8px 16px 16px hsl(0 0% 0% / 0.16)
            `,
          },
          xl: {
            value: `
              2px 4px 4px hsl(0 0% 0% / 0.14),
              4px 8px 8px hsl(0 0% 0% / 0.14),
              8px 16px 16px hsl(0 0% 0% / 0.14),
              16px 32px 32px hsl(0 0% 0% / 0.14)
            `,
          },
          '2xl': {
            value: `
              2px 4px 4px hsl(0 0% 0% / 0.12),
              4px 8px 8px hsl(0 0% 0% / 0.12),
              8px 16px 16px hsl(0 0% 0% / 0.12),
              16px 32px 32px hsl(0 0% 0% / 0.12),
              32px 64px 64px hsl(0 0% 0% / 0.12)
            `,
          },
          'inset-2xs': {
            value: `
              inset 0 1px 2px hsl(0 0% 0% / 0.15)
            `,
          },
          'inset-xs': {
            value: `
              inset 0 2px 4px hsl(0 0% 0% / 0.15)
            `,
          },
          'inset-sm': {
            value: `
              inset 0 4px 8px hsl(0 0% 0% / 0.15)
            `,
          },
        },
      },
    },
  },

  // JSX スタイル
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  // グローバルスタイル
  globalCss,
});
