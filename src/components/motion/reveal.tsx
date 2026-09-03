"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 模块级单例：所有 Reveal 共用一个 IntersectionObserver，
// 避免 60+ 卡片各自创建 observer 的开销（A2：极致流畅）。
const registry = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = registry.get(entry.target);
        observer!.unobserve(entry.target);
        registry.delete(entry.target);
        cb?.();
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
  );
  return observer;
}

/**
 * 滚动进入揭示。用单例 IntersectionObserver（A2）而非每实例各建一个。
 * 隐藏态写在 CSS 的 prefers-reduced-motion: no-preference 里，因此：
 * - 偏好减少动效 -> 从首帧就可见，绝无闪烁
 * - 关闭 JS -> <noscript> 兜底样式强制可见
 * - 正常情况 -> 元素进入视口后才加 reveal-in，播放一次即 unobserve
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.classList.add("reveal-in");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    registry.set(el, reveal);
    getObserver().observe(el);
    return () => {
      getObserver().unobserve(el);
      registry.delete(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
