import { useState } from 'react';

import Lightbox from '@/routes/products/components/Lightbox';
import { css } from 'styled-system/css';

export default function ProductImageIcons({
  imageUrls,
}: {
  imageUrls: string[];
}) {
  const [lightboxOpen, setLightboxOpen] = useState(-1);
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
                setLightboxOpen(i);
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
      <Lightbox
        isOpen={lightboxOpen !== -1}
        setIsOpen={setLightboxOpen}
        imgUrls={imageUrls}
        goToIndex={lightboxOpen}
      />
    </>
  );
}
