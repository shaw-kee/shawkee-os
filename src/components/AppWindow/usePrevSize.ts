import usePrevState from '@/hooks/usePrevState';
import { Position } from '@/types/position';
import { Size } from '@/types/size';
import { useEffect, useState } from 'react';

const usePrevSize = (resizingCallback: ({ x, y, width, height }: Position & Size) => void) => {
  const [isResize, setIsResize] = useState<boolean>(false);
  const [prevSize, setPrevSize] = useState<Position & Size>({ x: 0, y: 0, width: 0, height: 0 });
  const prevState = usePrevState(isResize);

  useEffect(() => {
    if (!isResize && prevState) {
      const { x, y, width, height } = prevSize;
      resizingCallback({ x, y, width, height });
    }
  }, [isResize, prevSize, prevState, resizingCallback]);

  return { isResize, setIsResize, setPrevSize };
};

export default usePrevSize;
