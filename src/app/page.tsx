import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { HomeBento, HomeHeroDemo } from "@/components/home-demos";
import { HeroBloom } from "@/components/hero-bloom";
import { Typewriter } from "@/components/typewriter";

const entries = [
  {
    href: "/concepts",
    title: "基础概念",
    desc: "Agent、Skill、Prompt、Context、Token，用准确术语和 AI 沟通。",
  },
  {
    href: "/components",
    title: "前端组件",
    desc: "67 个组件按 9 大类拆解，配使用场景与可交互示例。",
  },
  {
    href: "/examples",
    title: "示例",
    desc: "Dashboard、IDE、看板、登录等 9 个完整页面级布局。",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-20 py-10 md:space-y-24 md:py-14">
      {/* Hero：非对称 split，左文案右实时预览；背景为 three.js 火山余烬粒子场 */}
      <section className="relative grid items-center gap-10 overflow-hidden rounded-3xl border border-border/60 bg-card/20 p-8 md:p-14 lg:grid-cols-12 lg:gap-14">
        <HeroBloom className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(0,0,0,0.22),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_45%,rgba(0,0,0,0.50),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        <Reveal className="relative z-10 space-y-5 lg:col-span-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Vibe Coding 参考
          </p>
          <h1
            className="font-brush text-[7.5rem] font-semibold leading-none tracking-normal md:text-[9rem]"
            aria-label="写意"
          >
            <span className="hero-glyph" aria-hidden="true">
              <span className="hero-glyph-inner">写</span>
            </span>
            <span className="hero-glyph" aria-hidden="true">
              <span className="hero-glyph-inner">意</span>
            </span>
          </h1>
          <p className="max-w-[46ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            <Typewriter text="用准确术语讲清组件与需求，让 AI 写出能直接交付的界面。" />
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/concepts" className={cn(buttonVariants())}>
              从基础概念开始
            </Link>
            <Link
              href="/components"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              浏览前端组件
            </Link>
          </div>
        </Reveal>

        <Reveal className="relative z-10 lg:col-span-5" delay={120}>
          <HomeHeroDemo />
          <p className="mt-2 text-xs text-muted-foreground">
            以上组件可直接操作，不是截图。
          </p>
        </Reveal>
      </section>

      {/* 入口目录：行列表（与 hero 的 split、下方的 bento 属不同版式家族） */}
      <Reveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">从这里开始</h2>
          <div className="divide-y border-t">
            {entries.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="group flex items-center gap-4 py-5 transition-colors hover:bg-muted/40 hover-lift"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-medium">
                    {e.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {e.desc}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 组件速览：bento，4 个单元对应 4 项内容，无空单元格 */}
      <Reveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            组件可以直接操作
          </h2>
          <HomeBento />
        </section>
      </Reveal>
    </div>
  );
}
