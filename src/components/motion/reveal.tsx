"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 滚动进入揭示。用 IntersectionObserver 而非 scroll 监听（禁 window.addEventListener('scroll')）。
 * 隐藏态写在 CSS 的 prefers-reduced-motion: no-preference 里，因此：
 * - 偏好减少动效 -> 从首帧就可见，绝无闪烁
 * - 关闭 JS -> <noscript> 兜底样式强制可见
 * - 正常情况 -> 元素进入视口后才加 reveal-in，播放一次即 disconnect
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
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
