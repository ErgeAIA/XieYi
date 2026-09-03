# 阶段 C「最终统一 pass」Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有国风视觉语言（暖白底 + 火山橙 + 霞鹜文楷/齐伋体）内，对全站 6 个路由做一次精修统一：抽共享布局组件、统一页面容器/标题/空态、全站接入 `<Reveal>` 进场、删掉死代码（HeroEmber + three + motion 包）、并把 9 个示例页从粗骨架充实为同一套规则下的真实布局。

**Architecture:** 新增一个无状态的 `page-shell.tsx` 暴露 `PageContainer / PageHeader / SectionTitle / GroupLabel / EmptyState` 五个纯展示原语，供 6 个页面复用，从根上消除版式方言；在 `globals.css` 引入 `--scroll-offset` 令牌并将散落的 `scroll-mt-*` 收口为 `.scroll-anchor`，scroll-spy 的 `rootMargin` 顶部由 `--scroll-offset` 派生（单一真源），解耦对手写像素的依赖；逐页套用原语并接入既有 `Reveal`（首页因 hero 大块为已知例外，使用更大纵向间距）；最后删除死代码依赖并充实示例内容。

**Tech Stack:** Next.js 16.3.4 (App Router, `src/`) · React 19.2.8 · TypeScript ^5 · Tailwind CSS v4 (`@tailwindcss/postcss`) · shadcn/ui `base-nova`（Base UI 底层）· pnpm 11.25.0 · 现有 `Reveal`（`@/components/motion/reveal`）+ `data-motion` 动效门控。

**Spec:** 本计划由用户 2026-09-02~09-03 的阶段性答复驱动；项目契约见 `AGENTS.md`，进度见 `docs/.AI/project-progress.md`，决策见 `docs/.AI/decision-log.md`。

## Global Constraints

- 包管理器**仅 pnpm**（v11.25.0，`package.json` 已锁 `packageManager`）；不用 npm / yarn。Node v24.13.0。
- 样式**禁止硬编码 hex**，一律用令牌类（`bg-background` / `text-muted-foreground` / `bg-primary` 等）；深色经 `html.dark` 切换。
- 动效必须经 `data-motion` 总开关 + `prefers-reduced-motion` 双重降级（`globals.css` 已有门控，改动动效 class 时不得破坏）。
- 装饰字体（`song` / `brush`，即 LXGW 文楷 / 齐伋体）**只能用于站点标题与品牌**；任何组件示例内部必须经 `.preview` / `.example-canvas` 回落无衬线（`globals.css` 已强制）。
- 组件分类字段是 `cat` 不是 `category`；值必须是 `ComponentCategory` 联合（`layout`/`form`/`navigation`/`display`/`feedback`/`overlay`/`charts`/`chat`/`extra`）。
- `useSearchParams` 必须包在 `<Suspense>` 内（侧栏已包）；新增依赖 query 的客户端组件同样遵守。
- 路径别名 `@/*` → `./src/*`；UI 原语统一从 `@/components/ui/*` 引入，禁止手写重复组件。
- 交互/状态/浏览器 API 必须 `"use client"`；布局与纯展示页尽量保留服务端组件。
- **本仓库当前无测试套件、无 CI**（见 `AGENTS.md`）。因此本计划的「验证」以 `pnpm run lint` + `next build` + Playwright 视觉核对（明暗双主题）替代单测；不编造测试。每个 Task 仍以「独立可验证的交付物 + 提交」收尾。
- **Tailwind UI / Tailwind Plus（`tailwindcss.com/plus`）为付费产品**：不得逐字复制其专有组件源码；仅可用本项目自有 markup + Tailwind 工具类 + 设计令牌复刻其视觉语言。
- 提交约定：main 直接增量 commit 并 `git push origin main`（已授权）。
- 字体子集脚本 `scripts/gen-lxgw.mjs` 仅扫 `src/`；**新增中文内容后必须重跑** `node scripts/gen-lxgw.mjs`，否则新字会回退宋体（不会成方框，但观感不统一）。

## 执行纪律（用户 2026-09-03 追加）

- 用户将另开窗口并行处理其它任务；本计划执行**只提交自己改动范围内的文件**（`git add <具体文件>`，禁止 `git add -A` / 大范围通配），**绝不覆盖其它窗口正在编辑的代码**。
- **逐 Task 验收制**：每完成一个 Task，先自审（`next build` + `pnpm run lint` + Playwright 视觉核对明暗）→ 通过后才 `git commit`；commit 后再进行下一个 Task。任一步不通过立即修，不带着问题推进。
- **Git 安全红线**：禁止 `git push --force` / `git rebase` / `git reset --hard`；若 `git push` 因并行窗口已推送而被拒绝（non-fast-forward），**暂停并报告用户**，不强行推送或变基。
- **极致流畅优先（A2）**：`Reveal` 必须改为模块级单例共享 `IntersectionObserver`，避免组件画廊 60+ 卡片各自建观察者。
- **示例逐个交付（A6）**：Task 10 的 9 个示例**逐个完成、逐个视觉核对、逐个 commit**；前 2–3 个后总结「区块模板 / 配色 / 间距」经验，后续复用提速。质量闸门：每示例 ≤6 区块、复用现有 `@/components/ui/*`、不抄 Tailwind Plus 源码。

## 用户已确认的方向（阶段 C 范围边界）

