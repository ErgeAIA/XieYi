"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  componentCategories,
  componentCategoryMeta,
  componentsByCategory,
  type ComponentCategory,
} from "@/content/components";
import { useScrollSpy } from "@/components/scroll-spy";

const CATEGORY_EN: Record<ComponentCategory, string> = {
  layout: "Layout",
  form: "Form",
  navigation: "Navigation",
  display: "Data Display",
  feedback: "Feedback",
  overlay: "Overlay",
  charts: "Charts",
  chat: "Chat",
  extra: "Extended",
};

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
        active
          ? "bg-primary/10 font-medium text-primary"
          : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
      }`}
    >
      <span
        className={`absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
          active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      />
      {children}
    </Link>
  );
}

export function SidebarNav() {
  const pathname = usePathname();
  const { activeCat, activeComponent } = useScrollSpy();
  const isComponents = pathname === "/components";

  return (
    <nav className="flex flex-col gap-1 text-sm">
      <NavLink href="/" active={pathname === "/"}>
        首页
      </NavLink>
      <NavLink href="/concepts" active={pathname === "/concepts"}>
        基础概念
      </NavLink>

      <div className="mt-1">
        <NavLink href="/components" active={isComponents}>
          前端组件
        </NavLink>
        <div className="ml-2 mt-1 flex flex-col gap-1">
          {componentCategories.map((cat) => {
            const open = isComponents && activeCat === cat;
            return (
              <div key={cat}>
                <Link
                  href={`/components?cat=${cat}`}
                  className={`group relative flex items-center rounded-lg px-2.5 py-1.5 text-sm transition-all duration-200 ${
                    open
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
                      open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
                  />
                  <span className="flex items-baseline gap-1.5">
                    {componentCategoryMeta[cat]}
                    <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
                      {CATEGORY_EN[cat]}
                    </span>
                  </span>
                  <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground/70">
                    {componentsByCategory(cat).length}
                  </span>
                </Link>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-2.5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                      {componentsByCategory(cat).map((c, i) => {
                        const compActive = activeComponent === c.nameEn;
                        return (
                          <div
                            key={c.nameEn}
                            className={`transition-all duration-200 ease-out ${
                              open
                                ? "translate-y-0 opacity-100"
                                : "translate-y-1 opacity-0"
                            }`}
                            style={{ transitionDelay: open ? `${i * 25}ms` : "0ms" }}
                          >
                            <Link
                              href={`/components?cat=${cat}#${c.nameEn}`}
                              className={`flex items-baseline gap-1.5 rounded-md px-2 py-1 text-xs transition-colors duration-200 ${
                                compActive
                                  ? "bg-primary/10 font-medium text-primary"
                                  : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                              }`}
                            >
                              {c.nameZh}
                              <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
                                {c.nameEn}
                              </span>
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
      </div>

      <NavLink href="/examples" active={pathname === "/examples"}>
        示例
      </NavLink>
      <NavLink href="/resources" active={pathname === "/resources"}>
        参考资源
      </NavLink>
      <NavLink href="/backend" active={pathname === "/backend"}>
        后端相关
      </NavLink>
    </nav>
  );
}
