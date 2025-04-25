import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import Button from '@/components/ui/elements/Button';
import Input from '@/components/ui/elements/Input';
import TextArea from '@/components/ui/elements/TextArea';
import FormErrorMessage from '@/routes/customers/components/elementSwitchers/FormErrorMessage';
import { css } from 'styled-system/css';

import type { ShippingInstructionCorrection, ShippingInstructionPrintHistoryTbRow } from '../shippingInstructionPrintouts.types';

import { shippingInstructionCorrectionSchema } from '../shippingInstructionPrintouts.schemas';

export default function ShippingInstructionForm() {
  const location = useLocation();
  const aPrintRecord = location.state as ShippingInstructionPrintHistoryTbRow || {};
  // 修正専門
  if (!aPrintRecord)
    throw new Error('不正なルートでのアクセスを検知しました❢');

  console.log(aPrintRecord);
  const defaultValues: ShippingInstructionCorrection = shippingInstructionCorrectionSchema.parse(aPrintRecord);

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<ShippingInstructionCorrection>({
    mode: 'all',
    defaultValues,
    resolver: zodResolver(shippingInstructionCorrectionSchema),
  });

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
          id="delivery_date"
          type="date"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder="着日"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="delivery_time_str">
        時間指定
        <Input
          {...register('delivery_time_str')}
          id="delivery_time_str"
          type="text"
          placeholder="時間指定"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="page_num_str">
        頁
        <Input
          {...register('page_num_str')}
          id="page_num_str"
          type="text"
          placeholder="頁"
          className={css({
            w: '12rem',
          })}
        />
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
      </label>
      <label htmlFor="customer_address">
        住所
        <Input
          {...register('customer_address')}
          id="customer_address"
          type="text"
          placeholder="住所"
          className={css({
            w: '34.5rem',
          })}
        />
      </label>
      <label htmlFor="wholesaler">
        帳合
        <Input
          {...register('wholesaler')}
          id="wholesaler"
          type="text"
          placeholder="帳合"
          className={css({
            w: '34.5rem',
          })}
        />
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
      </label>
      <label htmlFor="shipping_date">
        出荷予定日
        <Input
          {...register('shipping_date')}
          id="shipping_date"
          type="date"
          placeholder="出荷予定日"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="carrier">
        運送会社
        <Input
          {...register('carrier')}
          id="carrier"
          type="text"
          placeholder="運送会社"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="package_count">
        口数
        <Input
          {...register('package_count', { onChange: handleChange })}
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
      </label>
      <div
        className={css({
          mt: 4,
        })}
      >
        <Button type="submit">
          修正
        </Button>
        <Button
          onClick={handleReset}
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
