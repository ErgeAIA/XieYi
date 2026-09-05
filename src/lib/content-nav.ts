// 内容链接标记：词典/藏经阁/灵脉/组件文档里的「参考/延伸」链接属内容跳转，
// 不应驱动左侧导航的展开与高亮（导航就是导航）。点击时打标，路由落地后消费。
let fromContent = false;

export function markContentNav() {
  fromContent = true;
}

export function consumeContentNav() {
  const v = fromContent;
  fromContent = false;
  return v;
}
