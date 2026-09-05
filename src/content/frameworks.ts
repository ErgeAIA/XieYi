// 框架：站点作为 Vibe Coding 指南，覆盖开发相关的前沿框架与后端栈。
// 分组（按主要形态，而非「前端/全栈」这种易混淆的切分）：
//   前端库与元框架 / 全栈应用框架 / 后端语言与框架 / 边缘与运行时 / AI 应用框架
// 与「概念/组件/后端/资源」并列。
export type FrameworkGroup =
  | "frontend"
  | "fullstack"
  | "backend"
  | "edge"
  | "ai";

export type FrameworkKind =
  | "language"
  | "library"
  | "framework"
  | "meta-framework"
  | "runtime";

export interface FrameworkItem {
  id: string;
  name: string;
  nameEn?: string;
  group: FrameworkGroup;
  kind?: FrameworkKind; // 语言 / 库 / 框架 / 元框架 / 运行时
  tagline: string; // 一句话定位
  scenario: string; // 适用场景 / 选型
  withAI: { strategy: string; example: string }; // 与 AI 协作
  aiFriendly?: "high" | "medium" | "low"; // AI 代码生成友好度
  pitfall?: string[]; // 常见坑：每条「具体坑（典型报错/场景）+ 让 AI 怎么避开」
  official: string; // 官方文档
  learn?: string; // 学习资源
  note?: string; // 备注（如「本站基于」）
}

export const frameworkGroups: FrameworkGroup[] = [
  "frontend",
  "fullstack",
  "backend",
  "edge",
  "ai",
];

export const frameworkGroupMeta: Record<FrameworkGroup, string> = {
  frontend: "前端库与元框架",
  fullstack: "全栈应用框架",
  backend: "后端语言与框架",
  edge: "边缘与运行时",
  ai: "AI 应用框架",
};

export const frameworkGroupMetaEn: Record<FrameworkGroup, string> = {
  frontend: "Frontend Libraries & Meta-Frameworks",
  fullstack: "Fullstack App Frameworks",
  backend: "Backend Languages & Frameworks",
  edge: "Edge & Runtimes",
  ai: "AI App Frameworks",
};

export const frameworkGroupDesc: Record<FrameworkGroup, string> = {
  frontend: "在浏览器里跑、负责页面和交互的那一层。React、Vue 及其上层框架都在这，做用户界面首选。",
  fullstack: "一个人从前到后甚至包含后端与部署都能搞定的框架。想快速做出能上线的产品，优先看这里。",
  backend: "跑在服务器上、管数据和业务逻辑的那一层。需要数据库、接口、登录时，从这里挑语言和框架。",
  edge: "更靠近用户、低延迟运行代码的环境（CDN 边缘、Serverless）。做全球化、高性能或轻量接口时关注。",
  ai: "专门用来搭智能体、接大模型、做检索增强的框架。想让应用真正「会思考」，从这里起步。",
};

// 二级分组国风雅称（仅展示层；原始名 frameworkGroupMeta / 英文 frameworkGroupMetaEn 不变）
export const frameworkGroupAlias: Record<FrameworkGroup, string> = {
  frontend: "笔锋",
  fullstack: "周流",
  backend: "地枢",
  edge: "疾影",
  ai: "法相",
};

