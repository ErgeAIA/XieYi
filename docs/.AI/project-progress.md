# Project Progress

> 记录当前任务状态、分支和最近进展。每次会话更新。

---

## 当前状态

- **当前分支**：main（初始仓库，尚未开特性分支）
- **最后更新**：2026-09-02 **AGENTS 文档体系重构 + 供应链策略绕过验证**：按"项目级 Agent 合作协议"协议重写 `AGENTS.md`（强制顺序：Permissions → 工具链版本 → 命令表 → 反直觉约定 → 自维护协议），并拆出 `docs/.AI` 三件套（project-progress / decision-log / debug-log）；验证 pnpm 供应链 `minimumReleaseAge` 策略的可绕过方式——直接 `node ./node_modules/next/dist/bin/next dev|build` 不经 pnpm，或 `pnpm install --config.minimumReleaseAge=0`。详见 `decision-log` DEC-001 / DEC-002、`debug-log` BUG-001。
- **最后更新**：2026-09-01 **阶段 A 完成（脚手架 + shadcn + 数据迁移 + 布局/侧栏/搜索）**：Next 16 + TS + Tailwind v4 + App Router + `src/`；16 个 shadcn ui 组件；从 ErgePrism 抽取 67 组件 / 21 概念到 `src/content`；三级侧栏 + 顶栏 ⌘K + 首页/概念/组件页；`pnpm run build` 通过、dev 6 路由返回 200。

## 阶段进度

### 阶段 A（已完成，2026-09-01）
- 脚手架、shadcn 初始化、数据迁移、布局/侧栏/搜索全部落地，build 通过。

### 阶段 B（待启动）
总目标：把"HTML 片段示例"升级为**真实可交互 shadcn 组件**，补全示例，做 `/examples` 页面级布局。
- **B-① 组件示例重写（核心）**：建 `nameEn → 真实示例组件` 注册表，覆盖 28 个已有 `example` 的组件；`components-view.tsx` 用注册示例替换 `dangerouslySetInnerHTML` 渲染块，找不到则回退 Skeleton（覆盖 39 个暂无示例）。
- **B-② `/examples`**：9 个页面级示例做成真实布局。
- **B-③（可选）**：充实概念/组件内容、参考资源、后端相关。

**默认执行顺序（待确认）**：先 6~8 个代表性组件（Button / Input / Checkbox 或 Switch / Dialog / Tabs / Card / Alert / Badge）验证模式 → 铺开 28 → 补 39 空白 + B-②。

**待用户确认的 2 个点**：
- 范围：一次性做满 28，还是先验证模式再铺开（推荐后者，风险最低）。
- 过渡期：`ComponentItem.example` 原始 HTML 字段保留作 fallback，还是新组件就位后删除。

## 关键数据事实
- 组件 **67** 条 / 概念 **21** 条 / 含 `example` 的 **28** 条（其余 39 暂空）。
- `ComponentItem` 字段：`cat, nameZh, nameEn, desc, usage, example?`。
- `Concept` 字段：`id, nameZh, nameEn, group, definition, analogy, aiUsage{strategy, example}`。
- `ComponentCategory` 共 9 类：`layout` / `form` / `navigation` / `display` / `feedback` / `overlay` / `charts` / `chat` / `extra`。
