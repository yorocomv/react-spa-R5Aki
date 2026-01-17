import { Link, useNavigate } from 'react-router';

import type { useFetchPrintHistoryStates } from './routes/shipping-instruction-printouts/components/hooks/useFetchPrintHistory';

import { css } from '../styled-system/css';
import { Center } from '../styled-system/jsx';

function Home() {
  const navigate = useNavigate();
  const handleNavigatePrintHistory = () => {
    // https://github.com/remix-run/react-router/issues/12348
    Promise.resolve(
      navigate('./shipping-instruction-printouts', {
        relative: 'path',
        state: {
          category: 'printed_at',
          non_fk_customer_id: null,
          dateA: null,
          dateB: null,
        } as useFetchPrintHistoryStates,
      }),
    ).catch((err: string) => {
      throw new Error(err);
    });
  };

  return (
    <Center height="100lvh">
      <Link to="./customers" relative="path">
        <div
          className={css({
            bg: '#edebe8',
            p: '2',
            m: 1,
            rounded: 'sm',
          })}
        >
          🐼顧客情報
        </div>
      </Link>

      <button
        type="button"
        onClick={handleNavigatePrintHistory}
        onKeyDown={handleNavigatePrintHistory}
        className={css({
          bg: '#edebe8',
          p: '2',
          m: 1,
          rounded: 'sm',
        })}
      >
        🖨️出荷指示書印刷履歴
      </button>

      <Link to="./products/new" relative="path">
        <div
          className={css({
            bg: '#edebe8',
            p: '2',
            m: 1,
            rounded: 'sm',
          })}
        >
          🍬製品登録
        </div>
      </Link>
    </Center>
  );
}

export default Home;
