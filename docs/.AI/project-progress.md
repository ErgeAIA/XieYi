# Project Progress

> 记录当前任务状态、分支和最近进展。每次会话更新。

---

## 当前状态

- **当前分支**：main（初始仓库，尚未开特性分支）
- **最后更新**：2026-09-03 **墨滴动画性能修复（hero-bloom.tsx）**：限帧 ~30fps（FRAME_MS=33）、内部渲染分辨率上限 1000→700、着色器降耗（fbm 八度 5→3，高频细节/颗粒层由 fbm 降为单八度 noise）、墨滴 5→3 且每轮重新随机位置/种子（不再固定点位）；`MutationObserver` 监听 `data-motion`，关闭即停 rAF 循环只画静态帧、开启即恢复（修复「开关关了没用」）。`tsc`/`eslint`/`next build` 通过，Playwright 实测：开关生效（off rAF=0 / on>0）、位置随机、canvas 700×316、无 shader 报错。
- **最后更新**：2026-09-03 **侧栏导航「跳转不精准」用户实测缓解，算验收**（不再单独修）。
- **最后更新**：2026-09-03 **Playwright MCP 浏览器缺失修复**：MCP 内置 Playwright 锁定 chromium-1200，全局 CLI 装的是更新 build；复制已装 `chromium-1234` → `chromium-1200` 路径（非破坏性）使浏览器启动成功，可用于首页动画实测。
- **最后更新**：2026-09-03 **提交未提交历史改动**：commit `eab55b2` 推送 `main`，含示例注册表（`registry.tsx`）/9 个页面级布局（`examples/pages.tsx`）/`command-search.tsx`/`sidebar-tree.tsx`/`hero-bloom.tsx` 及 `.gitignore`（忽略空文件 `.dev.err`）。
- **最后更新**：2026-09-02 **阶段 B M1 完成**：落地示例注册表模式（`src/components/examples/registry.tsx` + `components-view.tsx` 的 `ExampleBlock`），覆盖 7 个代表性组件（Card/Tabs/Button/Input/Badge/Alert/Dialog），构建通过、lint 0 错误，已推送 `2ecb5d7`；用户已确认阶段 B 决策（先验证模式再铺开 / HTML 字段保留作 fallback / main 增量提交即推送）。
- **最后更新**：2026-09-02 **阶段 B M2 推进**：新增 4 个表单原语（checkbox/switch/select/radio-group）；注册表覆盖 21/28 含示例组件（M1 的 7 + M2 新增 14）；构建通过、lint 0；已推送 `40a2f8e`。剩余 7 个复杂组件（Date Picker/Dropdown Menu/Drawer/Chart/File Tree/Upload/Toast）待下一批。
- **最后更新**：2026-09-02 **阶段 B M2b 完成**：补齐剩余 7 个复杂组件（Date Picker/Dropdown Menu/Drawer/Chart/File Tree/Upload/Toast）的可交互示例，注册表现已覆盖 **28/28** 含 `example` 的组件；示例内容自由设计，视觉风格参考 `ErgePrism/tools/shadcn-ui-showcase.html`、实现参考官方文档；全部用纯 React + 现有 ui 原语（Drawer 复用 Sheet）+ lucide 实现，不引入新依赖；构建通过、类型检查 0 错误（待提交推送）。
- **最后更新**：2026-09-02 **AGENTS 文档体系重构 + 供应链策略绕过验证**：按"项目级 Agent 合作协议"协议重写 `AGENTS.md`（强制顺序：Permissions → 工具链版本 → 命令表 → 反直觉约定 → 自维护协议），并拆出 `docs/.AI` 三件套（project-progress / decision-log / debug-log）；验证 pnpm 供应链 `minimumReleaseAge` 策略的可绕过方式——直接 `node ./node_modules/next/dist/bin/next dev|build` 不经 pnpm，或 `pnpm install --config.minimumReleaseAge=0`。详见 `decision-log` DEC-001 / DEC-002、`debug-log` BUG-001。
- **最后更新**：2026-09-02 **阶段 B M2c 完成**：① 39 个空白组件改为**分类感知的 Skeleton 占位**——`components-view.tsx` 新增 `ComponentPlaceholder`，`ExampleBlock` 按 `cat` 渲染（charts/layout/form/navigation/display/feedback/overlay/chat/extra 各异）；② `/examples` 重写为 **9 个页面级真实可交互布局**（`src/components/examples/pages.tsx` 的 `ExamplesGallery`：Dashboard 数据面板 / IDE 编辑器 / 表单填写 / 数据列表管理 / 登录注册 / 设置 / 看板 / 任务待办 / 时间轴），全用现有 ui 原语 + lucide，未引入新依赖。踩坑：服务端组件不能直接 import 非组件值（数组被打包成 client reference，`pageExamples.map` 失效），已把整段画廊移入 client 组件修正。构建通过、类型检查 0 错误、lint 0；已推送 `8552f9d`。
- **最后更新**：2026-09-02 **阶段 B B-③ 内容充实完成**：概念/组件内容在阶段 A 迁移时已充实，本次仅补两块真实缺口——① `src/content/resources.ts` 6 大类 22 项真实参考资源（含外链/说明）；② `src/content/backend.ts` 6 主题后端内容（API/数据库/认证鉴权/部署运行/缓存/文件存储，含解释+术语+示例 prompt）。`/resources`、`/backend` 两页重写为真实内容渲染。构建通过、tsc 0、lint 0；已推送 `fb6022a`。**真实布局/UI 美化/动画按用户要求统一留到最终 pass**。
- **最后更新**：2026-09-01 **阶段 A 完成（脚手架 + shadcn + 数据迁移 + 布局/侧栏/搜索）**：Next 16 + TS + Tailwind v4 + App Router + `src/`；16 个 shadcn ui 组件；从 ErgePrism 抽取 67 组件 / 21 概念到 `src/content`；三级侧栏 + 顶栏 ⌘K + 首页/概念/组件页；`pnpm run build` 通过、dev 6 路由返回 200。

