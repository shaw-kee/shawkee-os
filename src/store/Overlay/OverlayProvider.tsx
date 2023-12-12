import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import OverlayContext from './OverlayContext';

interface OverlayProviderProps {
  children: ReactNode;
}

const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [overlayElement, setOverlayElement] = useState<ReactNode | null>(null);

  const mount = useCallback((element: ReactNode) => {
    setOverlayElement(element);
  }, []);

  const unmount = useCallback(() => {
    setOverlayElement(null);
  }, []);

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {overlayElement}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
