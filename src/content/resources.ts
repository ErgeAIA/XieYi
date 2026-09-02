// 参考资源：与 AI 沟通组件 / 前后端时，可对照这些资源给出更准确的需求。
export type ResourceCategory =
  | "组件库"
  | "设计系统"
  | "AI 工具"
  | "动画组件"
  | "学习资料"
  | "社区";

export interface ResourceItem {
  name: string;
  url: string;
  category: ResourceCategory;
  note: string;
}

export const resourceCategories: ResourceCategory[] = [
  "组件库",
  "设计系统",
  "AI 工具",
  "动画组件",
  "学习资料",
  "社区",
];

export const resourceCategoryMeta: Record<ResourceCategory, string> = {
  组件库: "开箱即用的组件集合",
  设计系统: "底层样式与无样式原语",
  "AI 工具": "用 AI 生成与可视化搭建",
  动画组件: "带动效的进阶组件（供后续美化参考）",
  学习资料: "官方文档与教程",
  社区: "社区与源码",
};

export const resources: ResourceItem[] = [
  // 组件库
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "组件库",
    note: "复制即用、可深度定制的 React 组件集合，本站组件体系的基础。",
  },
  {
    name: "Ant Design",
    url: "https://ant.design",
    category: "组件库",
    note: "企业级组件库，术语与组件命名对照的权威参考。",
  },
  {
    name: "Material UI (MUI)",
    url: "https://mui.com",
    category: "组件库",
    note: "成熟的 Material Design 实现，组件覆盖度极高。",
  },
  {
    name: "Arco Design",
    url: "https://arco.design",
    category: "组件库",
    note: "字节出品的企业级组件库，设计语言偏简洁。",
  },
  {
    name: "Element Plus",
    url: "https://element-plus.org",
    category: "组件库",
    note: "Vue 生态主流组件库，跨框架对照时很有用。",
  },

  // 设计系统 / 底层原语
  {
    name: "Radix UI",
    url: "https://www.radix-ui.com",
    category: "设计系统",
    note: "shadcn 依赖的无样式、可访问性原语。",
  },
  {
    name: "Base UI",
    url: "https://base-ui.com",
    category: "设计系统",
    note: "MUI 团队的下一代无样式原语，本项目采用。",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    category: "设计系统",
    note: "原子化 CSS 框架，shadcn 的样式基础。",
  },
  {
    name: "Lucide Icons",
    url: "https://lucide.dev",
    category: "设计系统",
    note: "本站使用的开源图标库，风格统一简洁。",
  },
  {
    name: "React Aria",
    url: "https://react-spectrum.adobe.com/react-aria",
    category: "设计系统",
    note: "Adobe 的无障碍交互原语，复杂组件参考。",
  },

  // AI 工具
  {
    name: "v0 by Vercel",
    url: "https://v0.dev",
    category: "AI 工具",
    note: "用自然语言生成 shadcn 组件与页面，适合快速出原型。",
  },
  {
    name: "Shadcn Studio",
    url: "https://shadcnstudio.com",
    category: "AI 工具",
    note: "可视化搭建 800+ 组件，拖拽即可生成代码。",
  },
  {
    name: "shadcn/ui Blocks",
    url: "https://ui.shadcn.com/blocks",
    category: "AI 工具",
    note: "官方区块级布局，可直接拼装成完整页面。",
  },

  // 动画组件
  {
    name: "Magic UI",
    url: "https://magicui.design",
    category: "动画组件",
    note: "在 shadcn 基础上加入动效的组件集合。",
  },
  {
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    category: "动画组件",
    note: "特效向组件库，适合做有视觉冲击的区块。",
  },
  {
    name: "Framer Motion",
    url: "https://www.framer.com/motion/",
    category: "动画组件",
    note: "React 动画库，本站后续动效的基础设施。",
  },

  // 学习资料
  {
    name: "shadcn/ui 文档",
    url: "https://ui.shadcn.com/docs",
    category: "学习资料",
    note: "组件用法、主题与安装说明的官方来源。",
  },
  {
    name: "Tailwind 文档",
    url: "https://tailwindcss.com/docs",
    category: "学习资料",
    note: "原子类参考与配置指南。",
  },
  {
    name: "React 官方",
    url: "https://react.dev",
    category: "学习资料",
    note: "React 概念、Hooks 与最佳实践。",
  },

  // 社区
  {
    name: "shadcn-ui GitHub",
    url: "https://github.com/shadcn-ui/ui",
    category: "社区",
    note: "源码与社区讨论，遇到问题可查 issue。",
  },
  {
    name: "优设网",
    url: "https://www.uisdc.com",
    category: "社区",
    note: "国内设计教程与 shadcn 资源合集。",
  },
  {
    name: "Figma Community",
    url: "https://www.figma.com/community",
    category: "社区",
    note: "可找到 shadcn 设计套件，便于设计稿对齐。",
  },
];
