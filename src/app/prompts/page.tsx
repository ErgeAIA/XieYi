"use client";

import * as React from "react";
import {
  PageContainer,
  PageHeader,
  GroupLabel,
  FieldLabel,
  EmptyState,
} from "@/components/page-shell";
import { CopyBlock } from "@/components/copy-block";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  promptLibrary,
  promptCategoryOrder,
  promptCategoryMeta,
  type PromptLibraryItem,
} from "@/content/prompt-library";

export default function PromptsPage() {
  const [q, setQ] = React.useState("");

  const filtered = promptLibrary.filter((p) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      p.titleZh + (p.titleEn ?? "") + p.prompt + (p.promptZh ?? "")
    ).toLowerCase().includes(s);
  });

  return (
    <PageContainer>
      <PageHeader
        title="提示词实践指南"
        description="收录 Claude Code 官方 52 条提示词实践，按场景分类，可直接复制进 Claude Code 使用。"
        actions={
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索提示词…"
            className="max-w-xs"
          />
        }
      />

      {promptCategoryOrder.map((c) => {
        const items = filtered.filter((p) => p.category === c);
        if (items.length === 0) return null;
        return (
          <section key={c} className="space-y-3">
            <GroupLabel>{promptCategoryMeta[c]}</GroupLabel>
            <div className="columns-1 gap-3 sm:columns-2">
              {items.map((p, i) => (
                <Reveal key={p.id} delay={i * 30}>
                  <PromptCard p={p} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && <EmptyState>没有匹配的提示词。</EmptyState>}
    </PageContainer>
  );
}

function PromptCard({ p }: { p: PromptLibraryItem }) {
  return (
    <Card
      className={
        "hover-lift mb-3 break-inside-avoid" +
        (p.isStarter ? " border-primary/40 bg-primary/5" : "")
      }
    >
      <CardHeader className="pb-2">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {promptCategoryMeta[p.category]}
          </span>
          {p.isStarter ? (
            <span className="rounded bg-primary/15 px-1.5 py-0.5 text-xs font-normal text-primary">
              从这里开始
            </span>
          ) : null}
        </div>
        <CardTitle className="text-base">
          {p.titleZh}
          {p.titleEn ? (
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              {p.titleEn}
            </span>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <CopyBlock value={p.prompt} wrap />
        {p.promptZh ? (
          <p className="text-muted-foreground">{p.promptZh}</p>
        ) : null}
        {p.whyEffective ? (
          <p className="text-xs text-muted-foreground">
            <FieldLabel>为什么有效：</FieldLabel>
            {p.whyEffective}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
