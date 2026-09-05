// Claude Code 官方提示词库（https://code.claude.com/docs/zh-CN/prompt-library）完整收录
// 说明：官方页面按「团队 Tab」（工程/产品/设计…）筛选，工程 Tab 标注「52 提示词」即完整库；
// 其余 Tab 为同一批提示词的子集。以下 52 条均取自工程视图，按官方小节标题归为 15 类。

export type PromptCategory =
  | "入门"
  | "理解"
  | "计划"
  | "原型"
  | "实现"
  | "测试"
  | "重构"
  | "审查"
  | "引导"
  | "Git"
  | "发布"
  | "调试"
  | "事件"
  | "数据"
  | "自动化";

export const promptCategoryOrder: PromptCategory[] = [
  "入门",
  "理解",
  "计划",
  "原型",
  "实现",
  "测试",
  "重构",
  "审查",
  "引导",
  "Git",
  "发布",
  "调试",
  "事件",
  "数据",
  "自动化",
];

export const promptCategoryMeta: Record<PromptCategory, string> = {
  "入门": "第一次接触代码库时该问什么",
  "理解": "搞懂不熟悉的代码与改动的影响",
  "计划": "动手前先规划范围、对齐需求",
  "原型": "把设计稿变成可点击的原型",
  "实现": "编写与补全功能代码",
  "测试": "用测试保障质量",
  "重构": "改善结构而不改变行为",
  "审查": "提交 / 合并前检查质量与风险",
  "引导": "纠正 AI 的偏差并固化成规则",
  "Git": "版本控制与协作流程",
  "发布": "发版说明与持续集成",
  "调试": "定位并修复失败与报错",
  "事件": "线上事故排查",
  "数据": "分析数据并生成变体",
  "自动化": "把重复动作沉淀为技能 / 钩子",
};

export const promptCategoryMetaEn: Record<PromptCategory, string> = {
  "入门": "Getting Started",
  "理解": "Understanding",
  "计划": "Planning",
  "原型": "Prototyping",
  "实现": "Implementation",
  "测试": "Testing",
  "重构": "Refactoring",
  "审查": "Review",
  "引导": "Guidance",
  "Git": "Git",
  "发布": "Release",
  "调试": "Debugging",
  "事件": "Incident",
  "数据": "Data",
  "自动化": "Automation",
};

export const promptCategoryDesc: Record<PromptCategory, string> = {
  "入门": "刚拿到一个陌生代码库，先别急着改。用这几条让 AI 带你摸清架构、关键目录和模块关系，建立全局认知再动手。",
  "理解": "遇到看不懂的代码或拿不准的改动，让 AI 解释原理、梳理调用链、评估影响范围，避免瞎改引出新 bug。",
  "计划": "动手前先和 AI 对齐要做什么、做到什么程度。把需求拆成可执行的步骤，再开始写，少走弯路。",
  "原型": "有设计稿或想法时，让 AI 快速搭出能点的雏形。先验证交互对不对，再投入细节开发。",
  "实现": "真正写功能代码、补全全新模块时的提示词。把「要什么」讲清楚，AI 就能产出可运行的初版。",
  "测试": "让 AI 补单元测试、写边界用例、跑通关键路径。用测试兜住质量，改起来才敢动手。",
  "重构": "不改对外行为、只改善内部结构的提示词。让 AI 理顺重复代码、拆清职责，代码更好维护。",
  "审查": "提交或合并前，让 AI 从安全、性能、可读性多角度挑问题，把风险挡在合入之前。",
  "引导": "AI 跑偏时怎么把它拉回来，并把正确做法固化成规则或记忆，下次不再犯。",
  "Git": "提交、分支、合并、写提交说明等版本控制操作。让 AI 按规范管好协作历史。",
  "发布": "整理发版说明、跑持续集成、准备上线的提示词。让每次发布有迹可循、可回滚。",
  "调试": "程序失败、报错、行为异常时，让 AI 顺着线索定位根因并给出修复，而不是乱试。",
  "事件": "线上出事故时的应急提示词：快速定位、止血、复盘，把影响降到最低。",
  "数据": "让 AI 分析数据、生成报表或批量产出变体内容。把重复的数据活交给它。",
  "自动化": "把反复做的事沉淀成技能、钩子或脚本，让 AI 在合适时机自动触发，省下重复劳动。",
};

