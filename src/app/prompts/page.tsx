"use client";

import {
  PageContainer,
  PageHeader,
  GroupLabel,
  FieldLabel,
} from "@/components/page-shell";
import { CopyBlock } from "@/components/copy-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  promptLibrary,
  promptCategoryOrder,
  promptCategoryMeta,
  promptCategoryMetaEn,
  promptCategoryDesc,
  promptCategoryAlias,
  promptOriginGroups,
  type PromptLibraryItem,
  type PromptOrigin,
} from "@/content/prompt-library";

export default function PromptsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="真言·提示词指南"
        en="Prompt Guide"
        description="三个来源，一样标准：官学（Claude Code 官方 52 条，按场景分类）、撷英（网络经典，条条署名）、心法（本站主理人的自用真言）。直接复制即可使用。"
      />

      {promptOriginGroups.map((group) => {
        const items = promptLibrary.filter(
          (p) => (p.origin ?? "official") === group.id
        );
        return (
          <section key={group.id} className="space-y-4">
            <div>
              <GroupLabel>
                {group.alias}·{group.name}
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  {group.en}
                </span>
              </GroupLabel>
              <p className="mt-1 text-sm text-muted-foreground">
                {group.explain}
              </p>
            </div>

            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
                整理中，敬请期待——有好真言也欢迎推荐。
              </div>
            ) : group.id === "official" ? (
              // 官学区：15 个场景子分组原样保留
              <div className="space-y-8">
                {promptCategoryOrder.map((c) => {
                  const catItems = items.filter((p) => p.category === c);
                  if (catItems.length === 0) return null;
                  return (
                    <section key={c} className="space-y-3">
                      <GroupLabel>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-primary">
                          {promptCategoryAlias[c]}·{c}
                        </span>
                        {promptCategoryMeta[c]}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          {promptCategoryMetaEn[c]}
                        </span>
                      </GroupLabel>
                      <p className="text-sm text-muted-foreground">
                        {promptCategoryDesc[c]}
                      </p>
                      <div className="columns-1 gap-3 sm:columns-2">
                        {catItems.map((p, i) => (
                          <Reveal key={p.id} delay={i * 30}>
                            <PromptCard p={p} />
                          </Reveal>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              // 撷英 / 心法区：平铺
              <div className="columns-1 gap-3 sm:columns-2">
                {items.map((p, i) => (
                  <Reveal key={p.id} delay={i * 30}>
                    <PromptCard p={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </PageContainer>
  );
}

function PromptCard({ p }: { p: PromptLibraryItem }) {
  const origin: PromptOrigin = p.origin ?? "official";
  return (
    <Card
      className={
        "hover-lift mb-3 break-inside-avoid" +
        (p.isStarter || origin === "own"
          ? " border-primary/40 bg-primary/5"
          : "")
      }
    >
      <CardHeader className="pb-2">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {promptCategoryMeta[p.category]}
          </span>
          {p.isStarter ? (
            <span className="rounded bg-primary/15 px-1.5 py-0.5 text-xs font-normal text-primary">
              从这里开始
            </span>
          ) : null}
          {origin === "own" ? (
            <span className="rounded bg-primary/15 px-1.5 py-0.5 text-xs font-normal text-primary">
              心法
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
        {origin === "web" && p.source ? (
          <p className="text-xs text-muted-foreground">
            <FieldLabel>来源：</FieldLabel>
            {p.source}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
