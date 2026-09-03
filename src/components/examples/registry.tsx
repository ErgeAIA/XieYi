"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, Radio } from "@/components/ui/radio-group";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Trash2,
  Upload,
  X,
  Search,
  Paperclip,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";

/* ---------- M1：代表性组件 ---------- */

function ButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>主要操作</Button>
      <Button variant="secondary">次要</Button>
      <Button variant="outline">描边</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="destructive">删除</Button>
    </div>
  );
}

function InputExample() {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入点什么…"
      />
      <p className="text-xs text-muted-foreground">
        你输入了：{value || "（空）"}
      </p>
    </div>
  );
}

function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>默认</Badge>
      <Badge variant="secondary">次要</Badge>
      <Badge variant="destructive">故障</Badge>
      <Badge variant="outline">描边</Badge>
    </div>
  );
}

function CardExample() {
  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle>项目概览</CardTitle>
        <CardDescription>本周进度与任务状态</CardDescription>
      </CardHeader>
      <CardContent>
        <p>已完成 24 个任务，剩余 6 个进行中，本周进度 78%。</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          查看详情
        </Button>
      </CardFooter>
    </Card>
  );
}

function AlertExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Alert>
        <AlertTitle>系统维护通知</AlertTitle>
        <AlertDescription>
          系统将于今晚 2:00 进行维护，请提前保存工作。
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>上传失败</AlertTitle>
        <AlertDescription>文件大小超出限制，请压缩后重试。</AlertDescription>
      </Alert>
    </div>
  );
}

function TabsExample() {
  return (
    <Tabs defaultValue="general" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="general">通用</TabsTrigger>
        <TabsTrigger value="notify">通知</TabsTrigger>
        <TabsTrigger value="security">安全</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <p className="text-muted-foreground">调整语言、时区和默认页面等通用选项。</p>
      </TabsContent>
      <TabsContent value="notify">
        <p className="text-muted-foreground">选择需要接收的通知类型。</p>
      </TabsContent>
      <TabsContent value="security">
        <p className="text-muted-foreground">修改密码、开启两步验证。</p>
      </TabsContent>
    </Tabs>
  );
}

function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        删除项目
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认删除</DialogTitle>
          <DialogDescription>
            此操作不可撤销，项目及其所有数据将被永久删除。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>取消</DialogClose>
          <Button variant="destructive">确认删除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- M2：缺失表单原语 + 其他含示例组件 ---------- */

function CheckboxExample() {
  return (
    <div className="flex flex-col items-start gap-3">
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked /> 启用通知推送
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox /> 订阅每周摘要
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked disabled /> 自动保存草稿
      </label>
    </div>
  );
}

function SwitchExample() {
  return (
    <div className="flex flex-col items-start gap-3">
      <label className="flex items-center gap-2 text-sm">
        <Switch defaultChecked /> 深色模式
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Switch /> 自动保存
      </label>
    </div>
  );
}

function RadioGroupExample() {
  return (
    <RadioGroup defaultValue="dark">
      <label className="flex items-center gap-2 text-sm">
        <Radio value="dark" /> 深色主题
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="light" /> 浅色主题
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="system" /> 跟随系统
      </label>
    </RadioGroup>
  );
}

const selectFruits = [
  { label: "苹果", value: "apple" },
  { label: "香蕉", value: "banana" },
  { label: "橙子", value: "orange" },
];

function SelectExample() {
  return (
    <Select defaultValue="apple">
      <SelectTrigger>
        <SelectValue placeholder="选择水果" />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner>
          <SelectPopup>
            <SelectList>
              {selectFruits.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}

function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          悬停查看
        </TooltipTrigger>
        <TooltipContent>这是一个工具提示</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SkeletonExample() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

function ProgressExample() {
  const [value, setValue] = React.useState(40);
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setValue((v) => Math.min(100, v + 10))}
        >
          +10
        </Button>
        <span className="text-xs text-muted-foreground">{value}%</span>
      </div>
    </div>
  );
}

function AvatarExample() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
        XY
      </span>
      <span className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
        AB
      </span>
    </div>
  );
}

function BreadcrumbExample() {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span>首页</span>
      <span>/</span>
      <span>组件</span>
      <span>/</span>
      <span className="text-foreground">按钮</span>
    </nav>
  );
}

function PaginationExample() {
  const [page, setPage] = React.useState(1);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((p) => (
        <Button
          key={p}
          size="icon-sm"
          variant={p === page ? "default" : "outline"}
          onClick={() => setPage(p)}
        >
          {p}
        </Button>
      ))}
    </div>
  );
}

