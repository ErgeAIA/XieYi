import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/site-sidebar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "写意 · Vibe Coding 指南",
  description: "写意者，以意运码，码落而器成。胸中之构，言而为品。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh"
      className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ThemeProvider>
          <TooltipProvider>
            <div className="flex min-h-screen">
              <aside className="hidden w-60 shrink-0 border-r bg-sidebar p-4 md:block">
                <div className="mb-4 px-3 text-lg font-semibold tracking-tight">
                  写意
                </div>
                <Suspense fallback={null}>
                  <SidebarNav />
                </Suspense>
              </aside>
              <div className="flex min-w-0 flex-1 flex-col">
                <SiteHeader />
                <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
