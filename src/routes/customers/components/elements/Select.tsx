import { styled } from '../../../../../styled-system/jsx';

const Select = styled('select', {
  base: {
    display: 'block',
    fontWeight: 'bold',
    h: '2.5rem',
    px: '1rem',
    color: '#0a1612',
    bgColor: '#f5eeee',
    borderWidth: '1px',
    borderColor: '#fefefe',
    borderRadius: 'sm',
    boxShadow: 'sm',
    _hover: {
      borderColor: 'slate.400',
    },
    _focus: {
      borderWidth: 0,
      outline: 'solid 0.1rem #2dd4bf',
    },
  },
});

export default Select;
