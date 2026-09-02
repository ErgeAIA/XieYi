"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavSpy } from "@/components/nav-spy";

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

/**
 * 可复用的侧栏二级/三级树：二级为分组（路由 #分组锚点），三级为元素（路由 #元素锚点）。
 * 展开态由 NavSpy 的 activeGroup / pinnedGroup 驱动，与前端组件菜单行为一致。
 */
export function SidebarTree({
  route,
  sections,
}: {
  route: string;
  sections: SidebarTreeSection[];
}) {
  const pathname = usePathname();
  const { activeGroup, pinnedGroup, activeItem, setPinnedGroup } = useNavSpy();
  const isRoute = pathname === route;

  return (
    <div className="ml-2 mt-1 flex flex-col gap-1">
      {sections.map((sec) => {
        const open =
          isRoute &&
          (pinnedGroup ? pinnedGroup === sec.id : activeGroup === sec.id);
        const pin = () => setPinnedGroup(sec.id);
        return (
          <div key={sec.id}>
            <Link
              href={`${route}#${sec.id}`}
              onClick={pin}
              className={`group relative flex items-center rounded-lg px-2.5 py-1.5 text-sm transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${
                open
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <span
                className={`absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${
                  open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
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
            {sec.items && sec.items.length > 0 && (
              <div
                className={`grid transition-all duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                  open
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="ml-2.5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                    {sec.items.map((it, i) => {
                      const itemActive = isRoute && activeItem === it.id;
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
                            href={`${route}#${it.id}`}
                            onClick={pin}
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
            )}
          </div>
        );
      })}
    </div>
  );
}
