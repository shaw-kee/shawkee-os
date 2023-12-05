import { createContext } from 'react';
import type { ReactNode } from 'react';

const OverlayContext = createContext<{
  mount: (element: ReactNode) => void;
  unmount: () => void;
} | null>(null);

export default OverlayContext;