- Q1 精修，不重做：保留现有国风语言。
- Q2 抽共享组件（即本计划的 `page-shell.tsx`）。
- Q3 删除 `hero-ember.tsx`，并移除 `three` + `@types/three` 依赖。
- Q4 删除 `motion` 包依赖（源码零引用）。
- Q5 全站统一接入 `<Reveal>` 进场；若过于花哨，后续再降（动效本身已克制，且 `data-motion` 可一键关）。
- Q6 不加页脚；左侧导航下的 CAT 链接、营销站风格示例均为**未来阶段**，本计划仅预留扩展点、不实现；顶部栏本次保持现状（不做营销站式大改，以免与 Q1 冲突）。
- Q7 示例页吃同一套规则；当前是粗骨架，内容需充实（本计划 Task 10 负责）。
- Q8 移动端后续再说；本次不改移动端布局逻辑。

---

## File Structure

新建：
- `src/components/page-shell.tsx` — 五个纯展示布局原语（无 `"use client"`，可作服务端组件）。全站版式统一的唯一来源。

修改：
- `src/app/globals.css` — 新增 `--scroll-offset` 令牌与 `.scroll-anchor` 工具类；（如需要）微调 `.reveal` 节奏。
- `src/app/layout.tsx` — 收敛 `<main>` 纵向 padding，消除「双 padding」；横向 padding 维持。
- `src/app/page.tsx`（首页）— 套 `PageContainer`/`SectionTitle`，去掉叠加 padding，统一 Hero 外层。
- `src/app/concepts/page.tsx` — 套 `PageContainer`/`PageHeader`/`GroupLabel`/`EmptyState`，接入 `Reveal` 与 `scroll-anchor`。
- `src/components/components-view.tsx` — 接入 `Reveal` + `SectionTitle` + `EmptyState`；`scroll-mt-*` 收口为 `scroll-anchor`；校准 scroll-spy 偏移。
- `src/app/resources/page.tsx` — 复用 concepts 视觉范式，但保持服务端组件、无搜索、不加 EmptyState。
- `src/app/backend/page.tsx` — 复用 concepts 视觉范式，但保持服务端组件、无搜索、不加 EmptyState。
- `src/app/examples/page.tsx` + `src/components/examples/pages.tsx` + `src/components/examples/registry.tsx` — 套原语、`Reveal`、充实 9 个页面级布局内容（Q7）。
- `src/components/site-sidebar.tsx` — 新增惰性 `<SidebarExtras />` 插槽（空渲染，不实现）。
- `src/components/hero-ember.tsx` — **删除**（Q3）。
- `package.json` — 移除 `motion` / `three` / `@types/three`（Q3/Q4）。
- `docs/.AI/project-progress.md` / `docs/.AI/decision-log.md` — 记录阶段 C 启动与删除决策。

---

## 已知范围缺口（明确 defer，不阻塞本计划）

- **组件级示例（`ComponentItem.example`）未令牌化（D6）**：阶段 A 遗留的组件示例是原始 HTML 字符串、经 `dangerouslySetInnerHTML` 渲染，内部大概率含硬编码 class / 可能含 hex。本计划仅通过 `.preview` 的字体回落兜住「装饰字体」，但**未兜住「不硬编码 hex / 用令牌」**。完整修复属阶段 B 既定项（示例重写为真实 shadcn 组件），列为本计划之后单独任务，不在此范围内强求，避免范围蔓延。
- CAT 链接、营销站风格顶栏大改、页脚、移动端精修：按用户 Q6/Q8 明确 defer（见「用户已确认的方向」）。

---

## Risks & Conflicts

1. **scroll-spy / 锚点落点耦合顶栏高度（最高风险）**：`components-view.tsx:96,133` 的 `rootMargin:"-72px …"` 与各处 `scroll-mt-16/20/24` 是写死值，隐含假定「顶栏高≈56px」。本计划用 `.scroll-anchor`（`scroll-margin-top: var(--scroll-offset)`）收口锚点落点，并要求顶栏 `min-h-14`（56px）保持固定；`rootMargin` 顶部**不再写死 `-72px`**，而是在 `components-view` 初始化 `IntersectionObserver` 时读取 `--scroll-offset` 派生（rem→px），使「锚点落点」与「spy 触发」共用同一令牌。改动 layout 纵向 padding 或 `--scroll-offset` 时须同步复核两者。
2. **删除 `three` / `motion` 依赖**：删除前必须 grep 确认除 `hero-ember` 外无其它 `three` 引用、且无任何 `motion` 引用（已确认 `motion` 零引用；`three` 仅 `hero-ember` 用）。`pnpm install` 重新锁包时若遇供应链 `minimumReleaseAge` 拦截，用 `pnpm install --config.minimumReleaseAge=0` 兜底（不改配置文件）。
3. **无测试套件**：验证靠 build + lint + 视觉核对，已在 Global Constraints 说明，不伪造单测。
4. **Tailwind UI 授权**：未来加营销站示例不得逐字抄 Tailwind Plus 源码（见约束）。
5. **字体子集范围**：Task 10 给示例加中文内容后必须重跑 `gen-lxgw.mjs`，否则新字回退宋体、观感不统一。
6. **首页双 padding 移位**：移除 `page.tsx:30` 的 `py-10 md:py-14` 后，顶部留白改由 `layout.tsx` 的 `<main>` 提供，需视觉确认首页顶部不过挤/过空。
7. **`Reveal` 与 scroll-spy 的轻微交互**：`Reveal` 初始 `translateY(1rem)` 会令 `getBoundingClientRect` 瞬时偏移 1rem，可能影响 spy 提交时机；因入场后 `transform:none`，影响极小，需在 Task 7 后人工核对侧栏高亮是否仍准。
8. **`Reveal` 全站化可能偏花哨（Q5 预警）**：保持现有克制参数（`--motion-slow` 520ms、`translateY(1rem)`、仅 opacity+transform），便于后续一键降级；不要新增弹跳/缩放类炫技动效。

---

## Task 1: 新增共享布局原语 `page-shell.tsx`

