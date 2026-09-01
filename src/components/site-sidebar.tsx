"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  componentCategories,
  componentCategoryMeta,
  componentsByCategory,
} from "@/content/components";

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
      className={`block rounded-md px-3 py-1.5 transition-colors ${
        active
          ? "bg-accent font-medium text-accent-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

export function SidebarNav() {
  const pathname = usePathname();
  const params = useSearchParams();
  const activeCat = params.get("cat");
  const isComponents = pathname === "/components";

  return (
    <nav className="flex flex-col gap-0.5 text-sm">
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
        <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l pl-2">
          {componentCategories.map((cat) => {
            const active = isComponents && activeCat === cat;
            return (
              <div key={cat}>
                <Link
                  href={`/components?cat=${cat}`}
                  className={`block rounded px-2 py-1 transition-colors ${
                    active
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {componentCategoryMeta[cat]}
                </Link>
                {active && (
                  <div className="ml-2 mt-0.5 flex flex-col gap-0.5 border-l pl-2">
                    {componentsByCategory(cat).map((c) => (
                      <Link
                        key={c.nameEn}
                        href={`/components?cat=${cat}#${c.nameEn}`}
                        className="block rounded px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {c.nameZh}
                      </Link>
                    ))}
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
