"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

/** Hero 右侧的实时预览：真实可操作的组件，而非截图或 div 拼的假界面。 */
export function HomeHeroDemo() {
  const [agree, setAgree] = React.useState(true);
  const [push, setPush] = React.useState(true);

  return (
    <div className="rounded-xl border bg-card p-4 md:p-5">
      <Tabs defaultValue="button">
        <TabsList>
          <TabsTrigger value="button">按钮</TabsTrigger>
          <TabsTrigger value="form">表单</TabsTrigger>
          <TabsTrigger value="state">状态</TabsTrigger>
        </TabsList>

        <TabsContent value="button" className="space-y-3 pt-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm">保存更改</Button>
            <Button size="sm" variant="outline">
              取消
            </Button>
            <Button size="sm" variant="ghost">
              跳过
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary">
              更多
            </Button>
            <Button size="sm" variant="destructive">
              删除
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="form" className="space-y-3 pt-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium" htmlFor="hero-demo-email">
              邮箱
            </label>
            <Input
              id="hero-demo-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <label className="flex items-center gap-2 text-xs">
            <Checkbox
              checked={agree}
              onCheckedChange={(v) => setAgree(!!v)}
            />
            我同意服务条款
          </label>
        </TabsContent>

        <TabsContent value="state" className="space-y-3 pt-4">
          <label className="flex items-center justify-between gap-3 rounded-md border p-3 text-xs">
            <span>
              <span className="block font-medium">推送通知</span>
              <span className="text-muted-foreground">在浏览器接收提醒</span>
            </span>
            <Switch checked={push} onCheckedChange={(v) => setPush(!!v)} />
          </label>
          <div className="flex flex-wrap gap-2">
            <Badge>进行中</Badge>
            <Badge variant="secondary">草稿</Badge>
            <Badge variant="outline">已归档</Badge>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/** 首页组件速览：4 个 bento 单元，单元数与内容数一致，无空单元格。 */
export function HomeBento() {
  const [notify, setNotify] = React.useState(true);
  const [todo, setTodo] = React.useState(false);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="hover-lift rounded-xl border bg-primary/5 p-5 md:col-span-2">
        <div className="mb-3 text-sm font-medium">按钮层级</div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">保存更改</Button>
          <Button size="sm" variant="outline">
            取消
          </Button>
          <Button size="sm" variant="ghost">
            跳过
          </Button>
          <Button size="sm" variant="secondary">
            更多
          </Button>
        </div>
      </div>

      <div className="hover-lift rounded-xl border p-5">
        <div className="mb-3 text-sm font-medium">开关</div>
        <label className="flex items-center justify-between gap-3 text-xs">
          <span>接收更新</span>
          <Switch checked={notify} onCheckedChange={(v) => setNotify(!!v)} />
        </label>
      </div>

      <div className="hover-lift rounded-xl border bg-muted/40 p-5 md:col-span-2">
        <div className="mb-3 text-sm font-medium">表单</div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium" htmlFor="bento-demo-name">
              项目名
            </label>
            <Input id="bento-demo-name" defaultValue="写意组件库" />
          </div>
          <label className="flex items-center gap-2 text-xs">
            <Checkbox
              checked={todo}
              onCheckedChange={(v) => setTodo(!!v)}
            />
            标记为已完成
          </label>
        </div>
      </div>

      <div className="hover-lift rounded-xl border p-5">
        <div className="mb-3 text-sm font-medium">图表色阶</div>
        <div className="flex h-10 items-end gap-1.5">
          {[
            "bg-[var(--chart-1)]",
            "bg-[var(--chart-2)]",
            "bg-[var(--chart-3)]",
            "bg-[var(--chart-4)]",
            "bg-[var(--chart-5)]",
          ].map((c, i) => (
            <span
              key={c}
              className={`w-full rounded-t ${c}`}
              style={{ height: `${[45, 70, 55, 85, 65][i]}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
