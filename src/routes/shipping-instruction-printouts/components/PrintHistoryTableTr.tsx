import React from 'react';

import { css } from 'styled-system/css';

import type { ShippingInstructionHistoryTbRow } from '../shippingInstructionPrintouts.types';

interface PrintHistoryTableTrProps {
  oneHistory: ShippingInstructionHistoryTbRow;
  currentIndex: number;
  parentMediaQuerySmall: string;
  parentMediaQueryHd: string;
  addRefMap: (id: string, node: HTMLTableRowElement | null) => void;
  handleSetStates: (index: number, printedAt: string) => void;
}

export default function PrintHistoryTableTr({
  oneHistory: po,
  currentIndex,
  parentMediaQuerySmall,
  parentMediaQueryHd,
  addRefMap,
  handleSetStates,
}: PrintHistoryTableTrProps): React.JSX.Element {
  // Panda CSS で使用する変数
  const smallScreen = '@media(width < 960px)';
  const hdScreen = '@media(width < 1280px)';

  if (parentMediaQuerySmall !== smallScreen || parentMediaQueryHd !== hdScreen) {
    throw new Error(
      `［値の完全一致が必要］： parentMediaQuerySmall: "${parentMediaQuerySmall}", smallScreen: "${smallScreen}", parentMediaQueryHd: "${parentMediaQueryHd}", hdScreen: "${hdScreen}"`,
    );
  }

  return (
    <tr
      ref={node => addRefMap(po.printed_at, node)}
      onClick={() => handleSetStates(currentIndex, po.printed_at)}
      onKeyDown={() => handleSetStates(currentIndex, po.printed_at)}
      role="button"
      className={css({ _even: { color: 'slate.950', bgColor: 'slate.200' }, cursor: 'pointer' })}
    >
      <td
        className={css({
          [smallScreen]: {
            maxW: '4.3rem',
            direction: 'rtl',
            overflow: 'hidden',
          },
        })}
      >
        {po.delivery_date}
      </td>
      <td className={css({ [smallScreen]: { display: 'none' } })}>{po.delivery_time_str}</td>
      <td
        className={`printed-at ${css({
          maxW: '8rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        })}`}
      >
        {po.printed_at}
      </td>
      <td className={css({ [smallScreen]: { display: 'none' } })}>{po.page_num_str}</td>
      <td
        className={`customer-id-and-name ${css({
          maxW: '16rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          [hdScreen]: { maxW: '11rem' },
        })}`}
      >
        <data value={po.non_fk_customer_id}>{po.customer_name}</data>
      </td>
      <td
        className={css({
          maxW: '12rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          [hdScreen]: { display: 'none' },
        })}
      >
        {po.customer_address}
      </td>
      <td className={css({ [smallScreen]: { display: 'none' } })}>{po.wholesaler}</td>
      <td
        className={css({
          maxW: '16rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          [hdScreen]: { display: 'none' },
        })}
      >
        {po.order_number}
      </td>
      <td
        className={css({
          [smallScreen]: {
            maxW: '4.3rem',
            direction: 'rtl',
            overflow: 'hidden',
          },
        })}
      >
        {po.shipping_date}
      </td>
      <td>{po.carrier}</td>
      <td>{po.package_count}</td>
      <td
        className={`items-of-order ${css({
          maxW: '16rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          [hdScreen]: { maxW: '11rem' },
        })}`}
      >
        {po.items_of_order}
      </td>
    </tr>
  );
}
