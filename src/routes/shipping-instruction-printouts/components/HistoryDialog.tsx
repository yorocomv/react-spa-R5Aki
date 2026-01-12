import { today } from '@internationalized/date';
import React from 'react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { IoCloseOutline } from 'react-icons/io5';
import { VscGoToSearch } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router';

import CommonFloatingDeleteButton from '@/components/ui/CommonFloatingDeleteButton';

import '@/components/ui/reactAriaModalOverlay.css';

import { css } from 'styled-system/css';

import type { ShippingInstructionHistoryTbRow } from '../shippingInstructionPrintouts.types';
import type { useFetchPrintHistoryStates } from './hooks/useFetchPrintHistory';

import { useDeletePrintHistory } from './hooks/useDeletePrintHistory';

interface HistoryDialogProps {
  oneHistory: ShippingInstructionHistoryTbRow;
  isOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<number>>;
}

export default function HistoryDialog({ oneHistory: p, isOpen, closeModal }: HistoryDialogProps): React.JSX.Element {
  const { deletePrintHistory } = useDeletePrintHistory({ delivery_date: p.delivery_date, printed_at: p.printed_at });
  const handleClickDelete = async () => {
    try {
      const response = await deletePrintHistory();
      closeModal(-1);
      console.log(response);
    }
    catch (err: unknown) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
    }
  };
  const deliveryJsDate = new Date(p.delivery_date);
  const deliveryWeekString = new Intl.DateTimeFormat('ja-JP', {
    weekday: 'short',
    timeZone: 'Asia/Tokyo',
  }).format(deliveryJsDate);
  const formattedDeliveryDate = deliveryJsDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', dateStyle: 'short' });
  const shippingJsDate = new Date(p.shipping_date);
  const shippingWeekString = new Intl.DateTimeFormat('ja-JP', {
    weekday: 'short',
    timeZone: 'Asia/Tokyo',
  }).format(shippingJsDate);
  const formattedShippingDate = shippingJsDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', dateStyle: 'short' });

  const navigate = useNavigate();
  const todayDate = today('Asia/Tokyo');
  const handleNavigatePrintHistoryWithCustomerId = () => {
    // https://github.com/remix-run/react-router/issues/12348
    Promise.resolve(
      navigate('/shipping-instruction-printouts', {
        relative: 'path',
        state: {
          category: 'delivery_date',
          non_fk_customer_id: p.non_fk_customer_id,
          dateA: todayDate.add({ weeks: 2 }),
          dateB: todayDate.subtract({ years: 1 }),
        } as useFetchPrintHistoryStates,
      }),
    ).catch((err: string) => {
      throw new Error(err);
    });
  };

  return (
    <Modal isDismissable isOpen={isOpen} onOpenChange={() => closeModal(-1)}>
      <Dialog
        className={css({
          pos: 'relative',
          w: 'clamp(17.5rem, 104%, 96vw)',
          maxH: '95lvh',
          overflow: 'scroll',
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
            pt: '0.125rem',
            mb: '1rem',
          })}
        >
          <Heading
            slot="title"
            className={css({
              gridColumn: '2/3',
              color: 'slate.400',
              fontSize: '1.125rem',
            })}
          >
            詳細情報（
            <Link to="./correct" relative="path" state={p}>訂正✒️</Link>
            ）
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
        <div className={css({
          px: '1rem',
          pb: '1rem',
          mb: '2.375rem',
        })}
        >
          <table
            className={css({
              w: 'fit-content',
              minW: '30rem',
              maxW: '100%',
              mx: 'auto',
              p: '0.375rem',
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
                  w: '8.5rem',
                  verticalAlign: 'middle',
                  textAlign: 'left',
                  fontSize: 'sm',
                  fontWeight: 'normal',
                  color: 'slate.950',
                  bgColor: 'slate.200',
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
                '&>tr:first-child>th': { borderTopLeftRadius: 'lg' },
                '&>tr:last-child>th': { borderBottomLeftRadius: 'lg' },
              })}
            >
              <tr>
                <th>着日</th>
                <td>{`${formattedDeliveryDate}（${deliveryWeekString}）`}</td>
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
                <th className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                })}
                >
                  得意先名
                  <VscGoToSearch
                    onClick={handleNavigatePrintHistoryWithCustomerId}
                    role="button"
                    className={css({
                      fontSize: '1.125rem',
                      color: 'teal.900',
                      _hover: {
                        color: 'teal.600',
                        filter: 'drop-shadow(1px -1px 0 #99f6e4)',
                        cursor: 'pointer',
                      },
                    })}
                  />
                </th>
                <td>
                  <pre className={css({ overflowWrap: 'break-word' })}>{p.customer_name}</pre>
                </td>
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
                <td>
                  <pre className={css({ overflowWrap: 'break-word' })}>{p.order_number}</pre>
                </td>
              </tr>
              <tr>
                <th>出荷予定日</th>
                <td>{`${formattedShippingDate}（${shippingWeekString}）`}</td>
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
        </div>
        <CommonFloatingDeleteButton label="削除" position="sticky" handleClickDelete={handleClickDelete} />
      </Dialog>
    </Modal>
  );
}
