import type { ReactNode } from 'react';
import type { CheckboxFieldProps } from 'react-aria-components/Checkbox';

import { CheckboxButton, CheckboxField } from 'react-aria-components/Checkbox';

import { css } from 'styled-system/css';

interface CheckboxProps extends CheckboxFieldProps { children?: ReactNode }

export function Checkbox({ children, ...props }: CheckboxProps) {
  // --- インジケーターの初期スタイル（未選択） ---
  const indicatorBase = css.raw({
    '--chk-indicator-color': 'var(--colors-gray-400)',
    '--chk-indicator-background': 'oklch(from var(--chk-indicator-color) 0.98 c h)',
    '--chk-indicator-border': 'oklch(from var(--chk-indicator-color) 0.75 c h)',
    '--chk-indicator-drop-shadow': '0 0',

    background: 'var(--chk-indicator-background)',
    boxShadow: [
      'inset 0 0 0 0.0625rem var(--chk-indicator-border)',
      'inset 0 0.125rem 0 white',
      'inset 0 -0.25rem 0.125rem oklch(from var(--chk-indicator-color) 30% c h / 0.08)',
      'var(--chk-indicator-drop-shadow)',
    ].join(', '),
    willChange: 'transform',
    transition: 'transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease',

    _dark: {
      '--chk-indicator-color': 'var(--colors-gray-600)',
      boxShadow: [
        'inset 0 0.0625rem 0 rgb(255 255 255 / 0.4)',
        'inset 0 0.25rem 0.125rem rgb(255 255 255 / 0.1)',
        'inset 0 0 0 0.0625rem var(--chk-indicator-border)',
        'var(--chk-indicator-drop-shadow)',
      ].join(', '),
    },

    '@media (forced-colors: active)': {
      '--chk-indicator-background': 'ButtonFace',
      '--chk-indicator-border': 'ButtonBorder',
      boxShadow: 'inset 0 0 0 0.0625rem var(--chk-indicator-border)',
    },

    // ← ここで押下時のスケールをインジケーターのみに適用
    // 親に data-pressed が付くケースと、インジケーター自身に付くケースの両方に対応
    '[data-pressed] &': {
      transform: 'scale(0.92)',
    },
    '&[data-pressed]': {
      transform: 'scale(0.92)',
    },
  });

  const checkboxFieldStyle = css.raw({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-1, 0.25rem)',

    "& [slot='description'], & .react-aria-FieldError": {
      marginLeft: '1.625rem',
    },

    '&[data-disabled] [slot="description"]': {
      color: 'var(--colors-gray-400)',
    },
  });

  // 親（label / CheckboxButton）側に選択時の上書きをまとめる
  // ただし、押下時のスケールは除く
  const checkboxButtonStyle = css.raw({
    '--chk-checkmark-color': 'var(--colors-white, #fff)',

    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    gap: 'var(--spacing-2, 0.5rem)',
    fontFamily: 'system-ui',
    fontSize: 'var(--font-size-sm, 0.875rem)',
    color: 'var(--colors-gray-800)',
    forcedColorAdjust: 'none',
    WebkitTapHighlightColor: 'transparent',

    '& ._react-aria-indicator': {
      width: '1.125rem',
      height: '1.125rem',
      boxSizing: 'border-box',
      borderRadius: 'var(--radii-sm, 0.25rem)',
      transition: 'all 200ms',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },

    '& svg': {
      width: 'calc(100% - var(--spacing-2, 0.5rem))',
      height: 'calc(100% - var(--spacing-2, 0.5rem))',
      fill: 'none',
      stroke: 'var(--chk-checkmark-color)',
      strokeWidth: '0.1875rem',
      strokeDasharray: '1.375rem',
      strokeDashoffset: '4.125rem',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      transition: 'all 200ms',
    },

    '&[data-selected], &[data-indeterminate]': {
      '& ._react-aria-indicator': {
        '--chk-indicator-color': 'var(--colors-blue-600)',
        '--chk-indicator-background': 'var(--chk-indicator-color)',
        '--chk-indicator-highlight': 'rgb(255 255 255 / 0.3)',
        '--chk-indicator-shadow': 'oklch(from var(--chk-indicator-color) 0.45 c h)',
        '--chk-indicator-border': 'var(--chk-indicator-background)',
        boxShadow: [
          'inset 0 -0.0625rem 0 var(--chk-indicator-shadow)',
          'inset 0 0 0 0.0625rem var(--chk-indicator-border)',
          'inset 0 0.125rem 0 var(--chk-indicator-highlight)',
          'var(--chk-indicator-drop-shadow)',
        ].join(', '),
      },

      _dark: {
        '& ._react-aria-indicator': {
          '--chk-indicator-color': 'var(--colors-blue-500)',
          '--chk-indicator-highlight': 'rgb(255 255 255 / 0.5)',
          '--chk-indicator-gradient': 'rgb(255 255 255 / 0.12)',
          boxShadow: [
            'inset 0 0.0625rem 0 var(--chk-indicator-highlight)',
            'inset 0 0.25rem 0.125rem var(--chk-indicator-gradient)',
            'inset 0 0 0 0.0625rem var(--chk-indicator-border)',
            'var(--chk-indicator-drop-shadow)',
          ].join(', '),
        },
      },

      '@media (forced-colors: active)': {
        '& ._react-aria-indicator': {
          boxShadow: 'none',
        },
      },
    },

    '&[data-invalid], &[data-invalid] > &': {
      '& ._react-aria-indicator': {
        '--chk-indicator-color': 'var(--colors-red-600)',
      },
      _dark: {
        '& ._react-aria-indicator': {
          '--chk-indicator-color': 'var(--colors-red-500)',
        },
      },
      '@media (forced-colors: active)': {
        '& ._react-aria-indicator': {
          '--chk-indicator-border': 'var(--colors-red-600)',
        },
      },
    },

    '&[data-focus-visible], [data-focus-visible] > &': {
      outline: '0.125rem solid var(--colors-blue-400)',
      outlineOffset: '0.125rem',
    },

    '&[data-disabled]': {
      color: 'var(--colors-gray-400)',
      '--chk-checkmark-color': 'var(--colors-gray-400)',
      '& ._react-aria-indicator': {
        background: 'var(--colors-gray-100)',
        '--chk-indicator-border': 'var(--colors-gray-200)',
        boxShadow: 'inset 0 0 0 0.0625rem var(--chk-indicator-border)',
      },
      _dark: {
        '& ._react-aria-indicator': {
          background: 'var(--colors-gray-800)',
          '--chk-indicator-border': 'var(--colors-gray-700)',
        },
      },
    },

    // 親に対する押下スケールは削除しました
    // '&[data-pressed], [data-pressed] &': { transform: 'scale(0.92)' },

    '&[data-selected] svg, &[data-indeterminate] svg': {
      strokeDashoffset: '2.75rem',
    },

    '&[data-indeterminate] svg': {
      stroke: 'none',
      fill: 'var(--chk-checkmark-color)',
    },
  });

  return (
    <CheckboxField {...props} className={css(checkboxFieldStyle)}>
      <CheckboxButton className={css(checkboxButtonStyle)}>
        {({ isIndeterminate }) => (
          <>
            <div className={`_react-aria-indicator ${css(indicatorBase)}`}>
              <svg
                viewBox="0 0 18 18"
                aria-hidden="true"
                key={isIndeterminate ? 'indeterminate' : 'check'}
              >
                {isIndeterminate
                  ? (
                      <rect x={1} y={7.5} width={16} height={3} />
                    )
                  : (
                      <polyline points="2 9 7 14 16 4" />
                    )}
              </svg>
            </div>
            {children}
          </>
        )}
      </CheckboxButton>
    </CheckboxField>
  );
}
