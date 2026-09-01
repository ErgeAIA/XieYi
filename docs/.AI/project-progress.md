# Project Progress

> 记录当前任务状态、分支和最近进展。每次会话更新。

---

## 当前状态

- **当前分支**：main（初始仓库，尚未开特性分支）
- **最后更新**：2026-09-02 **阶段 B M1 完成**：落地示例注册表模式（`src/components/examples/registry.tsx` + `components-view.tsx` 的 `ExampleBlock`），覆盖 7 个代表性组件（Card/Tabs/Button/Input/Badge/Alert/Dialog），构建通过、lint 0 错误，已推送 `2ecb5d7`；用户已确认阶段 B 决策（先验证模式再铺开 / HTML 字段保留作 fallback / main 增量提交即推送）。
- **最后更新**：2026-09-02 **AGENTS 文档体系重构 + 供应链策略绕过验证**：按"项目级 Agent 合作协议"协议重写 `AGENTS.md`（强制顺序：Permissions → 工具链版本 → 命令表 → 反直觉约定 → 自维护协议），并拆出 `docs/.AI` 三件套（project-progress / decision-log / debug-log）；验证 pnpm 供应链 `minimumReleaseAge` 策略的可绕过方式——直接 `node ./node_modules/next/dist/bin/next dev|build` 不经 pnpm，或 `pnpm install --config.minimumReleaseAge=0`。详见 `decision-log` DEC-001 / DEC-002、`debug-log` BUG-001。
- **最后更新**：2026-09-01 **阶段 A 完成（脚手架 + shadcn + 数据迁移 + 布局/侧栏/搜索）**：Next 16 + TS + Tailwind v4 + App Router + `src/`；16 个 shadcn ui 组件；从 ErgePrism 抽取 67 组件 / 21 概念到 `src/content`；三级侧栏 + 顶栏 ⌘K + 首页/概念/组件页；`pnpm run build` 通过、dev 6 路由返回 200。

## 阶段进度

### 阶段 A（已完成，2026-09-01）
- 脚手架、shadcn 初始化、数据迁移、布局/侧栏/搜索全部落地，build 通过。

### 阶段 B（进行中）
总目标：把"HTML 片段示例"升级为**真实可交互 shadcn 组件**，补全示例，做 `/examples` 页面级布局。

**已确认决策（2026-09-02）**：
- 范围：先验证模式（6~8 个代表性组件）→ 铺开 28 → 补 39 空白 + B-②（风险最低路径）。
- 过渡：`ComponentItem.example` 原始 HTML 字段**保留作 fallback**（命中注册表渲染真实组件，否则回退 HTML / Skeleton），不立即删除。
- 提交：main 直接增量 commit 并 `git push origin main`（遵守用户约定）。

**已落地模式（M1，2026-09-02 完成）**：
- 注册表 `src/components/examples/registry.tsx`：`nameEn → React.ComponentType` 映射。
- `components-view.tsx` 新增 `ExampleBlock`：命中注册表渲染真实组件，否则回退原 HTML / Skeleton。
- M1 覆盖 7 个代表性组件（含示例且有对应 UI 原语）：`Card` / `Tabs` / `Button` / `Input` / `Badge` / `Alert` / `Dialog`。构建通过、lint 0 错误，已推送 `2ecb5d7`。

- **B-① 组件示例重写（核心）**：M1 已验证模式；下一步铺开其余 21 个含 `example` 的组件，再补 39 个空白（Skeleton 占位或最小 demo）。
- **B-② `/examples`**：9 个页面级示例做成真实布局。
- **B-③（可选）**：充实概念/组件内容、参考资源、后端相关。

## 关键数据事实
- 组件 **67** 条 / 概念 **21** 条 / 含 `example` 的 **28** 条（其余 39 暂空）。
- `ComponentItem` 字段：`cat, nameZh, nameEn, desc, usage, example?`。
- `Concept` 字段：`id, nameZh, nameEn, group, definition, analogy, aiUsage{strategy, example}`。
- `ComponentCategory` 共 9 类：`layout` / `form` / `navigation` / `display` / `feedback` / `overlay` / `charts` / `chat` / `extra`。
