import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '../../../../styled-system/css';
import Input from './elements/Input';
import Select from './elements/Select';
import { useFetchInvoiceTypes } from './hooks/useFetchInvoiceTypes';
import { customerInputsSchema } from '../customers.schemas';
import { CustomerInputs as CustomerInputsTypes } from '../customers.types';

export default function CustomerInputs() {
  const { invoiceTypes } = useFetchInvoiceTypes();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInputsTypes>({
    mode: 'all',
    resolver: zodResolver(customerInputsSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((d: CustomerInputsTypes) => console.log(d))}
      className={css({
        '&> label': {
          pl: '0.125rem',
        },
      })}
    >
      <label>
        電話番号
        <Input
          {...register('tel')}
          type="text"
          autoFocus
          placeholder="電話番号"
          className={css({
            w: 40,
          })}
        />
      </label>
      {errors.tel?.message && <p>{errors.tel.message}</p>}
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
      <label htmlFor="address1">住所</label>
      <Input
        id="address1"
        type="text"
        placeholder="住所1"
        className={css({
          w: '34.5rem',
        })}
      />
      <Input
        type="text"
        placeholder="住所2"
        className={css({
          w: '34.5rem',
          mt: '0.125rem',
        })}
      />
      <Input
        type="text"
        placeholder="住所3"
        className={css({
          w: '34.5rem',
          mt: '0.125rem',
        })}
      />
      <label
        htmlFor="name1"
        className={css({
          pr: '0.275rem',
          bg: 'linear-gradient(transparent 40%, rgba(255, 105, 180, 0.6) 40%)',
        })}
      >
        名称
      </label>
      <Input id="name1" type="text" placeholder="名称1" />
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
          {invoiceTypes.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </label>
      <button type="submit">TODO: remove this</button>
    </form>
  );
}
