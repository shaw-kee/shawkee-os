import { Dispatch, createContext } from 'react';
import { apps, App } from '@/config/apps';
import { INITIAL_INDEX, MAXIMUM_INDEX } from '@/constants/app';

interface ActionType {
  type: 'CLOSE' | 'OPEN';
  id: string;
}

export const AppStateContext = createContext(apps);
export const AppReducerContext = createContext<Dispatch<ActionType> | null>(null);

export const appReducer = (state: App[], action: ActionType): App[] => {
  const maxIndex = Math.max(...state.map((app) => app.zIndex));
  if (maxIndex >= MAXIMUM_INDEX) {
    return state.map((app) =>
      app.id === action.id ? { ...app, zIndex: INITIAL_INDEX + 1 } : { ...app, zIndex: INITIAL_INDEX }
    );
  }

  switch (action.type) {
    case 'CLOSE':
      return state.map((app) => (app.id === action.id ? { ...app, isOpen: false } : app));
    case 'OPEN':
      return state.map((app) => (app.id === action.id ? { ...app, isOpen: true, zIndex: maxIndex + 1 } : app));
    default:
      throw new Error('invalid action!');
  }
};
