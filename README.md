# 写意 Xieyi

> 以意运码，码落而器成。胸中之构，言而为品。

**写意（Xieyi）** 是一个 **Vibe Coding 指南站点**：把"专注产品设计、把实现交给 AI"的理念落地为可浏览的**组件库 + 概念库**。对标 [ui.shadcn.com](https://ui.shadcn.com)，但示例是**真实可交互的 shadcn 组件**（而非截图/HTML 片段）。

## 技术栈

- Next.js 16（App Router + `src/` 目录）
- React 19 + TypeScript 5
- Tailwind CSS v4
- shadcn/ui（底层 **Base UI**，非 Radix），风格 `base-nova`
- 包管理器：**pnpm 11.25**

## 快速开始

```bash
pnpm install          # 安装依赖
pnpm run dev          # 开发服务器 → http://localhost:3000
pnpm run build        # 生产构建
pnpm run start        # 启动生产产物
pnpm run lint         # ESLint（当前无 --fix）
```

> 注意：pnpm 11.25 默认启用供应链"最小发布年龄"校验，可能拦截刚发布几天的包，导致 `pnpm install` / `pnpm run dev` 报 supply-chain 策略错误。绕过方式见 `docs/.AI/debug-log.md`（BUG-001）。

## 项目结构

- `src/app/`：App Router 路由（首页 / 概念 / 组件 / 示例 / 资源 / 后端）
- `src/components/`：站点级组件（三级侧栏、顶栏、⌘K 命令面板、`components-view` 列表视图、`ui/` 16 个 shadcn 组件）
- `src/content/`：纯数据模块（`types.ts` / `concepts.ts` / `components.ts`），组件 67 条、概念 21 条
- `src/lib/`：`utils`（shadcn `cn` 等）

## 说明（给人类）

- **协作约定（面向 Agent）**：`AGENTS.md` 是 AI 协作契约（命令、边界、反直觉约定），属于 system prompt，人类无需细读。
- **进度 / 决策 / 排障（面向 Agent）**：`docs/.AI/` 下三份文档——`project-progress.md`（进度）、`decision-log.md`（决策）、`debug-log.md`（bug 修复经验）。
- **阶段状态**：阶段 A（脚手架 + 数据 + 布局）已完成；阶段 B（把 HTML 片段示例升级为真实可交互 shadcn 组件、补全 `/examples`）待启动。详见 `docs/.AI/project-progress.md`。
