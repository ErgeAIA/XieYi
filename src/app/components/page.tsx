import type { Metadata } from "next";
import { ComponentsView } from "@/components/components-view";
import { PageContainer, PageHeader } from "@/components/page-shell";
import { componentCategories, type ComponentCategory } from "@/content/components";

export const metadata: Metadata = {
  title: "前端组件 · 写意",
  description:
    "67 个 shadcn/ui 组件，按 9 大类拆解，配使用场景与可交互的真实示例。",
};

export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const initial = componentCategories.includes(cat as ComponentCategory)
    ? (cat as ComponentCategory)
    : null;

  return (
    <PageContainer>
      <PageHeader
        title="前端组件"
        en="Components"
        description="67 个 shadcn/ui 组件，按 9 大类拆解，每个都配使用场景与可交互示例。"
      />
      <ComponentsView initialCat={initial} />
    </PageContainer>
  );
}
