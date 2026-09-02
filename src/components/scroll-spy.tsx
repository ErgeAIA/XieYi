"use client";

import * as React from "react";

type ScrollSpyValue = {
  activeCat: string | null;
  activeComponent: string | null;
  pinnedCat: string | null;
  setActiveCat: (c: string | null) => void;
  setActiveComponent: (c: string | null) => void;
  setPinnedCat: (c: string | null) => void;
};

const ScrollSpyContext = React.createContext<ScrollSpyValue | null>(null);

export function ScrollSpyProvider({ children }: { children: React.ReactNode }) {
  const [activeCat, setActiveCatState] = React.useState<string | null>(null);
  const [activeComponent, setActiveComponentState] = React.useState<string | null>(
    null
  );
  const [pinnedCat, setPinnedCatState] = React.useState<string | null>(null);

  const setActiveCat = React.useCallback((c: string | null) => {
    setActiveCatState((prev) => (prev === c ? prev : c));
  }, []);
  const setActiveComponent = React.useCallback((c: string | null) => {
    setActiveComponentState((prev) => (prev === c ? prev : c));
  }, []);
  const setPinnedCat = React.useCallback((c: string | null) => {
    setPinnedCatState((prev) => (prev === c ? prev : c));
  }, []);

  const value = React.useMemo<ScrollSpyValue>(
    () => ({
      activeCat,
      activeComponent,
      pinnedCat,
      setActiveCat,
      setActiveComponent,
      setPinnedCat,
    }),
    [
      activeCat,
      activeComponent,
      pinnedCat,
      setActiveCat,
      setActiveComponent,
      setPinnedCat,
    ]
  );

  return (
    <ScrollSpyContext.Provider value={value}>{children}</ScrollSpyContext.Provider>
  );
}

export function useScrollSpy() {
  const ctx = React.useContext(ScrollSpyContext);
  if (!ctx) {
    throw new Error("useScrollSpy 必须在 ScrollSpyProvider 内使用");
  }
  return ctx;
}