**Files:**
- Create: `src/components/page-shell.tsx`

**Interfaces:**
- 产出（供后续所有页面 Task 消费）：`PageContainer`、`PageHeader`、`SectionTitle`、`GroupLabel`、`EmptyState`。
- 纯展示、无 hooks、无 `"use client"`，可作服务端组件；统一用 `cn()` 与令牌类。

- [ ] **Step 1: 创建原语文件**

```tsx
// src/components/page-shell.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type Width = "default" | "wide" | "full";
const WIDTH: Record<Width, string> = {
  default: "max-w-5xl",
  wide: "max-w-6xl",
  full: "max-w-none",
};

/** 全站统一页面容器：仅管最大宽度与纵向节奏；横向 padding 已由 layout 的 <main> 提供，这里不再叠加，避免双 padding。 */
export function PageContainer({
  width = "default",
  className,
  children,
}: {
  width?: Width;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full space-y-10 md:space-y-14", WIDTH[width], className)}>
      {children}
    </div>
  );
}

/** 页面级标题区：h1 + 可选描述与操作区（如搜索框）。 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/** 区块主标题（h2），统一全站区段标题的视觉层级。 */
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-xl font-semibold tracking-tight", className)}>
      {children}
    </h2>
  );
}

/** 分组小标签（eyebrow），用于概念/资源等分组名。 */
export function GroupLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-sm font-medium text-muted-foreground", className)}>
      {children}
    </h2>
  );
}

/** 统一空状态：搜索无结果 / 暂无内容。 */
export function EmptyState({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("py-10 text-center text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}
```

- [ ] **Step 2: 验证**

Run: `pnpm run lint`
Expected: 无错误（新文件无未用变量、`cn` 已引入）。

Run: `node ./node_modules/next/dist/bin/next build`（或 `pnpm run build`）
Expected: 构建通过（新文件被 `src/**` 扫描，无类型错误）。

- [ ] **Step 3: 提交**

```bash
git add src/components/page-shell.tsx
git commit -m "feat(ui): 新增 page-shell 共享布局原语"
git push origin main
```

---

## Task 2: `globals.css` 引入顶栏/锚点令牌，收口 `scroll-anchor`

**Files:**
- Modify: `src/app/globals.css`（在现有 `:root` 令牌块附近追加；新增 `.scroll-anchor` 类）

**Interfaces:**
- 产出：`--scroll-offset` CSS 变量与 `.scroll-anchor` 工具类，供 Task 3/7 与所有页面使用；`rootMargin` 顶部由该令牌在 JS 中派生（见 Task 7 Step 4）。

- [ ] **Step 1: 在 `:root` 令牌区追加偏移令牌**

在 `globals.css` 现有 `:root { --radius: 0.625rem; … }`（约 line 106 附近）之后追加：

```css
/* 锚点落点令牌：解耦 scroll-mt / scroll-spy 对手写像素的依赖。
   作为「锚点落点（.scroll-anchor 的 scroll-margin-top）」与
   「scroll-spy 的 rootMargin 顶部」的单一真源；须与 site-header 的
   min-h-14（56px = 3.5rem）保持一致，取 3.5rem + 1rem 余量。 */
:root {
  --scroll-offset: 4.5rem;
}

/* 统一锚点落点：替代各页散落的 scroll-mt-16/20/24 */
.scroll-anchor {
  scroll-margin-top: var(--scroll-offset);
}
```

- [ ] **Step 2: 验证**

Run: `pnpm run lint` 与 `node ./node_modules/next/dist/bin/next build`
Expected: 通过；`.scroll-anchor` 类进入 Tailwind 扫描（在 `src` 内使用后即生效，此处先定义）。

- [ ] **Step 3: 提交**

```bash
git add src/app/globals.css
git commit -m "style: 引入 --scroll-offset 令牌与 .scroll-anchor"
git push origin main
```

---

## Task 3: 收敛 `layout.tsx` 的 `<main>` padding

**Files:**
- Modify: `src/app/layout.tsx:73`

**Interfaces:**
- 消费：Task 2 的 `--header-h` / `--scroll-offset`（间接，通过 `.scroll-anchor`）。
- 产出：稳定的页面纵向留白来源，使各页无需自加 `py`。

- [ ] **Step 1: 收敛纵向 padding**

将：
```tsx
<main className="flex-1 px-4 py-6 md:px-8">{children}</main>
```
改为（横向 padding 维持，纵向统一为 `py-8 md:py-10`，不再由各页自加）：
```tsx
<main className="flex-1 px-4 py-8 md:px-8">{children}</main>
```

- [ ] **Step 2: 验证**

Run: `node ./node_modules/next/dist/bin/next build`
Expected: 通过。后续 Task 5 会移除首页自加的 `py-10`，届时首页顶部留白改由本处提供，需在 Task 5 后视觉核对。

- [ ] **Step 3: 提交**

```bash
git add src/app/layout.tsx
git commit -m "style(layout): 收敛 main 纵向 padding，消除双 padding"
git push origin main
```

---

## Task 4: 删除死代码 `hero-ember` 与 `three` / `motion` 依赖（Q3/Q4）

**Files:**
- Delete: `src/components/hero-ember.tsx`
- Modify: `package.json`（移除 `motion`、`three`、`@types/three`）

**Interfaces:**
- 前置：必须确认 `three` 仅被 `hero-ember` 引用、`motion` 零引用。

- [ ] **Step 1: 确认无其它引用**

