// 自动迁移自 tools/vibe-coding-guide.html
import type { Concept, ConceptGroup } from "./types";

export const concepts: Concept[] = [
  {
    "id": "agent",
    "nameZh": "智能体",
    "nameEn": "Agent",
    "group": "ai",
    "definition": "能自主执行任务的 AI 程序，不只是问答，还能调用工具、写文件、运行命令。",
    "analogy": "像一位能独当一面的实习生：你交代目标，它自己拆步骤、干活、检查结果，做完再向你汇报。",
    "aiUsage": {
      "strategy": "把目标说清楚，允许它自己规划步骤、调用工具并检查结果，别要求它每步都停下来请示。",
      "example": "帮我创建一个 React 项目，配好路由和状态管理，完成后告诉我如何启动。"
    }
  },
  {
    "id": "skill",
    "nameZh": "技能包",
    "nameEn": "Skill",
    "group": "ai",
    "definition": "AI 的专业技能包，让它在写代码、画 UI 等领域表现更好。",
    "analogy": "像给手机装 App：装上相机 App 拍照更专业，装上导航 App 认路更准。",
    "aiUsage": {
      "strategy": "遇到 AI 常做不好的任务时，先让它加载对应 Skill，再开始干活。",
      "example": "请先加载前端设计 Skill，再帮我设计一个登录页的视觉方案。"
    }
  },
  {
    "id": "prompt",
    "nameZh": "提示词",
    "nameEn": "Prompt",
    "group": "ai",
    "definition": "你给 AI 的指令或问题。Prompt 的质量直接决定输出的质量。",
    "analogy": "像给厨师点菜：只说\"来点吃的\"和说清\"少油、免辣、要快\"，上桌的菜完全不同。",
    "aiUsage": {
      "strategy": "按\"角色 + 上下文 + 具体指令 + 输出格式\"四要素组织，避免笼统指令。",
      "example": "请扮演资深前端工程师，帮我审查这段组件代码，指出可复用性问题和改进建议。"
    }
  },
  {
    "id": "context",
    "nameZh": "上下文",
    "nameEn": "Context",
    "group": "ai",
    "definition": "AI 能看到的上下文，包括你提供的文件、之前的对话、系统指令等。",
    "analogy": "像会议白板：写在上面的信息 AI 才看得见，没写上去的它完全不知道。",
    "aiUsage": {
      "strategy": "只提供相关文件，用 @ 引用具体文件，长对话时主动总结关键信息。",
      "example": "请阅读 @src/utils/format.ts，然后解释这个格式化函数的时间复杂度。"
    }
  },
  {
    "id": "tool-mcp",
    "nameZh": "工具 / MCP",
    "nameEn": "Tool / MCP",
    "group": "ai",
    "definition": "AI 可以调用的外部工具，如文件操作、网络请求、数据库查询等。",
    "analogy": "像给助手配了工具箱：有了扳手它能拧螺丝，有了浏览器它能查资料。",
    "aiUsage": {
      "strategy": "明确告诉 AI 可以调用哪些工具，需要联网还是读文件，再让它动手。",
      "example": "请读取当前目录的 package.json，查询 npm 上 React 的最新版本号，并告诉我两者相差多少。"
    }
  },
  {
    "id": "token",
    "nameZh": "令牌",
    "nameEn": "Token",
    "group": "ai",
    "definition": "AI 处理文本的最小单位，约等于 0.75 个汉字或 0.3 个英文单词。",
    "analogy": "像手机流量：发多少字烧多少 token，预算有限就得省着用。",
    "aiUsage": {
      "strategy": "控制输入长度，长文档先让它总结，别把整个项目一次性塞进对话。",
      "example": "这份日志有 3 万字，请先概括异常分布，再告诉我最需要关注的一类错误。"
    }
  },
  {
    "id": "hallucination",
    "nameZh": "幻觉",
    "nameEn": "Hallucination",
    "group": "ai",
    "definition": "AI 一本正经地编造不存在的事实或代码，看似合理实则错误。",
    "analogy": "像酒后说胡话的人：语气很自信，内容却是自己脑补出来的。",
    "aiUsage": {
      "strategy": "对关键结论要求 AI 给出依据，或让它明确标注\"不确定\"的部分。",
      "example": "请检查这段配置里哪些 API 是真实存在的，列出你认为可能不存在的项并说明理由。"
    }
  },
  {
    "id": "rag",
    "nameZh": "检索增强生成",
    "nameEn": "RAG",
    "group": "ai",
    "definition": "先检索相关资料再让 AI 作答的生成方式，能显著降低编造。",
    "analogy": "像开卷考试：先翻书找答案再作答，比闭卷瞎蒙准确得多。",
    "aiUsage": {
      "strategy": "把项目文档、规范喂给 AI 或接入知识库，让它基于真实资料回答。",
      "example": "请根据 docs/design-system.md 的规范，告诉我按钮主色的变量名和默认值。"
    }
  },
  {
    "id": "system-prompt",
    "nameZh": "系统提示词",
    "nameEn": "System Prompt",
    "group": "ai",
    "definition": "预设给 AI 的长期角色与行为规则，每次对话都生效。",
    "analogy": "像员工入职手册：先定好岗位职责和行为准则，之后的工作都按这套来。",
    "aiUsage": {
      "strategy": "把角色、输出格式、禁忌写进系统提示词，作为每轮对话的默认底座。",
      "example": "你是一位严格的代码审查员，每次收到代码先检查安全隐患，再按优先级列出修改建议。"
    }
  },
  {
    "id": "repo",
    "nameZh": "代码仓库",
    "nameEn": "Repo",
    "group": "dev",
    "definition": "存放项目代码与历史版本的仓库，是版本管理的单位。",
    "analogy": "像项目的档案柜：所有文件和历史改动都按规矩收纳在里面。",
    "aiUsage": {
      "strategy": "描述问题时先说明是哪个仓库、哪个分支，帮助 AI 定位。",
      "example": "这个仓库是 Vue3 + TypeScript 项目，请先浏览目录结构，再告诉我入口文件在哪里。"
    }
  },
  {
    "id": "git",
    "nameZh": "版本控制",
    "nameEn": "Git",
    "group": "dev",
    "definition": "分布式版本控制工具，记录每次代码修改，可随时回退。",
    "analogy": "像游戏存档：每个节点存一档，出问题随时读档重来。",
    "aiUsage": {
      "strategy": "让 AI 小步提交、写好提交信息；涉及回退、强推等操作前先和它确认。",
      "example": "请把 src 目录下的改动按功能拆成两个提交，提交信息用英文动词开头。"
    }
  },
  {
    "id": "commit",
    "nameZh": "提交",
    "nameEn": "Commit",
    "group": "dev",
    "definition": "一次代码改动的快照，附带说明这次改了什么、为什么改。",
    "analogy": "像拍照发朋友圈：每张照片记下当时的改动，配文说明是为什么拍。",
    "aiUsage": {
      "strategy": "要求 AI 一次提交只做一件事，提交信息写清\"改了什么 + 为什么\"。",
      "example": "请把刚才修改的文件提交，信息写明\"修复移动端菜单无法关闭的问题\"。"
    }
  },
  {
    "id": "deploy",
    "nameZh": "部署",
    "nameEn": "Deploy",
    "group": "dev",
    "definition": "把代码发布到线上环境，让用户能访问到最新版本。",
    "analogy": "像新店开业：装修测试完，开门营业才有人进得来。",
    "aiUsage": {
      "strategy": "部署前先确认构建产物、环境变量和回滚方案，再执行上线。",
      "example": "请把 main 分支部署到预发环境，完成后返回访问地址并说明如何回滚。"
    }
  },
  {
    "id": "environment",
    "nameZh": "运行环境",
    "nameEn": "Environment",
    "group": "dev",
    "definition": "项目运行的软件与配置，如系统、语言版本、依赖、环境变量。",
    "analogy": "像厨房的灶台：同样的菜谱，不同火力、锅具做出来味道完全不同。",
    "aiUsage": {
      "strategy": "报错时把操作系统、版本号、复现步骤一并给出，别只贴一段报错。",
      "example": "我在 Windows 11 + Node 20 上跑这个脚本报错，请根据这个环境帮我定位原因。"
    }
  },
  {
    "id": "bug-debug",
    "nameZh": "缺陷 / 调试",
    "nameEn": "Bug / Debug",
    "group": "dev",
    "definition": "程序不符合预期的行为，以及定位、修复它的过程。",
    "analogy": "像家里水管漏水：先看哪里漏、再逐段排查，最后才动手补漏。",
    "aiUsage": {
      "strategy": "描述现象、复现步骤、期望与实际差异，让 AI 先给假设再验证。",
      "example": "点击导出按钮页面卡死，控制台报错 X，期望导出 Excel 文件，请帮我排查。"
    }
  },
  {
    "id": "refactor",
    "nameZh": "重构",
    "nameEn": "Refactor",
    "group": "dev",
    "definition": "不改变功能的前提下，改进代码结构与可读性的过程。",
    "analogy": "像整理房间：东西一样没丢，但摆放整齐后找起来更快。",
    "aiUsage": {
      "strategy": "明确\"行为不变\"约束，要求 AI 重构后跑测试或对比输出结果。",
      "example": "请重构这个函数，保持输入输出完全不变，把它拆成三个职责单一的小函数。"
    }
  },
  {
    "id": "frontend-backend",
    "nameZh": "前端 / 后端",
    "nameEn": "Frontend / Backend",
    "group": "web",
    "definition": "前端负责界面与交互，后端负责数据与业务逻辑，通过接口协作。",
    "analogy": "像餐厅：前厅点菜上菜（前端），后厨做菜（后端），菜单是双方约定的接口。",
    "aiUsage": {
      "strategy": "说清需求属于前端、后端还是全栈，并说明两者如何通过 API 对接。",
      "example": "请为登录页实现前端表单校验，并给我一个接收账号密码的后端接口设计。"
    }
  },
  {
    "id": "api",
    "nameZh": "接口",
    "nameEn": "API",
    "group": "web",
    "definition": "程序之间约定的数据交换接口，定义请求方式、参数与返回格式。",
    "analogy": "像餐厅菜单：顾客按菜单点菜，后厨按菜单出菜，两边都认同一套规则。",
    "aiUsage": {
      "strategy": "设计接口时写清路径、方法、参数、返回结构与错误码，让 AI 直接实现。",
      "example": "请设计一个用户登录 API，POST /api/login，返回 token 或 401 错误。"
    }
  },
  {
    "id": "database",
    "nameZh": "数据库",
    "nameEn": "Database",
    "group": "web",
    "definition": "持久化存储数据的系统，支持增删改查与数据关联。",
    "analogy": "像图书馆书库：书按编号摆放，借书还书都有登记，才能管好上万册书。",
    "aiUsage": {
      "strategy": "描述数据模型时给出实体关系，让 AI 设计表结构或查询语句。",
      "example": "请为待办事项设计三张表：用户、任务、标签，并说明它们之间的关系。"
    }
  },
  {
    "id": "component",
    "nameZh": "组件",
    "nameEn": "Component",
    "group": "web",
    "definition": "可复用的界面单元，封装了样式、结构与行为。",
    "analogy": "像乐高积木：标准件拼在一起能搭出各种造型，不必每次都从零造。",
    "aiUsage": {
      "strategy": "描述组件时给清 props、状态和交互，要求它可复用而非一次性。",
      "example": "请实现一个可复用的日期选择组件，支持禁用日期和范围选择两种模式。"
    }
  },
  {
    "id": "responsive",
    "nameZh": "响应式",
    "nameEn": "Responsive",
    "group": "web",
    "definition": "页面随屏幕尺寸自动调整布局，手机、平板、桌面都能用。",
    "analogy": "像橡皮筋：不管撑多大都能贴回原形，怎么拉伸都不会断。",
    "aiUsage": {
      "strategy": "描述布局在哪些断点下如何变化，让 AI 用媒体查询或流式布局实现。",
      "example": "请让这个导航栏在手机端变成汉堡菜单，在桌面端保持横向排列。"
    }
  }
];

export const conceptGroupMeta: Record<ConceptGroup, string> = {
  "ai": "AI 通用",
  "dev": "开发工程",
  "web": "Web 基础"
};

export const conceptGroups: ConceptGroup[] = ["ai", "dev", "web"];
