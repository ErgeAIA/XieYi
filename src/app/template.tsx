/**
 * 路由级进场包裹。Next.js 在每次导航时都会重新挂载 template，
 * 因此 .page-enter 的 CSS 动画会在切换页面时重新播放，
 * 解决「点击左侧菜单右侧内容瞬出」的问题。
 * 动画本身由 globals.css 门控（总开关 / prefers-reduced-motion）。
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
