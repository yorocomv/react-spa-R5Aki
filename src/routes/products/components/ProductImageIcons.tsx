import { useState } from 'react';

import Lightbox from '@/routes/products/components/Lightbox';
import { css } from 'styled-system/css';

export default function ProductImageIcons({
  imageUrls,
}: {
  imageUrls: string[];
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(-1);
  const diameter = '4rem';

  return (
    <>
      <div className={css({
        w: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, ${diameter})`,
        justifyContent: 'center',
        gap: '1rem',
        py: '0.5rem',
      })}
      >
        {imageUrls.map((url, i) => (
          <div
            key={url}
            className={css({
              w: 'fit-content',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <button
              type="button"
              onClick={() => {
                setIsLightboxOpen(i);
              }}
            >
              <img
                alt={`image-${i}`}
                src={url}
                className={css({
                  w: diameter,
                  h: diameter,
                  borderRadius: '50%',
                  objectFit: 'cover',
                })}
              />
            </button>
          </div>
        ))}
      </div>
      {/*
        embla-carousel-react の useEmblaCarousel({ startSnap }) の
        即時性がイマイチなので、light-box も map() で展開
        が、効果なし？
       */}
      {imageUrls.map((url, i) => (
        <Lightbox
          key={url}
          isOpen={isLightboxOpen === i}
          setIsOpen={setIsLightboxOpen}
          imgUrls={imageUrls}
          startSnap={i}
        />
      ))}
    </>
  );
}
