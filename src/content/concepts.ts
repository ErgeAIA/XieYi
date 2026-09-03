// 自动迁移自 tools/vibe-coding-guide.html（脚本 scripts/extract-data.mjs 生成，AI 通用组已重排+优化+补推荐；开发工程组已同样重排+补推荐，按上线流排序）
import type { Concept, ConceptGroup } from "./types";

export const concepts: Concept[] = [
  {
    "id": "prompt",
    "nameZh": "提示词",
    "nameEn": "Prompt",
    "group": "ai",
    "definition": "你给 AI 的指令或问题，是模型生成回答的直接依据。它的质量（是否清晰、有上下文、有格式要求）直接决定输出质量——同一件事，笼统地说和说清楚，结果天差地别。",
    "analogy": "像给厨师点菜：只说『来点吃的』和说清『少油、免辣、要快、两人份』，上桌的菜完全不同。",
    "aiUsage": {
      "strategy": "按『角色 + 上下文 + 具体指令 + 输出格式』四要素组织，避免笼统指令；需要参考时直接贴文件或链接。",
      "example": "请扮演资深前端工程师，审查这段组件代码，指出可复用性问题并按优先级给出改进建议，用列表输出。"
    },
    "recommendations": [
      { "name": "Claude Code 提示词库（官方）", "url": "https://code.claude.com/docs/zh-CN/prompt-library", "note": "本库 52 条提示词的权威来源" },
      { "name": "本站提示词库", "url": "/prompts", "note": "已按 15 类收录，支持搜索与一键复制" },
      { "name": "提示工程指南 Prompting Guide", "url": "https://www.promptingguide.ai/zh", "note": "系统化的提示词方法论与模板" }
    ]
  },
  {
    "id": "system-prompt",
    "nameZh": "系统提示词",
    "nameEn": "System Prompt",
    "group": "ai",
    "definition": "预设给 AI 的长期角色与行为规则，在每次对话开始时自动生效，相当于给 AI 定的『岗位说明书』。它决定 AI 的语气、边界和默认工作方式，不随单轮对话改变。",
    "analogy": "像员工入职手册：先定好岗位职责和行为准则，之后的工作都按这套来，不用每次重新交代。",
    "aiUsage": {
      "strategy": "把角色、输出格式、禁忌写进系统提示词（如 CLAUDE.md），作为每轮对话的默认底座。",
      "example": "你是一位严格的代码审查员，每次收到代码先检查安全隐患，再按优先级列出修改建议。"
    },
    "recommendations": [
      { "name": "Claude Code → CLAUDE.md", "url": "https://docs.claude.com/zh-CN/claude-code/memory", "note": "项目级长期记忆与规则" },
      { "name": "Codex / OpenCode → AGENTS.md", "url": "https://agents.md/#examples", "note": "代理协作契约文件，参考官方最佳实践" }
    ]
  },
  {
    "id": "token",
    "nameZh": "令牌",
    "nameEn": "Token",
    "group": "ai",
    "definition": "模型读写文本的最小计量单位，大致对应『字』（约 0.75 个汉字或 0.3 个英文单词）。输入和输出都按 token 计费，且受『上下文窗口』上限约束——一次对话能处理的篇幅有限。",
    "analogy": "像按重量计费的快递：字越多『重量』越大，超过车厢容量（上下文窗口）就装不下，得另开一车。",
    "aiUsage": {
      "strategy": "控制输入长度，长文档先让 AI 总结；留意上下文窗口上限，避免一次性塞入整个项目。",
      "example": "这份日志有 3 万字，请先概括异常分布，再告诉我最需要关注的一类错误。"
    }
  },
  {
    "id": "context",
    "nameZh": "上下文",
    "nameEn": "Context",
    "group": "ai",
    "definition": "AI 在某一轮对话中『能看到』的全部信息，包括你提供的文件、对话历史、系统提示词和工具返回结果。上下文越相关、越完整，回答越准——它正是由一个个 token 组成的『可见窗口』。",
    "analogy": "像会议白板：写在上面的信息 AI 才看得见，没写上去的它完全不知道。",
    "aiUsage": {
      "strategy": "只提供相关文件，用 @ 引用具体文件；长对话主动总结关键信息，别让无关内容挤占上下文窗口。",
      "example": "请阅读 @src/utils/format.ts，然后解释这个格式化函数的时间复杂度。"
    },
    "recommendations": [
      { "name": "Claude Code（CLAUDE.md + @引用）", "url": "https://docs.claude.com/zh-CN/claude-code", "note": "项目记忆 + 文件引用" },
      { "name": "Codex（AGENTS.md）", "url": "https://developers.openai.com/codex", "note": "仓库级上下文" },
      { "name": "ZCode", "url": "https://zcode.z.ai", "note": "上下文与技能管理" },
      { "name": "Cursor（@引用）", "url": "https://cursor.com", "note": "对话内引用文件/代码" }
    ]
  },
  {
    "id": "agent",
    "nameZh": "智能体",
    "nameEn": "Agent",
    "group": "ai",
    "definition": "能自主完成任务的 AI 程序：不只问答，还能自己拆步骤、调用工具、写文件、运行命令，并在过程中检查与修正。你给目标，它自己想办法达成。",
    "analogy": "像一位能独当一面的实习生：你交代目标，它自己拆步骤、干活、检查结果，做完再向你汇报。",
    "aiUsage": {
      "strategy": "把目标说清楚，允许它自己规划步骤、调用工具并检查结果，别要求它每步都停下来请示。",
      "example": "帮我创建一个 React 项目，配好路由和状态管理，完成后告诉我如何启动。"
    },
    "recommendations": [
      { "name": "Claude Code", "url": "https://claude.com/claude-code", "note": "终端内自主编码智能体" },
      { "name": "OpenAI Codex", "url": "https://developers.openai.com/codex", "note": "云端编码智能体" },
      { "name": "ZCode", "url": "https://zcode.z.ai", "note": "国产多智能体平台" },
      { "name": "Cline", "url": "https://cline.bot", "note": "开源 VS Code AI 编程智能体" },
      { "name": "Qoder", "url": "https://qoder.com", "note": "国产 AI 编码智能体" },
      { "name": "Trae", "url": "https://www.trae.cn/work-fission/YVGFEV7RUVYF?utm_source=copy_link&utm_medium=friends_invite", "note": "字节 AI IDE / 智能体" },
      { "name": "WorkBuddy", "url": "https://www.workbuddy.cn/events/invite?inviteCode=276u2t3907nva", "note": "多智能体办公助手" },
      { "name": "Cursor Agent", "url": "https://cursor.com", "note": "编辑器内智能体" },
      { "name": "GitHub Copilot Agent", "url": "https://github.com/features/copilot", "note": "PR 级自主修复" },
      { "name": "Devin", "url": "https://devin.ai", "note": "全自动软件工程师" },
      { "name": "OpenCode", "url": "https://opencode.ai", "note": "开源终端编码智能体" },
      { "name": "Aider", "url": "https://aider.chat", "note": "开源 pair-programming 智能体" }
    ]
  },
  {
    "id": "agent-mode",
    "nameZh": "工作模式",
    "nameEn": "Agent Modes",
    "group": "ai",
    "definition": "智能体的协作档位，决定两件事：一是按什么流程干活——Chat 只问答、Plan 先出计划等人确认、Spec 先用需求/设计/任务文档对齐再动手、Goal/Craft 类只给目标自主执行；二是被授予多大权限——从每步确认到完全放权。各家叫法不同：Claude Code 的 Plan Mode、CodeBuddy 的 Craft、Qoder 的 Quest（内含 Goal / Spec 开关）、Kiro 的 Spec / Vibe。",
    "analogy": "像雇一位住家阿姨：先面聊问经验（Chat），大扫除前列清单给你过目（Plan），长期做饭先立好规矩菜谱（Spec），熟了以后只说『家里收拾一下』她自己安排（Goal / Craft）。至于家门密码给不给、给到哪一级，是另一件事——权限。",
    "aiUsage": {
      "strategy": "按任务风险选档：探索、小改动直接自主执行档；复杂功能先 Plan 或 Spec 对齐再动手；涉及删数据、动生产时把权限收到每步确认。",
      "example": "先进入 Plan 模式，为支付功能出一份实施方案，列出要改的文件、步骤和风险点，我确认后再开始编码。"
    },
    "recommendations": [
      { "name": "Plan 模式 · Claude Code", "url": "https://code.claude.com/docs/zh-CN/permission-modes#analyze-before-you-edit-with-plan-mode", "note": "只读分析出计划，人批准后再执行（Shift+Tab 切换）" },
      { "name": "Spec 驱动 · GitHub Spec Kit", "url": "https://github.com/github/spec-kit", "note": "官方规格驱动工具包：宪法 → 规格 → 计划 → 任务" },
      { "name": "Spec / Vibe 模式 · Kiro", "url": "https://kiro.dev/docs/specs/#what-are-specs", "note": "Spec 模式开创者：需求、设计、任务三文档对齐后再写码" },
      { "name": "Quest 模式 · Qoder", "url": "https://docs.qoder.com/zh/user-guide/quest/overview", "note": "自主编程委派：Goal 开关只给目标，Spec 开关对齐规格" },
      { "name": "Craft 模式 · CodeBuddy", "url": "https://www.codebuddy.cn/docs/ide/Features/Plan-Mode", "note": "Ask / Plan / Craft 三模式覆盖问、规划、执行全流程" },
      { "name": "权限档位 · Qoder CLI", "url": "https://docs.qoder.com/zh/cli/permissions", "note": "CLI 权限与审批档位设置说明" },
      { "name": "本站提示词库", "url": "/prompts", "note": "复制「计划 / 引导」类提示词，配合 Plan / Spec 模式先用" }
    ]
  },
  {
    "id": "skill",
    "nameZh": "技能包",
    "nameEn": "Skill",
    "group": "ai",
    "definition": "给 AI 加载的专业能力包，让它在特定领域（如前端设计、代码审查、测试）表现更专业。装上对应技能后，AI 会按该技能的规范与知识工作。常用技能可参考 SKILL.SH 热度榜（数据截至 2026-07）。",
    "analogy": "像给手机装 App：装上相机 App 拍照更专业，装上导航 App 认路更准。",
    "aiUsage": {
      "strategy": "遇到 AI 常做不好的任务时，先让它加载对应 Skill，再开始干活。",
      "example": "请先加载前端设计 Skill，再帮我设计一个登录页的视觉方案。"
    },
    "recommendations": [
      { "name": "SKILL.SH（技能市场）", "url": "https://skills.sh", "note": "热度榜 Top10 见下，数据截至 2026-07，排名动态变化" },
      { "name": "1. find-skills · vercel-labs", "url": "https://skills.sh", "note": "热度 2.4M：生态入口，搜索/安装其他 Skill" },
      { "name": "2. frontend-design · anthropics", "url": "https://skills.sh", "note": "热度 628K：官方前端设计，专治『AI 味』" },
      { "name": "3. vercel-react-best-practices · vercel-labs", "url": "https://skills.sh", "note": "热度 527K：70 条 React/Next 性能规则" },
      { "name": "4. agent-browser · vercel-labs", "url": "https://skills.sh", "note": "热度 514K：让 AI 自己开浏览器干活" },
      { "name": "5. grill-me · mattpocock", "url": "https://skills.sh", "note": "热度 459K：编码前系统性拷问，暴露漏洞" },
      { "name": "6. web-design-guidelines · vercel-labs", "url": "https://skills.sh", "note": "热度 440K：UI 规范审查器" },
      { "name": "7. microsoft-foundry · microsoft", "url": "https://skills.sh", "note": "热度 432K：Azure AI Foundry 全生命周期" },
      { "name": "8. remotion-best-practices · remotion-dev", "url": "https://skills.sh", "note": "热度 416K：用 React 写视频" },
      { "name": "9. improve-codebase-architecture · mattpocock", "url": "https://skills.sh", "note": "热度 408K：架构体检，输出 RFC" },
      { "name": "10. tdd · mattpocock", "url": "https://skills.sh", "note": "热度 390K：强制测试先行" }
    ]
  },
  {
    "id": "tool-mcp",
    "nameZh": "工具 / MCP",
    "nameEn": "Tool / MCP",
    "group": "ai",
    "definition": "AI 可以调用的外部能力，如读写文件、联网搜索、查数据库、发消息。MCP（模型上下文协议）是一套标准接口，让不同工具能被各种 AI 统一接入。",
    "analogy": "像给助手配了工具箱：有了扳手它能拧螺丝，有了浏览器它能查资料，工具越多能做的事越广。",
    "aiUsage": {
      "strategy": "明确告诉 AI 可以调用哪些工具（联网还是读文件、用哪个 MCP 服务），再让它动手。",
      "example": "请读取当前目录的 package.json，查询 npm 上 React 的最新版本号，并告诉我两者相差多少。"
    },
    "recommendations": [
      { "name": "MCP 官方（modelcontextprotocol）", "url": "https://modelcontextprotocol.io", "note": "协议规范与生态（汇总入口，非单个工具）" },
      { "name": "Context7", "note": "文档检索与上下文注入，实时获取官方文档最新内容与指定版本代码示例" },
      { "name": "Puppeteer", "note": "浏览器自动化：网页交互、截图、监控控制台、执行 JS" },
      { "name": "Sequential Thinking", "note": "结构化思维流程，拆解复杂问题、分支探索、生成验证假设" },
      { "name": "GitHub", "note": "基于 GitHub API 管理远程仓库、代码、Issue 与 Pull Request" },
      { "name": "Figma AI Bridge", "note": "读取/分析/提取 Figma 设计数据，辅助还原设计稿" },
      { "name": "Playwright", "note": "浏览器自动化与测试：交互、截图、生成测试代码、多设备模拟" },
      { "name": "Memory", "note": "本地知识图谱持久化记忆，跨会话保留上下文" },
      { "name": "Excel", "note": "读取/写入 Microsoft Excel 表格数据" },
      { "name": "File System", "note": "本地文件读取与操作" },
      { "name": "Chrome DevTools MCP", "note": "控制并检查 Chrome，自动化测试、排查与性能分析" }
    ]
  },
  {
    "id": "rag",
    "nameZh": "检索增强生成",
    "nameEn": "RAG",
    "group": "ai",
    "definition": "检索增强生成：先检索相关资料（文档、规范、知识库），再把资料连同问题一起交给 AI 作答。资料作为上下文，能显著降低编造、提升准确性。",
    "analogy": "像开卷考试：先翻书找答案再作答，比闭卷瞎蒙准确得多。",
    "aiUsage": {
      "strategy": "把项目文档、规范喂给 AI 或接入知识库，让它基于真实资料回答，而非凭记忆。",
      "example": "请根据 docs/design-system.md 的规范，告诉我按钮主色的变量名和默认值。"
    },
    "recommendations": [
      { "name": "LangChain", "url": "https://langchain.com", "note": "RAG 编排框架，串联检索与生成" },
      { "name": "LlamaIndex", "url": "https://www.llamaindex.ai", "note": "数据检索与索引框架" },
      { "name": "Pinecone", "url": "https://www.pinecone.io", "note": "托管向量数据库" },
      { "name": "Chroma", "url": "https://www.trychroma.com", "note": "开源嵌入式向量数据库" },
      { "name": "Milvus", "url": "https://milvus.io", "note": "大规模向量数据库" },
      { "name": "Dify", "url": "https://dify.ai", "note": "开源 LLMOps / RAG 应用平台" },
      { "name": "RAGFlow", "url": "https://ragflow.io", "note": "基于深度文档理解的开源 RAG 引擎" }
    ]
  },
  {
    "id": "hallucination",
    "nameZh": "幻觉",
    "nameEn": "Hallucination",
    "group": "ai",
    "definition": "AI 一本正经地编造不存在的事实、API 或代码，看似合理实则错误。它源于模型『补全』而非『查证』的本能，对不确定的内容也会给出看似自信的答案。",
    "analogy": "像记忆力好但会脑补的实习生：你没说过的事，他也能自信地补出细节，而且不觉得自己错了。",
    "aiUsage": {
      "strategy": "对关键结论要求 AI 给出依据或出处，让它明确标注『不确定』的部分，重要决定人工复核。",
      "example": "请检查这段配置里哪些 API 是真实存在的，列出你认为可能不存在的项并说明理由。"
    },
    "recommendations": [
      { "name": "验证模式 / 自测", "url": "https://docs.claude.com/zh-CN/claude-code/common-workflows", "note": "让 AI 运行/测试来验证" },
      { "name": "联网检索接地", "note": "用 WebSearch 等工具核对事实" },
      { "name": "引用与出处", "note": "要求给出来源链接再采信" },
      { "name": "人工复核", "note": "关键结论与代码必经人确认" }
    ]
  },
  {
    "id": "repo",
    "nameZh": "代码仓库",
    "nameEn": "Repo",
    "group": "dev",
    "definition": "存放项目全部代码文件及其完整改动历史的仓库，是版本管理的基本单位。",
    "analogy": "像一本能翻回任何一页的日记本：文件夹只留今天，仓库把每一天都留着。",
    "aiUsage": {
      "strategy": "描述问题时先说明是哪个仓库、哪个分支，帮助 AI 定位。",
      "example": "这个仓库是 Vue3 + TypeScript 项目，请先浏览目录结构，再告诉我入口文件在哪里。"
    },
    "recommendations": [
      { "name": "GitHub", "url": "https://github.com", "note": "最大代码托管平台，Issues / PR / 协作一体" },
      { "name": "GitLab", "url": "https://gitlab.com", "note": "内置 CI / CD，适合一体化研发" },
      { "name": "Bitbucket", "url": "https://bitbucket.org", "note": "与 Jira 深度集成" },
      { "name": "Sourcegraph", "url": "https://sourcegraph.com", "note": "跨仓库语义搜索，快速定位代码" },
      { "name": "本站提示词库", "url": "/prompts", "note": "复制「理解 / 计划」类提示词，先让 AI 读懂仓库结构" }
    ]
  },
  {
    "id": "git",
    "nameZh": "版本控制",
    "nameEn": "Git",
    "group": "dev",
    "definition": "分布式版本控制工具：完整记录每一次代码改动，可随时回退，多人协作互不覆盖。",
    "analogy": "像游戏存档：打 Boss 前先存档，打挂了读档重来，不用从头开始。",
    "aiUsage": {
      "strategy": "让 AI 小步提交、写好提交信息；涉及回退、强推等操作前先和它确认。",
      "example": "请把 src 目录下的改动按功能拆成两个提交，提交信息用英文动词开头。"
    },
    "recommendations": [
      { "name": "Pro Git（中文版）", "url": "https://git-scm.com/book/zh/v2", "note": "系统学习 Git 的免费权威书" },
      { "name": "Conventional Commits", "url": "https://www.conventionalcommits.org", "note": "提交信息规范，便于 AI 与团队解析" },
      { "name": "GitHub Flow", "url": "https://docs.github.com/zh", "note": "轻量分支协作模型" },
      { "name": "GitHub CLI（gh）", "url": "https://cli.github.com", "note": "终端里管 PR / Issue / Release，AI 可直接调用" },
      { "name": "GitLab CLI（glab）", "url": "https://gitlab.com/gitlab-org/cli", "note": "GitLab 版同类工具" },
      { "name": "UGit", "url": "https://ugit.qq.com", "note": "腾讯出品的 Git 图形客户端，对新手友好" },
      { "name": "GitHub Desktop", "url": "https://desktop.github.com", "note": "零门槛图形客户端，点几下完成提交 / 同步" },
      { "name": "Fork", "url": "https://git-fork.com", "note": "轻快好用的桌面客户端（Windows / Mac）" },
      { "name": "Lazygit", "url": "https://github.com/jesseduffield/lazygit", "note": "终端里的图形界面，远程开发 / AI 协作场景顺手" },
      { "name": "本站提示词库", "url": "/prompts", "note": "复制「Git」类提示词：让 AI 安全做分支 / 回退 / 合并" }
    ]
  },
  {
    "id": "commit",
    "nameZh": "提交",
    "nameEn": "Commit",
    "group": "dev",
    "definition": "一次代码改动的快照，附带说明这次改了什么、为什么改。",
    "analogy": "像拍照发朋友圈：每张照片记下当时的改动，配文说明是为什么拍。",
    "aiUsage": {
      "strategy": "要求 AI 一次提交只做一件事，提交信息写清『改了什么 + 为什么』。",
      "example": "请把刚才修改的文件提交，信息写明『修复移动端菜单无法关闭的问题』。"
    },
    "recommendations": [
      { "name": "Conventional Commits", "url": "https://www.conventionalcommits.org", "note": "提交信息规范" },
      { "name": "Commitizen", "url": "https://github.com/commitizen/cz-cli", "note": "交互式生成规范提交" },
      { "name": "本站提示词库", "url": "/prompts", "note": "复制「Git」类提示词：让 AI 按功能拆提交、写清 why" }
    ]
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
    },
    "recommendations": [
      { "name": "nvm", "url": "https://github.com/nvm-sh/nvm", "note": "Node 多版本管理，杜绝版本错配" },
      { "name": "npm / pnpm / yarn", "url": "https://pnpm.io", "note": "包管理器：装依赖、锁版本；pnpm 硬链接省磁盘（本站采用）" },
      { "name": "pyenv", "url": "https://github.com/pyenv/pyenv", "note": "Python 多版本管理（对应 Node 的 nvm）" },
      { "name": "pip / uv / poetry", "url": "https://docs.astral.sh/uv/", "note": "Python 包管理器：pip 官方标配，uv 极速新一代，poetry 带依赖编排" },
      { "name": "Conda", "url": "https://docs.conda.io", "note": "数据科学常用，环境隔离 + 包管理一体" },
      { "name": "Docker", "url": "https://www.docker.com", "note": "容器化环境，根治『我机器能跑』" },
      { "name": "asdf", "url": "https://asdf-vm.com", "note": "多语言运行时统一版本管理" },
      { "name": "Dotfiles 管理", "note": "用 Git 跟踪本地环境配置，换机一键恢复" }
    ]
  },
  {
    "id": "build",
    "nameZh": "构建",
    "nameEn": "Build",
    "group": "dev",
    "definition": "把源代码转换成生产环境可直接运行的产物的过程：编译、压缩、打包、优化都在这一步完成，产物（如 dist 目录）才是真正拿去部署的东西。",
    "analogy": "像把手稿印成书：手稿方便作者涂改，印刷装订后的书才方便读者阅读携带。",
    "aiUsage": {
      "strategy": "dev 模式能跑不代表构建能过；交付前让 AI 实际跑一次构建，报错逐个修掉。",
      "example": "请运行项目构建，如有报错先归类是语法、依赖还是配置问题，再逐个修复并重新构建。"
    },
    "recommendations": [
      { "name": "Vite", "url": "https://vitejs.dev", "note": "新一代前端构建工具，开发快、产物优化好" },
      { "name": "Next.js（内置构建）", "url": "https://nextjs.org", "note": "框架内置构建与打包，本站即用它" }
    ]
  },
  {
    "id": "testing",
    "nameZh": "测试",
    "nameEn": "Testing",
    "group": "dev",
    "definition": "用自动化脚本验证代码行为是否符合预期：改动之后跑一遍测试，就能立刻知道有没有改坏已有的功能。",
    "analogy": "像给家里装的烟雾报警器：平时安静不显眼，真出事第一时间响——不用等到浓烟滚滚才发现。",
    "aiUsage": {
      "strategy": "改完代码让 AI 顺手跑测试；关键逻辑还没测试时，先让它补测试再动手改。",
      "example": "为这个导出函数写三个测试：正常数据、空数据、非法输入各一个，写完跑给我看结果。"
    },
    "recommendations": [
      { "name": "Vitest", "url": "https://vitest.dev", "note": "当前主流的 JavaScript 测试框架，与 Vite 无缝配合" },
      { "name": "Playwright", "url": "https://playwright.dev", "note": "端到端测试：模拟真实用户操作浏览器" },
      { "name": "本站提示词库", "url": "/prompts", "note": "复制「测试」类提示词：先写测试、再修到通过" }
    ]
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
    },
    "recommendations": [
      { "name": "Chrome DevTools", "url": "https://developer.chrome.com/docs/devtools", "note": "浏览器调试基础" },
      { "name": "Sentry", "url": "https://sentry.io", "note": "线上错误监控与溯源" },
      { "name": "Chrome DevTools MCP", "note": "让 AI 直接控制并排查 Chrome（见 AI 通用·工具 / MCP）" },
      { "name": "本站提示词库", "url": "/prompts", "note": "复制「调试」类提示词：让 AI 按假设-验证法定位问题" }
    ]
  },
  {
    "id": "refactor",
    "nameZh": "重构",
    "nameEn": "Refactor",
    "group": "dev",
    "definition": "不改变功能的前提下，改进代码结构与可读性的过程。",
    "analogy": "像整理房间：东西一样没丢，但摆放整齐后找起来更快。",
    "aiUsage": {
      "strategy": "明确『行为不变』约束，要求 AI 重构后跑测试或对比输出结果。",
      "example": "请重构这个函数，保持输入输出完全不变，把它拆成三个职责单一的小函数。"
    },
    "recommendations": [
      { "name": "《重构：改善既有代码的设计》Martin Fowler", "note": "业界圣经" },
      { "name": "SonarQube", "url": "https://www.sonarsource.com", "note": "自动检测代码坏味道" },
      { "name": "本站提示词库", "url": "/prompts", "note": "复制「重构」类提示词：让 AI 行为不变地拆分 / 改名" }
    ]
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
    },
    "recommendations": [
      { "name": "Vercel", "url": "https://vercel.com", "note": "前端 / 全栈零配置部署" },
      { "name": "Netlify", "url": "https://www.netlify.com", "note": "静态与 Jamstack 部署" },
      { "name": "Cloudflare Pages", "url": "https://pages.cloudflare.com", "note": "边缘网络部署" },
      { "name": "GitHub Actions", "url": "https://github.com/features/actions", "note": "CI / CD 自动化流水线" },
      { "name": "本站提示词库", "url": "/prompts", "note": "复制「发布」类提示词：让 AI 准备上线清单与回滚方案" }
    ]
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
