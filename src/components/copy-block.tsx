"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * 可复制代码块：等宽样式 + 右上角复制徽章（图标，点击复制原始文本）。
 * 用于「可直接发给 AI 的提示词」，无需 Markdown 解析库。
 */
export function CopyBlock({
  value,
  className,
  label,
  wrap = true,
}: {
  value: string;
  className?: string;
  label?: string;
  /** true 时文本自动换行（卡片撑高），false 时横向滚动 */
  wrap?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(() => {
    const clipboard = navigator.clipboard;
    if (!clipboard) return;
    clipboard.writeText(value).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  }, [value]);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "已复制" : label ? `复制${label}` : "复制"}
        className="absolute right-1.5 top-1.5 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background/90 text-muted-foreground backdrop-blur transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre
        className={cn(
          "copy-block rounded-md border bg-muted/40 p-3 pr-10 pt-3 font-mono text-xs leading-relaxed text-foreground",
          wrap ? "whitespace-pre-wrap break-words" : "overflow-x-auto"
        )}
      >
        <code>{value}</code>
      </pre>
    </div>
  );
}
