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

// 阶段 B：nameEn → 真实可交互 shadcn 组件。未注册的组件回退原 HTML / Skeleton。
export const exampleRegistry: Record<string, React.ComponentType> = {
  Button: ButtonExample,
  Input: InputExample,
  Badge: BadgeExample,
  Card: CardExample,
  Alert: AlertExample,
  Tabs: TabsExample,
  Dialog: DialogExample,
};
