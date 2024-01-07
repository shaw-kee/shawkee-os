import OverlayContext from '@/store/Overlay/OverlayContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

let elementId = 1;

const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error('context is null. The useOverlay hook must be inside an OverlayProvider.');
  }

  const [id] = useState(() => String(elementId++));

  const { mount, unmount } = context;

  useEffect(() => {
    return () => {
      unmount(id);
    };
  }, [id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: ReactNode) => {
        mount(id, overlayElement);
      },
      close: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount]
  );
};

export default useOverlay;