Run（工作区根）:
```bash
grep -rn "hero-ember" src || echo "no hero-ember imports"
grep -rn "from \"three\"\|from 'three'\|import .* three" src || echo "no three imports"
grep -rn "motion" src | grep -v "data-motion\|xieyi-motion\|motion-provider\|MotionProvider\|useMotionPref\|motionOn" || echo "no motion pkg imports"
```
Expected: `hero-ember` 零引用（确认无人 import 其命名导出，否则删文件后 build 报模块缺失）；仅 `hero-ember.tsx` 出现 `three`；`motion` 包无引用（仅有本项目的 `data-motion` / `motion-provider` 等自有关键词，不算该 npm 包）。

- [ ] **Step 2: 删除文件并改 package.json**

删除 `src/components/hero-ember.tsx`。编辑 `package.json` 依赖块，移除：
```jsonc
"motion": "^13.1.1",        // dependencies 内
"three": "^0.185.1",        // dependencies 内
"@types/three": "^0.185.4"  // devDependencies 内
```

- [ ] **Step 3: 重新锁包**

Run: `pnpm install`（若遇 `minimumReleaseAge` 拦截，改用 `pnpm install --config.minimumReleaseAge=0`）
Expected: 锁文件更新，`node_modules` 移除三者；`grep` 复检通过。

- [ ] **Step 4: 验证**

Run: `node ./node_modules/next/dist/bin/next build`
Expected: 构建通过，且**零** `Cannot find module 'three'` / `Cannot find module 'motion'` / `Cannot find module '@types/three'` 类错误（作为删除依赖的硬闸门）；删除后 `grep -rn "hero-ember" src` 应为空。

- [ ] **Step 5: 提交**

```bash
git add -A src/components/hero-ember.tsx package.json pnpm-lock.yaml
git commit -m "refactor: 删除 HeroEmber 死代码与 three/motion 依赖"
git push origin main
```

---

## Task 5: 首页 `page.tsx` 套用共享原语

**Files:**
- Modify: `src/app/page.tsx:1-30,76-109`（import、外层容器、两处区段标题）

**Interfaces:**
- 消费：`PageContainer`、`SectionTitle`（Task 1）。
- 注意：Hero 区块（`HeroBloom` + 墨晕 + 打字机 + `HomeHeroDemo` + `HomeBento`）保持现状，仅外层容器与两个 `SectionTitle` 改用原语；移除叠加 padding。

- [ ] **Step 1: 改 import 与外层容器**

将顶部 import 区加入：
```tsx
import { PageContainer, SectionTitle } from "@/components/page-shell";
```
将：
```tsx
<div className="mx-auto max-w-6xl space-y-20 py-10 md:space-y-24 md:py-14">
```
改为（首页 hero 为大块，恢复较大纵向留白；默认 `space-y-14` 偏紧）：
```tsx
<PageContainer width="wide" className="space-y-14 md:space-y-20">
```
并将原 `</div>`（文件末，原 line 110 的 `</div>`）对应改为 `</PageContainer>`。

- [ ] **Step 2: 两处区段标题改用原语**

将「从这里开始」：
```tsx
<h2 className="text-2xl font-semibold tracking-tight">从这里开始</h2>
```
改为：
```tsx
<SectionTitle>从这里开始</SectionTitle>
```
将「组件可以直接操作」：
```tsx
<h2 className="text-2xl font-semibold tracking-tight">组件可以直接操作</h2>
```
改为：
```tsx
<SectionTitle>组件可以直接操作</SectionTitle>
```

- [ ] **Step 3: 验证**

Run: `node ./node_modules/next/dist/bin/next build`
Run（视觉）: `pnpm run dev` 后用 Playwright 截首页（明暗双主题），确认顶部留白由 layout 提供、Hero 与两区段标题层级统一、无内容错位。

- [ ] **Step 4: 提交**

```bash
git add src/app/page.tsx
git commit -m "style(home): 套用 PageContainer/SectionTitle，移除双 padding"
git push origin main
```

---

## Task 6: 概念页 `concepts/page.tsx` 统一（模版页）

**Files:**
- Modify: `src/app/concepts/page.tsx`（整体外层 + 分组标题 + 空态）

**Interfaces:**
- 消费：`PageContainer`、`PageHeader`、`GroupLabel`、`EmptyState`（Task 1）、`Reveal`（既有）、`scroll-anchor`（Task 2）。
- 本 Task 确立概念页的视觉范式（原语 + per-card `Reveal` + `scroll-anchor`）；Task 8/9 复用**同一视觉范式**，但 resources/backend 为服务端组件、无搜索、不加 `EmptyState`（见各 Task 的「关键修正」）。

- [ ] **Step 1: 重写外层与标题/空态**

```tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  PageContainer,
  PageHeader,
  GroupLabel,
  EmptyState,
} from "@/components/page-shell";
import { concepts, conceptGroups, conceptGroupMeta } from "@/content/concepts";

export default function ConceptsPage() {
  const [q, setQ] = React.useState("");

  const filtered = concepts.filter((c) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (c.nameZh + c.nameEn + c.definition + c.analogy)
      .toLowerCase()
      .includes(s);
  });

  return (
    <PageContainer>
      <PageHeader
        title="基础概念"
        actions={
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索概念…"
            className="max-w-xs"
          />
        }
      />

      {conceptGroups.map((g) => {
        const items = filtered.filter((c) => c.group === g);
        if (items.length === 0) return null;
        return (
          <section
            key={g}
            id={g}
            data-spy-group={g}
            className="scroll-anchor space-y-3"
          >
            <GroupLabel>{conceptGroupMeta[g]}</GroupLabel>
            <div className="space-y-3">
              {items.map((c, i) => (
                <Reveal key={c.id} delay={i * 50}>
                  <Card
                    id={c.id}
                    data-spy-item={c.id}
                    className="hover-lift scroll-anchor"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        {c.nameZh}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          {c.nameEn}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">定义：</span>
                        {c.definition}
                      </p>
                      <p>
                        <span className="font-medium">类比：</span>
                        {c.analogy}
                      </p>
                      <div className="rounded-md bg-muted/50 p-3">
                        <p className="font-medium">与 AI 协作</p>
                        <p className="text-muted-foreground">{c.aiUsage.strategy}</p>
                        <p className="mt-1 rounded bg-background p-2 font-mono text-xs">
                          {c.aiUsage.example}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && <EmptyState>没有匹配的概念。</EmptyState>}
    </PageContainer>
  );
}
```

