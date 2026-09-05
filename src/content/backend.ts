// 后端相关：对前后端不熟时，用准确术语和 AI 对齐后端概念，让它生成对的代码。
// 每个专题 = 一段解释 + 带释义的术语 + 新手常见的坑 + 入门/进阶/排错三条提示词。

export type BackendTopicId =
  | "structure"
  | "api"
  | "database"
  | "cache"
  | "storage"
  | "auth"
  | "security"
  | "env"
  | "jobs"
  | "deploy";

export interface TermDef {
  term: string;
  def: string;
}

export interface Pitfall {
  problem: string;
  fix: string;
}

export interface PromptExample {
  label: "入门" | "进阶" | "排错";
  text: string;
}

export interface BackendTopic {
  id: BackendTopicId;
  name: string;
  note: string;
  explain: string;
  terms: TermDef[];
  pitfalls: Pitfall[];
  prompts: PromptExample[];
}

export const backendTopicMetaEn: Record<BackendTopicId, string> = {
  structure: "Backend Structure",
  api: "API",
  database: "Database",
  cache: "Cache",
  storage: "File Storage",
  auth: "Auth",
  security: "Security",
  env: "Env & Secrets",
  jobs: "Cron & Webhooks",
  deploy: "Deployment",
};

// 二级专题国风雅称（仅展示层；原始名用 topic.name、英文 backendTopicMetaEn 不变）
export const backendTopicAlias: Record<BackendTopicId, string> = {
  structure: "经络",
  api: "信道",
  database: "仓廪",
  cache: "镜花",
  storage: "玉匣",
  auth: "关防",
  security: "结界",
  env: "封印",
  jobs: "驿传",
  deploy: "布阵",
};

// 页面分组（仅展示层；侧栏仍为扁平专题列表）
export interface BackendGroup {
  id: string;
  alias: string;
  name: string;
  en: string;
  explain: string;
  topics: BackendTopicId[];
}

export const backendGroups: BackendGroup[] = [
  {
    id: "comm",
    alias: "枢机",
    name: "结构与通信",
    en: "Structure & API",
    explain: "后端的骨架与出入口：代码怎么分层组织、接口怎么约定，是一切的地基。",
    topics: ["structure", "api"],
  },
  {
    id: "data",
    alias: "府库",
    name: "数据与存储",
    en: "Data & Storage",
    explain: "数据放在哪、怎么取得快：数据库建模、缓存加速与文件托管。",
    topics: ["database", "cache", "storage"],
  },
  {
    id: "guard",
    alias: "守御",
    name: "身份与安全",
    en: "Auth & Security",
    explain: "认人、设防、守密：登录鉴权、常见攻防与密钥管理，出事都在这里。",
    topics: ["auth", "security", "env"],
  },
  {
    id: "ops",
    alias: "军机",
    name: "任务与上线",
    en: "Jobs & Deployment",
    explain: "异步之事与临阵之事：定时任务、第三方回调，以及把应用真正跑起来。",
    topics: ["jobs", "deploy"],
  },
];

