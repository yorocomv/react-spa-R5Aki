import { VscGoToSearch } from 'react-icons/vsc';
import { Link } from 'react-router';

import { css } from '../../../../styled-system/css';

interface FloatingLinkIconProps {
  relativePath: string;
  size: string;
}

export default function FloatingLinkIcon({ relativePath, size }: FloatingLinkIconProps): JSX.Element {
  return (
    <Link to={relativePath} relative="path" title="🔎検索画面に戻る">
      <VscGoToSearch
        className={css({
          pos: 'fixed',
          top: '0.725rem',
          left: '0.725rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: '0.125rem',
          borderRadius: '50%',
          color: 'teal.950',
          bgColor: 'teal.200',
          _hover: {
            bgColor: 'teal.100',
          },
          boxShadow: '2xl',
        })}
        size={size}
      />
    </Link>
  );
}
