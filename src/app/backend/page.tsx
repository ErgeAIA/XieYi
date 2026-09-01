const topics = [
  { name: "API", note: "前后端沟通的契约，向 AI 描述接口形状" },
  { name: "数据库", note: "数据如何存储与建模" },
  { name: "认证鉴权", note: "登录、会话与权限" },
  { name: "部署运行", note: "把应用真正跑起来" },
];

export default function BackendPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">后端相关</h1>
      <p className="text-sm text-muted-foreground">
        对前后端不熟时，用准确术语和 AI 对齐后端概念。
      </p>
      <ul className="space-y-2">
        {topics.map((t) => (
          <li
            key={t.name}
            className="rounded-md border bg-card px-3 py-2 text-sm"
          >
            <span className="font-medium">{t.name}</span>
            <span className="ml-2 text-muted-foreground">{t.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
