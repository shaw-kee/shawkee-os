import { Fragment, useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import OverlayContext from './OverlayContext';

interface OverlayProviderProps {
  children: ReactNode;
}

const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [overlayElementMap, setOverlayElementMap] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlayElementMap((prevOverlayMap) => {
      const cloned = new Map(prevOverlayMap);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlayElementMap((prevOverlayMap) => {
      const cloned = new Map(prevOverlayMap);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlayElementMap.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