function StepsExample() {
  const steps = ["填写信息", "确认订单", "完成"];
  const current = 1;
  return (
    <ol className="flex items-center gap-2 text-sm">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`flex size-6 items-center justify-center rounded-full text-xs ${
              i <= current
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}
          </span>
          <span className={i <= current ? "text-foreground" : "text-muted-foreground"}>
            {s}
          </span>
          {i < steps.length - 1 && <span className="text-muted-foreground">→</span>}
        </li>
      ))}
    </ol>
  );
}

function StatisticExample() {
  return (
    <div className="space-y-1">
      <div className="text-2xl font-semibold">78%</div>
      <div className="text-xs text-muted-foreground">本周任务完成率</div>
    </div>
  );
}

function EmptyExample() {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-1 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
      <div className="text-xs uppercase tracking-wide">Empty</div>
      <div>这里还没有任何内容</div>
    </div>
  );
}

function TableExample() {
  return (
    <table className="w-full max-w-sm border-collapse text-sm">
      <thead>
        <tr className="border-b text-left text-muted-foreground">
          <th className="py-1.5 pr-3 font-medium">名称</th>
          <th className="py-1.5 pr-3 font-medium">状态</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="py-1.5 pr-3">项目 A</td>
          <td className="py-1.5">
            <Badge variant="secondary">进行中</Badge>
          </td>
        </tr>
        <tr>
          <td className="py-1.5 pr-3">项目 B</td>
          <td className="py-1.5">
            <Badge variant="default">已完成</Badge>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ---------- M2b：7 个复杂组件 ---------- */

function ToastExample() {
  const [toasts, setToasts] = React.useState<
    { id: number; type: "success" | "info" | "error"; title: string; desc: string }[]
  >([]);
  const idRef = React.useRef(0);
  const push = (
    type: "success" | "info" | "error",
    title: string,
    desc: string,
  ) => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, type, title, desc }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  };
  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));
  const meta = {
    success: { icon: Check, cls: "text-primary" },
    info: { icon: Bell, cls: "text-muted-foreground" },
    error: { icon: X, cls: "text-destructive" },
  } as const;
  return (
    <div className="relative min-h-[180px] w-full overflow-hidden rounded-md border border-dashed">
      <div className="flex flex-wrap gap-2 p-4">
        <Button size="sm" variant="outline" onClick={() => push("success", "已保存", "你的更改已成功保存。")}>成功</Button>
        <Button size="sm" variant="outline" onClick={() => push("info", "新消息", "你有一条未读通知。")}>信息</Button>
        <Button size="sm" variant="outline" onClick={() => push("error", "出错了", "操作失败，请重试。")}>错误</Button>
      </div>
      <div className="absolute right-3 bottom-3 flex w-64 flex-col gap-2">
        {toasts.map((t) => {
          const Icon = meta[t.type].icon;
          return (
            <div key={t.id} className="flex items-start gap-2 rounded-md border bg-popover p-3 text-sm shadow-sm">
              <Icon className={`mt-0.5 size-4 shrink-0 ${meta[t.type].cls}`} />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
              <button onClick={() => dismiss(t.id)} className="text-muted-foreground hover:text-foreground" aria-label="关闭">
                <X className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DropdownMenuExample() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  return (
    <div className="relative inline-block">
      <Button variant="outline" onClick={() => setOpen((o) => !o)}>
        操作
        <ChevronDown className="size-4" />
      </Button>
      {open && (
        <div ref={ref} className="absolute left-0 z-10 mt-1 w-44 rounded-md border bg-popover p-1 text-sm shadow-md">
          <button className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-muted"><Plus className="size-4" />新建</button>
          <button className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-muted"><FileText className="size-4" />重命名</button>
          <button className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-muted"><MoreHorizontal className="size-4" />更多</button>
          <div className="my-1 h-px bg-border" />
          <button className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-destructive hover:bg-muted"><Trash2 className="size-4" />删除</button>
        </div>
      )}
    </div>
  );
}

function DrawerExample() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>打开抽屉</SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>项目设置</SheetTitle>
          <SheetDescription>在这里调整当前项目的可见性与成员。</SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-3 px-4 text-sm text-muted-foreground">
          <p>抽屉（Drawer）常用于承载次要操作或详情，避免打断主流程。</p>
          <p>点击遮罩或右上角按钮即可关闭。</p>
        </div>
        <SheetFooter className="flex-row justify-end gap-2">
          <SheetClose render={<Button variant="outline" />}>取消</SheetClose>
          <SheetClose render={<Button />}>保存</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ChartExample() {
  const data = [
    { label: "一月", value: 40 },
    { label: "二月", value: 65 },
    { label: "三月", value: 50 },
    { label: "四月", value: 80 },
    { label: "五月", value: 72 },
    { label: "六月", value: 95 },
  ];
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="w-full max-w-md">
      <div className="flex h-44 items-end gap-3">
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">{d.value}</span>
            <div
              className="w-6 rounded-t bg-primary"
              style={{ height: `${(d.value / max) * 120}px` }}
              title={`${d.label}：${d.value}`}
            />
            <span className="text-xs text-muted-foreground">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type FileNode = { name: string; children?: FileNode[] };

const treeData: FileNode[] = [
  {
    name: "src",
    children: [
      { name: "components", children: [{ name: "Button.tsx" }, { name: "Card.tsx" }] },
      { name: "app", children: [{ name: "layout.tsx" }, { name: "page.tsx" }] },
      { name: "lib", children: [{ name: "utils.ts" }] },
    ],
  },
  { name: "package.json" },
  { name: "README.md" },
];

function TreeNode({ node, depth }: { node: FileNode; depth: number }) {
  const [open, setOpen] = React.useState(true);
  const isFolder = !!node.children;
  return (
    <div>
      <div
        className="flex cursor-pointer items-center gap-1.5 rounded-sm py-1 pr-2 hover:bg-muted"
        style={{ paddingLeft: depth * 14 + 4 }}
        onClick={() => isFolder && setOpen((o) => !o)}
      >
        {isFolder ? (
          open ? <FolderOpen className="size-4 text-muted-foreground" /> : <Folder className="size-4 text-muted-foreground" />
        ) : (
          <FileText className="size-4 text-muted-foreground" />
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {isFolder && open && (
        <div>
          {node.children?.map((c) => (
            <TreeNode key={c.name} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function FileTreeExample() {
  return (
    <div className="w-full max-w-xs rounded-md border p-2">
      {treeData.map((n) => (
        <TreeNode key={n.name} node={n} depth={0} />
      ))}
    </div>
  );
}

function UploadExample() {
  const [files, setFiles] = React.useState<{ name: string; size: number }[]>([]);
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [
      ...prev,
      ...Array.from(list).map((f) => ({ name: f.name, size: f.size })),
    ]);
  };
  const fmt = (n: number) =>
    n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;
  return (
    <div className="w-full max-w-sm space-y-3">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center text-sm text-muted-foreground transition-colors ${
          drag ? "border-primary bg-secondary" : "border-border"
        }`}
      >
        <Upload className="size-6" />
        <div>点击或拖拽文件到此处上传</div>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>
      {files.length > 0 && (
        <ul className="space-y-1 text-sm">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 rounded-sm bg-muted px-2 py-1">
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate">{f.name}</span>
              <span className="text-xs text-muted-foreground">{fmt(f.size)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DatePickerExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Date | null>(null);
  const [view, setView] = React.useState(() => new Date());
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const fmt = (d: Date) =>
    d.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
  const changeMonth = (delta: number) => setView(new Date(year, month + delta, 1));

  return (
    <div className="relative inline-block">
      <Button variant="outline" onClick={() => setOpen((o) => !o)}>
        <Calendar className="size-4" />
        {selected ? fmt(selected) : "选择日期"}
      </Button>
      {open && (
        <div ref={ref} className="absolute left-0 z-10 mt-1 w-64 rounded-md border bg-popover p-3 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <button onClick={() => changeMonth(-1)} className="rounded-sm p-1 hover:bg-muted" aria-label="上月"><ChevronLeft className="size-4" /></button>
            <span className="text-sm font-medium">{year} 年 {month + 1} 月</span>
            <button onClick={() => changeMonth(1)} className="rounded-sm p-1 hover:bg-muted" aria-label="下月"><ChevronRight className="size-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-xs text-muted-foreground">
            {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
            {cells.map((c, i) => (
              <div key={i}>
                {c ? (
                  <button
                    onClick={() => {
                      setSelected(new Date(year, month, c));
                      setOpen(false);
                    }}
                    className={`flex size-7 items-center justify-center rounded-sm text-sm hover:bg-muted ${
                      selected &&
                      selected.getDate() === c &&
                      selected.getMonth() === month &&
                      selected.getFullYear() === year
                        ? "bg-primary text-primary-foreground hover:bg-primary"
                        : ""
                    }`}
                  >
                    {c}
                  </button>
                ) : (
                  <div className="size-7" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- M3：补全其余组件示例 ---------- */

function SeparatorExample() {
  return (
    <div className="w-full max-w-md space-y-3 text-sm">
      <p>上方内容区</p>
      <Separator />
      <p>下方内容区，中间用一条分割线隔开</p>
      <div className="flex items-center gap-3">
        <span>左</span>
        <Separator orientation="vertical" className="h-5" />
        <span>右</span>
      </div>
    </div>
  );
}

function AccordionExample() {
  return (
    <Accordion className="w-full max-w-md">
      {[
        ["什么是写意？", "写意是一套带国风气质的中文组件库，强调留白与笔触感。"],
        ["支持哪些框架？", "基于 React + Tailwind，参考 shadcn 的按需复制模式。"],
        ["如何切换主题？", "点击右上角按钮即可在明 / 暗之间切换。"],
      ].map(([q, a]) => (
        <AccordionItem key={q} value={q}>
          <AccordionTrigger>{q}</AccordionTrigger>
          <AccordionContent>{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function CollapsibleExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full max-w-md rounded-md border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between p-3 text-sm font-medium"
      >
        高级选项
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-2 border-t p-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>自动保存</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>压缩上传</span>
            <Switch />
          </div>
        </div>
      )}
    </div>
  );
}

function AspectRatioExample() {
  return (
    <div className="w-full max-w-xs">
      <div
        className="flex items-center justify-center rounded-md border bg-gradient-to-br from-primary/20 to-muted text-sm text-muted-foreground"
        style={{ aspectRatio: "16 / 9" }}
      >
        16 : 9
      </div>
    </div>
  );
}

function ResizableExample() {
  const [left, setLeft] = React.useState(50);
  const ref = React.useRef<HTMLDivElement>(null);
  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const move = (ev: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setLeft(Math.min(85, Math.max(15, ((ev.clientX - rect.left) / rect.width) * 100)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  return (
    <div
      ref={ref}
      className="flex h-40 w-full max-w-md overflow-hidden rounded-md border text-sm"
    >
      <div style={{ width: `${left}%` }} className="bg-muted/40 p-3">
        左面板
      </div>
      <div
        onPointerDown={onDown}
        className="w-1.5 cursor-col-resize bg-border hover:bg-primary"
      />
      <div style={{ width: `${100 - left}%` }} className="flex-1 p-3">
        右面板
      </div>
    </div>
  );
}

function ScrollAreaExample() {
  return (
    <ScrollArea className="h-40 w-full max-w-md rounded-md border">
      <div className="space-y-1 p-3 text-sm">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="rounded-sm px-2 py-1.5 hover:bg-muted"
          >
            列表项 #{i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function SidebarExample() {
  const items = ["概览", "组件", "示例", "资源", "设置"];
  const [active, setActive] = React.useState("组件");
  return (
    <div className="flex w-full max-w-md overflow-hidden rounded-md border text-sm">
      <nav className="w-32 border-r bg-muted/30 p-2">
        {items.map((it) => (
          <button
            key={it}
            onClick={() => setActive(it)}
            className={`mb-1 block w-full rounded px-2 py-1.5 text-left ${
              active === it ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {it}
          </button>
        ))}
      </nav>
      <div className="flex-1 p-4 text-muted-foreground">
        当前页面：{active}
      </div>
    </div>
  );
}

function DirectionExample() {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr");
  return (
    <div className="w-full max-w-md space-y-3 text-sm">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={dir === "ltr" ? "default" : "outline"}
          onClick={() => setDir("ltr")}
        >
          LTR
        </Button>
        <Button
          size="sm"
          variant={dir === "rtl" ? "default" : "outline"}
          onClick={() => setDir("rtl")}
        >
          RTL
        </Button>
      </div>
      <div dir={dir} className="rounded-md border p-3">
        <p className="font-medium">阅读方向演示</p>
        <p className="text-muted-foreground">点击上方切换文字排布方向。</p>
      </div>
    </div>
  );
}

function ButtonGroupExample() {
  const [v, setV] = React.useState("day");
  const opts: [string, string][] = [
    ["day", "日"],
    ["week", "周"],
    ["month", "月"],
  ];
  return (
    <div className="inline-flex overflow-hidden rounded-md border">
      {opts.map(([val, label]) => (
        <button
          key={val}
          onClick={() => setV(val)}
          className={`px-3 py-1.5 text-sm ${
            v === val ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function InputGroupExample() {
  return (
    <InputGroup className="w-full max-w-xs">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="搜索…" />
      <InputGroupButton>
        <Search className="size-4" />
      </InputGroupButton>
    </InputGroup>
  );
}

function InputOTPExample() {
  const [vals, setVals] = React.useState(["", "", "", ""]);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const set = (i: number, ch: string) => {
    const n = ch.replace(/\D/g, "").slice(-1);
    setVals((p) => {
      const c = [...p];
      c[i] = n;
      return c;
    });
    if (n && i < 3) refs.current[i + 1]?.focus();
  };
  return (
    <div className="flex gap-2">
      {vals.map((v, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={v}
          onChange={(e) => set(i, e.target.value)}
          maxLength={1}
          inputMode="numeric"
          className="size-10 rounded-md border text-center text-lg outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      ))}
    </div>
  );
}

function TextareaExample() {
  const [v, setV] = React.useState("");
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <Textarea
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="说点什么…"
        rows={4}
      />
      <p className="text-xs text-muted-foreground">{v.length} 字</p>
    </div>
  );
}

function LabelExample() {
  return (
    <div className="w-full max-w-xs space-y-1.5">
      <label htmlFor="lb" className="text-sm font-medium">
        邮箱
      </label>
      <Input id="lb" placeholder="you@example.com" />
      <p className="text-xs text-muted-foreground">我们会发送验证邮件。</p>
    </div>
  );
}

function FieldExample() {
  const [v, setV] = React.useState("");
  const err = v.length > 0 && v.length < 3;
  return (
    <div className="w-full max-w-xs space-y-1.5">
      <label className="text-sm font-medium">用户名</label>
      <Input
        value={v}
        onChange={(e) => setV(e.target.value)}
        aria-invalid={err}
        placeholder="至少 3 个字符"
      />
      <p className={`text-xs ${err ? "text-destructive" : "text-muted-foreground"}`}>
        {err ? "用户名太短" : "用于登录和展示。"}
      </p>
    </div>
  );
}

function NativeSelectExample() {
  return (
    <select className="h-9 w-full max-w-xs rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
      <option>苹果</option>
      <option>香蕉</option>
      <option>橙子</option>
    </select>
  );
}

function ComboboxExample() {
  const all = ["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉"];
  const [q, setQ] = React.useState("");
  const list = all.filter((c) => c.includes(q));
  return (
    <div className="w-full max-w-xs space-y-1.5">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="输入城市…"
      />
      {q && (
        <ul className="rounded-md border bg-popover p-1 text-sm shadow-md">
          {list.length ? (
            list.map((c) => (
              <li
                key={c}
                onClick={() => setQ(c)}
                className="cursor-pointer rounded-sm px-2 py-1.5 hover:bg-muted"
              >
                {c}
              </li>
            ))
          ) : (
            <li className="px-2 py-1.5 text-muted-foreground">无匹配</li>
          )}
        </ul>
      )}
    </div>
  );
}

function SliderExample() {
  const [v, setV] = React.useState(40);
  return (
    <div className="w-full max-w-xs space-y-2">
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <p className="text-xs text-muted-foreground">数值：{v}</p>
    </div>
  );
}

function ToggleExample() {
  const [on, setOn] = React.useState(false);
  return (
    <button
      onClick={() => setOn((o) => !o)}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${
        on ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    >
      <Check className={`size-4 ${on ? "opacity-100" : "opacity-0"}`} /> 加粗
    </button>
  );
}

function ToggleGroupExample() {
  const [sel, setSel] = React.useState<string[]>(["bold"]);
  const toggle = (v: string) =>
    setSel((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  const opts: [string, string][] = [
    ["bold", "B"],
    ["italic", "I"],
    ["underline", "U"],
  ];
  return (
    <div className="inline-flex overflow-hidden rounded-md border">
      {opts.map(([v, label]) => (
        <button
          key={v}
          onClick={() => toggle(v)}
          className={`px-3 py-1.5 text-sm ${
            sel.includes(v) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function CalendarExample() {
  const [sel, setSel] = React.useState<number | null>(14);
  const [view, setView] = React.useState(() => new Date(2026, 8, 1));
  const year = view.getFullYear();
  const month = view.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(first).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  return (
    <div className="w-64 rounded-md border p-3 text-sm">
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="rounded-sm p-1 hover:bg-muted"
          aria-label="上月"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="font-medium">
          {year} 年 {month + 1} 月
        </span>
        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="rounded-sm p-1 hover:bg-muted"
          aria-label="下月"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-xs text-muted-foreground">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
        {cells.map((c, i) => (
          <div key={i}>
            {c ? (
              <button
                onClick={() => setSel(c)}
                className={`flex size-7 items-center justify-center rounded-sm hover:bg-muted ${
                  sel === c ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                {c}
              </button>
            ) : (
              <div className="size-7" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionnaireExample() {
  const [tags, setTags] = React.useState<string[]>(["易用"]);
  const tog = (t: string) =>
    setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  return (
    <div className="w-full max-w-sm space-y-4 text-sm">
      <div className="space-y-2">
        <p className="font-medium">满意度</p>
        <RadioGroup defaultValue="good">
          {[
            ["good", "满意"],
            ["ok", "一般"],
            ["bad", "不满意"],
          ].map(([v, l]) => (
            <label key={v} className="flex items-center gap-2">
              <Radio value={v} /> {l}
            </label>
          ))}
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <p className="font-medium">你喜欢的方面</p>
        <div className="flex flex-wrap gap-2">
          {["易用", "美观", "文档", "性能"].map((t) => (
            <button
              key={t}
              onClick={() => tog(t)}
              className={`rounded-full border px-3 py-1 ${
                tags.includes(t) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenubarExample() {
  const [open, setOpen] = React.useState<string | null>(null);
  const menus: [string, string[]][] = [
    ["文件", ["新建", "打开", "保存", "导出"]],
    ["编辑", ["撤销", "重做", "剪切", "复制"]],
    ["视图", ["缩放", "全屏", "分屏"]],
  ];
  return (
    <div className="flex gap-1 text-sm">
      {menus.map(([name, items]) => (
        <div key={name} className="relative">
          <button
            onClick={() => setOpen((o) => (o === name ? null : name))}
            className={`rounded px-2 py-1 hover:bg-muted ${open === name ? "bg-muted" : ""}`}
          >
            {name}
          </button>
          {open === name && (
            <div className="absolute left-0 z-10 mt-1 w-36 rounded-md border bg-popover p-1 shadow-md">
              {items.map((it) => (
                <div
                  key={it}
                  className="rounded-sm px-2 py-1.5 hover:bg-muted"
                >
                  {it}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DataTableExample() {
  const rows = [
    { name: "项目 A", owner: "李雷", status: "进行中" },
    { name: "项目 B", owner: "韩梅梅", status: "已完成" },
    { name: "项目 C", owner: "张伟", status: "待审核" },
    { name: "项目 D", owner: "王芳", status: "进行中" },
  ];
  const [sort, setSort] = React.useState<"asc" | "desc">("asc");
  const sorted = [...rows].sort(
    (a, b) => a.name.localeCompare(b.name) * (sort === "asc" ? 1 : -1),
  );
  return (
    <div className="w-full max-w-md overflow-hidden rounded-md border text-sm">
      <table className="w-full">
        <thead className="bg-muted/50 text-left text-muted-foreground">
          <tr>
            <th
              className="cursor-pointer p-2 font-medium"
              onClick={() => setSort((s) => (s === "asc" ? "desc" : "asc"))}
            >
              名称 {sort === "asc" ? "↑" : "↓"}
            </th>
            <th className="p-2 font-medium">负责人</th>
            <th className="p-2 font-medium">状态</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.name} className="border-t">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.owner}</td>
              <td className="p-2">
                <Badge variant={r.status === "已完成" ? "default" : "secondary"}>
                  {r.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ItemExample() {
  return (
    <div className="w-full max-w-sm rounded-md border p-3">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          <FileText className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">设计方案.pdf</div>
          <div className="text-xs text-muted-foreground">2.4 MB · 刚刚</div>
        </div>
        <Button variant="ghost" size="sm">
          下载
        </Button>
      </div>
    </div>
  );
}

function MarkerExample() {
  return (
    <div className="w-full max-w-md space-y-3 text-sm">
      <p>
        普通文本，
        <mark className="rounded bg-primary/20 px-1 text-foreground">
          这段被高亮标记
        </mark>
        ，其余不变。
      </p>
      <span className="inline-flex items-center gap-1 rounded-full border bg-primary/10 px-2 py-0.5 text-xs text-primary">
        <span className="size-1.5 rounded-full bg-primary" /> 进行中
      </span>
    </div>
  );
}

function KbdExample() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="inline-flex items-center gap-1 rounded border bg-muted px-2 py-1 text-xs">
        <kbd className="font-mono">⌘</kbd>
        <kbd className="font-mono">K</kbd>
      </span>
      <span className="inline-flex items-center gap-1 rounded border bg-muted px-2 py-1 text-xs">
        <kbd className="font-mono">Ctrl</kbd>
        <kbd className="font-mono">C</kbd>
      </span>
      <span className="inline-flex items-center gap-1 rounded border bg-muted px-2 py-1 text-xs">
        <kbd className="font-mono">Esc</kbd>
      </span>
    </div>
  );
}

function TypographyExample() {
  return (
    <div className="w-full max-w-md space-y-3">
      <h3 className="text-lg font-semibold">标题三</h3>
      <p className="text-sm text-muted-foreground">
        正文段落示例，用于展示默认字号与行高。
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        <li>列表项一</li>
        <li>列表项二</li>
      </ul>
      <blockquote className="border-l-2 border-primary pl-3 text-sm text-muted-foreground">
        引用文字示例。
      </blockquote>
    </div>
  );
}

function SpinnerExample() {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="size-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
      加载中…
    </div>
  );
}

function AlertDialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        删除账号
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认删除账号？</DialogTitle>
          <DialogDescription>
            此操作不可撤销，所有数据将被永久清除。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>取消</DialogClose>
          <Button variant="destructive">确认删除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PopoverExample() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  return (
    <div className="relative inline-block">
      <Button variant="outline" onClick={() => setOpen((o) => !o)}>
        打开浮层
      </Button>
      {open && (
        <div
          ref={ref}
          className="absolute left-0 z-10 mt-1 w-60 rounded-md border bg-popover p-3 text-sm shadow-md"
        >
          <div className="font-medium">浮层标题</div>
          <p className="mt-1 text-muted-foreground">
            可放任意内容，点击外部关闭。
          </p>
        </div>
      )}
    </div>
  );
}

function ContextMenuExample() {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  return (
    <>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          setPos({ x: e.clientX, y: e.clientY });
          setOpen(true);
        }}
        className="flex h-32 w-full max-w-md items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground"
      >
        在此处右键（或长按）
      </div>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            onContextMenu={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          />
          <div
            className="fixed z-50 w-40 rounded-md border bg-popover p-1 text-sm shadow-md"
            style={{ left: pos.x, top: pos.y }}
          >
            {["刷新", "重命名", "复制", "删除"].map((it) => (
              <div
                key={it}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-1.5 hover:bg-muted"
              >
                {it}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function HoverCardExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="text-sm">
      <span className="relative inline-block">
        <button
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="text-primary underline"
        >
          @写意
        </button>
        {open && (
          <div className="absolute left-0 top-full z-10 mt-2 w-56 rounded-md border bg-popover p-3 text-left shadow-md">
            <div className="font-medium">写意组件库</div>
            <p className="mt-1 text-xs text-muted-foreground">
              带国风气质的中文 React 组件集合。
            </p>
          </div>
        )}
      </span>
      <span className="text-muted-foreground"> 悬停上面的链接查看卡片。</span>
    </div>
  );
}

function CommandExample() {
  return (
    <Command className="w-full max-w-sm rounded-md border">
      <CommandInput placeholder="输入命令或搜索…" />
      <CommandList>
        <CommandEmpty>未找到结果</CommandEmpty>
        <CommandGroup heading="建议">
          <CommandItem>新建文件</CommandItem>
          <CommandItem>打开设置</CommandItem>
          <CommandItem>查看文档</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function NavigationMenuExample() {
  const [open, setOpen] = React.useState<string | null>(null);
  const items: [string, string[]][] = [
    ["产品", ["功能", "定价", "更新日志"]],
    ["资源", ["文档", "博客", "社区"]],
  ];
  return (
    <nav className="flex gap-1 text-sm">
      {items.map(([name, subs]) => (
        <div
          key={name}
          className="relative"
          onMouseLeave={() => setOpen(null)}
        >
          <button
            onMouseEnter={() => setOpen(name)}
            onClick={() => setOpen(name)}
            className={`rounded px-3 py-1.5 hover:bg-muted ${
              open === name ? "bg-muted" : ""
            }`}
          >
            {name}
          </button>
          {open === name && (
            <div className="absolute left-0 top-full z-10 mt-1 w-40 rounded-md border bg-popover p-1 shadow-md">
              {subs.map((s) => (
                <div
                  key={s}
                  className="rounded-sm px-2 py-1.5 hover:bg-muted"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <a className="rounded px-3 py-1.5 hover:bg-muted" href="#">
        关于
      </a>
    </nav>
  );
}

function AttachmentExample() {
  const [files, setFiles] = React.useState([
    { name: "设计稿.fig", size: "4.2 MB" },
    { name: "需求.doc", size: "128 KB" },
  ]);
  return (
    <div className="w-full max-w-sm space-y-2 text-sm">
      {files.map((f) => (
        <div
          key={f.name}
          className="flex items-center gap-2 rounded-md border p-2"
        >
          <Paperclip className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate">{f.name}</span>
          <span className="text-xs text-muted-foreground">{f.size}</span>
          <button
            onClick={() => setFiles((p) => p.filter((x) => x !== f))}
            className="text-muted-foreground hover:text-destructive"
            aria-label="移除"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
      <Button variant="outline" size="sm">
        <Paperclip className="size-4" /> 添加附件
      </Button>
    </div>
  );
}

function BubbleExample() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
          帮我写一段组件说明。
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm">
          好的，组件用于展示可复用 UI 单元。
        </div>
      </div>
    </div>
  );
}

function MessageExample() {
  return (
    <div className="flex w-full max-w-md gap-3 rounded-md border p-3 text-sm">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        写
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium">写意</span>
          <span className="text-xs text-muted-foreground">10:24</span>
        </div>
        <p className="text-muted-foreground">
          这是一条消息示例，支持多行内容的展示。
        </p>
      </div>
    </div>
  );
}

function MessageScrollerExample() {
  const msgs: [string, string, boolean][] = [
    ["我", "今天天气不错", true],
    ["助手", "适合写代码", false],
    ["我", "顺便把示例补全", true],
    ["助手", "已安排", false],
    ["我", "辛苦了", true],
  ];
  return (
    <ScrollArea className="h-44 w-full max-w-sm rounded-md border">
      <div className="space-y-3 p-3">
        {msgs.map(([, text, mine], i) => (
          <div
            key={i}
            className={`flex ${mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                mine
                  ? "rounded-br-sm bg-primary text-primary-foreground"
                  : "rounded-bl-sm bg-muted"
              }`}
            >
              {text}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

// nameEn → 真实可交互示例。未注册的组件回退原 HTML / Skeleton（见 components-view）。
export const exampleRegistry: Record<string, React.ComponentType> = {
  // 布局 / 基础
  Card: CardExample,
  Separator: SeparatorExample,
  Accordion: AccordionExample,
  Collapsible: CollapsibleExample,
  Tabs: TabsExample,
  "Aspect Ratio": AspectRatioExample,
  Resizable: ResizableExample,
  "Scroll Area": ScrollAreaExample,
  Sidebar: SidebarExample,
  Direction: DirectionExample,
  // 按钮 / 输入
  Button: ButtonExample,
  "Button Group": ButtonGroupExample,
  Input: InputExample,
  "Input Group": InputGroupExample,
  "Input OTP": InputOTPExample,
  Textarea: TextareaExample,
  Label: LabelExample,
  Field: FieldExample,
  Checkbox: CheckboxExample,
  "Radio Group": RadioGroupExample,
  Switch: SwitchExample,
  Select: SelectExample,
  "Native Select": NativeSelectExample,
  Combobox: ComboboxExample,
  Slider: SliderExample,
  Toggle: ToggleExample,
  "Toggle Group": ToggleGroupExample,
  // 日期
  Calendar: CalendarExample,
  "Date Picker": DatePickerExample,
  Questionnaire: QuestionnaireExample,
  // 导航
  Breadcrumb: BreadcrumbExample,
  Menubar: MenubarExample,
  Pagination: PaginationExample,
  "Dropdown Menu": DropdownMenuExample,
  Avatar: AvatarExample,
  // 数据展示
  Badge: BadgeExample,
  Table: TableExample,
  DataTable: DataTableExample,
  Empty: EmptyExample,
  Item: ItemExample,
  Marker: MarkerExample,
  Kbd: KbdExample,
  Typography: TypographyExample,
  Statistic: StatisticExample,
  Alert: AlertExample,
  Toast: ToastExample,
  Progress: ProgressExample,
  Skeleton: SkeletonExample,
  Spinner: SpinnerExample,
  Chart: ChartExample,
  "File Tree": FileTreeExample,
  Steps: StepsExample,
  // 浮层
  Dialog: DialogExample,
  AlertDialog: AlertDialogExample,
  Sheet: DrawerExample,
  Drawer: DrawerExample,
  Popover: PopoverExample,
  Tooltip: TooltipExample,
  "Context Menu": ContextMenuExample,
  "Hover Card": HoverCardExample,
  Command: CommandExample,
  "Navigation Menu": NavigationMenuExample,
  // 反馈 / 上传 / 通信
  Upload: UploadExample,
  Attachment: AttachmentExample,
  Bubble: BubbleExample,
  Message: MessageExample,
  "Message Scroller": MessageScrollerExample,
};
