import type { LightBoxImages } from '@zenithui/light-box';

import { LightBox } from '@zenithui/light-box';

import { css } from 'styled-system/css';

export default function LightBoxWrapper({
  urls,
  isOpen = false,
  setIsOpen,
}: {
  urls?: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const imageObjArr: LightBoxImages[] | undefined = urls?.map((url, i) => ({
    src: url,
    alt: `Image ${i + 1}`,
  }));

  if (!imageObjArr)
    return null;

  return (
    <div
      className={css({
        zIndex: '999999999',
      })}
    >
      <LightBox
        images={imageObjArr}
        open={isOpen}
        animation="slide"
        onOpenChange={setIsOpen}
        zoomable={true}
      />
    </div>
  );
}
