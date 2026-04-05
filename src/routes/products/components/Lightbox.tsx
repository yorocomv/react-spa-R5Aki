import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, Modal, ModalOverlay } from 'react-aria-components';
import { RxChevronLeft, RxChevronRight, RxCross2 } from 'react-icons/rx';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { css } from 'styled-system/css';

// TransformWrapperのRefの型を自動抽出
type TransformWrapperRef = React.ComponentRef<typeof TransformWrapper>;

interface LightboxProps {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<number>>;
  imgUrls: string[];
  startSnap: number;
};

export default function Lightbox({
  isOpen = false,
  setIsOpen,
  imgUrls,
  startSnap,
}: LightboxProps) {
  // useEmblaCarousel({ loop: false }) は不安定😫💦
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startSnap });
  const [isZoomed, setIsZoomed] = useState(false);
  // 次のスライドがあるか？
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(startSnap === 0);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(
    imgUrls.length <= 1 || startSnap === imgUrls.length - 1,
  );

  // 各スライドの TransformWrapper の参照（ref）を保存
  const transformRefs = useRef<(TransformWrapperRef | null)[]>([]);

  // ズーム状態が変化したときに発火する関数
  const handleTransformed = useCallback((ref: TransformWrapperRef) => {
    if (!emblaApi)
      return;

    const currentScale = ref.instance.transformState.scale;

    if (currentScale > 1) {
      if (!isZoomed) {
        setIsZoomed(true);
        emblaApi.reInit({ draggable: false });
      }
    }
    else {
      if (isZoomed) {
        setIsZoomed(false);
        emblaApi.reInit({ draggable: true });
      }
    }
  }, [emblaApi, isZoomed]);

  // スライドの「切り替えが始まった」時の処理
  // ボタンの有効・無効を更新 と ズームのリセット
  const onSelect = useCallback(() => {
    setPrevBtnDisabled(!emblaApi?.canGoToPrev());
    setNextBtnDisabled(!emblaApi?.canGoToNext());

    transformRefs.current.forEach((wrapperRef) => {
      if (wrapperRef && wrapperRef.resetTransform) {
        wrapperRef.resetTransform();
      }
    });
    // ズームフラグのみを解除。reInit は、、、
    setIsZoomed(false);
    // 🚨 注意: ここで reInit を呼ぶとアニメーションが止まるので絶対に呼ばない！
  }, [emblaApi]);

  // スライドの切り替わり
  useEffect(() => {
    if (!emblaApi)
      return;

    // スライドの「アニメーションが完全に終わった」時の処理
    const onSettle = () => {
      // アニメーション完了後に安全にEmblaのスワイプを再有効化する
      emblaApi.reInit({ draggable: true });
    };

    // Emblaのスライド切り替えイベントを監視
    emblaApi.on('select', onSelect);
    // スライドが完全に終わった時
    emblaApi.on('settle', onSettle);

    // クリーンアップ関数
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, onSelect]);

  const goToPrev = () => emblaApi?.goToPrev();
  const goToNext = () => emblaApi?.goToNext();

  const buttonStyles = css.raw({
    pos: 'absolute',
    top: '50%',
    display: {
      base: 'inline-flex',
      _disabled: 'none',
    },
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',

    '&>svg': {
      w: '6lvw',
      h: '6lvw',
      p: '1.5lvw',
      bg: {
        base: 'color-mix(in oklab, #fff 30%, transparent)',
        _hover: 'color-mix(in oklab, #fff 40%, transparent)',
      },
      borderRadius: '50%',
      _active: { translate: '0 3lvw' },
    },
  });
  const spanStyles = css.raw({
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
    w: '1px',
    h: '1px',
    m: '-1px',
    p: 0,
    pos: 'absolute',
    overflow: 'hidden',
  });

  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(-1)}
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
        <Dialog
          aria-label="images"
          className={css({
            pos: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <div ref={emblaRef} className={css({ overflow: 'hidden' })}>
            <div className={css({ display: 'flex', touchAction: 'pan-y pinch-zoom', maxW: '84lvw' })}>
              {imgUrls.map((url, index) => (

                <div
                  key={url}
                  className={css({
                    flex: '0 0 100%',
                    minW: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  })}
                >
                  <TransformWrapper
                  // refを取得して配列に格納する
                  // 波括弧 `{}` を使って void（戻り値なし）にする
                    ref={(el) => { transformRefs.current[index] = el; }}
                    onTransformed={handleTransformed}
                    panning={{ disabled: !isZoomed }}
                    doubleClick={{ mode: 'reset' }}
                  >
                    <TransformComponent>
                      <img
                        src={url}
                        alt="写真"
                        draggable={false}
                        className={css({
                          maxH: '90lvh',
                          userSelect: 'none', // テキスト選択禁止
                        })}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(-1)}
            className={css(buttonStyles, { top: 0, right: '-7lvw' })}
          >
            <RxCross2 />
            <span className={css(spanStyles)}>
              Close modal
            </span>
          </button>
          <button
            type="button"
            onClick={goToPrev}
            disabled={prevBtnDisabled}
            className={css(buttonStyles, { left: '-7lvw' })}
          >
            <RxChevronLeft />
            <span className={css(spanStyles)}>
              Scroll to prev
            </span>
          </button>
          <button
            type="button"
            onClick={goToNext}
            disabled={nextBtnDisabled}
            className={css(buttonStyles, { right: '-7lvw' })}
          >
            <RxChevronRight />
            <span className={css(spanStyles)}>
              Scroll to next
            </span>
          </button>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
