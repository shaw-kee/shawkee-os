import { useEffect, useRef } from 'react';

const usePrevState = <T>(value: T): T => {
  const prevStateRef = useRef<T>(value);

  useEffect(() => {
    prevStateRef.current = value;
  });

  return prevStateRef.current;
};

export default usePrevState;
