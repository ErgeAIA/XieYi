"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  componentCategories,
  componentCategoryMeta,
  componentsByCategory,
} from "@/content/components";
import { useScrollSpy } from "@/components/scroll-spy";

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
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
      )}
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
                  {open && (
                    <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  {componentCategoryMeta[cat]}
                </Link>
                {open && (
                  <div className="ml-2.5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                    {componentsByCategory(cat).map((c) => {
                      const compActive = activeComponent === c.nameEn;
                      return (
                        <Link
                          key={c.nameEn}
                          href={`/components?cat=${cat}#${c.nameEn}`}
                          className={`relative rounded-md px-2 py-1 text-xs transition-all duration-200 ${
                            compActive
                              ? "font-medium text-primary"
                              : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                          }`}
                        >
                          {compActive && (
                            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary" />
                          )}
                          {c.nameZh}
                        </Link>
                      );
                    })}
                  </div>
                )}
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
