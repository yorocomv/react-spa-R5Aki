import type { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import type { GroupBase, OptionsOrGroups } from 'react-select';

import { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';

import { css } from 'styled-system/css';

const styles = {
  // 一番外側のコンテナ
  container: (isFocused: boolean) => css({
    w: '100%',
    maxW: '30rem',
    minH: '2.875rem',
    borderRadius: 'md',

    ...(isFocused && {
      outline: 'solid 0.1rem #2dd4bf',
    }),
  }),
  // 入力エリアの枠組み（通常時 / フォーカス時）
  control: (isFocused: boolean) => css({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.25rem',
    padding: '0.5rem',
    backgroundColor: '#f5eeee',
    border: '1px solid',
    borderColor: isFocused ? 'transparent' : '#fefefe',
    borderRadius: 'md',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    cursor: 'text',
    _hover: {
      borderColor: 'slate.400',
    },
    _focusWithin: {
      borderWidth: 0,
    },

    '&>div': { gap: '0.25rem' },
  }),
  // 選択されたタグ（バッジ）
  multiValue: css({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderRadius: 'sm',
    paddingX: '0.5rem',
    paddingY: '0.125rem',
    gap: '0.375rem',
  }),
  // タグのテキスト
  multiValueLabel: css({
    fontSize: 'sm',
    color: '#0a1612',
  }),
  // タグの削除ボタン
  multiValueRemove: css({
    color: 'slate.500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'xs',
    _hover: {
      backgroundColor: 'red.300',
      color: 'red.950',
    },
  }),
  // 実際のテキスト入力欄
  input: css({
    color: '#0a1612',
    fontSize: 'sm',
    outline: 'none',
  }),
  // プレースホルダー
  placeholder: css({
    color: '#6b7280',
    fontSize: 'sm',
  }),
  // サジェストのドロップダウンメニュー
  menu: css({
    backgroundColor: '#f5eeee',
    border: '1px solid',
    borderColor: '#fefefe',
    borderRadius: 'md',
    marginTop: '0.25rem',
    boxShadow: 'lg',
    overflow: 'hidden',
  }),
  // ドロップダウン内の各選択肢
  option: (isFocused: boolean) => css({
    paddingX: '1.75rem',
    paddingY: '0.5rem',
    fontSize: 'sm',
    cursor: 'pointer',
    backgroundColor: isFocused ? 'violet.700' : 'transparent',
    color: isFocused ? '#fff' : '#0a1612',
    _active: {
      backgroundColor: 'violet.800',
    },
  }),
  // 選択肢がない時のメッセージ
  noOptionsMessage: css({
    padding: '0.75rem',
    color: '#6b7280',
    fontSize: 'sm',
    textAlign: 'center',
  }),
  // 入力欄をまとめて削除する × ボタン
  clearIndicator: css({
    padding: '0.25rem',
    cursor: 'pointer',
    color: '#6b7280',
    borderRadius: '0.25rem',
    _hover: {
      bgColor: 'red.300',
      color: 'red.950',
    },
  }),
  dropdownIndicator: css({
    py: '0.25rem',
    cursor: 'pointer',
    color: '#6b7280',
    borderRadius: '0.25rem',
    _hover: {
      color: 'slate.950',
    },
  }),
};

export default function ControlledTagsSelect<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  id,
  inputId,
  field,
  options,
}: {
  id: string;
  inputId: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  options: OptionsOrGroups<{
    value: string;
    label: string;
  }, GroupBase<{
      value: string;
      label: string;
    }>> | undefined;
}) {
  const classNames = useMemo(() => ({
    container: ({ isFocused }: { isFocused: boolean }) => styles.container(isFocused),
    control: ({ isFocused }: { isFocused: boolean }) => styles.control(isFocused),
    multiValue: () => styles.multiValue,
    multiValueLabel: () => styles.multiValueLabel,
    multiValueRemove: () => styles.multiValueRemove,
    input: () => styles.input,
    placeholder: () => styles.placeholder,
    menu: () => styles.menu,
    option: ({ isFocused }: { isFocused: boolean }) => styles.option(isFocused),
    noOptionsMessage: () => styles.noOptionsMessage,
    clearIndicator: () => styles.clearIndicator,
    dropdownIndicator: () => styles.dropdownIndicator,
  }), []);

  return (
    <CreatableSelect
      {...field}
      id={id}
      inputId={inputId}
      isMulti
      options={options}
      unstyled
      placeholder="タグを入力してEnter..."
      noOptionsMessage={() => '新しいタグを作成できます'}
      formatCreateLabel={inputValue => `❝${inputValue}❞を追加`}
      classNames={classNames}
    />
  );
}
