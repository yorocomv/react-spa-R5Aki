import { styled } from '../../../../../styled-system/jsx';

const Button = styled('button', {
  base: {
    whiteSpace: 'nowrap',
    color: {
      base: 'teal.950',
      _active: { base: 'teal.100', _disabled: 'stone.300' },
      _disabled: 'stone.300',
    },
    bg: {
      base: 'teal.400',
      _hover: { base: 'teal.300', _disabled: 'stone.200' },
      _active: 'teal.600',
      _disabled: 'stone.200',
    },
    fontWeight: 'bold',
    py: 1,
    px: 3,
    borderWidth: '1px',
    borderColor: { base: 'teal.300', _disabled: 'stone.300' },
    borderRadius: 'sm',
    boxShadow: 'sm',
  },
  variants: {
    variant: {
      redo: {
        color: {
          base: 'orange.950',
          _active: { base: 'orange.100', _disabled: 'stone.300' },
        },
        bg: {
          base: 'orange.400',
          _hover: { base: 'orange.300', _disabled: 'stone.200' },
          _active: 'orange.600',
        },
        borderColor: { base: 'orange.300', _disabled: 'stone.300' },
      },
      edit: {
        color: {
          base: 'violet.50',
          _active: { base: 'violet.800', _disabled: 'stone.300' },
        },
        bg: {
          base: 'violet.500',
          _hover: { base: 'violet.600', _disabled: 'stone.200' },
          _active: 'violet.300',
        },
        borderColor: { base: 'violet.600', _disabled: 'stone.300' },
      },
    },
  },
});

export default Button;
