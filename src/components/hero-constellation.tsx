"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMotionPref } from "@/components/motion-provider";

type Star = {
  key: string;
  name: string; // 星名（天枢）
  alias: string; // 雅称（贪狼）
  label: string; // 一级页中文名（仅用于 aria / title）
  href: string; // 对应一级路由
  x: number; // 块内百分比 0-100
  y: number; // 块内百分比 0-100
  labelPos?: "top" | "bottom" | "left" | "right"; // 标签方位，默认下方
  aux?: boolean; // 辅星（洞明/隐元）：隐星，炸亮更轻、常亮更暗
  hover: string; // hover 提示：「分区雅称·入口动作」
};

// 北斗主七星：按真实天区方位——勺斗在右上（天枢最高、天璇居其下），
// 斗柄向左下延伸，瑶光收在左下角；左辅在瑶光右上方，右弼在开阳/瑶光下方。
// X 从左到右：瑶光、左辅、右弼、开阳、玉衡、天权、天玑、天枢、天璇
// Y 自下而上：右弼、天玑、天璇、瑶光、天权、玉衡、开阳、左辅、天枢
// 数组顺序即点亮顺序：天枢→天璇→天玑→天权→玉衡→开阳→瑶光→洞明→隐元
const STARS: Star[] = [
  { key: "tianshu", name: "天枢", alias: "贪狼", label: "首页", href: "/", x: 80, y: 14, labelPos: "top", hover: "山门·回到首页" },
  { key: "tianxuan", name: "天璇", alias: "巨门", label: "基础概念", href: "/concepts", x: 82, y: 72, hover: "筑基·从基础概念开始" },
  { key: "tianji", name: "天玑", alias: "禄存", label: "提示词指南", href: "/prompts", x: 59, y: 80, hover: "真言·查看提示词指南" },
  { key: "tianquan", name: "天权", alias: "文曲", label: "页面画廊", href: "/examples", x: 54, y: 56, labelPos: "top", hover: "图卷·浏览页面画廊" },
  { key: "yuheng", name: "玉衡", alias: "廉贞", label: "词典", href: "/glossary", x: 38, y: 48, hover: "玉简·查不懂的术语" },
  { key: "kaiyang", name: "开阳", alias: "武曲", label: "框架", href: "/frameworks", x: 26, y: 40, labelPos: "top", hover: "阵法·挑选趁手框架" },
  { key: "yaoguang", name: "瑶光", alias: "破军", label: "前端组件", href: "/components", x: 11, y: 64, hover: "法器·浏览前端组件" },
  // 辅星：不连线，隐星——最后点亮，光效更轻
  { key: "dongming", name: "洞明", alias: "左辅", label: "后端相关", href: "/backend", x: 14, y: 30, aux: true, hover: "灵脉·探后端脉络" },
  { key: "yinyuan", name: "隐元", alias: "右弼", label: "参考资源", href: "/resources", x: 23, y: 86, aux: true, hover: "藏经阁·翻参考资源" },
];

// 主七星连线（勺子），辅星不连
const SEGMENTS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
];

export function HeroConstellation() {
  const { motionOn } = useMotionPref();

  return (
    <div
      className={cn(
        "hero-constellation pointer-events-none absolute inset-0 z-[1] hidden lg:block",
        motionOn && "is-anim",
      )}
    >
      {/* 星座块：整体可移动，内部坐标保持北斗比例 */}
      <div className="hero-constellation-block absolute left-[-4%] top-[40%] h-[60%] w-[70%]">
        {/* 连线层：装饰性 */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {SEGMENTS.map(([a, b], i) => {
            const s = STARS[a];
            const e = STARS[b];
            const segStyle: React.CSSProperties = {};
            (segStyle as Record<string, string | number>)["--d"] = Math.max(a, b);
            return (
              <line
                key={i}
                className="hero-seg"
                x1={s.x}
                y1={s.y}
                x2={e.x}
                y2={e.y}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
                style={segStyle}
              />
            );
          })}
        </svg>

        {/* 星点层：每颗可点击跳转对应一级页 */}
        {STARS.map((s, i) => {
          const starStyle: React.CSSProperties = {
            left: `${s.x}%`,
            top: `${s.y}%`,
          };
          (starStyle as Record<string, string | number>)["--i"] = i;
          return (
            <Link
              key={s.key}
              href={s.href}
              className="hero-star"
              data-aux={s.aux ? "" : undefined}
              style={starStyle}
              aria-label={`${s.hover}（${s.name}·${s.alias}）`}
              title={s.hover}
            >
              <span className="hero-star-label" data-pos={s.labelPos ?? "bottom"}>{`${s.name}·${s.alias}`}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
