"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
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
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">基础概念</h1>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索概念…"
          className="max-w-xs"
        />
      </div>

      {conceptGroups.map((g) => {
        const items = filtered.filter((c) => c.group === g);
        if (items.length === 0) return null;
        return (
          <section key={g} className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              {conceptGroupMeta[g]}
            </h2>
            <div className="space-y-3">
              {items.map((c) => (
                <Reveal key={c.id}>
                  <Card className="hover-lift">
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
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">没有匹配的概念。</p>
      )}
    </div>
  );
}
