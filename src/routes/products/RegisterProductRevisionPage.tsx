import BubbleTailHeading from '@/components/ui/elements/BubbleTailHeading';
import { css } from 'styled-system/css';

export default function RegisterProductRevisionPage() {
  return (
    <>
      <BubbleTailHeading
        level={2}
        mergedStyles={css.raw({
          p: 2,
          fontSize: '3xl',
          fontWeight: 'bold',
        })}
      >
        のJAN変更なしの仕様変更を登録
      </BubbleTailHeading>
    </>
  );
}
