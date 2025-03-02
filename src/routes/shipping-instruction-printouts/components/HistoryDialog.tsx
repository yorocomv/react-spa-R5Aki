import React from 'react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { css } from 'styled-system/css';
import { FaX } from 'react-icons/fa6';
import { ShippingInstructionPrintHistoryTbRow } from '../shippingInstructionPrintouts.types';
import '@/components/ui/react-aria-modal-overlay.css';

interface HistoryDialogProps {
  oneHistory: ShippingInstructionPrintHistoryTbRow;
  isOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<number>>;
}

export default function HistoryDialog({ oneHistory: p, isOpen, closeModal }: HistoryDialogProps): JSX.Element {
  return (
    <Modal isDismissable isOpen={isOpen} onOpenChange={() => closeModal(-1)}>
      <Dialog
        className={css({
          pos: 'relative',
          w: 'clamp(17.5rem, 104%, 96vw)',
          maxH: '95lvh',
          overflow: 'scroll',
          p: '0.125rem 1rem 1rem',
          bgColor: 'amber.50',
          color: 'amber.950',
          fontWeight: 'bold',
          borderColor: 'amber.100',
          borderWidth: '1px',
          borderRadius: 'md',
          outline: 'none',
          boxShadow: 'md',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        })}
      >
        <header
          className={css({
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr auto 1fr',
            mb: '1rem',
          })}
        >
          <Heading
            slot="title"
            className={css({ gridColumn: '2/3', color: 'amber.600', fontFamily: 'Times New Roman', fontSize: 'lg' })}
          >
            詳細情報（編集不可）
          </Heading>
          <Button
            onPress={() => closeModal(-1)}
            className={css({
              gridColumn: '3/4',
              justifySelf: 'end',
              p: '0.175rem',
              borderRadius: '35%',
              _hover: {
                bgColor: 'amber.200',
              },
            })}
          >
            <FaX />
          </Button>
        </header>
        <table>
          <tbody>
            <tr>
              <th>着日</th>
              <td>{p.delivery_date}</td>
            </tr>
            <tr>
              <th>時間指定</th>
              <td>{p.delivery_time_str}</td>
            </tr>
            <tr>
              <th>印刷日時</th>
              <td>{p.printed_at}</td>
            </tr>
            <tr>
              <th>印刷頁</th>
              <td>{p.page_num_str}</td>
            </tr>
            <tr>
              <th>得意先名</th>
              <td>{p.customer_name}</td>
            </tr>
            <tr>
              <th>住所</th>
              <td>{p.customer_address}</td>
            </tr>
            <tr>
              <th>帳合</th>
              <td>{p.wholesaler}</td>
            </tr>
            <tr>
              <th>オーダーNo.</th>
              <td>{p.order_number}</td>
            </tr>
            <tr>
              <th>出荷予定日</th>
              <td>{p.shipping_date}</td>
            </tr>
            <tr>
              <th>運送会社</th>
              <td>{p.carrier}</td>
            </tr>
            <tr>
              <th>口数</th>
              <td>{p.package_count}</td>
            </tr>
            <tr>
              <th>商品</th>
              <td>
                <pre className={css({ overflowWrap: 'break-word' })}>{p.items_of_order}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </Dialog>
    </Modal>
  );
}
