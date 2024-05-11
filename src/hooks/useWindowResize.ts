import { WINDOW_MIN_HEIGHT, WINDOW_MIN_WIDTH } from '@/constants/resize';
import { useEffect, useState } from 'react';

const useWindowResize = () => {
  const [isAvailableWindowSize, setIsAvailableWindowSize] = useState(false);

  const resizeHandler = () => {
    const { innerWidth: width, innerHeight: height } = window;

    if (width <= WINDOW_MIN_WIDTH || height <= WINDOW_MIN_HEIGHT) {
      setIsAvailableWindowSize(false);
      return;
    }

    setIsAvailableWindowSize(true);
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return isAvailableWindowSize;
};

export default useWindowResize;
