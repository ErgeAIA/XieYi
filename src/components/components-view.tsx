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
  components,
  type ComponentCategory,
} from "@/content/components";
import { exampleRegistry } from "@/components/examples/registry";
import { useScrollSpy } from "@/components/scroll-spy";

export function ComponentsView({
  initialCat,
}: {
  initialCat: ComponentCategory | null;
}) {
  const [q, setQ] = React.useState("");
  const { activeCat, setActiveCat, setActiveComponent, setPinnedCat } =
    useScrollSpy();
  const s = q.trim().toLowerCase();

  // 初始定位：优先锚点，其次分类。点击跳转时把目标分类钉住，
  // 滚动过程中忽略 spy 的中间值，停止后再交还，避免中间菜单开合波动。
  React.useEffect(() => {
    const hash = window.location.hash
      ? window.location.hash.slice(1)
      : undefined;
    const target = hash ?? initialCat ?? undefined;
    if (!target) return;

    let pinCat: string | null = null;
    if (initialCat) {
      pinCat = initialCat;
    } else if (hash) {
      const comp = components.find((c) => c.nameEn === hash);
      pinCat = comp ? comp.cat : null;
    }
    if (pinCat) setPinnedCat(pinCat);

    requestAnimationFrame(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const clear = () => setPinnedCat(null);
    let debounce: number | undefined;
    const onScroll = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(clear, 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", clear, { once: true });
    const hardTimer = window.setTimeout(clear, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", clear);
      window.clearTimeout(debounce);
      window.clearTimeout(hardTimer);
    };
  }, [initialCat, setPinnedCat]);

  // 分类区块 scroll-spy：当前分类展开、其余折叠
  React.useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spy-cat]")
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        const cat = visible[0].target.getAttribute("data-spy-cat");
        if (cat) setActiveCat(cat);
      },
      { rootMargin: "-72px 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActiveCat, q]);

  // 组件卡片 scroll-spy：高亮正在看的组件
  React.useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spy-component]")
    );
    if (!cards.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        const id = visible[0].target.id;
        if (id) setActiveComponent(id);
      },
      { rootMargin: "-72px 0px -70% 0px", threshold: 0 }
    );
    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActiveComponent, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {componentCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                document
                  .getElementById(c)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`rounded-md px-2.5 py-1 text-sm transition-colors ${
                activeCat === c
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

      {componentCategories.map((cat) => {
        const items = componentsByCategory(cat).filter((c) => {
          if (!s) return true;
          return (
            c.nameZh + c.nameEn + c.desc + c.usage
          ).toLowerCase().includes(s);
        });
        if (!items.length) return null;
        return (
          <section
            key={cat}
            id={cat}
            data-spy-cat={cat}
            className="scroll-mt-16 space-y-3"
          >
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {componentCategoryMeta[cat]}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {items.length} 个
              </span>
            </h2>
            <div className="space-y-3">
              {items.map((c) => (
                <Card
                  key={c.nameEn}
                  id={c.nameEn}
                  data-spy-component={c.nameEn}
                  className="scroll-mt-20"
                >
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
                      <ExampleBlock
                        nameEn={c.nameEn}
                        cat={c.cat}
                        html={c.example}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ComponentPlaceholder({ cat }: { cat: ComponentCategory }) {
  switch (cat) {
    case "charts":
      return (
        <div className="flex h-32 items-end gap-3">
          {[48, 72, 56, 88, 64].map((h, i) => (
            <Skeleton key={i} className="w-8 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      );
    case "layout":
      return (
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      );
    case "form":
      return (
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-24" />
        </div>
      );
    case "navigation":
      return (
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
      );
    case "display":
      return (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      );
    case "feedback":
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      );
    case "overlay":
      return (
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-20 w-40" />
        </div>
      );
    case "chat":
      return (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Skeleton className="h-8 w-1/2 rounded-full" />
          </div>
          <div className="flex justify-start">
            <Skeleton className="h-8 w-1/3 rounded-full" />
          </div>
        </div>
      );
    case "extra":
    default:
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      );
  }
}

function ExampleBlock({
  nameEn,
  cat,
  html,
}: {
  nameEn: string;
  cat: ComponentCategory;
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
    <div className="space-y-3 rounded-md border border-dashed p-4">
      <ComponentPlaceholder cat={cat} />
      <p className="text-xs text-muted-foreground">
        示例补全中，可先参考上方的使用场景
      </p>
    </div>
  );
}
