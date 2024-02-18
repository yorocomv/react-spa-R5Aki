import { styled } from '../../../../../styled-system/jsx';

const Button = styled('button', {
  base: {
    color: { base: 'teal.950', _active: 'teal.100' },
    bg: { base: 'teal.400', _hover: 'teal.300', _active: 'teal.600' },
    fontWeight: 'bold',
    py: 1,
    px: 3,
    borderWidth: '1px',
    borderColor: 'teal.300',
    borderRadius: 'sm',
    boxShadow: 'sm',
  },
  variants: {
    variant: {
      redo: {
        color: { base: 'orange.950', _active: 'orange.100' },
        bg: { base: 'orange.400', _hover: 'orange.300', _active: 'orange.600' },
        borderColor: 'orange.300',
      },
    },
  },
});

export default Button;
