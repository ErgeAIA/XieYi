"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { concepts } from "@/content/concepts";
import { components } from "@/content/components";

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        <SearchIcon className="size-4" />
        <span>搜索组件 / 概念…</span>
        <kbd className="ml-auto rounded border bg-muted px-1.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="输入组件名、概念名…" />
        <CommandList>
          <CommandEmpty>未找到结果。</CommandEmpty>
          <CommandGroup heading="基础概念">
            {concepts.map((c) => (
              <CommandItem
                key={c.id}
                value={`${c.nameZh} ${c.nameEn}`}
                onSelect={() => go("/concepts")}
              >
                <span>{c.nameZh}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {c.nameEn}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="前端组件">
            {components.map((c) => (
              <CommandItem
                key={c.nameEn}
                value={`${c.nameZh} ${c.nameEn}`}
                onSelect={() => go(`/components?cat=${c.cat}#${c.nameEn}`)}
              >
                <span>{c.nameZh}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {c.nameEn}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
