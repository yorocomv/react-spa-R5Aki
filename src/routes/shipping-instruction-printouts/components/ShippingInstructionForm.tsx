import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import Button from '@/components/ui/elements/Button';
import Input from '@/components/ui/elements/Input';
import TextArea from '@/components/ui/elements/TextArea';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import checkKeyDown from '@/libs/checkKeyDown';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import type { ShippingInstructionCorrection, ShippingInstructionHistoryTbRow } from '../shippingInstructionPrintouts.types';

import { shippingInstructionCorrectionSchema } from '../shippingInstructionPrintouts.schemas';
import { useCorrectPrintHistory } from './hooks/useCorrectPrintHistory';

export default function ShippingInstructionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const aPrintRecord = location.state as ShippingInstructionHistoryTbRow || {};
  // 修正専門
  if (!aPrintRecord)
    throw new Error('不正なルートでのアクセスを検知しました❢');

  const { correctPrintHistory } = useCorrectPrintHistory({ delivery_date: aPrintRecord.delivery_date, printed_at: aPrintRecord.printed_at });

  const defaultValues: ShippingInstructionCorrection = shippingInstructionCorrectionSchema.parse(aPrintRecord);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ShippingInstructionCorrection>({
    mode: 'all',
    defaultValues,
    resolver: zodResolver(shippingInstructionCorrectionSchema),
  });

  const onSubmit: SubmitHandler<ShippingInstructionCorrection> = async (values): Promise<void> => {
    try {
      const response = await correctPrintHistory(values);
      console.log(response);
      // https://github.com/remix-run/react-router/issues/12348
      Promise.resolve(navigate('/shipping-instruction-printouts'))
        .catch((err: string) => {
          throw new Error(err);
        });
    }
    catch (err: unknown) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
    }
  };

  // 口数入力欄のみ監視
  const [packageCount, setPackageCount] = useState(defaultValues.package_count);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPackageCount(e.currentTarget.valueAsNumber);
  };
  const handleReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    reset();
  };

  // 口数欄は数値固定だが、0 の時は透明化
  const packageCountStyles = css.raw({
    w: '12rem',
    color: packageCount ? 'currentcolor' : 'transparent',
  });

  return (
    <form
      onSubmit={onPromise(handleSubmit(onSubmit))}
      autoComplete="off"
      className={css({
        '&> label': {
          pl: '0.125rem',
        },
      })}
    >
      <label htmlFor="delivery_date">
        着日
        <Input
          {...register('delivery_date')}
          onKeyDown={e => checkKeyDown(e, 'delivery_time_str')}
          id="delivery_date"
          type="date"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder="着日"
          className={css({
            w: '12rem',
          })}
        />
        <FormErrorMessage message={errors.delivery_date?.message} />
      </label>
      <label htmlFor="delivery_time_str">
        時間指定
        <Input
          {...register('delivery_time_str')}
          onKeyDown={e => checkKeyDown(e, 'page_num_str')}
          id="delivery_time_str"
          type="text"
          placeholder="時間指定"
          className={css({
            w: '12rem',
          })}
        />
        <FormErrorMessage message={errors.delivery_time_str?.message} />
      </label>
      <label htmlFor="page_num_str">
        頁
        <Input
          {...register('page_num_str')}
          onKeyDown={e => checkKeyDown(e, 'customer_name')}
          id="page_num_str"
          type="text"
          placeholder="頁"
          className={css({
            w: '12rem',
          })}
        />
        <FormErrorMessage message={errors.page_num_str?.message} />
      </label>
      <label htmlFor="customer_name">
        名前
        <TextArea
          {...register('customer_name')}
          id="customer_name"
          placeholder="名前"
          className={css({
            w: '34.5rem',
            h: '3.5rem',
          })}
        />
        <FormErrorMessage message={errors.customer_name?.message} />
      </label>
      <label htmlFor="customer_address">
        住所
        <Input
          {...register('customer_address')}
          onKeyDown={e => checkKeyDown(e, 'wholesaler')}
          id="customer_address"
          type="text"
          placeholder="住所"
          className={css({
            w: '34.5rem',
          })}
        />
        <FormErrorMessage message={errors.customer_address?.message} />
      </label>
      <label htmlFor="wholesaler">
        帳合
        <Input
          {...register('wholesaler')}
          onKeyDown={e => checkKeyDown(e, 'order_number')}
          id="wholesaler"
          type="text"
          placeholder="帳合"
          className={css({
            w: '34.5rem',
          })}
        />
        <FormErrorMessage message={errors.wholesaler?.message} />
      </label>
      <label htmlFor="order_number">
        オーダーＮｏ
        <TextArea
          {...register('order_number')}
          id="order_number"
          placeholder="オーダーＮｏ"
          className={css({
            w: '34.5rem',
            h: '3.5rem',
          })}
        />
        <FormErrorMessage message={errors.order_number?.message} />
      </label>
      <label htmlFor="shipping_date">
        出荷予定日
        <Input
          {...register('shipping_date')}
          onKeyDown={e => checkKeyDown(e, 'carrier')}
          id="shipping_date"
          type="date"
          placeholder="出荷予定日"
          className={css({
            w: '12rem',
          })}
        />
        <FormErrorMessage message={errors.shipping_date?.message} />
      </label>
      <label htmlFor="carrier">
        運送会社
        <Input
          {...register('carrier')}
          onKeyDown={e => checkKeyDown(e, 'package_count')}
          id="carrier"
          type="text"
          placeholder="運送会社"
          className={css({
            w: '12rem',
          })}
        />
        <FormErrorMessage message={errors.carrier?.message} />
      </label>
      <label htmlFor="package_count">
        口数
        <Input
          {...register('package_count', { onChange: handleChange })}
          onKeyDown={e => checkKeyDown(e, 'items_of_order')}
          id="package_count"
          type="number"
          placeholder="口数"
          className={css(packageCountStyles)}
        />
        <FormErrorMessage message={errors.package_count?.message} />
      </label>
      <label htmlFor="items_of_order">
        注文内容
        <TextArea
          {...register('items_of_order')}
          id="items_of_order"
          placeholder="注文内容"
          className={css({
            w: '34.5rem',
            h: '15rem',
          })}
        />
        <FormErrorMessage message={errors.items_of_order?.message} />
      </label>
      <div
        className={css({
          mt: 4,
        })}
      >
        <Button disabled={isSubmitting} type="submit">
          修正
        </Button>
        <Button
          onClick={handleReset}
          disabled={isSubmitting}
          variant="redo"
          className={css({
            ml: 1,
          })}
        >
          リセット
        </Button>
      </div>
    </form>
  );
}
