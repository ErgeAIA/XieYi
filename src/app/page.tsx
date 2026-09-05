import { Reveal } from "@/components/motion/reveal";
import { PageContainer, SectionTitle } from "@/components/page-shell";
import { HomeBento, HomeAuthorCard } from "@/components/home-demos";
import { HeroBloom } from "@/components/hero-bloom";
import { HeroConstellation } from "@/components/hero-constellation";
import { Typewriter } from "@/components/typewriter";

export default function Home() {
  return (
    <PageContainer width="wide" className="space-y-14 md:space-y-20">
      {/* Hero：非对称 split，左文案右实时预览；背景为 2D Canvas 墨润开动画 */}
      <section className="relative grid items-center gap-10 overflow-hidden rounded-3xl border border-border/60 bg-card/20 p-8 md:p-14 lg:grid-cols-12 lg:items-start lg:gap-14 lg:pl-10">
        <HeroBloom className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(0,0,0,0.22),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_45%,rgba(0,0,0,0.50),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        <HeroConstellation />
        <Reveal className="relative z-10 space-y-5 lg:col-span-7 lg:pointer-events-none lg:self-start">
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
        </Reveal>

        <Reveal className="relative z-10 lg:col-span-5 lg:self-center" delay={120}>
          <HomeAuthorCard />
        </Reveal>
      </section>

      {/* 组件速览：bento，4 个单元对应 4 项内容，无空单元格 */}
      <Reveal>
        <section className="space-y-4">
          <SectionTitle className="text-2xl">墨落即活，来调一调</SectionTitle>
          <HomeBento />
        </section>
      </Reveal>
    </PageContainer>
  );
}
