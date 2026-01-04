import { MdOutlineCreate } from 'react-icons/md';

import { css } from 'styled-system/css';

interface FormSuggestionProps {
  suggestion: string | undefined;
}

export default function FormSuggestion({ suggestion }: FormSuggestionProps): React.JSX.Element | null {
  if (suggestion) {
    return (
      <div className={css({
        display: 'flex',
        alignItems: 'center',
      })}
      >
        <MdOutlineCreate className={css({
          display: 'inline-block',
          color: 'stone.500',
        })}
        />
        <pre className={css({ color: 'stone.400' })}>{suggestion}</pre>
      </div>
    );
  }
  return null;
}
