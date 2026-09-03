"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TreeNode {
  id: string;
  label: string;
  en?: string;
  href?: string;
  /** 该节点所属路由（用于判断同路由精确跳转） */
  route?: string;
  /** 对应页面 data-spy-item 值（最末级叶子高亮跟随） */
  spyItem?: string;
  /** 对应页面 data-spy-group 值（分组级 / 扁平叶子高亮跟随） */
  spyGroup?: string;
  count?: number;
  children?: TreeNode[];
}

export function TreeMenu({
  nodes,
  activeItemId,
  activeGroupId,
}: {
  nodes: TreeNode[];
  activeItemId?: string | null;
  activeGroupId?: string | null;
}) {
  const pathname = usePathname();

  const { nodeById, parentMap } = React.useMemo(() => {
    const byId = new Map<string, TreeNode>();
    const parent = new Map<string, string>();
    const walk = (list: TreeNode[], parentId?: string) => {
      for (const n of list) {
        byId.set(n.id, n);
        if (parentId) parent.set(n.id, parentId);
        if (n.children) walk(n.children, n.id);
      }
    };
    walk(nodes);
    return { nodeById: byId, parentMap: parent };
  }, [nodes]);

  const ancestors = React.useCallback(
    (id: string): string[] => {
      const res: string[] = [];
      let cur = parentMap.get(id);
      while (cur) {
        res.push(cur);
        cur = parentMap.get(cur);
      }
      return res;
    },
    [parentMap]
  );

  const [openSet, setOpenSet] = React.useState<Set<string>>(new Set());
  const [instantSet, setInstantSet] = React.useState<Set<string>>(new Set());

  // 点击权威性高亮：点中哪个菜单，哪个立即高亮，直到用户主动滚动才交还给 scroll-spy。
  // 这样「基础概念」这类无独立区块的顶层节点也能在被点击时稳定高亮自身。
  const [manualActiveId, setManualActiveId] = React.useState<string | null>(
    null
  );
  const programmatic = React.useRef(false);
  const programmaticTimer = React.useRef<number | undefined>(undefined);

  // 深链 / 初始定位：进入页面（或跨路由切换）时展开当前路由顶层节点；
  // 若 URL 含 hash / ?cat=，则展开到对应叶子并精确定位。
  // 依赖 pathname：SidebarNav 在 layout 中持久挂载，路由切换不会重挂本组件，
  // 故需借 pathname 变化重新触发，才能处理「点击其他页菜单跳到本页锚点」。
  /* eslint-disable react-hooks/set-state-in-effect -- 深链/初始定位必须在 effect 内更新展开状态，属该规则的合法例外（与 components-view 同类模式） */
  React.useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    const open = new Set<string>();
    const top = nodes.find((n) => n.href === pathname);
    if (top) open.add(top.id);
    let leaf: TreeNode | null = null;
    if (hash) {
      leaf =
        nodeById.get(hash) ??
        [...nodeById.values()].find((n) => n.spyItem === hash) ??
        null;
    } else if (cat) {
      leaf = nodeById.get(cat) ?? null;
    }
    if (leaf) {
      ancestors(leaf.id).forEach((a) => open.add(a));
      open.add(leaf.id);
    }
    setOpenSet(open);
    setInstantSet(new Set(open));
    setManualActiveId(null);
    if (leaf) {
      const t = window.setTimeout(() => {
        const el = document.getElementById(leaf!.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setInstantSet(new Set());
      }, 80);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, nodes]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const toggle = (id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setInstantSet((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // 跳转：同路由自行精确定位（瞬时展开全部祖先 + 滚动），跨路由交给 Link，
  // 由目标页挂载时按 hash / ?cat= 定位。
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, node: TreeNode) => {
    if (!node.href) return;
    const sameRoute = node.route === pathname;
    if (sameRoute) {
      e.preventDefault();
      const ids = [node.id, ...ancestors(node.id)];
      setOpenSet((prev) => new Set([...prev, ...ids]));
      setInstantSet(new Set(ids));
      // 点击权威性：立即高亮被点中的节点，直到用户主动滚动才交还 spy。
      // 程序化平滑滚动期间不清除；用标记 + 兜底定时器防 scrollend 丢失。
      setManualActiveId(node.id);
      programmatic.current = true;
      window.clearTimeout(programmaticTimer.current);
      programmaticTimer.current = window.setTimeout(() => {
        programmatic.current = false;
      }, 1200);
      history.replaceState(null, "", node.href);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const el = document.getElementById(node.id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            // 一级菜单等没有对应锚点元素，点击后回到页顶，避免当前滚动位置
            // 停留在原锚点导致页头被顶栏遮住。
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          setInstantSet(new Set());
        })
      );
    }
  };

  // 高亮只给「最具体的命中节点」：叶子 > 分组 > 一级路由。
  // 祖先只保持展开，不额外加背景。
  const activeLeafId = React.useMemo(() => {
    if (!activeItemId) return null;
    const walk = (list: TreeNode[]): string | null => {
      for (const n of list) {
        if (n.spyItem === activeItemId) return n.id;
        if (n.children) {
          const found = walk(n.children);
          if (found) return found;
        }
      }
      return null;
    };
    return walk(nodes);
  }, [nodes, activeItemId]);

  const activeGroupNodeId = React.useMemo(() => {
    if (activeLeafId) return null;
    if (!activeGroupId) return null;
    const walk = (list: TreeNode[]): string | null => {
      for (const n of list) {
        if (n.spyGroup === activeGroupId) return n.id;
        if (n.children) {
          const found = walk(n.children);
          if (found) return found;
        }
      }
      return null;
    };
    return walk(nodes);
  }, [nodes, activeGroupId, activeLeafId]);

  const activeRouteId = React.useMemo(() => {
    if (activeLeafId || activeGroupNodeId) return null;
    const n = nodes.find((n) => n.route === pathname);
    return n?.id ?? null;
  }, [nodes, pathname, activeLeafId, activeGroupNodeId]);

  // 用户主动滚动（非点击触发的程序化滚动）后，交还 scroll-spy 决定高亮。
  React.useEffect(() => {
    const onScrollEnd = () => {
      if (programmatic.current) {
        programmatic.current = false;
        return;
      }
      setManualActiveId(null);
    };
    window.addEventListener("scrollend", onScrollEnd);
    return () => window.removeEventListener("scrollend", onScrollEnd);
  }, []);

  const isActive = (node: TreeNode): boolean =>
    node.id === manualActiveId ||
    (manualActiveId == null &&
      (node.id === activeLeafId ||
        node.id === activeGroupNodeId ||
        node.id === activeRouteId));

  const renderNode = (node: TreeNode, depth: number) => {
    const hasChildren = !!node.children && node.children.length > 0;
    const open = openSet.has(node.id);
    const instant = instantSet.has(node.id);
    // 仅当前命中节点（叶子/分组/一级路由）高亮，祖先只保持展开，不加背景。
    const active = isActive(node);

    if (!hasChildren) {
      return (
        <Link
          key={node.id}
          href={node.href ?? "#"}
          onClick={(e) => jump(e, node)}
          className={`group relative flex items-baseline gap-1.5 rounded-md py-1 pr-2 transition-colors duration-200 ${
            depth === 0 ? "text-sm" : "text-xs"
          } ${
            active
              ? "bg-primary/10 font-medium text-primary"
              : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
          }`}
          style={{ paddingLeft: `${depth * 12 + 10}px` }}
        >
          <span
            className={`pointer-events-none absolute left-0 top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
              active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          />
          {node.label}
          {node.en && (
            <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
              {node.en}
            </span>
          )}
        </Link>
      );
    }

    return (
      <div key={node.id}>
        <div
          className={`group relative flex items-center rounded-md transition-colors duration-200 ${
            active
              ? "bg-primary/10 font-medium text-primary"
              : "text-foreground/80 hover:bg-accent/50 hover:text-foreground"
          }`}
          style={{ paddingLeft: `${depth * 12 + 2}px`, paddingRight: 8 }}
        >
          <span
            className={`pointer-events-none absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
              active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          />
          <button
            type="button"
            onClick={() => toggle(node.id)}
            aria-expanded={open}
            aria-label={open ? "收起" : "展开"}
            className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground/70 hover:text-foreground"
          >
            <svg
              className={`size-3 transition-transform duration-200 ${
                open ? "rotate-90" : ""
              }`}
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 2.5 7.5 6 4 9.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            href={node.href ?? "#"}
            onClick={(e) => jump(e, node)}
            className="flex flex-1 items-baseline gap-1.5 py-1.5 text-sm"
          >
            {node.label}
            {node.en && (
              <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
                {node.en}
              </span>
            )}
            {typeof node.count === "number" && (
              <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground/70">
                {node.count}
              </span>
            )}
          </Link>
        </div>
        <div
          className={`overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] ${
            instant ? "transition-none" : ""
          } ${
            open
              ? "max-h-[2000px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-0.5">
            {node.children!.map((child) => (
              <div key={child.id}>{renderNode(child, depth + 1)}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-0.5">{nodes.map((n) => renderNode(n, 0))}</div>
  );
}
