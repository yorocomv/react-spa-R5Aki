import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';

import Button from '@/components/ui/elements/Button';
import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import { css } from 'styled-system/css';

import type { CustomerForm as CustomerFormTypes, CustomersTbRow } from '../customers.types';

import { useFetchAddressData } from '../../address-data-by-zip-code/components/hooks/useFetchAddressData';
import { customerFormSchema } from '../customers.schemas';
import FormErrorMessage from './elementSwitchers/FormErrorMessage';
import FloatingDeleteButton from './FloatingDeleteButton';
import { useFetchInvoiceTypes } from './hooks/useFetchInvoiceTypes';
import { useRegisterCustomer } from './hooks/useRegisterCustomer';

export default function CustomerForm() {
  const location = useLocation();
  const url = location.pathname;
  const customer = (location.state as CustomersTbRow) || {};
  const { id: customerId } = useParams();
  const navigate = useNavigate();

  // 新規登録のパスをベタ書き。id に 0 は無い
  if (!customer.id && url !== '/customers/register')
    throw new Error('不正なルートでのアクセスを検知しました❢');
  if (customerId && customerId !== customer.id.toString())
    throw new Error('不正なルートでのアクセスを検知しました❢');

  const defaultValues: CustomerFormTypes = {
    tel: customer.tel || '',
    zip_code: customer.zip_code || '',
    address1: customer.address1 || '',
    address2: customer.address2 || '',
    address3: customer.address3 || '',
    name1: customer.name1 || '',
    name2: customer.name2 || '',
    alias: customer.alias || '',
    // invoice_type_id に 0 は無い
    invoice_type_id: customer.invoice_type_id || 1,
  };
  const { registerCustomer } = useRegisterCustomer();
  const { invoiceTypes } = useFetchInvoiceTypes();
  const { ejpcReturnData, setZipCodeStr, hasResultOfQuery, setHasResultOfQuery } = useFetchAddressData();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormTypes>({
    mode: 'all',
    defaultValues,
    resolver: zodResolver(customerFormSchema),
  });

  // https://github.com/react-hook-form/react-hook-form/discussions/2549
  const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>, nextId?: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextId) {
        document.getElementById(nextId)?.focus();
      }
    }
  };

  const onSubmit: SubmitHandler<CustomerFormTypes> = async (values): Promise<void> => {
    try {
      let response: CustomersTbRow;
      if (customer.id) {
        response = await registerCustomer({ mode: customer.id, values });
      }
      else {
        response = await registerCustomer({ mode: 'create', values });
      }
      // https://github.com/remix-run/react-router/issues/12348
      Promise.resolve(navigate(`/customers/${response.id}/decide`, { state: response })).catch((err: string) => {
        throw new Error(err);
      });
    }
    catch (err: unknown) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
    }
  };
  // https://github.com/orgs/react-hook-form/discussions/8020#discussioncomment-2584580
  function onPromise<T>(promise: (event: React.SyntheticEvent) => Promise<T>) {
    return (event: React.SyntheticEvent) => {
      if (promise) {
        promise(event).catch((error) => {
          console.error('Unexpected error', error);
        });
      }
    };
  }
  // 郵便番号入力欄のみを監視
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCodeStr(e.currentTarget.value);
  };
  const handleReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    reset();
  };

  useEffect(() => {
    if (hasResultOfQuery && ejpcReturnData.address !== null) {
      const { prefectures, city, other } = ejpcReturnData.address;
      const town = other.replace(/[(（][^(（]+$/, '');
      const address1 = getValues('address1');

      if (/^[ \u3000]*$/.test(address1)) {
        setValue('address1', prefectures + city + town);
      }
      setHasResultOfQuery(false);
      setZipCodeStr('');
      setFocus('address1');
    }
    else if (hasResultOfQuery && ejpcReturnData.error !== null) {
      const { noFirstThreeDigits, notFound } = ejpcReturnData.error;
      if (noFirstThreeDigits ?? notFound) {
        setError('zip_code', {
          type: 'manual',
          message: '⚠️郵便番号が見つかりません⚠️',
        });
      }
      setHasResultOfQuery(false);
      setZipCodeStr('');
      setFocus('zip_code');
    }
  }, [
    ejpcReturnData.address,
    ejpcReturnData.error,
    getValues,
    hasResultOfQuery,
    setError,
    setFocus,
    setHasResultOfQuery,
    setValue,
    setZipCodeStr,
  ]);

  return (
    <>
      <form
        onSubmit={onPromise(handleSubmit(onSubmit))}
        autoComplete="off"
        className={css({
          '&> label': {
            pl: '0.125rem',
          },
        })}
      >
        <label htmlFor="tel">
          電話番号
          <Input
            {...register('tel')}
            onKeyDown={e => checkKeyDown(e, 'zip_code')}
            id="tel"
            type="tel"
            // eslint-disable-next-line jsx-a11y/no-autofocus
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
          <a
            href="https://www.post.japanpost.jp/zipcode/index.html"
            target="_blank"
            title="〒郵便局のサイトへ"
            rel="noreferrer"
            tabIndex={-1}
          >
            {' '}
            🔎
          </a>
          <Input
            {...register('zip_code', { onChange: handleChange })}
            onKeyDown={e => checkKeyDown(e, 'address1')}
            id="zip_code"
            type="tel"
            placeholder="郵便番号"
            className={css({
              w: 28,
            })}
          />
        </label>
        <FormErrorMessage message={errors.zip_code?.message} />
        <label htmlFor="address1">住所</label>
        <Input
          {...register('address1')}
          onKeyDown={e => checkKeyDown(e, 'address2')}
          id="address1"
          type="text"
          placeholder="住所1"
          className={css({
            w: '34.5rem',
          })}
        />
        <FormErrorMessage message={errors.address1?.message} />
        <Input
          {...register('address2')}
          onKeyDown={e => checkKeyDown(e, 'address3')}
          id="address2"
          type="text"
          placeholder="住所2"
          className={css({
            w: '34.5rem',
            mt: '0.125rem',
          })}
        />
        <FormErrorMessage message={errors.address2?.message} />
        <Input
          {...register('address3')}
          onKeyDown={e => checkKeyDown(e, 'name1')}
          id="address3"
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
          {...register('name1')}
          onKeyDown={e => checkKeyDown(e, 'name2')}
          id="name1"
          type="text"
          placeholder="名称1"
          className={css({
            w: '32.5rem',
          })}
        />
        <FormErrorMessage message={errors.name1?.message} />
        <Input
          {...register('name2')}
          onKeyDown={e => checkKeyDown(e, 'alias')}
          id="name2"
          type="text"
          placeholder="名称2"
          className={css({
            w: '32.5rem',
            mt: '0.125rem',
          })}
        />
        <FormErrorMessage message={errors.name2?.message} />
        <label htmlFor="alias">
          検索用の別名
          <Input
            {...register('alias')}
            onKeyDown={e => checkKeyDown(e, 'tel')}
            id="alias"
            type="text"
            placeholder="検索用の別名"
            className={css({
              w: '32.5rem',
            })}
          />
        </label>
        <FormErrorMessage message={errors.alias?.message} />
        <label>
          伝票の種類
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
          <Button disabled={isSubmitting} type="submit">
            {customerId ? '修正' : '登録'}
          </Button>
          <Button
            onClick={handleReset}
            onKeyDown={checkKeyDown}
            disabled={isSubmitting}
            variant="redo"
            className={css({
              ml: 1,
            })}
          >
            {customerId ? 'リセット' : 'クリア'}
          </Button>
        </div>
      </form>
      {customerId ? <FloatingDeleteButton customer={customer} label="削除" /> : null}
    </>
  );
}
