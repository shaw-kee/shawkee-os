import { Fragment, createContext, useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface OverlayProviderProps {
  children: ReactNode;
}

const OverlayContext = createContext<{
  mount: (id: string, element: ReactNode) => void;
  unmount: (id: string) => void;
} | null>(null);

const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [overlay, setOverlay] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlay((prevOverlay) => {
      const cloned = new Map(prevOverlay);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlay((prevOverlay) => {
      const cloned = new Map(prevOverlay);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const controller = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <OverlayContext.Provider value={controller}>
      {children}
      {[...overlay.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
