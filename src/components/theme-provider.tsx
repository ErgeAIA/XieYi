"use client";

import * as React from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

const STORAGE_KEY = "xieyi-theme";
const EVT = "xieyi-theme-change";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark"; // SSR 默认深色
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return "dark"; // 无保存偏好时默认深色
}

function subscribeTheme(cb: () => void) {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useSyncExternalStore<Theme>(
    subscribeTheme,
    readTheme,
    () => "dark",
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* 隐私模式下忽略 */
    }
  }, [theme]);

  const toggle = React.useCallback(() => {
    const next: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* 隐私模式下忽略 */
    }
    window.dispatchEvent(new Event(EVT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
