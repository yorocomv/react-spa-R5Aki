import { styled } from '../../../../styled-system/jsx';

const Select = styled('select', {
  base: {
    appearance: 'base-select',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    fontWeight: 'bold',
    h: '2.5rem',
    px: '1rem',
    color: '#0a1612',
    bgColor: '#f5eeee',
    borderWidth: '1px',
    borderColor: '#fefefe',
    borderRadius: 'sm',
    boxShadow: '2xs',
    _hover: {
      borderColor: 'slate.400',
    },
    _focus: {
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
      mt: 0,
      lineHeight: 2,
      color: '#0a1612',
      bgColor: '#f5eeee',
      borderWidth: '1px',
      borderColor: '#fefefe',
      borderRadius: 'sm',
      boxShadow: '2xs',
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
