import OverlayContext from '@/store/Overlay/OverlayContext';
import { useContext, useId, useMemo } from 'react';
import type { ReactNode } from 'react';

const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error('context is null. The useOverlay hook must be inside an OverlayProvider.');
  }

  const { mount, unmount } = context;

  const id = useId();

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

export type CreateOverlayElement = (props: { isOpen: boolean; close: () => void; exit: () => void }) => JSX.Element;
