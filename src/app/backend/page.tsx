import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { backendTopics } from "@/content/backend";

export default function BackendPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">后端相关</h1>
        <p className="text-sm text-muted-foreground">
          对前后端不熟时，用准确术语和 AI 对齐后端概念，让它生成对的代码。
        </p>
      </div>

      <div className="space-y-4">
        {backendTopics.map((t) => (
          <Card key={t.id}>
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
        ))}
      </div>
    </div>
  );
}
