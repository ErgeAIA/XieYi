"use client";

import * as React from "react";

/**
 * 打字机文字（循环播放）：完整句停留 → 逐字退格删除 → 逐字重新打出 → 循环。
 * 文字由 React state 直接控制，确保逐字绝对完整、可无限循环；
 * SSR / 无 JS / 屏幕阅读器均拿到完整句。关闭动效（prefers-reduced-motion 或
 * html[data-motion="off"]）时直接静态显示全文，不进入循环。
 */
type Phase = "holdFull" | "erase" | "holdEmpty" | "type";

export function Typewriter({
  text,
  className,
  step = 80,
  eraseStep = 45,
  holdFull = 1400,
  holdEmpty = 500,
  startDelay = 1500,
}: {
  text: string;
  className?: string;
  /** 打字每字间隔（ms） */
  step?: number;
  /** 退格每字间隔（ms） */
  eraseStep?: number;
  /** 完整句停留时长（ms） */
  holdFull?: number;
  /** 空句停留时长（ms） */
  holdEmpty?: number;
  /** 首次进入循环前的起始延迟（ms），用于与 hero「写意」入场错峰 */
  startDelay?: number;
}) {
  // 首屏/无 JS/读屏：渲染完整句子，避免闪烁与内容缺失。
  const [display, setDisplay] = React.useState(text);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;

    const motionOff = () =>
      mq.matches || document.documentElement.getAttribute("data-motion") === "off";

    const run = () => {
      clearTimeout(timer);
      if (motionOff()) {
        setDisplay(text);
        return;
      }
      // 从完整句开始：先停留，再退格→重打，形成循环（首屏已显示完整句，无闪烁）。
      let i = text.length;
      let phase: Phase = "holdFull";

      const tick = () => {
        if (motionOff()) {
          setDisplay(text);
          return;
        }
        switch (phase) {
          case "holdFull":
            phase = "erase";
            timer = setTimeout(tick, holdFull);
            break;
          case "erase":
            i -= 1;
            setDisplay(text.slice(0, i));
            if (i <= 0) {
              phase = "holdEmpty";
              timer = setTimeout(tick, holdEmpty);
            } else {
              timer = setTimeout(tick, eraseStep);
            }
            break;
          case "holdEmpty":
            phase = "type";
            timer = setTimeout(tick, holdEmpty);
            break;
          case "type":
            i += 1;
            setDisplay(text.slice(0, i));
            if (i >= text.length) {
              phase = "holdFull";
              timer = setTimeout(tick, holdFull);
            } else {
              timer = setTimeout(tick, step);
            }
            break;
        }
      };

      timer = setTimeout(tick, startDelay);
    };

    run();
    mq.addEventListener("change", run);
    return () => {
      clearTimeout(timer);
      mq.removeEventListener("change", run);
    };
  }, [text, step, eraseStep, holdFull, holdEmpty, startDelay]);

  return (
    <span className={className}>
      <span>{display}</span>
      <span className="tw-cursor" aria-hidden="true" />
    </span>
  );
}
