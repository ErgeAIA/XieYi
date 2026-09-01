import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const planned = [
  "Dashboard 数据面板",
  "IDE 编辑器布局",
  "表单填写页面",
  "数据列表管理",
  "登录 / 注册页",
  "设置页",
  "看板",
  "任务待办",
  "时间轴",
];

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">示例</h1>
      <p className="text-sm text-muted-foreground">
        完整页面级示例，把组件嵌入真实场景。以下内容将在阶段 B 以真实可交互布局重写。
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {planned.map((p) => (
          <li
            key={p}
            className="rounded-md border bg-card px-3 py-2 text-sm text-muted-foreground"
          >
            {p}
          </li>
        ))}
      </ul>
      <Link
        href="/components"
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        先去前端组件
      </Link>
    </div>
  );
}
