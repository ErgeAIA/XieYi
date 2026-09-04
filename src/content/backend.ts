// 后端相关：对前后端不熟时，用准确术语和 AI 对齐后端概念，让它生成对的代码。
export type BackendTopicId = "api" | "database" | "auth" | "deploy" | "cache" | "storage";

export interface BackendTopic {
  id: BackendTopicId;
  name: string;
  note: string;
  explain: string;
  terms: string[];
  examplePrompt: string;
}

export const backendTopicMetaEn: Record<BackendTopicId, string> = {
  api: "API",
  database: "Database",
  auth: "Auth",
  deploy: "Deployment",
  cache: "Cache",
  storage: "File Storage",
};

export const backendTopics: BackendTopic[] = [
  {
    id: "api",
    name: "API 接口",
    note: "前后端沟通的契约，向 AI 描述接口形状",
    explain:
      "API 是前后端之间“请求什么、返回什么”的约定。你把接口的输入输出讲清楚，AI 就能生成对应的前端调用代码和后端路由。常见风格有 REST（用 URL + 请求方法）和 GraphQL（按查询取字段）。",
    terms: [
      "REST",
      "GraphQL",
      "路由",
      "请求方法(GET/POST/PUT/DELETE)",
      "请求体",
      "响应体",
      "状态码",
      "OpenAPI",
      "鉴权头",
    ],
    examplePrompt:
      "帮我设计用户登录接口：POST /api/login，入参 { email, password }，成功返回 { token, user }，失败返回 401。给出 Express 路由和前端 fetch 调用代码。",
  },
  {
    id: "database",
    name: "数据库",
    note: "数据如何存储与建模",
    explain:
      "数据库负责把数据存起来并能被高效查询。告诉 AI 你的实体（用户、文章……）和它们之间的关系，它能帮你设计表结构、写查询语句。关系型（如 PostgreSQL）用表 + SQL，文档型（如 MongoDB）用 JSON 式文档。",
    terms: [
      "关系型(SQL)/文档型(NoSQL)",
      "表",
      "字段",
      "主键",
      "外键",
      "索引",
      "关联(1对多、多对多)",
      "ORM(Prisma、Drizzle)",
    ],
    examplePrompt:
      "用 Prisma 设计博客数据模型：用户、文章、评论，文章和评论都关联作者。给出 schema 和生成迁移的命令。",
  },
  {
    id: "auth",
    name: "认证鉴权",
    note: "登录、会话与权限",
    explain:
      "“认证”确认你是谁（登录），“授权”决定你能做什么（权限）。和 AI 说清登录方式（账号密码 / 第三方）和权限模型（如按角色），才能生成安全的登录与访问控制代码。",
    terms: [
      "会话(Session)",
      "令牌(Token)",
      "JWT",
      "OAuth2",
      "第三方登录",
      "RBAC(角色权限)",
      "密码哈希(bcrypt)",
      "两步验证",
    ],
    examplePrompt:
      "用 NextAuth 实现邮箱密码登录加 GitHub 第三方登录，登录后根据用户角色(admin/user)限制 /admin 页面访问。",
  },
  {
    id: "deploy",
    name: "部署运行",
    note: "把应用真正跑起来",
    explain:
      "部署是把写好的应用放到服务器上对外提供服务。告诉 AI 你的托管方式（如 Vercel、云服务器）和需要的环境变量，它能帮你配置构建与上线流程。",
    terms: [
      "静态托管",
      "服务端",
      "环境变量",
      "构建(build)",
      "CI/CD",
      "域名",
      "HTTPS",
      "容器(Docker)",
    ],
    examplePrompt:
      "把 Next.js 项目部署到 Vercel，配置生产环境变量 DATABASE_URL 和 NEXT_PUBLIC_API_URL，并说明如何绑定自定义域名。",
  },
  {
    id: "cache",
    name: "缓存",
    note: "用空间换时间，加速读取",
    explain:
      "缓存把算过或查过的结果暂存起来，下次直接取，减少重复计算和数据库压力。常见有浏览器缓存、CDN、内存缓存（Redis）。和 AI 聊清“缓存什么、多久失效”，能避免数据不一致。",
    terms: ["Redis", "CDN", "浏览器缓存", "TTL(过期时间)", "命中率", "缓存击穿"],
    examplePrompt:
      "给商品详情接口加一层 Redis 缓存，缓存 60 秒，并说明缓存失效和更新的策略。",
  },
  {
    id: "storage",
    name: "文件存储",
    note: "上传、托管图片与文件",
    explain:
      "用户上传的头像、附件需要存到对象存储（如 S3、OSS）而不是服务器本地。告诉 AI 文件大小限制、访问权限，它能帮你实现上传、生成访问链接。",
    terms: ["对象存储(S3/OSS)", "上传", "预签名 URL", "CDN 加速", "文件类型校验"],
    examplePrompt:
      "实现用户头像上传：前端用表单上传到 /api/upload，后端存到对象存储并返回可访问 URL，限制文件类型为图片、大小 2MB 以内。",
  },
];
