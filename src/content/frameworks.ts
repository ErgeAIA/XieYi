// 框架：站点作为 Vibe Coding 指南，覆盖开发相关的前沿框架与后端栈。
// 分组：前端框架/元框架、后端语言与框架、全栈元框架；与「概念/组件/后端/资源」并列。
export type FrameworkGroup = "frontend" | "backend" | "fullstack";

export type FrameworkKind = "language" | "framework";

export interface FrameworkItem {
  id: string;
  name: string;
  nameEn?: string;
  group: FrameworkGroup;
  kind?: FrameworkKind; // 后端组内区分「语言 / 框架」
  tagline: string; // 一句话定位
  scenario: string; // 适用场景 / 选型
  withAI: { strategy: string; example: string }; // 与 AI 协作
  official: string; // 官方文档
  learn?: string; // 学习资源
  note?: string; // 备注（如「本站基于」）
}

export const frameworkGroups: FrameworkGroup[] = [
  "frontend",
  "backend",
  "fullstack",
];

export const frameworkGroupMeta: Record<FrameworkGroup, string> = {
  frontend: "前端框架 / 元框架",
  backend: "后端语言与框架",
  fullstack: "全栈元框架",
};

export const frameworks: FrameworkItem[] = [
  // ===== 前端框架 / 元框架 =====
  {
    id: "astro",
    name: "Astro",
    nameEn: "Astro",
    group: "frontend",
    tagline: "内容优先的静态站点框架，默认零 JS，按需用「岛屿」注水交互。",
    scenario: "文档站、博客、营销页、作品集等内容型站点；需要 SEO 与极速首屏时首选。",
    withAI: {
      strategy:
        "告诉 AI 你要「内容站 + 零 JS 优先 + 局部交互用岛屿」，并说明岛屿用哪个 UI 框架（React/Vue/Svelte）。",
      example:
        "用 Astro 搭一个技术博客：Markdown 写文章，首页列出文章卡片，文章页用 React 岛屿做一个「点赞数」交互组件。给出内容集合(content collection)配置和布局。",
    },
    official: "https://docs.astro.build",
    learn: "https://astro.build/learn",
  },
  {
    id: "nuxt",
    name: "Nuxt",
    nameEn: "Nuxt",
    group: "frontend",
    tagline: "基于 Vue 的全栈框架，约定式路由 + 服务端渲染(SSR)/静态生成(SSG)。",
    scenario: "Vue 生态的 SSR/SSG 应用；需要 SEO 又想用 Vue 写前后端。",
    withAI: {
      strategy:
        "说清你要 SSR 还是 SSG，让 AI 用 Nuxt 的 composables（useFetch/useState）做数据获取。",
      example:
        "用 Nuxt 3 做一个带服务端渲染的博客：动态路由 /blog/[slug]，用 useFetch 在服务端取文章，配 useAsyncData 做缓存。",
    },
    official: "https://nuxt.com/docs",
    learn: "https://nuxt.com/learn",
  },
  {
    id: "sveltekit",
    name: "SvelteKit",
    nameEn: "SvelteKit",
    group: "frontend",
    tagline: "Svelte 官方应用框架，编译期优化、体积小、内置路由与 SSR。",
    scenario: "偏好少样板、高性能的 Web 应用；想用 Svelte 语法写全栈。",
    withAI: {
      strategy:
        "告诉 AI 用 SvelteKit 的 load 函数做数据加载，路由用文件系统约定。",
      example:
        "用 SvelteKit 做一个待办应用：+page.svelte 列表，+page.server.js 用 load 从 API 取数据，表单用 form actions 提交。",
    },
    official: "https://kit.svelte.dev/docs",
    learn: "https://learn.svelte.dev",
  },
  {
    id: "qwik",
    name: "Qwik",
    nameEn: "Qwik",
    group: "frontend",
    tagline: "可恢复式(resumable)框架，零水合、极致首屏与交互延迟。",
    scenario: "对首屏性能与 TTI 极度敏感的场景（电商、落地页）。",
    withAI: {
      strategy:
        "强调你要「resumable 而非 hydrate」，让 AI 用 Qwik 的延迟加载与 $ 边界组织代码。",
      example:
        "用 Qwik 做一个产品落地页：首屏不执行任何 JS，按钮点击时才按需下载对应 handler。给出 component$ 与 useSignal 用法。",
    },
    official: "https://qwik.dev/docs",
  },
  {
    id: "remix",
    name: "Remix",
    nameEn: "Remix",
    group: "frontend",
    tagline: "以 Web 标准与渐进增强为核心的 React 全栈框架，嵌套路由 + 错误边界。",
    scenario: "重视可访问性、渐进增强与真实网络语义（form/loader/action）的 React 应用。",
    withAI: {
      strategy:
        "让 AI 用 loader/action 处理数据与服务端写操作，用 <Form> 做渐进增强提交。",
      example:
        "用 Remix 做一个带登录的面板：loader 取当前用户，action 处理登录表单，未登录用 redirect；用嵌套路由做侧栏布局。",
    },
    official: "https://remix.run/docs",
  },

  // ===== 后端语言与框架 =====
  {
    id: "rust",
    name: "Rust",
    kind: "language",
    group: "backend",
    tagline: "系统级语言，内存安全零成本抽象，无 GC 的高性能。",
    scenario: "高性能服务、CLI、WASM、嵌入式；需要安全且快的后端/系统组件。",
    withAI: {
      strategy:
        "让 AI 用所有权/借用模型组织代码，遇到编译错误把报错原文贴给它。",
      example:
        "用 Rust 写一个 HTTP 服务：用 Actix 暴露 GET /health 与 POST /echo，返回 JSON，并说明如何处理 ownership 与 error。",
    },
    official: "https://www.rust-lang.org/learn",
    learn: "https://doc.rust-lang.org/book",
  },
  {
    id: "python",
    name: "Python",
    kind: "language",
    group: "backend",
    tagline: "通用语言，生态极广，AI/数据/脚本/Web 通吃。",
    scenario: "AI/ML、数据分析、自动化脚本、快速搭建 Web（FastAPI/Django）。",
    withAI: {
      strategy:
        "说清版本(3.11+)与要用的库；让 AI 用类型注解和 pydantic 提升可靠性。",
      example:
        "用 Python + FastAPI 写一个笔记 API：Pydantic 模型定义 Note，POST /notes 与 GET /notes，带简单内存存储。",
    },
    official: "https://docs.python.org/3/",
    learn: "https://docs.python.org/3/tutorial/",
  },
  {
    id: "go",
    name: "Go",
    kind: "language",
    group: "backend",
    tagline: "并发友好、编译为单一二进制、部署极简的静态语言。",
    scenario: "高并发微服务、CLI 工具、云原生后端；重视简单与可部署性。",
    withAI: {
      strategy:
        "让 AI 用 goroutine/channel 做并发，标准库优先，少引入第三方。",
      example:
        "用 Go 写一个并发爬虫：用 goroutine 抓多个 URL，channel 汇总结果，控制并发数并加超时。",
    },
    official: "https://go.dev/doc/",
    learn: "https://go.dev/tour/",
  },
  {
    id: "nodejs",
    name: "Node.js",
    kind: "language",
    group: "backend",
    tagline: "JS 运行时，前后端同语言，npm 生态庞大。",
    scenario: "前后端统一 JS/TS、API 服务、BFF、实时应用(WebSocket)。",
    withAI: {
      strategy:
        "说明运行时版本与 ESM/CJS、是否用 TS；让 AI 用 async/await 处理异步。",
      example:
        "用 Node.js(Express) 写一个小 API：GET /todos 与 POST /todos，用内存数组存储，给出路由与错误处理。",
    },
    official: "https://nodejs.org/docs/latest/api/",
    learn: "https://nodejs.org/en/learn",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    kind: "framework",
    group: "backend",
    tagline: "Python 异步 Web 框架，类型驱动、自动文档、性能高。",
    scenario: "Python 后端 API、ML 服务暴露、需要 OpenAPI 文档的接口。",
    withAI: {
      strategy:
        "用 Pydantic 模型定义请求/响应，让 AI 用类型注解自动生成校验与文档。",
      example:
        "用 FastAPI 写用户 API：Pydantic 模型 User，POST /users 校验邮箱，GET /users/{id} 返回，自动生成 Swagger。",
    },
    official: "https://fastapi.tiangolo.com",
    learn: "https://fastapi.tiangolo.com/tutorial/",
  },
  {
    id: "django",
    name: "Django",
    kind: "framework",
    group: "backend",
    tagline: "Python 全功能 Web 框架，自带 ORM/Admin/Auth，batteries-included。",
    scenario: "传统 CRUD 后台、CMS、需要开箱即用的管理界面与权限。",
    withAI: {
      strategy:
        "让 AI 用 Django ORM 建模型、迁移，用 Class-Based Views 或 DRF 写 API。",
      example:
        "用 Django + DRF 写一个博客 API：Model 定义 Post/Comment，序列化器与 ViewSet，配置路由与分页。",
    },
    official: "https://docs.djangoproject.com",
    learn: "https://docs.djangoproject.com/en/stable/intro/tutorial01/",
  },
  {
    id: "actix",
    name: "Actix Web",
    kind: "framework",
    group: "backend",
    tagline: "Rust 高性能 Web 框架，基于 actor 模型，吞吐极高。",
    scenario: "Rust 后端服务、对吞吐/延迟敏感的高性能 API。",
    withAI: {
      strategy:
        "让 AI 用 Handler/Extractor 组织路由，用 serde 做 JSON 序列化。",
      example:
        "用 Actix Web 写 REST API：定义路由 handler，用 web::Json 收参，连接 PostgreSQL 做 CRUD。",
    },
    official: "https://actix.rs",
    learn: "https://actix.rs/docs/",
  },
  {
    id: "rocket",
    name: "Rocket",
    kind: "framework",
    group: "backend",
    tagline: "Rust 易用 Web 框架，宏驱动的路由与请求守卫，开发体验好。",
    scenario: "希望用 Rust 但想要更简洁 API 的后端服务。",
    withAI: {
      strategy:
        "让 AI 用 #[get]/#[post] 宏定义路由，用 FromForm/FromJson 解析请求。",
      example:
        "用 Rocket 写一个待办 API：#[post(\"/todo\")] 接收 JSON，用托管状态(Managed State)存内存列表。",
    },
    official: "https://rocket.rs",
  },
  {
    id: "flask",
    name: "Flask",
    kind: "framework",
    group: "backend",
    tagline: "Python 轻量 Web 框架，极简核心、按需扩展。",
    scenario: "小型服务、原型、教学、把脚本包成 HTTP 接口。",
    withAI: {
      strategy:
        "让 AI 用蓝图(Blueprint)组织路由，用工厂函数创建 app。",
      example:
        "用 Flask 写一个短链服务：/<short> 重定向，POST /api/shorten 接收长链返回短码，内存字典存储。",
    },
    official: "https://flask.palletsprojects.com",
    learn: "https://flask.palletsprojects.com/en/stable/quickstart/",
  },

  // ===== 全栈元框架 =====
  {
    id: "nextjs",
    name: "Next.js",
    nameEn: "Next.js",
    group: "fullstack",
    tagline: "React 全栈框架，文件系统路由、SSR/SSG/ISR、Server Components。",
    scenario:
      "需要 SEO 的 React 应用、全栈一体化（前后端同仓库）；本站即基于此构建。",
    withAI: {
      strategy:
        "说清用 App Router 还是 Pages Router；让 AI 用 Server Components 取数、Route Handlers 写接口。",
      example:
        "用 Next.js App Router 做一个博客：app/blog/[slug]/page.tsx 用 async 组件取数，app/api/ 下用 Route Handler 写接口。",
    },
    official: "https://nextjs.org/docs",
    learn: "https://nextjs.org/learn",
    note: "本站基于 App Router 构建",
  },
];
