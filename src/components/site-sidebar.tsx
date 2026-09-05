"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  componentCategories,
  componentCategoryMeta,
  componentCategoryMetaEn,
  componentCategoryAlias,
  componentsByCategory,
  type ComponentCategory,
} from "@/content/components";
import {
  concepts,
  conceptGroups,
  conceptGroupMeta,
  conceptGroupMetaEn,
  conceptGroupAlias,
} from "@/content/concepts";
import { promptLibrary, promptOriginGroups } from "@/content/prompt-library";
import {
  resources,
  resourceCategories,
  resourceCategoryMetaEn,
  resourceCategoryAlias,
  resourceId,
} from "@/content/resources";
import { backendTopics, backendTopicMetaEn, backendTopicAlias } from "@/content/backend";
import {
  pageExamples,
  exampleCatMeta,
  exampleCatMetaEn,
  exampleCatAlias,
  exampleCatOrder,
  exampleCatMap,
  shellOverviewOrder,
} from "@/components/examples/pages";
import { useScrollSpy } from "@/components/scroll-spy";
import { useNavSpy } from "@/components/nav-spy";
import {
  frameworks,
  frameworkGroups,
  frameworkGroupMeta,
  frameworkGroupMetaEn,
  frameworkGroupAlias,
} from "@/content/frameworks";
import {
  glossary,
  glossaryCategoryOrder,
  glossaryCategoryMeta,
  glossaryCategoryAlias,
} from "@/content/glossary";
import { TreeMenu, type TreeNode } from "@/components/sidebar-tree";
import {
  Activity,
  ArrowLeftRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  BrainCircuit,
  Braces,
  Brush,
  CalendarClock,
  ChartPie,
  Clapperboard,
  Compass,
  Component,
  Database,
  Feather,
  FileText,
  FlaskConical,
  Gauge,
  Globe,
  GraduationCap,
  Grid3x3,
  Flame,
  Waves,
  Hammer,
  HardDrive,
  Images,
  KeyRound,
  Landmark,
  LayoutDashboard,
  LayoutTemplate,
  Library,
  LockKeyhole,
  MessageSquare,
  MessagesSquare,
  Monitor,
  Network,
  Package,
  Palette,
  PanelsTopLeft,
  PenTool,
  Pointer,
  RefreshCw,
  Rocket,
  ScrollText,
  Server,
  Shapes,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  SquareStack,
  Sticker,
  Swords,
  Table,
  TextCursorInput,
  Timer,
  Type,
  Users,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

// 菜单徽章：一级/二级各挂一个贴合语义的 Lucide 图标
const topLevelIcons: Record<string, LucideIcon> = {
  home: Landmark,
  concepts: BookOpen,
  prompts: Sparkles,
  examples: Images,
  glossary: ScrollText,
  frameworks: Boxes,
  components: Component,
  backend: Activity,
  resources: Library,
};

const conceptGroupIcons: Record<string, LucideIcon> = {
  ai: Brain,
  dev: Hammer,
  web: Globe,
};

const promptOriginIcons: Record<string, LucideIcon> = {
  official: BadgeCheck,
  web: Feather,
  own: Flame,
};

const exampleCatIcons: Record<string, LucideIcon> = {
  shell: LayoutDashboard,
  feedback: BellRing,
  lists: Table,
  metrics: BarChart3,
  activity: Waves,
};

const glossaryCategoryIcons: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  visual: Palette,
  responsive: Smartphone,
  interaction: Pointer,
  "ui-style": Brush,
  typography: Type,
  "dev-process": Workflow,
  ops: Wrench,
  "page-section": PanelsTopLeft,
  content: FileText,
  "auth-state": KeyRound,
  "ai-prompt": Bot,
  performance: Gauge,
  security: ShieldCheck,
};

const frameworkGroupIcons: Record<string, LucideIcon> = {
  frontend: PenTool,
  fullstack: RefreshCw,
  backend: Server,
  edge: Zap,
  ai: BrainCircuit,
};

