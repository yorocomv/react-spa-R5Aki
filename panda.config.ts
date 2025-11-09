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
          // --- 外側影 ---
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

          // --- 内側影（多層化仕様） ---
          'inset-2xs': {
            value: `
              inset 0.5px 1px 1px hsl(0 0% 0% / 0.2)
            `,
          },
          'inset-xs': {
            value: `
              inset 0.5px 2px 2px hsl(0 0% 0% / 0.18),
              inset 1px 3px 3px hsl(0 0% 0% / 0.12)
            `,
          },
          'inset-sm': {
            value: `
              inset 0.5px 2px 2px hsl(0 0% 0% / 0.18),
              inset 1px 4px 4px hsl(0 0% 0% / 0.12),
              inset 2px 6px 6px hsl(0 0% 0% / 0.08)
            `,
          },
          'inset-md': {
            value: `
              inset 0.5px 2px 2px hsl(0 0% 0% / 0.16),
              inset 1px 4px 4px hsl(0 0% 0% / 0.12),
              inset 2px 8px 8px hsl(0 0% 0% / 0.08)
            `,
          },
          'inset-lg': {
            value: `
              inset 1px 4px 4px hsl(0 0% 0% / 0.14),
              inset 2px 8px 8px hsl(0 0% 0% / 0.1),
              inset 4px 16px 16px hsl(0 0% 0% / 0.06)
            `,
          },
          'inset-xl': {
            value: `
              inset 2px 8px 8px hsl(0 0% 0% / 0.12),
              inset 4px 16px 16px hsl(0 0% 0% / 0.08),
              inset 8px 32px 32px hsl(0 0% 0% / 0.05)
            `,
          },
          'inset-2xl': {
            value: `
              inset 4px 16px 16px hsl(0 0% 0% / 0.1),
              inset 8px 32px 32px hsl(0 0% 0% / 0.06),
              inset 16px 64px 64px hsl(0 0% 0% / 0.04)
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
