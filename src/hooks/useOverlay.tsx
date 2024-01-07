import OverlayContext from '@/store/Overlay/OverlayContext';
import { useContext, useEffect, useMemo, useState } from 'react';

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
      open: (overlayElement: () => JSX.Element) => {
        mount(id, <OverlayController overlayElement={overlayElement} />);
      },
      close: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount]
  );
};

type OverlayControllerProps = {
  overlayElement: () => JSX.Element;
};

const OverlayController = ({ overlayElement: OverlayElement }: OverlayControllerProps) => {
  return <OverlayElement />;
};

export default useOverlay;
