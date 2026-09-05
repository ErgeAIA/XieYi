// 参考资源：与 AI 沟通组件 / 前后端时，可对照这些资源给出更准确的需求。
// 原则：只收官方站点/文档，不做导航站；每条尽量带「对 AI 说」的可抄话术。

export type ResourceCategory =
  | "组件库"
  | "底层原语"
  | "图标库"
  | "AI 工具"
  | "动画组件"
  | "后端与服务"
  | "学习资料"
  | "社区";

export interface ResourceItem {
  name: string;
  url: string;
  category: ResourceCategory;
  note: string;
  /** 本站在用的技术栈，卡片打「本站同款」标 */
  stack?: boolean;
  /** 对 AI 说：直接可抄的一句话需求示例 */
  ai?: string;
  /** 相关阅读：站内概念/词条/板块链接（交叉引用） */
  related?: { href: string; label: string }[];
}

// 生成稳定的锚点 id（侧栏三级跳转用），与页面卡片 id 保持一致。
export function resourceId(r: ResourceItem): string {
  return r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export const resourceCategories: ResourceCategory[] = [
  "组件库",
  "底层原语",
  "图标库",
  "动画组件",
  "AI 工具",
  "后端与服务",
  "学习资料",
  "社区",
];

export const resourceCategoryMeta: Record<ResourceCategory, string> = {
  组件库: "开箱即用的组件集合",
  底层原语: "无样式原语与样式地基",
  图标库: "统一风格的界面图标集",
  "AI 工具": "用 AI 生成与写码的官方工具",
  动画组件: "带动效的进阶组件与动画库",
  "后端与服务": "灵脉专题对应的官方工具",
  学习资料: "官方文档与区块参考",
  社区: "官方仓库与社区",
};

export const resourceCategoryMetaEn: Record<ResourceCategory, string> = {
  组件库: "Component Libraries",
  底层原语: "Primitives",
  图标库: "Icon Libraries",
  "AI 工具": "AI Tools",
  动画组件: "Animation",
  "后端与服务": "Backend & Services",
  学习资料: "Learning",
  社区: "Community",
};

// 类目引导 + 选型指引（什么场景选什么）
export const resourceCategoryDesc: Record<ResourceCategory, string> = {
  组件库:
    "别人做好的组件直接拿来用，省去从零造轮子。选型：本站练习与个人项目用 shadcn/ui；做企业中后台，参考 Ant Design / Arco 的术语与交互规范；要覆盖面最全选 MUI；Vue 项目对照 Element Plus。",
  底层原语:
    "无样式原语与样式地基，想深度定制外观时从这里打地基。选型：本站用 Base UI + Tailwind；Radix 是 shadcn 早期依赖，其无障碍文档仍常被引用；复杂交互的无障碍处理参考 React Aria。",
  图标库:
    "统一风格的界面图标集，画「搜索、设置、删除」这类小图标时直接查。选型：跟本站用 Lucide；要粗细变化选 Phosphor；要量大且圆润选 HugeIcons；怕中途换库就用 Iconify 聚合。",
  动画组件:
    "带动效的进阶组件与动画库。建议基础页面成型后再来升级：整体动效基础设施用 Framer Motion；现成特效区块看 Magic UI / Aceternity。",
  "AI 工具":
    "官方出品的 AI 生成工具，负责加速出活。对话式写码用 Claude Code / Cursor；生成 UI 原型用 v0。",
  "后端与服务":
    "灵脉十个专题对应的官方工具，按需取用：ORM 选 Prisma / Drizzle，登录用 Auth.js，参数校验用 Zod，发邮件用 Resend，缓存用 Upstash Redis，文件存储用 Vercel Blob。",
  学习资料:
    "官方文档与区块参考。概念不确定先来这里看权威说法；shadcn Blocks 是官方区块级布局，可直接当页面参考。",
  社区:
    "官方仓库与社区入口。卡住时去 issue 区搜，对设计稿时找官方套件。",
};

// 二级分类国风雅称（仅展示层；原始名用分类 key、英文 resourceCategoryMetaEn 不变）
export const resourceCategoryAlias: Record<ResourceCategory, string> = {
  组件库: "百宝",
  底层原语: "法度",
  图标库: "符箓",
  "AI 工具": "灵兵",
  动画组件: "流影",
  "后端与服务": "丹方",
  学习资料: "典册",
  社区: "道场",
};

export const resources: ResourceItem[] = [
  // 组件库
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "组件库",
    note: "复制即用、可深度定制的 React 组件集合，本站组件体系的基础。",
    stack: true,
    ai: "用 shadcn 的 Dialog 组件做一个删除确认弹窗。",
  },
  {
    name: "Ant Design",
    url: "https://ant.design",
    category: "组件库",
    note: "企业级组件库，术语与组件命名对照的权威参考。",
    ai: "用 Ant Design 的 Table 渲染这份数据，要带排序和列筛选。",
  },
  {
    name: "Material UI (MUI)",
    url: "https://mui.com",
    category: "组件库",
    note: "成熟的 Material Design 实现，组件覆盖度极高。",
    ai: "用 MUI 实现一个带步进器的分步表单页面。",
  },
  {
    name: "Arco Design",
    url: "https://arco.design",
    category: "组件库",
    note: "字节出品的企业级组件库，设计语言偏简洁。",
    ai: "用 Arco Design 的布局组件搭一个后台管理框架。",
  },
  {
    name: "Element Plus",
    url: "https://element-plus.org",
    category: "组件库",
    note: "Vue 生态组件库，跨框架对照时很有用。",
    ai: "用 Element Plus 写一个 Vue 的系统设置表单页。",
  },

  // 底层原语
  {
    name: "Base UI",
    url: "https://base-ui.com",
    category: "底层原语",
    note: "MUI 团队的下一代无样式原语，本项目采用。",
    stack: true,
    ai: "用 Base UI 的 Select 原语实现自定义下拉，样式用 Tailwind 控制。",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    category: "底层原语",
    note: "原子化 CSS 框架，shadcn 的样式基础。",
    stack: true,
    ai: "用 Tailwind 把这个组件改成响应式：移动端单列、桌面端三列。",
  },
  {
    name: "Radix UI",
    url: "https://www.radix-ui.com",
    category: "底层原语",
    note: "shadcn 早期依赖的无样式、可访问性原语。",
    ai: "用 Radix 的 Tabs 原语封装一个自定义选项卡。",
  },
  {
    name: "React Aria",
    url: "https://react-spectrum.adobe.com/react-aria",
    category: "底层原语",
    note: "Adobe 的无障碍交互原语，复杂组件参考。",
    ai: "用 React Aria 的 useFocusRing 处理这个自定义按钮的键盘焦点样式。",
  },

  // 图标库
  {
    name: "Lucide Icons",
    url: "https://lucide.dev",
    category: "图标库",
    note: "本站使用的开源图标库（lucide-react），线形风格统一简洁。",
    stack: true,
    ai: "用 lucide-react 在这个按钮里加一个设置图标。",
  },
  {
    name: "Phosphor Icons",
    url: "https://phosphoricons.com",
    category: "图标库",
    note: "六种粗细一脉相承（thin 到 fill），@phosphor-icons/react 开箱即用。",
    ai: "用 @phosphor-icons/react 替换项目里的图标，统一 thin 风格。",
  },
  {
    name: "HugeIcons",
    url: "https://hugeicons.com",
    category: "图标库",
    note: "四千余套描边图标，风格圆润，免费档即可覆盖常用品类。",
    ai: "从 HugeIcons 挑一组社交图标用在页脚。",
  },
  {
    name: "Iconify",
    url: "https://iconify.design",
    category: "图标库",
    note: "聚合 200+ 图标集的统一 API，中途换库不用改代码。",
    ai: "用 Iconify 在 Vue 项目里引入 logos 集合的 GitHub 图标。",
  },

  // 动画组件
  {
    name: "Framer Motion",
    url: "https://www.framer.com/motion/",
    category: "动画组件",
    note: "React 动画库，本站后续动效的基础设施。",
    ai: "用 Framer Motion 给这个卡片加入场动画：淡入并上移 12px。",
  },
  {
    name: "Magic UI",
    url: "https://magicui.design",
    category: "动画组件",
    note: "在 shadcn 基础上加入动效的组件集合。",
    ai: "用 Magic UI 的 Animated Grid Pattern 给页面背景加纹理。",
  },
  {
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    category: "动画组件",
    note: "特效向组件库，适合做有视觉冲击的区块。",
    ai: "用 Aceternity 的 Spotlight 组件做 Hero 区的聚光效果。",
  },

  // AI 工具
  {
    name: "Claude Code",
    url: "https://claude.com/product/claude-code",
    category: "AI 工具",
    note: "终端里的对话式写码智能体，配合 CLAUDE.md 约定工程规范。",
    ai: "（在 Claude Code 里）按 CLAUDE.md 的约定，为这个页面补上单元测试。",
  },
  {
    name: "Cursor",
    url: "https://cursor.com",
    category: "AI 工具",
    note: "AI 优先的代码编辑器，擅长按项目既有风格续写代码。",
    ai: "（在 Cursor 里）参照 components/ 目录的既有风格，新增同类的设置页。",
  },
  {
    name: "v0 by Vercel",
    url: "https://v0.dev",
    category: "AI 工具",
    note: "用自然语言生成 shadcn 组件与页面，适合快速出原型。",
    ai: "（在 v0 里）用 shadcn 生成一个带筛选和分页的用户表格页面。",
  },

  // 后端与服务
  {
    name: "Prisma",
    url: "https://www.prisma.io/docs",
    category: "后端与服务",
    note: "类型安全的 ORM，schema 即文档，迁移工作流成熟。",
    ai: "用 Prisma 定义 User 和 Post 模型（一对多），并生成迁移。",
  },
  {
    name: "Drizzle ORM",
    url: "https://orm.drizzle.team",
    category: "后端与服务",
    note: "轻量 SQL-like 的 ORM，写法贴近原生 SQL。",
    ai: "用 Drizzle 写 User/Post 一对多关系，并展示等价的原生 SQL。",
  },
  {
    name: "Auth.js",
    url: "https://authjs.dev",
    category: "后端与服务",
    note: "Next.js 生态的登录方案（原 NextAuth），多登录方式插件化。",
    ai: "用 Auth.js 给 Next.js 项目加 GitHub 第三方登录。",
  },
  {
    name: "Zod",
    url: "https://zod.dev",
    category: "后端与服务",
    note: "Schema 校验库，前后端共用同一份入参规则。",
    ai: "用 zod 定义这个注册表单的校验规则，前后端共用。",
  },
  {
    name: "Resend",
    url: "https://resend.com",
    category: "后端与服务",
    note: "开发者友好的邮件发送服务，支持 React 写邮件模板。",
    ai: "用 Resend 发一封注册欢迎邮件，模板用 React 组件写。",
  },
  {
    name: "Upstash Redis",
    url: "https://upstash.com",
    category: "后端与服务",
    note: "Serverless 友好的 Redis，按请求计费，适合缓存与限流。",
    ai: "用 Upstash Redis 给这个接口加 60 秒缓存。",
  },
  {
    name: "Vercel Blob",
    url: "https://vercel.com/docs/vercel-blob",
    category: "后端与服务",
    note: "Vercel 的对象存储，上传文件并返回公开访问链接。",
    ai: "用 Vercel Blob 实现图片上传并返回公开访问链接。",
  },

  // 学习资料
  {
    name: "Next.js 文档",
    url: "https://nextjs.org/docs",
    category: "学习资料",
    note: "本站框架的官方文档，App Router、渲染与部署讲得最透；配套 Learn 免费课程（nextjs.org/learn）。",
    stack: true,
    ai: "按 App Router 官方文档，把这个页面改成服务端数据获取。",
  },
  {
    name: "React 官方",
    url: "https://react.dev",
    category: "学习资料",
    note: "React 概念、Hooks 与最佳实践的权威来源。",
    ai: "按官方文档确认 useEffect 依赖数组的行为，再解释这段代码。",
  },
  {
    name: "shadcn/ui 文档",
    url: "https://ui.shadcn.com/docs",
    category: "学习资料",
    note: "组件用法、主题与安装说明的官方来源。",
    stack: true,
    ai: "按官方文档的 CLI 方式把 Tabs 组件装进项目。",
  },
  {
    name: "Tailwind 文档",
    url: "https://tailwindcss.com/docs",
    category: "学习资料",
    note: "原子类与配置的官方参考。",
    stack: true,
    ai: "查一下 Tailwind 自定义 boxShadow 的配置写法，给卡片加一层柔和投影。",
  },
  {
    name: "shadcn/ui Blocks",
    url: "https://ui.shadcn.com/blocks",
    category: "学习资料",
    note: "官方区块级布局，可直接拼装成完整页面。",
    stack: true,
    ai: "参考官方 Blocks 里的 dashboard 布局，改造成我的项目首页。",
  },

  // 社区
  {
    name: "shadcn-ui GitHub",
    url: "https://github.com/shadcn-ui/ui",
    category: "社区",
    note: "源码与社区讨论，遇到问题可查 issue。",
    stack: true,
    ai: "去 issue 区搜 Dialog 在 SSR 下的已知问题，总结 workaround。",
  },
  {
    name: "Figma Community",
    url: "https://www.figma.com/community",
    category: "社区",
    note: "Figma 官方社区，可找到 shadcn 设计套件，便于设计稿对齐。",
    ai: "按这份 Figma 设计稿还原页面，组件尽量用 shadcn。",
  },
];

