import { DOCK_SIZE } from '@/constants/dock';
import { MotionValue, useSpring, useTransform } from 'framer-motion';
import type { RefObject } from 'react';

export const useCalculatedWidth = (mousePosition: MotionValue, ref: RefObject<HTMLDivElement>) => {
  const distance = useTransform(mousePosition, (value) => {
    const itemPosition = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - itemPosition.x - itemPosition.width / 2;
  });
  const widthSync = useTransform(distance, [-DOCK_SIZE * 4, 0, DOCK_SIZE * 4], [DOCK_SIZE, DOCK_SIZE * 2, DOCK_SIZE]);
  const width = useSpring(widthSync, { mass: 0.2, stiffness: 150, damping: 10 });

  return width;
};