// 二级分类国风雅称（仅展示层；原始名用分类 key、英文 promptCategoryMetaEn 不变）
export const promptCategoryAlias: Record<PromptCategory, string> = {
  "入门": "初探",
  "理解": "参详",
  "计划": "谋定",
  "原型": "塑形",
  "实现": "铸就",
  "测试": "试炼",
  "重构": "易筋",
  "审查": "勘验",
  "引导": "驯化",
  "Git": "留痕",
  "发布": "颁行",
  "调试": "辨症",
  "事件": "应劫",
  "数据": "演数",
  "自动化": "自运",
};

export interface PromptLibraryItem {
  id: string;
  titleZh: string;
  titleEn?: string;
  prompt: string; // 官方英文原文，可直接复制进 Claude Code
  promptZh?: string; // 中文释义
  category: PromptCategory;
  whyEffective?: string; // 对应「为什么这样做有效」的模式
  isStarter?: boolean; // 五个「从这里开始」
  source?: string; // 官方来源链接
  origin?: PromptOrigin; // 来源分区：缺省 official（官学）
}

const WHY = {
  result: "描述结果，而不是步骤",
  verify: "给它一种检查自己工作的方式",
  ref: "指向参考",
  measurable: "说明可测量的目标",
  artifact: "给它工件",
  format: "说出你想要答案的方式",
};

