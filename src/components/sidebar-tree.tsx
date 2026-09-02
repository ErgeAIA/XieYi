"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarTreeItem {
  id: string;
  label: string;
  en?: string;
}

export interface SidebarTreeSection {
  id: string;
  label: string;
  count?: number;
  en?: string;
  items?: SidebarTreeItem[];
}

export function SidebarTree({
  route,
  sections,
  highlightId,
  groupActiveId,
  buildHref,
}: {
  route: string;
  sections: SidebarTreeSection[];
  /** 当前高亮的元素 id（滚动跟随），如概念的三级、组件的单个组件 */
  highlightId?: string | null;
  /** 当前高亮的分组 id（滚动跟随），扁平结构（示例/后端）用它高亮所在项 */
  groupActiveId?: string | null;
  /** 自定义链接构造；默认 `${route}#${id}`（组件页用 `?cat=#`） */
  buildHref?: (sec: SidebarTreeSection, item?: SidebarTreeItem) => string;
}) {
  const pathname = usePathname();
  const isRoute = pathname === route;

  // 手动手风琴：点击展开/收起（可重复点击收缩），与滚动跟随解耦。
  // 跳转时把目标分组标记为「瞬时展开」，避免 350ms 高度动画导致定位漂移。
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [instantId, setInstantId] = React.useState<string | null>(null);

  const defaultHref = (sec: SidebarTreeSection, item?: SidebarTreeItem) =>
    `${route}#${item?.id ?? sec.id}`;
  const hrefFor = buildHref ?? defaultHref;

  // 深链接 / 初始定位：进入页面（或跨路由切换）若 URL 含 hash 或 ?cat=，
  // 打开对应分组并精确定位；否则默认展开首个分组便于浏览。
  // 依赖 pathname：SidebarNav 在 layout 中持久挂载，路由切换不会重挂本组件，
  // 故需借 pathname 变化重新触发，才能处理「点击其他页菜单跳到本页锚点」。
  /* eslint-disable react-hooks/set-state-in-effect -- 深链/初始定位必须在 effect 内更新展开状态，属该规则的合法例外（与 components-view 同类模式） */
  React.useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    const sec = sections.find(
      (s) =>
        s.id === hash || s.id === cat || s.items?.some((i) => i.id === hash)
    );
    if (!sec) {
      if (sections[0]) setOpenId(sections[0].id);
      return;
    }
    const targetId = sec.items?.some((i) => i.id === hash) ? hash : sec.id;
    setOpenId(sec.id);
    setInstantId(sec.id);
    const t = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setInstantId(null);
    }, 80);
    return () => window.clearTimeout(t);
  }, [pathname, sections]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const toggle = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
    setInstantId(null);
  };

  // 跳转：同路由自行精确定位（瞬时展开 + 滚动），跨路由交给 Link，由目标页挂载时按 hash 定位。
  const jump = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sec: SidebarTreeSection,
    item?: SidebarTreeItem
  ) => {
    const targetId = item?.id ?? sec.id;
    if (isRoute) {
      e.preventDefault();
      setOpenId(sec.id);
      setInstantId(sec.id);
      // 更新 URL（深链 / 后退可用），但不触发原生滚动
      history.replaceState(null, "", hrefFor(sec, item));
      const run = () => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setInstantId(null);
      };
      requestAnimationFrame(() => requestAnimationFrame(run));
    }
    // 跨路由：不阻止，由目标页挂载时按 hash 定位
  };

  return (
    <div className="ml-2 mt-1 flex flex-col gap-1">
      {sections.map((sec) => {
        const hasItems = !!sec.items && sec.items.length > 0;
        const open = isRoute && openId === sec.id;
        const groupActive = hasItems
          ? open
          : isRoute && groupActiveId === sec.id;

        // 无子项：直接作为跳转链接（示例 / 后端相关）
        if (!hasItems) {
          return (
            <Link
              key={sec.id}
              href={hrefFor(sec)}
              onClick={(e) => jump(e, sec)}
              className={`group relative flex items-center rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-200 ${
                groupActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <span
                className={`absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
                  groupActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                }`}
              />
              <span className="flex items-baseline gap-1.5">
                {sec.label}
                {sec.en && (
                  <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
                    {sec.en}
                  </span>
                )}
              </span>
              {typeof sec.count === "number" && (
                <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground/70">
                  {sec.count}
                </span>
              )}
            </Link>
          );
        }

        // 有子项：分组头（可展开/收缩）+ 子项列表
        const onHeader = () => {
          const willOpen = openId !== sec.id;
          toggle(sec.id);
          if (willOpen) {
            const el = document.getElementById(sec.id);
            if (el)
              requestAnimationFrame(() =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              );
          }
        };

        return (
          <div key={sec.id}>
            <button
              type="button"
              onClick={onHeader}
              className={`group relative flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors duration-200 ${
                groupActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <span
                className={`absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
                  groupActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                }`}
              />
              <span className="flex items-baseline gap-1.5">
                {sec.label}
                {sec.en && (
                  <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
                    {sec.en}
                  </span>
                )}
              </span>
              {typeof sec.count === "number" && (
                <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground/70">
                  {sec.count}
                </span>
              )}
              <svg
                className={`ml-2 size-3 shrink-0 text-muted-foreground/60 transition-transform duration-200 ${
                  open ? "rotate-90" : ""
                }`}
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 2.5 7.5 6 4 9.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`grid ${
                instantId === sec.id
                  ? "transition-none"
                  : "transition-all duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)]"
              } ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <div className="ml-2.5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                  {sec.items!.map((it, i) => {
                    const itemActive = isRoute && highlightId === it.id;
                    return (
                      <div
                        key={it.id}
                        className={`transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${
                          open
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }`}
                        style={{ transitionDelay: open ? `${i * 20}ms` : "0ms" }}
                      >
                        <Link
                          href={hrefFor(sec, it)}
                          onClick={(e) => jump(e, sec, it)}
                          className={`flex items-baseline gap-1.5 rounded-md px-2 py-1 text-xs transition-colors duration-200 ${
                            itemActive
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                          }`}
                        >
                          {it.label}
                          {it.en && (
                            <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
                              {it.en}
                            </span>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