export const backendTopics: BackendTopic[] = [
  {
    id: "structure",
    name: "后端代码结构",
    note: "代码放哪、怎么分层",
    explain:
      "后端代码不是堆在一个文件里。常见分法：路由（Route）负责“什么 URL 进来交给谁”，处理函数（Controller/Handler）接住请求、校验参数、返回响应，服务层（Service）放真正的业务规则，数据访问层（Model/Repository）只管读写数据库。让 AI 生成代码时说清楚分层，它就不会把数据库查询、鉴权、业务判断全塞进一个路由文件里——那是后期最难还的债。",
    terms: [
      { term: "路由(Route)", def: "URL 和处理函数的对应表：“GET /api/posts 该由谁处理”" },
      { term: "处理函数(Handler)", def: "接住请求、校验参数、调用服务层、返回响应" },
      { term: "服务层(Service)", def: "放业务规则的地方，如“文章发布前必须填写标题”" },
      { term: "数据访问层(Repository)", def: "只负责和数据库打交道，别的逻辑不掺和" },
      { term: "中间件(Middleware)", def: "请求进处理函数前的统一关卡，如登录校验、日志记录" },
      { term: "分层架构", def: "各层各司其职、单向依赖的组织方式" },
    ],
    pitfalls: [
      {
        problem: "让 AI“写一个博客后端”，它把数据库查询、鉴权、业务逻辑全塞进一个路由文件，几百行没法维护。",
        fix: "按路由 / 服务层 / 数据访问层分层生成，每个文件单一职责。",
      },
      {
        problem: "同一套逻辑（如“查询文章列表”）前端 fetch 写一遍、后端路由又写一遍，改需求要改两处。",
        fix: "把业务逻辑放到服务层，前端只调接口。",
      },
      {
        problem: "AI 每次生成的目录结构都不一样，越写越乱。",
        fix: "项目初期就让 AI 定一份目录结构约定，之后每次生成新功能都要求遵守它。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "用 Express 搭一个博客后端骨架：routes / services / repositories 三层结构，先只实现“文章列表”和“文章详情”两个接口，目录结构加注释说明每层职责。",
      },
      {
        label: "进阶",
        text: "在现有项目里新增“评论”功能：按项目的分层结构（路由 → 服务层 → 数据层）生成各层代码，业务校验放服务层，不要在路由里写 SQL。",
      },
      {
        label: "排错",
        text: "我的后端目录越写越乱：routes/posts.js 里有 300 行，包含 SQL 查询和鉴权逻辑。帮我把它重构成 service + repository 分层，并列出重构前后的调用关系对照。",
      },
    ],
  },
  {
    id: "api",
    name: "API 接口",
    note: "前后端沟通的契约",
    explain:
      "API 是前后端之间“请求什么、返回什么”的约定。你把接口的输入输出讲清楚，AI 就能生成对应的前端调用代码和后端路由。常见风格有 REST（用 URL + 请求方法表达操作）和 GraphQL（前端按需声明字段）。接口是前后端的合同——合同写得含糊，两边各自理解，联调就是灾难。",
    terms: [
      { term: "REST", def: "用“URL + 请求方法”表达操作的接口风格：GET 查、POST 建、PUT 改、DELETE 删" },
      { term: "GraphQL", def: "前端一次声明要哪些字段、后端按需返回的查询语言" },
      { term: "路由(Route)", def: "服务器里“哪个 URL 由哪段代码处理”的登记表" },
      { term: "请求体(Body)", def: "随请求发送的数据，如表单内容、JSON" },
      { term: "状态码(Status Code)", def: "结果的数字代号：2xx 成功、4xx 客户端错、5xx 服务端错" },
      { term: "OpenAPI(Swagger)", def: "用一份 JSON/YAML 描述全部接口的规范文档，AI 和前端都读得懂" },
    ],
    pitfalls: [
      {
        problem: "接口永远返回 200，错误藏在 { code: -1 } 里，前端要写一堆特判。",
        fix: "HTTP 状态码如实反映结果，错误用 4xx/5xx 并带错误信息。",
      },
      {
        problem: "字段命名一会 camelCase 一会 snake_case，前端对接对不上。",
        fix: "统一字段命名风格，并让 AI 输出一份 OpenAPI 文档作为唯一依据。",
      },
      {
        problem: "列表接口一次性返回全量数据，数据一多页面就卡。",
        fix: "列表接口加分页参数（page / pageSize），让 AI 一开始就按分页设计。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "帮我设计用户登录接口：POST /api/login，入参 { email, password }，成功返回 { token, user }，失败返回 401。给出 Express 路由和前端 fetch 调用代码。",
      },
      {
        label: "进阶",
        text: "为“文章”设计一套 REST 接口：列表（分页 + 关键词搜索）、详情、创建、更新、删除。先给 OpenAPI 描述，再给 Express 实现，统一错误返回格式 { error: { message } }。",
      },
      {
        label: "排错",
        text: "前端 fetch POST /api/posts 返回 415，请求体是 JSON。帮我排查 Content-Type、路由中间件配置可能的问题，并给出能正常工作的最小示例。",
      },
    ],
  },
  {
    id: "database",
    name: "数据库",
    note: "数据如何存储与建模",
    explain:
      "数据库负责把数据存起来并能被高效查询。告诉 AI 你的实体（用户、文章……）和它们之间的关系，它能帮你设计表结构、写查询语句。关系型（如 PostgreSQL）用表 + SQL，文档型（如 MongoDB）用 JSON 式文档。重点是建模：实体清清楚楚，后面一切都顺。",
    terms: [
      { term: "关系型(SQL)", def: "数据放表格里、表格之间能关联，如 PostgreSQL、MySQL" },
      { term: "文档型(NoSQL)", def: "数据存成 JSON 式文档、结构灵活，如 MongoDB" },
      { term: "主键(Primary Key)", def: "每行的唯一编号，如用户 id" },
      { term: "外键(Foreign Key)", def: "指向另一张表主键的字段，用来建立关联" },
      { term: "索引(Index)", def: "给常查字段建的“目录”，查询快、写入略慢" },
      { term: "关联(Relation)", def: "一对多（一个作者多篇文章）、多对多（文章和标签）" },
      { term: "迁移(Migration)", def: "数据库结构的变更脚本，让结构和代码同步演进" },
      { term: "ORM(Prisma/Drizzle)", def: "用代码对象代替手写 SQL 操作数据库的工具" },
    ],
    pitfalls: [
      {
        problem: "直接让 AI 改 schema，没生成迁移文件，数据库和代码对不上。",
        fix: "每次结构变更都通过迁移文件，不手动改库。",
      },
      {
        problem: "列表页查询越来越慢，因为常查的字段没建索引。",
        fix: "告诉 AI 哪些字段常用于查询和排序，让它补索引。",
      },
      {
        problem: "删除用户后，他的评论还挂在页面上（孤儿数据）。",
        fix: "设计关联时说明删除策略：级联删除还是置空。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "用 Prisma 设计博客数据模型：用户、文章、评论，文章和评论都关联作者。给出 schema 和生成迁移的命令。",
      },
      {
        label: "进阶",
        text: "给博客加“标签”功能：文章和标签多对多。更新 Prisma schema、生成迁移，并写一个“按标签查文章列表（分页）”的查询。",
      },
      {
        label: "排错",
        text: "这个 Prisma 查询在文章多了之后要 3 秒。帮我分析是不是 N+1 查询，给出 include/select 的优化写法和需要的索引。",
      },
    ],
  },
  {
    id: "cache",
    name: "缓存",
    note: "用空间换时间，加速读取",
    explain:
      "缓存把算过或查过的结果暂存起来，下次直接取，减少重复计算和数据库压力。常见有浏览器缓存、CDN、内存缓存（Redis）。缓存是把双刃剑：数据和缓存不一致时会出现“改了没生效”的诡异现象。和 AI 聊清“缓存什么、多久失效、变了怎么同步”，才能只享快、不受乱。",
    terms: [
      { term: "Redis", def: "常用的内存缓存数据库，读写极快" },
      { term: "CDN", def: "内容分发网络，静态资源放到离用户近的节点" },
      { term: "浏览器缓存", def: "浏览器把资源存到本地，再次访问不发请求" },
      { term: "TTL(过期时间)", def: "缓存存活时长，到期失效重新取" },
      { term: "命中率", def: "请求在缓存里直接命中的比例，越高越好" },
      { term: "缓存击穿", def: "热点缓存过期的瞬间，大量请求直冲数据库" },
    ],
    pitfalls: [
      {
        problem: "缓存了用户私有数据，换个账号还能看到别人的内容。",
        fix: "私有接口不缓存，或缓存 key 按用户维度隔离。",
      },
      {
        problem: "更新了数据但页面还是旧的，不知道缓存该存多久。",
        fix: "用“写时失效”策略：数据变更时主动删缓存，而不是只靠过期时间。",
      },
      {
        problem: "偶现脏数据：读到的是更新前的旧值。",
        fix: "和 AI 明确写入顺序：“先更新数据库，再删除缓存”。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "给商品详情接口加一层 Redis 缓存，缓存 60 秒，并说明缓存失效和更新的策略。",
      },
      {
        label: "进阶",
        text: "给文章列表接口加缓存：热点列表 Redis 缓存 60 秒，文章更新或删除时主动失效对应缓存。说明缓存 key 的设计和失效逻辑。",
      },
      {
        label: "排错",
        text: "加了 Redis 缓存后偶尔返回别的用户的数据。帮我排查缓存 key 是否带了用户维度，给出按用户隔离的 key 设计。",
      },
    ],
  },
  {
    id: "storage",
    name: "文件存储",
    note: "上传、托管图片与文件",
    explain:
      "用户上传的头像、附件需要存到对象存储（如 S3、OSS）而不是服务器本地——服务器上的文件在下次部署后就没了。告诉 AI 文件大小限制、允许的类型、访问权限（公共读还是私有读），它能帮你实现上传、生成访问链接。",
    terms: [
      { term: "对象存储(S3/OSS)", def: "云上按“桶”存放文件的存储服务，容量近乎无限" },
      { term: "预签名 URL", def: "服务器签发的限时上传/下载直连地址" },
      { term: "直传", def: "浏览器直接传到对象存储，不占应用服务器带宽" },
      { term: "MIME 类型", def: "文件类型标记，如 image/png，用来做类型校验" },
      { term: "CDN 加速", def: "上传的文件通过 CDN 分发，用户下载更快" },
    ],
    pitfalls: [
      {
        problem: "文件直接存服务器本地，下次部署一更新全丢了。",
        fix: "文件放对象存储，服务器只存访问地址。",
      },
      {
        problem: "上传接口被人拿来传大文件，刷爆流量和存储。",
        fix: "限制文件类型和大小，用限时有效的预签名 URL。",
      },
      {
        problem: "上传后返回的图片链接过一会儿 403 打不开了。",
        fix: "分清私有读（每次签临时 URL）和公共读（永久 CDN 链接）。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "实现用户头像上传：前端用表单上传到 /api/upload，后端存到对象存储并返回可访问 URL，限制文件类型为图片、大小 2MB 以内。",
      },
      {
        label: "进阶",
        text: "把头像上传改成前端直传 S3：后端只签发预签名 URL，限制图片类型与 2MB，上传完成后前端把 URL 存到用户资料。",
      },
      {
        label: "排错",
        text: "浏览器直传 S3 报 CORS 错误。帮我列出 S3 桶需要的 CORS 配置，以及后端预签名代码需要修改的地方。",
      },
    ],
  },
  {
    id: "auth",
    name: "认证鉴权",
    note: "登录、会话与权限",
    explain:
      "“认证”确认你是谁（登录），“授权”决定你能做什么（权限）。和 AI 说清登录方式（账号密码 / 第三方）和权限模型（如按角色），才能生成安全的登录与访问控制代码。这是后端里最不能含糊的部分——含糊一次，就是安全事故。",
    terms: [
      { term: "认证(Authentication)", def: "确认“你是谁”：密码、验证码、第三方登录" },
      { term: "授权(Authorization)", def: "确认“你能做什么”：权限、角色" },
      { term: "会话(Session)", def: "服务器记住“你已登录”的机制" },
      { term: "JWT", def: "自包含的令牌，签发后服务器无需存状态即可校验" },
      { term: "OAuth2", def: "“用 GitHub / 微信登录”背后的授权协议" },
      { term: "RBAC", def: "按角色授权：admin 可进后台、user 不行" },
      { term: "密码哈希(bcrypt)", def: "密码不存明文，只存不可逆的哈希值" },
      { term: "两步验证(2FA)", def: "密码之外再加一道动态验证码" },
    ],
    pitfalls: [
      {
        problem: "AI 把密码明文存进了数据库。",
        fix: "密码必须 bcrypt 哈希——生成代码前先把这一点说死。",
      },
      {
        problem: "token 存在 localStorage 里，一个 XSS 漏洞就被偷走。",
        fix: "token 用 httpOnly cookie 传递，不放 localStorage。",
      },
      {
        problem: "只做了“登录”，没做“权限”，普通用户直接输网址就能进 /admin。",
        fix: "明确角色模型，页面和服务端接口两层都做权限校验。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "用 NextAuth 实现邮箱密码登录加 GitHub 第三方登录，登录后根据用户角色(admin/user)限制 /admin 页面访问。",
      },
      {
        label: "进阶",
        text: "用 NextAuth + Prisma 实现：邮箱密码注册登录、用户带角色字段(admin/user)、/admin 页面与服务端接口两层 RBAC 校验，密码用 bcrypt 哈希，token 走 httpOnly cookie。",
      },
      {
        label: "排错",
        text: "登录成功但一刷新就掉线。帮我排查 session 策略（jwt/database）、cookie 的 httpOnly/secure 配置和回调 URL 设置。",
      },
    ],
  },
  {
    id: "security",
    name: "安全基础",
    note: "注入、跨域与限流的底盘",
    explain:
      "安全不止登录。接口暴露在公网上，要防的是：恶意输入（SQL 注入、XSS）、跨站滥用（CORS / CSRF）、脚本刷接口（限流）。好消息是这些都有成熟解法——告诉 AI 你暴露了哪些接口、接收什么输入，让它按清单布防，再让它站在攻击者角度自查一遍。",
    terms: [
      { term: "CORS", def: "浏览器的跨域限制，后端通过响应头放行指定来源" },
      { term: "SQL 注入", def: "恶意输入拼进 SQL 语句拖库，ORM 参数化查询可防" },
      { term: "XSS", def: "恶意脚本混进页面执行，渲染用户内容时必须转义" },
      { term: "CSRF", def: "诱导已登录用户的浏览器发起伪造请求" },
      { term: "限流(Rate Limit)", def: "限制接口调用频率，防刷防爬" },
      { term: "输入校验(zod)", def: "服务端对一切入参做类型与格式校验" },
    ],
    pitfalls: [
      {
        problem: "接口只靠前端表单校验，绕过页面直接 curl 就能提交脏数据。",
        fix: "前端校验只为体验，服务端必须用 zod 再校验一遍。",
      },
      {
        problem: "CORS 配置成允许任意来源（*），谁的网页都能调你的接口。",
        fix: "只放行自己的域名；需要携带 cookie 时不能用通配符。",
      },
      {
        problem: "公开接口没限流，被脚本刷到数据库爆掉。",
        fix: "公开接口加限流中间件，如每 IP 每分钟 30 次。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "给我的 Express 接口加基础安全配置：CORS 只允许 https://mysite.com、全局 zod 入参校验、公开接口每 IP 每分钟 30 次限流，逐项说明作用。",
      },
      {
        label: "进阶",
        text: "以攻击者视角审查这个接口的代码：指出 SQL 注入、XSS、CSRF 的风险点，按风险从高到低给出修复后的版本。",
      },
      {
        label: "排错",
        text: "前端跨域请求报 CORS 错误，浏览器提示 No 'Access-Control-Allow-Origin'。帮我排查后端 CORS 配置和 credentials 设置。",
      },
    ],
  },
  {
    id: "env",
    name: "环境变量与密钥",
    note: "配置与密钥的管法",
    explain:
      "数据库地址、第三方密钥这类配置不能写死在代码里，都用环境变量注入。记牢两条：.env 永远不进 Git 仓库；服务端密钥绝不能暴露给浏览器。上线前核对一份环境变量清单，能避开一大半“本地好好的，线上跑不了”。",
    terms: [
      { term: "环境变量(.env)", def: "数据库地址、密钥等配置与代码分离，存进 .env 文件" },
      { term: "NODE_ENV", def: "标识运行环境：development / production" },
      { term: "密钥泄露", def: ".env 被提交到 Git 仓库，是最常见的泄露事故" },
      { term: "生产配置", def: "线上环境变量在托管平台后台配置，不进代码库" },
      { term: "NEXT_PUBLIC_ 前缀", def: "Next.js 中暴露给浏览器的变量前缀——密钥绝不加它" },
    ],
    pitfalls: [
      {
        problem: ".env 被 commit 进仓库，数据库密码公开泄露。",
        fix: "把 .env 加进 .gitignore，另提供 .env.example 模板。",
      },
      {
        problem: "把服务端密钥加了 NEXT_PUBLIC_ 前缀，直接暴露给全网。",
        fix: "只有确实要给浏览器用的才加前缀，密钥一律只在服务端用。",
      },
      {
        problem: "本地能跑、线上跑不了，找不出差异。",
        fix: "让 AI 列一份环境变量清单，逐个核对本地与线上。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "为我的 Next.js + Prisma 项目整理环境变量：列出需要哪些（DATABASE_URL、AUTH_SECRET 等）、给出 .env.example 模板内容，并标明哪些可以暴露给浏览器、哪些绝不能。",
      },
      {
        label: "进阶",
        text: "用 zod 写一份启动时的环境变量校验：缺失或格式错误的变量直接报错并停止启动，避免带病上线。",
      },
      {
        label: "排错",
        text: "线上部署后 Prisma 报 'DATABASE_URL is missing'，本地正常。帮我排查托管平台的环境变量配置和构建时的注入时机。",
      },
    ],
  },
  {
    id: "jobs",
    name: "定时任务与 Webhook",
    note: "定时执行与第三方回调",
    explain:
      "有些事不该等用户点击才做：每天凌晨汇总数据、支付成功后自动发货、第三方通知你“用户订阅了”。这些异步之事要么按时间表自动跑（定时任务），要么由外部事件触发回调你的接口（Webhook）。和 AI 说清“什么事件、多频繁、失败了怎么办、重复通知怎么办”，它才能给出可靠的异步方案。",
    terms: [
      { term: "定时任务(Cron)", def: "按时间表自动执行，如每天凌晨统计数据" },
      { term: "Webhook", def: "第三方事件发生时主动回调你的接口，如支付成功通知" },
      { term: "消息队列(Queue)", def: "把耗时任务排进队列，异步慢慢处理" },
      { term: "幂等(Idempotent)", def: "同一通知重复收到，也不能重复扣款或发货" },
      { term: "重试(Retry)", def: "任务失败后自动再试，需配重试上限" },
      { term: "后台任务", def: "不阻塞用户请求的异步工作，如发邮件、生成报表" },
    ],
    pitfalls: [
      {
        problem: "Webhook 接口没做签名校验，谁都能 POST 一条假的“支付成功”。",
        fix: "校验第三方签名，验签通过才处理业务。",
      },
      {
        problem: "支付 Webhook 重发了两次，发货也发了两份。",
        fix: "处理逻辑要幂等：用订单号去重，重复通知直接返回成功。",
      },
      {
        problem: "定时任务本地正常、线上每个实例都跑一遍，数据重复统计。",
        fix: "告诉 AI 部署形态，用分布式锁或指定单实例执行。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "用 node-cron 写一个定时任务：每天 0 点统计昨日新增用户数写入 stats 表。如果我的项目部署在 Vercel，请改用 Vercel Cron 方案并说明区别。",
      },
      {
        label: "进阶",
        text: "接入支付回调 Webhook：校验第三方签名、按订单号幂等处理、更新订单状态并触发发货逻辑，给出验签失败和重复通知两种情况的处理流程。",
      },
      {
        label: "排错",
        text: "定时任务本地正常、线上不执行。帮我排查时区配置、部署平台对长驻进程的限制（Vercel Serverless 没有常驻进程），并给出替代方案。",
      },
    ],
  },
  {
    id: "deploy",
    name: "部署运行",
    note: "把应用真正跑起来",
    explain:
      "部署是把写好的应用放到服务器上对外提供服务。告诉 AI 你的托管方式（Vercel、云服务器）和需要的环境变量，它能帮你配置构建与上线流程。部署前先问清两件事：线上出问题怎么回滚、日志在哪里看——这两件事等到出事再查就晚了。",
    terms: [
      { term: "静态托管", def: "纯前端页面托管，无服务端逻辑" },
      { term: "Serverless", def: "按请求计费的托管方式，无需管理服务器，如 Vercel" },
      { term: "云服务器(VPS)", def: "传统整台服务器，自由度高、要自己运维" },
      { term: "容器(Docker)", def: "把应用和运行环境打包成镜像，到哪都一样跑" },
      { term: "CI/CD", def: "推送代码后自动测试、构建、上线的流水线" },
      { term: "构建(Build)", def: "源码编译打包成可运行产物的过程" },
      { term: "回滚(Rollback)", def: "线上出问题时快速退回上一版本" },
    ],
    pitfalls: [
      {
        problem: "本地连的数据库线上连不上（内网地址 / IP 白名单）。",
        fix: "部署前确认线上可访问的数据库地址与网络策略。",
      },
      {
        problem: "构建成功、一运行就报错，漏配了环境变量。",
        fix: "上线前核对环境变量清单（配合「封印」专题的启动校验）。",
      },
      {
        problem: "线上出了问题，不知道怎么退回上一个版本。",
        fix: "发布前先让 AI 说明所用平台的回滚操作和日志位置。",
      },
    ],
    prompts: [
      {
        label: "入门",
        text: "把 Next.js 项目部署到 Vercel，配置生产环境变量 DATABASE_URL 和 NEXT_PUBLIC_API_URL，并说明如何绑定自定义域名。",
      },
      {
        label: "进阶",
        text: "写一份 GitHub Actions：push 到 main 自动 lint + build，通过后 SSH 部署到我的云服务器，部署失败发通知，并说明如何回滚。",
      },
      {
        label: "排错",
        text: "Vercel 部署构建失败，报错日志如下（粘贴日志）。帮我定位是依赖版本、Node 版本还是环境变量注入时机的问题。",
      },
    ],
  },
];
