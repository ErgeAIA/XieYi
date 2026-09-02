import type { Metadata } from "next";
import { ExamplesGallery } from "@/components/examples/pages";

export const metadata: Metadata = {
  title: "示例 · 写意",
};

export default function ExamplesPage() {
  return <ExamplesGallery />;
}
