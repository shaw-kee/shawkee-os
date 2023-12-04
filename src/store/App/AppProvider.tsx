import { ReactNode, useReducer } from 'react';
import { AppReducerContext, AppStateContext, appReducer } from './AppContext';
import { apps } from '@/config/apps';

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appReducer, apps);

  return (
    <AppStateContext.Provider value={state}>
      <AppReducerContext.Provider value={dispatch}>{children}</AppReducerContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppProvider;
