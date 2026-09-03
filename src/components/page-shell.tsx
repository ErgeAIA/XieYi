import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 全站版式统一原语（无状态、可作服务端组件）。
 * 这是页面外层容器与标题/空态层级的唯一来源，消除各页手写 div 版式方言。
 * 所有视觉令牌均来自 Tailwind v4 + shadcn 设计变量，禁止硬编码 hex。
 */

type Width = "default" | "wide";

/** 页面外层容器：统一最大宽度、横向 padding、纵向节奏。 */
export function PageContainer({
  width = "default",
  className,
  children,
}: {
  width?: Width;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full py-10 md:py-14 space-y-10 md:space-y-14",
        width === "wide" ? "max-w-6xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** 页面级标题区：标题 + 可选描述 + 可选操作区（如搜索框）。 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

/** 区块标题（h2 级，如组件画廊的分类标题）。可用 className 覆盖字号。 */
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn("text-lg font-semibold tracking-tight text-foreground", className)}
    >
      {children}
    </h2>
  );
}

/** 分组标签（h2 级小标签，如概念/资源的分类名）。 */
export function GroupLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-sm font-medium text-muted-foreground", className)}>
      {children}
    </h2>
  );
}

/** 统一空态（无搜索结果 / 分类下无内容等）。 */
export function EmptyState({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-border bg-muted/30 px-4 py-10 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
