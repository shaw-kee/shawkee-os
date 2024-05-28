import { Dispatch, createContext } from 'react';

type ActionType =
  | {
      type: 'SET_SOUND' | 'SET_BRIGHTNESS';
      value: number;
    }
  | {
      type: 'SET_IS_PLAYING' | 'SET_IS_LOCK_SCREEN';
      value: boolean;
    };

type SystemState = {
  sound: number;
  brightness: number;
  isPlaying: boolean;
  isLockScreen: boolean;
};

export const DEFAULT_SYSTEM_STATE = {
  sound: 50,
  brightness: 100,
  isPlaying: false,
  isLockScreen: true,
};

export const SystemStateContext = createContext<SystemState>(DEFAULT_SYSTEM_STATE);
export const SystemReducerContext = createContext<Dispatch<ActionType> | null>(null);

export const systemReducer = (state: SystemState, action: ActionType): SystemState => {
  switch (action.type) {
    case 'SET_SOUND':
      return { ...state, sound: action.value };
    case 'SET_BRIGHTNESS':
      return { ...state, brightness: action.value };
    case 'SET_IS_PLAYING':
      return { ...state, isPlaying: action.value };
    case 'SET_IS_LOCK_SCREEN':
      return { ...state, isLockScreen: action.value };
    default:
      throw new Error('invalid action!');
  }
};
