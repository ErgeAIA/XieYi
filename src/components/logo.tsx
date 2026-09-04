import * as React from "react";

/**
 * 写意 Xieyi 站标：{X:Y}
 * - 花括号外壳 = "代码"，复用最早「莫名其妙」那个变体的毛笔单笔花括号（左 { 开口朝右、右 } 开口朝左）
 * - X : Y = XIEYI 首尾字母，毛笔撇捺笔触；冒号为两枚毛笔点，呼应 key:value
 * - 整枚纯矢量（无字体依赖）：花括号为描边笔触，X/Y 为填充笔触，缩放清晰、可作 favicon
 */
export function Logo({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const width = size * 2.5;
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 250 100"
      fill="none"
      role="img"
      aria-label="写意 Xieyi · 以意运码"
      className={className}
    >
      {/* 花括号外壳：毛笔单笔花括号 */}
      <path
        d="M42 22 C24 18 10 28 16 42 C19 49 19 51 16 58 C10 72 24 82 42 78"
        stroke="var(--primary)"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M212 22 C230 18 244 28 238 42 C235 49 235 51 238 58 C244 72 230 82 212 78"
        stroke="var(--primary)"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <g fill="var(--primary)">
        {/* 毛笔 X（XIEYI 首字母） */}
        <path d="M71.88 32.12 Q86.22 57.78 111.88 72.12 L116.12 67.88 Q101.78 42.22 76.12 27.88 Z" />
        <path d="M116.12 32.12 Q101.78 57.78 76.12 72.12 L71.88 67.88 Q86.22 42.22 111.88 27.88 Z" />
        {/* 冒号 : 两枚毛笔点 */}
        <circle cx="138" cy="40" r="5.5" />
        <circle cx="138" cy="60" r="5.5" />
        {/* 毛笔 Y（XIEYI 尾字母） */}
        <path d="M150 26 Q164 39 177 52 L181 47 Q169 36 154 22 Z" />
        <path d="M204 26 Q190 39 177 52 L173 47 Q185 36 200 22 Z" />
        <path d="M173 50 Q177 63 173 78 L181 78 Q177 63 181 50 Z" />
      </g>
    </svg>
  );
}