## 阶段进度

### 阶段 A（已完成，2026-09-01）
- 脚手架、shadcn 初始化、数据迁移、布局/侧栏/搜索全部落地，build 通过。

### 阶段 B（已完成，2026-09-02）

阶段 B 全部完成：B-① 组件示例重写（注册表覆盖 28/28 含 example 组件 + 39 空白分类感知 Skeleton 占位）、B-② `/examples` 9 个页面级真实布局、B-③ 概念/组件内容 + 参考资源 + 后端内容均落地。

### 阶段 C（待启动）：最终统一 pass
- **目标**：全站 UI 美化 + 真实布局精修 + 动画统一。用户 2026-09-02 明确要求「等全站内容齐了再一起做」，现内容已齐（阶段 B 完成），该 pass 尚未启动。
- **范围待定**：`HeroBloom`（墨滴）已就绪；`HeroEmber`（three.js 余烬）当前为未挂载死代码，统一 pass 时定夺去留（见 DEC-003）；LXGW 字体子集可能因近期新增中文需重跑 `node scripts/gen-lxgw.mjs`。
总目标：把"HTML 片段示例"升级为**真实可交互 shadcn 组件**，补全示例，做 `/examples` 页面级布局。

**已确认决策（2026-09-02）**：
- 范围：先验证模式（6~8 个代表性组件）→ 铺开 28 → 补 39 空白 + B-②（风险最低路径）。
- 过渡：`ComponentItem.example` 原始 HTML 字段**保留作 fallback**（命中注册表渲染真实组件，否则回退 HTML / Skeleton），不立即删除。
- 提交：main 直接增量 commit 并 `git push origin main`（遵守用户约定）。

**已落地模式（M1，2026-09-02 完成）**：
- 注册表 `src/components/examples/registry.tsx`：`nameEn → React.ComponentType` 映射。
- `components-view.tsx` 新增 `ExampleBlock`：命中注册表渲染真实组件，否则回退原 HTML / Skeleton。
- M1 覆盖 7 个代表性组件（含示例且有对应 UI 原语）：`Card` / `Tabs` / `Button` / `Input` / `Badge` / `Alert` / `Dialog`。构建通过、lint 0 错误，已推送 `2ecb5d7`。
**已落地模式（M2，2026-09-02 推进）**：
- 新增 4 个表单原语：`src/components/ui/{checkbox,switch,select,radio-group}.tsx`（Base UI 底层，shadcn base-nova 风格）。
- 注册表扩至覆盖 21/28 含 `example` 组件（M1 的 7 + M2 新增 14）。已推送 `40a2f8e`。
- 剩余 7 个复杂组件（Date Picker / Dropdown Menu / Drawer / Chart / File Tree / Upload / Toast）**已于 M2b 补齐**（Drawer 复用 Sheet 原语，其余内联实现，未引入新依赖）。

- **B-① 组件示例重写（核心）**：M1 验证模式 + M2 铺开 + M2b 补齐复杂组件（注册表覆盖 **28/28** 含 `example` 组件）+ M2c 补 39 个空白（分类感知 Skeleton 占位）。**已全部完成**。
- **B-② `/examples`**：9 个页面级示例已做成真实布局（Dashboard/IDE/表单/数据列表/登录注册/设置/看板/待办/时间轴），见 M2c。**已完成**。
- **B-③（可选）**：充实概念/组件内容、参考资源、后端相关。**内容部分已完成**：① 概念（21）/组件（67）内容在阶段 A 从 `vibe-coding-guide.html` 迁移时已写充实（`desc`/`usage`/`definition`/`analogy`/`aiUsage` 均有实质内容，仅 39 个 `example` 为空——属 B-① 约定的 Skeleton 占位回退，正常）；② 参考资源 `src/content/resources.ts`：6 大类 22 项真实资源（含外链/说明）；③ 后端相关 `src/content/backend.ts`：API/数据库/认证鉴权/部署运行/缓存/文件存储 6 主题，含解释+关键术语+示例 prompt。两页已重写为真实内容渲染；构建通过、tsc 0、lint 0；commit `fb6022a` 已推送。**布局/UI 美化/动画按用户要求统一留到最终 pass 一起做**。

## 关键数据事实
- 组件 **67** 条 / 概念 **21** 条 / 含 `example` 的 **28** 条（其余 39 暂空）。
- `ComponentItem` 字段：`cat, nameZh, nameEn, desc, usage, example?`。
- `Concept` 字段：`id, nameZh, nameEn, group, definition, analogy, aiUsage{strategy, example}`。
- `ComponentCategory` 共 9 类：`layout` / `form` / `navigation` / `display` / `feedback` / `overlay` / `charts` / `chat` / `extra`。
