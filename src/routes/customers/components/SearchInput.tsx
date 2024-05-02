import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '../../../../styled-system/css';
import Button from './elements/Button';

interface SearchInputProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  searchTrigger: boolean;
  setSearchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
}

export default function SearchInput({
  searchString,
  setSearchString,
  searchTrigger,
  setSearchTrigger,
  placeholder = '',
}: SearchInputProps): JSX.Element {
  // https://ja.react.dev/reference/react/useRef#manipulating-the-dom-with-a-ref
  // https://qiita.com/akifumii/items/539e4af7ed4d068c0144
  const inputRef = useRef<HTMLInputElement>(null);
  // 親コンポーネントから渡された State を制御する関数群
  // 内部で渡された set 関数を使用
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value);
  const handleReset = () => {
    setSearchString('');
    document.getElementById('input-search-form')?.focus();
  };
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/customers');
    setSearchTrigger(!searchTrigger);
    // document.${id}.focus() よりは高確率で成功する
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={css({ display: 'flex', alignItems: 'center' })}>
      <div className={css({ pos: 'relative' })}>
        <label
          htmlFor="input-search-form"
          className={css({
            display: 'flex',
            pos: 'relative',
            alignItems: 'center',
            pl: '0.625rem',
            m: 0,
            color: '#0a1612',
            bgColor: '#f5eeee',
            borderWidth: '1px',
            borderColor: '#fefefe',
            borderRadius: 'sm',
            boxShadow: 'sm',
            _hover: {
              borderColor: 'slate.400',
            },
            '&:focus-within': {
              borderWidth: 0,
              outline: 'solid 0.125rem #2dd4bf',
            },
          })}
        >
          <svg
            viewBox="0 0 17 17"
            className={css({
              w: '1.25rem',
              h: '1.25rem',
            })}
          >
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
          </svg>
          <input
            ref={inputRef}
            id="input-search-form"
            type="text"
            placeholder={placeholder}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            autoComplete="off"
            value={searchString}
            onChange={handleChange}
            className={css({
              w: '100%',
              minW: '20.75rem',
              py: 1,
              pr: 3,
              pl: '0.625rem',
              bg: 'none',
              fontWeight: 'bold',
              _focus: {
                outline: 'none',
              },
              // Firefox と Edge の描画の違いを吸収するためメディアクエリを使用😅💦
              '@media (min-width: 35em)': { minW: '28rem' },
              _placeholder: {
                fontSize: '0.825rem',
              },
              // ブラウザ（Edge で確認）の自動補完時の独自スタイルを N 秒後 N 秒かけて適用する
              _autofill: {
                transition: 'background-color 9999s 9999s',
              },
            })}
          />
        </label>
        <button
          type="button"
          disabled={searchString.length === 0}
          onClick={handleReset}
          className={css({
            display: 'flex',
            pos: 'absolute',
            p: 0,
            m: '0',
            borderRadius: '50%',
            bg: 'none',
            boxShadow: 'none',
            top: '0.55rem',
            right: '0.625rem',
            '&:disabled > svg': {
              display: 'none',
            },
          })}
        >
          <svg
            viewBox="0 0 20 20"
            className={css({
              w: '1.25rem',
              h: '1.25rem',
              color: '#0e0e0e',
              _active: { color: 'red.500' },
            })}
          >
            <path
              d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
              stroke="currentColor"
              fill="none"
            />
          </svg>
        </button>
      </div>
      <Button type="submit" className={css({ minW: '3.5rem', ml: '0.25rem' })}>
        検索
      </Button>
    </form>
  );
}
