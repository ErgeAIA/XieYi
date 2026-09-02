"use client";

import * as React from "react";

type MotionContextValue = {
  /** 动效是否开启（默认开启；系统偏好 prefers-reduced-motion 时默认关闭） */
  motionOn: boolean;
  toggle: () => void;
};

const MotionContext = React.createContext<MotionContextValue>({
  motionOn: true,
  toggle: () => {},
});

const STORAGE_KEY = "xieyi-motion";
const EVT = "xieyi-motion-change";

function readMotion(): boolean {
  if (typeof document === "undefined") return true; // SSR 默认开启
  const attr = document.documentElement.getAttribute("data-motion");
  if (attr === "on" || attr === "off") return attr === "on";
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeMotion(cb: () => void) {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}

/**
 * 全局动效偏好。状态落到 <html data-motion="on|off">，由 globals.css 门控：
 * - 默认开启（与系统 prefers-reduced-motion 无关时）
 * - 用户手动关闭后持久化到 localStorage('xieyi-motion')
 * - 防闪烁：layout 内联脚本已在首帧前把属性写好，这里只同步 React 状态
 * 用 useSyncExternalStore 读取 DOM 属性，避免 setState-in-effect 与水合不匹配。
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const motionOn = React.useSyncExternalStore(
    subscribeMotion,
    readMotion,
    () => true,
  );

  const toggle = React.useCallback(() => {
    const next = document.documentElement.getAttribute("data-motion") !== "on";
    document.documentElement.setAttribute("data-motion", next ? "on" : "off");
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      /* 隐私模式下忽略 */
    }
    window.dispatchEvent(new Event(EVT));
  }, []);

  return (
    <MotionContext.Provider value={{ motionOn, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionPref() {
  return React.useContext(MotionContext);
}
