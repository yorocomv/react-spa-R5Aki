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
  goToIndex: number;
};

export default function Lightbox({
  isOpen = false,
  setIsOpen,
  imgUrls,
  goToIndex,
}: LightboxProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const [isZoomed, setIsZoomed] = useState(false);
  // <button> の disabled 属性値。useEffect の中で使うのでリンターへの挨拶が一回で済むように一行にまとめた
  const [[prevBtnDisabled, nextBtnDisabled], setBtnDisabled] = useState([true, true]);
  // ドラッグ時のカーソル制御
  const [isGrabbing, setIsGrabbing] = useState(false);

  // 各スライドの TransformWrapper の参照（ref）を保存
  const transformRefs = useRef<(TransformWrapperRef | null)[]>([]);

  // ボタンの有効・無効を制御
  type EmblaCarouselType = ReturnType<typeof useEmblaCarousel>[1];
  const handleDisabledAttr = useCallback((emblaApi: EmblaCarouselType) => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setBtnDisabled([!emblaApi?.canGoToPrev(), !emblaApi?.canGoToNext()]);
  }, []);

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
  // ボタンの有効・無効の更新 と ズームのリセット
  const onSelect = useCallback(() => {
    handleDisabledAttr(emblaApi);

    transformRefs.current.forEach((wrapperRef) => {
      if (wrapperRef && wrapperRef.resetTransform) {
        wrapperRef.resetTransform();
      }
    });
    // ズームフラグのみを解除。reInit は、、、
    setIsZoomed(false);
    // 🚨 注意: ここで reInit を呼ぶとアニメーションが止まるので絶対に呼ばない！
  }, [emblaApi, handleDisabledAttr]);

  // 親(呼び出し元)で管理しているインデックスステートを監視
  // -1 以外の値になればスライド位置が指定されてモーダルがオープンされる
  useEffect (() => {
    if (!emblaApi)
      return;
    if (goToIndex > 0)
      emblaApi.goTo(goToIndex, true);
    // スライド位置決定後にボタンを更新
    handleDisabledAttr(emblaApi);
  }, [emblaApi, goToIndex, handleDisabledAttr]);

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
      w: 'min(6lvw, 96px)',
      h: 'min(6lvw, 96px)',
      p: 'min(1.5lvw, 24px)',
      bg: {
        base: 'color-mix(in oklab, #fff 30%, transparent)',
        _hover: 'color-mix(in oklab, #fff 40%, transparent)',
      },
      borderRadius: '50%',
      _active: { translate: '0 min(3lvw, 48px)' },
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
        bgImage: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7))',
        backdropFilter: 'blur(10px)',
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
          style={{
            '--button-offset': 'calc(-7lvw + max(0px, 6lvw - 96px))',
          } as React.CSSProperties}
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
                    // パン開始時にgrabbing状態にする
                    onPanningStart={() => setIsGrabbing(true)}
                    // パン終了時に元の状態に戻す
                    onPanningStop={() => setIsGrabbing(false)}
                  >
                    <TransformComponent wrapperStyle={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}>
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
            className={css(buttonStyles, { top: 0, right: 'var(--button-offset)' })}
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
            className={css(buttonStyles, { left: 'var(--button-offset)', transform: 'translate(0, -50%)' })}
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
            className={css(buttonStyles, { right: 'var(--button-offset)', transform: 'translate(0, -50%)' })}
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
