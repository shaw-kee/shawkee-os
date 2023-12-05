import { createContext } from 'react';
import type { ReactNode } from 'react';

const OverlayContext = createContext<{
  mount: (id: string, element: ReactNode) => void;
  unmount: (id: string) => void;
} | null>(null);

export default OverlayContext;
