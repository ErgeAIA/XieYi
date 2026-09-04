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
import type { ConceptGroup } from "@/content/types";
import { promptLibrary } from "@/content/prompt-library";
import {
  resources,
  resourceCategories,
  resourceId,
  type ResourceCategory,
} from "@/content/resources";
import { backendTopics } from "@/content/backend";
import {
  pageExamples,
  exampleCatMeta,
  exampleCatOrder,
  exampleCatMap,
} from "@/components/examples/pages";
import { useScrollSpy } from "@/components/scroll-spy";
import { useNavSpy } from "@/components/nav-spy";
import { frameworks, frameworkGroups, frameworkGroupMeta, type FrameworkGroup } from "@/content/frameworks";
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

const CONCEPT_GROUP_EN: Record<ConceptGroup, string> = {
  ai: "AI General",
  dev: "Engineering",
  web: "Web Basics",
};

const EXAMPLE_CAT_EN: Record<string, string> = {
  shell: "Application Shell",
  feedback: "Feedback & Alerts",
  lists: "Lists & Data",
  metrics: "Metrics",
  activity: "Activity",
};

const FRAMEWORK_GROUP_EN: Record<FrameworkGroup, string> = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Full-stack",
};

const RESOURCE_CAT_EN: Record<ResourceCategory, string> = {
  组件库: "Component Libraries",
  设计系统: "Design Systems",
  图标库: "Icon Libraries",
  "AI 工具": "AI Tools",
  动画组件: "Animation",
  学习资料: "Learning",
  社区: "Community",
};

const BACKEND_EN: Record<string, string> = {
  api: "API",
  database: "Database",
  auth: "Auth",
  deploy: "Deployment",
  cache: "Cache",
  storage: "File Storage",
};

export function SidebarNav() {
  const pathname = usePathname();
  const isComponents = pathname === "/components";
  const { activeCat, activeComponent } = useScrollSpy();
  const { activeGroup, activeItem } = useNavSpy();

  // 统一文件树：一级标题即可展开/收起，后端相关/参考资源/示例一并纳入。
  const nodes = React.useMemo<TreeNode[]>(
    () => [
      { id: "home", label: "首页", en: "Home", href: "/", route: "/" },
      {
        id: "concepts",
        label: "基础概念",
        en: "Concepts",
        href: "/concepts",
        route: "/concepts",
        count: concepts.length,
        children: conceptGroups.map((g) => ({
          id: g,
          label: conceptGroupMeta[g],
          en: CONCEPT_GROUP_EN[g],
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
        label: "提示词实践指南",
        en: "Prompt Guide",
        href: "/prompts",
        route: "/prompts",
        count: promptLibrary.length,
      },
      {
        id: "examples",
        label: "页面画廊",
        en: "Page Gallery",
        href: "/examples",
        route: "/examples",
        count: pageExamples.length,
        children: exampleCatOrder.map((cat) => {
          const items = pageExamples.filter(
            (e) => exampleCatMap[e.id] === cat,
          );
          return {
            id: cat,
            label: exampleCatMeta[cat],
            en: EXAMPLE_CAT_EN[cat],
            route: "/examples",
            href: `/examples#${cat}`,
            spyGroup: cat,
            count: items.length,
            children: items.map((e) => ({
              id: e.id,
              label: e.title,
              en: e.nameEn,
              route: "/examples",
              href: `/examples#${e.id}`,
              spyItem: e.id,
            })),
          };
        }),
      },
      {
        id: "frameworks",
        label: "框架",
        en: "Frameworks",
        href: "/frameworks",
        route: "/frameworks",
        count: frameworks.length,
        children: frameworkGroups.map((g) => ({
          id: g,
          label: frameworkGroupMeta[g],
          en: FRAMEWORK_GROUP_EN[g],
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
        en: "Components",
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
        en: "Backend",
        href: "/backend",
        route: "/backend",
        count: backendTopics.length,
        children: backendTopics.map((t) => ({
          id: t.id,
          label: t.name,
          en: BACKEND_EN[t.id],
          route: "/backend",
          href: `/backend#${t.id}`,
          spyGroup: t.id,
        })),
      },
      {
        id: "resources",
        label: "参考资源",
        en: "Resources",
        href: "/resources",
        route: "/resources",
        count: resources.length,
        children: resourceCategories.map((cat) => ({
          id: cat,
          label: cat,
          en: RESOURCE_CAT_EN[cat],
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
