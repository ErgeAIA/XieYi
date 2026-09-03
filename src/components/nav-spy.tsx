"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

type NavSpyValue = {
  activeGroup: string | null;
  activeItem: string | null;
  pinnedGroup: string | null;
  setActiveGroup: (g: string | null) => void;
  setActiveItem: (i: string | null) => void;
  setPinnedGroup: (g: string | null) => void;
};

const NavSpyContext = React.createContext<NavSpyValue | null>(null);

/**
 * 通用导航 scroll-spy：观察页面上的 [data-spy-group] / [data-spy-item]，
 * 随滚动高亮当前分组与元素，并供侧栏二级/三级菜单精确跳转使用。
 * 思路与 components 的 ScrollSpyProvider 一致：带 hash 跳转时先把目标分组钉住，
 * 滚动过程中忽略中间值，滚动停止后再交还，避免菜单开合抖动。
 */
export function NavSpyProvider({ children }: { children: React.ReactNode }) {
  const [activeGroup, setActiveGroupState] = React.useState<string | null>(null);
  const [activeItem, setActiveItemState] = React.useState<string | null>(null);
  const [pinnedGroup, setPinnedGroupState] = React.useState<string | null>(null);
  const pathname = usePathname();

  const setActiveGroup = React.useCallback((g: string | null) => {
    setActiveGroupState((prev) => (prev === g ? prev : g));
  }, []);
  const setActiveItem = React.useCallback((i: string | null) => {
    setActiveItemState((prev) => (prev === i ? prev : i));
  }, []);
  const setPinnedGroup = React.useCallback((g: string | null) => {
    setPinnedGroupState((prev) => (prev === g ? prev : g));
  }, []);

  // 让滚动/防抖回调读取最新的 pinnedGroup，避免闭包 stale
  const pinnedRef = React.useRef(pinnedGroup);
  React.useEffect(() => {
    pinnedRef.current = pinnedGroup;
  }, [pinnedGroup]);

  /* eslint-disable react-hooks/set-state-in-effect -- IntersectionObserver 驱动的 scroll-spy 必须在 effect 内更新高亮状态，属该规则的合法例外（与 components-view 同类模式） */
  React.useEffect(() => {
    // 路由切换：observer 挂载后会立即校正 activeGroup/item；
    // 旧路由残留值不会命中新路由的 id 命名空间，故无需在此显式清空。
    const groups = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spy-group]")
    );
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spy-item]")
    );
    if (!groups.length && !items.length) return;

    const currentGroup = { current: null as string | null };
    const first = { current: true };
    let debounce: number | undefined;

    // 带 hash 的跳转：先把目标分组钉住，滚动过程中不抖动
    const hash = window.location.hash ? window.location.hash.slice(1) : "";
    let pinGroup: string | null = null;
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        pinGroup =
          el.getAttribute("data-spy-group") ??
          el.closest("[data-spy-group]")?.getAttribute("data-spy-group") ??
          null;
      }
    }
    if (pinGroup) setPinnedGroup(pinGroup);

    const commit = () => {
      if (currentGroup.current) setActiveGroup(currentGroup.current);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        const g = visible[0].target.getAttribute("data-spy-group");
        const it = visible[0].target.getAttribute("data-spy-item");
        if (g) currentGroup.current = g;
        if (it) setActiveItem(it);
        // 仅首帧（挂载/筛选重排后）立即同步，其余等滚动停止再提交
        if (first.current) {
          first.current = false;
          commit();
        }
      },
      { rootMargin: "-72px 0px -65% 0px", threshold: 0 }
    );
    groups.forEach((el) => io.observe(el));
    items.forEach((el) => io.observe(el));

    // 持续滚动 spy：滚动中防抖提交，滚动结束立即提交，与 components-view 一致。
    // hash 钉住期间忽略中间值，避免跳转途中菜单闪烁；停止后交还并解钉。
    const onScroll = () => {
      if (first.current) return;
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => {
        if (!pinnedRef.current) commit();
      }, 120);
    };
    const onScrollEnd = () => {
      commit();
      setPinnedGroup(null);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);

    return () => {
      io.disconnect();
      window.clearTimeout(debounce);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [pathname, setActiveGroup, setActiveItem, setPinnedGroup]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const value = React.useMemo<NavSpyValue>(
    () => ({
      activeGroup,
      activeItem,
      pinnedGroup,
      setActiveGroup,
      setActiveItem,
      setPinnedGroup,
    }),
    [
      activeGroup,
      activeItem,
      pinnedGroup,
      setActiveGroup,
      setActiveItem,
      setPinnedGroup,
    ]
  );

  return (
    <NavSpyContext.Provider value={value}>{children}</NavSpyContext.Provider>
  );
}

export function useNavSpy() {
  const ctx = React.useContext(NavSpyContext);
  if (!ctx) {
    throw new Error("useNavSpy 必须在 NavSpyProvider 内使用");
  }
  return ctx;
}
