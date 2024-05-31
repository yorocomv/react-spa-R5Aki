import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { FaX } from 'react-icons/fa6';
import EditButton from './elements/Button';
import './react-aria-modal-overlay.css';
import { css } from '../../../../styled-system/css';
import { CustomersTbRow } from '../customers.types';

interface NoteInDialogProps {
  currentPage: number;
  totalPages: number;
  body: string;
  isOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<number>>;
  currentRank: number;
  customer: CustomersTbRow;
}

export default function NoteInDialog({
  currentPage,
  totalPages,
  body,
  isOpen,
  closeModal,
  currentRank,
  customer,
}: NoteInDialogProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <Modal isDismissable isOpen={isOpen} onOpenChange={() => closeModal(-1)}>
      <Dialog
        className={css({
          pos: 'relative',
          maxW: '36.5rem',
          minW: '17.5rem',
          p: '0.125rem 1rem 1rem',
          bgColor: 'amber.50',
          color: 'amber.950',
          fontWeight: 'bold',
          borderColor: 'amber.100',
          borderWidth: '1px',
          borderRadius: 'md',
          boxShadow: 'md',
        })}
      >
        <>
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
            >{`✍ Note【${currentPage} / ${totalPages}】`}</Heading>
            <Button
              onPress={() => closeModal(-1)}
              className={css({
                gridColumn: '3/4',
                justifySelf: 'end',
                p: '0.125rem',
                borderRadius: '50%',
                _hover: {
                  bgColor: 'amber.200',
                },
              })}
            >
              <FaX />
            </Button>
          </header>
          <pre
            className={css({
              overflowWrap: 'break-word',
            })}
          >
            {body}
          </pre>
          <EditButton
            onClick={() =>
              navigate(`/customers/${customer.id}/take-a-note?rank=${currentRank}`, {
                relative: 'path',
                state: { ...customer },
              })
            }
            variant="edit"
            className={css({
              display: 'block',
              fontSize: 'sm',
              lineHeight: '1.25rem',
              mt: '2.5rem',
              ml: 'auto',
              mr: 0,
            })}
          >
            編集
          </EditButton>
        </>
      </Dialog>
    </Modal>
  );
}
