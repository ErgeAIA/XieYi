import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { backendTopics } from "@/content/backend";

export const metadata: Metadata = {
  title: "后端相关 · 写意",
  description:
    "API、数据库、认证鉴权、部署运行、缓存、文件存储，用准确术语与 AI 对齐后端概念。",
};

export default function BackendPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">后端相关</h1>
        <p className="text-sm text-muted-foreground">
          对前后端不熟时，用准确术语和 AI 对齐后端概念，让它生成对的代码。
        </p>
      </div>

      <div className="space-y-4">
        {backendTopics.map((t, i) => (
          <Reveal key={t.id} delay={i * 60}>
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {t.name}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {t.note}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>{t.explain}</p>
                <div>
                  <span className="font-medium">关键术语：</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {t.terms.join(" · ")}
                  </span>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <p className="font-medium">可以这样问 AI</p>
                  <p className="mt-1 font-mono text-xs leading-relaxed">
                    {t.examplePrompt}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
