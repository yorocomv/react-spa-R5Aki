import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  html: {
    minHeight: '100lvh',
    backgroundColor: '#dcd0c0',
    backgroundImage:
      "linear-gradient(175deg, rgba(255, 255, 255, 0) 0lvh, rgba(35, 0, 0, 0) 75lvh, rgba(35, 0, 0, .35) 200lvh, rgba(35, 0, 0, .55) 300lvh), url('/bg.svg')",
    color: '#0e0e0e',
    fontFamily: '"Segoe UI Emoji", "BIZ UDPGothic", sans-serif',
    fontSize: 'clamp(12px, 1.74vw, 16px)',
    lineHeight: '1.75rem',
  },
});

// shadows by Gemini 3 Pro
// https://www.joshwcomeau.com/css/designing-shadows
const SHADOW_HUE = '0 0% 0%';

/**
 * 11時の光源（X軸ズレ）を維持しつつ、
 * 多層レイヤーによる滑らかな減衰を生成するヘルパー
 */
function createShadow(layers: [number, number, number, number][], isInset = false) {
  return {
    value: layers
      .map(([x, y, blur, alpha]) => {
        const color = `hsl(${SHADOW_HUE} / ${alpha})`;
        const type = isInset ? 'inset ' : '';
        return `${type}${x}px ${y}px ${blur}px ${color}`;
      })
      .join(', '),
  };
}

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
          // --- 外側影 (Drop Shadows) ---
          // ポイント: 全てのサイズで [0.5, 1, 1] の最小レイヤーを含めることで
          // どんなに大きく浮いても「地面との接点」を感じさせます。

          '2xs': createShadow([
            // 控えめな存在感
            [0.5, 1, 1, 0.2],
          ]),

          xs: createShadow([
            // ここから多層化開始
            [0.5, 1, 1, 0.13],
            [0.5, 2, 2, 0.13],
          ]),

          sm: createShadow([
            [0.5, 1, 1, 0.11], // 接地レイヤー
            [1, 2, 2, 0.11],
            [2, 4, 4, 0.11], // 拡散レイヤー
          ]),

          md: createShadow([
            [0.5, 1, 1, 0.11],
            [1, 2, 2, 0.1],
            [2, 4, 4, 0.1],
            [4, 8, 8, 0.1],
          ]),

          lg: createShadow([
            [0.5, 1, 1, 0.1],
            [1, 2, 2, 0.09],
            [2, 4, 4, 0.09],
            [4, 8, 8, 0.09],
            [8, 16, 16, 0.09],
          ]),

          xl: createShadow([
            // 接地感を出すため 0.5px から積み上げ
            [0.5, 1, 1, 0.1], // 強い接地
            [1, 2, 2, 0.08],
            [2, 4, 4, 0.08],
            [4, 8, 8, 0.08],
            [8, 16, 16, 0.08],
            [12, 32, 32, 0.08], // 少し広げた拡散
          ]),

          '2xl': createShadow([
            [0.5, 1, 1, 0.1],
            [1, 2, 2, 0.07],
            [2, 4, 4, 0.07],
            [4, 8, 8, 0.07],
            [8, 16, 16, 0.07],
            [16, 32, 32, 0.07],
            [24, 64, 64, 0.07], // 非常に大きく、しかし薄く広がる影
          ]),

          // --- 内側影 (Inset Shadows) ---
          // 窪み表現のため、接地感（鋭い影）は外側影ほど重要ではありませんが、
          // 滑らかさを出すためにレイヤー数は確保しています。
          'inset-2xs': createShadow([
            [0.5, 1, 1, 0.22],
          ], true),

          'inset-xs': createShadow([
            [0.5, 1, 1, 0.1],
            [0.5, 2, 2, 0.1],
          ], true),

          'inset-sm': createShadow([
            [0.5, 2, 2, 0.12],
            [1, 4, 4, 0.1],
            [2, 6, 6, 0.07],
          ], true),

          'inset-md': createShadow([
            [0.5, 2, 2, 0.1],
            [1, 4, 4, 0.08],
            [2, 8, 8, 0.08],
          ], true),

          'inset-lg': createShadow([
            [1, 4, 4, 0.08],
            [2, 8, 8, 0.08],
            [4, 16, 16, 0.07],
          ], true),

          'inset-xl': createShadow([
            [2, 8, 8, 0.08],
            [4, 16, 16, 0.07],
            [8, 32, 32, 0.06],
          ], true),

          'inset-2xl': createShadow([
            [4, 16, 16, 0.07],
            [8, 32, 32, 0.06],
            [16, 64, 64, 0.05],
          ], true),
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
