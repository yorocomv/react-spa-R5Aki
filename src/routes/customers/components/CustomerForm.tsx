import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '../../../../styled-system/css';
import Input from './elements/Input';
import Select from './elements/Select';
import Button from './elements/Button';
import { useFetchInvoiceTypes } from './hooks/useFetchInvoiceTypes';
import { customerFormSchema } from '../customers.schemas';
import { CustomerForm as CustomerFormTypes } from '../customers.types';
import FormErrorMessage from './elementSwitchers/FormErrorMessage';

export default function CustomerForm() {
  const { invoiceTypes } = useFetchInvoiceTypes();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormTypes>({
    mode: 'all',
    resolver: zodResolver(customerFormSchema),
  });

  // https://github.com/react-hook-form/react-hook-form/discussions/2549
  const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onSubmit: SubmitHandler<CustomerFormTypes> = (d) => console.log(d);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css({
        '&> label': {
          pl: '0.125rem',
        },
      })}
    >
      <label>
        電話番号
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('tel')}
          onKeyDown={checkKeyDown}
          type="text"
          autoFocus
          placeholder="電話番号"
          className={css({
            w: 40,
          })}
        />
      </label>
      <FormErrorMessage message={errors.tel?.message} />
      <label>
        郵便番号
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('zip_code')}
          onKeyDown={checkKeyDown}
          type="text"
          placeholder="郵便番号"
          className={css({
            w: 28,
          })}
        />
      </label>
      <FormErrorMessage message={errors.zip_code?.message} />
      <label htmlFor="address1">住所</label>
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('address1')}
        onKeyDown={checkKeyDown}
        id="address1"
        type="text"
        placeholder="住所1"
        className={css({
          w: '34.5rem',
        })}
      />
      <FormErrorMessage message={errors.address1?.message} />
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('address2')}
        onKeyDown={checkKeyDown}
        type="text"
        placeholder="住所2"
        className={css({
          w: '34.5rem',
          mt: '0.125rem',
        })}
      />
      <FormErrorMessage message={errors.address2?.message} />
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('address3')}
        onKeyDown={checkKeyDown}
        type="text"
        placeholder="住所3"
        className={css({
          w: '34.5rem',
          mt: '0.125rem',
        })}
      />
      <FormErrorMessage message={errors.address3?.message} />
      <label
        htmlFor="name1"
        className={css({
          pr: '0.275rem',
          bg: 'linear-gradient(transparent 40%, rgba(255, 105, 180, 0.6) 40%)',
        })}
      >
        名称
      </label>
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('name1')}
        onKeyDown={checkKeyDown}
        id="name1"
        type="text"
        placeholder="名称1"
      />
      <FormErrorMessage message={errors.name1?.message} />
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('name2')}
        onKeyDown={checkKeyDown}
        type="text"
        placeholder="名称2"
        className={css({
          mt: '0.125rem',
        })}
      />
      <FormErrorMessage message={errors.name2?.message} />
      <label>
        検索用の別名
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('alias')}
          onKeyDown={checkKeyDown}
          type="text"
          placeholder="検索用の別名"
        />
      </label>
      <FormErrorMessage message={errors.alias?.message} />
      <label>
        伝票の種類
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Select {...register('invoice_type_id')}>
          {invoiceTypes.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </label>
      <FormErrorMessage message={errors.invoice_type_id?.message} />
      <div
        className={css({
          mt: 4,
        })}
      >
        <Button type="submit">登録</Button>
        <Button
          onKeyDown={checkKeyDown}
          variant="redo"
          className={css({
            ml: 1,
          })}
        >
          クリア
        </Button>
      </div>
    </form>
  );
}
