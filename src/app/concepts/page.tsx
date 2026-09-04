"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  PageContainer,
  PageHeader,
  GroupLabel,
  FieldLabel,
} from "@/components/page-shell";
import { CopyBlock } from "@/components/copy-block";
import { concepts, conceptGroups, conceptGroupMeta, conceptGroupDesc } from "@/content/concepts";

export default function ConceptsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="基础概念"
        description="把 Vibe Coding 里反复出现的底层概念讲清楚，先建立共同语言，再让 AI 生成对的代码。"
      />

      {conceptGroups.map((g) => {
        const items = concepts.filter((c) => c.group === g);
        if (items.length === 0) return null;
        return (
          <section key={g} id={g} className="scroll-anchor space-y-3">
            <GroupLabel data-spy-group={g}>{conceptGroupMeta[g]}</GroupLabel>
            <p className="text-sm text-muted-foreground">{conceptGroupDesc[g]}</p>
            <div className="space-y-3">
              {items.map((c, i) => (
                <Reveal key={c.id} delay={i * 50}>
                  <Card
                    id={c.id}
                    data-spy-group={g}
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
                        <FieldLabel>定义：</FieldLabel>
                        {c.definition}
                      </p>
                      <p>
                        <FieldLabel>类比：</FieldLabel>
                        {c.analogy}
                      </p>
                      <div className="rounded-md bg-muted/50 p-3">
                        <p>
                          <FieldLabel>与 AI 协作</FieldLabel>
                        </p>
                        <p className="text-muted-foreground">{c.aiUsage.strategy}</p>
                        <CopyBlock
                          value={c.aiUsage.example}
                          className="mt-1"
                          label="与 AI 协作示例"
                        />
                      </div>
                      {c.recommendations && c.recommendations.length > 0 && (
                        <div className="rounded-md bg-muted/50 p-3">
                          <p>
                            <FieldLabel>推荐</FieldLabel>
                          </p>
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

    </PageContainer>
  );
}
