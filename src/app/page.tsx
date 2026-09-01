import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    href: "/concepts",
    title: "基础概念",
    desc: "Agent、Skill、Prompt、Context、Token……用准确术语和 AI 沟通。",
  },
  {
    href: "/components",
    title: "前端组件",
    desc: "67 个 shadcn/ui 组件，按 9 大类拆解，配使用场景与示例。",
  },
  {
    href: "/examples",
    title: "示例",
    desc: "Dashboard、IDE、登录、看板等完整页面级示例。",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 py-8">
      <section className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground">
          Vibe Coding 指南
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">写意</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          写意者，以意运码，码落而器成。胸中之构，言而为品。
        </p>
        <p className="text-sm text-muted-foreground">
          专注产品设计，把实现交给 AI——技术不再是门槛，创意得以舒展。
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/concepts"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            从基础概念开始
          </Link>
          <Link
            href="/components"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            浏览前端组件
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="block">
            <Card className="h-full transition-colors hover:border-foreground/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {s.desc}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
