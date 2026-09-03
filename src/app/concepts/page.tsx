"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  PageContainer,
  PageHeader,
  GroupLabel,
  EmptyState,
} from "@/components/page-shell";
import { concepts, conceptGroups, conceptGroupMeta } from "@/content/concepts";

export default function ConceptsPage() {
  const [q, setQ] = React.useState("");

  const filtered = concepts.filter((c) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (c.nameZh + c.nameEn + c.definition + c.analogy)
      .toLowerCase()
      .includes(s);
  });

  return (
    <PageContainer>
      <PageHeader
        title="基础概念"
        actions={
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索概念…"
            className="max-w-xs"
          />
        }
      />

      {conceptGroups.map((g) => {
        const items = filtered.filter((c) => c.group === g);
        if (items.length === 0) return null;
        return (
          <section
            key={g}
            id={g}
            data-spy-group={g}
            className="scroll-anchor space-y-3"
          >
            <GroupLabel>{conceptGroupMeta[g]}</GroupLabel>
            <div className="space-y-3">
              {items.map((c, i) => (
                <Reveal key={c.id} delay={i * 50}>
                  <Card
                    id={c.id}
                    data-spy-item={c.id}
                    className="hover-lift scroll-anchor"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        {c.nameZh}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          {c.nameEn}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">定义：</span>
                        {c.definition}
                      </p>
                      <p>
                        <span className="font-medium">类比：</span>
                        {c.analogy}
                      </p>
                      <div className="rounded-md bg-muted/50 p-3">
                        <p className="font-medium">与 AI 协作</p>
                        <p className="text-muted-foreground">{c.aiUsage.strategy}</p>
                        <p className="mt-1 rounded bg-background p-2 font-mono text-xs">
                          {c.aiUsage.example}
                        </p>
                      </div>
                      {c.recommendations && c.recommendations.length > 0 && (
                        <div className="rounded-md bg-muted/50 p-3">
                          <p className="font-medium">推荐</p>
                          <ul className="mt-1 space-y-1">
                            {c.recommendations.map((r, ri) => {
                              const external = r.url?.startsWith("http");
                              const label = (
                                <span>
                                  {r.name}
                                  {r.note ? (
                                    <span className="ml-1 text-muted-foreground">
                                      ：{r.note}
                                    </span>
                                  ) : null}
                                </span>
                              );
                              return (
                                <li key={ri} className="text-sm">
                                  {r.url ? (
                                    external ? (
                                      <a
                                        href={r.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-primary hover:underline"
                                      >
                                        {label}
                                      </a>
                                    ) : (
                                      <Link
                                        href={r.url}
                                        className="text-primary hover:underline"
                                      >
                                        {label}
                                      </Link>
                                    )
                                  ) : (
                                    <span className="font-medium text-foreground">
                                      {label}
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && <EmptyState>没有匹配的概念。</EmptyState>}
    </PageContainer>
  );
}
