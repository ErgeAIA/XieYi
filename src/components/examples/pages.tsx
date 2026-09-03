"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectPositioner,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/motion/reveal";

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
      {name.slice(0, 1)}
    </span>
  );
}

/* ---------- 1. Dashboard 数据面板 ---------- */

function DashboardExample() {
  const stats = [
    { label: "今日访问", value: "1,284", delta: "+12%", up: true },
    { label: "新增用户", value: "86", delta: "+5%", up: true },
    { label: "转化率", value: "3.2%", delta: "-0.4%", up: false },
    { label: "营收", value: "¥9,420", delta: "+8%", up: true },
  ];
  const bars = [40, 65, 50, 80, 72, 95];
  const max = Math.max(...bars);
  const activity = [
    { who: "李雷", what: "发布了新组件 Button", time: "2 分钟前" },
    { who: "韩梅梅", what: "更新了设置页", time: "15 分钟前" },
    { who: "系统", what: "完成每日备份", time: "1 小时前" },
    { who: "张伟", what: "合并了 PR #42", time: "3 小时前" },
  ];
  return (
    <section className="example-canvas space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">概览</h3>
          <Button size="sm">导出报表</Button>
        </div>
      </Reveal>
      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardHeader className="pb-2">
                <CardDescription>{s.label}</CardDescription>
                <CardTitle className="text-2xl">{s.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <span
                  className={
                    s.up
                      ? "text-xs text-muted-foreground"
                      : "text-xs text-destructive"
                  }
                >
                  {s.delta} 较昨日
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">访问趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-end gap-3">
                {bars.map((b, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-6 rounded-t bg-primary"
                      style={{ height: `${(b / max) * 120}px` }}
                    />
                    <span className="text-xs text-muted-foreground">{`${i + 1}月`}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">最近动态</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Avatar name={a.who} />
                  <div className="text-sm">
                    <div>
                      <span className="font-medium">{a.who}</span> {a.what}
                    </div>
                    <div className="text-xs text-muted-foreground">{a.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 2. IDE 编辑器布局 ---------- */

function IdeExample() {
  const files = [
    { name: "src/App.tsx", active: true },
    { name: "src/main.tsx", active: false },
    { name: "package.json", active: false },
    { name: "README.md", active: false },
    { name: "tsconfig.json", active: false },
  ];
  const code = [
    "export default function App() {",
    "  const [count, setCount] = useState(0);",
    "  return (",
    "    <button onClick={() => setCount(count + 1)}>",
    "      clicked {count} times",
    "    </button>",
    "  );",
    "}",
  ];
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="grid h-72 grid-cols-[140px_1fr_170px] overflow-hidden rounded-md border text-sm">
          <div className="border-r bg-muted/30 p-2">
            <div className="mb-2 px-1 text-xs font-medium text-muted-foreground">
              资源管理器
            </div>
            {files.map((f, i) => (
              <div
                key={i}
                className={`cursor-pointer rounded px-1 py-0.5 ${
                  f.active
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {f.name}
              </div>
            ))}
          </div>
          <div className="bg-background p-2 font-mono text-xs leading-relaxed">
            {code.map((l, i) => (
              <div key={i}>
                <span className="mr-2 inline-block w-5 text-right text-muted-foreground">
                  {i + 1}
                </span>
                {l || " "}
              </div>
            ))}
          </div>
          <div className="border-l bg-muted/30 p-2">
            <div className="mb-2 px-1 text-xs font-medium text-muted-foreground">
              预览
            </div>
            <div className="rounded bg-background p-3 text-center text-xs">
              clicked 0 times
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 3. 表单填写页面 ---------- */

function FormExample() {
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>新建项目</CardTitle>
        <CardDescription>填写项目基本信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">项目名称</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：写意"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">描述</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="简单介绍这个项目"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">可见性</label>
          <Select defaultValue="private">
            <SelectTrigger>
              <SelectValue placeholder="选择可见性" />
            </SelectTrigger>
            <SelectPortal>
              <SelectPositioner>
                <SelectPopup>
                  <SelectList>
                    <SelectItem value="private">私有</SelectItem>
                    <SelectItem value="team">团队</SelectItem>
                    <SelectItem value="public">公开</SelectItem>
                  </SelectList>
                </SelectPopup>
              </SelectPositioner>
            </SelectPortal>
          </Select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} />
          我同意服务条款
        </label>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button disabled={!name || !agree}>创建</Button>
      </CardFooter>
    </Card>
  );
}

/* ---------- 4. 数据列表管理 ---------- */

function DataTableExample() {
  const [q, setQ] = React.useState("");
  const rows = [
    { name: "项目 A", owner: "李雷", status: "进行中", updated: "2 小时前" },
    { name: "项目 B", owner: "韩梅梅", status: "已完成", updated: "昨天" },
    { name: "项目 C", owner: "张伟", status: "待审核", updated: "3 天前" },
  ];
  const filtered = rows.filter((r) =>
    (r.name + r.owner).toLowerCase().includes(q.toLowerCase()),
  );
  const statusVariant = (s: string) =>
    s === "已完成" ? "default" : s === "进行中" ? "secondary" : "outline";
  return (
    <div className="space-y-3">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜索项目…"
        className="max-w-xs"
      />
      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="p-2 font-medium">名称</th>
              <th className="p-2 font-medium">负责人</th>
              <th className="p-2 font-medium">状态</th>
              <th className="p-2 font-medium">更新时间</th>
              <th className="p-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.owner}</td>
                <td className="p-2">
                  <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                </td>
                <td className="p-2 text-muted-foreground">{r.updated}</td>
                <td className="p-2 text-right">
                  <Dialog>
                    <DialogTrigger render={<Button variant="ghost" size="sm" />}>
                      删除
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>确认删除</DialogTitle>
                        <DialogDescription>
                          确定删除 {r.name} 吗？此操作不可撤销。
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline" />}>
                          取消
                        </DialogClose>
                        <Button variant="destructive">删除</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- 5. 登录 / 注册页 ---------- */

function AuthExample() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>欢迎回来</CardTitle>
          <CardDescription>登录或注册写意账号</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-3 pt-4">
              <Input placeholder="邮箱" />
              <Input type="password" placeholder="密码" />
              <Button className="w-full">登录</Button>
            </TabsContent>
            <TabsContent value="register" className="space-y-3 pt-4">
              <Input placeholder="用户名" />
              <Input placeholder="邮箱" />
              <Input type="password" placeholder="密码" />
              <Button className="w-full">注册</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- 6. 设置页 ---------- */

function SettingsExample() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>设置</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">通用</TabsTrigger>
            <TabsTrigger value="notify">通知</TabsTrigger>
            <TabsTrigger value="security">安全</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">昵称</label>
              <Input defaultValue="写意用户" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">语言</label>
              <Select defaultValue="zh">
                <SelectTrigger>
                  <SelectValue placeholder="语言" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectPositioner>
                    <SelectPopup>
                      <SelectList>
                        <SelectItem value="zh">简体中文</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectList>
                    </SelectPopup>
                  </SelectPositioner>
                </SelectPortal>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="notify" className="space-y-3 pt-4">
            {[
              ["邮件通知", "接收重要更新邮件"],
              ["推送通知", "在浏览器接收推送"],
              ["站内信", "接收站内消息"],
            ].map(([t, d], i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <div className="text-sm font-medium">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
                <Switch defaultChecked={i !== 1} />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="security" className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">当前密码</label>
              <Input type="password" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">新密码</label>
              <Input type="password" />
            </div>
            <Button>更新密码</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

/* ---------- 7. 看板 ---------- */

function KanbanExample() {
  const cols = [
    { title: "待办", items: ["设计登录页", "编写文档"] },
    { title: "进行中", items: ["搭建组件库"] },
    { title: "已完成", items: ["需求评审", "项目初始化"] },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cols.map((c) => (
        <div key={c.title} className="rounded-md border bg-muted/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{c.title}</span>
            <Badge variant="secondary">{c.items.length}</Badge>
          </div>
          <div className="space-y-2">
            {c.items.map((it, i) => (
              <div
                key={i}
                className="rounded-md border bg-card p-2 text-sm shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Avatar name="L" />
                  {it}
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full">
              + 添加卡片
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- 8. 任务待办 ---------- */

function TodoExample() {
  const [items, setItems] = React.useState([
    { id: 1, text: "阅读组件文档", done: true },
    { id: 2, text: "搭建示例页面", done: false },
    { id: 3, text: "提交代码", done: false },
  ]);
  const [text, setText] = React.useState("");
  const add = () => {
    if (!text.trim()) return;
    setItems((p) => [...p, { id: Date.now(), text: text.trim(), done: false }]);
    setText("");
  };
  const toggle = (id: number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  const remove = (id: number) => setItems((p) => p.filter((i) => i.id !== id));
  const left = items.filter((i) => !i.done).length;
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-base">任务清单</CardTitle>
        <CardDescription>剩余 {left} 项</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="添加任务…"
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <Button onClick={add}>添加</Button>
        </div>
        <ul className="space-y-1">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
            >
              <Checkbox checked={it.done} onCheckedChange={() => toggle(it.id)} />
              <span
                className={`flex-1 text-sm ${
                  it.done ? "text-muted-foreground line-through" : ""
                }`}
              >
                {it.text}
              </span>
              <button
                onClick={() => remove(it.id)}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

/* ---------- 9. 时间轴 ---------- */

function TimelineExample() {
  const events = [
    { date: "09-01", title: "项目启动", desc: "完成需求评审与技术方案" },
    { date: "09-02", title: "脚手架搭建", desc: "Next.js + Tailwind + shadcn 落地" },
    { date: "09-03", title: "示例编写", desc: "组件示例与页面级布局" },
    { date: "09-05", title: "发布上线", desc: "部署到生产环境" },
  ];
  return (
    <div className="max-w-md">
      <ol className="relative space-y-4 border-l pl-4">
        {events.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[21px] top-1 size-3 rounded-full border-2 border-primary bg-background" />
            <div className="text-xs text-muted-foreground">{e.date}</div>
            <div className="text-sm font-medium">{e.title}</div>
            <div className="text-sm text-muted-foreground">{e.desc}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export const pageExamples = [
  {
    id: "dashboard",
    title: "Dashboard 数据面板",
    desc: "指标卡 + 趋势图 + 动态流",
    keywords:
      "dashboard 数据面板 指标 统计 图表 趋势 访问 用户 转化 营收 动态 卡片 概览",
    Comp: DashboardExample,
  },
  {
    id: "ide",
    title: "IDE 编辑器布局",
    desc: "文件树 + 代码区 + 预览三栏",
    keywords: "ide 编辑器 代码 文件树 资源管理器 预览 高亮 终端 布局",
    Comp: IdeExample,
  },
  {
    id: "form",
    title: "表单填写页面",
    desc: "输入、文本域、下拉、勾选",
    keywords:
      "form 表单 输入 input 文本域 textarea 下拉 select 勾选 checkbox 提交 创建 校验",
    Comp: FormExample,
  },
  {
    id: "data",
    title: "数据列表管理",
    desc: "搜索 + 表格 + 删除确认",
    keywords:
      "data 数据 列表 表格 table 搜索 筛选 删除 对话框 确认 分页 行 状态",
    Comp: DataTableExample,
  },
  {
    id: "auth",
    title: "登录 / 注册页",
    desc: "Tab 切换的认证卡片",
    keywords: "auth 登录 注册 login 认证 账号 密码 邮箱 tab 切换 卡片",
    Comp: AuthExample,
  },
  {
    id: "settings",
    title: "设置页",
    desc: "分组 Tab 与开关项",
    keywords: "settings 设置 偏好 通用 通知 安全 开关 switch 语言 昵称 分组",
    Comp: SettingsExample,
  },
  {
    id: "kanban",
    title: "看板",
    desc: "待办 / 进行中 / 已完成",
    keywords: "kanban 看板 任务 卡片 拖拽 列 待办 进行中 已完成 流程",
    Comp: KanbanExample,
  },
  {
    id: "todo",
    title: "任务待办",
    desc: "增删改的清单",
    keywords: "todo 任务 待办 清单 勾选 添加 删除 完成 列表 增删改",
    Comp: TodoExample,
  },
  {
    id: "timeline",
    title: "时间轴",
    desc: "垂直时间线",
    keywords: "timeline 时间轴 时间线 事件 历史 节点 垂直 里程碑 进度",
    Comp: TimelineExample,
  },
];

export function ExamplesGallery() {
  const [q, setQ] = React.useState("");
  const s = q.trim().toLowerCase();
  const list = s
    ? pageExamples.filter((e) =>
        `${e.title} ${e.desc} ${e.keywords}`.toLowerCase().includes(s),
      )
    : pageExamples;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索示例内容…"
          className="max-w-xs"
        />
        {s && (
          <span className="text-xs text-muted-foreground">
            找到 {list.length} 个
          </span>
        )}
      </div>

      {list.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          未找到与「{q}」匹配的示例。
        </p>
      ) : (
        <nav className="flex flex-wrap gap-2">
          {list.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="hover-lift rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {e.title}
            </a>
          ))}
        </nav>
      )}

      <div className="space-y-10">
        {list.map((e) => {
          const Comp = e.Comp;
          return (
            <section
              key={e.id}
              id={e.id}
              data-spy-group={e.id}
              className="scroll-anchor space-y-3"
            >
              <div>
                <h2 className="text-lg font-medium">{e.title}</h2>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
              </div>
              <div className="hover-lift overflow-hidden rounded-lg border bg-muted/20 p-4 sm:p-6">
                <Comp />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
