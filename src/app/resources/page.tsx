import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  resources,
  resourceCategories,
  resourceCategoryMeta,
} from "@/content/resources";

export const metadata: Metadata = {
  title: "参考资源 · 写意",
  description:
    "shadcn/ui、Radix、Base UI、Tailwind 等组件库与设计系统资源，附官方链接与用途说明。",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">参考资源</h1>
        <p className="text-sm text-muted-foreground">
          与 AI 沟通组件或前后端时，可对照这些资源给出更准确的需求。点击名称跳转。
        </p>
      </div>

      {resourceCategories.map((cat) => {
        const items = resources.filter((r) => r.category === cat);
        if (items.length === 0) return null;
        return (
          <Reveal key={cat}>
            <section className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                {cat}
                <span className="ml-2 font-normal">
                  · {resourceCategoryMeta[cat]}
                </span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((r) => (
                  <Card key={r.name} className="hover-lift">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          {r.name}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {r.note}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </Reveal>
        );
      })}
    </div>
  );
}
