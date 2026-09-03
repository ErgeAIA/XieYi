"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  PageContainer,
  PageHeader,
  GroupLabel,
  FieldLabel,
  EmptyState,
} from "@/components/page-shell";
import { CopyBlock } from "@/components/copy-block";
import {
  frameworks,
  frameworkGroups,
  frameworkGroupMeta,
} from "@/content/frameworks";

export default function FrameworksPage() {
  const [q, setQ] = React.useState("");

  const filtered = frameworks.filter((f) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      f.name + (f.nameEn ?? "") + f.tagline + f.scenario
    ).toLowerCase().includes(s);
  });

  return (
    <PageContainer>
      <PageHeader
        title="框架"
        actions={
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索框架…"
            className="max-w-xs"
          />
        }
      />

      {frameworkGroups.map((g) => {
        const items = filtered.filter((f) => f.group === g);
        if (items.length === 0) return null;
        return (
          <section key={g} id={g} className="scroll-anchor space-y-3">
            <GroupLabel data-spy-group={g}>{frameworkGroupMeta[g]}</GroupLabel>
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
                            {f.kind === "language" ? "语言" : "框架"}
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

      {filtered.length === 0 && <EmptyState>没有匹配的框架。</EmptyState>}
    </PageContainer>
  );
}
