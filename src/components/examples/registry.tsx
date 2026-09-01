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
};
