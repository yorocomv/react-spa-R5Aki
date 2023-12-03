import { css } from '../styled-system/css';
import { Center } from '../styled-system/jsx';

function Home() {
  return (
    <Center height="100lvh">
      <h1
        className={css({
          bg: '#edebe8',
          p: '2',
          rounded: 'sm',
        })}
      >
        てすと🐼Test
      </h1>
    </Center>
  );
}

export default Home;
