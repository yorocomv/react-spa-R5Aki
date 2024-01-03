import { AxiosError } from 'axios';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { css } from '../../../styled-system/css';

const fallback = ({ error }: FallbackProps) => {
  if (error instanceof AxiosError) {
    console.error(`👻${error.status ? error.status : '???'}:`, error.stack?.split(/\r\n|\n/));

    return (
      <section
        className={css({
          height: '100dvh',
          display: 'grid',
          placeItems: 'center',
          alignContent: 'center',
          color: 'yellow.400',
          bgColor: 'rose.900',
        })}
      >
        <h2
          className={css({
            m: '4',
            fontSize: '7xl',
            fontWeight: 'bold',
            lineHeight: '5.5rem',
            textShadow: '0 -1px #fefce8, -1px -0.125rem #fef9c3, 0.625rem 0.625rem 0.75rem rgba(0,0,0,0.9)',
          })}
        >
          {error.code} Axios Error
        </h2>
        <article
          className={css({
            m: '2',
            fontSize: '4xl',
            lineHeight: '3rem',
            textShadow: '0 -1px #fefce8, -1px -1px #fef9c3, 0.375rem 0.375rem 0.5rem rgba(0,0,0,0.9)',
          })}
        >
          {error.message}
        </article>
      </section>
    );
  }
  return <p>{error}</p>;
};

export default function ErrorBoundaryProvider({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={fallback}>{children}</ErrorBoundary>;
}
