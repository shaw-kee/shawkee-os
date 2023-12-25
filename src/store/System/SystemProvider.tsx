import { ReactNode, useReducer } from 'react';

import { DEFAULT_SYSTEM_STATE, SystemReducerContext, SystemStateContext, systemReducer } from './SystemContext';

const SystemProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(systemReducer, DEFAULT_SYSTEM_STATE);

  return (
    <SystemStateContext.Provider value={state}>
      <SystemReducerContext.Provider value={dispatch}>{children}</SystemReducerContext.Provider>
    </SystemStateContext.Provider>
  );
};

export default SystemProvider;
