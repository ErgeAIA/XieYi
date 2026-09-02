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
} from "lucide-react";

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

// 阶段 B：nameEn → 真实可交互 shadcn 组件。未注册的组件回退原 HTML / Skeleton。
export const exampleRegistry: Record<string, React.ComponentType> = {
  Button: ButtonExample,
  Input: InputExample,
  Badge: BadgeExample,
  Card: CardExample,
  Alert: AlertExample,
  Tabs: TabsExample,
  Dialog: DialogExample,
  Checkbox: CheckboxExample,
  Switch: SwitchExample,
  "Radio Group": RadioGroupExample,
  Select: SelectExample,
  Tooltip: TooltipExample,
  Skeleton: SkeletonExample,
  Progress: ProgressExample,
  Avatar: AvatarExample,
  Breadcrumb: BreadcrumbExample,
  Pagination: PaginationExample,
  Steps: StepsExample,
  Statistic: StatisticExample,
  Empty: EmptyExample,
  Table: TableExample,
  "Date Picker": DatePickerExample,
  "Dropdown Menu": DropdownMenuExample,
  Drawer: DrawerExample,
  Chart: ChartExample,
  "File Tree": FileTreeExample,
  Upload: UploadExample,
  Toast: ToastExample,
};
