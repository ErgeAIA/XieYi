import { ComponentsView } from "@/components/components-view";
import {
  componentCategories,
  type ComponentCategory,
} from "@/content/components";

export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const initial = componentCategories.includes(cat as ComponentCategory)
    ? (cat as ComponentCategory)
    : "layout";

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">前端组件</h1>
      <ComponentsView initialCat={initial} />
    </div>
  );
}
