import { styled } from '../../../../styled-system/jsx';

const Select = styled('select', {
  base: {
    appearance: 'base-select',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    w: 'fit-content',
    h: '2.5rem',
    pl: '1rem',
    pr: '0.125rem',
    color: '#0a1612',
    bgColor: '#f5eeee',
    borderWidth: '1px',
    borderColor: '#fefefe',
    borderRadius: 'sm',
    boxShadow: '2xs',
    _hover: {
      borderColor: 'slate.400',
    },
    '&:focus, &:open': {
      borderWidth: 0,
      outline: 'solid 0.1rem #2dd4bf',
    },

    '&>option::checkmark': {
      content: '""',
      w: 0,
      m: 0,
      display: 'inline-block',
    },
    '&::picker(select)': {
      appearance: 'base-select',
      // 基準点を画面全体（ビューポート）にし、親要素の高さ制限による誤反転を防止
      pos: 'fixed',
      // 自身（select本体）をアンカー位置の参照元に指定
      positionAnchor: 'self',
      // 基本位置を「下側・左揃え（インライン開始位置）」に指定
      positionArea: 'bottom self-start',
      // 画面下端にはみ出る場合、ブロック方向（上下）に自動反転させる
      positionTryFallbacks: 'flip-block',
      // 反転試行の優先順序をデフォルト（通常順）に設定
      positionTryOrder: 'normal',
      // ビューポート高さ（100vh）または500pxの小さい方を最大高にしてスクロール可能に
      maxBlockSize: 'min(500px, 100vh)',
      // 上下に反転しても維持されるセレクト本体との隙間
      marginBlock: '1px',
      // デザイン・スタイル指定
      lineHeight: 2,
      color: '#0a1612',
      bgColor: '#f5eeee',
      borderWidth: '1px',
      borderColor: '#fefefe',
      borderRadius: 'sm',
      boxShadow: '2xs',
    },
    '&::picker-icon': {
      content: '""',
      w: '1.125rem',
      h: '1.125rem',
      bgImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik00LjE4MiA2LjE4MmEuNDUuNDUgMCAwIDEgLjYzNiAwTDcuNSA4Ljg2NGwyLjY4Mi0yLjY4MmEuNDUuNDUgMCAwIDEgLjYzNi42MzZsLTMgM2EuNDUuNDUgMCAwIDEtLjYzNiAwbC0zLTNhLjQ1LjQ1IDAgMCAxIDAtLjYzNnoiIGZpbGw9IiMwYTE2MTIiIHN0cm9rZT0iIzBhMTYxMiIgc3Ryb2tlLXdpZHRoPSIwLjQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPg==")',
      bgSize: 'contain',
      bgRepeat: 'no-repeat',
      bgPosition: 'center',
    },

    '&>hr': {
      border: 'none',
      h: '1px',
      color: 'slate.500',
      bgColor: 'slate.300',
    },
  },
});

export default Select;
