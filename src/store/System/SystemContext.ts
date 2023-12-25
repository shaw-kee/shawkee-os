import { Dispatch, createContext } from 'react';

interface ActionType {
  type: 'SET_SOUND' | 'SET_BRIGHTNESS';
  value: number;
}

type SystemState = {
  sound: number;
  brightness: number;
};

export const DEFAULT_SYSTEM_STATE = {
  sound: 50,
  brightness: 100,
};

export const SystemStateContext = createContext<SystemState>(DEFAULT_SYSTEM_STATE);
export const SystemReducerContext = createContext<Dispatch<ActionType> | null>(null);

export const systemReducer = (state: SystemState, action: ActionType): SystemState => {
  switch (action.type) {
    case 'SET_SOUND':
      return { ...state, sound: action.value };
    case 'SET_BRIGHTNESS':
      return { ...state, brightness: action.value };
    default:
      throw new Error('invalid action!');
  }
};
