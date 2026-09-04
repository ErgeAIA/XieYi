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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  X,
  ArrowRight,
  Bell,
  Inbox,
  Search,
  Plus,
  MousePointerClick,
  LayoutDashboard,
  TrendingUp,
  Component,
  Sparkles,
  MessagesSquare,
  BookOpen,
  Settings,
  PanelLeft,
  AtSign,
  Star,
} from "lucide-react";

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
      {name.slice(0, 1)}
    </span>
  );
}

/* ---------- 1. 数据面板 ---------- */

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
    { who: "二哥", what: "发布了新组件 Button", time: "2 分钟前" },
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

/* ---------- 2. 编辑器布局 ---------- */

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
    <section className="example-canvas">
      <Reveal>
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
      </Reveal>
    </section>
  );
}

/* ---------- 4. 数据列表管理 ---------- */

function DataTableExample() {
  const [q, setQ] = React.useState("");
  const rows = [
    { name: "项目 A", owner: "李雷", status: "进行中", updated: "2 小时前" },
    { name: "项目 B", owner: "韩梅梅", status: "已完成", updated: "昨天" },
    { name: "项目 C", owner: "张伟", status: "待审核", updated: "3 天前" },
    { name: "项目 D", owner: "王芳", status: "进行中", updated: "5 天前" },
    { name: "项目 E", owner: "刘洋", status: "已完成", updated: "上周" },
  ];
  const filtered = rows.filter((r) =>
    (r.name + r.owner).toLowerCase().includes(q.toLowerCase()),
  );
  const statusVariant = (s: string) =>
    s === "已完成" ? "default" : s === "进行中" ? "secondary" : "outline";
  return (
    <section className="example-canvas">
      <Reveal>
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
      </Reveal>
    </section>
  );
}

/* ---------- 5. 登录 / 注册页 ---------- */

function AuthExample() {
  return (
    <section className="example-canvas">
      <Reveal>
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
      </Reveal>
    </section>
  );
}

/* ---------- 6. 设置页 ---------- */

function SettingsExample() {
  return (
    <section className="example-canvas">
      <Reveal>
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
      </Reveal>
    </section>
  );
}

/* ---------- 7. 看板 ---------- */

function KanbanExample() {
  const cols = [
    {
      title: "待办",
      items: [
        { text: "设计登录页", who: "李" },
        { text: "编写文档", who: "韩" },
      ],
    },
    { title: "进行中", items: [{ text: "搭建组件库", who: "张" }] },
    {
      title: "已完成",
      items: [
        { text: "需求评审", who: "王" },
        { text: "项目初始化", who: "刘" },
      ],
    },
  ];
  return (
    <section className="example-canvas">
      <Reveal>
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
                      <Avatar name={it.who} />
                      {it.text}
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
      </Reveal>
    </section>
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
    <section className="example-canvas">
      <Reveal>
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
      </Reveal>
    </section>
  );
}

/* ---------- 9. 时间轴 ---------- */

function TimelineExample() {
  const events = [
    { date: "09-01", title: "项目启动", desc: "完成需求评审与技术方案" },
    { date: "09-02", title: "脚手架搭建", desc: "Next.js + Tailwind + shadcn 落地" },
    { date: "09-03", title: "示例编写", desc: "组件示例与页面级布局" },
    { date: "09-04", title: "内部评审", desc: "设计走查与无障碍核对" },
    { date: "09-05", title: "发布上线", desc: "部署到生产环境" },
  ];
  return (
    <section className="example-canvas">
      <Reveal>
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
      </Reveal>
    </section>
  );
}

/* ---------- 10. 堆叠布局（application shell: stacked） ---------- */

