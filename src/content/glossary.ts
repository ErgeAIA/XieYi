// Vibe Coding 词典：面向不会编程、想用 AI 写出自己项目的人。
// 每个术语讲三件事：它是什么意思（生活类比）、加上它你能看到什么（效果）、
// 以及你怎么把这句话直接复制给 AI（向 AI 描述）。
// 词条不进侧栏，侧栏只显示 14 个分类分组；页面内用搜索 + 分类跳转定位。
// 与「前端组件」高度重叠的术语，用 related 链回对应组件页，化重复为联动。

export type GlossaryCategory =
  | "layout"
  | "visual"
  | "responsive"
  | "interaction"
  | "ui-style"
  | "typography"
  | "dev-process"
  | "ops"
  | "page-section"
  | "content"
  | "auth-state"
  | "ai-prompt"
  | "performance"
  | "security";

export interface GlossaryRelated {
  href: string;
  label: string;
}

export interface GlossaryTerm {
  id: string; // 锚点 id，用 `分类-英文slug` 复合键，保证跨类唯一
  nameZh: string;
  nameEn?: string;
  category: GlossaryCategory;
  meaning: string; // 意思：生活化类比，非程序员也能懂
  effect: string; // 效果：加上它用户能看到、感受到什么
  aiPrompt: string; // 如何向 AI 描述：可直接复制给 AI 的自包含提示词
  related?: GlossaryRelated[]; // 与「前端组件」等页面的联动链接
}

export const glossaryCategoryMeta: Record<
  GlossaryCategory,
  { zh: string; en: string; desc: string }
> = {
  layout: { zh: "布局效果", en: "Layout", desc: "页面怎么排、元素怎么定位的布局与视觉位置术语。" },
  visual: { zh: "视觉风格", en: "Visual Style", desc: "颜色、阴影、圆角等决定「好不好看」的基础风格术语。" },
  responsive: { zh: "响应式适配", en: "Responsive", desc: "一套界面怎么在不同屏幕大小下都好用、不变形。" },
  interaction: { zh: "交互体验", en: "Interaction", desc: "点击、悬停、拖拽等「人和界面怎么互动」的术语。" },
  "ui-style": { zh: "UI 设计风格", en: "UI Styles", desc: "拟物、扁平、新拟态等整体设计流派与风格词。" },
  typography: { zh: "设计排版", en: "Typography & Design", desc: "字体、字号、行距、对齐等「文字怎么排才舒服」的术语。" },
  "dev-process": { zh: "测试与开发流程", en: "Dev Process", desc: "构建、测试、部署、版本控制等工程流程术语。" },
  ops: { zh: "线上运维", en: "Ops", desc: "服务器、监控、日志、告警等「上线后怎么稳住」的术语。" },
  "page-section": { zh: "页面区块", en: "Page Sections", desc: "页头、页脚、侧边栏、英雄区等页面常见区块叫什么。" },
  content: { zh: "文案与内容", en: "Content", desc: "占位文字、空状态文案、错误提示等「页面上写什么字」的术语。" },
  "auth-state": { zh: "登录与状态", en: "Auth & State", desc: "登录、会话、权限、登录态等用户身份相关术语。" },
  "ai-prompt": { zh: "AI 编程提示词", en: "AI Prompt Terms", desc: "提示词、上下文、智能体等和 AI 协作时的专属术语。" },
  performance: { zh: "性能优化", en: "Performance", desc: "加载速度、渲染、缓存等「怎么让页面更快」的术语。" },
  security: { zh: "安全与合规", en: "Security", desc: "加密、鉴权、防注入等「怎么不让系统出事」的术语。" },
};

export const glossaryCategoryOrder: GlossaryCategory[] = [
  "layout",
  "visual",
  "responsive",
  "interaction",
  "ui-style",
  "typography",
  "dev-process",
  "ops",
  "page-section",
  "content",
  "auth-state",
  "ai-prompt",
  "performance",
  "security",
];

