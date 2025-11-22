import { GoComment, GoCommentDiscussion } from 'react-icons/go';

import { css } from '../../../../../styled-system/css';

export default function NoteIconSwitcher({ notes }: { notes: number }): React.JSX.Element | null {
  switch (notes) {
    case 0:
      return null;
    case 1:
      return (
        <>
          <GoComment
            title="メモがあり〼"
            className={`_react-icons_go-comment ${css({
              strokeWidth: '0.05rem',
              color: 'blue.400',
              mr: 0,
            })}`}
          />
          <span className={css({ color: 'blue.400', ml: '-0.125rem', mr: '0.125rem' })}>{notes}</span>
        </>
      );
    default:
      return (
        <>
          <GoCommentDiscussion
            title="メモがあり〼"
            className={`_react-icons_go-comment ${css({
              strokeWidth: '0.05rem',
              color: 'blue.400',
              mr: 0,
            })}`}
          />
          <span className={css({ color: 'blue.400', ml: '-0.125rem', mr: '0.125rem' })}>{notes}</span>
        </>
      );
  }
}
