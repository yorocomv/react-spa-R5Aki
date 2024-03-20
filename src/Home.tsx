import { Link } from 'react-router-dom';
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
            rounded: 'sm',
          })}
        >
          🐼顧客情報
        </div>
      </Link>
    </Center>
  );
}

export default Home;
