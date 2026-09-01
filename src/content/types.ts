// 自动迁移自 tools/vibe-coding-guide.html（脚本 scripts/extract-data.mjs 生成）
export type ConceptGroup = "ai" | "dev" | "web";

export interface Concept {
  id: string;
  nameZh: string;
  nameEn: string;
  group: ConceptGroup;
  definition: string;
  analogy: string;
  aiUsage: { strategy: string; example: string };
}

export type ComponentCategory =
  | "layout"
  | "form"
  | "navigation"
  | "display"
  | "feedback"
  | "overlay"
  | "charts"
  | "chat"
  | "extra";

export interface ComponentItem {
  cat: ComponentCategory;
  nameZh: string;
  nameEn: string;
  desc: string;
  usage: string;
  example?: string; // 真实示例将在阶段 B 用可交互 shadcn 组件重写，此处暂留原 HTML 片段
}
