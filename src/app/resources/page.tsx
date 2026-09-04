import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { PageContainer, PageHeader, GroupLabel } from "@/components/page-shell";
import {
  resources,
  resourceCategories,
  resourceCategoryMeta,
  resourceCategoryDesc,
  resourceId,
} from "@/content/resources";

export const metadata: Metadata = {
  title: "参考资源 · 写意",
  description:
    "shadcn/ui、Radix、Base UI、Tailwind 等组件库与设计系统资源，附官方链接与用途说明。",
};

export default function ResourcesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="参考资源"
        description="与 AI 沟通组件或前后端时，可对照这些资源给出更准确的需求。点击名称跳转。"
      />

      {resourceCategories.map((cat) => {
        const items = resources.filter((r) => r.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} id={cat} className="scroll-anchor space-y-3">
            <GroupLabel data-spy-group={cat}>
              {cat}
              <span className="ml-2 font-normal">
                · {resourceCategoryMeta[cat]}
              </span>
            </GroupLabel>
            <p className="text-sm text-muted-foreground">{resourceCategoryDesc[cat]}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((r, i) => (
                <Reveal key={r.name} delay={i * 60}>
                  <Card
                    id={resourceId(r)}
                    data-spy-group={cat}
                    data-spy-item={resourceId(r)}
                    className="hover-lift scroll-anchor"
                  >
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
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </PageContainer>
  );
}
