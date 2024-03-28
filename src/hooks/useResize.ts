import { useEffect, useRef } from 'react';

const useResize = <T extends HTMLElement>(handler: ResizeObserverCallback) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(handler);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [handler]);

  return ref;
};

export default useResize;