function StackedExample() {
  const navItems = ["首页", "组件", "示例", "提示词库"];
  const meta: { label: string; value: string; href?: string }[] = [
    { label: "版本", value: "v1.4.0" },
    {
      label: "作者",
      value: "B站·宝藏二哥AIA",
      href: "https://space.bilibili.com/67221461",
    },
    { label: "最后更新", value: "2 小时前" },
    { label: "依赖", value: "@base-ui/react" },
  ];
  const usages = [
    { page: "数据面板", usage: "导出报表", count: 4 },
    { page: "登录 / 注册页", usage: "登录、注册提交", count: 2 },
    { page: "设置页", usage: "保存、更新操作", count: 3 },
    { page: "看板", usage: "添加卡片", count: 3 },
  ];
  const total = usages.reduce((s, u) => s + u.count, 0);
  const [notes, setNotes] = React.useState([
    { who: "二哥", what: "优化 hover 态过渡曲线", time: "2 小时前" },
    { who: "韩梅梅", what: "修复暗色下 focus 环不可见", time: "昨天" },
    { who: "张伟", what: "新增 loading 图标位", time: "3 天前" },
  ]);
  const [draft, setDraft] = React.useState("");
  const addNote = () => {
    if (!draft.trim()) return;
    setNotes((p) => [{ who: "我", what: draft.trim(), time: "刚刚" }, ...p]);
    setDraft("");
  };
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="overflow-hidden rounded-md border">
          {/* 顶部应用栏 */}
          <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
            <span className="text-sm font-semibold">写意</span>
            <nav className="flex gap-4 text-xs text-muted-foreground">
              {navItems.map((n, i) => (
                <span
                  key={n}
                  className={i === 1 ? "font-medium text-foreground" : ""}
                >
                  {n}
                </span>
              ))}
            </nav>
            <Avatar name="二哥" />
          </div>

          {/* 居中窄栏：竖向堆叠的详情内容 */}
          <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6">
            {/* 抬头：标识 + 操作 */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted/30">
                  <MousePointerClick className="size-5 text-primary" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">组件</div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Button 按钮</h3>
                    <Badge>已发布</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  复制名称
                </Button>
                <Button size="sm">复制提示词</Button>
              </div>
            </div>

            {/* 元信息描述列表 */}
            <dl className="grid grid-cols-2 gap-4 rounded-md border bg-muted/20 p-4 sm:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-xs text-muted-foreground">{m.label}</dt>
                  <dd className="mt-0.5 text-sm font-medium">
                    {m.href ? (
                      <a
                        href={m.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {m.value}
                      </a>
                    ) : (
                      m.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* 左主栏表格 + 右侧栏统计与动态 */}
            <div className="grid items-start gap-4 lg:grid-cols-[1fr_230px]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">使用位置</CardTitle>
                  <CardDescription>该按钮在示例站点各页面的分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs text-muted-foreground">
                      <tr>
                        <th className="pb-2 font-medium">页面</th>
                        <th className="pb-2 font-medium">用法</th>
                        <th className="pb-2 text-right font-medium">次数</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usages.map((u) => (
                        <tr key={u.page} className="border-t">
                          <td className="py-2">{u.page}</td>
                          <td className="py-2 text-muted-foreground">{u.usage}</td>
                          <td className="py-2 text-right">{u.count}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t font-medium">
                        <td className="pt-2" colSpan={2}>
                          合计
                        </td>
                        <td className="pt-2 text-right">{total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>本周使用</CardDescription>
                    <CardTitle className="text-2xl">128 次</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-xs text-muted-foreground">
                      较上周 +12%
                    </span>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">最近动态</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notes.map((n, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Avatar name={n.who} />
                        <div className="text-xs">
                          <div>
                            <span className="font-medium">{n.who}</span> {n.what}
                          </div>
                          <div className="text-muted-foreground">{n.time}</div>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addNote()}
                        placeholder="添加备注…"
                        className="h-8 text-xs"
                      />
                      <Button size="sm" onClick={addNote}>
                        发送
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 11. 侧边栏布局（application shell: sidebar） ---------- */

function SidebarExample() {
  const groups: {
    title: string;
    items: {
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: number;
    }[];
  }[] = [
    {
      title: "工作台",
      items: [
        { label: "概览", icon: LayoutDashboard },
        { label: "数据分析", icon: TrendingUp },
      ],
    },
    {
      title: "内容",
      items: [
        { label: "组件", icon: Component, badge: 28 },
        { label: "示例", icon: Sparkles },
        { label: "提示词库", icon: MessagesSquare, badge: 52 },
        { label: "资源", icon: BookOpen },
      ],
    },
    { title: "系统", items: [{ label: "设置", icon: Settings }] },
  ];
  const [current, setCurrent] = React.useState("概览");
  const [collapsed, setCollapsed] = React.useState(false);
  const stats = [
    { label: "组件总数", value: "28" },
    { label: "本周新增", value: "4" },
    { label: "待审核", value: "2" },
  ];
  const rows = [
    { name: "Button 按钮", cat: "输入", status: "已发布", updated: "2 小时前" },
    { name: "Dialog 对话框", cat: "浮层", status: "已发布", updated: "昨天" },
    { name: "Accordion 手风琴", cat: "导航", status: "审核中", updated: "3 天前" },
    { name: "Calendar 日历", cat: "数据展示", status: "草稿", updated: "上周" },
  ];
  const statusVariant = (s: string) =>
    s === "已发布" ? "default" : s === "审核中" ? "secondary" : "outline";
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="flex h-[460px] overflow-hidden rounded-md border text-sm">
          {/* 侧边栏 */}
          <aside
            className={`hidden shrink-0 flex-col border-r bg-muted/30 transition-[width] duration-200 md:flex ${
              collapsed ? "w-14" : "w-56"
            }`}
          >
            <div
              className={`flex h-12 shrink-0 items-center border-b px-4 ${
                collapsed ? "justify-center px-0" : "justify-between"
              }`}
            >
              {collapsed ? (
                <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                  写
                </span>
              ) : (
                <>
                  <span className="font-semibold">写意</span>
                  <Badge variant="secondary">v1.4</Badge>
                </>
              )}
            </div>
            <nav className="flex-1 space-y-4 overflow-y-auto px-2 pb-2">
              {groups.map((g) => (
                <div key={g.title}>
                  {!collapsed && (
                    <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">
                      {g.title}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    {g.items.map((it) => (
                      <button
                        key={it.label}
                        onClick={() => setCurrent(it.label)}
                        title={it.label}
                        className={`flex w-full items-center rounded-md py-1.5 text-left ${
                          collapsed ? "justify-center" : "gap-2 px-2"
                        } ${
                          current === it.label
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <it.icon className="size-4 shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{it.label}</span>
                            {it.badge && (
                              <Badge
                                variant="secondary"
                                className="px-1.5 py-0 text-[10px]"
                              >
                                {it.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div
              className={`flex items-center border-t p-3 ${
                collapsed ? "justify-center" : "gap-2"
              }`}
            >
              <Avatar name="二哥" />
              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1 leading-tight">
                    <div className="truncate font-medium">二哥</div>
                    <div className="truncate text-xs text-muted-foreground">
                      管理员
                    </div>
                  </div>
                  <Settings className="size-4 shrink-0 text-muted-foreground" />
                </>
              )}
            </div>
          </aside>

          {/* 主区 */}
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-12 shrink-0 items-center gap-3 border-b px-4">
              <button
                onClick={() => setCollapsed((c) => !c)}
                className="hidden text-muted-foreground hover:text-foreground md:block"
                aria-label={collapsed ? "展开侧边栏" : "收起侧边栏"}
                aria-expanded={!collapsed}
              >
                <PanelLeft className="size-4" />
              </button>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-muted-foreground">首页</span>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium">{current}</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Input placeholder="搜索…" className="h-8 w-36 text-xs" />
                <button
                  className="relative text-muted-foreground hover:text-foreground"
                  aria-label="通知"
                >
                  <Bell className="size-4" />
                  <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-primary" />
                </button>
                <Avatar name="二哥" />
              </div>
            </header>
            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-semibold">
                    {current === "概览" ? "组件管理" : current}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    管理写意的组件资产与发布流程
                  </p>
                </div>
                <Button size="sm">
                  <Plus className="size-4" /> 新建组件
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((s) => (
                  <Card key={s.label}>
                    <CardHeader className="pb-1">
                      <CardDescription>{s.label}</CardDescription>
                      <CardTitle className="text-xl">{s.value}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">最近组件</CardTitle>
                  <CardDescription>按更新时间排序</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs text-muted-foreground">
                      <tr>
                        <th className="pb-2 font-medium">组件</th>
                        <th className="pb-2 font-medium">分类</th>
                        <th className="pb-2 font-medium">状态</th>
                        <th className="pb-2 text-right font-medium">
                          更新时间
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.name} className="border-t">
                          <td className="py-2 font-medium">{r.name}</td>
                          <td className="py-2 text-muted-foreground">{r.cat}</td>
                          <td className="py-2">
                            <Badge variant={statusVariant(r.status)}>
                              {r.status}
                            </Badge>
                          </td>
                          <td className="py-2 text-right text-muted-foreground">
                            {r.updated}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 12. 多栏布局（multi-column） ---------- */

function MultiColumnExample() {
  const navGroups: {
    title: string;
    items: {
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: number;
    }[];
  }[] = [
    {
      title: "消息",
      items: [
        { label: "收件箱", icon: Inbox, badge: 4 },
        { label: "评论", icon: MessagesSquare, badge: 12 },
        { label: "@提及", icon: AtSign, badge: 2 },
        { label: "系统通知", icon: Bell },
      ],
    },
    {
      title: "项目",
      items: [
        { label: "写意组件库", icon: Component },
        { label: "提示词库", icon: BookOpen },
      ],
    },
  ];
  const messages = [
    {
      from: "李雷",
      subject: "Button 组件 hover 态评审",
      snippet: "过渡曲线改成 ease-out 之后明显顺滑了",
      time: "10:24",
      unread: true,
      body: [
        "二哥，hover 态的过渡曲线改成 ease-out 之后，浅色和暗色下都明显顺滑了，建议把同样的参数同步到 Dialog 和 Dropdown。",
        "另外暗色下的 focus 环我已经补了一层内阴影，详见截图。",
      ],
    },
    {
      from: "韩梅梅",
      subject: "示例页排版走查结果",
      snippet: "9 个页面级示例都过了一遍，列出 3 个对齐问题",
      time: "09:41",
      unread: true,
      body: [
        "9 个页面级示例都过了一遍，整体没问题，列出 3 个对齐问题：指标卡数字基线、表格内边距、侧栏分组间距，附件里标了位置。",
      ],
    },
    {
      from: "张伟",
      subject: "v1.5 发布计划确认",
      snippet: "下周三发布，需要先冻结 main 分支",
      time: "昨天",
      unread: false,
      body: [
        "v1.5 定在下周三发布，发布前 24 小时冻结 main 分支，changelog 我先起草一版给你过目。",
      ],
    },
    {
      from: "系统",
      subject: "每周构建报告",
      snippet: "本周 12 次构建全部通过，平均耗时 2 分 18 秒",
      time: "周一",
      unread: false,
      body: [
        "本周共 12 次构建，全部通过，平均耗时 2 分 18 秒，较上周缩短 9%。",
      ],
    },
  ];
  const [active, setActive] = React.useState(0);
  const current = messages[active];
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="flex h-[440px] overflow-hidden rounded-md border text-sm">
          {/* 左栏：分组导航 */}
          <aside className="hidden w-48 shrink-0 flex-col border-r bg-muted/30 md:flex">
            <div className="flex h-12 shrink-0 items-center border-b px-3">
              <span className="font-semibold">写意</span>
              <Badge
                variant="secondary"
                className="ml-auto px-1.5 py-0 text-[10px]"
              >
                消息中心
              </Badge>
            </div>
            <nav className="flex-1 space-y-3 overflow-y-auto px-2 py-2">
              {navGroups.map((g) => (
                <div key={g.title}>
                  <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">
                    {g.title}
                  </div>
                  <div className="space-y-0.5">
                    {g.items.map((it) => (
                      <button
                        key={it.label}
                        title={it.label}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left ${
                          it.label === "收件箱"
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <it.icon className="size-4 shrink-0" />
                        <span className="flex-1 truncate">{it.label}</span>
                        {it.badge && (
                          <Badge
                            variant="secondary"
                            className="px-1.5 py-0 text-[10px]"
                          >
                            {it.badge}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          {/* 中栏：消息列表 */}
          <div className="flex w-64 shrink-0 flex-col border-r">
            <div className="flex h-12 shrink-0 items-center justify-between border-b px-3">
              <span className="font-medium">收件箱</span>
              <span className="text-xs text-muted-foreground">
                {messages.length} 条
              </span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {messages.map((m, i) => (
                <button
                  key={m.subject}
                  onClick={() => setActive(i)}
                  className={`flex w-full gap-2 border-b px-3 py-2.5 text-left ${
                    i === active ? "bg-accent/60" : "hover:bg-muted"
                  }`}
                >
                  <Avatar name={m.from} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`truncate text-xs ${
                          m.unread ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {m.from}
                      </span>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {m.time}
                      </span>
                    </div>
                    <div
                      className={`truncate text-xs ${
                        m.unread
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {m.subject}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {m.snippet}
                    </div>
                  </div>
                  {m.unread && (
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 右栏：详情 */}
          <div className="hidden min-w-0 flex-1 flex-col lg:flex">
            <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4">
              <span className="truncate font-medium">{current.subject}</span>
              <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
                <button className="hover:text-foreground" aria-label="星标">
                  <Star className="size-4" />
                </button>
                <button className="hover:text-foreground" aria-label="归档">
                  <Inbox className="size-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="flex items-center gap-2">
                <Avatar name={current.from} />
                <div className="leading-tight">
                  <div className="text-xs font-medium">{current.from}</div>
                  <div className="text-[10px] text-muted-foreground">
                    发消息于 {current.time}
                  </div>
                </div>
              </div>
              {current.body.map((p, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-foreground/90"
                >
                  {p}
                </p>
              ))}
              <div className="rounded-md border-l-4 border-primary bg-muted/30 p-3 text-xs text-muted-foreground">
                回复时请引用原话题：{current.subject}
              </div>
            </div>
            <div className="flex gap-2 border-t p-3">
              <Input
                placeholder={`回复 ${current.from}…`}
                className="h-8 text-xs"
              />
              <Button size="sm">发送</Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 13. 标题（page / card / section headings） ---------- */

function HeadingsExample() {
  return (
    <section className="example-canvas space-y-6">
      <div>
        <h3 className="text-xl font-semibold">团队设置</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          管理团队成员与权限。
        </p>
      </div>
      <div className="rounded-md border p-4">
        <h4 className="text-base font-semibold">基本信息</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          用于对外展示的资料。
        </p>
      </div>
      <div>
        <h5 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          高级选项
        </h5>
        <div className="mt-2 text-sm">下面是一些不常用的设置。</div>
      </div>
    </section>
  );
}

/* ---------- 14. 警报（alerts：描述 / 列表 / 操作 / 链接 / 强调边框 / 关闭） ---------- */

function AlertsExample() {
  const [showDismiss, setShowDismiss] = React.useState(true);
  return (
    <section className="example-canvas space-y-3">
      <div className="flex gap-3 rounded-md border p-3 text-sm">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />
        <div>
          <div className="font-medium">已保存草稿</div>
          <div className="text-muted-foreground">
            你的更改已于 2 分钟前自动保存。
          </div>
        </div>
      </div>
      <div className="flex gap-3 rounded-md border p-3 text-sm">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
        <div>
          <div className="font-medium">有 2 项待处理</div>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
            <li>支付凭证待上传</li>
            <li>联系人信息不完整</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
        <div className="flex gap-3">
          <Bell className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <div className="font-medium">新版本可用</div>
            <div className="text-muted-foreground">v2.3.0 已发布，建议升级。</div>
          </div>
        </div>
        <Button size="sm">立即升级</Button>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
          <div>
            <div className="font-medium">部署成功</div>
            <div className="text-muted-foreground">已发布到生产环境。</div>
          </div>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          查看详情 <ArrowRight className="size-3.5" />
        </a>
      </div>
      <div className="flex gap-3 rounded-md border-l-4 border-primary p-3 text-sm">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />
        <div>
          <div className="font-medium">提示</div>
          <div className="text-muted-foreground">
            强调边框常用于突出关键信息。
          </div>
        </div>
      </div>
      {showDismiss && (
        <div className="flex items-start justify-between gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">
          <div className="flex gap-3">
            <X className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <div className="font-medium">无法连接到服务器</div>
              <div className="text-muted-foreground">请检查网络后重试。</div>
            </div>
          </div>
          <button
            onClick={() => setShowDismiss(false)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="关闭"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </section>
  );
}

/* ---------- 15. 空状态（empty states） ---------- */

function EmptyStatesExample() {
  return (
    <section className="example-canvas space-y-4">
      <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center">
        <Inbox className="size-8 text-muted-foreground" />
        <div className="text-sm font-medium">还没有任何项目</div>
        <div className="text-xs text-muted-foreground">创建你的第一个项目开始吧。</div>
        <Button size="sm" className="mt-1">
          <Plus className="size-4" /> 新建项目
        </Button>
      </div>
      <div className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <Search className="size-6" />
        <div>未找到匹配的结果</div>
      </div>
    </section>
  );
}

interface PageExample {
  id: string;
  title: string;
  nameEn: string;
  desc: string;
  keywords: string;
  Comp: React.ComponentType;
  usage?: string;
  prompt?: string;
}

export const pageExamples: PageExample[] = [
  {
    id: "dashboard",
    title: "数据面板",
    nameEn: "Dashboard",
    desc: "指标卡 + 趋势图 + 动态流",
    usage: "后台首页概览、运营数据周报、个人中心数据墙、SaaS 产品指标页",
    keywords:
      "dashboard 数据面板 指标 统计 图表 趋势 访问 用户 转化 营收 动态 卡片 概览",
    prompt: `请生成一个「数据面板（Dashboard）」页面，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 顶部一行 4 个指标卡（grid 4 列）。每张卡：指标名、大号数字、同比涨跌 Badge（涨用品牌强调色、跌用次要灰）。占位数据如：今日访问 1,284 ▲12%、新增用户 86 ▲5%、转化率 3.2% ▼1%、营收 ¥42.8k ▲8%。
- 下方左右分栏（约 2:1）：左侧趋势图区块（SVG 折线/柱状占位，展示近 7 日访问），右侧「最新动态」信息流（头像 + 文案 + 相对时间，如「2 分钟前 二哥 发布了新组件 Button」）。
- 卡片用 Card 组件（CardHeader/CardTitle/CardContent），圆角、细边框、浅底。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体，不引入装饰字体；留白充足，层级清晰；hover 轻微抬升反馈。

响应式：
- <1024px 指标卡 2 列，<640px 1 列；下方分栏窄屏堆叠为单列。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: DashboardExample,
  },
  {
    id: "ide",
    title: "编辑器布局",
    nameEn: "IDE",
    desc: "文件树 + 代码区 + 预览三栏",
    usage: "代码编辑器、IDE 工作台、在线预览工具、低代码搭建器",
    keywords: "ide 编辑器 代码 文件树 资源管理器 预览 高亮 终端 布局",
    prompt: `请生成一个「编辑器布局（IDE）」页面，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 三栏：左文件树（宽约 240px，含文件夹/文件层级、展开折叠）、中代码区（等宽字体占位代码、行号、语法高亮色块）、右实时预览（渲染占位内容）。
- 顶部工具栏：左侧标题/面包屑，右侧运行/格式化/分屏按钮。
- 文件树节点 hover 高亮，选中项用品牌色左侧竖条 + 浅底标记。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 代码区用等宽字体（font-mono），不引入装饰字体；三栏在窄屏可隐藏侧栏或堆叠。

响应式：
- <1024px 收起文件树（可用按钮唤出），<768px 预览改为下方标签页切换。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: IdeExample,
  },
  {
    id: "form",
    title: "表单填写页面",
    nameEn: "Form",
    desc: "输入、文本域、下拉、勾选",
    usage: "新建/编辑表单、用户注册资料、配置创建、反馈收集",
    keywords:
      "form 表单 输入 input 文本域 textarea 下拉 select 勾选 checkbox 提交 创建 校验",
    prompt: `请生成一个「表单填写页面」，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 居中卡片（max-width 约 480px），纵向排列表单项：文本输入（姓名/邮箱）、多行文本域（简介）、下拉选择（角色）、勾选框（同意条款）、提交按钮。
- 每项含 label + 控件 + 辅助说明/错误提示；必填项用星号标记。
- 提交按钮占满宽度，主色填充。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体；错误态用 text-destructive 与边框强调；焦点态清晰。

响应式：
- 移动端卡片占满宽度，控件垂直铺满。

数据全部用占位 mock，不接后端，提交仅做前端校验演示。输出完整可运行组件。`,
    Comp: FormExample,
  },
  {
    id: "data",
    title: "数据列表管理",
    nameEn: "Data Table",
    desc: "搜索 + 表格 + 删除确认",
    usage: "后台数据表、用户管理、订单列表、内容审核后台",
    keywords:
      "data 数据 列表 表格 table 搜索 筛选 删除 对话框 确认 分页 行 状态",
    prompt: `请生成一个「数据列表管理」页面，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 顶部工具栏：左侧搜索框 + 筛选下拉，右侧「新建」按钮。
- 主体为表格：列含复选框、名称、状态 Badge、更新时间、操作（编辑/删除）。
- 删除操作弹出确认对话框（Dialog），确认后移除该行（前端演示）。
- 底部分页栏（上一页/页码/下一页）。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体；状态用 Badge 区分；行 hover 浅底。

响应式：
- <768px 表格改为卡片列表，每行信息纵向堆叠。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: DataTableExample,
  },
  {
    id: "auth",
    title: "登录 / 注册页",
    nameEn: "Auth",
    desc: "Tab 切换的认证卡片",
    usage: "产品登录入口、注册引导、账号密码认证页",
    keywords: "auth 登录 注册 login 认证 账号 密码 邮箱 tab 切换 卡片",
    prompt: `请生成一个「登录 / 注册页」，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 居中认证卡片（max-width 约 400px），顶部 Tab 切换「登录 / 注册」。
- 登录态：邮箱输入 + 密码输入 + 记住我勾选 + 主色「登录」按钮 + 第三方登录分隔线。
- 注册态：用户名/邮箱/密码 + 确认密码 + 服务条款勾选 + 「注册」按钮。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体；密码框带显示/隐藏切换；错误提示用 text-destructive。

响应式：
- 移动端卡片占满宽度，去除背景装饰留白。

数据全部用占位 mock，不接后端，切换 Tab 仅前端状态。输出完整可运行组件。`,
    Comp: AuthExample,
  },
  {
    id: "settings",
    title: "设置页",
    nameEn: "Settings",
    desc: "分组 Tab 与开关项",
    usage: "产品偏好设置、账户设置中心、后台配置页",
    keywords: "settings 设置 偏好 通用 通知 安全 开关 switch 语言 昵称 分组",
    prompt: `请生成一个「设置页」，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 左侧分组导航（竖向 Tab：通用 / 通知 / 安全 / 关于），右侧对应内容面板。
- 内容面板为分组表单：每组一个标题 + 若干设置项（昵称输入、语言下拉、通知开关 Switch、主题单选）。
- 底部「保存」按钮（仅在修改后高亮）。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体；Switch 用品牌色表示开启；分组之间用分隔线或留白区隔。

响应式：
- <768px 分组导航改为顶部横向滚动 Tab。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: SettingsExample,
  },
  {
    id: "kanban",
    title: "看板",
    nameEn: "Kanban",
    desc: "待办 / 进行中 / 已完成",
    usage: "任务看板、项目管理板、销售漏斗、工作流看板",
    keywords: "kanban 看板 任务 卡片 拖拽 列 待办 进行中 已完成 流程",
    prompt: `请生成一个「看板（Kanban）」页面，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 横向多列（如 待办 / 进行中 / 已完成），列宽固定约 280px，可横向滚动。
- 每列含列标题 + 卡片数 + 卡片列表；卡片含标题、标签 Badge、负责人头像、截止日期。
- 列底部「+ 添加卡片」入口（前端演示）。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体；卡片用浅底圆角，列头用 muted 文字；标签用不同色 Badge。

响应式：
- <768px 列改为纵向堆叠，单列占满宽度。

数据全部用占位 mock，不接后端（拖拽可先用静态展示，不强求实现）。输出完整可运行组件。`,
    Comp: KanbanExample,
  },
  {
    id: "todo",
    title: "任务待办",
    nameEn: "Todo",
    desc: "增删改的清单",
    usage: "个人待办清单、购物清单、每日任务、轻量事项管理",
    keywords: "todo 任务 待办 清单 勾选 添加 删除 完成 列表 增删改",
    prompt: `请生成一个「任务待办」页面，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 居中容器（max-width 约 480px），顶部输入框 + 「添加」按钮。
- 下方清单：每项含勾选框（完成态划线变灰）、任务文本、删除按钮（hover 显示）。
- 顶部可加「全部 / 进行中 / 已完成」筛选 Tab 与剩余计数。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体；完成项用 line-through + text-muted-foreground；勾选用品牌色。

响应式：
- 移动端容器占满宽度。

数据全部用占位 mock，不接后端，增删改仅前端状态。输出完整可运行组件。`,
    Comp: TodoExample,
  },
  {
    id: "timeline",
    title: "时间轴",
    nameEn: "Timeline",
    desc: "垂直时间线",
    usage: "项目进展时间线、版本更新日志、订单流转、个人履历",
    keywords: "timeline 时间轴 时间线 事件 历史 节点 垂直 里程碑 进度",
    prompt: `请生成一个「时间轴（Timeline）」页面，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 垂直时间线：一条竖线，节点用圆点标记（最新节点用品牌色实心，历史用空心或 muted）。
- 每个节点含时间（如 2026-09-01）、标题、描述、可选标签 Badge。
- 内容块在竖线一侧（或左右交替），留白充足。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体；节点圆点用 border / bg-primary 区分状态；时间用 muted 小字。

响应式：
- 移动端时间线靠左，内容块全宽。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: TimelineExample,
  },
  {
    id: "stacked",
    title: "堆叠布局",
    nameEn: "Stacked",
    desc: "顶部栏 + 居中窄栏堆叠的详情页",
    usage: "应用主框架、资源详情页、组件详情、项目概览、工单 / 订单详情",
    keywords: "stacked 堆叠 布局 详情页 detail 应用壳 顶栏 窄栏 描述列表 动态 feed",
    prompt: `请生成一个「堆叠布局（Stacked Detail）」详情页，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px）：
- 顶部应用栏：左侧品牌名，中部横向导航（当前项高亮），右侧用户头像。
- 下方居中窄栏（max-width 约 768px）竖向堆叠：
  - 抬头区：左侧图标方块 + 眉题（如「组件」）+ 标题（如「Button 按钮」）+ 状态 Badge；右侧操作按钮（次要「复制名称」+ 主色「复制提示词」）。
  - 元信息条：2–4 列描述列表（版本 / 作者 / 最后更新 / 依赖；作者署名固定为「B站·宝藏二哥AIA」，带链接 https://space.bilibili.com/67221461，新窗口打开）。
  - 左右分栏（左主右辅）：左侧卡片含表格（使用位置：页面 / 用法 / 次数，底部合计行）；右侧窄栏为统计卡（大数字 + 同比变化）与「最近动态」feed（头像 + 文案 + 相对时间），feed 底部输入框可添加备注。

样式约束：
- 仅用 design token 类（bg-background、bg-card、text-muted-foreground、border、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体，不引入装饰字体；区块间用留白与细边框区隔，层级清晰。

响应式：
- <1024px 右侧栏下移堆叠为单列；<640px 元信息条 2 列、导航可简化。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: StackedExample,
  },
  {
    id: "sidebar",
    title: "侧边栏布局",
    nameEn: "Sidebar",
    desc: "左侧分组导航 + 顶栏 + 内容区",
    usage: "管理后台、桌面应用框架、组件管理系统、文档控制台、工作台",
    keywords:
      "sidebar 侧边栏 布局 应用壳 分组导航 顶栏 面包屑 后台 管理端 工作台 桌面",
    prompt: `请生成一个「侧边栏布局（Sidebar Layout）」应用框架，技术栈 React + Tailwind CSS。

布局（桌面 ≥768px）：
- 左侧固定侧栏（宽约 224px，可收起为仅图标的窄栏，宽约 56px）：顶部品牌区（品牌名 + 版本 Badge，收起时仅显示品牌首字）；中部竖向分组导航（分组标题用 muted 小字，项含图标 + 名称 + 可选数量 Badge，当前项用 accent 浅底高亮，支持点击切换；收起时仅显示图标，悬浮 title 提示名称）；底部用户卡（头像 + 姓名 + 角色 + 设置入口，收起时仅显示头像）。
- 右侧主区竖向堆叠：顶栏（最左为侧栏收起 / 展开切换按钮，点击在完整侧栏与图标窄栏之间平滑切换；随后是面包屑「首页 / 当前页」，右侧搜索框 + 通知铃铛带小红点 + 头像）；下方滚动内容区：页头（标题随当前导航变化 + 一句描述 + 主色「新建」按钮）、3 列指标卡、含表格的卡片（组件 / 分类 / 状态 Badge / 更新时间）。

样式约束：
- 仅用 design token 类（bg-background、bg-muted/30、text-muted-foreground、border、bg-accent、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体，不引入装饰字体；侧栏与内容区用细边框 + 浅底区分层级。

响应式：
- <768px 隐藏侧栏（可由按钮唤出抽屉），主区占满全宽。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: SidebarExample,
  },
  {
    id: "multi-column",
    title: "多栏布局",
    nameEn: "Multi-column",
    desc: "左导航 + 中列表 + 右详情的三栏联动",
    usage: "邮件收件箱、消息中心、工单系统、项目管理工具、文件管理器",
    keywords:
      "multi-column 多栏 三栏 布局 收件箱 inbox 列表 详情 联动 消息中心 工单",
    prompt: `请生成一个「多栏布局（Multi-column Layout）」三栏应用框架，技术栈 React + Tailwind CSS。

布局（桌面 ≥1024px，外框固定高度约 440px）：
- 左栏（宽约 192px）：品牌区（名称 + 应用名 Badge）；竖向分组导航（「消息」分组：收件箱 / 评论 / @提及 / 系统通知，含数量 Badge，「收件箱」默认高亮；「项目」分组：项目入口）。
- 中栏（宽约 256px）：顶部栏（栏目名 + 条数）；消息列表（每项：头像 + 发件人 + 时间 + 主题 + 摘要，均单行截断；未读消息加粗并带品牌色小圆点；点击切换选中，选中项浅底高亮）。
- 右栏（占满剩余宽度）：顶部栏（当前消息主题 + 星标 / 归档图标按钮）；详情区（发件人头像行 + 正文段落 + 品牌色强调边框提示块）；底部回复输入框 + 发送按钮。

样式约束：
- 仅用 design token 类（bg-background、bg-muted/30、text-muted-foreground、border、bg-accent、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体，不引入装饰字体；三栏之间用细边框分隔，列表与详情超出时在栏内滚动。

响应式：
- <1024px 隐藏右栏详情（中栏占满）；<768px 隐藏左栏导航。

数据全部用占位 mock，不接后端；点击列表项切换右栏详情（前端 state）。输出完整可运行组件。`,
    Comp: MultiColumnExample,
  },
  {
    id: "headings",
    title: "标题",
    nameEn: "Headings",
    desc: "页面 / 卡片 / 章节三级标题",
    usage: "页面排版规范、组件文档、设置分组标题、表单区块标题、内容层级示范",
    keywords: "heading 标题 页面标题 卡片标题 章节标题 排版 typography 层级 h1 h2 h3",
    prompt: `请生成一个「标题层级（Headings）」排版示例，技术栈 React + Tailwind CSS。

内容（桌面 ≥1024px）：
- 页面级标题（h2/h3 量级，text-lg font-semibold）+ 一句 muted 描述，用于整页主标题区。
- 卡片级标题（h4 量级，text-base font-semibold）+ 描述，放在带边框圆角的卡片内，代表表单 / 区块标题。
- 小节标题（h5 量级，text-sm font-medium，大写 + letter-spacing + muted 色），下方接说明文字，用于「高级选项」等次级分组。

样式约束：
- 仅用 design token 类（text-foreground、text-muted-foreground、border 等），禁止硬编码颜色值。
- 无衬线系统字体；标题层级仅靠字号 / 字重 / 颜色区分，不引入装饰字体；层级之间留白充足。

响应式：
- 移动端标题字号可略降，层级关系保持一致。

数据为静态文案。输出完整可运行组件。`,
    Comp: HeadingsExample,
  },
  {
    id: "alerts",
    title: "警报",
    nameEn: "Alerts",
    desc: "带描述 / 列表 / 操作 / 链接 / 强调边框 / 关闭",
    usage: "表单提交反馈、系统通知横幅、操作成功提示、错误告警、引导性提示、全局消息",
    keywords: "alert 警报 提示 通知 警告 错误 成功 横幅 banner 描述 列表 操作 关闭 强调边框",
    prompt: `请生成一个「警报（Alerts）」组件示例，技术栈 React + Tailwind CSS。

展示多种形态（桌面 ≥1024px），每种一行：
- 描述型：图标 + 标题 + 一段描述（如「已保存草稿 / 2 分钟前自动保存」）。
- 列表型：警告图标 + 标题 + 无序列表（如「2 项待处理」）。
- 操作型：图标 + 文案 + 右侧主色按钮（如「立即升级」）。
- 链接型：成功图标 + 文案 + 右侧品牌色带箭头链接（「查看详情」）。
- 强调边框型：左侧 4px 品牌色竖条（border-l-4 border-primary）+ 图标 + 文案，突出关键信息。
- 可关闭型：错误色边框 + 图标 + 文案 + 右上角关闭按钮（点击移除，前端 state）。

样式约束：
- 仅用 design token 类（bg-background、border、text-muted-foreground、text-primary、text-destructive 等），图标可用 text-primary / text-amber-500 / text-emerald-500 / text-destructive 区分语义；禁止硬编码其他颜色值。
- 无衬线系统字体；圆角细边框；图标用 lucide-react。

响应式：
- 移动端操作 / 链接型改为纵向堆叠（按钮 / 链接换行）。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: AlertsExample,
  },
  {
    id: "empty",
    title: "空状态",
    nameEn: "Empty States",
    desc: "图标 + 标题 + 描述 + 操作",
    usage: "无数据占位、搜索无结果、引导新建、列表空白、首次使用引导",
    keywords: "empty 空状态 无数据 占位 引导 新建 搜索无结果 空 图标",
    prompt: `请生成一个「空状态（Empty States）」组件示例，技术栈 React + Tailwind CSS。

展示两种常见形态（桌面 ≥1024px）：
- 主引导型：居中卡片，虚线边框（border-dashed），顶部大号 muted 图标（如 Inbox），标题（「还没有任何项目」），描述（「创建你的第一个项目开始吧」），下方主色按钮（图标 + 「新建项目」）。
- 轻量型：更小尺寸虚线虚框，居中图标（如 Search）+ 一句 muted 文案（「未找到匹配的结果」），无按钮。

样式约束：
- 仅用 design token 类（bg-background、border-dashed、text-muted-foreground、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体；图标用 lucide-react，尺寸适中（size-8 / size-6）；主色按钮用 text-primary 背景。

响应式：
- 移动端卡片占满宽度，内边距适度缩小。

数据全部用占位 mock，不接后端。输出完整可运行组件。`,
    Comp: EmptyStatesExample,
  },
];

function PromptBlock({ prompt }: { prompt: string }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 复制失败静默忽略 */
    }
  }, [prompt]);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="prompt" className="border-b-0">
        <AccordionTrigger className="text-xs font-medium text-primary hover:text-primary/80 [&_svg]:text-primary">
          给 AI 的提示词（点击展开）
        </AccordionTrigger>
        <AccordionContent className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              可直接复制给 AI，生成此页面布局
            </span>
            <Button size="sm" variant="outline" onClick={onCopy}>
              {copied ? "已复制" : "复制提示词"}
            </Button>
          </div>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground/90">
            {prompt}
          </pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function ExamplesGallery() {
  const [q, setQ] = React.useState("");
  const s = q.trim().toLowerCase();
  const list = s
    ? pageExamples.filter((e) =>
        `${e.title} ${e.desc} ${e.keywords} ${e.usage ?? ""} ${e.prompt ?? ""}`
          .toLowerCase()
          .includes(s),
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

      {list.length === 0 && (
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          未找到与「{q}」匹配的示例。
        </p>
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
                <h2 className="text-lg font-medium">
                  {e.title}
                  <span className="ml-2 font-mono text-sm font-normal text-muted-foreground/60">
                    {e.nameEn}
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
                {e.usage && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.usage.split(/[、,，]/).map((u) => (
                      <span
                        key={u}
                        className="rounded-full border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {u.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="hover-lift overflow-hidden rounded-lg border bg-muted/20 p-4 sm:p-6">
                <Comp />
              </div>
              {e.prompt && <PromptBlock prompt={e.prompt} />}
            </section>
          );
        })}
      </div>
    </div>
  );
}
