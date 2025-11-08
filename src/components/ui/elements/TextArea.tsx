import { styled } from 'styled-system/jsx';

const TextArea = styled('textarea', {
  base: {
    display: 'block',
    fontWeight: 'bold',
    px: '1rem',
    color: '#0a1612',
    bgColor: '#f5eeee',
    borderWidth: '1px',
    borderColor: '#fefefe',
    borderRadius: 'sm',
    boxShadow: '2xs',
    _placeholder: {
      fontSize: '0.8rem',
      fontWeight: 'normal',
    },
    _hover: {
      borderColor: 'slate.400',
    },
    _focus: {
      borderWidth: 0,
      outline: 'solid 0.1rem #2dd4bf',
    },
  },
});

export default TextArea;