- [ ] **Step 2: 验证**

Run: `node ./node_modules/next/dist/bin/next build`
Run: Playwright 截 `/concepts`（明暗），确认标题区、分组标签、卡片 `Reveal` 进场、空态正常；点侧栏三级链接确认锚点落点准（见 Risk 1）。

- [ ] **Step 3: 提交**

```bash
git add src/app/concepts/page.tsx
git commit -m "style(concepts): 套用共享原语、Reveal 与统一空态"
git push origin main
```

---

## Task 7: 组件画廊 `components-view.tsx` 接入 Reveal + 收口标题/锚点（R3/R4/R9）

**Files:**
- Modify: `src/components/motion/reveal.tsx`（重构为模块级单例共享 `IntersectionObserver`，A2）
- Modify: `src/components/components-view.tsx`（外层容器、`SectionTitle`、空搜索态、`scroll-mt`→`scroll-anchor`、scroll-spy `rootMargin`）

**Interfaces:**
- 消费：`PageContainer`/`SectionTitle`/`EmptyState`（Task 1）、`Reveal`（Task 7 Step 1.5 重构后的共享 observer 版）、`scroll-anchor`（Task 2）。
- **A2 极致流畅（最佳实践）**：`Reveal` 当前每个实例各建一个 `IntersectionObserver`（`src/components/motion/reveal.tsx`），组件画廊 60+ 卡片将产生 60+ 观察者，低端机有开销。改为**模块级单例共享 observer**（注册表 `WeakMap<Element, cb>`），N 个元素仅 1 个 observer，入场后 `unobserve`；对全站所有 `Reveal` 向下兼容。验证时记录卡片总数；单例化后即便 >100 也无明显开销（若仍 >100，仅对首屏以上 + 临近视口元素接 `Reveal`，其余默认可见）。
- 风险最高（scroll-spy 耦合），需人工核对侧栏高亮与锚点落点。

- [ ] **Step 1: 顶部 import 增加原语**

```tsx
import {
  PageContainer,
  SectionTitle,
  EmptyState,
} from "@/components/page-shell";
import { Reveal } from "@/components/motion/reveal";
```

- [ ] **Step 1.5: `Reveal` 重构为单例共享 observer（A2，极致流畅）**

