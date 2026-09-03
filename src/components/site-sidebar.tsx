"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  componentCategories,
  componentCategoryMeta,
  componentsByCategory,
  type ComponentCategory,
} from "@/content/components";
import { concepts, conceptGroups, conceptGroupMeta } from "@/content/concepts";
import { promptLibrary } from "@/content/prompt-library";
import {
  resources,
  resourceCategories,
  resourceId,
} from "@/content/resources";
import { backendTopics } from "@/content/backend";
import { pageExamples } from "@/components/examples/pages";
import { useScrollSpy } from "@/components/scroll-spy";
import { useNavSpy } from "@/components/nav-spy";
import { frameworks, frameworkGroups, frameworkGroupMeta } from "@/content/frameworks";
import { TreeMenu, type TreeNode } from "@/components/sidebar-tree";

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

export function SidebarNav() {
  const pathname = usePathname();
  const isComponents = pathname === "/components";
  const { activeCat, activeComponent } = useScrollSpy();
  const { activeGroup, activeItem } = useNavSpy();

  // 统一文件树：一级标题即可展开/收起，后端相关/参考资源/示例一并纳入。
  const nodes = React.useMemo<TreeNode[]>(
    () => [
      { id: "home", label: "首页", href: "/", route: "/" },
      {
        id: "concepts",
        label: "基础概念",
        href: "/concepts",
        route: "/concepts",
        count: concepts.length,
        children: conceptGroups.map((g) => ({
          id: g,
          label: conceptGroupMeta[g],
          route: "/concepts",
          href: `/concepts#${g}`,
          spyGroup: g,
          count: concepts.filter((c) => c.group === g).length,
          children: concepts
            .filter((c) => c.group === g)
            .map((c) => ({
              id: c.id,
              label: c.nameZh,
              en: c.nameEn,
              route: "/concepts",
              href: `/concepts#${c.id}`,
              spyItem: c.id,
            })),
        })),
      },
      {
        id: "prompts",
        label: "提示词库",
        href: "/prompts",
        route: "/prompts",
        count: promptLibrary.length,
      },
      {
        id: "examples",
        label: "示例",
        href: "/examples",
        route: "/examples",
        count: pageExamples.length,
        children: pageExamples.map((e) => ({
          id: e.id,
          label: e.title,
          route: "/examples",
          href: `/examples#${e.id}`,
          spyGroup: e.id,
        })),
      },
      {
        id: "frameworks",
        label: "框架",
        href: "/frameworks",
        route: "/frameworks",
        count: frameworks.length,
        children: frameworkGroups.map((g) => ({
          id: g,
          label: frameworkGroupMeta[g],
          route: "/frameworks",
          href: `/frameworks#${g}`,
          spyGroup: g,
          count: frameworks.filter((f) => f.group === g).length,
          children: frameworks
            .filter((f) => f.group === g)
            .map((f) => ({
              id: f.id,
              label: f.name,
              en: f.nameEn,
              route: "/frameworks",
              href: `/frameworks#${f.id}`,
              spyItem: f.id,
            })),
        })),
      },
      {
        id: "components",
        label: "前端组件",
        href: "/components",
        route: "/components",
        count: componentCategories.reduce(
          (s, c) => s + componentsByCategory(c).length,
          0
        ),
        children: componentCategories.map((cat) => ({
          id: cat,
          label: componentCategoryMeta[cat],
          en: CATEGORY_EN[cat],
          route: "/components",
          href: `/components?cat=${cat}`,
          spyGroup: cat,
          count: componentsByCategory(cat).length,
          children: componentsByCategory(cat).map((c) => ({
            id: c.nameEn,
            label: c.nameZh,
            en: c.nameEn,
            route: "/components",
            href: `/components?cat=${cat}#${c.nameEn}`,
            spyItem: c.nameEn,
          })),
        })),
      },
      {
        id: "backend",
        label: "后端相关",
        href: "/backend",
        route: "/backend",
        count: backendTopics.length,
        children: backendTopics.map((t) => ({
          id: t.id,
          label: t.name,
          route: "/backend",
          href: `/backend#${t.id}`,
          spyGroup: t.id,
        })),
      },
      {
        id: "resources",
        label: "参考资源",
        href: "/resources",
        route: "/resources",
        count: resources.length,
        children: resourceCategories.map((cat) => ({
          id: cat,
          label: cat,
          route: "/resources",
          href: `/resources#${cat}`,
          spyGroup: cat,
          count: resources.filter((r) => r.category === cat).length,
          children: resources
            .filter((r) => r.category === cat)
            .map((r) => {
              const rid = resourceId(r);
              return {
                id: rid,
                label: r.name,
                route: "/resources",
                href: `/resources#${rid}`,
                spyItem: rid,
              };
            }),
        })),
      },
    ],
    []
  );

  const activeItemId = isComponents ? activeComponent : activeItem;
  const activeGroupId = isComponents ? activeCat : activeGroup;

  return (
    <>
      <nav className="flex flex-col gap-0.5 text-sm">
        <TreeMenu
          nodes={nodes}
          activeItemId={activeItemId}
          activeGroupId={activeGroupId}
        />
      </nav>
      <SidebarExtras />
    </>
  );
}

/** 未来扩展点：用户将在左侧导航下方加 CAT 链接（阶段 C 之后实现）。
 *  当前空渲染；届时在此返回独立区块，保持与 TreeMenu 的视觉间距一致。 */
function SidebarExtras() {
  return null;
}
