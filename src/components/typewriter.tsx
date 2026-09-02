import * as React from "react";

/**
 * 打字机文字：把文本逐字拆成 .tw-char，由 CSS 按 --i 错峰瞬时显现（纯 CSS，无 JS、无 SSR 闪烁、
 * 屏幕阅读器仍读全句）。末端 .tw-cursor 在打字期间闪烁，打完后淡出。
 * 时序变量 --tw-step(每字间隔)/--tw-start(起始延迟)/--tw-total(总时长) 以内联 CSS 变量提供，
 * 受 globals.css 中 prefers-reduced-motion / html[data-motion="off"] 门控：关闭时直接显示全文。
 */
export function Typewriter({
  text,
  className,
  step = 70,
  startDelay = 1500,
}: {
  text: string;
  className?: string;
  /** 每字间隔（ms） */
  step?: number;
  /** 起始延迟（ms），用于与 hero「写意」入场错峰 */
  startDelay?: number;
}) {
  const chars = Array.from(text);
  const total = startDelay + chars.length * step;
  return (
    <span
      className={className}
      style={
        {
          "--tw-step": `${step}ms`,
          "--tw-start": `${startDelay}ms`,
          "--tw-total": `${total}ms`,
        } as React.CSSProperties
      }
    >
      {chars.map((ch, i) => (
        <span key={i} className="tw-char" style={{ "--i": i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
      <span className="tw-cursor" aria-hidden="true" />
    </span>
  );
}
