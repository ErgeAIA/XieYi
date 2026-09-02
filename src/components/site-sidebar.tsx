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
import {
  concepts,
  conceptGroups,
  conceptGroupMeta,
} from "@/content/concepts";
import {
  resources,
  resourceCategories,
  resourceId,
} from "@/content/resources";
import { backendTopics } from "@/content/backend";
import { pageExamples } from "@/components/examples/pages";
import { useScrollSpy } from "@/components/scroll-spy";
import { useNavSpy } from "@/components/nav-spy";
import {
  SidebarTree,
  type SidebarTreeSection,
  type SidebarTreeItem,
} from "@/components/sidebar-tree";

// 基础概念：二级=分组，三级=概念
const conceptSections: SidebarTreeSection[] = conceptGroups.map((g) => ({
  id: g,
  label: conceptGroupMeta[g],
  count: concepts.filter((c) => c.group === g).length,
  items: concepts
    .filter((c) => c.group === g)
    .map((c) => ({ id: c.id, label: c.nameZh, en: c.nameEn })),
}));

// 参考资源：二级=分类，三级=资源
const resourceSections: SidebarTreeSection[] = resourceCategories.map((cat) => ({
  id: cat,
  label: cat,
  count: resources.filter((r) => r.category === cat).length,
  items: resources
    .filter((r) => r.category === cat)
    .map((r) => ({ id: resourceId(r), label: r.name })),
}));

// 示例：扁平九例，二级即各示例
const exampleSections: SidebarTreeSection[] = pageExamples.map((e) => ({
  id: e.id,
  label: e.title,
}));

// 后端相关：扁平六主题，二级即各主题
const backendSections: SidebarTreeSection[] = backendTopics.map((t) => ({
  id: t.id,
  label: t.name,
}));

// 前端组件：二级=分类（?cat=），三级=组件（#nameEn）
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
const componentSections: SidebarTreeSection[] = componentCategories.map((cat) => ({
  id: cat,
  label: componentCategoryMeta[cat],
  en: CATEGORY_EN[cat],
  count: componentsByCategory(cat).length,
  items: componentsByCategory(cat).map((c) => ({
    id: c.nameEn,
    label: c.nameZh,
    en: c.nameEn,
  })),
}));
const componentHref = (sec: SidebarTreeSection, item?: SidebarTreeItem) =>
  item ? `/components?cat=${sec.id}#${item.id}` : `/components?cat=${sec.id}`;

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
      className={`group relative flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${
        active
          ? "bg-primary/10 font-medium text-primary"
          : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
      }`}
    >
      <span
        className={`absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${
          active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      />
      {children}
    </Link>
  );
}

export function SidebarNav() {
  const pathname = usePathname();
  const isComponents = pathname === "/components";
  const { activeCat, activeComponent } = useScrollSpy();
  const { activeGroup, activeItem } = useNavSpy();

  return (
    <nav className="flex flex-col gap-1 text-sm">
      <NavLink href="/" active={pathname === "/"}>
        首页
      </NavLink>
      <NavLink href="/concepts" active={pathname === "/concepts"}>
        基础概念
      </NavLink>
      <SidebarTree
        route="/concepts"
        sections={conceptSections}
        highlightId={activeItem}
        groupActiveId={activeGroup}
      />

      <NavLink href="/components" active={isComponents}>
        前端组件
      </NavLink>
      <SidebarTree
        route="/components"
        sections={componentSections}
        highlightId={activeComponent}
        groupActiveId={activeCat}
        buildHref={componentHref}
      />

      <NavLink href="/examples" active={pathname === "/examples"}>
        示例
      </NavLink>
      <SidebarTree
        route="/examples"
        sections={exampleSections}
        groupActiveId={activeGroup}
      />
      <NavLink href="/resources" active={pathname === "/resources"}>
        参考资源
      </NavLink>
      <SidebarTree
        route="/resources"
        sections={resourceSections}
        highlightId={activeItem}
        groupActiveId={activeGroup}
      />
      <NavLink href="/backend" active={pathname === "/backend"}>
        后端相关
      </NavLink>
      <SidebarTree
        route="/backend"
        sections={backendSections}
        groupActiveId={activeGroup}
      />
    </nav>
  );
}
