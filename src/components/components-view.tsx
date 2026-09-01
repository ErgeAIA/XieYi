"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  componentCategories,
  componentCategoryMeta,
  componentsByCategory,
  type ComponentCategory,
} from "@/content/components";
import { exampleRegistry } from "@/components/examples/registry";

export function ComponentsView({
  initialCat,
}: {
  initialCat: ComponentCategory;
}) {
  const [cat, setCat] = React.useState<ComponentCategory>(initialCat);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [cat]);

  const items = componentsByCategory(cat).filter((c) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (c.nameZh + c.nameEn + c.desc + c.usage).toLowerCase().includes(s);
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {componentCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-md px-2.5 py-1 text-sm transition-colors ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {componentCategoryMeta[c]}
            </button>
          ))}
        </div>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索组件…"
          className="max-w-xs"
        />
      </div>

      <div className="space-y-3">
        {items.map((c) => (
          <Card key={c.nameEn} id={c.nameEn} className="scroll-mt-20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                {c.nameZh}
                <span className="text-xs font-normal text-muted-foreground">
                  {c.nameEn}
                </span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {componentCategoryMeta[c.cat]}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>{c.desc}</p>
              <div className="rounded-md bg-muted/50 p-3">
                <p className="font-medium">使用场景</p>
                <p className="text-muted-foreground">{c.usage}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  示例
                </p>
                <ExampleBlock nameEn={c.nameEn} html={c.example} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ExampleBlock({
  nameEn,
  html,
}: {
  nameEn: string;
  html?: string;
}) {
  const Demo = exampleRegistry[nameEn];
  if (Demo) {
    return (
      <div className="preview rounded-md border bg-background p-4 text-sm">
        <Demo />
      </div>
    );
  }
  if (html && html.trim()) {
    return (
      <div
        className="preview rounded-md border bg-background p-4 text-sm [&_button]:cursor-default"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-md border border-dashed p-4 text-sm text-muted-foreground">
      <Skeleton className="h-5 w-24" />
      真实可交互示例待补（阶段 B 重写为 shadcn 组件）
    </div>
  );
}