const componentCategoryIcons: Record<string, LucideIcon> = {
  layout: Grid3x3,
  form: TextCursorInput,
  navigation: Compass,
  display: Monitor,
  feedback: MessageSquare,
  overlay: SquareStack,
  charts: ChartPie,
  chat: MessagesSquare,
  extra: Shapes,
};

const backendTopicIcons: Record<string, LucideIcon> = {
  structure: Network,
  api: ArrowLeftRight,
  database: Database,
  cache: Timer,
  storage: HardDrive,
  auth: LockKeyhole,
  security: Shield,
  env: SlidersHorizontal,
  jobs: CalendarClock,
  deploy: Rocket,
};

const resourceCategoryIcons: Record<string, LucideIcon> = {
  组件库: Package,
  底层原语: Braces,
  图标库: Sticker,
  动画组件: Clapperboard,
  "AI 工具": Swords,
  "后端与服务": FlaskConical,
  学习资料: GraduationCap,
  社区: Users,
};

export function SidebarNav() {
  const pathname = usePathname();
  const isComponents = pathname === "/components";
  const { activeCat, activeComponent } = useScrollSpy();
  const { activeGroup, activeItem } = useNavSpy();

  // 统一文件树：一级标题即可展开/收起，后端相关/参考资源/示例一并纳入。
  const nodes = React.useMemo<TreeNode[]>(
    () => [
      { id: "home", label: "山门", icon: topLevelIcons.home, tooltip: "首页 Home", href: "/", route: "/" },
      {
        id: "concepts",
        label: "筑基",
        icon: topLevelIcons.concepts,
        tooltip: "基础概念 Concepts",
        href: "/concepts",
        route: "/concepts",
        count: concepts.length,
        children: conceptGroups.map((g) => ({
          id: `concepts-${g}`,
          icon: conceptGroupIcons[g],
          label: conceptGroupAlias[g],
          tooltip: `${conceptGroupMeta[g]} ${conceptGroupMetaEn[g]}`,
          route: "/concepts",
          href: `/concepts#${g}`,
          spyGroup: g,
          count: concepts.filter((c) => c.group === g).length,
          children: concepts
            .filter((c) => c.group === g)
            .map((c) => ({
              id: `concepts-${c.id}`,
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
        label: "真言",
        icon: topLevelIcons.prompts,
        tooltip: "提示词指南 Prompt Guide",
        href: "/prompts",
        route: "/prompts",
        count: promptLibrary.length,
        children: promptOriginGroups.map((g) => ({
          id: `prompts-${g.id}`,
          icon: promptOriginIcons[g.id],
          label: g.alias,
          tooltip: `${g.name} ${g.en}`,
          route: "/prompts",
          href: `/prompts#${g.id}`,
          spyGroup: g.id,
          count:
            promptLibrary.filter((p) => (p.origin ?? "official") === g.id)
              .length || undefined,
        })),
      },
      {
        id: "examples",
        label: "图卷",
        icon: topLevelIcons.examples,
        tooltip: "页面画廊 Page Gallery",
        href: "/examples",
        route: "/examples",
        count: pageExamples.length,
        children: exampleCatOrder.map((cat) => {
          const items = pageExamples.filter(
            (e) => exampleCatMap[e.id] === cat,
          );
          // 应用骨架分组把布局总览排在最前
          if (cat === "shell") {
            items.sort((a, b) => {
              const ia = shellOverviewOrder.indexOf(a.id as typeof shellOverviewOrder[number]);
              const ib = shellOverviewOrder.indexOf(b.id as typeof shellOverviewOrder[number]);
              if (ia !== -1 && ib !== -1) return ia - ib;
              if (ia !== -1) return -1;
              if (ib !== -1) return 1;
              return 0;
            });
          }
          return {
            id: `examples-${cat}`,
            icon: exampleCatIcons[cat],
            label: exampleCatAlias[cat],
            tooltip: `${exampleCatMeta[cat]} ${exampleCatMetaEn[cat]}`,
            route: "/examples",
            href: `/examples#${cat}`,
            spyGroup: cat,
            count: items.length,
            children: items.map((e) => ({
              id: `examples-${e.id}`,
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
        id: "glossary",
        label: "玉简",
        icon: topLevelIcons.glossary,
        tooltip: "词典 Glossary",
        href: "/glossary",
        route: "/glossary",
        count: glossary.length,
        children: glossaryCategoryOrder.map((g) => ({
          id: `glossary-${g}`,
          icon: glossaryCategoryIcons[g],
          label: glossaryCategoryAlias[g],
          tooltip: `${glossaryCategoryMeta[g].zh} ${glossaryCategoryMeta[g].en}`,
          route: "/glossary",
          href: `/glossary#${g}`,
          spyGroup: g,
          count: glossary.filter((t) => t.category === g).length,
        })),
      },
      {
        id: "frameworks",
        label: "阵法",
        icon: topLevelIcons.frameworks,
        tooltip: "框架 Frameworks",
        href: "/frameworks",
        route: "/frameworks",
        count: frameworks.length,
        children: frameworkGroups.map((g) => ({
          // id 加前缀避免与一级「灵脉」(id: backend) 撞车——
          // 侧栏 nodeById/openSet 均按 id 索引，重复 id 会导致高亮/展开串节点。
          // 锚点定位走 href 的 hash，不依赖 node.id。
          id: `frameworks-${g}`,
          icon: frameworkGroupIcons[g],
          label: frameworkGroupAlias[g],
          tooltip: `${frameworkGroupMeta[g]} ${frameworkGroupMetaEn[g]}`,
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
        label: "法器",
        icon: topLevelIcons.components,
        tooltip: "前端组件 Components",
        href: "/components",
        route: "/components",
        count: componentCategories.reduce(
          (s, c) => s + componentsByCategory(c).length,
          0
        ),
        children: componentCategories.map((cat) => ({
          id: `components-${cat}`,
          icon: componentCategoryIcons[cat],
          label: componentCategoryAlias[cat],
          tooltip: `${componentCategoryMeta[cat]} ${componentCategoryMetaEn[cat]}`,
          route: "/components",
          href: `/components?cat=${cat}`,
          spyGroup: cat,
          count: componentsByCategory(cat).length,
          children: componentsByCategory(cat).map((c) => ({
            id: `components-${cat}-${c.nameEn}`,
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
        label: "灵脉",
        icon: topLevelIcons.backend,
        tooltip: "后端相关 Backend",
        href: "/backend",
        route: "/backend",
        count: backendTopics.length,
        children: backendTopics.map((t) => ({
          id: `backend-${t.id}`,
          icon: backendTopicIcons[t.id],
          label: backendTopicAlias[t.id],
          tooltip: `${t.name} ${backendTopicMetaEn[t.id]}`,
          route: "/backend",
          href: `/backend#${t.id}`,
          spyGroup: t.id,
        })),
      },
      {
        id: "resources",
        label: "藏经阁",
        icon: topLevelIcons.resources,
        tooltip: "参考资源 Resources",
        href: "/resources",
        route: "/resources",
        count: resources.length,
        children: resourceCategories.map((cat) => ({
          id: `resources-${cat}`,
          icon: resourceCategoryIcons[cat],
          label: resourceCategoryAlias[cat],
          tooltip: `${cat} ${resourceCategoryMetaEn[cat]}`,
          route: "/resources",
          href: `/resources#${cat}`,
          spyGroup: cat,
          count: resources.filter((r) => r.category === cat).length,
          children: resources
            .filter((r) => r.category === cat)
            .map((r) => {
              const rid = resourceId(r);
              return {
                id: `resources-${rid}`,
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