// ===== 交叉引用：藏经阁 → 站内相关（集中维护；label 用「分区雅称·名」） =====
const resourceLinks: Record<string, { href: string; label: string }[]> = {
  "shadcn/ui": [
    { href: "/concepts#component", label: "筑基·组件" },
    { href: "/components", label: "法器·全部组件" },
  ],
  "Base UI": [{ href: "/concepts#component", label: "筑基·组件" }],
  "Tailwind CSS": [
    { href: "/concepts#html-css-js", label: "筑基·HTML/CSS/JS" },
    { href: "/concepts#responsive", label: "筑基·响应式" },
  ],
  "Radix UI": [{ href: "/concepts#component", label: "筑基·组件" }],
  "React Aria": [{ href: "/concepts#component", label: "筑基·组件" }],
  "Framer Motion": [
    { href: "/glossary#visual-transition", label: "玉简·过渡" },
    { href: "/glossary#ui-microinteraction", label: "玉简·微交互" },
  ],
  "Claude Code": [{ href: "/prompts", label: "真言·提示词指南" }],
  Cursor: [{ href: "/prompts", label: "真言·提示词指南" }],
  "v0 by Vercel": [{ href: "/components", label: "法器·前端组件" }],
  Prisma: [
    { href: "/concepts#database", label: "筑基·数据库" },
    { href: "/backend#database", label: "灵脉·仓廪数据库" },
  ],
  "Drizzle ORM": [{ href: "/concepts#database", label: "筑基·数据库" }],
  "Auth.js": [
    { href: "/glossary#auth-login", label: "玉简·登录" },
    { href: "/backend#auth", label: "灵脉·关防鉴权" },
  ],
  Zod: [
    { href: "/glossary#interaction-validation", label: "玉简·表单校验" },
    { href: "/backend#security", label: "灵脉·结界安全" },
  ],
  "Upstash Redis": [
    { href: "/glossary#ops-cache", label: "玉简·缓存" },
    { href: "/backend#cache", label: "灵脉·镜花缓存" },
  ],
  "Vercel Blob": [{ href: "/backend#storage", label: "灵脉·玉匣文件存储" }],
  "Next.js 文档": [
    { href: "/concepts#routing", label: "筑基·路由" },
    { href: "/concepts#deploy", label: "筑基·部署" },
  ],
  "React 官方": [{ href: "/concepts#component", label: "筑基·组件" }],
  "shadcn/ui 文档": [{ href: "/components", label: "法器·前端组件" }],
  "shadcn/ui Blocks": [{ href: "/examples", label: "图卷·页面画廊" }],
};
for (const r of resources) {
  const links = resourceLinks[r.name];
  if (links) r.related = links;
}
