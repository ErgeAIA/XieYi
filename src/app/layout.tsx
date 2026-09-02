import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/site-sidebar";
import { ScrollSpyProvider } from "@/components/scroll-spy";

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
  description: "写意，以意运码，码落而器成。胸中之构，言而为品。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh"
      className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ThemeProvider>
          <TooltipProvider>
            <ScrollSpyProvider>
              <div className="flex min-h-screen">
                <aside className="sticky top-0 hidden h-screen w-80 shrink-0 self-start overflow-y-auto border-r border-sidebar-border bg-sidebar p-5 md:block">
                  <div className="mb-5 flex items-center gap-2 px-2">
                    <span className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary-hover shadow-sm" />
                    <span className="font-heading text-lg font-semibold tracking-tight">
                      写意
                    </span>
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
            </ScrollSpyProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
