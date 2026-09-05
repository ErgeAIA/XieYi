"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  PageContainer,
  PageHeader,
  GroupLabel,
  FieldLabel,
} from "@/components/page-shell";
import { CopyBlock } from "@/components/copy-block";
import {
  frameworks,
  frameworkGroups,
  frameworkGroupMeta,
  frameworkGroupMetaEn,
  frameworkGroupAlias,
  frameworkGroupDesc,
} from "@/content/frameworks";

export default function FrameworksPage() {
  return (
    <PageContainer>
      <PageHeader
        title="阵法·框架"
        en="Frameworks"
        description="主流前端、全栈、后端、边缘与 AI 框架一览，标注形态、AI 友好度与常见坑，辅助选型与避坑。"
      />

      {frameworkGroups.map((g) => {
        const items = frameworks.filter((f) => f.group === g);
        if (items.length === 0) return null;
        return (
          <section key={g} id={g} className="scroll-anchor space-y-3">
            <GroupLabel data-spy-group={g}>
              {frameworkGroupAlias[g]}·{frameworkGroupMeta[g]}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {frameworkGroupMetaEn[g]}
              </span>
            </GroupLabel>
            <p className="text-sm text-muted-foreground">{frameworkGroupDesc[g]}</p>
            <div className="space-y-3">
              {items.map((f, i) => (
                <Reveal key={f.id} delay={i * 40}>
                  <Card
                    id={f.id}
                    data-spy-group={g}
                    data-spy-item={f.id}
                    className="hover-lift scroll-anchor"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                        <span>{f.name}</span>
                        {f.nameEn ? (
                          <span className="text-xs font-normal text-muted-foreground">
                            {f.nameEn}
                          </span>
                        ) : null}
                        {f.kind ? (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {f.kind === "language"
                              ? "语言"
                              : f.kind === "library"
                                ? "库"
                                : f.kind === "framework"
                                  ? "框架"
                                  : f.kind === "meta-framework"
                                    ? "元框架"
                                    : "运行时"}
                          </span>
                        ) : null}
                        {f.note ? (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            {f.note}
                          </span>
                        ) : null}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-muted-foreground">{f.tagline}</p>
                      <p>
                        <FieldLabel>适用场景：</FieldLabel>
                        {f.scenario}
                      </p>
                      <div className="rounded-md bg-muted/50 p-3">
                        <p>
                          <FieldLabel>与 AI 协作</FieldLabel>
                        </p>
                        <p className="text-muted-foreground">{f.withAI.strategy}</p>
                        <CopyBlock
                          value={f.withAI.example}
                          className="mt-1"
                          label="向 AI 描述的示例"
                        />
                      </div>
                      {f.aiFriendly ? (
                        <p>
                          <FieldLabel>AI 友好度：</FieldLabel>
                          <span
                            className={
                              f.aiFriendly === "high"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : f.aiFriendly === "medium"
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-muted-foreground"
                            }
                          >
                            {f.aiFriendly === "high"
                              ? "高"
                              : f.aiFriendly === "medium"
                                ? "中"
                                : "低"}
                          </span>
                        </p>
                      ) : null}
                      {f.pitfall?.length ? (
                        <div className="rounded-md border border-destructive/20 bg-destructive/5 p-3">
                          <FieldLabel>常见坑：</FieldLabel>
                          <ul className="mt-1 list-disc space-y-1 pl-4 text-muted-foreground">
                            {f.pitfall.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <div className="flex flex-wrap gap-3 pt-1 text-sm">
                        <a
                          href={f.official}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          官方文档 ↗
                        </a>
                        {f.learn ? (
                          <a
                            href={f.learn}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:underline"
                          >
                            学习资源 ↗
                          </a>
                        ) : null}
                      </div>
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
