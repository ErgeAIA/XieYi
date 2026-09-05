// 内容链接标记：词典/藏经阁/灵脉/组件文档里的「参考/延伸」链接属内容跳转，
// 不应驱动左侧导航的展开与高亮（导航就是导航）。
// 存 sessionStorage：跨页（整页刷新）也带得过去；2 秒时效防误伤后续侧栏点击。
const KEY = "xieyi-content-nav";

export function markContentNav() {
  try {
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {}
}

export function isContentNav() {
  try {
    const t = Number(sessionStorage.getItem(KEY) ?? 0);
    return Date.now() - t < 2000;
  } catch {
    return false;
  }
}

export function clearContentNav() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
