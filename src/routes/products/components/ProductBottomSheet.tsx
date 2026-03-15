import { Dialog, Modal, ModalOverlay } from 'react-aria-components';
import '@/components/ui/reactAriaModalOverlayBottomSheet.css';

import { css } from 'styled-system/css';

import type { ViewSkuDetailsRow } from '../products.dbTable.types';

type ProductBottomSheetProps = ViewSkuDetailsRow & {
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  isOpen?: boolean;
};

export default function ProductBottomSheet(p: ProductBottomSheetProps) {
  const isOpen = p.isOpen ?? false;
  return (
    <ModalOverlay isDismissable isOpen={isOpen} onOpenChange={() => p.setSelectedItem(-1)}>
      <Modal>
        <Dialog className={css({
          w: '100vw',
          minH: '50dvh',
          maxH: '90dvh',
          bg: 'slate.400',
          outline: 'none',
          borderTopRadius: '1rem',
          shadow: '0 -0.5rem 1.25rem rgba(0 0 0 / 0.1)',
          overflow: 'scroll',
          scrollbarWidth: 'none',
        })}
        >
          {p.sku_name}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
