import { css } from '../../../../styled-system/css';
import Input from './elements/Input';
import Select from './elements/Select';

export default function CustomerInputs() {
  return (
    <>
      <label>
        電話番号
        <Input
          type="text"
          autoFocus
          placeholder="電話番号"
          className={css({
            w: 40,
          })}
        />
      </label>
      <label>
        郵便番号
        <Input
          type="text"
          placeholder="郵便番号"
          className={css({
            w: 28,
          })}
        />
      </label>
      <label>
        住所
        <Input type="text" placeholder="住所1" />
      </label>
      <Input
        type="text"
        placeholder="住所2"
        className={css({
          my: '0.125rem',
        })}
      />
      <Input type="text" placeholder="住所3" />
      <label>
        名称
        <Input type="text" placeholder="名称1" />
      </label>
      <Input
        type="text"
        placeholder="名称2"
        className={css({
          mt: '0.125rem',
        })}
      />
      <label>
        検索用の別名
        <Input type="text" placeholder="検索用の別名" />
      </label>
      <label>
        伝票の種類
        <Select>
          <option>ほげ</option>
          <option>ふが</option>
          <option>ぴよ</option>
        </Select>
      </label>
    </>
  );
}
