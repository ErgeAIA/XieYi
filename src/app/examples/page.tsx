import type { Metadata } from "next";
import { PageContainer, PageHeader } from "@/components/page-shell";
import { ExamplesGallery } from "@/components/examples/pages";

export const metadata: Metadata = {
  title: "示例 · 写意",
};

export default function ExamplesPage() {
  return (
    <PageContainer width="wide">
      <PageHeader
        title="示例"
        description="完整页面级布局参考，把组件嵌入真实场景。"
      />
      <ExamplesGallery />
    </PageContainer>
  );
}
