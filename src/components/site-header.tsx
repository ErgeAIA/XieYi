"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { CommandSearch } from "@/components/command-search";
import { SidebarNav } from "@/components/site-sidebar";

export function SiteHeader() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex min-h-14 items-center gap-3 border-b bg-background/80 px-4 py-2.5 backdrop-blur">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="size-4" />
              <span className="sr-only">菜单</span>
            </Button>
          }
        />
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>写意 · 导航</SheetTitle>
          </SheetHeader>
          <div className="mt-4 px-2">
            <SidebarNav />
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/" className="flex flex-col gap-0.5 leading-tight">
        <span className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight">写意</span>
          <span className="hidden text-xs tracking-wide text-muted-foreground sm:inline">
            XIEYI
          </span>
        </span>
        <span className="hidden max-w-[36ch] truncate text-[11px] text-muted-foreground/70 lg:block">
          以意运码，码落而器成。胸中之构，言而为品。
        </span>
      </Link>

      <div className="ml-auto flex w-full max-w-sm items-center gap-2">
        <CommandSearch />
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={toggle}
        aria-label="切换主题"
      >
        {theme === "dark" ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )}
      </Button>
    </header>
  );
}
