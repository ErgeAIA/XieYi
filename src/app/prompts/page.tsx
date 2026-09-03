"use client";

import * as React from "react";
import {
  PageContainer,
  PageHeader,
  FieldLabel,
  EmptyState,
} from "@/components/page-shell";
import { CopyBlock } from "@/components/copy-block";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  promptLibrary,
  promptCategoryOrder,
  promptCategoryMeta,
  type PromptCategory,
  type PromptLibraryItem,
} from "@/content/prompt-library";

type Filter = PromptCategory | "全部";

export default function PromptsPage() {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState<Filter>("全部");

  const filtered = promptLibrary.filter((p) => {
    if (cat !== "全部" && p.category !== cat) return false;
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      p.titleZh + (p.titleEn ?? "") + p.prompt + (p.promptZh ?? "")
    ).toLowerCase().includes(s);
  });

  return (
    <PageContainer>
      <PageHeader
        title="提示词库"
        description="收录 Claude Code 官方提示词库 52 条，按场景分类，可直接复制进 Claude Code 使用。"
        actions={
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索提示词…"
            className="max-w-xs"
          />
        }
      />

      <div className="flex flex-wrap gap-2">
        <FilterChip active={cat === "全部"} onClick={() => setCat("全部")}>
          全部
        </FilterChip>
        {promptCategoryOrder.map((c) => (
          <FilterChip key={c} active={cat === c} onClick={() => setCat(c)}>
            {c}
          </FilterChip>
        ))}
      </div>

      <div className="columns-1 gap-3 sm:columns-2">
        {filtered.map((p) => (
          <PromptCard key={p.id} p={p} />
        ))}
      </div>

      {filtered.length === 0 && <EmptyState>没有匹配的提示词。</EmptyState>}
    </PageContainer>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground")
      }
    >
      {children}
    </button>
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
