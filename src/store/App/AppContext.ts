import { Dispatch, createContext } from 'react';
import { apps, App } from '@/config/apps';

interface ActionType {
  type: 'CLOSE' | 'OPEN';
  id: string;
}

export const AppStateContext = createContext(apps);
export const AppReducerContext = createContext<Dispatch<ActionType> | null>(null);

export const appReducer = (state: App[], action: ActionType): App[] => {
  switch (action.type) {
    case 'CLOSE':
      return state.map((app) => (app.id === action.id ? { ...app, isOpen: false } : app));
    case 'OPEN':
      return state.map((app) => (app.id === action.id ? { ...app, isOpen: true } : app));
    default:
      throw new Error('invalid action!');
  }
};
