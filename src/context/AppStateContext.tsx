import React, { createContext, useState } from 'react';

interface AppStateContextInterface {
  recipeActive: boolean;
  setRecipeActive: (value: boolean) => void;
}

export const AppStateContext = createContext<AppStateContextInterface>({
  recipeActive: false,
  setRecipeActive: () => {},
});

export function AppStateProvider({ children }: React.PropsWithChildren) {
  const [recipeActive, setRecipeActive] = useState(false);
  return (
    <AppStateContext.Provider value={{ recipeActive, setRecipeActive }}>
      {children}
    </AppStateContext.Provider>
  );
}
