import { css } from 'styled-system/css';

export default function ProductImageIcons({
  imageUrls,
  setIsOpen,
}: {
  imageUrls: string[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const diameter = '4rem';

  return (
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
            onClick={() => setIsOpen(true)}
            onKeyDown={() => setIsOpen(true)}
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
  );
}
