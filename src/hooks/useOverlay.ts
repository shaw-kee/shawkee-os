import OverlayContext from '@/store/Overlay/OverlayContext';
import { useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error('context is null. The useOverlay hook must be inside an OverlayProvider.');
  }

  const { mount, unmount } = context;

  return useMemo(
    () => ({
      open: (overlayElement: ReactNode) => {
        mount(overlayElement);
      },
      close: () => {
        unmount();
      },
    }),
    [mount, unmount]
  );
};

export default useOverlay;
