import { MotionValue, useSpring, useTransform } from 'framer-motion';
import type { RefObject } from 'react';

export const useCalculatedWidth = (mousePosition: MotionValue, ref: RefObject<HTMLDivElement>, itemSize: number) => {
  const distance = useTransform(mousePosition, (value) => {
    const itemPosition = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - itemPosition.x - itemPosition.width / 2;
  });
  const widthSync = useTransform(distance, [-itemSize * 4, 0, itemSize * 4], [itemSize, itemSize * 2, itemSize]);
  const width = useSpring(widthSync, { mass: 0.2, stiffness: 150, damping: 10 });

  return width;
};
