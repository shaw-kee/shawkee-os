import { Dispatch, createContext } from 'react';
import { apps } from '@/config/apps';
import { INITIAL_INDEX, MAXIMUM_INDEX } from '@/constants/app';
import { LinkApp, WindowApp } from '@/types/app';

interface ActionType {
  type: 'CLOSE' | 'OPEN' | 'MINIMIZE';
  id: string;
}

export const AppStateContext = createContext(apps);
export const AppReducerContext = createContext<Dispatch<ActionType> | null>(null);

export const appReducer = (state: (WindowApp | LinkApp)[], action: ActionType): (WindowApp | LinkApp)[] => {
  const maxIndex = Math.max(...state.filter((app): app is WindowApp => app.type === 'window').map((app) => app.zIndex));
  if (maxIndex >= MAXIMUM_INDEX) {
    return state.map((app) =>
      app.id === action.id ? { ...app, zIndex: INITIAL_INDEX + 1 } : { ...app, zIndex: INITIAL_INDEX }
    );
  }

  switch (action.type) {
    case 'CLOSE':
      return state.map((app) => (app.id === action.id ? { ...app, isOpen: false } : app));
    case 'OPEN':
      return state.map((app) => {
        if (app.type === 'link') return { ...app };
        if (app.id === action.id && app.isMinimize) return { ...app, isMinimize: false, zIndex: maxIndex + 1 };
        if (app.id === action.id) return { ...app, isOpen: true, zIndex: maxIndex + 1 };
        return app;
      });
    case 'MINIMIZE':
      return state.map((app) => (app.id === action.id ? { ...app, isMinimize: true } : app));
    default:
      throw new Error('invalid action!');
  }
};
