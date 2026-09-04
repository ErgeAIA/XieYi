import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import Script from "next/script";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/site-sidebar";
import { ScrollSpyProvider } from "@/components/scroll-spy";
import { NavSpyProvider } from "@/components/nav-spy";
import { ScrollToTop } from "@/components/scroll-to-top";

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
  title: "写意 · Vibe Coding 参考",
  description: "写意，以意运码，码落而器成。胸中之构，言而为品。",
  icons: { icon: "/logo/icon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <Script id="xieyi-motion-init" strategy="beforeInteractive">
          {`(function(){try{var s=localStorage.getItem('xieyi-motion');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var on=s===null?!r:s!=='off';document.documentElement.setAttribute('data-motion',on?'on':'off');}catch(e){}})();`}
        </Script>
        <link
          rel="stylesheet"
          href="/fonts/lxgw-wenkai/lxgw-wenkai.css"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ThemeProvider>
          <MotionProvider>
            <TooltipProvider>
              <ScrollSpyProvider>
                <NavSpyProvider>
                <div className="flex min-h-screen">
                <aside className="sticky top-0 hidden h-screen w-80 shrink-0 self-start overflow-y-auto border-r border-sidebar-border bg-sidebar p-5 md:block">
                  <div className="mb-5 flex items-center gap-2 px-2">
                    <span className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary-hover shadow-sm" />
                    <span className="font-brush text-2xl font-semibold tracking-tight">
                      写意
                    </span>
                  </div>
                  <Suspense fallback={null}>
                    <SidebarNav />
                  </Suspense>
                </aside>
                <div className="flex min-w-0 flex-1 flex-col">
                  <SiteHeader />
                  <main className="flex-1 px-4 md:px-8">{children}</main>
                </div>
                <ScrollToTop />
              </div>
                </NavSpyProvider>
              </ScrollSpyProvider>
            </TooltipProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
