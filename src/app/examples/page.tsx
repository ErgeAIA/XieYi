import type { Metadata } from "next";
import { PageContainer, PageHeader } from "@/components/page-shell";
import { ExamplesGallery } from "@/components/examples/pages";

export const metadata: Metadata = {
  title: "页面画廊 · 写意",
};

export default function ExamplesPage() {
  return (
    <PageContainer width="wide">
      <PageHeader
        title="页面画廊"
        en="Page Gallery"
        description="完整页面级布局参考，把组件嵌入真实场景，照着就能落地。"
      />
      <ExamplesGallery />
    </PageContainer>
  );
}