export const frameworks: FrameworkItem[] = [
  // ===== 前端库与元框架 =====
  {
    id: "react",
    name: "React",
    nameEn: "React",
    group: "frontend",
    kind: "library",
    tagline: "声明式组件库，前端生态最大、AI 训练语料最充足的基础。",
    scenario: "绝大多数 Web 应用与组件库的基础；需要最大生态与最少踩坑时首选。",
    withAI: {
      strategy:
        "让 AI 用函数组件 + Hooks 写，避免类组件；用 TypeScript 给 props/state 加类型。",
      example:
        "用 React + TS 做待办列表：useState 管理数组，组件拆成 Input/TodoItem/List，props 带类型。",
    },
    aiFriendly: "high",
    pitfall: [
      "陈旧闭包：在 setTimeout / 事件监听 / useEffect 里引用 state，拿到的是创建那一刻的旧值，表现为『点了没更新』。让 AI 用函数式更新 setCount(c => c + 1)、把依赖写入依赖数组，或用 ref 读最新值。",
      "依赖数组缺失或错填：useEffect/useMemo/useCallback 漏写依赖会拿到过期数据或陷入死循环。让 AI 显式列出全部依赖（用 eslint-plugin-react-hooks 自动补全），不要图省事写 [] 或注释禁用规则。",
      "列表漏写 key：用数组索引当 key，在增删/排序时状态错位、输入框串值。让 AI 用数据稳定 id 作 key，并解释索引 key 的隐患。",
      "setState 后立刻读旧值：同一函数里 setX(v) 之后读 x 仍是旧值。让 AI 理解 React 批处理与异步特性，需要新值就基于回调或拆到 effect 里。",
    ],
    official: "https://react.dev",
    learn: "https://react.dev/learn",
  },
  {
    id: "vue",
    name: "Vue",
    nameEn: "Vue",
    group: "frontend",
    kind: "library",
    tagline: "渐进式前端框架，模板语法友好、上手平缓。",
    scenario: "偏好模板化与平缓学习曲线的中后台与业务应用。",
    withAI: {
      strategy:
        "说明用 <script setup> + Composition API；让 AI 用 ref/reactive 管理状态。",
      example:
        "用 Vue 3 <script setup> 做购物车：reactive 状态 + computed 总价 + v-for 渲染列表。",
    },
    aiFriendly: "high",
    pitfall: [
      "reactive 解构丢失响应式：const { a } = reactive(obj) 后 a 不再响应式，改了不触发更新。让 AI 用 toRefs()/storeToRefs()，并保持 ref() 在 script 里访问要 .value。",
      "watch 监听不到深层变化：默认浅层，对象/数组内部属性变了不触发。让 AI 对对象用 { deep: true } 或监听具体 getter，需要旧值用 (old, new) 回调。",
      "ref 与 reactive 混用、.value 遗漏：script 里漏写 .value 会拿到 Ref 对象而非值。让 AI 统一约定（基本类型用 ref、对象用 reactive），并在 script 中显式 .value。",
      "混用 Options API 与 Composition API：AI 可能写出 data() 与 setup 混搭的过时写法。明确要求统一用 <script setup> + Composition API。",
    ],
    official: "https://vuejs.org",
    learn: "https://vuejs.org/guide/introduction.html",
  },
  {
    id: "svelte",
    name: "Svelte",
    nameEn: "Svelte",
    group: "frontend",
    kind: "library",
    tagline: "编译期框架，无虚拟 DOM，代码量少、运行时极小。",
    scenario: "追求少样板、小体积、高性能的 Web 应用与组件。",
    withAI: {
      strategy:
        "让 AI 用 .svelte 单文件 + 响应式声明与 store；说明无虚拟 DOM、编译期绑定。",
      example:
        "用 Svelte 做计数器与待办：响应式声明 + 事件绑定 + 列表渲染，给出 store 用法。",
    },
    aiFriendly: "high",
    pitfall: [
      "runes 版本混淆：Svelte 5 用 $state/$derived/$effect，旧项目用 let + 赋值，AI 混写会导致不响应。明确告诉 AI 目标大版本，Svelte 5 用 runes 而非魔法赋值。",
      "响应式不触发：Svelte 4 的 $: 依赖要出现在赋值右侧才会追踪，直接改数组/对象属性有时不更新。让 AI 用整体替换（列表用 map 返回新数组）或 Svelte 5 的 $state 深层响应式。",
      "store 订阅漏 $：自定义 store 在模板里要加 $ 前缀，script 里要 .subscribe 或用 $store 语法。让 AI 说明 writable/readable 的 $ 用法，避免拿到 store 对象本身。",
    ],
    official: "https://svelte.dev",
    learn: "https://svelte.dev/docs",
  },
  {
    id: "angular",
    name: "Angular",
    nameEn: "Angular",
    group: "frontend",
    kind: "framework",
    tagline: "Google 出品的全功能前端框架，强类型、强约定、企业级。",
    scenario: "大型企业应用、需要严格结构与强类型的团队项目。",
    withAI: {
      strategy:
        "用 standalone components + signals；让 AI 用 Angular CLI 命令生成结构。",
      example:
        "用 Angular standalone 组件做用户管理：service 用 HttpClient 取数，组件用 signals 管理状态。",
    },
    aiFriendly: "medium",
    pitfall: [
      "写出过时 NgModule 写法：AI 训练语料多是旧版，易生成 @NgModule + declarations。要求用 standalone: true 组件、直接在 imports 引模块，并用 signals（signal()/computed()）替代 BehaviorSubject。",
      "Zone.js 变更检测与 signals 冲突：手动调 ChangeDetectorRef 或混用老 RxJS 流，易出『数据变了视图不刷新』。让 AI 优先用 signal 驱动模板、用 effect() 替代手动订阅。",
      "依赖注入作用域错：服务提供给错误层级，导致拿到多个实例或注入失败。让 AI 明确 providedIn: 'root' 还是组件级 providers，并解释 Angular DI 树。",
    ],
    official: "https://angular.dev",
    learn: "https://angular.dev/guide",
  },
  {
    id: "solid",
    name: "SolidJS",
    nameEn: "Solid",
    group: "frontend",
    kind: "library",
    tagline: "细粒度响应式、无虚拟 DOM，性能接近原生。",
    scenario: "对运行时性能敏感的复杂交互界面。",
    withAI: {
      strategy:
        "让 AI 用 createSignal/createStore + JSX，强调细粒度响应式(非 React 式重渲染)。",
      example:
        "用 Solid 做实时仪表盘：createSignal 管理指标，createEffect 更新视图，给出 store 用法。",
    },
    aiFriendly: "medium",
    pitfall: [
      "套用 React 的 state 思维：Solid 不重渲染组件、靠细粒度 signal 更新 DOM，AI 常写出 setCount(count + 1) 在闭包里取旧值、或把 signal 当普通变量。让 AI 始终 signal() 读、setX() 写，且不在 JSX 外裸用值。",
      "createStore 直接改嵌套属性不触发：state.user.name = 'x' 在 Solid 5 之前不响应（需 produce/setStore）。让 AI 用 setStore 的路径式更新或 produce 批量改。",
      "createEffect 依赖追踪失效：effect 依赖需在执行中同步读取才会追踪。让 AI 用 on(() => dep, fn) 显式声明依赖，避免拿不到更新。",
    ],
    official: "https://www.solidjs.com",
    learn: "https://www.solidjs.com/tutorial/introduction",
  },
  {
    id: "astro",
    name: "Astro",
    nameEn: "Astro",
    group: "frontend",
    kind: "meta-framework",
    tagline: "内容优先的静态站点框架，默认零 JS，按需用「岛屿」注水交互。",
    scenario: "文档站、博客、营销页、作品集等内容型站点；需要 SEO 与极速首屏时首选。",
    withAI: {
      strategy:
        "告诉 AI 你要「内容站 + 零 JS 优先 + 局部交互用岛屿」，并说明岛屿用哪个 UI 框架(React/Vue/Svelte)。",
      example:
        "用 Astro 搭技术博客：Markdown 写文章，首页列出文章卡片，文章页用 React 岛屿做点赞交互组件。给出 content collection 配置和布局。",
    },
    aiFriendly: "high",
    pitfall: [
      "把整页当 SPA 写：在 .astro 里塞满交互、忽略岛屿，失去零 JS 优势且首屏变慢。让 AI 默认服务端渲染静态内容，只在需要交互的组件上加 client:* 指令。",
      "岛屿 client 指令选错：用 client:load 注水所有组件拖慢首屏，或忘记加指令导致交互组件不渲染。让 AI 按『首屏关键交互用 client:load、视口内才用 client:visible、纯客户端库用 client:only』选择。",
      "框架组件未显式导入/混用多框架：岛屿必须是直接 import 的 UI 框架组件，且一个项目里客户端指令的框架要一致。让 AI 在 frontmatter 里 import 目标组件并标注正确 client 指令。",
    ],
    official: "https://docs.astro.build",
    learn: "https://astro.build/learn",
  },
  {
    id: "qwik",
    name: "Qwik",
    nameEn: "Qwik",
    group: "frontend",
    kind: "meta-framework",
    tagline: "可恢复式(resumable)框架，零水合、极致首屏与交互延迟。",
    scenario: "对首屏性能与 TTI 极度敏感的场景(电商、落地页)。",
    withAI: {
      strategy:
        "强调你要「resumable 而非 hydrate」，让 AI 用 Qwik 的延迟加载与 $ 边界组织代码。",
      example:
        "用 Qwik 做产品落地页：首屏不执行任何 JS，按钮点击时才按需下载对应 handler。给出 component$ 与 useSignal 用法。",
    },
    aiFriendly: "medium",
    pitfall: [
      "漏写 $ 导致恢复/水合失败：component$、onClick$、useSignal$ 等必须在可恢复边界加 $，AI 漏写会运行时报错或事件不绑定。让 AI 解释 $ 表示『可延迟序列化』，凡事件/组件/函数需恢复处都加 $。",
      "用 React 式思维做状态：Qwik 是 resumable 而非 hydrate，AI 可能在组件顶层做重计算阻塞恢复。让 AI 把副作用放进 useVisibleTask$/useTask$，并避免在 render 外闭包捕获大对象。",
      "全局状态/store 误用：useStore 与 React useState 不同，嵌套对象需留意引用。让 AI 用 createContextId 共享状态，并说明 Qwik 的惰性加载模型。",
    ],
    official: "https://qwik.dev/docs",
  },

  // ===== 全栈应用框架 =====
  {
    id: "nextjs",
    name: "Next.js",
    nameEn: "Next.js",
    group: "fullstack",
    kind: "meta-framework",
    tagline: "React 全栈框架，文件系统路由、SSR/SSG/ISR、Server Components。",
    scenario: "需要 SEO 的 React 应用、全栈一体化(前后端同仓库)；本站即基于此构建。",
    withAI: {
      strategy:
        "说清用 App Router 还是 Pages Router；让 AI 用 Server Components 取数、Route Handlers 写接口。",
      example:
        "用 Next.js App Router 做博客：app/blog/[slug]/page.tsx 用 async 组件取数，app/api/ 下用 Route Handler 写接口。",
    },
    aiFriendly: "high",
    pitfall: [
      "Server/Client 组件边界混淆（头号坑）：在 Server Component 里用了 useState/useEffect/浏览器 API 直接报错；AI 常把整页标 'use client'。让 AI 只在必要的叶子组件加 'use client'，Server 端用 async/await 直接取数，并把交互组件下沉。",
      "Hydration mismatch：服务端渲染的 HTML 与客户端首屏不一致（日期、随机数、未设宽高的图片、条件渲染差异），控制台报 hydration failed。让 AI 真因是两端产出一致，动态内容用 mounted 守卫，suppressHydrationWarning 仅作兜底。",
      "在 Server Component 直接读客户端存储：服务端拿不到浏览器 cookie/localStorage。让 AI 用 next/headers 的 cookies()/headers() 在服务端读，客户端数据走 Route Handler 或 useEffect。",
      "Router 混用：App Router 与 Pages Router 的取数 API 不同，AI 可能混写 getServerSideProps 与 async Server Component。明确本项目用 App Router，统一 async 组件 + Route Handlers。",
    ],
    official: "https://nextjs.org/docs",
    learn: "https://nextjs.org/learn",
    note: "本站基于 App Router 构建",
  },
  {
    id: "nuxt",
    name: "Nuxt",
    nameEn: "Nuxt",
    group: "fullstack",
    kind: "meta-framework",
    tagline: "基于 Vue 的全栈框架，约定式路由 + 服务端渲染(SSR)/静态生成(SSG)。",
    scenario: "Vue 生态的 SSR/SSG 应用；需要 SEO 又想用 Vue 写前后端。",
    withAI: {
      strategy:
        "说清你要 SSR 还是 SSG，让 AI 用 Nuxt 的 composables(useFetch/useState)做数据获取。",
      example:
        "用 Nuxt 3 做带 SSR 的博客：动态路由 /blog/[slug]，用 useFetch 在服务端取文章，配 useAsyncData 缓存。",
    },
    aiFriendly: "high",
    pitfall: [
      "Hydration mismatch：首屏用纯客户端 ref/随机值导致服务端与客户端 DOM 不一致。让 AI 用 useAsyncData/useFetch 在服务端取数，并用 <ClientOnly> 包裹纯浏览器逻辑。",
      "useFetch/$fetch 取数位置错：在 setup 顶层用 $fetch 会重复请求且破坏 SSR 缓存。让 AI 用 useAsyncData 包裹并指定 key，或用 useFetch 自动同构。",
      "useAsyncData key 缺失导致缓存错乱：同名请求被复用/覆盖。让 AI 显式传唯一 key，并说明 Nuxt 的 payload 缓存机制。",
    ],
    official: "https://nuxt.com/docs",
    learn: "https://nuxt.com/learn",
  },
  {
    id: "sveltekit",
    name: "SvelteKit",
    nameEn: "SvelteKit",
    group: "fullstack",
    kind: "meta-framework",
    tagline: "Svelte 官方应用框架，编译期优化、内置路由与 SSR。",
    scenario: "偏好少样板、高性能的 Web 应用；想用 Svelte 语法写全栈。",
    withAI: {
      strategy:
        "告诉 AI 用 SvelteKit 的 load 函数做数据加载，路由用文件系统约定。",
      example:
        "用 SvelteKit 做待办应用：+page.svelte 列表，+page.server.js 用 load 从 API 取数据，表单用 form actions 提交。",
    },
    aiFriendly: "high",
    pitfall: [
      "load 位置选错：+page.js 会同时在服务端和客户端跑，+page.server.js 只在服务端；AI 若在 +page.js 里引 node-only 模块会客户端报错。让 AI 把依赖 DB/秘钥的逻辑放 +page.server.js，通用逻辑放 +page.js。",
      "表单提交回到 useEffect/fetch：丢失渐进增强且刷新才生效。让 AI 用 form actions（+page.server.js 的 actions + <form method=\"POST\">），或用 enhance 增强。",
      "数据流向不清：页面拿到的 data 与 load 返回值要对应，AI 易在组件里再发一次重复请求。让 AI 直接在 +page.svelte 用 export let data 消费 load 结果，避免二次取数。",
    ],
    official: "https://kit.svelte.dev/docs",
    learn: "https://learn.svelte.dev",
  },
  {
    id: "remix",
    name: "Remix",
    nameEn: "Remix",
    group: "fullstack",
    kind: "meta-framework",
    tagline: "以 Web 标准与渐进增强为核心的 React 全栈框架，嵌套路由 + 错误边界。",
    scenario: "重视可访问性、渐进增强与真实网络语义(form/loader/action)的 React 应用。",
    withAI: {
      strategy:
        "让 AI 用 loader/action 处理数据与服务端写操作，用 <Form> 做渐进增强提交。",
      example:
        "用 Remix 做带登录的面板：loader 取当前用户，action 处理登录表单，未登录用 redirect；用嵌套路由做侧栏布局。",
    },
    aiFriendly: "high",
    pitfall: [
      "用 useEffect + fetch 取数：丢失 Remix 的渐进增强与并行加载优势，且 SEO/首屏变差。让 AI 用 loader 在服务端取数、用 useLoaderData 消费，mutation 用 action + <Form>。",
      "忘记 <Form> 用原生 fetch 提交：自定义提交丢失了 Remix 的乐观 UI 与错误处理。让 AI 默认用 Remix <Form>，需要自定义交互时加 useSubmit/useFetcher 而非手写 fetch。",
      "loader/action 缺少错误处理与 redirect：未登录/异常直接抛错白屏。让 AI 在 loader 里用 redirect() 做鉴权跳转、用 throw new Response 做错误边界，并配 errorElement。",
    ],
    official: "https://remix.run/docs",
  },
  {
    id: "redwood",
    name: "RedwoodJS",
    nameEn: "Redwood",
    group: "fullstack",
    kind: "meta-framework",
    tagline: "全栈 React 框架，GraphQL + Prisma + 约定式全栈一体化。",
    scenario: "想要「前端+GraphQL+数据库」开箱即用的全栈创业项目。",
    withAI: {
      strategy:
        "让 AI 用 Redwood 的 cells(数据获取)、services(Resolver)与 Prisma schema 组织全栈。",
      example:
        "用 Redwood 做博客：Prisma 定义 Post，SDL 写 schema，service 实现 resolver，组件用 Cell 取数。",
    },
    aiFriendly: "medium",
    pitfall: [
      "目录结构写错：Redwood 强约定 api/ 与 web/ 分层，AI 把组件放错目录或自建路由导致生成器失效。让 AI 严格按 api/src + web/src 结构，页面放 web/src/pages、服务放 api/src/services。",
      "Cell 用法错：Cell 要求导出 Loading/Empty/Failure/Success 等具名组件，AI 可能只写 Success 导致空/错状态白屏。让 AI 补全各状态组件，并用 prisma 兜底空数据。",
      "Prisma schema 与 service 不同步：改了 model 没迁移、resolver 字段对不上。让 AI 改 model 后跑 prisma migrate，并保证 service 的 resolver 字段与 SDL 一致。",
    ],
    official: "https://redwoodjs.com/docs",
    learn: "https://learn.redwoodjs.com",
  },
  {
    id: "wasp",
    name: "Wasp",
    nameEn: "Wasp",
    group: "fullstack",
    kind: "meta-framework",
    tagline: "用单一 .wasp 配置声明全栈(路由/鉴权/DB)的 React 全栈框架。",
    scenario: "想用「声明式配置」少写样板、快速出全栈原型的 React 项目。",
    withAI: {
      strategy:
        "让 AI 用 .wasp 文件声明 entity/route/auth，业务用 React + Node(Express) 写。",
      example:
        "用 Wasp 做带登录的任务应用：.wasp 声明 User/Task 与 auth，页面用 React 调生成的 API。",
    },
    aiFriendly: "medium",
    pitfall: [
      "改了不该改的生成代码：Wasp 会生成并管理部分文件，AI 手改生成目录会被覆盖。让 AI 只改 .wasp 声明与 src 下的业务代码，生成物通过 wasp 命令重新生成。",
      "DSL 语法错：.wasp 是自定义语言，AI 可能用 TS/JS 语法写声明导致编译失败。让 AI 严格遵守 Wasp DSL 语法（entity/route/page/auth 声明块），不在 .wasp 里写逻辑。",
      "Auth/路由声明不全：漏写 auth 或 page 与 route 的绑定，运行时报路由未注册。让 AI 在 .wasp 里完整声明 entity、page、route、auth 的依赖关系。",
    ],
    official: "https://wasp.dev/docs",
    learn: "https://wasp.dev/docs/quick-start",
  },
  {
    id: "remult",
    name: "Remult",
    nameEn: "Remult",
    group: "fullstack",
    kind: "framework",
    tagline: "以 Type 类为单一数据源的后端框架，前端直接类型安全访问。",
    scenario: "想用一份 Entity 类同时驱动 API、校验与前端的 TypeScript 类型。",
    withAI: {
      strategy:
        "让 AI 用一个 Entity 类 + 装饰器定义模型，前端直接 import 调用，无需手写后端路由。",
      example:
        "用 Remult 做任务 API：定义 Task 实体，前端用 remult 直接 taskRepo.find()，无需手写后端路由。",
    },
    aiFriendly: "medium",
    pitfall: [
      "当普通 ORM 用：Remult 的实体类前后端通用、前端能直接 taskRepo.find()，AI 若手写一堆后端路由就浪费了它的价值。让 AI 用 @Entity + @Fields 定义一个类，前端直接 import 调 repo，不写 CRUD 路由。",
      "校验/权限只放前端：@Fields 的 validate 与实体级 allowApiCrud 要在实体定义里统一，AI 易漏 allowApiCrud 导致接口 403。让 AI 在 @Entity 里配置 allowApiCrud/后端校验，作为单一事实源。",
      "关系与类型不一致：前后端共用同一实体类，AI 改了一处类型前后对不上。让 AI 以实体类为 SSOT，前端类型直接来自 import，不另写接口类型。",
    ],
    official: "https://remult.dev/docs",
  },
  {
    id: "t3",
    name: "T3 Stack",
    nameEn: "T3 Stack",
    group: "fullstack",
    kind: "meta-framework",
    tagline: "以 TypeScript 为先的全栈组合(Next.js + tRPC + Prisma + Tailwind)。",
    scenario: "偏好端到端类型安全、可组合技术栈的 TypeScript 全栈项目。",
    withAI: {
      strategy:
        "让 AI 用 create-t3-app 脚手架，tRPC 写类型安全接口，Prisma 管数据。",
      example:
        "用 T3 做带类型安全 API 的待办：tRPC router 定义 mutations，前端用 useQuery/useMutation 调用。",
    },
    aiFriendly: "high",
    pitfall: [
      "zod schema 与 router 输入输出不一致：input 校验和 procedure 返回类型对不上，端到端类型断链。让 AI 用 z.object 定义 input、router 内返回类型由函数推断，改 schema 同步改调用处。",
      "Prisma client 多实例/连接耗尽：热重载下 new PrismaClient() 多次导致连接耗尽。让 AI 用全局单例（globalThis.prisma ??= new PrismaClient()）并通过 db 导入。",
      "把客户端直接调 DB：T3 里数据库访问只在 server（trpc procedure 的 ctx.db），AI 若在客户端组件引 Prisma 会打包失败。让 AI 所有数据访问走 tRPC procedure，前端用 trpc.useQuery/useMutation。",
    ],
    official: "https://create.t3.gg",
    learn: "https://create.t3.gg/en/intro",
  },

  // ===== 后端语言与框架 =====
  {
    id: "rust",
    name: "Rust",
    nameEn: "Rust",
    group: "backend",
    kind: "language",
    tagline: "系统级语言，内存安全零成本抽象，无 GC 的高性能。",
    scenario: "高性能服务、CLI、WASM、嵌入式；需要安全且快的后端/系统组件。",
    withAI: {
      strategy:
        "让 AI 用所有权/借用模型组织代码，遇到编译错误把报错原文贴给它。",
      example:
        "用 Rust 写 HTTP 服务：用 Actix 暴露 GET /health 与 POST /echo，返回 JSON，并说明如何处理 ownership 与 error。",
    },
    aiFriendly: "medium",
    pitfall: [
      "借用检查器报错新手难读：AI 生成的代码常因所有权/生命周期不满足而编译失败，报错一长串看不懂。让 AI 把完整报错原文贴回去，并优先用引用/Rc<RefCell>/Arc<Mutex> 等惯用方式解决，而不是到处加 unsafe 绕过。",
      "盲目加 unsafe 或 .clone() 绕过检查：AI 为让代码编译可能用 unsafe 或到处 clone，埋下内存/性能隐患。让 AI 先解释为何不满足借用规则再用惯用法；unsafe 必须注释安全不变式。",
      "错误被 unwrap()/expect() 吞掉：AI 用 unwrap 处理 Result/Option，生产环境一 panic 就崩。让 AI 用 ? 传播错误、返回 Result，并区分可恢复与不可恢复错误。",
    ],
    official: "https://www.rust-lang.org/learn",
    learn: "https://doc.rust-lang.org/book",
  },
  {
    id: "python",
    name: "Python",
    nameEn: "Python",
    group: "backend",
    kind: "language",
    tagline: "通用语言，生态极广，AI/数据/脚本/Web 通吃。",
    scenario: "AI/ML、数据分析、自动化脚本、快速搭建 Web(FastAPI/Django)。",
    withAI: {
      strategy:
        "说清版本(3.11+)与要用的库；让 AI 用类型注解和 pydantic 提升可靠性。",
      example:
        "用 Python + FastAPI 写笔记 API：Pydantic 模型定义 Note，POST /notes 与 GET /notes，带简单内存存储。",
    },
    aiFriendly: "high",
    pitfall: [
      "依赖与版本漂移：AI 生成的代码依赖版本不明确，换台机器就『在我机器能跑』。让 AI 用虚拟环境(uv/venv)并生成锁定依赖(pyproject.toml/requirements.txt 带版本)。",
      "可变默认参数陷阱：AI 写 def f(x=[])，默认列表在多次调用间共享、数据串味。让 AI 用 None 作默认、函数内再初始化，并解释该坑。",
      "async/await 误用：AI 在同步函数里调 await 或在 async 里用阻塞 IO，事件循环卡死。让 AI 明确哪些函数是 async、用 asyncio.run 入口、阻塞调用放 executor。",
      "SQL 拼接导致注入：AI 用 f-string 拼 SQL。让 AI 一律用参数化查询(ORM 或占位符)，并说明注入风险。",
    ],
    official: "https://docs.python.org/3/",
    learn: "https://docs.python.org/3/tutorial/",
  },
  {
    id: "go",
    name: "Go",
    nameEn: "Go",
    group: "backend",
    kind: "language",
    tagline: "并发友好、编译为单一二进制、部署极简的静态语言。",
    scenario: "高并发微服务、CLI 工具、云原生后端；重视简单与可部署性。",
    withAI: {
      strategy:
        "让 AI 用 goroutine/channel 做并发，标准库优先，少引入第三方。",
      example:
        "用 Go 写并发爬虫：用 goroutine 抓多个 URL，channel 汇总结果，控制并发数并加超时。",
    },
    aiFriendly: "high",
    pitfall: [
      "data race：AI 让多个 goroutine 共享变量写，运行时偶发错乱、难复现。让 AI 用 channel 传递数据或 sync.Mutex/atomic，并开启 -race 检测。",
      "goroutine 泄漏：AI 起 goroutine 等一个永不关闭的 channel 或没超时的 context，协程堆积拖垮服务。让 AI 给每个 goroutine 配 context.WithTimeout/cancel，并说明退出条件。",
      "for range 循环变量捕获(旧版本)：Go 1.22 前循环变量在每次迭代复用，goroutine 里拿到的是最后一个值。让 AI 在循环内把迭代变量赋给局部变量，或明确用 Go 1.22+。",
      "error 被忽略：AI 写 err != nil 后不处理或直接 _。让 AI 每个可能出错处检查并返回 error，不要吞掉。",
    ],
    official: "https://go.dev/doc/",
    learn: "https://go.dev/tour/",
  },
  {
    id: "nodejs",
    name: "Node.js",
    nameEn: "Node.js",
    group: "backend",
    kind: "language",
    tagline: "JS 运行时，前后端同语言，npm 生态庞大。",
    scenario: "前后端统一 JS/TS、API 服务、BFF、实时应用(WebSocket)。",
    withAI: {
      strategy:
        "说明运行时版本与 ESM/CJS、是否用 TS；让 AI 用 async/await 处理异步。",
      example:
        "用 Node.js(Express) 写小 API：GET /todos 与 POST /todos，用内存数组存储，给出路由与错误处理。",
    },
    aiFriendly: "high",
    pitfall: [
      "未捕获的 Promise rejection：AI 写的 await 没 try/catch、或 .then 链漏了 .catch，报错进程直接崩。让 AI 给异步入口加 try/catch 或全局 unhandledRejection 兜底，并显式处理错误。",
      "回调/异步顺序错乱：AI 把异步当同步写，依赖『先注册后执行』的假定时序。让 AI 统一用 async/await 避免回调嵌套，必要时用 Promise.all 控制并发。",
      "CommonJS 与 ESM 混用：AI 混用 require 和 import、module.exports 与 export，运行报错。让 AI 确认你的模块系统(看 package.json 的 type)，统一一种写法。",
      "事件监听器堆积/泄露：AI 反复 on() 不 off()，内存涨。让 AI 用完移除监听、用 once，或控制作用域。",
    ],
    official: "https://nodejs.org/docs/latest/api/",
    learn: "https://nodejs.org/en/learn",
  },
  {
    id: "dotnet",
    name: ".NET / C#",
    nameEn: ".NET",
    group: "backend",
    kind: "language",
    tagline: "微软企业级平台，强类型、跨平台、生态完整(ASP.NET Core)。",
    scenario: "企业应用、内部系统、需要强类型与成熟生态的后端服务。",
    withAI: {
      strategy:
        "说明用 .NET 8+ 与 ASP.NET Core 最小 API/Controllers；让 AI 用 C# 强类型与 EF Core。",
      example:
        "用 ASP.NET Core 写天气 API：最小 API 定义 GET /weather，EF Core 连 SQL Server 取数。",
    },
    aiFriendly: "medium",
    pitfall: [
      "Program.cs 的 DI 注册与中间件管道顺序难懂：AI 生成的 minimal API 常把 services.Add* 与 app.Use* 顺序写错，导致鉴权/跨域不生效。让 AI 给出最小可运行示例，并解释服务注册(Add)与中间件管道(Use)的先后与各自作用。",
      "async/await 里混用 .Result/.Wait 导致死锁：AI 在控制器里同步等异步，线程池饿死。让 AI 全程 async、返回 Task，避免阻塞调用。",
      "EF Core 关系/主键配置错与 N+1：AI 写的导航属性或 Fluent 配置不对，迁移报错或查询 N+1。让 AI 用 Include 预加载、明确配置关系，并解释跟踪(tracking)与 AsNoTracking。",
    ],
    official: "https://learn.microsoft.com/dotnet",
    learn: "https://learn.microsoft.com/dotnet/azure/",
  },
  {
    id: "java",
    name: "Java / Spring Boot",
    nameEn: "Java",
    group: "backend",
    kind: "language",
    tagline: "老牌企业语言，JVM 生态庞大，Spring 全家桶成熟。",
    scenario: "大型企业后端、金融/电信等强稳定要求系统。",
    withAI: {
      strategy:
        "说明用 Spring Boot 3 + Java 17+，让 AI 用注解(@RestController/@Service)与 Spring Data JPA。",
      example:
        "用 Spring Boot 写用户 API：@Entity 定义 User，@RestController 暴露 CRUD，JPA 连数据库。",
    },
    aiFriendly: "medium",
    pitfall: [
      "自动配置『魔法』与依赖冲突：AI 乱加 starter 或版本不一致，导致 NoSuchBean/循环依赖/启动失败。让 AI 解释每个 starter 的作用并锁定 Spring Boot 版本，避免堆砌依赖。",
      "字段注入(@Autowired)与循环依赖：AI 用 @Autowired 私有字段注入，易产生循环依赖且难测试。让 AI 用构造器注入(constructor injection)，让 Spring 在启动时暴露循环依赖。",
      "Lombok/@Transactional 误用：AI 用 @Transactional 包住 private 方法或自调用，事务不生效；或滥用 Lombok 注解导致反射/序列化问题。让 AI 只在 public 方法上加事务、自调用走代理，并说明 Lombok 的边界。",
    ],
    official: "https://spring.io/projects/spring-boot",
    learn: "https://spring.io/guides",
  },
  {
    id: "php",
    name: "PHP",
    nameEn: "PHP",
    group: "backend",
    kind: "language",
    tagline: "为 Web 而生的服务端脚本语言，部署简单、主机生态成熟。",
    scenario: "内容站/CMS、传统 Web 应用、需要廉价主机的项目。",
    withAI: {
      strategy:
        "说明用 PHP 8.1+ 与现代框架(Laravel)，让 AI 用类型声明与属性。",
      example:
        "用 PHP 写短链 API：路由接收长链返回短码，用 PDO 存数据库。",
    },
    aiFriendly: "medium",
    pitfall: [
      "SQL 注入与字符串拼接：AI 用字符串拼 SQL/命令，生成代码漏洞率高。让 AI 一律用预处理语句(PDO prepared / Eloquent 查询构造器)，禁止字符串插值拼 SQL。",
      "历史写法与全局函数混杂：AI 用旧式 mysql_ 函数、未声明命名空间、混用过程式与 OO。让 AI 用 PHP 8.1+、命名空间、Composer 与现代语法，并开启严格类型 declare(strict_types=1)。",
      "弱类型比较陷阱：AI 用 == 比较，'0' == 'false' 之类隐式转换可能绕过鉴权。让 AI 用 === 严格比较，并解释 PHP 弱类型坑。",
    ],
    official: "https://www.php.net/docs.php",
    learn: "https://www.php.net/manual/en/getting-started.php",
  },
  {
    id: "ruby",
    name: "Ruby",
    nameEn: "Ruby",
    group: "backend",
    kind: "language",
    tagline: "以开发幸福感著称的脚本语言，Rails 约定大于配置。",
    scenario: "快速搭建 CRUD 业务后台、初创 MVP。",
    withAI: {
      strategy:
        "说明用 Rails 7+，让 AI 用约定式生成(scaffold)与 Active Record。",
      example:
        "用 Rails 做博客：rails g scaffold Post 生成 CRUD，路由与视图开箱即用。",
    },
    aiFriendly: "medium",
    pitfall: [
      "隐式约定导致『能跑但不懂』：AI 用 scaffold 一键生成，但说不清 generated 文件职责。让 AI 标注每个 generated 文件(model/migration/controller/view)的作用与迁移(migration)顺序。",
      "N+1 查询：AI 在循环里访问关联(如 post.comments)，产生大量 SQL。让 AI 用 includes/eager_load 预加载关联，并说明 N+1 的危害。",
      "SQL 字符串插值注入：AI 用字符串插值得 where 条件。让 AI 用参数化 where(User.where(email: x))，禁止 #{params} 直接拼 SQL。",
    ],
    official: "https://www.ruby-lang.org/en/documentation/",
    learn: "https://www.ruby-lang.org/en/documentation/quickstart/",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    nameEn: "FastAPI",
    group: "backend",
    kind: "framework",
    tagline: "Python 异步 Web 框架，类型驱动、自动文档、性能高。",
    scenario: "Python 后端 API、ML 服务暴露、需要 OpenAPI 文档的接口。",
    withAI: {
      strategy:
        "用 Pydantic 模型定义请求/响应，让 AI 用类型注解自动生成校验与文档。",
      example:
        "用 FastAPI 写用户 API：Pydantic 模型 User，POST /users 校验邮箱，GET /users/{id} 返回，自动生成 Swagger。",
    },
    aiFriendly: "high",
    pitfall: [
      "Pydantic v1/v2 差异：AI 混用 BaseSettings、@validator/@field_validator、Query/Header 导入路径，代码在 v2 下报错。让 AI 明确用你项目的 Pydantic 大版本，统一用 pydantic v2 的 field_validator/model_config。",
      "async 与同步路由误解：AI 把 CPU 密集或阻塞调用放进 async def，阻塞事件循环；或误以为 FastAPI 自动多进程。让 AI 把阻塞调用放线程/进程、用 background tasks，并说明需要多 worker/多副本才能并发。",
      "依赖注入(Depends)滥用与生命周期：AI 在 Depends 里做重初始化或共享可变状态。让 AI 用 Depends 做清晰的依赖分层、用 yield 管理资源生命周期，并解释 request/singleton 边界。",
    ],
    official: "https://fastapi.tiangolo.com",
    learn: "https://fastapi.tiangolo.com/tutorial/",
  },
  {
    id: "django",
    name: "Django",
    nameEn: "Django",
    group: "backend",
    kind: "framework",
    tagline: "Python 全功能 Web 框架，自带 ORM/Admin/Auth，batteries-included。",
    scenario: "传统 CRUD 后台、CMS、需要开箱即用的管理界面与权限。",
    withAI: {
      strategy:
        "让 AI 用 Django ORM 建模型、迁移，用 Class-Based Views 或 DRF 写 API。",
      example:
        "用 Django + DRF 写博客 API：Model 定义 Post/Comment，序列化器与 ViewSet，配置路由与分页。",
    },
    aiFriendly: "high",
    pitfall: [
      "AI 生成的迁移可能丢数据：AI 改 model 后直接生成的 migration 可能含类型不匹配/丢字段，盲目 migrate 会破坏库。让 AI 跑 makemigrations 看 diff、先 review 再 migrate，并解释迁移与 model 的对应关系。",
      "ORM N+1 查询：AI 在模板/循环里访问关联(如 book.author.name)，每条触发一条 SQL。让 AI 用 select_related(外键)/prefetch_related(多对多) 预加载，并说明何时用哪个。",
      "MTV 与 DRF 两层抽象混：AI 在 ViewSet 里直接拼 JSON、或把序列化逻辑塞进 model。让 AI 分清 models/serializers/viewsets 职责，序列化在 serializer、业务在 service/view。",
      "settings 把密钥写死：AI 把 SECRET_KEY/数据库密码硬编码进 settings。让 AI 用环境变量(python-decouple/django-environ)读取密钥，并区分 DEBUG 环境。",
    ],
    official: "https://docs.djangoproject.com",
    learn: "https://docs.djangoproject.com/en/stable/intro/tutorial01/",
  },
  {
    id: "actix",
    name: "Actix Web",
    nameEn: "Actix",
    group: "backend",
    kind: "framework",
    tagline: "Rust 高性能 Web 框架，基于 actor 模型，吞吐极高。",
    scenario: "Rust 后端服务、对吞吐/延迟敏感的高性能 API。",
    withAI: {
      strategy:
        "让 AI 用 Handler/Extractor 组织路由，用 serde 做 JSON 序列化。",
      example:
        "用 Actix Web 写 REST API：定义路由 handler，用 web::Json 收参，连接 PostgreSQL 做 CRUD。",
    },
    aiFriendly: "medium",
    pitfall: [
      "Handler 的 Data/State 借用与 move 错误：AI 把 App 级共享状态用 web::Data 注入时，闭包里 move 不当导致编译错或运行时空引用。让 AI 用 web::Data<T> 注入、Handler 签名接收 data: web::Data<T>，并解释 Actix 的 App 状态所有权。",
      "异步 Runtime 与阻塞调用：AI 在 async handler 里调同步阻塞 IO，拖垮整个 worker 线程。让 AI 把阻塞调用放 web::block 或专有运行时，并保持 handler async。",
      "Extractors 顺序与类型：AI 的路由参数/JSON 提取类型不匹配，返回 400 而非预期。让 AI 用正确的 Extractor(web::Path/web::Json/web::Query)与对应类型，并解释 Responder 约束。",
    ],
    official: "https://actix.rs",
    learn: "https://actix.rs/docs/",
  },
  {
    id: "rocket",
    name: "Rocket",
    nameEn: "Rocket",
    group: "backend",
    kind: "framework",
    tagline: "Rust 易用 Web 框架，宏驱动的路由与请求守卫，开发体验好。",
    scenario: "希望用 Rust 但想要更简洁 API 的后端服务。",
    withAI: {
      strategy:
        "让 AI 用 #[get]/#[post] 宏定义路由，用 FromForm/FromJson 解析请求。",
      example:
        "用 Rocket 写待办 API：#[post(\"/todo\")] 接收 JSON，用托管状态(Managed State)存内存列表。",
    },
    aiFriendly: "medium",
    pitfall: [
      "Managed State 未注册：AI 在 handler 里用 &State<T> 却忘了在 rocket::build().manage(T) 注册，运行报 500。让 AI 先在 .manage() 注册全局状态再在 handler 用 State 提取，并解释 managed state 的生命周期。",
      "宏路由签名与 Responder：AI 路由宏 #[get(\"/x\")] 的参数类型/返回类型不满足 Responder，编译报错晦涩。让 AI 明确每个路由参数来自哪(Path/Query/Json)并用实现 Responder 的返回(Json/Status/自定义)。",
      "Fairing/Request Guard 顺序：AI 的鉴权 Guard 或 Fairing 顺序不对，导致请求提前被拒或漏过。让 AI 明确 Guard 的校验时机与 Fairing 的 attach 顺序。",
    ],
    official: "https://rocket.rs",
  },
  {
    id: "flask",
    name: "Flask",
    nameEn: "Flask",
    group: "backend",
    kind: "framework",
    tagline: "Python 轻量 Web 框架，极简核心、按需扩展。",
    scenario: "小型服务、原型、教学、把脚本包成 HTTP 接口。",
    withAI: {
      strategy:
        "让 AI 用蓝图(Blueprint)组织路由，用工厂函数创建 app。",
      example:
        "用 Flask 写短链服务：/<short> 重定向，POST /api/shorten 接收长链返回短码，内存字典存储。",
    },
    aiFriendly: "high",
    pitfall: [
      "App/Request Context 滥用：AI 在函数里直接用 current_app/db.session 却不在请求/应用上下文，报 RuntimeError。让 AI 用应用工厂模式、在路由内访问上下文，必要时用 app.app_context()。",
      "过于自由缺结构、全局变量满天飞：AI 把路由、配置、状态都堆在单文件全局。让 AI 用 Blueprint 拆分路由、用配置对象/工厂函数，避免模块级全局可变状态。",
      "debug=True 暴露与生产隐患：AI 默认开 debug、或把密钥写死。让 AI 用环境变量配置、关闭生产 debug、用 python-dotenv 管理配置。",
    ],
    official: "https://flask.palletsprojects.com",
    learn: "https://flask.palletsprojects.com/en/stable/quickstart/",
  },
  {
    id: "gin",
    name: "Gin",
    nameEn: "Gin",
    group: "backend",
    kind: "framework",
    tagline: "Go 最流行的 HTTP 框架，路由快、中间件生态成熟。",
    scenario: "Go 写 REST API、微服务；需要高性能与清晰路由。",
    withAI: {
      strategy:
        "让 AI 用 gin.Default() + 路由组，用 c.JSON 返回，中间件做鉴权/日志。",
      example:
        "用 Gin 写待办 API：路由组 /api，handler 用 c.ShouldBindJSON 收参，内存 map 存储。",
    },
    aiFriendly: "high",
    pitfall: [
      "handler 内起 goroutine 复用原始 Context：AI 在 handler 里 go func() 直接用原 *gin.Context，请求结束后上下文被回收导致数据错乱/panic。让 AI 用 c.Copy() 拿到只读副本再进 goroutine。",
      "绑定/校验用错：AI 用 c.ShouldBind 而非 ShouldBindJSON、或忽略绑定错误，拿到空数据。让 AI 按 Content-Type 用对应 Bind、务必判错，并用结构体 tag 做校验。",
      "业务逻辑堆在 handler：AI 把服务逻辑全写进 handler，难以测试。让 AI 把业务逻辑抽到 service 层，handler 只做参数绑定与响应。",
    ],
    official: "https://gin-gonic.com/docs/",
  },
  {
    id: "echo",
    name: "Echo",
    nameEn: "Echo",
    group: "backend",
    kind: "framework",
    tagline: "Go 极简高性能 Web 框架，API 清晰、内置中间件丰富。",
    scenario: "Go 写需要精细中间件控制的 REST API 与服务。",
    withAI: {
      strategy:
        "让 AI 用 e.Group 分组路由与中间件，用 c.Bind 解析请求。",
      example:
        "用 Echo 写用户 API：路由组 + JWT 中间件保护 /me，handler 用 c.Bind 收参。",
    },
    aiFriendly: "high",
    pitfall: [
      "c.Bind 绑定与校验缺失：AI 用 c.Bind 但忽略返回 error、或结构体 tag 写错，拿到空/错数据。让 AI 用 c.Bind 后判错、用 validate tag 做校验，并说明 Bind 按 Content-Type 选择。",
      "与 Gin 写法相近易混：AI 套 Gin 的 c.ShouldBindJSON/上下文语义，方法名不同导致编译错。让 AI 统一用 Echo 的 c.Bind/c.JSON，并区分 echo.Context 与 gin.Context。",
      "中间件/Group 注册顺序：AI 把 JWT 鉴权中间件挂在错误作用域，导致部分路由漏保护。让 AI 用 e.Group 挂载带中间件的保护组，并说明中间件只对注册后的路由生效。",
    ],
    official: "https://echo.labstack.com/docs",
  },
  {
    id: "fiber",
    name: "Fiber",
    nameEn: "Fiber",
    group: "backend",
    kind: "framework",
    tagline: "受 Express 启发、基于 Fasthttp 的 Go 框架，Node 风格 API。",
    scenario: "熟悉 Express 的开发者用 Go 写高性能 API。",
    withAI: {
      strategy:
        "让 AI 用 app.Get/Post 定义路由，ctx.JSON 返回，中间件链式注册。",
      example:
        "用 Fiber 写短链 API：app.Post(\"/shorten\") 收长链，ctx.JSON 返回短码，内存存储。",
    },
    aiFriendly: "high",
    pitfall: [
      "Ctx 不可跨 goroutine/生命周期复用：Fiber 基于 Fasthttp，*fiber.Ctx 在请求结束后被复用，AI 在 goroutine 或全局存 c 会拿到错数据。让 AI 在 goroutine 里只传需要的纯值、不要持有 *fiber.Ctx，或改用 context.Context。",
      "与标准 net/http 语义不同：AI 用标准库 handler 签名或 http.Request 方法，运行不兼容。让 AI 统一用 Fiber 的 app.Get/Post 与 ctx 方法，不要混用 net/http。",
      "错误处理不集中：AI 在各 handler 里散落 ctx.Status().JSON 拼错误。让 AI 用 Fiber 的错误处理中间件统一异常响应。",
    ],
    official: "https://docs.gofiber.io",
  },
  {
    id: "aspnet",
    name: "ASP.NET Core",
    nameEn: "ASP.NET",
    group: "backend",
    kind: "framework",
    tagline: "微软高性能跨平台 Web 框架，依赖注入与中间件管道成熟。",
    scenario: ".NET 生态的 REST API、企业后端、实时 SignalR 应用。",
    withAI: {
      strategy:
        "让 AI 用最小 API 或 Controllers，依赖注入在 Program.cs 注册，EF Core 管数据。",
      example:
        "用 ASP.NET Core 写订单 API：最小 API 定义端点，EF Core 连数据库，返回 DTO。",
    },
    aiFriendly: "medium",
    pitfall: [
      "DI 生命周期(Scoped/Singleton/Transient)误用：AI 把本应 Scoped 的 DbContext 注册成 Singleton，或错配有状态服务，生产偶发并发 bug 且本地难复现。让 AI 解释每个服务的注册生命周期，DbContext 必须用 Scoped。",
      "中间件顺序错：AI 把 UseAuthentication 放在 UseAuthorization 之后、或鉴权中间件位置不对，安全形同虚设。让 AI 严格按 异常处理→路由→鉴权→端点 的顺序并说明原因。",
      "Captive dependency：单例服务注入了 Scoped 服务，运行期报错。让 AI 检查注入链的生命周期层级，必要时用工厂或 Scope 解析。",
    ],
    official: "https://learn.microsoft.com/aspnet/core",
    learn: "https://learn.microsoft.com/aspnet/core/tutorials",
  },
  {
    id: "spring",
    name: "Spring Boot",
    nameEn: "Spring",
    group: "backend",
    kind: "framework",
    tagline: "Java 企业级全栈框架，自动配置 + 强大生态(数据/安全/云)。",
    scenario: "大型企业后端、需要事务/安全/微服务的系统。",
    withAI: {
      strategy:
        "让 AI 用 @SpringBootApplication + 起步依赖，@RestController 暴露 API，Spring Data JPA 管库。",
      example:
        "用 Spring Boot 写商品 API：@Entity 定义 Product，@RestController 暴露 CRUD，JPA 连 H2/MySQL。",
    },
    aiFriendly: "medium",
    pitfall: [
      "自动配置『魔法』与依赖冲突：AI 乱加 starter 或版本不一致，导致 NoSuchBean/循环依赖/启动失败。让 AI 解释每个 starter 作用并锁定 Spring Boot 版本，避免堆砌。",
      "事务不生效(@Transactional 自调用/非 public)：AI 在 private 方法或同类自调用上加 @Transactional，事务被代理跳过。让 AI 只在 public 方法加事务、跨 Bean 调用，并说明代理机制。",
      "循环依赖：AI 用字段注入造成 Bean 互相引用，Spring 默认禁止。让 AI 用构造器注入、必要时 @Lazy，并解释三级缓存。",
    ],
    official: "https://spring.io/projects/spring-boot",
    learn: "https://spring.io/guides",
  },
  {
    id: "laravel",
    name: "Laravel",
    nameEn: "Laravel",
    group: "backend",
    kind: "framework",
    tagline: "PHP 最流行框架，优雅语法、ORM(Eloquent)与生态完整。",
    scenario: "PHP 写 CRUD 业务、CMS、SaaS；重视开发效率。",
    withAI: {
      strategy:
        "让 AI 用 Artisan 生成、Eloquent 模型、路由与 Blade/API 资源。",
      example:
        "用 Laravel 写博客 API：Model 定义 Post，路由用 Route::resource，控制器返回 JSON 资源。",
    },
    aiFriendly: "medium",
    pitfall: [
      "Eloquent N+1 查询：AI 在循环里访问关联($post->comments)，产生大量 SQL。让 AI 用 with()/load() 预加载关联，并说明 N+1 危害。",
      "Mass Assignment 安全隐患：AI 用 $request->all() 直接 Model::create，用户可篡改角色/权限字段。让 AI 用 $fillable 白名单或 $request->only(...)，并解释 mass assignment 风险。",
      "门面(Facade)隐式依赖、关系定义错：AI 用 Facade 但说不清背后绑定，或关系方法写错导致查错表。让 AI 显式说明 Facade 对应类、用 with 预加载并核对关系定义。",
    ],
    official: "https://laravel.com/docs",
    learn: "https://laravel.com/docs/11.x/installation",
  },
  {
    id: "rails",
    name: "Ruby on Rails",
    nameEn: "Rails",
    group: "backend",
    kind: "framework",
    tagline: "Ruby 全栈框架，约定大于配置，scaffold 极速出 CRUD。",
    scenario: "快速搭建 CRUD 业务后台、初创 MVP。",
    withAI: {
      strategy:
        "让 AI 用 rails generate scaffold 出骨架，Active Record 定义关联。",
      example:
        "用 Rails 做待办：scaffold Todo 生成 CRUD，路由 resources :todos 自动暴露 REST。",
    },
    aiFriendly: "medium",
    pitfall: [
      "Mass Assignment / Strong Parameters 缺失：AI 用 Model.create(params) 直接写库，用户可越权改 admin 等字段。让 AI 用 Strong Parameters(require/permit) 显式白名单，并解释 mass assignment 风险。",
      "N+1 查询：AI 在视图/循环里访问关联，产生大量 SQL。让 AI 用 includes 预加载关联、用 bullet 自查。",
      "隐式约定与迁移顺序『能跑不懂』：AI 用 scaffold 生成但不说清 generated 文件职责、迁移顺序错导致 schema 不一致。让 AI 标注 generated 文件职责并说明 migration 的 up/down 与顺序。",
    ],
    official: "https://guides.rubyonrails.org",
    learn: "https://guides.rubyonrails.org/getting_started.html",
  },

  // ===== 边缘与运行时 =====
  {
    id: "bun",
    name: "Bun",
    nameEn: "Bun",
    group: "edge",
    kind: "runtime",
    tagline: "集运行时/包管理/打包于一体的快取 JavaScript 工具链。",
    scenario: "想用单一工具替代 Node+npm、追求安装与启动速度的 JS/TS 项目。",
    withAI: {
      strategy:
        "让 AI 用 Bun 的 API(bun:sqlite、Bun.serve)与 TS 原生运行，少配置。",
      example:
        "用 Bun 写 HTTP 服务：Bun.serve 定义 fetch 路由，bun:sqlite 存数据，无需额外框架。",
    },
    aiFriendly: "high",
    pitfall: [
      "与 Node 少数 API 不兼容：AI 用 Node-only 模块/API（如特定 http 行为），在 Bun 下行为差异。让 AI 标注 Bun 专属 API(bun:sqlite、Bun.serve)，并说明哪些 Node API 尚未完全兼容。",
      "把 Bun 当纯包管理器忽略运行时差异：AI 生成依赖或脚本假设 Node 全局，跨环境跑挂。让 AI 统一用 Bun 的 API 与 TS 原生运行，避免假设 Node 全局对象。",
      "脚本/scripts 约定错：AI 用 npm scripts 而非 bun run/bun test。让 AI 用 bun test 与 bun run，并解释 Bun 的内置测试与打包。",
    ],
    official: "https://bun.sh/docs",
    learn: "https://bun.sh/docs",
  },
  {
    id: "deno",
    name: "Deno",
    nameEn: "Deno",
    group: "edge",
    kind: "runtime",
    tagline: "安全的 TS 原生运行时，默认无文件系统权限、标准库完整。",
    scenario: "重视安全沙箱与现代化 TS 开发的脚本/服务/边缘函数。",
    withAI: {
      strategy:
        "让 AI 用 Deno 原生 TS、权限标志(--allow-net)与内置测试，无需打包。",
      example:
        "用 Deno 写 CLI：Deno.serve 做本地服务，Deno.test 写测试，权限按需授予。",
    },
    aiFriendly: "high",
    pitfall: [
      "权限模型默认关闭：AI 生成的代码读文件/网络被直接拦截，运行报 PermissionDenied。让 AI 在运行/部署时显式声明 --allow-net/--allow-read 等权限，或部署平台配置。",
      "远程 import 与锁文件：AI 用 URL import 但不锁版本，供应链不稳。让 AI 用 import map / deno.lock 固定依赖，并说明 Deno 的 URL import 机制。",
      "与 Node 生态混用：AI 用 CommonJS 或 node_modules 假设，Deno 默认不认。让 AI 用 ES Module、必要时用 npm: 前缀，并说明 Deno 的 Node 兼容层。",
    ],
    official: "https://docs.deno.com",
    learn: "https://docs.deno.com/examples",
  },
  {
    id: "hono",
    name: "Hono",
    nameEn: "Hono",
    group: "edge",
    kind: "framework",
    tagline: "超轻量、多运行时(Workers/Bun/Deno/Node)的 Web 框架。",
    scenario: "边缘函数、跨运行时统一代码的 API 与中间件。",
    withAI: {
      strategy:
        "让 AI 用 Hono 的 app.get/post 与 c.json，中间件用 app.use；强调可跑在多运行时。",
      example:
        "用 Hono 写边缘 API：部署到 Cloudflare Workers，app.get 返回 JSON，用环境变量配置。",
    },
    aiFriendly: "high",
    pitfall: [
      "误以为是 Node 专属、引入 Node 依赖：AI 在 Hono 里用 node 专属 API，部署到 Workers/Bun/Deno 时跑不了。让 AI 强调它跑在多运行时，避免引入 Node 专属依赖，用 Web 标准 Request/Response。",
      "中间件类型丢失：AI 把中间件抽到独立文件却丢了 Context/next 的类型。让 AI 用 createMiddleware 或正确的 Hono 类型标注，保持上下文类型。",
      "ctx.json 与中间件顺序：AI 在中间件里未调用 next() 导致请求短路，或响应格式不统一。让 AI 中间件必须 await next()、统一用 c.json 返回。",
    ],
    official: "https://hono.dev",
    learn: "https://hono.dev/docs",
  },
  {
    id: "workers",
    name: "Cloudflare Workers",
    nameEn: "Workers",
    group: "edge",
    kind: "runtime",
    tagline: "全球边缘无服务器平台，亚毫秒冷启动、就近执行。",
    scenario: "边缘 API、缓存层、轻量中间件、低延迟全球服务。",
    withAI: {
      strategy:
        "让 AI 用 Workers 的 fetch 事件/模块语法，KV/D1/R2 做存储，避免有状态 Node API。",
      example:
        "用 Workers 写短链重定向：从 KV 取长链 302 跳转，配合 Wrangler 配置路由。",
    },
    aiFriendly: "high",
    pitfall: [
      "有状态/本地存储不可用：AI 用文件系统、内存状态或长连接，Worker 多实例间不共享、冷启动清空。让 AI 用 KV/D1/Durable Objects 存状态，避免本地文件与全局可变状态。",
      "KV 最终一致性与子请求限额：AI 假设 KV 强一致、或在一次请求里疯狂子请求超限。让 AI 用 D1 做强一致、批量用 Promise.all、留意每次请求的子请求额度。",
      "兼容日期/执行时限：AI 漏写 compatibility_date 导致旧运行时行为，或做重计算超 CPU 时限。让 AI 设置 compatibility_date、把重活放 Durable Objects/队列。",
    ],
    official: "https://developers.cloudflare.com/workers",
    learn: "https://developers.cloudflare.com/workers/get-started",
  },

  // ===== AI 应用框架 =====
  {
    id: "vercel-ai",
    name: "Vercel AI SDK",
    nameEn: "AI SDK",
    group: "ai",
    kind: "framework",
    tagline: "为 TS/JS 应用接入大模型的标准化 SDK(统一多模型 + 流式 UI)。",
    scenario: "在 Next.js 等应用中集成聊天、流式生成、Agent 与工具调用。",
    withAI: {
      strategy:
        "让 AI 用 ai 包的 streamText/useChat，统一切换模型，前端用 useChat 接流式。",
      example:
        "用 AI SDK 做流式聊天：route.ts 用 streamText 调模型，页面用 useChat 渲染消息与输入。",
    },
    aiFriendly: "high",
    pitfall: [
      "版本 API 变动快(v4→v5)：AI 混用 useChat 旧 API(append/input)与 v5(用 messages/Input)、inputSchema vs parameters。让 AI 锁定 AI SDK 版本并严格按该版本文档写，避免跨版本混抄。",
      "core 与 model 包导入混乱：AI 从 ai 与 @ai-sdk/openai 乱引，或没装 provider 包。让 AI 区分 ai(core) 与 @ai-sdk/*(provider)、用 generateText/streamText + 对应 provider。",
      "服务端/客户端边界：AI 把 streamText 放客户端组件或没标 'use client' 用 useChat。让 AI 在 route.ts 服务端跑模型、页面用 'use client' + useChat 接流式。",
    ],
    official: "https://ai-sdk.dev/docs",
    learn: "https://ai-sdk.dev/docs/ai-sdk",
  },
  {
    id: "langchain",
    name: "LangChain",
    nameEn: "LangChain",
    group: "ai",
    kind: "framework",
    tagline: "面向 LLM 应用的编排框架，链/记忆/工具/检索一整套。",
    scenario: "构建 RAG、多步 Agent、需要组合提示与工具的复杂 LLM 流程。",
    withAI: {
      strategy:
        "让 AI 用 LCEL 表达式或 LangGraph 编排，明确模型/记忆/检索各自的职责。",
      example:
        "用 LangChain 做 RAG：文档切分→向量库→Retriever→带上下文的链，给出最小可运行示例。",
    },
    aiFriendly: "medium",
    pitfall: [
      "版本碎片化与废弃 API：AI 混用 initialize_agent/AgentExecutor 与新的 create_react_agent/LangGraph，或引用已弃用的 ConversationBufferMemory。让 AI 锁定版本、用 LCEL/LangGraph 编排，并避开官方已弃用的 Agent 旧 API。",
      "包拆分导致 ImportError：AI 从旧 import 路径导入（如 langchain.agents 拆分到 langchain_community），运行报错。让 AI 按当前版本文档写 import，明确 core/community/integrations 的归属。",
      "Pydantic v2 与输出类型不匹配：AI 用旧式 Pydantic 或 LCEL 输出类型对不上。让 AI 用 Pydantic v2、明确 chain 的 input/output schema。",
    ],
    official: "https://docs.langchain.com",
    learn: "https://python.langchain.com/docs",
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    nameEn: "LlamaIndex",
    group: "ai",
    kind: "framework",
    tagline: "以数据为中心的 LLM 框架，专注索引、检索与 RAG 管线。",
    scenario: "需要把私有文档/知识库接入大模型做检索增强(RAG)。",
    withAI: {
      strategy:
        "让 AI 用 Index 加载文档、构建向量索引，再写查询引擎；区分 Python/TS 版本。",
      example:
        "用 LlamaIndex 做文档问答：SimpleDirectoryReader 读文件→VectorStoreIndex→query_engine 回答。",
    },
    aiFriendly: "medium",
    pitfall: [
      "与 LangChain 职责重叠、混用：AI 把 RAG 与通用编排混在一起，引入两套生态。让 AI 明确你要『重检索/RAG』而非通用编排，优先用 LlamaIndex 的 Index/QueryEngine。",
      "Python 与 TS 版本差异：AI 用 Python 版 API 写 TS 项目（或反之），方法名/导入不同。让 AI 区分 llamaindex(Python) 与 @llamaindex/ts，按你的语言写。",
      "切分/索引参数不当导致检索差：AI 用默认 chunk_size/overlap 或没建对 embedding。让 AI 按文档类型调 chunk 策略、明确 embedding 模型与向量库。",
    ],
    official: "https://docs.llamaindex.ai",
    learn: "https://docs.llamaindex.ai/llamaindex/getting_started",
  },
  {
    id: "streamlit",
    name: "Streamlit",
    nameEn: "Streamlit",
    group: "ai",
    kind: "framework",
    tagline: "用纯 Python 脚本秒出 AI/数据可交互 Demo 的框架。",
    scenario: "快速把模型/数据分析做成可演示的 Web 界面，无需前端。",
    withAI: {
      strategy:
        "让 AI 用 st. 组件脚本式布局，缓存用 @st.cache_data，交互用 widgets 驱动重算。",
      example:
        "用 Streamlit 做情感分析 Demo：文件上传→模型推理→st.write 结果，加侧栏参数。",
    },
    aiFriendly: "high",
    pitfall: [
      "脚本式全量重跑导致状态丢失/卡顿：AI 在顶层做重计算，每次控件变化整页重跑、输入清空。让 AI 用 @st.cache_data/@st.cache_resource 缓存重计算，用 st.session_state 保状态。",
      "控件状态不保：AI 把变量定义在脚本顶层，交互后丢失。让 AI 用 st.session_state 存用户输入/中间结果，并解释 Streamlit 的自上而下 rerun 模型。",
      "回调与 widget key 混乱：AI 用 on_change 但没配 key/args，状态错乱。让 AI 给 widget 配稳定 key、用 callback 配合 session_state 更新。",
    ],
    official: "https://docs.streamlit.io",
    learn: "https://docs.streamlit.io/develop/tutorials",
  },
];
