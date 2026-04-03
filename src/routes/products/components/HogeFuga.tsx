import useEmblaCarousel from 'embla-carousel-react';
import { Dialog, Modal, ModalOverlay } from 'react-aria-components';

import { css } from 'styled-system/css';

export default function HogeFuga({
  isOpen = false,
  setIsOpen,
  imgUrls,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imgUrls: string[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const goToPrev = () => emblaApi?.goToPrev();
  const goToNext = () => emblaApi?.goToNext();

  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className={css({
        pos: 'fixed',
        top: 0,
        left: 0,
        w: '100lvw',
        h: 'var(--visual-viewport-height)',
        bg: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      })}
    >
      <Modal className={css({
        '&[data-entering]': { animation: 'depthFadeIn 480ms cubic-bezier(.16, 1, .3, 1)' },
        '&[data-exiting]': { animation: 'depthFadeOut 360ms cubic-bezier(.4, 0, .2, 1)' },
      })}
      >
        <Dialog className={css({
          pos: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bg: 'red.300',
          w: '100%',
          maxW: '90lvw',
        })}
        >
          <div ref={emblaRef} className={css({ overflow: 'hidden' })}>
            <div className={css({ display: 'flex', touchAction: 'pan-y pinch-zoom' })}>
              {imgUrls.map((url, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className={css({ flex: '0 0 100%', minW: 0 })}>
                  <img src={url} alt="写真" className={css({ maxH: '90lvh' })} />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={goToPrev}
            className={css({
              pos: 'absolute',
              top: '50%',
              left: 'calc(.25rem * -12)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            Scroll to prev
          </button>
          <button
            type="button"
            onClick={goToNext}
            className={css({
              pos: 'absolute',
              top: '50%',
              right: 'calc(.25rem * -12)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            Scroll to next
          </button>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
