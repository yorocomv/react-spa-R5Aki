import React from 'react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { css } from 'styled-system/css';
import CommonFloatingDeleteButton from '@/components/ui/CommonFloatingDeleteButton';
import { IoCloseOutline } from 'react-icons/io5';
import { useDeletePrintHistory } from './hooks/useDeletePrintHistory';
import { ShippingInstructionPrintHistoryTbRow } from '../shippingInstructionPrintouts.types';
import '@/components/ui/react-aria-modal-overlay.css';

interface HistoryDialogProps {
  oneHistory: ShippingInstructionPrintHistoryTbRow;
  isOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<number>>;
}

export default function HistoryDialog({ oneHistory: p, isOpen, closeModal }: HistoryDialogProps): JSX.Element {
  const { deletePrintHistory } = useDeletePrintHistory({ delivery_date: p.delivery_date, printed_at: p.printed_at });
  const handleClickDelete = async () => {
    try {
      const response = await deletePrintHistory();
      closeModal(-1);
      console.log(response);
    } catch (err: unknown) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
    }
  };
  return (
    <Modal isDismissable isOpen={isOpen} onOpenChange={() => closeModal(-1)}>
      <Dialog
        className={css({
          pos: 'relative',
          w: 'clamp(17.5rem, 104%, 96vw)',
          maxH: '95lvh',
          overflow: 'scroll',
          p: '0.125rem 1rem 1rem',
          bgColor: 'slate.50',
          color: 'slate.950',
          fontWeight: 'bold',
          borderColor: 'slate.100',
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
            className={css({
              gridColumn: '2/3',
              color: 'slate.400',
              fontFamily: '"Yu Mincho", YuMincho, serif',
              fontSize: '1.125rem',
            })}
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
                bgColor: 'slate.200',
              },
            })}
          >
            <IoCloseOutline size="1.625rem" />
          </Button>
        </header>
        <table
          className={css({
            w: 'fit-content',
            maxW: '100%',
            fontFamily: 'Meiryo, sans-serif',
            p: '0.375rem',
            mb: '2.375rem',
            borderCollapse: 'separate',
            borderSpacing: '0.375rem',
            border: 'solid 1px',
            borderColor: 'teal.100',
            color: 'teal.950',
            bgColor: 'teal.50/75',
            borderRadius: 'lg',
          })}
        >
          <tbody
            className={css({
              '& :is(th, td)': { p: '0.75rem 1rem' },
              '&>tr>th': {
                pos: 'relative',
                minW: '8.5rem',
                verticalAlign: 'middle',
                textAlign: 'left',
                fontWeight: 'normal',
                color: 'slate.950',
                bgColor: 'slate.200',
                borderRadius: 'lg',
                _after: {
                  pos: 'absolute',
                  content: '""',
                  w: 0,
                  h: 0,
                  left: '100%',
                  top: '50%',
                  border: 'solid transparent',
                  borderLeftColor: 'slate.200',
                  borderWidth: '0.625rem',
                  mt: '-0.625rem',
                },
              },
            })}
          >
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
        <CommonFloatingDeleteButton label="削除" position="sticky" handleClickDelete={handleClickDelete} />
      </Dialog>
    </Modal>
  );
}
