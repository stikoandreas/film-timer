import React, { createContext, useState } from 'react';

interface DebugContextInterface {
  debug: boolean;
  setDebug: (value: boolean) => void;
}

export const DebugContext = createContext<DebugContextInterface>({
  debug: false,
  setDebug: () => {},
});

export function DebugContextProvider({ children }: React.PropsWithChildren) {
  const [debug, setDebug] = useState(false);
  return <DebugContext.Provider value={{ debug, setDebug }}>{children}</DebugContext.Provider>;
}