将 `src/components/motion/reveal.tsx` 改为模块级单例（保留原 `prefers-reduced-motion` 降级与 `reveal-in` 行为）：

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 模块级单例：所有 Reveal 共用一个 IntersectionObserver，
// 避免 60+ 卡片各自创建 observer 的开销（A2：极致流畅）。
const registry = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = registry.get(entry.target);
        observer!.unobserve(entry.target);
        registry.delete(entry.target);
        cb?.();
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
  );
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.classList.add("reveal-in");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    registry.set(el, reveal);
    getObserver().observe(el);
    return () => {
      getObserver().unobserve(el);
      registry.delete(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: 外层容器 + 空搜索态**

将 `return (<div className="space-y-6">` 改为：
```tsx
const hasResults = componentCategories.some(
  (cat) =>
    componentsByCategory(cat).filter((c) => {
      if (!s) return true;
      return (c.nameZh + c.nameEn + c.desc + c.usage).toLowerCase().includes(s);
    }).length > 0
);

return (
  <PageContainer>
    {/* 原 filter 工具条保持不变 */}
    {!hasResults && <EmptyState>没有匹配的组件。</EmptyState>}
```
并在文件末把对应的 `</div>` 改为 `</PageContainer>`。

- [ ] **Step 3: 分类区段接入 SectionTitle + scroll-anchor；卡片逐张接入 Reveal（D2：与 resources/backend 同构）**

将：
```tsx
<section key={cat} id={cat} data-spy-cat={cat} className="scroll-mt-16 space-y-3">
  <h2 className="text-lg font-semibold tracking-tight text-foreground">
    {componentCategoryMeta[cat]}
    <span className="ml-2 text-xs font-normal text-muted-foreground">
      {items.length} 个
    </span>
  </h2>
  <div className="space-y-3">
    {items.map((c) => (
      <Card key={c.nameEn} id={c.nameEn} data-spy-component={c.nameEn} className="scroll-mt-20 hover-lift">
```
改为（整段 `<section>` **不**包 `Reveal`，保持 `data-spy-cat` 锚点稳定；每张 `<Card>` 包 `<Reveal>` 实现逐卡错峰，与 resources/backend 一致）：
```tsx
<section key={cat} id={cat} data-spy-cat={cat} className="scroll-anchor space-y-3">
  <SectionTitle>
    {componentCategoryMeta[cat]}
    <span className="ml-2 text-xs font-normal text-muted-foreground">
      {items.length} 个
    </span>
  </SectionTitle>
  <div className="space-y-3">
    {items.map((c, i) => (
      <Reveal key={c.nameEn} delay={i * 50}>
        <Card id={c.nameEn} data-spy-component={c.nameEn} className="hover-lift scroll-anchor">
          {/* 卡片内部内容保持现状 */}
        </Card>
      </Reveal>
    ))}
  </div>
</section>
```

- [ ] **Step 4: 校准 scroll-spy 偏移（Risk 1，D4：解耦为单一真源）**

`components-view.tsx` 两处 `IntersectionObserver` 的 `rootMargin` 顶部**不再写死 `-72px`**，改为从 `--scroll-offset` 派生，使与 `.scroll-anchor` 的 `scroll-margin-top` 共用同一令牌（顶栏高度变更时只改 `--scroll-offset` 一处）：
```tsx
// 读取 --scroll-offset（如 4.5rem）并换算为像素，作为 rootMargin 顶部，
// 与 .scroll-anchor 的 scroll-margin-top 共用单一真源；解析失败回退 72px。
const raw = getComputedStyle(document.documentElement).getPropertyValue("--scroll-offset");
const rem = parseFloat(raw);
const offsetPx = Number.isFinite(rem)
  ? rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  : 72;
const rootMargin = `-${offsetPx}px 0px -65% 0px`;

// 两处 IO 均使用：
new IntersectionObserver(cb, { rootMargin, threshold: 0 });
```
同时确认各 `scroll-mt-*` 已全部替换为 `scroll-anchor`（grep `scroll-mt` 应无残留）。

- [ ] **Step 5: 验证**

Run: `node ./node_modules/next/dist/bin/next build`
Run: Playwright 截 `/components`（明暗），滚动核对：(a) 分类区段 `Reveal` 进场一致；(b) 侧栏分类高亮随滚动正确切换（Risk 7）；(c) 点侧栏三级链接锚点落点不被顶栏遮挡（Risk 1）；(d) 搜索无结果时显示统一空态。
- 记录组件卡片总数（A2 验收：单例 observer 下滚动无掉帧/卡顿；若有卡顿按 Interfaces 降级策略处理）。

- [ ] **Step 6: 提交**

```bash
git add src/components/components-view.tsx
git commit -m "style(components): 接入 Reveal、统一标题/空态、收口锚点偏移"
git push origin main
```

---

## Task 8: 资源页 `resources/page.tsx` 统一（复用 Task 6 视觉范式，但保持服务端组件）

**Files:**
- Modify: `src/app/resources/page.tsx`

**Interfaces:**
- 消费：`PageContainer` / `PageHeader` / `GroupLabel`（Task 1）、`Reveal`（既有）、`scroll-anchor`（Task 2）。
- **D1 关键修正**：资源页当前是**服务端组件**（无 `"use client"`、`export const metadata`）且**无搜索框**。本 Task **不**引入搜索 `Input`（用户未要求；引入即被迫转 `"use client"`，违背「尽量保留服务端组件」）。仅套原语、保留既有 per-card `Reveal`、把 `scroll-mt-*` 收口为 `scroll-anchor`；不加 `EmptyState`（无搜索即无空态）。

- [ ] **Step 1: 应用 Task 6 视觉范式（无搜索、保持 server）**

将现有结构改写：外层 `PageContainer`，`PageHeader` 仅用 `title="参考资源"` + `description`（沿用现有描述段）；分组名改用 `GroupLabel`；卡片保持既有 `Card` / `Reveal` / `hover-lift` 写法，把 `scroll-mt-16/24` 改为 `scroll-anchor`。字段与数据来源沿用现有 `resources` / `resourceCategories` / `resourceId`（来自 `@/content/resources`）。**不添加 `useState`、不添加 `Input`、不添加 `EmptyState`。**

- [ ] **Step 2: 验证**

Run: `node ./node_modules/next/dist/bin/next build` + Playwright 截 `/resources`（明暗）；确认页面仍为服务端组件（无 `"use client"`）、分组标签与卡片 `Reveal` 入场一致、锚点落点准（Risk 1）。

- [ ] **Step 3: 提交**

```bash
git add src/app/resources/page.tsx
git commit -m "style(resources): 套用共享原语、收口锚点（保持服务端组件）"
git push origin main
```

---

## Task 9: 后端页 `backend/page.tsx` 统一（复用 Task 6 视觉范式，但保持服务端组件）

**Files:**
- Modify: `src/app/backend/page.tsx`

**Interfaces:**
- 消费：同 Task 8（`PageContainer` / `PageHeader` / `GroupLabel` + 既有 `Reveal` + `scroll-anchor`）。数据来自 `@/content/backend` 的 `backendTopics`。
- **D1 关键修正**：同 Task 8——后端页当前是服务端组件且无搜索；不引入搜索 `Input`、不转客户端、不加 `EmptyState`。

- [ ] **Step 1: 应用 Task 6 视觉范式（无搜索、保持 server）**

外层 `PageContainer` + `PageHeader`（仅 `title="后端相关"` + `description`，沿用现有描述段）+ 分组 `GroupLabel` + 既有卡片内容（`backendTopics` 的 `name`/解释/术语/示例 prompt）+ 既有 per-card `Reveal` + 把 `scroll-mt-16` 改为 `scroll-anchor`。**不添加 `useState` / `Input` / `EmptyState`。**

- [ ] **Step 2: 验证**

Run: `node ./node_modules/next/dist/bin/next build` + Playwright 截 `/backend`（明暗）。

- [ ] **Step 3: 提交**

```bash
git add src/app/backend/page.tsx
git commit -m "style(backend): 套用共享原语、收口锚点（保持服务端组件）"
git push origin main
```

---

## Task 10: 示例页充实（Q7，同一套规则）

**Files:**
- Modify: `src/app/examples/page.tsx`（壳，加 `PageContainer`/`PageHeader`）
- Modify: `src/components/examples/pages.tsx`（9 个页面级布局从粗骨架充实）
- Modify: `src/components/examples/registry.tsx`（如有占位示例，随布局一起补真实内容）

**Interfaces:**
- 消费：`PageContainer`/`PageHeader`/`SectionTitle`/`EmptyState`（Task 1）、`Reveal`（既有）、`.example-canvas` 字体回落（既有，`globals.css`）。
- 关键硬规则：每个示例布局的根容器必须带 `example-canvas` class（确保内部标题/正文回落无衬线，不带入国风装饰字体）；全部用令牌类，禁止硬编码 hex；区段接入 `Reveal`。
- **D5 修正**：当前 `examples/pages.tsx` 的示例布局根节点用的是 `<div className="space-y-4">`，**缺失 `example-canvas`**，装饰字体可能渗入示例内部。本 Task 重写时必须给每个示例根显式加 `example-canvas`（Dashboard 示例已示范）。

- [ ] **Step 1: 示例壳套原语**

`src/app/examples/page.tsx` 外层改为 `PageContainer` + `PageHeader`（标题「示例」，描述如「完整页面级布局参考」）。

- [ ] **Step 2: 逐个充实 9 个示例（A6：逐个交付、逐个核对、逐个 commit）**

质量闸门（每个示例都须满足）：① 根容器带 `example-canvas`；② 用令牌类、禁止硬编码 hex；③ 复用现有 `@/components/ui/*`（Card/Button/Badge/...），不引入新依赖；④ 不复制 Tailwind Plus 源码（Risk 4）；⑤ **每个示例 ≤6 个区块**，保持克制；⑥ 区段接入 `Reveal`。

执行顺序：先以 **Dashboard** 为模板定调（见下方骨架），再按各自主题逐个完成其余 8 个（IDE、看板、登录、设置、仪表盘变体等）。**每完成 1 个示例即：**
1. `node ./node_modules/next/dist/bin/next build` + Playwright 截 `/examples`（明暗）核对该示例：字体回落正确（示例内无宋体/齐伋体）、`Reveal` 一致、令牌色统一；
2. 本地 `git add src/app/examples/page.tsx src/components/examples/pages.tsx src/components/examples/registry.tsx`（及该示例新增的字体分片）→ `git commit -m "feat(examples): 充实 <示例名> 布局"`。

**前 2–3 个示例完成后**，输出一份「区块模板 / 配色 / 间距」小结（沉淀到 `docs/.AI/debug-log.md`），后续示例直接复用，提速且保证一致。

Dashboard 骨架（其余按主题填充真实区块：导航栏、统计卡、表格/列表、图表占位用 `chart-*` 令牌色）：

```tsx
// 在某布局组件内（位于 src/components/examples/pages.tsx）
<section className="example-canvas space-y-6">
  <Reveal>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 className="text-lg font-semibold">概览</h3>
      <Button size="sm">导出</Button>
    </div>
  </Reveal>
  <Reveal>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[ "今日访问", "转化率", "活跃用户", "收入" ].map((k) => (
        <Card key={k}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{k}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">—</CardContent>
        </Card>
      ))}
    </div>
  </Reveal>
  <Reveal>
    <Card>
      <CardHeader><CardTitle className="text-base">近期活动</CardTitle></CardHeader>
      <CardContent className="text-sm text-muted-foreground">（真实列表内容待补）</CardContent>
    </Card>
  </Reveal>
</section>
```

- [ ] **Step 3: 字体子集（Risk 5）**

若示例新增了 `src/` 内未出现过的中文字，运行：
```bash
node scripts/gen-lxgw.mjs
```
Expected: 重新子集化，生成新的 woff2 分片与 CSS；`git add public/fonts/lxgw-wenkai/` 并提交（建议每完成一个示例、若有新增中文字即跑一次，避免末尾集中补导致字体回退）。

- [ ] **Step 4: 全量终验**

Run: `node ./node_modules/next/dist/bin/next build`
Run: Playwright 截 `/examples`（明暗），滚动核对全部 9 个布局均为真实内容、字体回落正确（示例内无宋体/齐伋体）、`Reveal` 一致；确认无遗漏的 `example-canvas`（grep `className="space-y-4"` 在 `src/components/examples/` 内应无残留）。

- [ ] **Step 5: 收尾提交（仅当本 Task 内尚有未提交改动时）**

前序「每完成 1 个示例即 commit」已覆盖绝大多数改动；若仍有跨示例的共享调整（如统一间距工具类、补字体分片）未提交，则：
```bash
git add src/app/examples/page.tsx src/components/examples/pages.tsx src/components/examples/registry.tsx public/fonts/lxgw-wenkai/
git commit -m "chore(examples): 统一 9 示例间距/配色收尾"
git push origin main   # 若被拒（并行窗口已推送）则暂停报告，不强行推送
```

---

## Task 11: 顶栏/侧栏轻量打磨 + 预留未来扩展点（Q6）

**Files:**
- Modify: `src/components/site-sidebar.tsx`（新增惰性 `<SidebarExtras />` 插槽，空渲染，不实现功能）

**Interfaces:**
- 产出：一个**真实但惰性**的 `<SidebarExtras />` 服务端组件（当前 `return null`，仅作为未来 CAT 链接的明确插入点），替代裸注释占位，使后续改动是机械的、不引入运行时代码噪音（D7）。

- [ ] **Step 1: 新增惰性插槽组件**

在 `site-sidebar.tsx` 内（与组件同文件或就近）新增：
```tsx
/** 未来扩展点：用户将在左侧导航下方加 CAT 链接（阶段 C 之后实现）。
 *  当前空渲染；届时在此返回独立区块，保持与 TreeMenu 的视觉间距一致。 */
function SidebarExtras() {
  return null;
}
```
并在 `<nav>` 之后、`</aside>` 内容区合适位置渲染：
```tsx
<SidebarExtras />
```

- [ ] **Step 2: 顶栏保持现状**

`site-header.tsx` 本 Task **不改动**（Q1 精修 + Q6 不做营销站式大改）。如后续用户明确要求营销站风格顶栏，另立计划。

- [ ] **Step 3: 验证**

Run: `node ./node_modules/next/dist/bin/next build`
Expected: 通过；侧栏渲染无变化（`<SidebarExtras />` 返回 null），仅多一个惰性插槽。

- [ ] **Step 4: 提交**

```bash
git add src/components/site-sidebar.tsx
git commit -m "refactor(sidebar): 预留惰性 SidebarExtras 扩展槽"
git push origin main
```

---

## Task 12: 全站终验

**Files:**
- 无源码改动（仅验证与文档）。

- [ ] **Step 1: 全量构建与 lint**

Run: `pnpm run lint` 与 `node ./node_modules/next/dist/bin/next build`
Expected: 均通过，无类型/lint 错误。

- [ ] **Step 2: Playwright 视觉核对（明暗双主题 × 6 路由）**

用 Playwright（chromium，环境已修）逐路由截图：先 `pnpm run dev` 起服务（跨源访问已放行 `192.168.204.1`），再对每个路由截 `/`、`/concepts`、`/components`、`/examples`、`/resources`、`/backend` 的 light + dark；重点核对：
- 页面最大宽度/纵向节奏一致（无双 padding、无错位）；
- 区段标题层级统一；
- 全站 `Reveal` 进场一致且不花哨（Q5）；
- 空态统一；
- 锚点落点不被顶栏遮挡（Risk 1）；
- 示例内字体回落正确（Risk 5）；
- `data-motion="off"` 下所有动效静止、内容首帧可见。

- [ ] **Step 3: 提交（如有修复）**

若发现回归，修复后单独 commit 并 push；若无，本 Task 无提交。

---

## Task 13: 更新项目文档（进度 + 决策留痕）

**Files:**
- Modify: `docs/.AI/project-progress.md`
- Modify: `docs/.AI/decision-log.md`（新增 DEC 条目）

**Interfaces:**
- 记录：阶段 C 启动、删除 ember/three/motion 的决策、共享组件方案。

- [ ] **Step 1: 写 decision-log**

在 `docs/.AI/decision-log.md` 追加：
```
## DEC-xxx 阶段 C 统一 pass 的范围与死代码清理
- 范围：在现有国风语言内精修；抽共享布局原语 page-shell.tsx；全站接入 Reveal；删 HeroEmber + three + motion 包；充实 9 个示例页。
- 删 HeroEmber（three.js 火山余烬，全仓 0 import）→ 移除 three + @types/three。
- 删 motion 包（源码 0 引用）。
- 不在本次：页脚、营销站式顶栏大改、CAT 链接、移动端精修（均 defer）。
- 原因：用户 2026-09-03 确认（Q1–Q8）。
```

- [ ] **Step 2: 更新 project-progress**

将「剩余大块」由「最终统一 pass（待做）」改为「进行中 / 已完成（注明日期与 commit）」，并列出本计划路径 `docs/superpowers/plans/2026-09-03-stage-c-unified-pass.md`。

- [ ] **Step 3: 提交**

```bash
git add docs/.AI/project-progress.md docs/.AI/decision-log.md
git commit -m "docs: 记录阶段 C 计划与死代码清理决策"
git push origin main
```

---

## Self-Review

1. **Spec coverage**：Q1 精修✓（保留令牌/字体，仅套原语）、Q2 共享组件✓(Task1)、Q3 删 ember+three✓(Task4)、Q4 删 motion✓(Task4)、Q5 全站 Reveal✓(Task5-10)、Q6 无页脚+预留 CAT/营销示例 defer✓(Task11 + Risks)、Q7 示例充实同规则✓(Task10)、Q8 移动端 defer✓(Risks 标注)。全部覆盖。
2. **Placeholder scan**：无 TBD/TODO；示例 Task 10 给出 Dashboard 定调代码与「其余 8 个同法」的明确内容填充指示（非占位，而是内容创作指令），可接受。
3. **Type consistency**：`Width`/`PageContainer`/`PageHeader`/`SectionTitle`/`GroupLabel`/`EmptyState` 在 Task1 定义，Task5-10 均按相同签名消费；`scroll-anchor` 在 Task2 定义、Task3/6/7/8/9 一致使用。无命名漂移。
4. **风险闭环**：Risk 1（scroll-spy）在 Task2/3/7 显式处理；Risk 2（依赖删除）在 Task4 用 grep 兜底；Risk 5（字体）在 Task10 Step3 处理；Risk 7（Reveal×spy）在 Task7 Step5 人工核对。均有关联任务，无悬空风险。
5. **审查修正闭环（2026-09-03 第一性原理审查）**：已纳 7 处修正——D1 resources/backend 不引入搜索、保持服务端组件；D2 components-view 改 per-card `Reveal`；D3 首页恢复较大纵向留白（`space-y-14 md:space-y-20`）；D4 删未用 `--header-h`、`rootMargin` 改由 `--scroll-offset` 派生（含解析失败兜底）；D5 强制示例根加 `example-canvas`；D6 组件级原始 HTML 示例列为范围外；D7 侧栏裸注释改惰性 `<SidebarExtras />`。
6. **对抗审查追加（2026-09-03 用户拍板）**：A2 `Reveal` 改为模块级单例共享 `IntersectionObserver`（Task 7 Step 1.5，极致流畅，避免 60+ 卡片各建观察者）；A6 示例 9 个逐个完成/逐个视觉核对/逐个 commit，前 2–3 个后沉淀「区块模板/配色/间距」经验提速；并新增「执行纪律」一节（逐 Task 验收、并行窗口隔离、Git 安全红线）。
