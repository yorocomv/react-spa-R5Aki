import { useLocation } from 'react-router';

import Button from '@/components/ui/elements/Button';
import Input from '@/components/ui/elements/Input';
import { css } from 'styled-system/css';

import type { ShippingInstructionCorrection, ShippingInstructionPrintHistoryTbRow } from '../shippingInstructionPrintouts.types';

export default function ShippingInstructionForm() {
  const location = useLocation();
  const aPrintRecord = location.state as ShippingInstructionPrintHistoryTbRow || {};
  // 修正専門
  if (!aPrintRecord)
    throw new Error('不正なルートでのアクセスを検知しました❢');

  const defaultValues: ShippingInstructionCorrection = {
    ...aPrintRecord,
    package_count: aPrintRecord.package_count ? aPrintRecord.package_count.toString() : '',
  };
  console.log(defaultValues);

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
        <Input
          id="customer_name"
          type="text"
          placeholder="名前"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="customer_address">
        住所
        <Input
          id="customer_address"
          type="text"
          placeholder="住所"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="wholesaler">
        帳合
        <Input
          id="wholesaler"
          type="text"
          placeholder="帳合"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="order_number">
        オーダーＮｏ
        <Input
          id="order_number"
          type="text"
          placeholder="オーダーＮｏ"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="shipping_date">
        出荷予定日
        <Input
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
          id="package_count"
          type="number"
          placeholder="口数"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="items_of_order">
        注文内容
        <Input
          id="items_of_order"
          type="text"
          placeholder="注文内容"
          className={css({
            w: '12rem',
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
