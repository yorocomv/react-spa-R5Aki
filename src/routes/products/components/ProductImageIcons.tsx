import { useState } from 'react';

import { css } from 'styled-system/css';

import HogeFuga from './HogeFuga';

export default function ProductImageIcons({
  imageUrls,
}: {
  imageUrls: string[];
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
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
              onClick={() => setIsLightboxOpen(true)}
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
      <HogeFuga isOpen={isLightboxOpen} setIsOpen={setIsLightboxOpen} imgUrls={imageUrls} />
    </>
  );
}
