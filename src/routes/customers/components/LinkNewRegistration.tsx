import { Link } from 'react-router';

import { css } from '../../../../styled-system/css';

interface LinkNewRegistrationProps {
  relativePath: string;
  height: string;
  bgMode?: 'light' | 'dark';
}

export default function LinkNewRegistration({
  relativePath,
  height,
  bgMode = 'light',
}: LinkNewRegistrationProps): JSX.Element {
  const isLightMode = bgMode === 'light';
  return (
    <Link title="👤新規登録" to={relativePath} relative="path">
      <svg
        id="_new-registration-svg"
        viewBox="0 0 113.3 122.9"
        className={css({
          h: height,
          fill: isLightMode ? '#042f2e' : '#e7ded3',
        })}
      >
        <path
          d="M77.6 78.7h27.2c4.6 0 8.5 3.8 8.5 8.5v27.2c0 4.7-3.9 8.5-8.5 8.5H77.6a8.5 8.5 0 0 1-8.5-8.5V87.2c0-4.7 3.8-8.5 8.5-8.5m-16.9 34.6a3.2 3.2 0 1 1 0 6.3H7.4a7.4 7.4 0 0 1-7.4-7.4V7.4A7.4 7.4 0 0 1 7.4 0h90.8a7.4 7.4 0 0 1 7.4 7.4v61.2a3.2 3.2 0 1 1-6.4 0V7.4l-.3-.7-.7-.4H7.4q-.4 0-.7.4-.3.3-.3.7v104.8q0 .4.3.7t.7.3zM33 56.3c-.6-1-.1-4 1.2-5 3.7-2.2 8.8-1.5 12.3-4l.7-1.2.8-2.1-2.1-3-2.2-3.5a6 6 0 0 1-1.2-3q0-.7.2-1.2l.8-.9.5-.2a54 54 0 0 1 .2-7.5q.9-3 3.6-4.6 1.5-.9 3-1.4c.7-.2-.6-2.4.1-2.4 3.4-.4 9 2.7 11.3 5.3q1.9 2 2.1 5.2l-.1 5.6q1 .3 1.1 1.2.3 1-.6 3l-2.5 4q-1.3 2.4-3 4.1l.4.5 1.6 2.1c2.8 2 9.7 2.5 12.3 4h.1c1.4 1 1.8 4 1.2 5zm-2 36.6a3 3 0 0 1-3.2-3.2c0-1.8 1.4-3.2 3.2-3.2h21.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2zm0-20.1a3.2 3.2 0 0 1 0-6.4h42.9a3.2 3.2 0 1 1 0 6.4zm57.5 18.1a2.8 2.8 0 1 1 5.5 0V98h7.3a2.8 2.8 0 1 1 0 5.6H94v7.2a2.8 2.8 0 1 1-5.5 0v-7.2h-7.2a2.8 2.8 0 1 1 0-5.6h7.2z"
          fillRule="evenodd"
        />
      </svg>
    </Link>
  );
}