export const glossary: GlossaryTerm[] = [
  // ===== 布局效果 layout =====
  {
    id: "layout-sticky",
    nameZh: "粘性定位",
    nameEn: "Sticky",
    category: "layout",
    meaning:
      "就像冰箱门上的便签，你往下翻冰箱时它一直贴在视线里。粘性定位让某个元素（通常是导航条）在页面滚动到一定位置后，死死贴住屏幕边缘不再跟内容跑。",
    effect: "你往下滚页面，顶部的菜单、搜索框或购买按钮始终在眼前，不用滚回最上面就能操作。",
    aiPrompt:
      "请让我的页面顶部导航栏在往下滚动时一直固定在屏幕顶部，不要跟着内容滚走。用 CSS 的 sticky 定位实现，滚动到正文区域时导航栏仍然可见，并且给它一点半透明背景和投影，避免和下面的内容糊在一起。",
  },
  {
    id: "layout-sidebar",
    nameZh: "侧边栏布局",
    nameEn: "Sidebar",
    category: "layout",
    meaning:
      "像书的目录页常固定在左边，右边才是正文。侧边栏布局把导航或工具区放在屏幕一侧，主内容占剩下的大块地方。",
    effect: "你点左边不同的菜单，右边内容切换，而左边的导航一直都在，不容易迷路。",
    aiPrompt:
      "请给我的后台页面做一个左右两栏的布局：左边是固定宽度的侧边栏（放导航菜单和 Logo），右边是自适应宽度的主内容区。在电脑上两侧并排显示，在手机上侧边栏能收起成一个按钮。",
    related: [{ href: "/examples", label: "参考：应用骨架示例" }],
  },
  {
    id: "layout-masonry",
    nameZh: "瀑布流布局",
    nameEn: "Masonry / Waterfall",
    category: "layout",
    meaning:
      "像把大小不一的照片拼贴在一面墙上，高的矮的错落排开、彼此咬合同高。瀑布流让高度不同的卡片自动找空隙往上堆，不留规则网格那种大块空白。",
    effect: "你刷图片、商品或笔记时，画面满满当当没有难看的空缺，越往下滑越顺眼。",
    aiPrompt:
      "请给我的图片墙做一个瀑布流布局：卡片宽度一致但高度不同，按列自动往上堆叠、彼此对齐，不要留出规则网格里那种大方空。用 CSS columns 或网格实现，电脑上显示 3 到 4 列，手机上 2 列。",
  },
  {
    id: "layout-grid",
    nameZh: "栅格布局",
    nameEn: "Grid Layout",
    category: "layout",
    meaning:
      "像稿纸一样先画好横竖格子，再把内容一块块摆进格子里。栅格布局用看不见的行列把页面切成整齐的区块，是最常用的排版地基。",
    effect: "页面看起来规整对齐，左右间距一致，不管加多少内容都不会乱掉。",
    aiPrompt:
      "请用 CSS Grid 给我的页面做一个 12 列的栅格布局，内容按列数排布（比如左边占 8 列、右边占 4 列）。列与列之间留出统一的间距，在窄屏幕上自动变成单列竖排。",
  },
  {
    id: "layout-card",
    nameZh: "悬浮卡片",
    nameEn: "Card",
    category: "layout",
    meaning:
      "把一小块信息装进一张「小卡片」里，像桌面上摊开的便签。卡片是当下最通用的容器，用来归拢标题、图片和按钮。",
    effect: "信息被一块块分开，扫一眼就知道哪块讲什么；鼠标移上去卡片轻轻浮起，有「可按」的暗示。",
    aiPrompt:
      "请用卡片样式展示我的内容列表：每张卡片有圆角、浅色背景和柔和投影，里面放一张缩略图、一个标题和一行描述。鼠标悬停时卡片轻微上浮并加深阴影，暗示可以点击。",
    related: [{ href: "/components?cat=display#Card", label: "组件：Card" }],
  },
  {
    id: "layout-accordion",
    nameZh: "折叠面板",
    nameEn: "Accordion / Collapsible",
    category: "layout",
    meaning:
      "像手风琴一样，按一下展开一段、再按一下收起来。折叠面板把一长串内容收成一排标题，点哪个才展开哪个。",
    effect: "页面一下子变短了，你只看到关心的那几条，不会被一长串文字吓退。",
    aiPrompt:
      "请给我做一个折叠面板（手风琴）来放常见问题：每个标题一行，点击展开看到答案，再点收起。同一时间可以只展开一个，也可以允许多个同时展开，请按我的说明来。",
    related: [{ href: "/components?cat=display#Accordion", label: "组件：Accordion" }],
  },
  {
    id: "layout-drawer",
    nameZh: "抽屉",
    nameEn: "Drawer",
    category: "layout",
    meaning:
      "像从柜子侧面拉出来的抽屉，从屏幕左边或右边滑出一块临时面板，看完推回去。抽屉适合放不常用、但需要时又要立刻出现的操作。",
    effect: "主界面不被打断，需要筛选、看详情或填表时，侧边滑出一块，关掉又回到原处。",
    aiPrompt:
      "请做一个从右侧滑出的抽屉：点按钮时它带着半透明遮罩从右边滑进来，里面放筛选条件或表单；点遮罩或关闭按钮时滑回去。在手机上让它占满大部分宽度。",
    related: [{ href: "/components?cat=overlay#Drawer", label: "组件：Drawer" }],
  },
  {
    id: "layout-modal",
    nameZh: "弹窗",
    nameEn: "Modal / Dialog",
    category: "layout",
    meaning:
      "像突然举到眼前的牌子，盖住后面的页面强迫你看完再走。弹窗（对话框）用来处理必须回应、不能视而不见的动作，比如确认删除。",
    effect: "你的注意力被锁在弹窗里，先处理完它再继续，避免误操作。",
    aiPrompt:
      "请做一个居中的弹窗（对话框）：点按钮时弹出，背景变暗并加遮罩，弹窗里有关键提示和「确认 / 取消」两个按钮；点遮罩外或按 Esc 可以关闭。动画用淡入加轻微放大。",
    related: [{ href: "/components?cat=overlay#Dialog", label: "组件：Dialog" }],
  },
  {
    id: "layout-tooltip",
    nameZh: "气泡提示",
    nameEn: "Tooltip",
    category: "layout",
    meaning:
      "像老师俯身在你耳边小声补一句。气泡提示是鼠标悬停或聚焦在某个元素上时，冒出来的那行小解释。",
    effect: "你看到不认识的图标或按钮，停一下就弹出一句话说明，不用去翻帮助文档。",
    aiPrompt:
      "请给页面里几个图标按钮加气泡提示：鼠标悬停或键盘聚焦时，在它上方或下方弹出一个小黑框显示一行说明文字，离开就消失。不要挡住被解释的元素本身。",
    related: [{ href: "/components?cat=overlay#Tooltip", label: "组件：Tooltip" }],
  },
  {
    id: "layout-toast",
    nameZh: "通知横幅",
    nameEn: "Toast",
    category: "layout",
    meaning:
      "像便利贴啪一下贴到屏幕上又自己飘走。Toast 是操作完成后在角落（通常在右上或底部）闪现的一行提示，几秒后自动消失。",
    effect: "你点完「保存」不用盯着页面等反馈，角落弹一下「已保存」就知道了，不打断手头的事。",
    aiPrompt:
      "请做一个 Toast 通知：用户完成保存、点赞等动作后，在屏幕右上角弹出一行小提示（成功用绿色、失败用红色），2 到 3 秒后自动淡出消失。同一时间多条提示要能叠着排队显示。",
    related: [{ href: "/components?cat=feedback#Toast", label: "组件：Toast" }],
  },
  {
    id: "layout-carousel",
    nameZh: "轮播图",
    nameEn: "Carousel / Slider",
    category: "layout",
    meaning:
      "像旋转展示架，把多张图或卡片排成一列，定时或手动一张张滑过去。轮播图常出现在首页顶部，用来轮流展示重点。",
    effect: "一小块地方能讲好几件事，你不用往下滑就能看到不同卖点；也可手动左右翻。",
    aiPrompt:
      "请做一个首页轮播图：3 到 5 张横幅图自动每 5 秒切换，底部有小圆点指示当前第几张，也能用左右箭头手动翻。鼠标悬停时暂停自动播放，切换要有平滑滑动动画。",
    related: [{ href: "/components?cat=display#Carousel", label: "组件：Carousel" }],
  },
  {
    id: "layout-tabs",
    nameZh: "标签页",
    nameEn: "Tabs",
    category: "layout",
    meaning:
      "像文件夹的多个舌头标签，只露出当前那一份，翻到哪张显示哪张。标签页把同类内容分敞在不同面板，靠顶部标签切换。",
    effect: "同一块区域能装下好几组内容，你点标签来回翻，页面不拉长、不跳走。",
    aiPrompt:
      "请做一个标签页组件：顶部一排标签（如「介绍 / 评价 / 常见问题」），点击切换下方内容，当前标签高亮并有底部滑动的下划线。切换时内容淡入，不要整个页面跳动。",
    related: [{ href: "/components?cat=navigation#Tabs", label: "组件：Tabs" }],
  },
  {
    id: "layout-stepper",
    nameZh: "步骤条",
    nameEn: "Stepper",
    category: "layout",
    meaning:
      "像快递单上的进度节点，把一长串流程拆成「1 → 2 → 3」几个圆点连成线。步骤条让你随时知道走到第几步、还剩几步。",
    effect: "填表或下单时你心里有数：已完成的是绿色对勾，当前这步高亮，后面灰着等你走。",
    aiPrompt:
      "请做一个步骤条放在表单顶部：用圆圈加连线表示「填写信息 → 确认 → 完成」三步，已完成的步骤显示对勾和绿色，当前步骤高亮，未到的灰色。点击已完成的步骤可以跳回去修改。",
    related: [{ href: "/components?cat=navigation#Stepper", label: "组件：Stepper" }],
  },
  {
    id: "layout-timeline",
    nameZh: "时间线",
    nameEn: "Timeline",
    category: "layout",
    meaning:
      "像把日记按日期串成一串珠子，左边或中间一条线，事件挂在线的节点上。时间线适合讲「发生了什么、按什么顺序」。",
    effect: "你一眼看清事情先后：订单状态、项目进展、活动记录都顺着线往下排，谁先谁后一目了然。",
    aiPrompt:
      "请做一个竖向时间线来展示我的订单状态：中间一条竖线，每个节点一个圆点加日期和一句话说明（如「已发货」），已完成节点用绿色，当前节点高亮并带脉冲效果。",
    related: [{ href: "/components?cat=display#Timeline", label: "组件：Timeline" }],
  },
  {
    id: "layout-pagination",
    nameZh: "分页",
    nameEn: "Pagination",
    category: "layout",
    meaning:
      "像书一页页翻，不把几百条结果塞进一屏，而是每页只给一小撮，底下用「上一页 / 下一页」和页码切换。",
    effect: "列表变轻了，你一次只看一页，翻页找内容，页面也不会卡。",
    aiPrompt:
      "请给商品列表加分页：每页显示 12 条，底部有「上一页 / 下一页」和页码按钮，当前页高亮。翻页时滚动回列表顶部，并支持在地址栏带上页码方便分享。",
    related: [{ href: "/components?cat=navigation#Pagination", label: "组件：Pagination" }],
  },
  {
    id: "layout-breadcrumb",
    nameZh: "面包屑",
    nameEn: "Breadcrumb",
    category: "layout",
    meaning:
      "像童话里撒面包屑记路，告诉你「你现在在哪儿、怎么回来的」。面包屑是页面顶部一排可点击的路径：首页 › 分类 › 当前。",
    effect: "你在深层页面也不慌，看一眼就知道自己在站点里的位置，点任意一级就能退回去。",
    aiPrompt:
      "请在页面顶部加一条面包屑导航：用「首页 / 分类名 / 当前页面」的格式，每一级都是可点击的链接，层级之间用斜杠或小箭头分隔。当前这一级不要链接、用灰色表示。",
    related: [{ href: "/components?cat=navigation#Breadcrumb", label: "组件：Breadcrumb" }],
  },
  {
    id: "layout-dropdown",
    nameZh: "下拉菜单",
    nameEn: "Dropdown",
    category: "layout",
    meaning:
      "像抽屉里挂的一排挂钩，平时收着，点一下垂下一列选项让你挑。下拉菜单把一堆操作或选项藏进一个小箭头里。",
    effect: "界面干净了，需要时才点开那一串选项，选完它又收起来。",
    aiPrompt:
      "请做一个下拉菜单：点一个「更多」按钮，在它下方弹出一个小菜单列出几个操作（如编辑、删除、分享），选中某项就执行并收起；点别处自动关闭，键盘上下键也能选择。",
    related: [{ href: "/components?cat=navigation#Dropdown", label: "组件：Dropdown" }],
  },
  {
    id: "layout-navbar",
    nameZh: "顶部导航",
    nameEn: "Navbar",
    category: "layout",
    meaning:
      "像商场入口的指引牌，永远挂在最上面一横条，写着站点名和几个主要去处。顶部导航是用户进站第一眼找路的地方。",
    effect: "你随时知道这是哪个站、能去哪几个大板块，不会困在某一页出不来。",
    aiPrompt:
      "请做一个顶部导航栏：左边放站点 Logo 和名字，右边放几个主要栏目链接（首页、作品、关于），在手机上收成一个汉堡菜单。导航栏在滚动时保持固定在顶部。",
  },
  {
    id: "layout-footer",
    nameZh: "页脚",
    nameEn: "Footer",
    category: "layout",
    meaning:
      "像信纸最底下的落款区，放那些「随时要、但不必抢眼」的东西：联系方式、版权、备案号、次要链接。",
    effect: "你想找客服、看隐私政策或查备案信息时，滚到最底下总能找到，主内容区却不被这些杂事打扰。",
    aiPrompt:
      "请给我页面做一个页脚：放站点简介、几组次要链接（关于 / 隐私政策 / 联系我们）、社交媒体图标和版权信息，背景用比正文深一点的颜色，在电脑上分几列、手机上竖排。",
  },
  {
    id: "layout-infinite-scroll",
    nameZh: "无限滚动",
    nameEn: "Infinite Scroll",
    category: "layout",
    meaning:
      "像自动续杯，你往下滚到底，系统悄悄加载下一批，永远滚不到头。无限滚动省去翻页动作，适合刷着玩的内容流。",
    effect: "你只管往下滑，新内容无缝接上，不用点「下一页」，沉浸感强。",
    aiPrompt:
      "请给内容列表加无限滚动：用户滑到底部附近时自动加载下一批数据接在后面，底部显示一个加载中转圈；加载完所有内容后显示「没有更多了」。请处理好加载中的重复请求。",
  },
  {
    id: "layout-skeleton",
    nameZh: "骨架屏",
    nameEn: "Skeleton Screen",
    category: "layout",
    meaning:
      "像盖楼前先搭好的灰色脚手架，内容没来时先用灰块占好位置。骨架屏用和真实布局一致的占位图形，告诉你「这里待会儿是图、那里是字」。",
    effect: "页面不再白屏干等，你一眼看出大致排版，等真内容淡入时也不觉得跳。",
    aiPrompt:
      "请给列表和详情页加骨架屏：数据加载时先用灰色的圆角块按真实布局占位（头像圆形、标题一行、图片一块），带轻微闪烁动画；数据到了再用淡入替换成真实内容，避免布局跳动。",
    related: [{ href: "/components?cat=feedback#Skeleton", label: "组件：Skeleton" }],
  },
  {
    id: "layout-empty",
    nameZh: "空状态",
    nameEn: "Empty State",
    category: "layout",
    meaning:
      "像新买的本子第一页空白，但贴了张便利贴告诉你「这里可以写点什么」。空状态是列表没数据时那屏有图的引导，而不是一片死白。",
    effect: "你遇到空列表不懵，图上配一句话加一个按钮，直接告诉你下一步点哪。",
    aiPrompt:
      "请给空列表做一个空状态：中间放一个简洁的插画或图标，下面一句温柔的提示（如「还没有订单哦」），再配一个主按钮引导用户去创建（如「去逛逛」）。不要用一片空白敷衍。",
    related: [{ href: "/components?cat=feedback#Empty", label: "组件：Empty" }],
  },
  {
    id: "layout-placeholder",
    nameZh: "瀑布加载占位",
    nameEn: "Placeholder",
    category: "layout",
    meaning:
      "像照片还没洗出来时先夹一张写着「图在此」的纸条。加载占位在图片或内容到来前先占住那个坑，防止页面像抽积木一样塌来塌去。",
    effect: "图片慢慢加载时，位置纹丝不动，你不会被突然弹出的大图顶得满屏乱跳。",
    aiPrompt:
      "请给所有图片加加载占位：图片没下载完时先显示一张同尺寸的浅灰底图或模糊缩略图占住位置，加载完成后淡入替换，避免图片出现时把下方内容突然顶下去。",
  },
  // ===== 视觉风格 visual =====
  {
    id: "visual-rounded",
    nameZh: "圆角",
    nameEn: "Rounded Corners",
    category: "visual",
    meaning:
      "像把纸片的尖角剪圆，看着不扎手。圆角是给按钮、卡片、输入框的边角加上弧度，是最基础的「友好感」来源。",
    effect: "界面一下子没那么硬，按钮和卡片像被打磨过，看着顺眼、想点。",
    aiPrompt:
      "请给我的卡片、按钮和输入框加圆角：卡片和输入框用较大的圆角（约 12 像素），小按钮用中等圆角（约 8 像素），整体统一不要有的方有的圆。",
  },
  {
    id: "visual-shadow",
    nameZh: "阴影",
    nameEn: "Shadow",
    category: "visual",
    meaning:
      "像阳光下物体投下的影子，让平面有了「浮起来」的错觉。阴影用模糊的暗色块模拟光源，区分谁在前谁在后。",
    effect: "卡片、按钮像悬在纸面上方，层次出来了，你本能知道哪里能按。",
    aiPrompt:
      "请给主要卡片和按钮加柔和阴影：阴影要淡、要模糊、偏移量小（像被高处光照亮），不要用死黑硬边。悬浮时阴影加深一点，暗示可以交互。",
  },
  {
    id: "visual-glass",
    nameZh: "毛玻璃效果",
    nameEn: "Frosted Glass / Glassmorphism",
    category: "visual",
    meaning:
      "像磨砂玻璃门，能隐约透出后面的颜色却看不清细节。毛玻璃让一层半透明白雾盖在内容上，既分隔又不挡景。",
    effect: "导航栏或弹窗蒙上一层雾，后面的图若隐若现，高级又有空气感。",
    aiPrompt:
      "请给顶部导航栏做毛玻璃效果：背景半透明白色加背后模糊（backdrop-blur），能隐约透出下面的内容；加一条很淡的上下边框让它和背景分开。",
  },
  {
    id: "visual-gradient",
    nameZh: "渐变",
    nameEn: "Gradient",
    category: "visual",
    meaning:
      "像天空从蓝过渡到粉，颜色不是一刀切，而是一点一点变。渐变让两块色之间平滑过渡，告别生硬的色块。",
    effect: "按钮、背景、标题有了光泽和流动感，比纯色更鲜活、更「贵」。",
    aiPrompt:
      "请给我的重要按钮和首页大标题加渐变：从一个主色平滑过渡到同色系的另一个色（比如暖橙到亮橙），角度斜着走，不要出现明显的色带断层。",
  },
  {
    id: "visual-outline",
    nameZh: "描边",
    nameEn: "Outline / Stroke",
    category: "visual",
    meaning:
      "像给图形描一圈线框，只画边不填心。描边用细线勾出形状轮廓，常用来做「次要按钮」或极简图标。",
    effect: "界面多了一种轻重层次：实心按钮抢眼、描边按钮安静，你分得清主次。",
    aiPrompt:
      "请给我做两种按钮：主按钮用实心填充色，次按钮只用 1 像素描边、透明背景；描边颜色用主色的浅版，悬停时再轻轻填一点底色。",
  },
  {
    id: "visual-glow",
    nameZh: "发光效果",
    nameEn: "Glow",
    category: "visual",
    meaning:
      "像霓虹灯管外围那圈晕，给元素镶上一道光。发光用模糊的彩色光晕包围主体，制造「被点亮」的科技感。",
    effect: "关键按钮或图标像通了电，在暗背景下尤其吸睛，引导你点它。",
    aiPrompt:
      "请给页面里的高亮按钮加发光效果：在它外围加一层主色的模糊光晕（用阴影或外发光实现），在暗色背景下更明显；不要糊到看不清文字。",
  },
  {
    id: "visual-hover",
    nameZh: "悬停效果",
    nameEn: "Hover Effect",
    category: "visual",
    meaning:
      "像你手伸过去灯就亮，鼠标移到元素上时它悄悄变个样。悬停效果是「我注意到你了」的视觉回应。",
    effect: "你不用点就知道什么能点——移上去变颜色、浮起来、出下划线，心里有底。",
    aiPrompt:
      "请给所有可点击的元素加悬停效果：鼠标移上去时颜色微微变化、轻微上浮或加深阴影，并配合 0.2 秒左右的过渡，让反馈柔和而不是生硬跳变。",
  },
  {
    id: "visual-transition",
    nameZh: "过渡动画",
    nameEn: "Transition",
    category: "visual",
    meaning:
      "像秒针不是瞬间跳格而是平滑滑过，过渡让属性变化有了时间。过渡动画管的是「从 A 态到 B 态中间怎么走」。",
    effect: "颜色、位置、大小的变化不再硬切，而是顺滑流动，界面显得灵动不呆板。",
    aiPrompt:
      "请给页面里的颜色、位移、透明度变化都加上约 0.2 秒的平滑过渡（用 CSS transition），让悬停和状态切换柔和自然，但别慢到让人等。",
  },
  {
    id: "visual-fade",
    nameZh: "淡入淡出",
    nameEn: "Fade",
    category: "visual",
    meaning:
      "像舞台灯渐亮渐暗，元素不是啪地出现消失，而是透明度从 0 滑到 1 再回来。淡入淡出是最温和的进出场方式。",
    effect: "弹窗、提示、图片出现时不突兀，像慢慢浮现，观感舒服不刺眼。",
    aiPrompt:
      "请让弹窗和提示框用淡入淡出出现和消失：透明度从 0 到 1 配合轻微上移，关闭时反向播放，整个过程约 0.25 秒，不要生硬地闪现。",
  },
  {
    id: "visual-zoom",
    nameZh: "缩放",
    nameEn: "Zoom / Scale",
    category: "visual",
    meaning:
      "像放大镜凑近，元素在交互时变大或变小一点。缩放是最直接的「我在回应你」的动效。",
    effect: "你点图标或看图时它轻轻放大，确认了你的操作，也多了份俏皮。",
    aiPrompt:
      "请给可点击的图片和图标加缩放反馈：鼠标悬停或按下时轻微放大到 1.05 倍，松开回弹，配合过渡不要突变。",
  },
  {
    id: "visual-parallax",
    nameZh: "视差滚动",
    nameEn: "Parallax Scrolling",
    category: "visual",
    meaning:
      "像坐车看窗外，近处的树飞快退后、远处的山慢慢挪。视差滚动让不同层的内容以不同速度滚动，制造纵深。",
    effect: "你往下滚时前景后景各走各的，页面像有了厚度，首页尤其显高级。",
    aiPrompt:
      "请给首页英雄区做视差滚动：背景图滚动得比前景文字慢一些，形成前后层次；幅度要克制，别让人看晕，且在手机上关掉以免卡顿。",
  },
  {
    id: "visual-dark",
    nameZh: "暗色模式",
    nameEn: "Dark Mode",
    category: "visual",
    meaning:
      "像把灯调暗，整站换成深底浅字。暗色模式把背景压暗、文字提亮，适合晚上或护眼，也很有质感。",
    effect: "你夜里看不刺眼，霓虹色和图片在深底上更跳，氛围感拉满。",
    aiPrompt:
      "请给我的站点加暗色模式：提供手动切换按钮，并用系统的深浅色偏好做默认。暗色下背景用近黑、文字用米白、强调色保持明亮，所有组件都要有对应的暗色样式。",
  },
  {
    id: "visual-light",
    nameZh: "亮色模式",
    nameEn: "Light Mode",
    category: "visual",
    meaning:
      "像拉开窗帘的大白天，深字浅底的标准配色。亮色模式是绝大多数网站的默认脸面，干净、清晰、易读。",
    effect: "你在大太阳下或普通环境里看得清清楚楚，阅读不费劲。",
    aiPrompt:
      "请给我的站点以亮色模式为默认：浅色暖白背景配深灰文字，强调色用饱和度适中的主色；保证正文对比度达标、长时间阅读不累。",
  },
  {
    id: "visual-opacity",
    nameZh: "透明度",
    nameEn: "Opacity",
    category: "visual",
    meaning:
      "像往墨水里兑水，让颜色从浓变淡。透明度控制元素能「透出多少背后的东西」，用来做层次和状态。",
    effect: "禁用按钮变灰淡、提示文字退后、遮罩半透，你一眼就懂轻重缓急。",
    aiPrompt:
      "请用透明度表达状态：禁用的按钮和输入框降到约 50% 透明并关闭交互，辅助说明文字比正文淡一些，弹窗外的遮罩用半透明黑压住背景。",
  },
  {
    id: "visual-whitespace",
    nameZh: "留白",
    nameEn: "Whitespace",
    category: "visual",
    meaning:
      "像画里故意空着不画的地方，不是浪费而是呼吸感。留白是元素之间留出的空地，让内容不挤成一团。",
    effect: "你看着不喘不过气，重要信息被空地衬托得更突出，高级感来自「舍得空」。",
    aiPrompt:
      "请在我的页面里多用留白：段落之间、卡片内部、区块上下都留出充足间距，不要把内容塞满；用空白引导视线，让重点自然跳出来。",
  },
  {
    id: "visual-gutter",
    nameZh: "栅格间距",
    nameEn: "Gutter / Spacing",
    category: "visual",
    meaning:
      "像田垄之间的沟，栅格间距是相邻内容块之间的那道缝。间距统一了，整页才像用同一把尺子量的。",
    effect: "卡片之间距离一致，你看着整齐不乱，密的地方不挤、疏的地方不散。",
    aiPrompt:
      "请给我一套统一的间距规则：用 4 或 8 的倍数（如 8/16/24/32 像素）作为所有间距，卡片之间、文字与边框之间都从这套值里取，保证全站节奏一致。",
  },

  // ===== 响应式适配 responsive =====
  {
    id: "responsive-design",
    nameZh: "响应式设计",
    nameEn: "Responsive Design",
    category: "responsive",
    meaning:
      "像同一张海报，挂在手机上自动变窄、挂在大屏上自动变宽，内容自己重排。响应式设计让一套页面在任意屏幕上都不丑。",
    effect: "你用手机、平板或电脑打开，排版都服帖，不用左右拖动看被切掉的内容。",
    aiPrompt:
      "请让我的页面做成响应式的：同一套代码在手机、平板、电脑上都能正常显示，元素按屏幕宽度自动重排（如多列变单列），文字和图片不溢出。",
  },
  {
    id: "responsive-mobile",
    nameZh: "移动端适配",
    nameEn: "Mobile-friendly",
    category: "responsive",
    meaning:
      "像给小屏幕单独量体裁衣，而不是把大屏硬塞进手机。移动端适配专门针对窄屏优化按钮大小、字号和触摸区域。",
    effect: "你在手机上点按钮不误触、字不小到眯眼、不用双指放大就能读完。",
    aiPrompt:
      "请专门优化我的页面在手机上的体验：按钮和点击区域至少 44 像素高，字号别太小，导航在窄屏收成汉堡菜单，整页宽度刚好填满屏幕不出现横向滚动。",
  },
  {
    id: "responsive-fluid",
    nameZh: "自适应宽度",
    nameEn: "Fluid Width",
    category: "responsive",
    meaning:
      "像橡皮筋，元素宽度跟着容器伸缩而不是焊死。自适应宽度用百分比或弹性单位，让内容填满可用空间。",
    effect: "窗口拉宽内容就铺开、拉窄就收拢，始终不留尴尬的两边大空白。",
    aiPrompt:
      "请让主要内容区用自适应宽度：用百分比或弹性布局让它随窗口伸缩填满可用空间，但设置一个最大宽度避免在大屏上字行太长难读。",
  },
  {
    id: "responsive-fixed",
    nameZh: "固定宽度",
    nameEn: "Fixed Width",
    category: "responsive",
    meaning:
      "像订做好的相框，宽度写死不动。固定宽度给元素一个恒定尺寸，不随屏幕变，常用于需要精确控制的版式。",
    effect: "某些区块（如侧边栏、广告位）尺寸恒定、不抖不动，布局可预测。",
    aiPrompt:
      "请给侧边栏和一个固定版心的正文区设置固定宽度（如正文最大 720 像素），在大屏上居中显示，不因屏幕变宽而无限拉伸。",
  },
  {
    id: "responsive-breakpoint",
    nameZh: "断点",
    nameEn: "Breakpoint",
    category: "responsive",
    meaning:
      "像温度计的刻度线，到了某个宽度布局就「换挡」。断点是设计师约定的几个关键屏幕宽度，跨过它就切换一套排版规则。",
    effect: "你从手机横过来或拉宽窗口，页面在几个干净的状态间切换，而不是乱糟糟地渐变。",
    aiPrompt:
      "请为我的页面设置断点：在手机（约 640 像素以下）、平板（约 1024 像素以下）、桌面三档分别应用不同的布局规则，跨过断点时整列重排而不是单个元素乱跳。",
  },
  {
    id: "responsive-orientation",
    nameZh: "横屏/竖屏",
    nameEn: "Landscape / Portrait",
    category: "responsive",
    meaning:
      "像把手机转一下，屏幕从「高长方形」变「宽长方形」。横屏竖屏指设备的两种朝向，布局要能两头都站得住。",
    effect: "你转一下手机，内容跟着转，不会只在一种朝向好看、另一种朝向挤成一团。",
    aiPrompt:
      "请让我的页面同时适配横屏和竖屏：在手机竖屏时单列、横屏时可以利用更宽的空间显示两列或侧边布局，旋转设备时平滑过渡不闪。",
  },
  {
    id: "responsive-fullscreen",
    nameZh: "全屏",
    nameEn: "Full Screen",
    category: "responsive",
    meaning:
      "像把幕布拉到舞台边，内容占满整块可见区域，不要边框不要留白。全屏常用于沉浸式首屏或视频。",
    effect: "你一进来就被画面包住，没有杂边干扰，气氛一下拉满。",
    aiPrompt:
      "请让我的首页英雄区占满整个屏幕首屏（100% 视口高度和宽度），背景图或视频铺满，文字和按钮居中浮在上面，向下滚才进入正文。",
  },
  {
    id: "responsive-center",
    nameZh: "居中对齐",
    nameEn: "Center Alignment",
    category: "responsive",
    meaning:
      "像把画钉在墙正中央，元素在水平和（或）垂直方向都怼到中间。居中对齐常用来安顿标题、弹窗和空状态。",
    effect: "你看到的主体稳稳落在视线正中，平衡、安静、不偏不倚。",
    aiPrompt:
      "请让弹窗和空状态提示在屏幕水平和垂直方向都居中显示；普通正文段落保持左对齐更易读，只有标题和短句才用居中。",
  },
  {
    id: "responsive-equal",
    nameZh: "等分布局",
    nameEn: "Equal-width Columns",
    category: "responsive",
    meaning:
      "像把一条面包平均分切，几列一样宽。等分布局让并排的卡片或格子宽度齐整，谁也不抢谁。",
    effect: "一排功能或商品看着公平齐整，扫一眼就对齐，不觉得哪个被偏心。",
    aiPrompt:
      "请做一排等宽的卡片（如 3 或 4 张特性卡），每张占相同宽度、间距一致，在窄屏上自动变成两列或单列，但始终保持各列等宽。",
  },
  {
    id: "responsive-autoheight",
    nameZh: "自适应高度",
    nameEn: "Auto Height",
    category: "responsive",
    meaning:
      "像气球按气量鼓胀，元素高度随内容多少自己长。自适应高度不写死高度，让盒子刚好包住里面的东西。",
    effect: "文字多盒子就高、文字少就矮，不会出现大片空白或内容被切掉。",
    aiPrompt:
      "请让卡片和容器的高度自适应内容：不要写死固定高度，让它们根据内部文字和图片自动撑开，只在确实需要滚动的区域（如弹窗正文）才限制最大高度并出滚动条。",
  },

  // ===== 交互体验 interaction =====
  {
    id: "interaction-loading",
    nameZh: "加载中",
    nameEn: "Loading",
    category: "interaction",
    meaning:
      "像餐馆取餐牌转圈，告诉你「在做了，稍等」。加载中是数据或页面还没好时给出的进行状态，不让用户对着死寂的屏幕干等。",
    effect: "你点完知道系统在忙，心里有底不重复点，也不会以为卡死了。",
    aiPrompt:
      "请给所有会等待的操作加加载状态：按钮上转圈或变灰禁用，区域加载时显示转圈或骨架屏，加载完再恢复。不要让用户点完没任何反馈。",
    related: [{ href: "/components?cat=feedback#Spinner", label: "组件：加载指示" }],
  },
  {
    id: "interaction-progress",
    nameZh: "进度条",
    nameEn: "Progress Bar",
    category: "interaction",
    meaning:
      "像复印机上的百分比，把「还要多久」画成一条慢慢填满的线。进度条把抽象的等待变成可见的推进。",
    effect: "你看着那条线一点点满，知道快好了，比光转圈更有盼头。",
    aiPrompt:
      "请做一个进度条：用一条横向轨道加填充色表示完成百分比，上传或安装时从 0 涨到 100，到 100 后显示完成；如果进度未知就用不确定的来回滑动样式。",
    related: [{ href: "/components?cat=feedback#Progress", label: "组件：Progress" }],
  },
  {
    id: "interaction-pull-refresh",
    nameZh: "下拉刷新",
    nameEn: "Pull-to-refresh",
    category: "interaction",
    meaning:
      "像把页面往下拽一下松手，新的就冒出来。下拉刷新是手机上特有的手势：在列表顶端往下滑，松手触发重新加载。",
    effect: "你想看最新内容不用退出重进，手指一拉就更新，像扯一下钓鱼线。",
    aiPrompt:
      "请给手机端的列表加下拉刷新：在列表顶部继续往下拉时出现一个加载指示，松手触发刷新获取新数据，刷新完轻轻弹回顶部。在电脑上用不上就忽略。",
  },
  {
    id: "interaction-dnd",
    nameZh: "拖拽排序",
    nameEn: "Drag and Drop",
    category: "interaction",
    meaning:
      "像用手把棋子挪到想放的位置。拖拽排序让你按住一个元素拖到别处，松手就完成重排或归类。",
    effect: "你整理清单、排任务、传文件时直接「拿起来放过去」，比填表单直觉多了。",
    aiPrompt:
      "请给我的任务列表加拖拽排序：按住一项可以上下拖动改变顺序，拖到其他分组能换分类，拖动时有半透明阴影跟随，松手落位并保存新顺序。",
  },
  {
    id: "interaction-scroll-trigger",
    nameZh: "滚动监听",
    nameEn: "Scroll Trigger",
    category: "interaction",
    meaning:
      "像哨兵盯着你滚到哪儿，到了指定位置就拉响铃。滚动监听是代码盯着页面滚动位置，触发动画或加载。",
    effect: "你往下翻，内容随着出现而淡入、数字滚到才数、图到了才加载，页面像活的一样。",
    aiPrompt:
      "请用滚动监听做进场动画：当某个区块滚进视野时才让它淡入或上移出现，列表滑到底部附近自动加载更多，不要一打开就把所有动画播完。",
  },
  {
    id: "interaction-anchor",
    nameZh: "锚点跳转",
    nameEn: "Anchor Link",
    category: "interaction",
    meaning:
      "像书里的书签，点一下直接飞到对应那一节。锚点跳转是页面内的快捷传送门，点了不换页、只滚到指定位置。",
    effect: "你点目录里的「联系方式」立刻滑到那一屏，不用手动狂滚。",
    aiPrompt:
      "请给我的长页面加锚点跳转：在目录或侧栏放链接，点击平滑滚动到对应的小节标题，并且跳转后标题不被顶部导航栏挡住（留出导航高度）。",
  },
  {
    id: "interaction-floating",
    nameZh: "悬浮跟随",
    nameEn: "Floating / Fixed Element",
    category: "interaction",
    meaning:
      "像总跟在身后的小跟班，你滚到哪它都在。悬浮跟随是让某个元素（常是按钮或聊天入口）固定贴在屏幕某角，不随页面滚走。",
    effect: "你滑到页面最底，右下角的「回到顶部」或「联系客服」还乖乖在那，随时能点。",
    aiPrompt:
      "请让我页面右下角固定一个悬浮按钮（如回到顶部或客服），用 fixed 定位贴着视口右下角，不随内容滚动，在手机上也不要被手指误触挡住内容。",
  },
  {
    id: "interaction-autofill",
    nameZh: "输入提示",
    nameEn: "Autofill / Placeholder Text",
    category: "interaction",
    meaning:
      "像输入框里先写好的灰色样例（「请输入手机号」），提示你这儿该填什么。输入提示（占位文字）是框内的临时引导，你一打字它就让位。",
    effect: "你看到空框不懵，灰色小字告诉你格式，填的时候它自动消失。",
    aiPrompt:
      "请给每个输入框加占位提示文字（如「请输入邮箱」「搜索你想要的风格」），用比正文浅的灰色，用户开始输入就消失；重要的格式要求也写在提示里。",
  },
  {
    id: "interaction-validation",
    nameZh: "表单校验",
    nameEn: "Form Validation",
    category: "interaction",
    meaning:
      "像门口检票员，没填对就不放你进。表单校验在提交前检查每个字段：空了、格式错了、两次密码不一致都当场拦下。",
    effect: "你填错立刻在框下看到红字提醒，不用提交完才被泼冷水，改完就能过。",
    aiPrompt:
      "请给表单做校验：必填项为空、邮箱或手机号格式不对、两次密码不一致时，在对应输入框下方用红字提示原因，并阻止提交；输入正确后提示消失。提交成功前按钮显示加载中。",
    related: [{ href: "/components?cat=form#Form", label: "组件：表单" }],
  },
  {
    id: "interaction-success",
    nameZh: "成功提示",
    nameEn: "Success Message",
    category: "interaction",
    meaning:
      "像办完事盖个绿戳，「成了！」一声。成功提示在操作顺利完成后给的正面确认，常配绿色和对勾。",
    effect: "你点完保存、提交、支付，看到绿勾和「已完成」就安心，知道没白忙。",
    aiPrompt:
      "请在每个成功操作后给绿色成功提示：比如保存后弹 Toast 写「已保存」，注册成功跳到欢迎页并显示对勾图标，语气肯定、不啰嗦。",
  },
  {
    id: "interaction-error",
    nameZh: "错误提示",
    nameEn: "Error Message",
    category: "interaction",
    meaning:
      "像红灯亮起配一句人话，「这儿出问题了，原因是……」。错误提示在出岔子时告诉你发生了什么、下一步咋办，而不是甩个冷冰冰的代码。",
    effect: "你遇到报错不慌，提示说清哪错了、怎么改，而不是对着「Error 500」发呆。",
    aiPrompt:
      "请给所有可能的错误都写清楚提示：网络失败时说「网络开了小差，点此重试」并给重试按钮，表单错说具体哪字段错，绝不只弹一个「操作失败」就完事。",
  },

  // ===== UI 设计风格 ui-style =====
  {
    id: "ui-flat",
    nameZh: "扁平设计",
    nameEn: "Flat Design",
    category: "ui-style",
    meaning:
      "像把立体包装拆了只留平面图，不画高光不画阴影。扁平设计用纯色块和简单图标，抛弃一切假装「立起来」的装饰。",
    effect: "界面干净利落、加载快、不花哨，你一眼抓到重点信息。",
    aiPrompt:
      "请给我的界面用扁平设计风格：纯色填充按钮、不要写实阴影和渐变，图标用简洁的几何线条，整体强调清晰和信息优先而非拟真。",
  },
  {
    id: "ui-skeuomorphism",
    nameZh: "拟物设计",
    nameEn: "Skeuomorphism",
    category: "ui-style",
    meaning:
      "像把真实物件搬进屏幕，按钮做成真铜钮、笔记本做成真皮面。拟物设计让数字界面模仿现实物体的质感和光影。",
    effect: "你一看就懂怎么用——因为和现实里的东西一模一样，学习成本几乎为零。",
    aiPrompt:
      "请给这个 App 做拟物风格：按钮和开关模仿真实材质（金属、皮革、纸张）带高光和投影，让界面看起来可以触摸，适合面向不熟悉数字产品的用户。",
  },
  {
    id: "ui-neumorphism",
    nameZh: "新拟态",
    nameEn: "Neumorphism",
    category: "ui-style",
    meaning:
      "像从同一块软黏土里压出来的凹凸，元素和背景同色，只靠明暗两道边挤出立体感。新拟态是拟物的极简版，靠光影不靠颜色。",
    effect: "界面像一块温润的浮雕，柔和高级，但对比偏弱、可读性要小心。",
    aiPrompt:
      "请做一个新拟态风格的卡片和按钮：元素与背景同色，用一深一浅两道柔和阴影做出「挤出或压入」的立体感，整体极简统一；同时保证文字对比度足够可读。",
  },
  {
    id: "ui-glassmorphism",
    nameZh: "玻璃拟态",
    nameEn: "Glassmorphism",
    category: "ui-style",
    meaning:
      "一种整体美学主张：半透明磨砂面板浮在彩色背景上，像一块块冰种玻璃。它和「毛玻璃效果」是近亲——毛玻璃是单个手法，玻璃拟态是用这种手法铺满全站的风格。",
    effect: "你看到层层半透的卡片叠在渐变背景上，通透、有空间感，很显高级。",
    aiPrompt:
      "请给我的整个界面走玻璃拟态风格：背景用鲜艳渐变或图片，前景卡片和导航用半透明白加背后模糊和细边框，整体通透有层次；注意背景要够丰富，玻璃感才出得来。",
    related: [{ href: "/glossary#visual-glass", label: "参见：毛玻璃效果（单手法）" }],
  },
  {
    id: "ui-minimalism",
    nameZh: "极简设计",
    nameEn: "Minimalism",
    category: "ui-style",
    meaning:
      "像只留一件家具的房间，能不要的都拿掉。极简设计信奉「少即是多」，只留必要的元素和大量留白。",
    effect: "你不被多余装饰干扰，视线直奔核心内容和操作，安静、聚焦。",
    aiPrompt:
      "请给我的页面做极简风格：去掉多余装饰线、阴影和色块，只保留必要的文字、一个主按钮和充裕留白，配色克制（最多两三种），让内容自己说话。",
  },
  {
    id: "ui-card",
    nameZh: "卡片式设计",
    nameEn: "Card Design",
    category: "ui-style",
    meaning:
      "像把信息切成一张张独立的小卡片摊开。卡片式设计是当下最主流的版式语言，用卡片归拢同类内容、彼此独立。",
    effect: "你浏览时一块块信息清清楚楚，像翻文件卡，归类清晰、点哪张看哪张。",
    aiPrompt:
      "请给我的内容用卡片式设计：每个独立信息单元（文章、商品、功能）做成一张带圆角和轻阴影的卡片，卡片网格排列、间距统一，悬停有轻微反馈。",
  },
  {
    id: "ui-material",
    nameZh: "材料设计",
    nameEn: "Material Design",
    category: "ui-style",
    meaning:
      "Google 的一套设计规矩，像把纸和墨水系统化：用阴影表示层级、用动效讲因果、用网格对齐。材料设计把「立体纸张」变成可复用的规范。",
    effect: "你用 Google 系产品时那种熟悉、统一、可预测的手感，就来自它。",
    aiPrompt:
      "请参考 Material Design 规范做我的界面：用阴影和海拔表达层级，动效体现因果关系（点了哪从哪展开），组件尺寸和间距遵循 8 像素网格，整体统一专业。",
  },
  {
    id: "ui-apple",
    nameZh: "苹果风格",
    nameEn: "Apple-style / iOS Style",
    category: "ui-style",
    meaning:
      "像苹果发布会那股干净劲儿：大圆角、毛玻璃、克制配色、顺滑动效。苹果风格追求一种「贵且好用」的精致克制。",
    effect: "你用起来觉得顺、看着觉得高级，每个过渡都恰到好处不抢戏。",
    aiPrompt:
      "请给我的 App 做苹果 iOS 风格：大圆角、系统字体、毛玻璃导航栏、细腻的弹性动效和克制的中性配色，整体精致不花哨，交互反馈柔和。",
  },
  {
    id: "ui-dark",
    nameZh: "暗黑风",
    nameEn: "Dark Theme",
    category: "ui-style",
    meaning:
      "一种以深色为底的整体风格主张，和「暗色模式」配套——暗色模式是「能切换的那套深色」，暗黑风则是默认就走暗色审美（常配霓虹点缀）。",
    effect: "你看着酷、沉浸、不刺眼，霓虹色在黑底上格外跳，氛围感强。",
    aiPrompt:
      "请给我的站点做暗黑风格（默认深色而非可切换）：近黑背景配米白文字，强调色用明亮霓虹或暖橙，给所有组件配齐暗色样式，整体冷峻有质感。",
    related: [{ href: "/glossary#visual-dark", label: "参见：暗色模式（可切换）" }],
  },
  {
    id: "ui-cyberpunk",
    nameZh: "霓虹赛博风",
    nameEn: "Cyberpunk / Neon",
    category: "ui-style",
    meaning:
      "像雨夜霓虹广告牌，黑底上甩出洋红、青蓝的发光字和网格线。赛博风把科幻片里的街景搬进 UI，张扬、未来、带点叛逆。",
    effect: "你一进来就被高饱和荧光和故障感抓住，刺激、潮、有记忆点。",
    aiPrompt:
      "请给我的页面做霓虹赛博朋克风格：深黑背景，洋红/青蓝的发光描边和文字，加网格背景、扫描线和轻微故障(glitch)动效，整体张扬有未来感但文字仍清晰可读。",
  },
  {
    id: "ui-retro",
    nameZh: "复古风",
    nameEn: "Retro / Vintage",
    category: "ui-style",
    meaning:
      "像翻出老海报，用做旧的纸张色、复古字体和旧印刷质感。复古风靠年代感唤起怀旧和信任。",
    effect: "你看着亲切、有故事感，像翻开一本有年头的书或老招牌。",
    aiPrompt:
      "请给我的品牌页做复古风格：米黄做旧底色、衬线或打字机字体、低饱和的红绿配色和轻微噪点纹理，营造 70~80 年代的怀旧印刷质感。",
  },
  {
    id: "ui-handdrawn",
    nameZh: "手绘风",
    nameEn: "Hand-drawn / Sketch",
    category: "ui-style",
    meaning:
      "像铅笔随手画的草图，线条不直、带点歪。手绘风用涂鸦感的元素传递轻松、亲和、不端着的态度。",
    effect: "你看着不像冷冰冰的产品，而像有人亲手画给你，亲近、没距离感。",
    aiPrompt:
      "请给我的落地页做手绘草图风格：用不规则的手绘线条、涂鸦图标和手写感字体，配轻松的配色，营造亲切随性的氛围，但重要信息仍要清楚。",
  },
  {
    id: "ui-3d",
    nameZh: "3D 风格",
    nameEn: "3D Design",
    category: "ui-style",
    meaning:
      "像把平面的东西吹成了实物，有体积、有光影、能转。3D 风格用透视和材质让界面元素看起来占三维空间。",
    effect: "你看到的产品、图标像真能拿在手里，立体、鲜活、有触感。",
    aiPrompt:
      "请给我的主视觉和关键图标做 3D 风格：用透视、光影和材质做出体积感（可用 CSS 3D 或轻量 3D 图），让产品或按钮看起来立体的，但保证在普通设备上不卡。",
  },
  {
    id: "ui-outline",
    nameZh: "描边风",
    nameEn: "Outline Style",
    category: "ui-style",
    meaning:
      "像用签字笔只勾轮廓不填色，全靠线条说话。描边风以细线图形和空心按钮为主，清爽、克制、偏中性。",
    effect: "你看着轻盈通透，没有大色块压着，适合内容多、想保持干净的场景。",
    aiPrompt:
      "请给我的界面走描边风格：图标和插画用细线勾勒不填色，按钮用空心描边而非实心，整体以线条和留白为主，配色清淡统一。",
  },
  {
    id: "ui-editorial",
    nameZh: "杂志风",
    nameEn: "Editorial Layout",
    category: "ui-style",
    meaning:
      "像翻时尚杂志，大标题、多栏排版、图文混排、留白讲究。杂志风把「编辑排版」的审美搬上网页，讲层级和节奏。",
    effect: "你读起来有「翻刊」的仪式感，重点标题抢眼、正文舒服、图片会讲故事。",
    aiPrompt:
      "请给我的内容页做杂志编辑风格：超大衬线标题、非对称多栏排版、图文混排和醒目的引文，讲究留白与层级节奏，像一本精致的电子刊物。",
  },
  {
    id: "ui-brutalism",
    nameZh: "粗野主义",
    nameEn: "Brutalism",
    category: "ui-style",
    meaning:
      "像没装修的水泥毛坯房，故意不修饰： raw 边框、系统字体、高对比撞色、不加圆角。粗野主义用「丑得坦诚」制造记忆点。",
    effect: "你一眼忘不掉——它不讨好但极有态度，适合想显得硬核、真实、反套路的品牌。",
    aiPrompt:
      "请给我的站点做网页粗野主义风格：硬边框、默认系统字体、高对比纯色（黑黄/黑红）、不加圆角和柔阴影，保留原始 HTML 的直白感，刻意不精致以凸显态度。",
  },
  {
    id: "ui-memphis",
    nameZh: "孟菲斯风",
    nameEn: "Memphis Design",
    category: "ui-style",
    meaning:
      "像 80 年代儿童派对，彩色几何体、波浪线、圆点满天飞。孟菲斯风把欢快、混乱、装饰拉满，热闹又童趣。",
    effect: "你看着开心、活泼、不严肃，像进了游乐场，适合年轻、好玩的品牌。",
    aiPrompt:
      "请给我的页面做孟菲斯风格：明快撞色、几何图形（三角圆点波浪）、不对称拼贴和趣味图案装饰，整体欢快童趣，但关键文字和按钮要保持清晰可点。",
  },
  {
    id: "ui-gradient",
    nameZh: "渐变风",
    nameEn: "Gradient Design",
    category: "ui-style",
    meaning:
      "一种以渐变为主角的风格主张，和「渐变」这个手法同源——渐变是上色技巧，渐变风是用大面积流动渐变当门面，常见霓虹流体、弥散光斑。",
    effect: "你看着柔软、梦幻、有科技浪漫，大色块流动让页面不呆板。",
    aiPrompt:
      "请给我的界面做渐变风格：用大面积流动的彩色渐变（如弥散光斑、流体渐变）作为背景和主视觉，按钮和标题也融入渐变，整体柔和梦幻有现代感。",
    related: [{ href: "/glossary#visual-gradient", label: "参见：渐变（单手法）" }],
  },
  {
    id: "ui-microinteraction",
    nameZh: "微交互",
    nameEn: "Micro-interaction",
    category: "ui-style",
    meaning:
      "像开关「咔哒」一声的小满足，是那些一瞬即逝的细节反馈：点赞心跳一下、开关滑过去、加载转圈。微交互管的是「每一次小动作的小回应」。",
    effect: "你每个操作都有即时、可爱的小反馈，用着顺手又有点小愉悦，质感就藏在这些细节里。",
    aiPrompt:
      "请给我的界面加丰富的微交互：按钮按下有缩放回弹，开关滑动带弹性，点赞有心跳放大，输入框聚焦有边框微光；每个反馈控制在 0.2 秒左右，量大但克制不吵。",
  },
  {
    id: "ui-bold-type",
    nameZh: "大字排版",
    nameEn: "Bold Typography",
    category: "ui-style",
    meaning:
      "像海报把一句话放大到占满半屏，用字号本身当主角。大字排版靠超大的标题字号和粗细对比抓眼球，少图也能有冲击力。",
    effect: "你一进来先被那句巨大的话击中，重点不言自明，气势足、记忆深。",
    aiPrompt:
      "请给我的首页做大胆的大字排版：用超大号加粗标题占据视觉中心，辅以小号正文形成强烈大小对比，少放图、靠文字本身的份量制造冲击力。",
  },

  // ===== 设计排版 typography =====
  {
    id: "type-full-bleed",
    nameZh: "全幅出血",
    nameEn: "Full Bleed",
    category: "typography",
    meaning:
      "像照片印到明信片边缘外面去，内容一直顶到屏幕最边。出血指图文故意超出安全边距、贴边显示，制造「满」的冲击。",
    effect: "你看到图或色块铺到屏幕尽头，没有白边束缚，沉浸感和气势更足。",
    aiPrompt:
      "请让这张大图或背景色做全幅出血：宽度占满整个视口左右边缘，不被内容边距截断，营造铺满屏幕的沉浸感。",
  },
  {
    id: "type-safe-margin",
    nameZh: "安全边距",
    nameEn: "Safe Margin",
    category: "typography",
    meaning:
      "像相框里留的那圈白，内容不贴边才安全。安全边距是内容距屏幕边缘的最小空隙，保证不被切掉也不显挤。",
    effect: "你看着内容四周有呼吸的余地，不会被屏幕边或刘海切到，读着舒服。",
    aiPrompt:
      "请给我的页面内容设置安全边距：正文和容器距屏幕左右至少留 16~24 像素，手机上尤甚，确保文字不被边缘或圆角切到。",
  },
  {
    id: "type-trim",
    nameZh: "裁切线",
    nameEn: "Trim Line",
    category: "typography",
    meaning:
      "像印刷厂裁纸的刀痕线，标好「印到这里为止」。裁切线是成品尺寸的边界，超出的部分会被切掉。",
    effect: "（主要用于印刷交付）你交给印刷的内容知道边界在哪，不会被无意切掉关键图字。",
    aiPrompt:
      "如果这是要印刷的物料，请在稿子上标出裁切线和出血位，确保关键内容离裁切线有足够距离；若只是网页则无需此线。",
  },
  {
    id: "type-edge-to-edge",
    nameZh: "满屏铺满",
    nameEn: "Edge-to-edge",
    category: "typography",
    meaning:
      "像把窗帘拉到两边墙，内容从左墙铺到右墙不留缝。满屏铺满强调「占满可用宽度」，常用于图片墙或通栏区块。",
    effect: "你感到内容大气、不局促，整块区域被充分利用。",
    aiPrompt:
      "请让这个图片墙或色块区域满屏铺满：从屏幕最左到最右都没有边距留白，元素紧贴两侧边缘排列。",
  },
  {
    id: "type-negative-space",
    nameZh: "留白",
    nameEn: "Negative Space",
    category: "typography",
    meaning:
      "版式里「什么都没放」的那块空，不是浪费而是主角。留白（负空间）用空地衬托内容，引导视线、制造高级感。",
    effect: "你不觉得挤，重点被空地托起来，页面透气、显贵。",
    aiPrompt:
      "请在我的排版里善用留白（负空间）：标题和正文之间、区块与区块之间留出充足空白，用空地而不是线条来分隔，让重点自然突出。",
    related: [{ href: "/glossary#visual-whitespace", label: "参见：留白（视觉手法）" }],
  },
  {
    id: "type-bleed-image",
    nameZh: "出血图",
    nameEn: "Bleed Image",
    category: "typography",
    meaning:
      "一张故意放大到被边缘切掉一点的图，像被画框裁过的照片。出血图不追求完整，而用「溢出」制造张力。",
    effect: "你看到图被边切去一角，反而有延伸感和故事性，不像被规整框死。",
    aiPrompt:
      "请让这张主图做出血处理：放大到超出容器边缘被裁切，主体仍在可见区域，营造图向外延伸、不被框死的张力感。",
  },
  {
    id: "type-fullwidth-banner",
    nameZh: "通栏",
    nameEn: "Full-width Banner",
    category: "typography",
    meaning:
      "像横贯整个墙面的横幅，不缩在中间一溜。通栏区块占满整行宽度，常用来放头图、促销条或分隔。",
    effect: "你一眼被整条横幅抓住，信息铺陈得开，适合做强调和分段。",
    aiPrompt:
      "请给我做一个通栏横幅：占满整行宽度的色块或图片，里面放一句主标题和按钮，左右不留内容边距，用来分隔不同章节或做首屏头图。",
  },
  {
    id: "type-grid-system",
    nameZh: "栅格系统",
    nameEn: "Grid System",
    category: "typography",
    meaning:
      "像坐标纸，给所有元素统一的对齐参考线。栅格系统是一套看不见的行列规矩，让不同页面拼起来像同一套。",
    effect: "你翻不同页面都觉得「对得上」，左右间距一致、对齐整齐，专业感来自这套隐形尺子。",
    aiPrompt:
      "请给我的站点建立一套栅格系统：用 12 列网格统一所有页面的列宽和间距，内容都吸附到网格线上，保证跨页面对齐一致。",
    related: [{ href: "/glossary#layout-grid", label: "参见：栅格布局" }],
  },
  {
    id: "type-baseline-grid",
    nameZh: "基线网格",
    nameEn: "Baseline Grid",
    category: "typography",
    meaning:
      "像五线谱那根根横线，让所有文字的「脚」踩在同一条线上。基线网格管的是文字行的垂直节奏，不只是对齐还要踩点。",
    effect: "你读着不飘，多段文字底部齐整、行距统一，版面安静有秩序。",
    aiPrompt:
      "请让我的正文排版遵守基线网格：所有文字行的基线对齐到统一的垂直间距节律，多栏文字底部整齐，行距成倍数关系而不是随意。",
  },
  {
    id: "type-hierarchy",
    nameZh: "视觉层次",
    nameEn: "Visual Hierarchy",
    category: "typography",
    meaning:
      "像把重要的话用红笔圈大、次要的写小，引导你先看哪后看哪。视觉层次用大小、颜色、位置排好信息的轻重缓急。",
    effect: "你进页面不用想，眼睛自然先落大标题、再扫要点，信息获取不费力。",
    aiPrompt:
      "请为我的页面建立清晰的视觉层次：用字号、字重、颜色和留白区分主标题、副标题、正文和注释，让最重要的信息第一眼就被看到。",
  },
  {
    id: "type-above-fold",
    nameZh: "首屏",
    nameEn: "Above the Fold",
    category: "typography",
    meaning:
      "像报纸折线上方那块，不用翻开就看见。首屏是打开页面第一眼（不滚动）就能看到的区域，黄金位置。",
    effect: "你一进来就看到最关键的那句话和按钮，不用滚动就懂这站是干嘛的。",
    aiPrompt:
      "请把最重要的信息放在首屏：打开页面不滚动就能看到一句话说清价值主张、一个主按钮和一句副文案，别让关键内容沉到下面。",
  },
  {
    id: "type-golden-ratio",
    nameZh: "黄金分割",
    nameEn: "Golden Ratio",
    category: "typography",
    meaning:
      "一个约 1:1.618 的古老比例，被认为最顺眼，像螺壳和蒙娜丽莎都在用它。黄金分割用来切分版面、定图片尺寸，求和谐。",
    effect: "你看着莫名舒服、平衡，比例天生讨喜，不觉得别扭。",
    aiPrompt:
      "请在我的版式里参考黄金分割（约 1:1.618）：比如左右栏按这个比例分配，或主图按该比例裁切，让整体比例自然和谐。",
  },
  {
    id: "type-focal-point",
    nameZh: "焦点视觉",
    nameEn: "Focal Point",
    category: "typography",
    meaning:
      "像舞台追光打住的那个演员，画面里最抢眼的一点。焦点视觉是用对比（亮、大、动）把视线钉在一个主角上。",
    effect: "你目光一下被吸到那，不会在满屏信息里迷路，重点不言自明。",
    aiPrompt:
      "请给我的首屏或一个卡片设一个明确的视觉焦点：用更大的尺寸、更亮的颜色或留白包围，让用户的视线第一眼落在最重要的元素（如主标题或主图）上。",
  },
  {
    id: "type-brand-color",
    nameZh: "品牌色",
    nameEn: "Brand Color",
    category: "typography",
    meaning:
      "像麦当劳的红黄、美团黄，一个品牌死磕的那一两个颜色。品牌色是站点的「身份证色」，出现处处都认得。",
    effect: "你逛几页就记住这站是「那个橙色的」或「那个蓝的」，辨识度和信任感上来了。",
    aiPrompt:
      "请为我的站点定一个品牌主色并贯穿全站：按钮、链接、高亮、图标都用它，再配一两个辅助色，保证各处一致、用户一眼记住。",
  },
  {
    id: "type-palette",
    nameZh: "配色方案",
    nameEn: "Color Palette",
    category: "typography",
    meaning:
      "像画家调色盘上那一排搭配好的颜色。配色方案是一套事先定好的颜色组合（主色、辅色、背景、文字、状态色），避免随手乱选。",
    effect: "你看着整站颜色协调不刺眼，不同页面像同一个调色盘调出来的，统一专业。",
    aiPrompt:
      "请给我一套配色方案：选一个主色、一两个辅色，再定背景色、正文色和成功/警告/错误的状态色，写成可复用的变量，保证全站颜色和谐一致。",
  },
  {
    id: "type-design-system",
    nameZh: "设计规范",
    nameEn: "Design System / Style Guide",
    category: "typography",
    meaning:
      "像公司的「装修标准手册」，把用哪种按钮、什么字号、几像素间距全写死。设计规范让不同人做出来的页面像同一个模子。",
    effect: "你看到的站点处处一致——同样的按钮、同样的圆角，专业且可维护，改一处全局跟着变。",
    aiPrompt:
      "请帮我把站点的视觉规则整理成一套设计规范：统一按钮样式、圆角、间距、字号层级和颜色变量，写成可复用组件和变量，保证以后加页面都长得一样。",
  },
  {
    id: "type-mockup",
    nameZh: "样机",
    nameEn: "Mockup",
    category: "typography",
    meaning:
      "像把设计稿套进一个手机或电脑的壳里拍照，显得「真能用」。样机是把界面图嵌到设备模型里做的展示图。",
    effect: "你看展示图时更有实感——知道这界面真会长在手机上，而不是飘着的草稿。",
    aiPrompt:
      "请给我的界面截图做成样机展示：把页面图放进手机或笔记本的设备外壳模板里，带点阴影和角度，用于落地页或宣传图，显得真实可交付。",
  },
  {
    id: "type-wireframe",
    nameZh: "线框图",
    nameEn: "Wireframe",
    category: "typography",
    meaning:
      "像建筑的毛坯施工图，只用灰线框出「哪放图、哪放字」，不谈颜色和漂亮。线框图先定结构和布局，再谈美。",
    effect: "你先看清页面骨架和流程对不对，不被好看的皮相带偏，改结构成本低。",
    aiPrompt:
      "请先给我画页面的线框图：用灰色块和线条标出每个区域（导航、主图、列表、按钮）的位置和大小，不配色不美化，只确认布局结构合理。",
  },
  {
    id: "type-hifi",
    nameZh: "高保真原型",
    nameEn: "Hi-fi Prototype",
    category: "typography",
    meaning:
      "像能点的成品样品，颜色、字、动效都齐了，只是背后数据可能是假的。高保真原型几乎等于真界面，用来演练体验。",
    effect: "你点着和真的一样顺，能在上线前就感受流程对不对、好不好用。",
    aiPrompt:
      "请给我做一个高保真原型：视觉和交互都接近最终成品（真实配色、字号、悬停和切换动效），可以点击跳转模拟流程，用于演示和测试，数据可用占位。",
  },
  {
    id: "type-slice",
    nameZh: "切图",
    nameEn: "Slice",
    category: "typography",
    meaning:
      "像把一张大海报按元素剪开成小图，方便分别用到网页各处。切图是把设计稿里的图标、背景、插图导出成独立图片资源。",
    effect: "（开发侧动作）你交付的图能被网页精准调用，该透明的透明、该缩放的缩放，不糊不串。",
    aiPrompt:
      "请把设计稿里需要的图标、插画和背景分别导出为独立切图：用 SVG 做图标保证清晰，位图导出 2 倍图适配高清屏，命名清晰按文件夹归类。",
  },
  {
    id: "type-icon-set",
    nameZh: "图标库",
    nameEn: "Icon Set",
    category: "typography",
    meaning:
      "像一盒同款贴纸，所有图标同一种画法、同一种线宽。图标库是一套风格统一的小图形，保证全站图标不各画各的。",
    effect: "你看到不同功能的图标却像一家出品，整齐、专业，不杂乱。",
    aiPrompt:
      "请给我的站点统一用一套图标库（如 lucide 或类似风格），所有图标保持相同的线宽、大小和画法，不要混用不同风格，保证视觉统一。",
  },
  {
    id: "type-font-weight",
    nameZh: "字重",
    nameEn: "Font Weight",
    category: "typography",
    meaning:
      "像笔尖压得重或轻，字就有粗有细。字重是文字的粗细程度（细、常规、中、粗、黑），用来分主次。",
    effect: "你一眼从粗细分出版题和正文，重点加粗、辅助变细，层次靠笔画轻重就讲清了。",
    aiPrompt:
      "请通过字重建立文字层级：标题用粗体（600~700），正文用常规（400），辅助说明用稍细或浅色；同一页面字重种类别太多，保持克制。",
  },
  {
    id: "type-leading",
    nameZh: "行高",
    nameEn: "Leading / Line Height",
    category: "typography",
    meaning:
      "像给每行字之间垫的多厚气垫，垫厚了透气、垫薄了紧凑。行高是两行文字基线之间的距离，直接决定阅读舒不舒服。",
    effect: "你读长文不累——行距合适时眼睛换行顺畅，太挤则喘不过气。",
    aiPrompt:
      "请给正文设置舒适的行高（约为字号的 1.5~1.7 倍），标题行高紧凑一些（约 1.2 倍），保证大段文字易读不拥挤。",
  },
  {
    id: "type-tracking",
    nameZh: "字间距",
    nameEn: "Tracking",
    category: "typography",
    meaning:
      "像把一排字彼此推开或拉近的缝。字间距（字距）控制字符之间的疏密，标题常放宽显大气、正文收紧显紧凑。",
    effect: "你看到大字标题疏朗有呼吸感、小字正文紧密成块，阅读节奏刚好。",
    aiPrompt:
      "请调整字间距：大标题略微放宽字距显得舒展大气，正文保持默认紧凑，全大写小标签可加宽字距提升可读性，不要过头到散掉。",
  },
  {
    id: "type-hero-type",
    nameZh: "大字报式排版",
    nameEn: "Hero Typography",
    category: "typography",
    meaning:
      "像把一句口号刷成整面墙的大字，先声夺人。大字报式排版是 hero 区专属的超大型标题处理，靠字号本身当视觉锤。",
    effect: "你一进页面先被那句巨字砸中，主张瞬间入脑，气势和记忆点都来自这堵字墙。",
    aiPrompt:
      "请给我的首屏 hero 区做巨大标题排版：用超大的加粗字体占据视觉中心，可跨行断词、配合紧凑行高，让一句主张像大字报一样有冲击力。",
  },

  // ===== 测试与开发流程 dev-process =====
  {
    id: "dev-smoke",
    nameZh: "冒烟测试",
    nameEn: "Smoke Test",
    category: "dev-process",
    meaning:
      "像新装修完先开水龙头看漏不漏，不做全检只验「最 basics 通不通」。冒烟测试是上线前最浅的一轮，确认主流程没崩。",
    effect: "你花几分钟就能知道这次发布会不会一打开就白屏，挡住最low级的事故。",
    aiPrompt:
      "请给我的项目加一组冒烟测试：只覆盖最核心的主流程（如能打开首页、能登录、能提交表单），跑通就算过关，用来在每次改动后快速确认没把基本功能搞挂。",
  },
  {
    id: "dev-regression",
    nameZh: "回归测试",
    nameEn: "Regression Test",
    category: "dev-process",
    meaning:
      "像修好水管后把全屋水龙头都拧一遍，确认没哪处被殃及。回归测试是改完旧功能后，重跑一遍已有测试，确保没引入新毛病。",
    effect: "你改一个 bug 不怕顺手弄坏别处，历史功能被自动盯住，安心迭代。",
    aiPrompt:
      "请帮我把已有的测试用例整理成回归测试套件：每次修改代码后自动重跑全部用例，一旦某个旧功能突然失败就立刻报错，防止改动引入回归问题。",
  },
  {
    id: "dev-unit",
    nameZh: "单元测试",
    nameEn: "Unit Test",
    category: "dev-process",
    meaning:
      "像单独测一个螺丝能不能拧，把一个最小函数拎出来验它对不对。单元测试盯的是最小代码单元，不关心它和谁协作。",
    effect: "你每个小零件有保证，出错了能精准定位到「就是这个函数算错了」，不是瞎找。",
    aiPrompt:
      "请给核心的计算和工具函数写单元测试：对每个函数用几组输入验证输出是否正确，覆盖正常、边界和异常输入，并告诉我怎么运行这些测试。",
  },
  {
    id: "dev-integration",
    nameZh: "集成测试",
    nameEn: "Integration Test",
    category: "dev-process",
    meaning:
      "像把发动机、油箱、线路装一起试车，单件都好不等于拼起来好。集成测试验的是多个模块协作时接得对不对。",
    effect: "你确认 A 调 B、B 写库这条链路真通了，而不是各自 OK 拼起来却对不上暗号。",
    aiPrompt:
      "请给我写集成测试：验证前端调用接口、接口再读写数据库这条完整链路是否正确，重点测模块之间的数据传递和边界，而不只是单个函数。",
  },
  {
    id: "dev-e2e",
    nameZh: "端到端测试",
    nameEn: "E2E Test",
    category: "dev-process",
    meaning:
      "像请个用户从开门到结账走完全程，机器模拟真人点完整条路。端到端测试从用户界面一路验到后台，复刻真实使用。",
    effect: "你最有信心——因为测的就是「用户真这么点会不会成」，不是内部零件各自及格。",
    aiPrompt:
      "请给我的关键业务流程写端到端测试：用自动化模拟真实用户操作（打开页面、输入、点击、看到结果），覆盖从进入到完成的全过程，像真人走一遍那样验证。",
  },
  {
    id: "dev-sanity",
    nameZh: "可用性测试",
    nameEn: "Sanity Test",
    category: "dev-process",
    meaning:
      "像医生先看人醒没醒再细查，只确认「这次改动的基本方向对不对」。可用性测试是比冒烟还轻的一瞥，验证改动没跑偏。",
    effect: "你改完一项功能快速自测一下合理性，避免明显荒谬的结果被带上线。",
    aiPrompt:
      "请帮我在每次功能改动后做一轮可用性自测：快速手动或自动验证这次改动的核心结果合理（如按钮真能提交、数据真存进去了），只是粗略确认方向没错。",
  },
  {
    id: "dev-stress",
    nameZh: "压力测试",
    nameEn: "Stress Test",
    category: "dev-process",
    meaning:
      "像往电梯里猛塞人看它什么时候罢工，故意把流量或数据顶到极限。压力测试找的是系统的崩溃临界点。",
    effect: "你提前知道「多少人同时来会挂」，好决定要不要加机器，而不是上线当天被挤爆。",
    aiPrompt:
      "请帮我做压力测试方案：模拟大量用户同时访问或提交，逐步加压直到系统变慢或报错，找出能承受的并发上限和最先撑不住的环节。",
  },
  {
    id: "dev-perf-test",
    nameZh: "性能测试",
    nameEn: "Performance Test",
    category: "dev-process",
    meaning:
      "像给车测百公里加速，量的是「快不快、稳不稳」。性能测试量化响应时间、吞吐和稳定性，不全是为了压垮。",
    effect: "你拿到的不是「能用」，而是「打开要几秒、高峰期卡不卡」的具体数字，优化有依据。",
    aiPrompt:
      "请给我的站点做性能测试：测量首页和关键接口的响应时间、并发能力和资源占用，给出具体耗时数字和瓶颈在哪，方便后续针对性优化。",
  },
  {
    id: "dev-gray-release",
    nameZh: "灰度发布",
    nameEn: "Gray Release / Canary",
    category: "dev-process",
    meaning:
      "像新菜先端给一桌熟客试吃，没问题再全店上。灰度发布是把新版本先放给一小部分用户，观察稳妥了再扩大。",
    effect: "你上新功能不怕一翻车全员遭殃，小范围试错、可控回退，风险被关在笼子里。",
    aiPrompt:
      "请帮我把新功能做成灰度发布：先只对新版功能的 5%~10% 用户开放，监控错误率和反馈正常后再逐步放量到全部用户，出问题能立刻切回旧版。",
  },
  {
    id: "dev-canary",
    nameZh: "金丝雀发布",
    nameEn: "Canary Release",
    category: "dev-process",
    meaning:
      "矿工下井先带只金丝雀探毒，它先有反应人就能撤。金丝雀发布是灰度的一种：先放极少量流量当「探路鸟」，它活着再全量。",
    effect: "你用最小代价试出新版有没有毒，真出问题影响的人极少，几乎是零风险的试水。",
    aiPrompt:
      "请给我的部署做金丝雀发布：先把 1% 的流量切到新版本做「探路」，盯紧错误率和延迟，确认健康后再按比例放大到 100%，异常则自动回退。",
    related: [{ href: "/glossary#dev-gray-release", label: "参见：灰度发布" }],
  },
  {
    id: "dev-blue-green",
    nameZh: "蓝绿部署",
    nameEn: "Blue-Green Deployment",
    category: "dev-process",
    meaning:
      "像同时备好两套舞台，一套演着、一套候场，切光就换场。蓝绿部署是两套一模一样的环境，新版本在绿区就绪后一键把流量整体切过去。",
    effect: "你升级几乎零停机，出问题一键切回蓝区，用户基本无感。",
    aiPrompt:
      "请帮我设计蓝绿部署：维护两套相同环境（蓝=线上、绿=待发布），新版本在绿环境验证通过后把流量整体切到绿，出问题立刻切回蓝，实现近乎零停机的发布。",
  },
  {
    id: "dev-rollback",
    nameZh: "回滚",
    nameEn: "Rollback",
    category: "dev-process",
    meaning:
      "像走错路原路退回，把刚上的版本撤掉重跑旧的。回滚是发布翻车时的后悔药，一键回到上一个稳定态。",
    effect: "你上新翻车不慌，按一下就回到出事前，把损失和宕机时间压到最短。",
    aiPrompt:
      "请给我的发布流程加上可靠的回滚能力：保留上一个稳定版本，一旦新版本出错能一键切回旧版，并且回滚过程尽量不影响正在使用的用户。",
  },
  {
    id: "dev-hotfix",
    nameZh: "热修复",
    nameEn: "Hotfix",
    category: "dev-process",
    meaning:
      "像水管爆了赶紧先补一块，不等大装修。热修复是线上出紧急 bug 时，绕过正常排期立刻打一个小补丁救火。",
    effect: "你遇到线上火情能马上扑灭，不用等下个版本周期，用户少受罪。",
    aiPrompt:
      "请帮我做一个紧急热修复：线上出现严重 bug 时，单独拉一个修复分支只改这一处，快速测试后优先发布，不要等下个常规版本。",
  },
  {
    id: "dev-iteration",
    nameZh: "版本迭代",
    nameEn: "Iteration",
    category: "dev-process",
    meaning:
      "像雕塑一点点削，不是一次雕成再亮相。版本迭代是小步快跑：每轮做一点、放出、看反馈、再下一轮。",
    effect: "你不用赌一次性做对，产品越改越贴合需求，早出错早调头，成本低。",
    aiPrompt:
      "请帮我把项目规划成小步迭代：每 1~2 周出一个可用版本，先实现核心再逐步加功能，每轮根据反馈调整下一轮重点，不要试图一次做到完美。",
  },
  {
    id: "dev-agile",
    nameZh: "敏捷开发",
    nameEn: "Agile",
    category: "dev-process",
    meaning:
      "像划船随时看风向微调，而非死按旧航线。敏捷开发重响应变化、重可用成果，用短周期频繁交付来对抗「需求会变」这个现实。",
    effect: "你需求中途变了也不怕，团队小周期出活、常对齐，做出来的就是你要的。",
    aiPrompt:
      "请用敏捷的方式推进我的项目：把工作拆成短周期（如两周）的小目标，每周期结束都有可运行成果供我看，过程中需求变化随时调整优先级。",
  },
  {
    id: "dev-waterfall",
    nameZh: "瀑布模型",
    nameEn: "Waterfall",
    category: "dev-process",
    meaning:
      "像自上而下流水：需求→设计→开发→测试→上线，一阶段完才进下一阶段，不回头。瀑布模型适合需求极稳、难中途改的项目。",
    effect: "你拿到的是一份按顺序走完的计划，阶段清晰、文档全，但中途改主意代价大。",
    aiPrompt:
      "如果我的项目需求非常明确且很少变更，请按瀑布模型推进：先完整定需求和设计，再进入开发、测试、上线，每个阶段验收通过才进下一阶段，减少返工。",
  },
  {
    id: "dev-ci",
    nameZh: "持续集成",
    nameEn: "CI (Continuous Integration)",
    category: "dev-process",
    meaning:
      "像大家把各自的乐高 continuously 拼到大盘上，每次拼完自动验一遍牢不牢。持续集成是每人提交的代码都自动合并并跑测试，早发现问题。",
    effect: "你不用等到发布前才炸出一堆冲突和 bug，问题在写下那天就被自动逮住。",
    aiPrompt:
      "请帮我的项目配置持续集成（CI）：每次有人提交代码都自动拉取、安装依赖、运行测试和构建，一旦失败立刻通知，确保主干代码始终可运行。",
  },
  {
    id: "dev-cd",
    nameZh: "持续部署",
    nameEn: "CD (Continuous Deployment)",
    category: "dev-process",
    meaning:
      "像流水线末端自动打包发货，代码一通过测试就自动上线。持续部署在 CI 之后把「能发」变成「自动发」。",
    effect: "你改完代码通过测试就上线，省掉人工发布这步，新功能到用户手里更快。",
    aiPrompt:
      "请在我的 CI 之后接上持续部署（CD）：测试通过的代码自动构建并发布到线上（或预发环境），减少人工发布步骤和出错，我只需关注代码本身。",
  },
  {
    id: "dev-code-review",
    nameZh: "代码审查",
    nameEn: "Code Review",
    category: "dev-process",
    meaning:
      "像稿子请同事校一遍，第二双眼睛挑错也传经验。代码审查是合并前让别人读你的代码，找 bug、提建议、保风格。",
    effect: "你提交的代码被把关，低级错误和隐患在上线前就被同伴揪出，质量更稳。",
    aiPrompt:
      "请在我准备合并代码前做一次代码审查：通读改动，指出明显 bug、安全隐患和可读性差的地方，并给出更简洁或更符合规范的写法建议。",
  },
  {
    id: "dev-tech-debt",
    nameZh: "技术债",
    nameEn: "Technical Debt",
    category: "dev-process",
    meaning:
      "像为赶工期借的高利贷，现在图快抄近路，以后要连本带利还。技术债是刻意或无意留下的凑合代码，迟早要重构。",
    effect: "你短期跑得快，但债攒多了改什么都怕牵一发动全身，越往后越慢。",
    aiPrompt:
      "请帮我校验当前代码的技术债：标出那些为了赶工写的凑合逻辑、重复代码和绕弯实现，按「改起来收益大、风险小」排个序，建议哪些该尽快还。",
  },
  {
    id: "dev-mvp",
    nameZh: "最小可行产品",
    nameEn: "MVP (Minimum Viable Product)",
    category: "dev-process",
    meaning:
      "像先造个能跑的滑板去验证「大家要不要代步」，而不是一上来造汽车。MVP 是用最小成本做出能验证想法的版本。",
    effect: "你最快拿到真实反馈，证明点子值不值得继续砸钱，避免闭门造出无人要的完美品。",
    aiPrompt:
      "请帮我把想法做成最小可行产品（MVP）：只实现验证核心价值所必需的那几个功能，砍掉一切锦上添花，尽快做出能给人用、能收集反馈的版本。",
  },
  {
    id: "dev-req-review",
    nameZh: "需求评审",
    nameEn: "Requirement Review",
    category: "dev-process",
    meaning:
      "像开工前把图纸摊开大家挑刺，确认要盖的真是你要的。需求评审是动手前对齐「做什么、做到什么程度」，避免做错方向。",
    effect: "你少花冤枉功夫，开干前就把歧义、遗漏和冲突摊平，后面返工少。",
    aiPrompt:
      "请帮我把需求整理并评审一遍：列出要实现的功能清单和验收标准，标出含糊、冲突或缺失的地方，让我确认清楚后再开始写代码，避免做偏。",
  },
  {
    id: "dev-tracking",
    nameZh: "埋点",
    nameEn: "Tracking / Analytics",
    category: "dev-process",
    meaning:
      "像在店里不同角落装计数器，记录谁看了哪、点了哪。埋点是在页面或按钮里埋下统计代码，收集用户真实行为。",
    effect: "你不再靠猜，能拿出「多少人点了这个按钮、卡在哪一步」的数据，决策有依据。",
    aiPrompt:
      "请给我的关键页面和按钮加埋点：记录页面访问量、按钮点击和关键转化步骤，数据上报到分析工具，帮我看清用户实际怎么用、在哪流失。",
  },
  {
    id: "dev-ab",
    nameZh: "A/B 测试",
    nameEn: "A/B Testing",
    category: "dev-process",
    meaning:
      "像同款饮料换两种包装各卖一半，看哪种卖得好。A/B 测试把用户随机分成两群，各看不同版本，用数据选优。",
    effect: "你不用拍脑袋定方案，让一半用户替你投票，哪个转化高用哪个，胜率看得见。",
    aiPrompt:
      "请帮我对一个页面元素做 A/B 测试：做两个版本（如按钮文案或颜色不同），随机把用户分流，分别统计点击或转化，跑够样本后选用数据更好的那个。",
  },

  // ===== 线上运维 ops =====
  {
    id: "ops-crash",
    nameZh: "崩溃",
    nameEn: "Crash",
    category: "ops",
    meaning:
      "像车开一半发动机熄火，程序非正常地整个挂掉。崩溃是软件遇到没法处理的错误直接终止，用户面前瞬间白屏或闪退。",
    effect: "你正用着突然就用不了，进度可能丢，体验最差的一种故障。",
    aiPrompt:
      "请帮我校验代码里可能导致崩溃的地方：找出没做保护的空值、数组越界、未捕获的异常，加上兜底处理，并在崩溃前给出友好提示而不是整个白屏。",
  },
  {
    id: "ops-downtime",
    nameZh: "宕机",
    nameEn: "Downtime",
    category: "ops",
    meaning:
      "像店门口挂「今日歇业」，整个服务访问不了。宕机是服务器或站点彻底不可用的时段，用户进不来。",
    effect: "你这段时间完全失去用户，每分每秒都是真金白银的流失和口碑折损。",
    aiPrompt:
      "请帮我想办法降低宕机风险：用健康检查自动重启异常进程、多实例冗余、并把静态资源放到 CDN，确保单点故障不会让整个站点不可访问。",
  },
  {
    id: "ops-ha",
    nameZh: "高可用",
    nameEn: "HA (High Availability)",
    category: "ops",
    meaning:
      "像重要桥梁都修两条道，一条封了另一条还能过。高可用是用冗余和自动切换，让系统尽量少停（常提「几个 9」的在线率）。",
    effect: "你几乎感觉不到它维护或出小故障，服务常年在线，用户随时来都在。",
    aiPrompt:
      "请帮我设计高可用架构：关键服务部署多个实例、跨可用区冗余，配合健康检查和自动故障转移，目标达到 99.9% 以上的可用性。",
  },
  {
    id: "ops-dr",
    nameZh: "容灾",
    nameEn: "Disaster Recovery",
    category: "ops",
    meaning:
      "像给重要文件多备一份锁进别处保险柜，火烧了主屋还有副本。容灾是当机房、城市甚至云厂商出大事时，能从异地备份恢复业务。",
    effect: "你天塌下来也不至于数据全没，按预案能在一定时间内把服务在别处拉起来。",
    aiPrompt:
      "请帮我的项目规划容灾方案：定期把数据库和关键文件备份到异地（或另一家云），写明灾难发生后多久能恢复、丢多少数据，并演练恢复流程。",
  },
  {
    id: "ops-ratelimit",
    nameZh: "限流",
    nameEn: "Rate Limiting",
    category: "ops",
    meaning:
      "像地铁早高峰拦人分批进，每秒只放一定数量的请求。限流保护系统不被突发流量或恶意刷爆，维持基本可用。",
    effect: "你遇到抢购或攻击时系统不会瞬间垮，大部分用户仍能正常用，只是偶发稍慢。",
    aiPrompt:
      "请给公开接口加限流：对每个用户或 IP 限制单位时间内的请求次数（如每分钟 60 次），超出返回友好提示，防止被刷爆或爬虫拖垮服务。",
  },
  {
    id: "ops-degradation",
    nameZh: "降级",
    nameEn: "Degradation",
    category: "ops",
    meaning:
      "像餐厅爆满时先停售复杂菜品、只保主食，保住核心不崩。降级是压力太大时主动关掉次要功能，让主流程勉强能跑。",
    effect: "你高峰或故障期体验变差但「还能用」，而不是整站挂掉，核心买卖不断。",
    aiPrompt:
      "请给我的系统加降级策略：当依赖的服务变慢或出错时，自动关闭非核心功能（如推荐、评论），返回缓存或简化结果，保证主流程（如浏览、下单）不垮。",
  },
  {
    id: "ops-cache",
    nameZh: "缓存",
    nameEn: "Cache",
    category: "ops",
    meaning:
      "像把常查的菜预先盛一碗在手边，不用每次现做。缓存是把算过或取过的数据暂存起来，下次直接用，省时省力。",
    effect: "你再访问时秒开，因为答案早备好了，服务器也少干重复活、更扛压。",
    aiPrompt:
      "请给我的页面和接口加缓存：把不常变的数据（如首页内容、商品信息）缓存起来并设置合理过期时间，减少重复查库，让访问更快、服务器更轻松。",
  },
  {
    id: "ops-cdn",
    nameZh: "CDN 加速",
    nameEn: "CDN",
    category: "ops",
    meaning:
      "像在全国开了连锁仓，你下单就近发货而不是从总仓跨半个中国。CDN 把图片、脚本等静态资源复制到离用户近的节点，就近取。",
    effect: "你无论在哪个城市，图片视频都从附近节点下来，加载明显更快、不卡。",
    aiPrompt:
      "请帮我把图片、字体和脚本等静态资源接入 CDN：让用户从离自己最近的节点加载，降低延迟和源站压力，并给静态资源设置长期缓存。",
  },
  {
    id: "ops-lb",
    nameZh: "负载均衡",
    nameEn: "Load Balancing",
    category: "ops",
    meaning:
      "像银行开多个窗口分流排队，把客人匀到各个柜员。负载均衡把流量分摊到多台服务器，谁都不被压死。",
    effect: "你访问时请求被派到较闲的机器，响应稳、不堵车，系统整体更扛量。",
    aiPrompt:
      "请帮我的服务做负载均衡：在前面放一层把请求均匀分给多台后端服务器，某台挂了自动摘除流量，保证横向扩展和单点故障时整体仍可用。",
  },
  {
    id: "ops-beta",
    nameZh: "灰度用户",
    nameEn: "Beta User",
    category: "ops",
    meaning:
      "像新车试驾员，新功能先给他们尝鲜挑刺。灰度用户是一小批自愿或被选中的人，提前用未全量发布的功能。",
    effect: "你作为灰度用户能抢先体验新东西、还能影响产品；官方则用你们这小撮人试出大问题再全量。",
    aiPrompt:
      "请帮我圈定一批灰度（Beta）用户：把新功能只对这部分账号开放，收集他们的反馈和报错，验证稳定后再逐步放开给所有人。",
    related: [{ href: "/glossary#dev-gray-release", label: "参见：灰度发布" }],
  },
  {
    id: "ops-incident",
    nameZh: "线上事故",
    nameEn: "Incident",
    category: "ops",
    meaning:
      "像店里突然停电排队炸锅，任何影响线上正常服务的突发状况都算。线上事故从 minor 卡顿到大面积宕机都涵盖，需要有人盯、有人救。",
    effect: "你遇到时服务部分或全坏，用户投诉涌来；处理快慢直接决定损失和口碑。",
    aiPrompt:
      "请帮我建立线上事故的应对机制：定义不同严重级别、明确的报警谁接、标准处理步骤和事后复盘模板，让我出问题时知道先做什么、找谁。",
  },
  {
    id: "ops-monitor",
    nameZh: "监控告警",
    nameEn: "Monitoring & Alerting",
    category: "ops",
    meaning:
      "像给机房装烟雾报警器和仪表盘，指标异常立刻响铃。监控告警是持续盯着系统的体温和心跳，出幺蛾子第一时间通知人。",
    effect: "你不用自己盯屏幕，错误率一飙、响应一慢，手机就收到警报，能在用户大规模抱怨前动手。",
    aiPrompt:
      "请帮我的站点接上监控告警：持续跟踪错误率、响应时间、服务器资源，异常时通过邮件或即时消息通知我，并给一个能一眼看清系统健康状况的仪表盘。",
  },

  // ===== 页面区块 page-section =====
  {
    id: "section-banner",
    nameZh: "头图",
    nameEn: "Banner",
    category: "page-section",
    meaning:
      "像杂志封面那张主图，页面顶部一张抢眼的大图配一句话。头图常出现在栏目或文章顶，用来定调和吸引。",
    effect: "你一进栏目就被那张图抓住情绪，知道这页讲什么氛围。",
    aiPrompt:
      "请给我的栏目页做一个头图：顶部一张满宽大图配半透明遮罩和一句标题文字，图片和文案呼应本栏主题，不要太花哨抢内容。",
  },
  {
    id: "section-hero",
    nameZh: "英雄区",
    nameEn: "Hero Section",
    category: "page-section",
    meaning:
      "落地页最顶那块「主舞台」，像电影海报占满首屏，一句话+一个按钮讲清你是谁。英雄区是访客第一眼、最该用力气的地方。",
    effect: "你一进来就懂这产品干嘛、能干嘛，并被那个主按钮顺手带着走。",
    aiPrompt:
      "请给我的首页做一个英雄区（Hero）：首屏满宽，左边一句有力的价值主张标题加一段副文案和一个主按钮，右边放产品图或演示，整体不滚动就能看清核心。",
  },
  {
    id: "section-features",
    nameZh: "产品特性",
    nameEn: "Features",
    category: "page-section",
    meaning:
      "像把卖点摊成一排卡片：能做什么、为什么好，逐条列清。特性区是说服你「这东西值得用」的那几块。",
    effect: "你扫几张卡片就明白它强在哪，不用读长篇大论。",
    aiPrompt:
      "请给我做一个产品特性区：用 3~6 张卡片或左右图文块列出核心功能，每张配一个小图标、一句标题和一两句说明，图标风格统一。",
  },
  {
    id: "section-testimonials",
    nameZh: "客户见证",
    nameEn: "Testimonials",
    category: "page-section",
    meaning:
      "像门口贴的好评墙，放真实用户的夸奖和头像。客户见证用别人的嘴帮你背书，降低新人的犹豫。",
    effect: "你看到「和我一样的人说好用」，信任感上来了，下单更果断。",
    aiPrompt:
      "请给我做一个客户见证区：放 3~4 条真实用户评价，每条配头像、名字和一句话好评，可做成卡片或引文样式，语气真实不要像编的。",
  },
  {
    id: "section-faq",
    nameZh: "常见问题",
    nameEn: "FAQ",
    category: "page-section",
    meaning:
      "像前台常备的问答小册，把大家最纠结的几个问题先答了。FAQ 用问答形式提前化解犹豫和客服压力。",
    effect: "你心里的疙瘩自己就能在这翻到答案，不用等人工回复。",
    aiPrompt:
      "请给我做一个常见问题（FAQ）区：列出 5~8 个用户最可能问的问题和简答，用折叠面板收纳，问题写用户真实会搜的大白话。",
  },
  {
    id: "section-cta",
    nameZh: "行动号召按钮",
    nameEn: "CTA (Call To Action)",
    category: "page-section",
    meaning:
      "像 salesman 最后那句「现在就试试」，页面上最能勾你动手的那个按钮。CTA 是专门设计来引你点「注册 / 购买 / 免费开始」的。",
    effect: "你在犹豫时被它轻轻推一把，明确的下一步摆在眼前，转化就高了。",
    aiPrompt:
      "请在我的页面关键位置放行动号召按钮（CTA）：用醒目的主色、动词开头的文案（如「免费开始」「立即购买」），放在英雄区和页面底部，并和周边留白拉开层次。",
  },
  {
    id: "section-landing",
    nameZh: "落地页",
    nameEn: "Landing Page",
    category: "page-section",
    meaning:
      "像一张为某一目的专门印的单页传单，只为让人做一件事（下载、报名）。落地页是单一目标、不留多余出口的转化页。",
    effect: "你被这页带着一步步走到那个按钮，没有杂链接分心，转化效率高。",
    aiPrompt:
      "请给我做一个落地页：单一目标（如报名或下载），从上到下依次是英雄区、特性、见证、FAQ，最后用醒目的 CTA 收尾，去掉会分散注意力的多余导航。",
  },
  {
    id: "section-homepage",
    nameZh: "官网",
    nameEn: "Homepage",
    category: "page-section",
    meaning:
      "像公司的大门脸，访客第一次来的总入口，要让人一眼懂你是干啥的。官网首页承载品牌第一印象和去各处的中转。",
    effect: "你第一次来就知道这站是啥、能去哪，第一印象专业与否决定留不留。",
    aiPrompt:
      "请帮我设计官网首页：顶部导航 + 英雄区讲清定位 + 特性/见证/CTA 几大区块，既展示实力又把访客导向关键页面，整体专业可信。",
  },
  {
    id: "section-dashboard",
    nameZh: "仪表盘",
    nameEn: "Dashboard",
    category: "page-section",
    meaning:
      "像汽车驾驶舱那排仪表，把关键数据汇到一屏让你掌控全局。仪表盘是登录后那块「总览」，图表和数字为主。",
    effect: "你一登录就看见核心指标和待办，不用到处翻就能做决策。",
    aiPrompt:
      "请给我做一个数据仪表盘：登录后首屏用卡片网格展示关键指标（如数量、趋势图、近期动态），重要数据置顶，支持按时间范围筛选。",
  },
  {
    id: "section-profile",
    nameZh: "个人中心",
    nameEn: "Profile",
    category: "page-section",
    meaning:
      "像你的私人小窝，放头像、资料和你能改的设置。个人中心是用户管理自己账号和偏好的地方。",
    effect: "你在这改昵称、换头像、看订单，掌控「属于我的那部分」。",
    aiPrompt:
      "请给我做一个个人中心页：左侧或顶部是头像和基本信息，下面分标签展示我的订单、设置、收藏等，提供编辑资料和修改密码的入口。",
  },
  {
    id: "section-cart",
    nameZh: "购物车",
    nameEn: "Cart",
    category: "page-section",
    meaning:
      "像超市推车，把想买的一件件暂存进去，最后一起结。购物车是电商里暂存待结算商品的区。",
    effect: "你慢慢挑不用立刻付，凑齐了再一起算，购物节奏在你的手里。",
    aiPrompt:
      "请给我做一个购物车页面：列出已加商品（图、名、单价、数量加减、小计），可勾选结算，底部显示合计金额和去结算按钮，空车时给引导去逛逛。",
  },
  {
    id: "section-checkout",
    nameZh: "结账流程",
    nameEn: "Checkout",
    category: "page-section",
    meaning:
      "像收银台那几步：确认商品→填地址→付款→完成。结账流程是转化最后一公里，每多一步都在掉用户。",
    effect: "你付钱的过程顺不顺，直接决定买不买得成；步骤少、有进度条最友好。",
    aiPrompt:
      "请做一个结账流程：分「确认订单→填写收货与支付→完成」几步，顶部有步骤条，支持地址自动带出、明显的支付按钮，并在每一步做好表单校验。",
  },
  {
    id: "section-form",
    nameZh: "表单页",
    nameEn: "Form Page",
    category: "page-section",
    meaning:
      "像一张要你填的申请表，把输入项排好等你写。表单页是收集用户信息（注册、反馈、下单）的专用页。",
    effect: "你按字段一项项填，点提交把信息交出去，是人和系统对话的主通道。",
    aiPrompt:
      "请给我做一个表单页：按逻辑分组排列输入项（基本信息/详细内容），每项有清晰标签和占位提示，必填标星，提交前校验、提交时显示加载、成功给反馈。",
  },
  {
    id: "section-list",
    nameZh: "列表页",
    nameEn: "List Page",
    category: "page-section",
    meaning:
      "像目录索引，把一堆同类内容一行行或一卡卡列出来供你挑。列表页是内容的集合视图，常配筛选和翻页。",
    effect: "你快速扫过一堆选项，配合搜索筛选精准定位到想看的那条。",
    aiPrompt:
      "请给我做一个列表页：顶部有搜索和筛选条件，下方用卡片或表格列出同类内容（带缩略图、标题、摘要），支持排序和分页/无限滚动。",
  },
  {
    id: "section-detail",
    nameZh: "详情页",
    nameEn: "Detail Page",
    category: "page-section",
    meaning:
      "像点开目录里某一条后的正文，把单个对象的全貌摊开。详情页是列表页点进去那层，信息最全。",
    effect: "你看中某条后进来读完整信息、看图、下单或操作，决策在这完成。",
    aiPrompt:
      "请给我做一个详情页：顶部大图/标题，中间分块展示完整信息和参数，重要操作按钮（如购买/收藏）常驻可见，相关推荐放底部。",
  },
  {
    id: "section-404",
    nameZh: "404 页面",
    nameEn: "404 Page",
    category: "page-section",
    meaning:
      "像走错房间看到的「此路不通」提示牌。404 是用户访问了不存在的链接时，那张友好的兜底页。",
    effect: "你点错链接不撞南墙，看到一句幽默提示加返回首页的按钮，不至于懵在原地。",
    aiPrompt:
      "请给我做一个 404 页面：风格和全站一致，用轻松的文案说明「页面走丢了」，放一个醒目的「返回首页」按钮，最好带点有趣插画缓解挫败感。",
  },

  // ===== 文案与内容 content =====
  {
    id: "content-lorem",
    nameZh: "占位文本",
    nameEn: "Lorem Ipsum",
    category: "content",
    meaning:
      "像装修用的模型沙袋，专供摆着看版式、不给人读。Lorem Ipsum 是一段毫无意义的拉丁文，设计师用来占位凑排版。",
    effect: "你审稿时不会被真假文字分心，只看版面疏密对不对，真内容后填。",
    aiPrompt:
      "在页面还没真文案时，请用 Lorem Ipsum 或中文占位段落填充，长度接近真实内容，方便我检查排版和换行，正式上线前再替换。",
  },
  {
    id: "content-placeholder-img",
    nameZh: "示意图",
    nameEn: "Placeholder Image",
    category: "content",
    meaning:
      "像样品间摆的假家具，先占着位置让你看整体。示意图是临时图片，等真图准备好再换，常是纯色块或写字的图。",
    effect: "你先看版式和图文关系对不对，不被「图还没好」卡住进度。",
    aiPrompt:
      "在真实图片没到位时，请用占位示意图（纯色块或带尺寸标注的图）占住图片位置，保持和最终图同尺寸，避免布局跳动，上线前替换为真图。",
    related: [{ href: "/glossary#layout-placeholder", label: "参见：瀑布加载占位" }],
  },
  {
    id: "content-icon-font",
    nameZh: "图标字体",
    nameEn: "Icon Font",
    category: "content",
    meaning:
      "把图标做成「字体」里的一个个字符，打个字就出一个图。图标字体让图标能像文字一样调大小、上色，曾是主流方案。",
    effect: "你改图标大小和颜色像改文字一样方便，但细节和清晰度不如矢量图。",
    aiPrompt:
      "如果要用图标字体，请统一引入一套（如 Font Awesome），用对应字符或类名调用图标，可直接用 CSS 控制大小和颜色；新项目更推荐用 SVG 图标。",
  },
  {
    id: "content-illustration",
    nameZh: "插画",
    nameEn: "Illustration",
    category: "content",
    meaning:
      "像文章里手绘的那张配图，比照片更风格化、更有温度。插画是用绘制图形讲故事或点缀，常带品牌个性。",
    effect: "你看着不冷冰冰，插画把抽象概念画活，也顺手传递品牌调性。",
    aiPrompt:
      "请给我的页面关键位置配几张风格统一的插画（如空状态、首屏装饰），用扁平或微立体的画风呼应品牌色，避免和照片混搭显得杂乱。",
  },
  {
    id: "content-avatar",
    nameZh: "头像",
    nameEn: "Avatar",
    category: "content",
    meaning:
      "像论坛里代表你的那张小脸，可以是真人照、卡通或首字母。头像是用户在系统里的视觉身份。",
    effect: "你一眼认出「这是谁发的」，评论区和列表有了人味儿。",
    aiPrompt:
      "请给用户信息处加头像：支持上传图片，未上传时显示按名字生成的彩色首字母占位头像，圆形裁切、大小统一。",
  },
  {
    id: "content-badge",
    nameZh: "徽标",
    nameEn: "Badge / Logo",
    category: "content",
    meaning:
      "徽标有两义：一是品牌那个「注册商标」图形（Logo），二是页面上小圆点角标（如未读 3 条的红点）。这里指小角标：像衣服胸针，挂在某元素上提示有料。",
    effect: "你看到红点或小标签就知道「这里有新东西 / 这是某种状态」，不用挨个翻。",
    aiPrompt:
      "请给需要提示的元素加徽标：如导航的「消息」图标右上角显示未读数量的红色小圆点，商品卡角上贴「热卖」标签，样式小巧不挡内容。",
  },
  {
    id: "content-watermark",
    nameZh: "水印",
    nameEn: "Watermark",
    category: "content",
    meaning:
      "像纸钞上淡淡的暗纹，证明归属又不挡主图。水印是叠在图片或文档上的半透明标识，防盗用也表出处。",
    effect: "你随手存图也带着出处，别人知道是谁的；又不至于糊掉主内容。",
    aiPrompt:
      "请给需要保护的图片加半透明水印：在右下角或平铺显示品牌名或 Logo，透明度调低不挡主体，既表归属又不破坏观感。",
  },
  {
    id: "content-excerpt",
    nameZh: "摘要",
    nameEn: "Excerpt",
    category: "content",
    meaning:
      "像文章开头那两行「导读」，把正文最甜的浓缩给你尝。摘要是长文前面的一段简短概括，帮你决定看不看全文。",
    effect: "你扫列表时只读摘要就能判断值不值得点进去，省时间。",
    aiPrompt:
      "请给每篇内容生成一句话摘要（约 20~40 字），展示在列表卡片里，概括核心看点，吸引点击又不剧透全部。",
  },
  {
    id: "content-body",
    nameZh: "正文",
    nameEn: "Body Text",
    category: "content",
    meaning:
      "像书里除标题外那一大片你真正读的字。正文是页面承载主要信息的文字主体，讲究易读。",
    effect: "你读得顺不顺，全看正文的字号、行距、颜色和宽度舒不舒服。",
    aiPrompt:
      "请让正文易读：字号 15~17 像素、行高约 1.6 倍、每行宽度控制在 60~75 字符、用高对比的深灰文字，长文分段并加小标题。",
  },
  {
    id: "content-heading",
    nameZh: "标题层级",
    nameEn: "Heading Levels",
    category: "content",
    meaning:
      "像书的章、节、小标题一层套一层，用大小告诉你是第几级。标题层级（H1~H6）既管视觉也管结构，机器也靠它读大纲。",
    effect: "你扫标题就知道文章骨架，跳着读也行；对搜索引擎和读屏软件也友好。",
    aiPrompt:
      "请给我的长文用清晰的标题层级：全页只有一个 H1 做主标题，H2 分大节、H3 分小节，层级不要跳级，字号随层级递减形成视觉秩序。",
  },
  {
    id: "content-linebreak",
    nameZh: "换行",
    nameEn: "Line Break",
    category: "content",
    meaning:
      "像写诗故意另起一行制造停顿。换行是强制文字从下一行开头，用来控制节奏或排版，不等同于新段落。",
    effect: "你读到换行处自然顿一下，地址、歌词、诗句这类靠换行才对味。",
    aiPrompt:
      "请在需要断行的地方（如地址、诗歌、卡片标语）用换行而非新段落控制，保持语义连贯；普通正文让它自动换行，不要手动塞多余换行。",
  },
  {
    id: "content-truncation",
    nameZh: "省略号截断",
    nameEn: "Text Truncation",
    category: "content",
    meaning:
      "像把太长的话掐头去尾加个「…」，只露前一句。截断是文字超出容器时自动收尾加省略号，防撑破布局。",
    effect: "你看到「…」知道后面还有，列表整整齐齐不被长句子戳破排版。",
    aiPrompt:
      "请给列表里的标题和描述做省略号截断：单行超长显示省略号，多行最多显示 2~3 行再截断，保证卡片高度一致、布局不被长文本撑破。",
  },

  // ===== 登录与状态 auth-state =====
  {
    id: "auth-login",
    nameZh: "登录",
    nameEn: "Login",
    category: "auth-state",
    meaning:
      "像刷门禁卡证明「是我」，系统核对账号密码后放你进专属区。登录是拿到自己身份、看见私人内容的第一步。",
    effect: "你登进去后看到的是「我的」东西——订单、设置、进度，和游客看到的完全不同。",
    aiPrompt:
      "请给我做一个登录功能：账号密码（或手机号验证码）登录，错误时给明确提示，登录成功跳回原页面并记住登录态，提供「记住我」选项。",
  },
  {
    id: "auth-signup",
    nameZh: "注册",
    nameEn: "Sign Up",
    category: "auth-state",
    meaning:
      "像办会员卡，第一次来填资料开个户。注册是创建账号、把你这号存进系统，之后才能登录。",
    effect: "你从路人变成有户头的用户，系统开始记住你的一举一动。",
    aiPrompt:
      "请给我做一个注册流程：收集必要信息（如手机号/邮箱+密码），做好格式校验和两次密码一致，注册成功自动登录并引导到首页或个人中心。",
  },
  {
    id: "auth-forgot",
    nameZh: "忘记密码",
    nameEn: "Forgot Password",
    category: "auth-state",
    meaning:
      "像忘带钥匙走物业核验身份重配一把。忘记密码是通过绑定的手机/邮箱验证后重置，不让你永久被锁门外。",
    effect: "你忘密也不慌，走验证链路重设一把新密码就能回来，不被卡死。",
    aiPrompt:
      "请给登录页加「忘记密码」：点击后引导输入注册邮箱/手机号，发送验证码，验证通过后让用户输入新密码并即时生效，全程做好身份校验防被冒用。",
  },
  {
    id: "auth-captcha",
    nameZh: "验证码",
    nameEn: "Captcha",
    category: "auth-state",
    meaning:
      "像门口让你算一道小题证明不是机器人。验证码是区分真人和自动脚本的那关，挡掉批量注册和刷接口。",
    effect: "你多点一下证明自己是人，换来的是系统不被机器刷爆、账号更安全。",
    aiPrompt:
      "请在注册和登录等敏感操作加验证码（如图形或滑块），拦住自动脚本的批量请求，但别把真人难住——优先用不打断体验的方式。",
  },
  {
    id: "auth-guest",
    nameZh: "游客模式",
    nameEn: "Guest Mode",
    category: "auth-state",
    meaning:
      "像不办卡也能先逛商场，只看不买、不存档。游客模式允许未登录用户浏览部分内容，降低体验门槛。",
    effect: "你没账号也能先看看好不好用，想 deeper 了再被引导登录，不强制先办卡。",
    aiPrompt:
      "请给未登录用户开放游客模式：能浏览公开内容和试用基础功能，遇到需要保存或个性化时才引导登录，不要一进来就强制注册。",
  },
  {
    id: "auth-default-avatar",
    nameZh: "默认头像",
    nameEn: "Default Avatar",
    category: "auth-state",
    meaning:
      "像没拍照先发的通用剪影，人人都一样直到你换。默认头像是用户没上传头像时系统给的兜底图。",
    effect: "你什么都不设也有个像样的标识，列表里不会冒出难看的空白框。",
    aiPrompt:
      "请给用户没传头像时显示默认头像：用按名字首字母生成的彩色圆字，或一套统一的通用剪影，避免空白或破损图，且和用户上传头像区分开。",
  },
  {
    id: "auth-logged-in",
    nameZh: "已登录",
    nameEn: "Logged In",
    category: "auth-state",
    meaning:
      "像门禁记住了你今天刷过卡，在有效期内进出不用再验。已登录是系统保持着你的身份态，操作连续不中断。",
    effect: "你逛着逛着不用反复验身份，加购、评论、看私信一路畅通。",
    aiPrompt:
      "请在用户登录后维持登录态（用安全的会话或令牌），刷新和跳转都不掉线，并在界面上显示用户是谁、提供退出入口。",
  },
  {
    id: "auth-logged-out",
    nameZh: "未登录",
    nameEn: "Logged Out",
    category: "auth-state",
    meaning:
      "像你刚走到店门口、还没刷脸，系统不认得你。未登录是默认态，看到的是公开、通用内容。",
    effect: "你看到的是「路人视角」，部分功能受限，系统用登录按钮招呼你办卡。",
    aiPrompt:
      "请为未登录状态设计体验：展示公开内容并弱化私人功能，在关键操作处用登录按钮引导，但不要强硬弹窗打断浏览。",
  },
  {
    id: "auth-membership",
    nameZh: "会员状态",
    nameEn: "Membership Status",
    category: "auth-state",
    meaning:
      "像不同票档决定你能进哪些区，免费、普通、VIP 各有权限。会员状态区分用户的权益等级。",
    effect: "你看到的是和自己等级匹配的内容和功能，升级后解锁更多，有奔头。",
    aiPrompt:
      "请给我的站点加会员状态：区分免费/普通/VIP 等等级，按等级控制可见内容和可用功能，并在界面清晰标示当前会员身份和可升级的权益。",
  },
  {
    id: "auth-expired",
    nameZh: "过期",
    nameEn: "Expired",
    category: "auth-state",
    meaning:
      "像电影票过了放映日作废，登录态或权益到了点就失效。过期是时间到了系统收回权限或会话。",
    effect: "你再操作被提示「已过期」，需重新登录或续费，系统借此保安全、促续费。",
    aiPrompt:
      "请处理过期场景：登录会话到期自动退出并引导重新登录，会员过期后收回对应权益并显示续费入口，提示文案要明确且给恢复路径。",
  },
  {
    id: "auth-disabled",
    nameZh: "禁用",
    nameEn: "Disabled",
    category: "auth-state",
    meaning:
      "像被拉闸的开关，灰着按不动。禁用态表示这个按钮或账号暂时不可操作，常因权限不足或被封。",
    effect: "你看到灰掉的控件知道「现在不能点」，而不是点了没反应一脸懵。",
    aiPrompt:
      "请给不可用的按钮和账号做禁用态：视觉上变灰、降低透明度并禁止点击，鼠标悬停可显示原因（如「权限不足」），不要只是点了没反应。",
  },
  {
    id: "auth-readonly",
    nameZh: "只读",
    nameEn: "Read-only",
    category: "auth-state",
    meaning:
      "像玻璃展柜，你能看透但不能伸手改。只读态允许查看内容但禁止任何编辑写入。",
    effect: "你放心浏览不怕误改，系统也借此保护关键数据不被随便动。",
    aiPrompt:
      "请给某些视图做只读模式：用户能查看内容和数据但不能编辑、删除或提交，相关按钮隐藏或禁用，必要时提示「当前为只读」。",
  },

  // ===== AI 编程提示词 ai-prompt =====
  {
    id: "ai-iterate",
    nameZh: "迭代",
    nameEn: "Iterate",
    category: "ai-prompt",
    meaning:
      "像雕塑家先粗坯再精修，不指望一次就完美。迭代是让 AI 先做一版，你看了再让它改，循环逼近满意。",
    effect: "你不用把需求一次写绝，边看边调，AI 越改越贴你心意，降低一次说清的难度。",
    aiPrompt:
      "请先给我做一个基础版本，我看完会提修改意见，我们一轮轮迭代优化，不要试图一次做到完美；每轮只聚焦我要改的那几点。",
  },
  {
    id: "ai-finetune",
    nameZh: "微调",
    nameEn: "Fine-tune",
    category: "ai-prompt",
    meaning:
      "像把现成的西装按你身形收腰改短，在大框架不变上做精准小改。微调指对已有结果做局部调整，而非推倒重来。",
    effect: "你只动要动的那点，整体不跑偏，改起来快、风险小。",
    aiPrompt:
      "请在现有版本基础上做微调：只调整我指出的细节（如这个间距、那个颜色、这句措辞），不要改动其他已满意的部分。",
  },
  {
    id: "ai-refactor",
    nameZh: "重构",
    nameEn: "Refactor",
    category: "ai-prompt",
    meaning:
      "像把乱线团重新理成整齐线束，功能不变但内部更干净。重构是改代码结构、提升可读性，不改对外行为。",
    effect: "你表面看不出变，但代码更好懂好改，以后加功能少踩坑。",
    aiPrompt:
      "请帮我重构这段代码：保持功能完全不变，只优化结构和命名、消除重复、拆分过长函数，让它更易读易维护，并说明你改了哪些地方、为什么。",
  },
  {
    id: "ai-polish",
    nameZh: "美化",
    nameEn: "Polish",
    category: "ai-prompt",
    meaning:
      "像妆前妆后的差别，功能齐了再打磨观感。美化是让界面更精致：间距、配色、动效、字体一起调顺。",
    effect: "你拿到手从「能用」变「想用」，细节到位了质感立刻不同。",
    aiPrompt:
      "功能已经能用，请帮我校验并美化界面：统一间距圆角、优化配色对比、加上克制的悬停和过渡动效、检查字体层级，整体打磨到精致。",
  },
  {
    id: "ai-align",
    nameZh: "对齐",
    nameEn: "Align",
    category: "ai-prompt",
    meaning:
      "像把一列字用尺子怼齐，让元素左缘、中线或右缘落在同一条线上。对齐是最基础的秩序感来源。",
    effect: "你看着整页「对得上」，不歪不斜，专业感就来自这条看不见的线。",
    aiPrompt:
      "请检查并统一页面的对齐：相关元素的左边缘或中线对齐到同一条线，图文基线一致，消除肉眼可见的错位。",
  },
  {
    id: "ai-consistent",
    nameZh: "统一风格",
    nameEn: "Consistent Style",
    category: "ai-prompt",
    meaning:
      "像一套制服，谁穿都一个样。统一风格是让全站按钮、卡片、配色、语气保持一致，不各唱各调。",
    effect: "你翻不同页面像同一个团队出品，信任感和专业度都上来了。",
    aiPrompt:
      "请让新增的页面和已有部分风格一致：复用同一套按钮、卡片、圆角、配色变量和文案语气，不要引入新的视觉样式，保持全站统一。",
  },
  {
    id: "ai-reuse",
    nameZh: "复用",
    nameEn: "Reuse",
    category: "ai-prompt",
    meaning:
      "像乐高同款块多处用，不每次现捏。复用是尽量调用已有组件和函数，而非到处重写同样的代码。",
    effect: "你改一处样式全站跟着变，省事还不易出错，维护成本直线降。",
    aiPrompt:
      "请尽量复用项目里已有的组件和工具函数，不要重复造轮子；如果已有组件差一点，优先在其上扩展而不是新写一个。",
  },
  {
    id: "ai-extract-component",
    nameZh: "抽离组件",
    nameEn: "Extract Component",
    category: "ai-prompt",
    meaning:
      "像把反复出现的那段菜单独做成预制菜，以后直接端。抽离组件是把重复或独立的 UI 块拆成可复用的小零件。",
    effect: "你页面里出现多次的卡片/按钮只改一处就全更新，结构清爽、好维护。",
    aiPrompt:
      "请帮我把页面里重复出现的这段 UI 抽离成一个独立组件：接收必要的参数（如标题、图片），在多处复用，并放到合适的组件目录里。",
  },
  {
    id: "ai-mock",
    nameZh: "数据模拟",
    nameEn: "Mock Data",
    category: "ai-prompt",
    meaning:
      "像拍戏用的道具钞，长得像真的但不流通。数据模拟是造一批假数据喂界面，让你没接真后台也能看效果。",
    effect: "你界面早早在真实数据到位前就能跑能看，前后端可以并行，不被等接口卡住。",
    aiPrompt:
      "请给我造一批逼真的模拟数据（如 10 条商品、几条评论），字段和真实结构一致，让我先在没有后端的情况下把界面和交互跑通，后续直接替换成真接口。",
  },
  {
    id: "ai-hardcoded",
    nameZh: "硬编码",
    nameEn: "Hardcoded",
    category: "ai-prompt",
    meaning:
      "像把价格直接写死在招牌上，改了得重做招牌。硬编码是把本该可配置的值直接写进代码，不灵活还易错。",
    effect: "你看着能跑，但换个环境或改个值就得动代码，维护起来处处是雷。",
    aiPrompt:
      "请避免硬编码：把会变的值（如接口地址、文案、配置）提取到变量、配置文件或环境变量里，不要直接写死在业务逻辑中，并告诉我哪些该抽出来。",
  },
  {
    id: "ai-placeholder-term",
    nameZh: "占位符",
    nameEn: "Placeholder",
    category: "ai-prompt",
    meaning:
      "在和 AI 沟通时，「占位符」指先放个临时标记占着坑，等你给真值再填。它和布局里的「加载占位」、内容里的「示意图占位」是同一思路的不同场景。",
    effect: "你让 AI 先把结构搭好、用 [你的项目名] 这种标记占着，方案成型后你逐个替换，沟通高效不卡壳。",
    aiPrompt:
      "请用占位符先把结构和示例搭好：凡是我还没定的具体值（如项目名、颜色、链接），用方括号占位（如 [你的项目名]）并列出待我确认的项，我填完即可直接用。",
    related: [
      { href: "/glossary#layout-placeholder", label: "参见：瀑布加载占位" },
      { href: "/glossary#content-placeholder-img", label: "参见：示意图" },
    ],
  },
  {
    id: "ai-comment",
    nameZh: "注释",
    nameEn: "Comment",
    category: "ai-prompt",
    meaning:
      "像在代码旁写的便利贴，解释「这段干嘛、为啥这么写」。注释是给人（包括未来的你）看的解读，机器不看。",
    effect: "你或别人日后回来读代码不抓瞎，复杂的弯弯绕有人一句话点破。",
    aiPrompt:
      "请在代码关键处加简洁注释：解释这段代码的目的和 tricky 的原因，而不是复述代码本身；复杂的业务逻辑尤其要写明背景，别写废话注释。",
  },
  {
    id: "ai-naming",
    nameZh: "命名规范",
    nameEn: "Naming Convention",
    category: "ai-prompt",
    meaning:
      "像给仓库货物统一编号规则，见了名就知道装啥。命名规范是约定变量、函数、文件的叫法，让代码自带说明。",
    effect: "你读代码像读说明书，名字本身就讲清用途，少翻上下文。",
    aiPrompt:
      "请遵守一致的命名规范：变量用清晰有意义的英文、布尔加 is/has 前缀、组件用大驼峰、函数用动宾结构，全项目统一，不要中英文混用或缩写难懂。",
  },
  {
    id: "ai-best-practice",
    nameZh: "最佳实践",
    nameEn: "Best Practice",
    category: "ai-prompt",
    meaning:
      "像行业里被反复验证「这么干最稳」的套路。最佳实践是当前公认更安全、更可维护的写法，不是死规矩但有道理。",
    effect: "你跟着最佳实践走，少踩已知的大坑，代码质量和可维护性有底线。",
    aiPrompt:
      "请按前端/后端的最佳实践来写：使用约定俗成的目录结构、处理错误和边界、注意安全和性能常识，并在关键处简要说明为什么这是推荐做法。",
  },
  {
    id: "ai-fallback",
    nameZh: "兜底方案",
    nameEn: "Fallback",
    category: "ai-prompt",
    meaning:
      "像电梯停电时的楼梯，主路断了还有条保底路。兜底方案是主功能失败或不可用时，退而求其次仍能跑的通路。",
    effect: "你遇到图片挂了、接口挂了、老浏览器不支持时，页面不至于崩，而是优雅降级。",
    aiPrompt:
      "请给我的功能加兜底方案：图片加载失败显示占位图、接口出错返回缓存或友好提示、不支持的特性退回到基础实现，确保任何环节出问题用户都不至于看到白屏。",
  },

  // ===== 性能优化 performance =====
  {
    id: "perf-first-screen",
    nameZh: "首屏加载",
    nameEn: "First Screen Load",
    category: "performance",
    meaning:
      "像餐厅上第一道菜要等多久，用户打开页面到能看见内容的那段时间。首屏加载快慢决定用户是留下还是关掉。",
    effect: "你点开几秒内就看到东西，体验顺；等太久直接走人，流失就在这几秒。",
    aiPrompt:
      "请优化我的首屏加载：关键内容优先渲染、非必要脚本延后、用骨架屏占位，目标让首屏在 2 秒内可见，并告诉我具体拖慢的点。",
  },
  {
    id: "perf-white-screen",
    nameZh: "白屏",
    nameEn: "White Screen",
    category: "performance",
    meaning:
      "像打开门一片空白啥也没有，页面卡在加载或报错没渲出来。白屏是最糟的体验——用户以为坏了。",
    effect: "你面对一片白不知是网慢还是挂了，耐心几秒就关，转化率直接归零。",
    aiPrompt:
      "请排查并避免白屏：确保 JS 报错时有兜底渲染、关键 CSS 内联、加载失败给提示而非空白，并加骨架屏让等待时有内容可看。",
  },
  {
    id: "perf-lag",
    nameZh: "卡顿",
    nameEn: "Lag / Jank",
    category: "performance",
    meaning:
      "像视频卡带，点一下半天才有反应。卡顿是交互或滚动时不跟手，主线程被繁重任务占住。",
    effect: "你操作起来涩、点完等，明明功能在却像机器老了，好感掉得快。",
    aiPrompt:
      "请帮我消除页面卡顿：把繁重计算移出主线程或分批执行，避免长列表一次性渲染、减少不必要的重排重绘，让滚动和点击都跟手。",
  },
  {
    id: "perf-frame-drop",
    nameZh: "掉帧",
    nameEn: "Frame Drop",
    category: "performance",
    meaning:
      "像翻书被抽掉几页，动画本该连贯却一顿一顿。掉帧是每秒帧数没跟上（理想 60/120fps），动画显出不连贯。",
    effect: "你看动画别扭、滑页发涩，明明在动却不舒服，像低帧率录像。",
    aiPrompt:
      "请优化动画的帧率：用 transform/opacity 做动画（走 GPU），避免触发布局重排，复杂动画加 will-change，确保滚动和过渡稳定接近 60fps 不抖。",
  },
  {
    id: "perf-memory-leak",
    nameZh: "内存泄漏",
    nameEn: "Memory Leak",
    category: "performance",
    meaning:
      "像水池只进不出，用掉的内存不还回去，越用越撑。内存泄漏是对象用完没释放，页面越跑越慢直至崩。",
    effect: "你长时间开着页面越来越卡、最后可能白屏，尤其单页应用容易中招。",
    aiPrompt:
      "请帮我校验并修复内存泄漏：检查定时器、事件监听和订阅有没有在组件卸载时清理，避免闭包持有大对象，并说明哪些地方有泄漏风险。",
  },
  {
    id: "perf-bundle",
    nameZh: "包体积",
    nameEn: "Bundle Size",
    category: "performance",
    meaning:
      "像快递包裹多重，文件越大下载越慢、解析越久。包体积是打出来的 JS/CSS 总大小，直接拖累加载。",
    effect: "你下的包小，打开就快；包臃肿，首屏就被拖慢，尤其手机弱网下明显。",
    aiPrompt:
      "请帮我校验并瘦身包体积：移除未用的依赖和代码、按需引入组件库、拆分代码让首屏只加载必要部分，并给出体积报告和优化建议。",
  },
  {
    id: "perf-compression",
    nameZh: "压缩",
    nameEn: "Compression",
    category: "performance",
    meaning:
      "像把厚被子抽真空变扁，传输时小、到了再还原。压缩是服务器把文件压小再发给浏览器，省带宽提速。",
    effect: "你下载的 JS/CSS 体积小了好多，页面加载更快，尤其弱网受益大。",
    aiPrompt:
      "请开启资源压缩：服务器对 JS/CSS/HTML 启用 Gzip 或 Brotli 压缩，并在构建时压缩静态资源，减小传输体积加快加载。",
  },
  {
    id: "perf-image-compress",
    nameZh: "图片压缩",
    nameEn: "Image Compression",
    category: "performance",
    meaning:
      "像把高清照存成合适大小，看着差不多却小很多。图片压缩在不明显掉画质前提下降体积，是提速大头。",
    effect: "你看到图照样清晰，但加载快了一大截，流量也省，移动端格外明显。",
    aiPrompt:
      "请压缩站里的图片：在不明显损失画质的前提下大幅减小体积，统一导出尺寸适配显示区域，并配合延迟加载，别让大图拖慢页面。",
  },
  {
    id: "perf-webp",
    nameZh: "WebP 格式",
    nameEn: "WebP Format",
    category: "performance",
    meaning:
      "像同画质下更轻的新包装，WebP 是谷歌推的现代图片格式，比老 JPEG/PNG 小一大截还支持透明。",
    effect: "你用同款图却省下不少流量和加载时间，页面更轻快。",
    aiPrompt:
      "请把站点图片优先转成 WebP 格式（重要透明图可用 AVIF），体积比 JPEG/PNG 小很多；同时保留兼容格式兜底，老旧浏览器也能显示。",
  },
  {
    id: "perf-icon-font",
    nameZh: "字体图标",
    nameEn: "Icon Font",
    category: "performance",
    meaning:
      "把图标塞进一个字体文件里，一次下载就能用一堆图，省下逐个请求图片的开销。它是「用字体承载图标」的取舍方案。",
    effect: "你少发很多图标请求、加载更省，但清晰度和灵活性不如 SVG，新项目多已弃用。",
    aiPrompt:
      "如果要用字体图标请控制数量并整体引入，避免为几个图标下载整套；新项目我更推荐用 SVG 图标组件，体积小且清晰可着色。",
    related: [{ href: "/glossary#content-icon-font", label: "参见：图标字体（内容侧）" }],
  },
  {
    id: "perf-lazy",
    nameZh: "延迟加载",
    nameEn: "Lazy Load",
    category: "performance",
    meaning:
      "像只把眼前货架补满、后面的等顾客走近再上。延迟加载是图片或代码等到快用到了才加载，不一次性全搬。",
    effect: "你首屏更快、流量更省，滚到哪才加载哪，长页面尤其明显。",
    aiPrompt:
      "请给图片和次要模块加延迟加载：图片进入视口附近才加载（用原生 loading=lazy 或 IntersectionObserver），非首屏的代码拆分后按需加载。",
  },

  // ===== 安全与合规 security =====
  {
    id: "sec-xss",
    nameZh: "跨站脚本攻击",
    nameEn: "XSS",
    category: "security",
    meaning:
      "像坏人在公告栏贴带病毒的纸条，别人一看就中招。XSS 是攻击者把恶意脚本塞进你的页面，访客打开时代码在他浏览器里执行。",
    effect: "你或用户可能被盗号、被跳转钓鱼页；网站信誉和人身安全都受损。",
    aiPrompt:
      "请帮我校验并防范 XSS：所有用户输入在显示前做转义，不用危险的方式拼接 HTML，如果用富文本请用可信的消毒库，并解释你做了哪些防护。",
  },
  {
    id: "sec-csrf",
    nameZh: "跨站请求伪造",
    nameEn: "CSRF",
    category: "security",
    meaning:
      "像有人拿着你的门禁卡趁你不在刷门，以你的身份干了你没同意的事。CSRF 是诱导你浏览器向已登录的站点发伪请求。",
    effect: "你啥也没点，账号却被人用你的登录态干了转账、改密等坏事。",
    aiPrompt:
      "请帮我校验并防范 CSRF：对关键写操作加同源校验（如 SameSite Cookie、CSRF Token），确保请求真是用户在本站主动发起的。",
  },
  {
    id: "sec-anti-crawl",
    nameZh: "防爬虫",
    nameEn: "Anti-crawling",
    category: "security",
    meaning:
      "像给展品加玻璃罩，挡住批量复制的手。防爬虫是识别并限制自动程序疯狂抓取你的内容或刷接口。",
    effect: "你的服务器不被爬死、原创内容不被白嫖，正常用户访问不受影响。",
    aiPrompt:
      "请给公开接口和内容加防爬虫策略：识别异常高频请求、对敏感接口加验证或限流，但别误伤正常用户和搜索引擎，平衡保护与可用。",
  },
  {
    id: "sec-masking",
    nameZh: "数据脱敏",
    nameEn: "Data Masking",
    category: "security",
    meaning:
      "像把身份证中间几位涂黑，只露头尾证明是它。数据脱敏是把敏感信息藏起大部分，既能核对又不泄露全貌。",
    effect: "你查看订单、后台时看到的是「138****8000」这类，隐私不裸奔，合规也过关。",
    aiPrompt:
      "请对展示的敏感信息做脱敏：手机号、邮箱、身份证等只显示首尾几位、中间用星号遮住，日志和界面都不要明文暴露完整隐私数据。",
  },
  {
    id: "sec-privacy",
    nameZh: "隐私政策",
    nameEn: "Privacy Policy",
    category: "security",
    meaning:
      "像进门告示写明「我们收你什么、拿来干啥、怎么保管」。隐私政策是站方向用户交代数据处理的正式说明，也是法律要求。",
    effect: "你清楚自己的数据去哪了、是否被卖，信任感来自这份透明；站点也免于违规。",
    aiPrompt:
      "请帮我起草一份隐私政策页面：用大白话说明收集哪些信息、用途、存储时长、用户权利（查看/删除），并链接到注册和收集处，措辞清晰不玩文字游戏。",
  },
  {
    id: "sec-tos",
    nameZh: "用户协议",
    nameEn: "Terms of Service",
    category: "security",
    meaning:
      "像入场须知，写清「你能用、不能用的边界」。用户协议是约定平台与用户各自权利义务的规则书。",
    effect: "你注册时知道红线在哪、出了事按啥规矩办，平台也少纠纷。",
    aiPrompt:
      "请帮我起草用户协议：说明服务范围、用户行为规范（禁违法/滥用）、账号责任和免责条款，语言尽量直白，并在注册时让用户勾选同意。",
  },
  {
    id: "sec-icp",
    nameZh: "备案",
    nameEn: "ICP Filing",
    category: "security",
    meaning:
      "像在国内开门营业要先登记牌照。备案（ICP）是中国大陆要求网站在工信部登记域名和主办者信息，未备不得上线访问。",
    effect: "你网站合法露出，不会被运营商掐断访问；用户也更敢信这是个正经站。",
    aiPrompt:
      "如果我的网站要面向中国大陆用户，请提醒我完成 ICP 备案：在服务器所在地管局登记域名和主体信息，备案通过后再正式对外提供访问，并在页脚展示备案号。",
  },
  {
    id: "sec-debounce",
    nameZh: "防抖动",
    nameEn: "Debounce",
    category: "security",
    meaning:
      "像等人说完话再回，而不是对方每喘口气你就插一句。防抖动是把频繁触发的事件（如输入、滚动）合并，只在停歇后执行一次。",
    effect: "你边打字边搜不会每秒发十次请求，界面不抖、服务器不累、体验顺。",
    aiPrompt:
      "请给高频触发的事件加防抖动（debounce）：如搜索输入停止 300 毫秒后才发请求、窗口缩放结束才重算布局，避免短时间重复执行拖慢页面。",
  },
  {
    id: "sec-dup-submit",
    nameZh: "防重复提交",
    nameEn: "Duplicate Submission Prevention",
    category: "security",
    meaning:
      "像按了一次门铃就先禁用按钮，防止手抖连按把同一单下两遍。防重复提交确保一次操作只生效一次。",
    effect: "你手快连点也不会生成两笔订单、发两条评论，数据和钱包都安全。",
    aiPrompt:
      "请防止表单重复提交：点击提交后立即禁用按钮并显示加载中，用唯一标识或后端幂等避免同一次请求被处理两遍，网络慢时也不会重复生效。",
  },
];
