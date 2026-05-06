import { FaEye } from 'react-icons/fa';
import { VscGoToSearch } from 'react-icons/vsc';
import { Link } from 'react-router';

import { css } from 'styled-system/css';

import TooltipWrapper from './TooltipWrapper';

interface FloatingLinkIconProps {
  relativePath: string;
  size: string;
  title: string;
  iconType: 'goToSearch' | 'eye';
}

export default function FloatingLinkIcon({ relativePath, size, title, iconType }: FloatingLinkIconProps): React.JSX.Element {
  const iconSwitcher = (type: FloatingLinkIconProps['iconType'], title: string, size: string) => {
    const style = css.raw({
      pos: 'fixed',
      top: '0.725rem',
      left: '0.725rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: '0.125rem',
      borderRadius: '50%',
      boxShadow: '2xl',
    });
    switch (type) {
      case 'goToSearch':
        return (
          <TooltipWrapper
            text={title}
            fillColor="teal.400"
            placement="bottom end"
            className={css({ color: 'teal.950', bgColor: 'teal.400', shadow: '2xl' })}
          >
            <VscGoToSearch
              className={css(style, {
                color: 'teal.950',
                bgColor: 'teal.200',
                _hover: {
                  bgColor: 'teal.100',
                },
              })}
              size={size}
            />
          </TooltipWrapper>
        );
      case 'eye':
        return (
          <TooltipWrapper
            text={title}
            fillColor="violet.500"
            placement="bottom end"
            className={css({ color: 'violet.50', bgColor: 'violet.500', shadow: '2xl' })}
          >
            <FaEye
              className={css(style, {
                color: 'violet.950',
                bgColor: 'violet.300',
                _hover: {
                  bgColor: 'violet.200',
                },
              })}
              size={size}
            />
          </TooltipWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <Link to={relativePath} relative="path">
      {iconSwitcher(iconType, title, size)}
    </Link>
  );
}
