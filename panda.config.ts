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
              0.5px 2px 2px hsl(0 0% 0% / 0.25)
            `,
          },
          sm: {
            value: `
              0.5px 2px 2px hsl(0 0% 0% / 0.2),
              1px 4px 4px hsl(0 0% 0% / 0.2)
            `,
          },
          md: {
            value: `
              0.5px 2px 2px hsl(0 0% 0% / 0.18),
              1px 4px 4px hsl(0 0% 0% / 0.18),
              1.5px 6px 6px hsl(0 0% 0% / 0.18)
            `,
          },
          lg: {
            value: `
              0.5px 2px 2px hsl(0 0% 0% / 0.16),
              1px 4px 4px hsl(0 0% 0% / 0.16),
              2px 8px 8px hsl(0 0% 0% / 0.16),
              4px 16px 16px hsl(0 0% 0% / 0.16)
            `,
          },
          xl: {
            value: `
              1px 4px 4px hsl(0 0% 0% / 0.14),
              2px 8px 8px hsl(0 0% 0% / 0.14),
              4px 16px 16px hsl(0 0% 0% / 0.14),
              8px 32px 32px hsl(0 0% 0% / 0.14)
            `,
          },
          '2xl': {
            value: `
              1px 4px 4px hsl(0 0% 0% / 0.12),
              2px 8px 8px hsl(0 0% 0% / 0.12),
              4px 16px 16px hsl(0 0% 0% / 0.12),
              8px 32px 32px hsl(0 0% 0% / 0.12),
              16px 64px 64px hsl(0 0% 0% / 0.12)
            `,
          },

          // --- Inset shadows ---
          'inset-2xs': {
            value: `
              inset 0.5px 1px 2px hsl(0 0% 0% / 0.15)
            `,
          },
          'inset-xs': {
            value: `
              inset 0.5px 2px 4px hsl(0 0% 0% / 0.15)
            `,
          },
          'inset-sm': {
            value: `
              inset 1px 4px 8px hsl(0 0% 0% / 0.15)
            `,
          },
          'inset-md': {
            value: `
              inset 2px 6px 12px hsl(0 0% 0% / 0.14)
            `,
          },
          'inset-lg': {
            value: `
              inset 4px 12px 24px hsl(0 0% 0% / 0.13)
            `,
          },
          'inset-xl': {
            value: `
              inset 8px 24px 48px hsl(0 0% 0% / 0.12)
            `,
          },
          'inset-2xl': {
            value: `
              inset 16px 32px 64px hsl(0 0% 0% / 0.1)
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
