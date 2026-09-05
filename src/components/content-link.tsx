"use client";

import Link from "next/link";
import { markContentNav } from "@/lib/content-nav";

/** 内容链接（服务端组件用）：SPA 跳转并打「来自内容」标记，侧栏不关联展开/高亮。 */
export function ContentLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link href={href} onClick={markContentNav} className={className}>
      {label}
    </Link>
  );
}
