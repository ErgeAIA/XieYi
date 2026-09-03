"use client";

import * as React from "react";
import {
  PageContainer,
  PageHeader,
  GroupLabel,
  EmptyState,
} from "@/components/page-shell";
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
  const [copied, setCopied] = React.useState<string | null>(null);

  const starters = promptLibrary.filter((p) => p.isStarter);

  const filtered = promptLibrary.filter((p) => {
    if (cat !== "全部" && p.category !== cat) return false;
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      p.titleZh + (p.titleEn ?? "") + p.prompt + (p.promptZh ?? "")
    ).toLowerCase().includes(s);
  });

  const copy = (p: PromptLibraryItem) => {
    const clipboard = navigator.clipboard;
    if (!clipboard) return;
    clipboard.writeText(p.prompt).then(() => {
      setCopied(p.id);
      window.setTimeout(
        () => setCopied((c) => (c === p.id ? null : c)),
        1500,
      );
    });
  };

  const categoriesToShow: PromptCategory[] =
    cat === "全部" ? promptCategoryOrder : [cat];

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

      {cat === "全部" && q.trim() === "" && (
        <section className="space-y-3">
          <GroupLabel>从这里开始 · 5 条</GroupLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {starters.map((p) => (
              <PromptCard
                key={p.id}
                p={p}
                copied={copied === p.id}
                onCopy={() => copy(p)}
                highlight
              />
            ))}
          </div>
        </section>
      )}

      {categoriesToShow.map((c) => {
        const items = filtered.filter((p) => p.category === c);
        if (items.length === 0) return null;
        return (
          <section key={c} className="scroll-anchor space-y-3">
            <GroupLabel>
              {c} · {promptCategoryMeta[c]} · {items.length}
            </GroupLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((p) => (
                <PromptCard
                  key={p.id}
                  p={p}
                  copied={copied === p.id}
                  onCopy={() => copy(p)}
                />
              ))}
            </div>
          </section>
        );
      })}

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

function PromptCard({
  p,
  copied,
  onCopy,
  highlight,
}: {
  p: PromptLibraryItem;
  copied: boolean;
  onCopy: () => void;
  highlight?: boolean;
}) {
  return (
    <Card
      className={
        "hover-lift" + (highlight ? " border-primary/40 bg-primary/5" : "")
      }
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          {p.titleZh}
          {p.isStarter ? (
            <span className="ml-2 rounded bg-primary/15 px-1.5 py-0.5 text-xs font-normal text-primary">
              从这里开始
            </span>
          ) : null}
          {p.titleEn ? (
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              {p.titleEn}
            </span>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="relative">
          <button
            type="button"
            onClick={onCopy}
            className="absolute right-2 top-2 z-10 rounded border border-border bg-background/80 px-2 py-0.5 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            {copied ? "已复制" : "复制"}
          </button>
          <pre className="overflow-x-auto rounded-md border bg-muted/40 p-3 pr-14 pt-3 font-mono text-xs leading-relaxed text-foreground">
            <code>{p.prompt}</code>
          </pre>
        </div>
        {p.promptZh ? (
          <p className="text-muted-foreground">{p.promptZh}</p>
        ) : null}
        {p.whyEffective ? (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">为什么有效：</span>
            {p.whyEffective}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
