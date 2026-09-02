import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "基础概念 · 写意",
  description:
    "Agent、Skill、Prompt、Context、Token 等 21 条 AI 协作基础概念，含定义、类比与协作示例。",
};

export default function ConceptsLayout({ children }: { children: ReactNode }) {
  return children;
}
