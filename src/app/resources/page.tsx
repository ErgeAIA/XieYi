const resources = [
  { name: "shadcn/ui Blocks", note: "官方区块级布局，可直接拼装成页面" },
  { name: "Ant Design", note: "企业级组件库，术语对照参考" },
  { name: "Shadcn Studio", note: "800+ 组件的可视化搭建" },
  { name: "优设 shadcn 合集", note: "国内社区整理的 shadcn 资源" },
  { name: "shadcn.io/examples", note: "官方示例应用合集" },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">参考资源</h1>
      <p className="text-sm text-muted-foreground">
        与 AI 沟通组件时，可对照这些资源给出更准确的需求。
      </p>
      <ul className="space-y-2">
        {resources.map((r) => (
          <li
            key={r.name}
            className="rounded-md border bg-card px-3 py-2 text-sm"
          >
            <span className="font-medium">{r.name}</span>
            <span className="ml-2 text-muted-foreground">{r.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
