import { Link } from 'react-router';

import { css } from '../styled-system/css';
import { Center } from '../styled-system/jsx';

function Home() {
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
      <Link to="./shipping-instruction-printouts" relative="path">
        <div
          className={css({
            bg: '#edebe8',
            p: '2',
            m: 1,
            rounded: 'sm',
          })}
        >
          🖨️出荷指示書印刷履歴
        </div>
      </Link>
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