export const promptLibrary: PromptLibraryItem[] = [
  // —— 入门 ——
  {
    id: "overview-codebase",
    titleZh: "在新存储库中定位",
    titleEn: "Get codebase overview",
    prompt:
      "give me an overview of this codebase: architecture, key directories, and how the pieces connect",
    promptZh: "给我一份代码库总览：架构、关键目录，以及各部分的连接方式。",
    category: "入门",
    whyEffective: WHY.format,
    isStarter: true,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 理解 ——
  {
    id: "explain-unfamiliar",
    titleZh: "解释不熟悉的代码",
    titleEn: "Explain unfamiliar code",
    prompt:
      "explain what src/scheduler/queue.ts does and how data flows through it. write it up as an HTML page with a diagram, then open it in my browser",
    promptZh: "解释 src/scheduler/queue.ts 的作用与数据流向，写成带图的 HTML 页面并在浏览器打开。",
    category: "理解",
    whyEffective: WHY.artifact,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "find-where",
    titleZh: "找到某事发生的地方",
    titleEn: "Find where something happens",
    prompt: "where do we validate uploaded file types?",
    promptZh: "我们在哪里校验上传文件的类型？",
    category: "理解",
    whyEffective: WHY.result,
    isStarter: true,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "check-break",
    titleZh: "在删除前检查什么会破坏",
    titleEn: "Check what would break before deleting",
    prompt: "what would break if I deleted the retryWithBackoff helper?",
    promptZh: "如果我删掉 retryWithBackoff 这个辅助函数，什么会坏掉？",
    category: "理解",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "trace-history",
    titleZh: "追踪代码如何演变",
    titleEn: "Trace how code evolved",
    prompt:
      "look through the commit history of internal/auth/session.go and summarize how it evolved and why",
    promptZh: "翻看 internal/auth/session.go 的提交历史，总结它如何演变、为何演变。",
    category: "理解",
    whyEffective: WHY.artifact,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "scope-change",
    titleZh: "在开始前确定更改的范围",
    titleEn: "Scope a change before starting",
    prompt: "which files would I need to touch to add a dark mode toggle to settings?",
    promptZh: "要加一个深色模式开关到设置页，我需要改哪些文件？",
    category: "理解",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "product-question",
    titleZh: "向代码库提出产品问题",
    titleEn: "Ask the codebase a product question",
    prompt:
      "I am a PM. walk me through what happens when a user clicks Export to PDF, from the UI down to the result",
    promptZh: "我是产品经理。带我从 UI 一路走到结果，讲清楚用户点『导出 PDF』时发生了什么。",
    category: "理解",
    whyEffective: WHY.format,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 计划 ——
  {
    id: "plan-multifile",
    titleZh: "在触及代码前计划多文件更改",
    titleEn: "Plan multi-file changes before touching code",
    prompt:
      "plan how to refactor the payment module to support multiple currencies. list the files you would change, but don't edit anything yet",
    promptZh: "规划如何重构支付模块以支持多币种。列出要改的文件，但先别动手改。",
    category: "计划",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "interview-spec",
    titleZh: "通过采访起草规范",
    titleEn: "Draft a spec via interview",
    prompt:
      "I want to build per-workspace rate limits. interview me about implementation, UX, edge cases, and tradeoffs until we have covered everything, then write the spec to SPEC.md",
    promptZh: "我想做按工作区的速率限制。就实现、UX、边界情况和权衡采访我，覆盖全面后把规范写入 SPEC.md。",
    category: "计划",
    whyEffective: WHY.format,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "meeting-to-tickets",
    titleZh: "将会议转变为工单",
    titleEn: "Turn meeting notes into tickets",
    prompt:
      "read @meeting-notes.md and write up the action items, then create a Linear ticket for each with acceptance criteria",
    promptZh: "读 @meeting-notes.md，整理出行动项，并为每项创建一个带验收标准的 Linear 工单。",
    category: "计划",
    whyEffective: WHY.artifact,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "map-edge-cases",
    titleZh: "在构建前映射边界情况",
    titleEn: "Map edge cases before building",
    prompt:
      "list the error states, empty states, and edge cases for the file upload flow that the design needs to cover",
    promptZh: "列出文件上传流程的错误态、空态和边界情况，供设计覆盖。",
    category: "计划",
    whyEffective: WHY.measurable,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 原型 ——
  {
    id: "mockup-to-prototype",
    titleZh: "将模型转变为工作原型",
    titleEn: "Turn a mockup into a working prototype",
    prompt:
      "here is a mockup. build a working prototype I can click through, matching the layout and states shown",
    promptZh: "这是一张设计稿。做一个可以点击走通的原型，匹配图中的布局与各种状态。",
    category: "原型",
    whyEffective: WHY.artifact,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "screenshot-self-check",
    titleZh: "从屏幕截图实现并自检",
    titleEn: "Implement from screenshot and self-check",
    prompt:
      "implement this design, then take a screenshot of the result, compare it to the original, and fix any differences",
    promptZh: "实现这个设计，然后截图对比原图，修掉所有差异。",
    category: "原型",
    whyEffective: WHY.verify,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 实现 ——
  {
    id: "follow-pattern",
    titleZh: "遵循现有模式",
    titleEn: "Follow an existing pattern",
    prompt:
      "look at how the GitHub webhook handler is implemented to understand the pattern, then build a Stripe webhook handler the same way",
    promptZh: "先看 GitHub webhook 处理器是怎么实现的，理解其模式，再用同样方式写一个 Stripe webhook 处理器。",
    category: "实现",
    whyEffective: WHY.ref,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "doc-undocumented",
    titleZh: "为未记录的代码生成文档",
    titleEn: "Document undocumented code",
    prompt:
      "find the public functions in src/auth/ without JSDoc comments and add them, matching the style already used in the file",
    promptZh: "找出 src/auth/ 里没有 JSDoc 的公开函数并补上，风格与文件现有写法一致。",
    category: "实现",
    whyEffective: WHY.ref,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "small-feature",
    titleZh: "添加一个小的、定义明确的功能",
    titleEn: "Add a small, well-defined feature",
    prompt: "add a /health endpoint that returns the app version and uptime",
    promptZh: "加一个 /health 接口，返回应用版本与运行时长。",
    category: "实现",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "build-internal-tool",
    titleZh: "从头开始构建一个小的内部工具",
    titleEn: "Build a small internal tool from scratch",
    prompt:
      "create a drag-and-drop Kanban board with three columns using HTML, CSS, and vanilla JavaScript, then open it in my browser",
    promptZh: "用 HTML、CSS 和原生 JS 做一个三列的拖拽看板，并在浏览器打开。",
    category: "实现",
    whyEffective: WHY.format,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "end-to-end-issue",
    titleZh: "端到端处理问题",
    titleEn: "Handle an issue end to end",
    prompt: "read issue #312, implement the fix, and run the tests",
    promptZh: "读 issue #312，实现修复并运行测试。",
    category: "实现",
    whyEffective: WHY.verify,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "find-and-update-copies",
    titleZh: "在代码库中查找和更新副本",
    titleEn: "Find and update copies across the codebase",
    prompt:
      'find every place we say "Sign up free" or a close variant, show me each one in context, then update them all to "Start free trial". leave tests and the changelog alone',
    promptZh: "找出所有写『Sign up free』或近似文案的地方，逐处展示上下文，再统一改成『Start free trial』。别动测试和变更日志。",
    category: "实现",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "draft-from-examples",
    titleZh: "从过去的例子起草文档",
    titleEn: "Draft a doc from past examples",
    prompt:
      "read the privacy impact assessments in legal/pia/ to learn the structure and voice, then draft a new one for the new analytics integration",
    promptZh: "读 legal/pia/ 下的隐私影响评估，学习其结构与语气，再为新的分析集成起草一份。",
    category: "实现",
    whyEffective: WHY.ref,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 测试 ——
  {
    id: "write-tests-fix",
    titleZh: "编写测试、运行它们、修复失败",
    titleEn: "Write tests, run them, fix failures",
    prompt: "write tests for app/parsers/feed.py, run them, and fix any failures",
    promptZh: "为 app/parsers/feed.py 写测试，运行并修复失败。",
    category: "测试",
    whyEffective: WHY.verify,
    isStarter: true,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "tdd",
    titleZh: "从测试驱动实现",
    titleEn: "Implement test-first",
    prompt: "write tests for the password reset flow first, then implement it until they pass",
    promptZh: "先为密码重置流程写测试，再实现直到测试通过。",
    category: "测试",
    whyEffective: WHY.verify,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "coverage-gaps",
    titleZh: "从覆盖率报告填补空白",
    titleEn: "Fill coverage gaps from report",
    prompt:
      "read coverage/coverage-summary.json and add tests for the lowest-covered files until each is above 80%",
    promptZh: "读 coverage/coverage-summary.json，为覆盖率最低的文件补测试，直到每个都高于 80%。",
    category: "测试",
    whyEffective: WHY.measurable,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 重构 ——
  {
    id: "migrate-pattern",
    titleZh: "在代码库中迁移模式",
    titleEn: "Migrate a pattern across the codebase",
    prompt:
      "migrate everything from the old logging API to the structured logger: identify every place that needs to change, then make the changes",
    promptZh: "把旧的日志 API 全部迁移到结构化日志：先找出所有要改的地方，再改。",
    category: "重构",
    whyEffective: WHY.verify,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "port-language",
    titleZh: "将代码移植到另一种语言",
    titleEn: "Port code to another language",
    prompt: "port this Python module to Rust, keeping the same public API and test behavior",
    promptZh: "把这个 Python 模块移植到 Rust，保持相同的公开 API 与测试行为。",
    category: "重构",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "optimize-measurable",
    titleZh: "针对可测量目标进行优化",
    titleEn: "Optimize against a measurable target",
    prompt: "optimize the search query to bring p95 latency from 2s down to under 500ms",
    promptZh: "优化搜索查询，把 p95 延迟从 2 秒降到 500 毫秒以内。",
    category: "重构",
    whyEffective: WHY.measurable,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "fix-visual-bug",
    titleZh: "修复精确的视觉错误",
    titleEn: "Fix a precise visual bug",
    prompt: "the login button extends 20px beyond the card border on mobile. fix it.",
    promptZh: "移动端登录按钮超出卡片边框 20px，修掉它。",
    category: "重构",
    whyEffective: WHY.measurable,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 审查 ——
  {
    id: "review-before-commit",
    titleZh: "在提交前审查你的更改",
    titleEn: "Review your changes before committing",
    prompt: "review my uncommitted changes and flag anything that looks risky before I commit",
    promptZh: "审查我尚未提交的改动，在提交前标出任何有风险的地方。",
    category: "审查",
    whyEffective: WHY.verify,
    isStarter: true,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "review-pr",
    titleZh: "审查拉取请求",
    titleEn: "Review a pull request",
    prompt: "review PR #247 and summarize what changed, then list any concerns",
    promptZh: "审查 PR #247，总结改了什么，再列出所有疑虑。",
    category: "审查",
    whyEffective: WHY.format,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "review-infra",
    titleZh: "在应用前审查基础设施更改",
    titleEn: "Review infra changes before applying",
    prompt:
      "here is my Terraform plan output. what is this going to do, and is anything here going to cause problems?",
    promptZh: "这是我的 Terraform plan 输出。它会做什么？有没有会引发问题的地方？",
    category: "审查",
    whyEffective: WHY.format,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "security-subagent",
    titleZh: "使用子代理运行安全审查",
    titleEn: "Run a security review with a subagent",
    prompt: "use a subagent to review src/api/ for security issues and report what it finds",
    promptZh: "用子代理审查 src/api/ 的安全问题，并报告发现。",
    category: "审查",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "catch-before-review",
    titleZh: "在正式审查前捕获问题",
    titleEn: "Catch issues before formal review",
    prompt:
      "review launch-post.md for unsupported claims, missing attributions, and brand-guideline issues and list anything I should fix before it goes to legal",
    promptZh: "审查 launch-post.md，找出无依据的说法、缺失的署名和品牌规范问题，列出在送法务前该修的内容。",
    category: "审查",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 引导 ——
  {
    id: "correct-approach",
    titleZh: "纠正错误的方法",
    titleEn: "Correct the wrong approach",
    prompt:
      "that is not right: the function signature needs to stay backward-compatible. try a different approach",
    promptZh: "那样不对：函数签名必须保持向后兼容。换一种做法。",
    category: "引导",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "narrow-scope",
    titleZh: "缩小更改的范围",
    titleEn: "Narrow the scope of changes",
    prompt:
      "that is too much. keep only the changes to the validation logic in src/forms/ and undo your other edits",
    promptZh: "太多了。只保留 src/forms/ 里校验逻辑的改动，其它撤销。",
    category: "引导",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "rule-from-correction",
    titleZh: "将更正转变为规则",
    titleEn: "Turn a correction into a rule",
    prompt:
      "you keep using default exports when this project uses named exports. add a rule to CLAUDE.md so this stops happening",
    promptZh: "你一直用默认导出，但本项目用命名导出。把这条规则写进 CLAUDE.md，避免再犯。",
    category: "引导",
    whyEffective: WHY.ref,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— Git ——
  {
    id: "resolve-conflicts",
    titleZh: "解决合并冲突",
    titleEn: "Resolve merge conflicts",
    prompt: "resolve the merge conflicts in this branch and explain what you kept from each side",
    promptZh: "解决这个分支的合并冲突，并说明你从两侧各自保留了什么。",
    category: "Git",
    whyEffective: WHY.format,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "commit-message",
    titleZh: "使用生成的消息提交",
    titleEn: "Commit with a generated message",
    prompt: "commit these changes with a message that summarizes what I did",
    promptZh: "提交这些改动，消息概括我做了什么。",
    category: "Git",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "pr-from-ticket",
    titleZh: "从工单打开拉取请求",
    titleEn: "Open a PR from a ticket",
    prompt: "find the Linear ticket about the login timeout and open a PR that implements it",
    promptZh: "找到关于登录超时的 Linear 工单，开一个实现它的 PR。",
    category: "Git",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 发布 ——
  {
    id: "release-notes",
    titleZh: "从 git 历史起草发布说明",
    titleEn: "Draft release notes from git history",
    prompt:
      "compare v2.3.0 to v2.4.0 and draft release notes grouped by feature, fix, and breaking change",
    promptZh: "对比 v2.3.0 与 v2.4.0，起草发布说明，按功能、修复、破坏性变更分组。",
    category: "发布",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "ci-workflow",
    titleZh: "编写 CI 工作流",
    titleEn: "Write a CI workflow",
    prompt:
      "write a GitHub Actions workflow that runs the tests and deploys to staging on every push to main",
    promptZh: "写一个 GitHub Actions 工作流：每次 push 到 main 都跑测试并部署到预发。",
    category: "发布",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 调试 ——
  {
    id: "fix-failing-test",
    titleZh: "找到并修复失败的测试",
    titleEn: "Find and fix a failing test",
    prompt: "the UserAuth test is failing, find out why and fix it",
    promptZh: "UserAuth 测试失败了，找出原因并修复。",
    category: "调试",
    whyEffective: WHY.verify,
    isStarter: true,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "investigate-error",
    titleZh: "调查报告的错误",
    titleEn: "Investigate a reported error",
    prompt: "users are seeing 500 errors on /api/settings. investigate and tell me what is going on",
    promptZh: "用户在 /api/settings 看到 500 错误。排查并告诉我怎么回事。",
    category: "调试",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "fix-build-root",
    titleZh: "在根处修复构建错误",
    titleEn: "Fix a build error at the root",
    prompt: "here is a build error. fix the root cause and verify the build succeeds",
    promptZh: "这是个构建错误。修复根因并验证构建通过。",
    category: "调试",
    whyEffective: WHY.verify,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 事件 ——
  {
    id: "prod-incident",
    titleZh: "调查生产事件",
    titleEn: "Investigate a production incident",
    prompt:
      "the checkout endpoint started returning 500s an hour ago. check the logs, recent deploys, and config changes, then tell me the most likely cause",
    promptZh: "结算接口一小时前开始返回 500。查日志、近期部署和配置变更，告诉我最可能的原因。",
    category: "事件",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "screenshot-diagnose",
    titleZh: "从控制台屏幕截图诊断",
    titleEn: "Diagnose from a console screenshot",
    prompt:
      "here is a screenshot of the GCP Kubernetes dashboard. walk me through why this pod is failing and give me the exact commands to fix it",
    promptZh: "这是 GCP Kubernetes 控制台截图。带我搞清楚这个 pod 为何失败，并给出修复的确切命令。",
    category: "事件",
    whyEffective: WHY.artifact,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "query-logs",
    titleZh: "用纯英文查询日志",
    titleEn: "Query logs in plain English",
    prompt:
      "show me all failed logins for the auth service over the past 24 hours. write the query, run it, and tell me what stands out",
    promptZh: "显示认证服务过去 24 小时所有失败登录。写出查询、运行它，并告诉我哪里异常。",
    category: "事件",
    whyEffective: WHY.format,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 数据 ——
  {
    id: "analyze-data-file",
    titleZh: "分析数据文件",
    titleEn: "Analyze a data file",
    prompt:
      "read @reports/q1-signups.csv, summarize the key patterns, and write the results to an HTML page with charts, then open it in my browser",
    promptZh: "读 @reports/q1-signups.csv，总结关键模式，把结果写成带图表的 HTML 页面并在浏览器打开。",
    category: "数据",
    whyEffective: WHY.format,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "generate-variants",
    titleZh: "从性能数据生成变体",
    titleEn: "Generate variants from performance data",
    prompt:
      "read @ads-performance.csv, find the underperforming headlines, and generate 20 new variations that stay under 90 characters",
    promptZh: "读 @ads-performance.csv，找出表现差的标题，生成 20 条 90 字符以内的新变体。",
    category: "数据",
    whyEffective: WHY.measurable,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // —— 自动化 ——
  {
    id: "task-to-skill",
    titleZh: "将重复任务转变为技能",
    titleEn: "Turn a recurring task into a skill",
    prompt:
      "create a /ship skill for this project that runs the linter and tests, then drafts a commit message",
    promptZh: "为这个项目创建一个 /ship 技能：跑 lint 和测试，然后起草提交信息。",
    category: "自动化",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "add-hook",
    titleZh: "为重复行为添加钩子",
    titleEn: "Add a hook for repetitive behavior",
    prompt: "write a hook that runs prettier after every edit to a .ts or .tsx file",
    promptZh: "写一个钩子：每次编辑 .ts / .tsx 文件后自动跑 prettier。",
    category: "自动化",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "connect-mcp",
    titleZh: "使用 MCP 连接工具",
    titleEn: "Connect a tool via MCP",
    prompt: "set up the Sentry MCP server so you can read my error reports directly",
    promptZh: "接入 Sentry 的 MCP 服务，这样你能直接读我的错误报告。",
    category: "自动化",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },
  {
    id: "capture-memory",
    titleZh: "捕获下次要记住的内容",
    titleEn: "Capture what to remember next time",
    prompt: "summarize what we did this session and suggest what to add to CLAUDE.md",
    promptZh: "总结本次会话做了什么，并建议该往 CLAUDE.md 里加什么。",
    category: "自动化",
    whyEffective: WHY.result,
    source: "https://code.claude.com/docs/zh-CN/prompt-library",
  },

  // ===== 撷英 · 来自网络 =====
  {
    id: "web-metaprompt",
    titleZh: "元提示：让 AI 替你写提示词",
    titleEn: "Metaprompt",
    prompt:
      "You are a prompt engineer. Based on my task description below, craft a high-quality prompt for me: clarify the goal, the audience, the output format and the constraints, then output the final prompt only.\n\n我的任务：<在此描述你的任务>",
    promptZh: "转写简化版：让 AI 充当提示词工程师，替你把任务描述打磨成结构化提示词；完整原文见来源。",
    category: "引导",
    origin: "web",
    whyEffective:
      "写好提示词本身就是一门手艺，把它交给专门的「提示词工程师」角色，往往比自己硬凑更快。",
    source: "Anthropic 提示词工程互动教程（Metaprompt）· github.com/anthropics/prompt-eng-interactive-tutorial",
  },
  {
    id: "web-clarify-first",
    titleZh: "先提问，再动手",
    titleEn: "Ask Questions First",
    prompt:
      "Before implementing, ask me up to 5 clarifying questions about requirements that are ambiguous or missing. Wait for my answers before writing any code.\n\n需求：<在此描述你的需求>",
    promptZh: "转写自 Anthropic 教程中的提问模式：让 AI 先把需求里的模糊点问清楚。",
    category: "引导",
    origin: "web",
    whyEffective:
      "需求的坑在动手前填最便宜——五连问能逼出你没写进需求里的隐含假设。",
    source: "Anthropic 提示词工程互动教程 · github.com/anthropics/prompt-eng-interactive-tutorial",
  },
  {
    id: "web-zero-shot-cot",
    titleZh: "一步一步思考",
    titleEn: "Zero-shot Chain-of-Thought",
    prompt: "请一步一步思考，再给出最终答案。(Let's think step by step.)",
    promptZh: "在任意任务后追加这句，能明显提升推理类任务的准确率。",
    category: "理解",
    origin: "web",
    whyEffective:
      "把「直接给答案」变成「展示推理过程」，模型的中间步骤会自己纠错。出自 Kojima et al. 2022 论文级别的发现。",
    source: "Kojima et al., Large Language Models are Zero-Shot Reasoners (2022) · arxiv.org/abs/2205.11916",
  },
];

// ===== 来源三分：官学 / 撷英 / 心法（页面一级分区） =====
export type PromptOrigin = "official" | "web" | "own";

export interface PromptOriginGroup {
  id: PromptOrigin;
  alias: string;
  name: string;
  en: string;
  explain: string;
}

export const promptOriginGroups: PromptOriginGroup[] = [
  {
    id: "official",
    alias: "官学",
    name: "Claude Code 官方",
    en: "Claude Code Official",
    explain:
      "Anthropic 官方提示词库完整收录，按场景分类。用词经过官方打磨，适合作为标准起手式。",
  },
  {
    id: "web",
    alias: "撷英",
    name: "来自网络",
    en: "From the Web",
    explain:
      "从官方教程与经典文献里采撷的提示词，条条署名出处。宁缺毋滥，只收经得起复用的。",
  },
  {
    id: "own",
    alias: "心法",
    name: "我的真言",
    en: "My Prompts",
    explain:
      "本站主理人在实战中磨出来的自用真言，附使用心得。整理中，敬请期待。",
  },
];
