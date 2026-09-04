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
  Tag,
  Clock,
  User,
  Package,
  Palette,
  ShieldCheck,
  UserPlus,
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
  const sections = [
    { id: "profile", label: "个人资料", icon: User },
    { id: "appearance", label: "外观", icon: Palette },
    { id: "notify", label: "通知", icon: Bell },
    { id: "security", label: "安全", icon: ShieldCheck },
  ];
  const [active, setActive] = React.useState("profile");
  const go = (id: string) => {
    setActive(id);
    document
      .getElementById(`settings-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="flex h-[520px] overflow-hidden rounded-md border text-sm">
          {/* 左侧分组导航 */}
          <aside className="hidden w-44 shrink-0 flex-col border-r bg-muted/30 sm:flex">
            <div className="flex h-12 shrink-0 items-center border-b px-3">
              <span className="font-semibold">设置</span>
            </div>
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left ${
                    active === s.id
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <s.icon className="size-4 shrink-0" />
                  <span>{s.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* 右侧滚动内容 */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
              <h3 className="text-lg font-semibold">设置</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                管理写意站点的个人偏好与安全选项。
              </p>

              <section id="settings-profile" className="mt-6 scroll-mt-4">
                <h4 className="text-base font-semibold">个人资料</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  这些信息将展示在你的个人主页。
                </p>
                <div className="mt-3 divide-y rounded-md border">
                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div>
                      <div className="text-xs text-muted-foreground">昵称</div>
                      <div className="font-medium">二哥</div>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">
                      更新
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div>
                      <div className="text-xs text-muted-foreground">署名</div>
                      <div className="font-medium">B站·宝藏二哥AIA</div>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">
                      更新
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div>
                      <div className="text-xs text-muted-foreground">主页</div>
                      <a
                        href="https://space.bilibili.com/67221461"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        space.bilibili.com/67221461
                      </a>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">
                      更新
                    </button>
                  </div>
                </div>
              </section>

              <section id="settings-appearance" className="mt-6 scroll-mt-4">
                <h4 className="text-base font-semibold">外观</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  主题与语言偏好，即时生效。
                </p>
                <div className="mt-3 divide-y rounded-md border">
                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div>
                      <div className="text-xs text-muted-foreground">主题</div>
                      <div className="font-medium">跟随系统</div>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">
                      更新
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div>
                      <div className="text-xs text-muted-foreground">语言</div>
                      <div className="font-medium">简体中文</div>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">
                      更新
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div>
                      <div className="font-medium">自动切换暗色</div>
                      <div className="text-xs text-muted-foreground">
                        跟随系统外观在明暗主题间自动切换
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </section>

              <section id="settings-notify" className="mt-6 scroll-mt-4">
                <h4 className="text-base font-semibold">通知</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  选择你希望接收的通知类型。
                </p>
                <div className="mt-3 divide-y rounded-md border">
                  {[
                    ["邮件通知", "组件评审与版本发布提醒", true],
                    ["推送通知", "在浏览器接收实时推送", false],
                    ["@提及", "有人在讨论中提及你时提醒", true],
                  ].map(([t, d, on]) => (
                    <div
                      key={t as string}
                      className="flex items-center justify-between gap-3 px-3 py-2.5"
                    >
                      <div>
                        <div className="font-medium">{t}</div>
                        <div className="text-xs text-muted-foreground">{d}</div>
                      </div>
                      <Switch defaultChecked={on as boolean} />
                    </div>
                  ))}
                </div>
              </section>

              <section id="settings-security" className="mt-6 scroll-mt-4">
                <h4 className="text-base font-semibold">安全</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  管理登录设备与备用验证方式。
                </p>
                <div className="mt-3 divide-y rounded-md border">
                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        已登录设备
                      </div>
                      <div className="font-medium">3 台</div>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">
                      更新
                    </button>
                  </div>
                  <div className="px-3 py-2.5">
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      <Plus className="size-3.5" /> 添加备用邮箱
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
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
  const stats = [
    { label: "组件", value: "28" },
    { label: "示例", value: "15" },
    { label: "概念", value: "21" },
  ];
  return (
    <section className="example-canvas space-y-8">
      {/* 页面标题：眉题 + 元信息 + 操作 */}
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              组件详情
            </div>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="text-xl font-semibold">Button 按钮</h3>
              <Badge>已发布</Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Tag className="size-3.5" /> v1.4.0
              </span>
              <span className="inline-flex items-center gap-1">
                <User className="size-3.5" /> B站·宝藏二哥AIA
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" /> 2 小时前更新
              </span>
              <span className="inline-flex items-center gap-1">
                <Package className="size-3.5" /> @base-ui/react
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              复制名称
            </Button>
            <Button size="sm">复制提示词</Button>
          </div>
        </div>
      </Reveal>

      {/* 页面标题：面包屑 + 描述 */}
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>首页</span>
              <span>/</span>
              <span>组件</span>
              <span>/</span>
              <span className="font-medium text-foreground">版本发布</span>
            </div>
            <h3 className="mt-1 text-xl font-semibold">v1.5 版本发布</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              汇总本次版本的组件变更与示例更新，发布前请完成走查。
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              查看进度
            </Button>
            <Button size="sm">发布</Button>
          </div>
        </div>
      </Reveal>

      {/* 页面标题：头像 + 统计 */}
      <Reveal>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar name="二哥" />
              <div>
                <h3 className="text-lg font-semibold">二哥</h3>
                <div className="text-xs text-muted-foreground">
                  B站·宝藏二哥AIA · 站点维护者
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline">
              编辑资料
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:max-w-sm">
            {stats.map((s) => (
              <div key={s.label} className="rounded-md border p-3 text-center">
                <div className="text-xl font-semibold tabular-nums">
                  {s.value}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 次级层级：卡片标题与章节标题 */}
      <Reveal>
        <div className="rounded-md border p-4">
          <h4 className="text-base font-semibold">基本信息</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            卡片级标题：用于表单与设置区块，字重与字号次于页面标题。
          </p>
        </div>
        <div className="mt-4">
          <h5 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            高级选项
          </h5>
          <div className="mt-2 text-sm">
            章节标题：muted 小字加大写间距，用于次级分组的收束。
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 14. 警报（feedback: alerts，6 个变体独立示例） ---------- */

// 14.1 描述型：图标 + 标题 + 描述
function AlertsExample() {
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="flex gap-3 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-sm">
          <Info className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <div>
            <div className="font-medium">注意：即将达到存储上限</div>
            <div className="mt-0.5 text-muted-foreground">
              当前空间已使用 92%，建议清理历史版本，或升级容量后继续上传。
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 14.2 错误列表型：摘要 + 无序列表
function AlertListExample() {
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="flex gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <div>
            <div className="font-medium">提交失败，请修复 2 处错误</div>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
              <li>组件名不能包含空格与特殊字符</li>
              <li>版本号需符合语义化版本规范（如 1.4.0）</li>
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 14.3 操作型：成功提示 + 底部按钮组
function AlertActionsExample() {
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            <div>
              <div className="font-medium">发布完成</div>
              <div className="mt-0.5 text-muted-foreground">
                「写意 v1.5」已发布至生产环境，示例与文档已同步更新。
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm">查看详情</Button>
            <Button size="sm" variant="outline">
              知道了
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 14.4 实底通栏：深底横幅 + 右侧链接
function AlertBannerExample() {
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="flex items-center justify-between gap-3 rounded-md bg-foreground px-3.5 py-2.5 text-sm text-background">
          <p>写意 v1.5.0 现已可用：新增 12 个组件示例与 6 个页面布局。</p>
          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-1 font-medium hover:underline"
          >
            查看更新日志 <ArrowRight className="size-3.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// 14.5 强调边框：品牌色左竖条 + 内嵌链接
function AlertBorderExample() {
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="flex items-center gap-3 rounded-md border-l-4 border-primary bg-muted/30 p-3 text-sm">
          <AlertTriangle className="size-4 shrink-0 text-primary" />
          <p className="text-muted-foreground">
            免费额度即将用完，
            <a href="#" className="font-medium text-primary hover:underline">
              升级账户
            </a>
            以解锁无限组件导出。
          </p>
        </div>
      </Reveal>
    </section>
  );
}

// 14.6 可关闭：成功提示 + 关闭按钮（可恢复演示）
function AlertDismissExample() {
  const [visible, setVisible] = React.useState(true);
  return (
    <section className="example-canvas">
      <Reveal>
        {visible ? (
          <div className="flex items-start justify-between gap-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <div>
                <div className="font-medium">上传成功</div>
                <div className="mt-0.5 text-muted-foreground">
                  「Button 按钮」示例包已发布到组件库。
                </div>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="关闭"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div className="rounded-md border border-dashed p-3 text-center text-xs text-muted-foreground">
            警报已关闭，
            <button
              onClick={() => setVisible(true)}
              className="font-medium text-primary hover:underline"
            >
              重新显示
            </button>
          </div>
        )}
      </Reveal>
    </section>
  );
}

/* ---------- 15. 空状态（feedback: empty states，6 个变体独立示例） ---------- */

// 15.1 极简：圆形图标 + 短语 + 主按钮
function EmptyStatesExample() {
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Inbox className="size-6 text-muted-foreground" />
          </span>
          <div className="text-sm font-medium">还没有收到任何反馈</div>
          <div className="max-w-xs text-xs text-muted-foreground">
            组件发布后，使用者会在评论区留下使用感受与改进建议。
          </div>
          <Button size="sm" className="mt-1">
            <Plus className="size-4" /> 写一条评论
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

// 15.2 边框卡片：居中引导
function EmptyCardExample() {
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="mx-auto flex max-w-md flex-col items-center gap-1.5 rounded-lg border p-8 text-center">
          <Sparkles className="size-6 text-muted-foreground" />
          <div className="mt-1 text-sm font-medium">创建你的第一个示例</div>
          <div className="text-xs leading-relaxed text-muted-foreground">
            示例是学习组件用法最直接的入口。从常用页面布局开始，或复制提示词让
            AI 先生成一版初稿。
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 15.3 快捷操作网格
function EmptyQuickExample() {
  const actions = [
    { title: "新建组件", desc: "选择类别并补全描述", color: "bg-violet-500", icon: Component },
    { title: "导入主题", desc: "粘贴 palette 一键换肤", color: "bg-blue-500", icon: Palette },
    { title: "浏览示例", desc: "15 个页面级真实布局", color: "bg-emerald-500", icon: Sparkles },
    { title: "提示词库", desc: "52 条工程场景提示词", color: "bg-amber-500", icon: MessagesSquare },
    { title: "参考资源", desc: "26 项精选外部资源", color: "bg-pink-500", icon: BookOpen },
    { title: "邀请成员", desc: "一起维护组件库", color: "bg-sky-500", icon: UserPlus },
  ];
  return (
    <section className="example-canvas">
      <Reveal>
        <div>
          <h4 className="text-base font-semibold">开始使用写意</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">
            这里还没有内容。可以从下面的任一操作开始，几分钟内建立你的第一个页面。
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {actions.map((a) => (
              <button
                key={a.title}
                className="flex items-start gap-2.5 rounded-lg border border-transparent p-2 text-left hover:border-border hover:bg-muted/30"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.color} text-white`}
                >
                  <a.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{a.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {a.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3">
            <a href="#" className="text-xs font-medium text-primary hover:underline">
              查看全部快捷操作 →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 15.4 邀请协作：深色卡 + 邀请表单 + 最近添加列表
function EmptyInviteExample() {
  const recent = [
    { who: "李雷", role: "组件工程师" },
    { who: "韩梅梅", role: "交互设计师" },
    { who: "张伟", role: "前端开发" },
  ];
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="rounded-lg bg-foreground p-6 text-background">
          <div className="flex flex-col items-center text-center">
            <UserPlus className="size-6" />
            <div className="mt-2 text-sm font-medium">添加团队成员</div>
            <div className="mt-1 max-w-sm text-xs text-background/60">
              邀请协作维护组件库。成员可以在示例下评论、参与评审并接收版本通知。
            </div>
            <div className="mt-4 flex w-full max-w-sm gap-2">
              <Input placeholder="输入邮箱" className="h-8 text-xs" />
              <Button size="sm">发送邀请</Button>
            </div>
          </div>
          <div className="mt-5 border-t border-background/15 pt-3">
            <div className="text-xs text-background/60">最近添加</div>
            <ul className="mt-2 space-y-2">
              {recent.map((r) => (
                <li key={r.who} className="flex items-center gap-2">
                  <Avatar name={r.who} />
                  <span className="font-medium">{r.who}</span>
                  <span className="text-xs text-background/60">{r.role}</span>
                  <button className="ml-auto text-xs hover:underline">
                    移除
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 15.5 操作列表：纵向可点行
function EmptyActionsExample() {
  const actions = [
    { title: "从模板开始", desc: "选择一个预置布局，一分钟搭好骨架", color: "bg-violet-500", icon: Component },
    { title: "导入现有组件", desc: "粘贴代码或仓库链接，自动生成文档", color: "bg-blue-500", icon: Palette },
    { title: "让 AI 生成", desc: "描述你的需求，提示词已备好", color: "bg-emerald-500", icon: Sparkles },
  ];
  return (
    <section className="example-canvas">
      <Reveal>
        <div>
          <h4 className="text-base font-semibold">创建你的第一个项目</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">
            还没有任何项目。以下三种方式都可以开始，之后随时可以回来补充。
          </p>
          <div className="mt-4 space-y-2">
            {actions.map((a) => (
              <button
                key={a.title}
                className="flex w-full items-center gap-3 rounded-lg border border-transparent p-3 text-left hover:border-border hover:bg-muted/30"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.color} text-white`}
                >
                  <a.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{a.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {a.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3">
            <a href="#" className="text-xs font-medium text-primary hover:underline">
              浏览更多建议 →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 15.6 推荐网格：居中引导 + 搜索 + 两列最近添加
function EmptyGridExample() {
  const recent = [
    { who: "李雷", role: "组件工程师" },
    { who: "韩梅梅", role: "交互设计师" },
    { who: "张伟", role: "前端开发" },
    { who: "王芳", role: "内容运营" },
  ];
  return (
    <section className="example-canvas">
      <Reveal>
        <div className="rounded-lg border p-6">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <UserPlus className="size-6 text-muted-foreground" />
            </span>
            <div className="mt-2 text-sm font-medium">添加团队成员</div>
            <div className="mt-1 max-w-sm text-xs text-muted-foreground">
              按邮箱搜索或邀请，被邀请的成员将收到一封说明邮件。
            </div>
            <div className="mt-4 flex w-full max-w-md gap-2">
              <Input placeholder="搜索成员或输入邮箱" className="h-8 text-xs" />
              <Button size="sm">发送邀请</Button>
            </div>
          </div>
          <div className="mt-5 border-t pt-3">
            <div className="text-xs text-muted-foreground">最近添加</div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {recent.map((r) => (
                <div
                  key={r.who}
                  className="flex items-center gap-2 rounded-md border px-3 py-2"
                >
                  <Avatar name={r.who} />
                  <span className="font-medium">{r.who}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {r.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
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
    desc: "左分组导航 + 分区块滚动内容",
    usage: "账户设置中心、产品偏好配置、后台配置页、应用个性化面板",
    keywords:
      "settings 设置 偏好 分组导航 个人资料 外观 通知 安全 开关 switch 主题 语言 滚动",
    prompt: `请生成一个「设置页（Settings Screen）」页面，技术栈 React + Tailwind CSS。

布局（桌面 ≥640px，外框固定高度约 520px）：
- 左侧分组导航（宽约 176px）：顶部「设置」标题；竖向导航（个人资料 / 外观 / 通知 / 安全，图标 + 文字，当前项 accent 浅底高亮，点击平滑滚动到对应区块并保持高亮）。
- 右侧滚动内容区（max-width 约 672px 居中）：页头（「设置」大标题 + 一句 muted 描述）；4 个分组，每组：h4 标题 + muted 说明 + 圆角边框列表（行间分隔线 divide-y）：
  - 个人资料：行式信息（昵称「二哥」/ 署名「B站·宝藏二哥AIA」/ 主页链接 space.bilibili.com/67221461 新窗口打开），每行右侧品牌色「更新」文字按钮。
  - 外观：主题（跟随系统）、语言（简体中文）行 + 更新按钮；「自动切换暗色」行 + Switch。
  - 通知：邮件通知（开）/ 推送通知（关）/ @提及（开），每行标题 + muted 描述 + Switch。
  - 安全：已登录设备（3 台）行 + 更新；「+ 添加备用邮箱」品牌色文字链接。

样式约束：
- 仅用 design token 类（bg-background、bg-muted/30、text-muted-foreground、border、bg-accent、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体，不引入装饰字体；Switch 用品牌色表示开启。

响应式：
- <640px 隐藏左侧导航，内容占满（可用下拉或横向 Tab 替代导航）。

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
    desc: "页头范式：元信息 / 面包屑 / 头像统计 / 次级层级",
    usage: "页面排版规范、详情页页头、个人主页头、设置分组标题、内容层级示范",
    keywords:
      "heading 标题 页面标题 page heading 眉题 eyebrow 元信息 面包屑 breadcrumb 统计 卡片标题 章节标题 排版 typography 层级",
    prompt: `请生成一个「页面标题（Page Headings）」排版示例，技术栈 React + Tailwind CSS。

展示 4 种页头形态（桌面 ≥1024px，形态之间用充足留白分隔）：
- 页面标题 · 带元信息与操作：eyebrow 小字（muted、大写间距）+ 大标题（text-xl font-semibold）+ 状态 Badge；标题下方一行元信息（小图标 + muted 文本：版本、作者「B站·宝藏二哥AIA」、更新时间、依赖）；右侧操作按钮组（次要 + 主色）。
- 页面标题 · 带面包屑：面包屑（首页 / 组件 / 当前页，当前项加亮）+ 大标题 + 一句 muted 描述；右侧操作按钮组。
- 个人页头：圆形头像 + 姓名（「二哥」）+ 全称署名与角色（muted 小字）+ 右侧按钮；下方 3 列统计块（大数字 tabular-nums + muted 标签）。
- 次级层级：卡片级标题（h4，带边框卡片内）与章节标题（h5，muted 小字大写间距），体现页面标题之下的层级收束。

样式约束：
- 仅用 design token 类（text-foreground、text-muted-foreground、border、bg-primary/10、text-primary 等），禁止硬编码颜色值。
- 无衬线系统字体，不引入装饰字体；标题层级靠字号 / 字重 / 颜色区分；元信息与面包屑用 lucide 小图标。

响应式：
- 移动端标题与操作按钮换行堆叠，统计块保持 3 列或改 1 列。

数据为静态文案。输出完整可运行组件。`,
    Comp: HeadingsExample,
  },
  {
    id: "alerts",
    title: "警报 · 描述提示",
    nameEn: "Alert",
    desc: "图标 + 标题 + 描述的浅底提示",
    usage: "存储提醒、审核结果、维护公告、上下文提示",
    keywords:
      "alert 警报 提示 注意 描述 info 琥珀 amber 浅底 标题 描述 非错误",
    prompt: `请生成一个「描述型警报」组件，技术栈 React + Tailwind CSS。

使用场景：需要引起注意但不是错误的提示，如存储上限提醒、维护公告、审核结果。

样式（桌面 ≥1024px）：
- 单条卡片：琥珀色浅底（bg-amber-500/5）+ 琥珀细边框（border-amber-500/30），内含琥珀色 Info 图标 + 粗体标题（如「注意：即将达到存储上限」）+ 一句 muted 描述。
- 图标与文字左对齐，图标顶部对齐标题行。

样式约束：
- 语义色仅用于图标 / 边框 / 浅底（amber-500 系列），正文一律 design token（text-foreground、text-muted-foreground），不引入其他硬编码颜色。
- 无衬线系统字体；圆角细边框；图标用 lucide-react。

响应式：移动端内边距略缩。

数据为静态文案。输出完整可运行组件。`,
    Comp: AlertsExample,
  },
  {
    id: "alerts-list",
    title: "警报 · 错误列表",
    nameEn: "Alert List",
    desc: "错误摘要 + 无序列表逐条说明",
    usage: "表单校验错误、导入失败清单、必填项缺失提示",
    keywords:
      "alert 警报 错误 列表 list 校验 失败 destructive 红 无序 列表 提交",
    prompt: `请生成一个「错误列表型警报」组件，技术栈 React + Tailwind CSS。

使用场景：表单提交校验失败、批量导入出错等需要逐条列明问题的场合。

样式（桌面 ≥1024px）：
- 单条卡片：错误色浅底（bg-destructive/5）+ 错误色细边框（border-destructive/30），内含红色 AlertTriangle 图标 + 粗体错误摘要（如「提交失败，请修复 2 处错误」）。
- 摘要下方为无序列表（list-disc），逐条列出具体错误（如「组件名不能包含空格与特殊字符」「版本号需符合语义化版本规范」），列表文字用 muted。

样式约束：
- 语义色仅用于图标 / 边框 / 浅底（destructive 系列），正文一律 design token。
- 无衬线系统字体；圆角细边框；图标用 lucide-react。

响应式：移动端内边距略缩。

数据为静态文案。输出完整可运行组件。`,
    Comp: AlertListExample,
  },
  {
    id: "alerts-actions",
    title: "警报 · 操作按钮",
    nameEn: "Alert Actions",
    desc: "成功提示 + 底部按钮组",
    usage: "发布完成、支付成功、流程结束确认",
    keywords:
      "alert 警报 操作 actions 按钮 成功 发布 emerald 绿 确认 流程",
    prompt: `请生成一个「带操作按钮的警报」组件，技术栈 React + Tailwind CSS。

使用场景：流程结束后的确认反馈，如发布完成、订单支付成功，用户需要在此选择后续动作。

样式（桌面 ≥1024px）：
- 卡片：绿色浅底（bg-emerald-500/5）+ 绿色细边框（border-emerald-500/30）。
- 上部：绿色 CheckCircle2 图标 + 粗体标题（如「发布完成」）+ 一句 muted 描述（如「已发布至生产环境，示例与文档已同步更新」）。
- 底部：一行操作按钮组——主色「查看详情」+ 次要描边「知道了」。

样式约束：
- 语义色仅用于图标 / 边框 / 浅底（emerald 系列），按钮用 design token 主色。
- 无衬线系统字体；圆角细边框；图标用 lucide-react。

响应式：移动端按钮换行或占满宽度。

数据为静态文案。输出完整可运行组件。`,
    Comp: AlertActionsExample,
  },
  {
    id: "alerts-banner",
    title: "警报 · 实底横幅",
    nameEn: "Solid Banner",
    desc: "深底通栏 + 右侧箭头链接",
    usage: "新版本上线、系统公告、全站级重要消息",
    keywords:
      "alert 警报 横幅 banner 实底 通栏 公告 版本 链接 深底 全站",
    prompt: `请生成一个「实底通栏横幅」组件，技术栈 React + Tailwind CSS。

使用场景：全站级重要公告，如新版本上线、系统级通知，需要一眼扫过就能注意到。

样式（桌面 ≥1024px）：
- 整条深色实底横幅：bg-foreground 搭配 text-background（前景背景互为反色，明暗主题下对比度天然达标）。
- 一行内容：左侧文案（如「写意 v1.5.0 现已可用：新增 12 个组件示例与 6 个页面布局」），右侧带箭头的链接「查看更新日志 →」（ArrowRight 图标，hover 下划线）。
- 文案过长时链接不换行（shrink-0），文字可截断。

样式约束：
- 只用 bg-foreground / text-background 这对反色 token，不引入其他颜色；无衬线系统字体。

响应式：移动端改为纵向堆叠（文案在上、链接在下）。

数据为静态文案。输出完整可运行组件。`,
    Comp: AlertBannerExample,
  },
  {
    id: "alerts-border",
    title: "警报 · 强调边框",
    nameEn: "Accent Border",
    desc: "品牌色左竖条 + 内嵌链接",
    usage: "额度提醒、升级引导、关键信息强调",
    keywords:
      "alert 警报 强调边框 accent border 左竖条 品牌色 升级 额度 内嵌链接",
    prompt: `请生成一个「强调边框警报」组件，技术栈 React + Tailwind CSS。

使用场景：在普通内容流中突出一条关键信息，如额度即将用完、需要升级引导。

样式（桌面 ≥1024px）：
- 单条卡片：默认浅底（bg-muted/30）+ 常规细边框，但左侧为 4px 品牌色竖条（border-l-4 border-primary）。
- 内容为一句话，内嵌品牌色链接：muted 文字（如「免费额度即将用完，」）+ 品牌色粗体链接（如「升级账户」）+ muted 续文；可配品牌色 AlertTriangle 小图标。

样式约束：
- 强调色只用 text-primary / border-primary，正文与底色用 design token。
- 无衬线系统字体；图标用 lucide-react。

响应式：移动端文字换行、链接可独立成行。

数据为静态文案。输出完整可运行组件。`,
    Comp: AlertBorderExample,
  },
  {
    id: "alerts-dismiss",
    title: "警报 · 可关闭",
    nameEn: "Dismissible",
    desc: "成功提示 + 右上角关闭（可恢复）",
    usage: "上传成功、任务完成、可关闭的即时反馈",
    keywords:
      "alert 警报 可关闭 dismissible 关闭 上传成功 emerald X 重新显示 状态",
    prompt: `请生成一个「可关闭警报」组件，技术栈 React + Tailwind CSS。

使用场景：操作成功后的即时反馈，如上传成功、任务完成，用户看完即可关掉。

样式（桌面 ≥1024px）：
- 卡片：绿色浅底（bg-emerald-500/5）+ 绿色细边框，左侧绿色 CheckCircle2 图标 + 粗体标题（如「上传成功」）+ 一句 muted 描述。
- 右上角 X 关闭按钮（aria-label="关闭"），点击后整条移除（前端 state）。
- 关闭后显示一行虚线边框占位，内含「重新显示」品牌色链接，便于反复演示关闭 / 恢复。

样式约束：
- 语义色仅用于图标 / 边框 / 浅底（emerald 系列），其余用 design token。
- 无衬线系统字体；图标用 lucide-react。

响应式：移动端文案与关闭按钮保持同行，描述可换行。

数据为静态文案，仅前端 state。输出完整可运行组件。`,
    Comp: AlertDismissExample,
  },
  {
    id: "empty",
    title: "空状态 · 极简",
    nameEn: "Simple",
    desc: "圆形图标 + 短语 + 主按钮",
    usage: "列表无数据、评论区为空、首次进入",
    keywords:
      "empty 空状态 无数据 占位 引导 极简 simple 图标 主按钮 首次",
    prompt: `请生成一个「极简空状态」组件，技术栈 React + Tailwind CSS。

使用场景：列表或评论区还没有任何数据时的首次呈现。

样式（桌面 ≥1024px）：
- 居中竖排卡片，虚线边框（border-dashed）：顶部圆形浅底图标（muted 圆底内放 muted 的 Inbox 图标）+ 一句粗体短语（如「还没有收到任何反馈」）+ 一句 muted 说明 + 主色按钮（如「写一条评论」，可带 Plus 图标）。
- 各元素垂直间距均匀，内容居中对齐。

样式约束：
- 仅用 design token 类（border-dashed、bg-muted、text-muted-foreground、text-primary 等），禁止硬编码颜色值；图标用 lucide-react。
- 无衬线系统字体。

响应式：移动端内边距略缩。

数据为静态文案。输出完整可运行组件。`,
    Comp: EmptyStatesExample,
  },
  {
    id: "empty-card",
    title: "空状态 · 边框卡片",
    nameEn: "Bordered Card",
    desc: "实线边框卡片内的居中引导",
    usage: "板块首次使用、内容为空但功能已就绪",
    keywords:
      "empty 空状态 边框 卡片 card 居中 引导 创建 首次使用 说明",
    prompt: `请生成一个「边框卡片空状态」组件，技术栈 React + Tailwind CSS。

使用场景：某个板块首次使用、内容为空但功能已就绪，需要一段更完整的引导说明。

样式（桌面 ≥1024px）：
- 居中窄卡片（max-width 约 448px）：实线细边框圆角，内部居中排版：图标（如 Sparkles）+ 粗体标题（如「创建你的第一个示例」）+ 一到两句 muted 说明。
- 说明要写清「接下来能做什么」与「有什么价值」，不放按钮，让用户自行探索入口。

样式约束：
- 仅用 design token 类（border、text-muted-foreground 等），禁止硬编码颜色值；图标用 lucide-react。
- 无衬线系统字体；说明文字用 leading-relaxed 保证可读性。

响应式：移动端卡片占满宽度、内边距略缩。

数据为静态文案。输出完整可运行组件。`,
    Comp: EmptyCardExample,
  },
  {
    id: "empty-quick",
    title: "空状态 · 快捷操作",
    nameEn: "Quick Actions",
    desc: "彩色图标网格 + 底部更多链接",
    usage: "新手引导、功能入口聚合、开始使用页",
    keywords:
      "empty 空状态 快捷操作 quick actions 网格 图标 彩色 新手 引导 入口",
    prompt: `请生成一个「快捷操作空状态」组件，技术栈 React + Tailwind CSS。

使用场景：新手引导——空页面不只会说「没有数据」，更要把常用的几个功能入口聚合起来。

样式（桌面 ≥1024px）：
- 左对齐标题（如「开始使用写意」，text-base font-semibold）+ 一句 muted 说明。
- 下方图标网格（桌面 3 列、移动 1 列）：每项 = 彩色实底圆角方块图标（violet / blue / emerald / amber / pink / sky 各一，白色图标）+ 粗体操作名 + muted 一句描述；整项可点击，hover 时显示边框与浅底。
- 底部一行品牌色文字链接「查看全部快捷操作 →」。

样式约束：
- 彩色仅用于图标方块（Tailwind 标准色板 500 系），其余一律 design token；图标用 lucide-react。
- 无衬线系统字体。

响应式：<640px 网格改单列。

数据为静态文案。输出完整可运行组件。`,
    Comp: EmptyQuickExample,
  },
  {
    id: "empty-invite",
    title: "空状态 · 邀请协作",
    nameEn: "Invite",
    desc: "深色卡 + 邀请表单 + 最近添加列表",
    usage: "邀请团队成员、冷启动协作、社区早期",
    keywords:
      "empty 空状态 邀请 invite 成员 深色卡 表单 最近添加 团队 协作",
    prompt: `请生成一个「邀请协作空状态」组件，技术栈 React + Tailwind CSS。

使用场景：邀请团队成员协作（冷启动阶段），同时展示最近添加的人来降低陌生感。

样式（桌面 ≥1024px）：
- 深色实底卡片：bg-foreground 搭配 text-background（前景背景互为反色，明暗主题下对比度天然达标）。
- 上半部分居中：UserPlus 图标 + 粗体标题（如「添加团队成员」）+ muted 说明（用 text-background/60）+ 一行邀请表单（邮箱输入框 + 主色「发送邀请」按钮）。
- 下半部分：细分隔线（border-background/15）+ 小字「最近添加」+ 纵向列表（头像 + 姓名 + muted 角色 + 行尾「移除」链接）。

样式约束：
- 只用 bg-foreground / text-background 这对反色 token 及其透明度变体；按钮用主色 token；图标用 lucide-react。
- 无衬线系统字体。

响应式：移动端表单按钮换行、列表保持纵向。

数据为静态文案。输出完整可运行组件。`,
    Comp: EmptyInviteExample,
  },
  {
    id: "empty-actions",
    title: "空状态 · 操作列表",
    nameEn: "Action List",
    desc: "纵向操作行 + 描述 + 更多链接",
    usage: "创建引导、多种起步路径、替代方案建议",
    keywords:
      "empty 空状态 操作列表 action list 纵向 行 起步 路径 建议",
    prompt: `请生成一个「操作列表空状态」组件，技术栈 React + Tailwind CSS。

使用场景：创建引导——给用户几条可选的起步路径，每条都说清能做什么。

样式（桌面 ≥1024px）：
- 左对齐标题（如「创建你的第一个项目」）+ muted 说明（如「以下三种方式都可以开始」）。
- 纵向操作列表：每行 = 彩色实底圆角方块图标（violet / blue / emerald）+ 粗体操作名 + muted 一句描述；整行可点击，默认透明边框，hover 显示边框与浅底。
- 底部一行品牌色链接「浏览更多建议 →」。

样式约束：
- 彩色仅用于图标方块（Tailwind 标准色板 500 系），其余一律 design token；图标用 lucide-react。
- 无衬线系统字体。

响应式：移动端行内文字换行。

数据为静态文案。输出完整可运行组件。`,
    Comp: EmptyActionsExample,
  },
  {
    id: "empty-grid",
    title: "空状态 · 推荐网格",
    nameEn: "Recommend Grid",
    desc: "居中引导 + 搜索 + 两列最近添加",
    usage: "邀请成员、推荐关注、最近项目展示",
    keywords:
      "empty 空状态 推荐 recommend grid 网格 搜索 邀请 两列 最近",
    prompt: `请生成一个「推荐网格空状态」组件，技术栈 React + Tailwind CSS。

使用场景：邀请成员 / 推荐关注的浅色变体——引导之外再用真实数据（最近添加）填充空隙。

样式（桌面 ≥1024px）：
- 边框圆角卡片内部居中：圆形浅底 UserPlus 图标 + 粗体标题（如「添加团队成员」）+ muted 说明 + 一行搜索输入框 + 主色「发送邀请」按钮。
- 细分隔线下小字「最近添加」，随后两列网格（桌面 2 列、移动 1 列）：每格为边框圆角行（头像 + 姓名 + 行尾 muted 角色）。

样式约束：
- 仅用 design token 类（border、bg-muted、text-muted-foreground、text-primary 等），禁止硬编码颜色值；图标用 lucide-react。
- 无衬线系统字体。

响应式：移动端网格改单列。

数据为静态文案。输出完整可运行组件。`,
    Comp: EmptyGridExample,
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
