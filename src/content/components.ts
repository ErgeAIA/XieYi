// 自动迁移自 tools/vibe-coding-guide.html
import type { ComponentItem, ComponentCategory } from "./types";

export type { ComponentItem, ComponentCategory } from "./types";

export const components: ComponentItem[] = [
  {
    "cat": "layout",
    "nameZh": "卡片",
    "nameEn": "Card",
    "desc": "通用容器，聚合标题、正文、操作等关联内容。",
    "usage": "产品卡、用户资料、统计概览。卡内内容要有内在关联，不要硬凑。",
    "example": "<div class='demo-label'>卡片示例</div>\n<div class='card' style='max-width:320px'>\n  <div class='card-title'>项目概览</div>\n  <div class='card-text'>已完成 24 个任务，剩余 6 个进行中，本周进度 78%。点击查看详情。</div>\n</div>"
  },
  {
    "cat": "layout",
    "nameZh": "分隔线",
    "nameEn": "Separator",
    "desc": "水平或垂直的内容分隔线。",
    "usage": "在长表单、菜单、区块之间划清边界，避免视觉拥挤。",
    "example": ""
  },
  {
    "cat": "layout",
    "nameZh": "手风琴",
    "nameEn": "Accordion",
    "desc": "可折叠的内容区，同组同时只展开一项。",
    "usage": "FAQ、设置分组、长文档目录，节省纵向空间。",
    "example": ""
  },
  {
    "cat": "layout",
    "nameZh": "折叠",
    "nameEn": "Collapsible",
    "desc": "单项内容的展开与收起。",
    "usage": "高级选项、展开更多等单块内容的显隐。",
    "example": ""
  },
  {
    "cat": "layout",
    "nameZh": "标签页",
    "nameEn": "Tabs",
    "desc": "水平标签栏，点击切换同区内容面板。",
    "usage": "设置分类、数据视图、文档章节切换；标签建议不超过 7 个。",
    "example": "<div class='demo-label'>标签页示例</div>\n<div class='tabs'>\n  <button class='tab active' onclick='switchTab(this, \"tab1\")'>通用设置</button>\n  <button class='tab' onclick='switchTab(this, \"tab2\")'>通知</button>\n  <button class='tab' onclick='switchTab(this, \"tab3\")'>安全</button>\n  <button class='tab' onclick='switchTab(this, \"tab4\")'>关于</button>\n</div>\n<div id='tab1' class='tab-panel active' style='padding:16px;background:var(--bg-elevated);border-radius:var(--radius-sm)'><p>在这里调整语言、时区和默认页面等通用选项。</p></div>\n<div id='tab2' class='tab-panel' style='padding:16px;background:var(--bg-elevated);border-radius:var(--radius-sm)'><p>选择需要接收的通知类型，例如邮件、推送和站内信。</p></div>\n<div id='tab3' class='tab-panel' style='padding:16px;background:var(--bg-elevated);border-radius:var(--radius-sm)'><p>修改密码、开启两步验证、管理登录设备。</p></div>\n<div id='tab4' class='tab-panel' style='padding:16px;background:var(--bg-elevated);border-radius:var(--radius-sm)'><p>版本 1.0.0，由 Vibe Coding 参考团队维护。</p></div>"
  },
  {
    "cat": "layout",
    "nameZh": "宽高比",
    "nameEn": "Aspect Ratio",
    "desc": "锁定固定宽高比的媒体容器。",
    "usage": "视频、图片、嵌入 iframe 保持比例不被拉伸。",
    "example": ""
  },
  {
    "cat": "layout",
    "nameZh": "可拖拽面板",
    "nameEn": "Resizable",
    "desc": "可拖动改变尺寸的分栏面板。",
    "usage": "编辑器 + 预览、文件树 + 内容等需要自由分配空间的布局。",
    "example": ""
  },
  {
    "cat": "layout",
    "nameZh": "滚动区",
    "nameEn": "Scroll Area",
    "desc": "带自定义滚动条的局部滚动容器。",
    "usage": "侧边栏、长列表，隐藏原生滚动条保持界面整洁。",
    "example": ""
  },
  {
    "cat": "layout",
    "nameZh": "侧边栏",
    "nameEn": "Sidebar",
    "desc": "页面左侧的常驻导航与功能区域。",
    "usage": "后台管理、文档站、IDE 的主导航骨架。",
    "example": ""
  },
  {
    "cat": "layout",
    "nameZh": "文本方向",
    "nameEn": "Direction",
    "desc": "控制文本与布局的书写方向（LTR/RTL）。",
    "usage": "国际化右向语言（阿拉伯语、希伯来语）时整体翻转布局。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "按钮",
    "nameEn": "Button",
    "desc": "触发操作的核心元素，变体 × 尺寸 × 状态组合。",
    "usage": "表单提交、删除确认、跳转、次要操作；危险操作用红色，正向用主色，一页最多一个高强调按钮。",
    "example": "<div class='demo-label'>层级示例</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>Brand</span><button class='btn btn-brand'>生成方案</button></div>\n  <div class='demo-col'><span class='demo-col-label'>Primary</span><button class='btn btn-primary'>保存更改</button></div>\n  <div class='demo-col'><span class='demo-col-label'>Secondary</span><button class='btn btn-secondary'>取消</button></div>\n  <div class='demo-col'><span class='demo-col-label'>Ghost</span><button class='btn btn-ghost'>跳过</button></div>\n</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>Danger</span><button class='btn btn-danger'>删除</button></div>\n  <div class='demo-col'><span class='demo-col-label'>Danger Subtle</span><button class='btn btn-ghost' style='color:var(--error)'>断开连接</button></div>\n</div>\n<div class='demo-label' style='margin-top:24px'>尺寸与状态</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>Small</span><button class='btn btn-primary btn-sm'>小按钮</button></div>\n  <div class='demo-col'><span class='demo-col-label'>Default</span><button class='btn btn-primary'>默认</button></div>\n  <div class='demo-col'><span class='demo-col-label'>Large</span><button class='btn btn-primary btn-lg'>大按钮</button></div>\n</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>Normal</span><button class='btn btn-primary'>正常</button></div>\n  <div class='demo-col'><span class='demo-col-label'>Disabled</span><button class='btn btn-primary' disabled>禁用</button></div>\n</div>"
  },
  {
    "cat": "form",
    "nameZh": "按钮组",
    "nameEn": "Button Group",
    "desc": "将多个相关按钮成组，共享边框与间距。",
    "usage": "工具栏、分页前后翻、格式化按钮群，视觉上归为一类。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "输入框",
    "nameEn": "Input",
    "desc": "接收单行文本输入，支持默认/聚焦/错误/禁用等状态。",
    "usage": "搜索框、表单字段、密码框；错误状态要配文字说明，不只变红。",
    "example": "<div class='demo-label'>状态示例</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>Default</span><input type='text' class='input' placeholder='请输入内容...'></div>\n  <div class='demo-col'><span class='demo-col-label'>Focused</span><input type='text' class='input' value='已聚焦'></div>\n</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>With Hint</span><input type='text' class='input' placeholder='your@email.com'><span class='input-hint'>用于接收通知的邮箱地址</span></div>\n  <div class='demo-col'><span class='demo-col-label'>Error</span><input type='text' class='input input-error' value='invalid-email'><span class='input-hint error'>邮箱格式不正确，请检查</span></div>\n</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>Disabled</span><input type='text' class='input' value='不可编辑' disabled></div>\n  <div class='demo-col'><span class='demo-col-label'>Password</span><input type='password' class='input' value='secret123'></div>\n</div>"
  },
  {
    "cat": "form",
    "nameZh": "输入组",
    "nameEn": "Input Group",
    "desc": "输入框与前后缀（图标、按钮）组合成整体。",
    "usage": "带搜索图标、单位后缀、发送按钮的复合输入框。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "验证码",
    "nameEn": "Input OTP",
    "desc": "逐位输入的验证码输入框。",
    "usage": "短信/邮箱验证码、两步验证的 6 位一次性密码。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "多行文本",
    "nameEn": "Textarea",
    "desc": "接收多行文本输入的可拉伸区域。",
    "usage": "评论、反馈、长描述；配合字数统计与校验提示。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "标签",
    "nameEn": "Label",
    "desc": "表单控件的文字说明，绑定到对应输入。",
    "usage": "每个输入都应有关联 label，提升可访问性与点击命中区。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "字段容器",
    "nameEn": "Field",
    "desc": "把 label、输入、提示、错误聚合成一个字段单元。",
    "usage": "表单中统一字段间距与状态样式，减少重复布局。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "复选框",
    "nameEn": "Checkbox",
    "desc": "多选框，从一组选项中选零个或多个。",
    "usage": "同意条款、筛选条件、批量操作；选项相互独立。",
    "example": "<div class='demo-label'>多选示例</div>\n<div class='demo-row' style='flex-direction:column;align-items:flex-start'>\n  <label class='checkable'><input type='checkbox' checked> 启用通知推送</label>\n  <label class='checkable'><input type='checkbox'> 订阅每周摘要</label>\n  <label class='checkable'><input type='checkbox' checked> 自动保存草稿</label>\n  <label class='checkable'><input type='checkbox' disabled> 高级功能（需升级）</label>\n</div>"
  },
  {
    "cat": "form",
    "nameZh": "单选组",
    "nameEn": "Radio Group",
    "desc": "单选框组，从互斥选项中选一个。",
    "usage": "支付方式、主题切换；选中一个自动取消其他。",
    "example": "<div class='demo-label'>单选示例</div>\n<div class='demo-row' style='flex-direction:column;align-items:flex-start'>\n  <label class='checkable'><input type='radio' name='theme' checked> 深色主题</label>\n  <label class='checkable'><input type='radio' name='theme'> 浅色主题</label>\n  <label class='checkable'><input type='radio' name='theme'> 跟随系统</label>\n</div>"
  },
  {
    "cat": "form",
    "nameZh": "开关",
    "nameEn": "Switch",
    "desc": "滑动开关，表示开/关两种即时状态。",
    "usage": "深色模式、自动保存、通知；改变立即生效，无需保存。",
    "example": "<div class='demo-label'>开关示例</div>\n<div class='demo-row' style='flex-direction:column;align-items:flex-start;gap:16px'>\n  <label class='switch'><input type='checkbox' checked><span class='switch-track'></span>深色模式</label>\n  <label class='switch'><input type='checkbox'><span class='switch-track'></span>自动保存</label>\n  <label class='switch'><input type='checkbox' checked disabled><span class='switch-track'></span>系统通知（不可更改）</label>\n</div>"
  },
  {
    "cat": "form",
    "nameZh": "下拉选择",
    "nameEn": "Select",
    "desc": "点击展开选项列表的单项选择器。",
    "usage": "国家地区、语言、排序；选项 >5 个优先用 Select 省空间。",
    "example": "<div class='demo-label'>基础示例</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>Default</span>\n    <select class='select'>\n      <option>请选择语言</option>\n      <option selected>简体中文</option>\n      <option>English</option>\n      <option>日本語</option>\n    </select>\n  </div>\n  <div class='demo-col'><span class='demo-col-label'>With Groups</span>\n    <select class='select'>\n      <optgroup label='前端'><option>React</option><option>Vue</option><option>Svelte</option></optgroup>\n      <optgroup label='后端'><option>Node.js</option><option>Python</option><option>Go</option></optgroup>\n    </select>\n  </div>\n</div>"
  },
  {
    "cat": "form",
    "nameZh": "原生下拉",
    "nameEn": "Native Select",
    "desc": "浏览器原生 select，零依赖。",
    "usage": "对样式要求低、需最大兼容性的简单表单。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "组合框",
    "nameEn": "Combobox",
    "desc": "输入框 + 可搜索下拉，可输入可选择。",
    "usage": "城市选择、成员 @ 提及等大数据集的模糊检索。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "滑块",
    "nameEn": "Slider",
    "desc": "拖动选择连续数值的控件。",
    "usage": "音量、价格区间、透明度等连续参数调节。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "切换按钮",
    "nameEn": "Toggle",
    "desc": "带按下态的开关式按钮，用于状态切换。",
    "usage": "加粗/斜体、收藏、关注等工具栏瞬时状态。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "切换组",
    "nameEn": "Toggle Group",
    "desc": "一组互斥或独立的切换按钮。",
    "usage": "文本对齐、视图切换（网格/列表）等成组状态。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "日历",
    "nameEn": "Calendar",
    "desc": "月视图日期网格，可选中与范围。",
    "usage": "预约、排期、日程的可视化选择基底。",
    "example": ""
  },
  {
    "cat": "form",
    "nameZh": "日期选择",
    "nameEn": "Date Picker",
    "desc": "点击弹出日历面板选择日期/范围。",
    "usage": "时间筛选、排期、生日；常配今天/本周快捷项。",
    "example": "<div class='demo-row'>\n  <div style='position:relative' class='dp-wrap' id='dp-demo'>\n    <input type='text' class='input' value='2026-09-01' onclick='toggleCalendar(this)' readonly style='cursor:pointer'>\n    <div class='dp-calendar' style='display:none'>\n      <div class='dp-cal-header'>\n        <button class='dp-nav' onclick='calNav(this, -1)'>‹</button>\n        <span style='font-size:13px;font-weight:600'>2026 年 9 月</span>\n        <button class='dp-nav' onclick='calNav(this, 1)'>›</button>\n      </div>\n      <div class='dp-week'>\n        <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>\n      </div>\n      <div class='dp-grid'>\n        <span>31</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>\n        <span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>\n        <span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span>\n        <span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span>\n        <span>28</span><span>29</span><span class='dp-today'>30</span><span class='dp-selected'>1</span><span>2</span><span>3</span><span>4</span>\n      </div>\n      <div class='dp-footer'>\n        <button class='btn btn-ghost btn-sm'>今天</button>\n        <button class='btn btn-ghost btn-sm'>本周</button>\n        <button class='btn btn-ghost btn-sm'>本月</button>\n      </div>\n    </div>\n  </div>\n  <div style='display:flex;align-items:center;gap:8px'>\n    <input type='text' class='input' value='2026-08-25' style='width:130px'>\n    <span style='color:var(--text-tertiary)'>至</span>\n    <input type='text' class='input' value='2026-09-01' style='width:130px'>\n  </div>\n</div>"
  },
  {
    "cat": "form",
    "nameZh": "问卷",
    "nameEn": "Questionnaire",
    "desc": "结构化多题型表单，分步收集答案。",
    "usage": "调研、入职登记、需求采集等成组提问。",
    "example": ""
  },
  {
    "cat": "navigation",
    "nameZh": "面包屑",
    "nameEn": "Breadcrumb",
    "desc": "显示当前页在层级中的位置，可点返回上级。",
    "usage": "多级页面导航，超过 3 层时建议显示，告诉用户「在哪、怎么回」。",
    "example": "<div class='demo-label'>面包屑示例</div>\n<div class='breadcrumb'>\n  <a href='#' onclick='return false'>Home</a>\n  <span class='sep'>/</span>\n  <a href='#' onclick='return false'>Settings</a>\n  <span class='sep'>/</span>\n  <a href='#' onclick='return false'>Account</a>\n  <span class='sep'>/</span>\n  <span class='current'>Security</span>\n</div>"
  },
  {
    "cat": "navigation",
    "nameZh": "菜单栏",
    "nameEn": "Menubar",
    "desc": "顶部横向菜单，含下拉子菜单。",
    "usage": "桌面应用的文件/编辑/视图等传统菜单结构。",
    "example": ""
  },
  {
    "cat": "navigation",
    "nameZh": "分页",
    "nameEn": "Pagination",
    "desc": "数据过多时分页展示，控制每页条数。",
    "usage": "表格、搜索结果、文章列表；常用 10/20/50 条每页。",
    "example": "<div class='demo-label'>分页示例</div>\n<div class='pagination'>\n  <button class='page-btn' disabled>&lt;</button>\n  <button class='page-btn active'>1</button>\n  <button class='page-btn'>2</button>\n  <button class='page-btn'>3</button>\n  <span style='color:var(--text-tertiary);padding:5px'>...</span>\n  <button class='page-btn'>10</button>\n  <button class='page-btn'>&gt;</button>\n</div>"
  },
  {
    "cat": "navigation",
    "nameZh": "下拉菜单",
    "nameEn": "Dropdown Menu",
    "desc": "点击按钮弹出的操作菜单，支持分组/危险项/分隔线。",
    "usage": "更多操作、导出等一组相关动作，点外部关闭。",
    "example": "<div class='demo-label'>点击触发</div>\n<div class='demo-row'>\n  <div style='position:relative' class='dd-wrap' id='dd-demo'>\n    <button class='btn btn-secondary' onclick='toggleDropdown(\"dd-demo\")'>更多操作 ▾</button>\n    <div class='dd-menu' style='display:none'>\n      <div class='dd-item' onclick='dropdownAction(this, \"编辑\")'>✏️ 编辑</div>\n      <div class='dd-item' onclick='dropdownAction(this, \"复制链接\")'>🔗 复制链接</div>\n      <div class='dd-item' onclick='dropdownAction(this, \"重命名\")'>📝 重命名</div>\n      <div class='dd-sep'></div>\n      <div class='dd-item danger' onclick='dropdownAction(this, \"删除\")'>🗑 删除</div>\n    </div>\n  </div>\n  <div class='dd-wrap' id='dd-demo2'>\n    <button class='btn btn-secondary' onclick='toggleDropdown(\"dd-demo2\")'>导出 ▾</button>\n    <div class='dd-menu' style='display:none'>\n      <div class='dd-label'>格式</div>\n      <div class='dd-item' onclick='dropdownAction(this, \"CSV\")'>CSV 文件</div>\n      <div class='dd-item' onclick='dropdownAction(this, \"JSON\")'>JSON 文件</div>\n      <div class='dd-item' onclick='dropdownAction(this, \"Markdown\")'>Markdown</div>\n      <div class='dd-sep'></div>\n      <div class='dd-item' onclick='dropdownAction(this, \"分享导出\")'>🔗 生成分享链接</div>\n    </div>\n  </div>\n</div>"
  },
  {
    "cat": "display",
    "nameZh": "头像",
    "nameEn": "Avatar",
    "desc": "圆形用户标识，支持文字占位与尺寸变体。",
    "usage": "用户列表、评论、导航栏；无图时显示名字首字母。",
    "example": "<div class='demo-label'>尺寸示例</div>\n<div class='demo-row'>\n  <div class='demo-col'><span class='demo-col-label'>Small</span><div class='avatar avatar-sm' style='background:var(--accent)'>AC</div></div>\n  <div class='demo-col'><span class='demo-col-label'>Medium</span><div class='avatar avatar-md' style='background:var(--success)'>MP</div></div>\n  <div class='demo-col'><span class='demo-col-label'>Large</span><div class='avatar avatar-lg' style='background:var(--warning)'>LW</div></div>\n</div>\n<div class='demo-label' style='margin-top:24px'>头像组</div>\n<div class='demo-row'>\n  <div class='avatar-group'>\n    <div class='avatar avatar-md' style='background:var(--accent)'>AC</div>\n    <div class='avatar avatar-md' style='background:var(--success)'>MP</div>\n    <div class='avatar avatar-md' style='background:var(--warning)'>LW</div>\n    <div class='avatar avatar-md' style='background:var(--error)'>NK</div>\n    <div class='avatar avatar-md' style='background:var(--bg-hover);color:var(--text-secondary)'>+3</div>\n  </div>\n</div>"
  },
  {
    "cat": "display",
    "nameZh": "徽章",
    "nameEn": "Badge",
    "desc": "小尺寸状态标签，圆角胶囊 + 状态点。",
    "usage": "订单状态、在线状态；绿=正常 黄=警告 红=故障。",
    "example": "<div class='demo-label'>状态示例</div>\n<div class='demo-row'>\n  <span class='badge badge-success'><span class='badge-dot'></span>运行中</span>\n  <span class='badge badge-warning'><span class='badge-dot'></span>待处理</span>\n  <span class='badge badge-error'><span class='badge-dot'></span>已停止</span>\n  <span class='badge badge-info'><span class='badge-dot'></span>处理中</span>\n</div>"
  },
  {
    "cat": "display",
    "nameZh": "数据表格",
    "nameEn": "Table",
    "desc": "二维数据展示，支持排序、多选、对齐、空态。",
    "usage": "后台数据管理；数字列右对齐，状态列用彩色徽章。",
    "example": "<table class='data-table'>\n  <thead>\n    <tr>\n      <th><input type='checkbox'></th>\n      <th onclick='sortTable(this)' style='cursor:pointer'>名称 <span class='sort-arrow'>↕</span></th>\n      <th onclick='sortTable(this)' style='cursor:pointer'>类型 <span class='sort-arrow'>↕</span></th>\n      <th style='text-align:right'>大小</th>\n      <th style='text-align:right'>修改时间</th>\n      <th>状态</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr><td><input type='checkbox'></td><td style='font-weight:500;color:var(--text-primary)'>README.md</td><td>Markdown</td><td style='text-align:right'>12.4 KB</td><td style='text-align:right'>08-25 10:32</td><td><span class='badge badge-success'><span class='badge-dot'></span>已同步</span></td></tr>\n    <tr><td><input type='checkbox'></td><td style='font-weight:500;color:var(--text-primary)'>SYSTEM.md</td><td>Markdown</td><td style='text-align:right'>18.2 KB</td><td style='text-align:right'>08-25 10:33</td><td><span class='badge badge-success'><span class='badge-dot'></span>已同步</span></td></tr>\n    <tr><td><input type='checkbox'></td><td style='font-weight:500;color:var(--text-primary)'>decision-card.schema.yaml</td><td>YAML</td><td style='text-align:right'>3.1 KB</td><td style='text-align:right'>08-18 14:00</td><td><span class='badge badge-warning'><span class='badge-dot'></span>有改动</span></td></tr>\n    <tr><td><input type='checkbox'></td><td style='font-weight:500;color:var(--text-primary)'>build-explorer.ps1</td><td>PowerShell</td><td style='text-align:right'>8.7 KB</td><td style='text-align:right'>08-24 09:15</td><td><span class='badge badge-success'><span class='badge-dot'></span>已同步</span></td></tr>\n    <tr><td><input type='checkbox'></td><td style='font-weight:500;color:var(--text-primary)'>check-distill.py</td><td>Python</td><td style='text-align:right'>22.5 KB</td><td style='text-align:right'>08-25 11:47</td><td><span class='badge badge-error'><span class='badge-dot'></span>未同步</span></td></tr>\n  </tbody>\n</table>"
  },
  {
    "cat": "display",
    "nameZh": "数据表",
    "nameEn": "DataTable",
    "desc": "带服务端排序/筛选/分页的高级表格。",
    "usage": "大数据量列表，需虚拟滚动与列配置的场景。",
    "example": ""
  },
  {
    "cat": "display",
    "nameZh": "空状态",
    "nameEn": "Empty",
    "desc": "无数据时的占位，含图标 + 说明 + 操作。",
    "usage": "空列表、搜索无结果、首次使用；别只写「暂无数据」。",
    "example": "<div class='empty-state'>\n  <div class='empty-icon'>inbox</div>\n  <div class='empty-title'>No messages yet</div>\n  <div class='empty-desc'>When you receive messages, they will appear here. Start a conversation to get going.</div>\n  <button class='btn btn-primary'>Start conversation</button>\n</div>"
  },
  {
    "cat": "display",
    "nameZh": "列表项",
    "nameEn": "Item",
    "desc": "通用列表行：图标 + 标题 + 副标题。",
    "usage": "文件列表、消息列表、设置项等统一行结构。",
    "example": ""
  },
  {
    "cat": "display",
    "nameZh": "标记",
    "nameEn": "Marker",
    "desc": "正文中的高亮标记，强调关键句。",
    "usage": "规则、警告、术语的视觉强调，引导注意力。",
    "example": ""
  },
  {
    "cat": "display",
    "nameZh": "键盘按键",
    "nameEn": "Kbd",
    "desc": "展示键盘快捷键的等宽小键帽。",
    "usage": "文档、提示中说明 ⌘K、Ctrl+S 等快捷键。",
    "example": ""
  },
  {
    "cat": "display",
    "nameZh": "排版",
    "nameEn": "Typography",
    "desc": "标题层级、正文、引用、行内代码规范。",
    "usage": "统一文档与界面的文字层级与可读性。",
    "example": ""
  },
  {
    "cat": "display",
    "nameZh": "统计",
    "nameEn": "Statistic",
    "desc": "大数字 + 标签 + 单位 + 涨跌指示。",
    "usage": "Dashboard 概览、看板的核心指标高亮。",
    "example": "<div class='demo-label'>统计卡片</div>\n<div class='stats-grid' style='padding:0;max-width:800px'>\n  <div class='stat-card'><div class='stat-label'>知识卡片总数</div><div class='stat-value'>121</div><div class='stat-change up'>+16 本周新增</div></div>\n  <div class='stat-card'><div class='stat-label'>决策卡</div><div class='stat-value'>92</div><div class='stat-change up'>+5 本周新增</div></div>\n  <div class='stat-card'><div class='stat-label'>调试卡</div><div class='stat-value'>12</div><div class='stat-change up'>+2 本周新增</div></div>\n  <div class='stat-card'><div class='stat-label'>反模式</div><div class='stat-value'>16</div><div class='stat-change down'>-1 已废弃</div></div>\n</div>\n<div class='demo-label' style='margin-top:20px'>单数字示例</div>\n<div class='demo-row'>\n  <div style='text-align:center'>\n    <div style='font-size:32px;font-weight:700;color:var(--accent)'>1,284<span style='font-size:16px;color:var(--text-secondary)'> 人</span></div>\n    <div style='font-size:12px;color:var(--text-tertiary);margin-top:2px'>今日活跃</div>\n  </div>\n  <div style='text-align:center;padding-left:24px;border-left:1px solid var(--border-subtle)'>\n    <div style='font-size:32px;font-weight:700;color:var(--success)'>98.2<span style='font-size:16px;color:var(--text-secondary)'>%</span></div>\n    <div style='font-size:12px;color:var(--text-tertiary);margin-top:2px'>系统可用性</div>\n  </div>\n  <div style='text-align:center;padding-left:24px;border-left:1px solid var(--border-subtle)'>\n    <div style='font-size:32px;font-weight:700;color:var(--warning)'>2.4<span style='font-size:16px;color:var(--text-secondary)'>s</span></div>\n    <div style='font-size:12px;color:var(--text-tertiary);margin-top:2px'>平均响应</div>\n  </div>\n</div>"
  },
  {
    "cat": "feedback",
    "nameZh": "提示条",
    "nameEn": "Alert",
    "desc": "页面级状态提示，分 Info/Success/Warning/Error。",
    "usage": "操作成功、表单错误、系统警告；Error 要告诉用户怎么解决。",
    "example": "<div class='demo-label'>Simple 布局</div>\n<div class='demo-row' style='flex-direction:column;align-items:stretch;gap:12px'>\n  <div class='alert alert-info'>\n    <svg class='alert-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='10'/><path d='M12 16v-4M12 8h.01'/></svg>\n    <div class='alert-content'>系统将于今晚 2:00 进行维护</div>\n    <button class='alert-close' onclick='this.parentElement.remove()'>x</button>\n  </div>\n  <div class='alert alert-success'>\n    <svg class='alert-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M22 11.08V12a10 10 0 11-5.93-9.14'/><path d='M22 4L12 14.01l-3-3'/></svg>\n    <div class='alert-content'>文件上传成功</div>\n    <button class='alert-close' onclick='this.parentElement.remove()'>x</button>\n  </div>\n  <div class='alert alert-warning'>\n    <svg class='alert-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'/><line x1='12' y1='9' x2='12' y2='13'/><line x1='12' y1='17' x2='12.01' y2='17'/></svg>\n    <div class='alert-content'>存储空间即将用完（85%）</div>\n    <button class='alert-close' onclick='this.parentElement.remove()'>x</button>\n  </div>\n  <div class='alert alert-error'>\n    <svg class='alert-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='10'/><line x1='15' y1='9' x2='9' y2='15'/><line x1='9' y1='9' x2='15' y2='15'/></svg>\n    <div class='alert-content'>保存失败，请检查网络连接后重试</div>\n    <button class='alert-close' onclick='this.parentElement.remove()'>x</button>\n  </div>\n</div>\n<div class='demo-label' style='margin-top:24px'>Complex 布局</div>\n<div class='demo-row' style='flex-direction:column;align-items:stretch;gap:12px'>\n  <div class='alert alert-error'>\n    <svg class='alert-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='10'/><line x1='15' y1='9' x2='9' y2='15'/><line x1='9' y1='9' x2='15' y2='15'/></svg>\n    <div class='alert-content'><div class='alert-title'>账户异常</div>检测到您的账户存在异常登录行为，部分功能已受限。请验证身份以恢复完整访问。</div>\n    <button class='alert-close' onclick='this.parentElement.remove()'>x</button>\n  </div>\n</div>"
  },
  {
    "cat": "feedback",
    "nameZh": "轻提示",
    "nameEn": "Toast",
    "desc": "右上角短暂弹出的操作反馈，自动消失。",
    "usage": "保存成功、操作失败、离线提示；比 Alert 轻，不打断流程。",
    "example": "<div class='demo-label'>点击按钮触发</div>\n<div class='demo-row'>\n  <button class='btn btn-secondary' onclick='showToast(\"success\", \"保存成功\", \"你的更改已保存到本地\")'>成功</button>\n  <button class='btn btn-secondary' onclick='showToast(\"info\", \"新版本可用\", \"发现 v1.2.0，点击查看更新日志\")'>信息</button>\n  <button class='btn btn-secondary' onclick='showToast(\"warning\", \"存储空间不足\", \"已使用 85%，请及时清理\")'>警告</button>\n  <button class='btn btn-danger' onclick='showToast(\"error\", \"网络请求失败\", \"请检查网络连接后重试\")'>错误</button>\n</div>\n<div class='demo-label' style='margin-top:24px'>静态示例</div>\n<div class='demo-row' style='flex-direction:column;align-items:stretch;gap:10px'>\n  <div class='toast toast-success'><span class='toast-icon'>✓</span><div class='toast-content'><div class='toast-title'>保存成功</div><div>你的更改已保存到本地</div></div><button class='toast-close' onclick='this.parentElement.remove()'>x</button></div>\n  <div class='toast toast-error'><span class='toast-icon'>✕</span><div class='toast-content'><div class='toast-title'>网络请求失败</div><div>请检查网络连接后重试</div></div><button class='toast-close' onclick='this.parentElement.remove()'>x</button></div>\n</div>"
  },
  {
    "cat": "feedback",
    "nameZh": "进度条",
    "nameEn": "Progress",
    "desc": "横向/环形进度，按百分比填充与变色。",
    "usage": "任务完成度、上传下载、配额使用展示。",
    "example": "<div class='demo-label'>横向进度</div>\n<div class='demo-row' style='flex-direction:column;align-items:stretch;gap:12px'>\n  <div class='progress-row'><div style='font-size:12px;color:var(--text-secondary);width:80px'>蒸馏进度</div><div class='progress-track'><div class='progress-bar' style='width:65%'>65%</div></div></div>\n  <div class='progress-row'><div style='font-size:12px;color:var(--text-secondary);width:80px'>上传文件</div><div class='progress-track'><div class='progress-bar success' style='width:100%'>100%</div></div></div>\n  <div class='progress-row'><div style='font-size:12px;color:var(--text-secondary);width:80px'>数据处理</div><div class='progress-track'><div class='progress-bar error' style='width:40%'>40%</div></div></div>\n  <div class='progress-row'><div style='font-size:12px;color:var(--text-secondary);width:80px'>存储空间</div><div class='progress-track'><div class='progress-bar warning' style='width:85%'>85%</div></div></div>\n</div>\n<div class='demo-label' style='margin-top:24px'>环形进度</div>\n<div class='demo-row'>\n  <div class='ring-wrap'><svg width='64' height='64' viewBox='0 0 64 64'><circle cx='32' cy='32' r='26' fill='none' stroke='var(--bg-hover)' stroke-width='6'/><circle cx='32' cy='32' r='26' fill='none' stroke='var(--accent)' stroke-width='6' stroke-dasharray='163.4' stroke-dashoffset='57.2' stroke-linecap='round' transform='rotate(-90 32 32)'/><text x='32' y='37' text-anchor='middle' font-size='14' fill='var(--text-primary)' font-weight='600'>65%</text></svg></div>\n  <div class='ring-wrap'><svg width='64' height='64' viewBox='0 0 64 64'><circle cx='32' cy='32' r='26' fill='none' stroke='var(--bg-hover)' stroke-width='6'/><circle cx='32' cy='32' r='26' fill='none' stroke='var(--success)' stroke-width='6' stroke-dasharray='163.4' stroke-dashoffset='0' stroke-linecap='round' transform='rotate(-90 32 32)'/><text x='32' y='37' text-anchor='middle' font-size='14' fill='var(--text-primary)' font-weight='600'>100%</text></svg></div>\n</div>"
  },
  {
    "cat": "feedback",
    "nameZh": "骨架屏",
    "nameEn": "Skeleton",
    "desc": "灰色脉冲占位，模拟内容结构。",
    "usage": "首屏加载、列表刷新；比转圈更友好，预判内容形状。",
    "example": "<div class='demo-row'>\n  <div class='card skeleton-card' style='width:280px'>\n    <div class='skeleton skeleton-title'></div>\n    <div class='skeleton skeleton-text' style='width:90%'></div>\n    <div class='skeleton skeleton-text' style='width:70%'></div>\n    <div class='skeleton skeleton-text' style='width:50%'></div>\n  </div>\n  <div style='display:flex;align-items:center;gap:12px'>\n    <div class='skeleton skeleton-avatar'></div>\n    <div style='width:150px'>\n      <div class='skeleton skeleton-text' style='width:80%'></div>\n      <div class='skeleton skeleton-text' style='width:60%'></div>\n    </div>\n  </div>\n</div>"
  },
  {
    "cat": "feedback",
    "nameZh": "加载圈",
    "nameEn": "Spinner",
    "desc": "轻量旋转加载指示器。",
    "usage": "按钮内、局部加载的轻量等待态。",
    "example": ""
  },
  {
    "cat": "overlay",
    "nameZh": "对话框",
    "nameEn": "Dialog",
    "desc": "居中模态浮层 + 遮罩，阻断当前操作。",
    "usage": "删除确认、重要设置、专注表单；少用，用多用户会习惯性关闭。",
    "example": "<button class='btn btn-danger' onclick='openModal()'>删除项目</button>"
  },
  {
    "cat": "overlay",
    "nameZh": "确认框",
    "nameEn": "AlertDialog",
    "desc": "危险操作的二次确认模态。",
    "usage": "删除、退出等不可逆操作前的强制确认。",
    "example": ""
  },
  {
    "cat": "overlay",
    "nameZh": "侧滑面板",
    "nameEn": "Sheet",
    "desc": "从侧边（右/左/下）滑出的面板。",
    "usage": "详情展示、轻量编辑，比 Dialog 更有方向感。",
    "example": ""
  },
  {
    "cat": "overlay",
    "nameZh": "抽屉",
    "nameEn": "Drawer",
    "desc": "从侧边滑出的面板，含头/内容/底部操作。",
    "usage": "设置、购物车、详情；方向感强于 Dialog。",
    "example": "<div class='demo-label'>点击打开</div>\n<div class='demo-row'>\n  <button class='btn btn-secondary' onclick='openDrawer()'>打开设置抽屉</button>\n</div>"
  },
  {
    "cat": "overlay",
    "nameZh": "气泡卡片",
    "nameEn": "Popover",
    "desc": "轻量浮层，承载富内容提示。",
    "usage": "尺寸信息、用户卡片等需比 Tooltip 更多内容的场景。",
    "example": ""
  },
  {
    "cat": "overlay",
    "nameZh": "提示气泡",
    "nameEn": "Tooltip",
    "desc": "悬停/聚焦触发的简短说明。",
    "usage": "解释图标含义、缩写、按钮功能；重要信息别只放 Tooltip（移动端无法悬停）。",
    "example": "<div class='demo-label'>悬停示例</div>\n<div class='demo-row'>\n  <div class='tooltip-wrap'>\n    <button class='btn btn-secondary'>保存</button>\n    <span class='tooltip'>快捷键 Ctrl+S</span>\n  </div>\n  <div class='tooltip-wrap'>\n    <button class='btn btn-secondary'>导出</button>\n    <span class='tooltip'>导出为 Markdown 文件</span>\n  </div>\n</div>"
  },
  {
    "cat": "overlay",
    "nameZh": "右键菜单",
    "nameEn": "Context Menu",
    "desc": "右键弹出的上下文操作菜单。",
    "usage": "列表项、画布的右键快捷操作。",
    "example": ""
  },
  {
    "cat": "overlay",
    "nameZh": "悬停卡片",
    "nameEn": "Hover Card",
    "desc": "悬停触发的内容预览卡。",
    "usage": "@提及、链接预览等无需点击的内容速览。",
    "example": ""
  },
  {
    "cat": "overlay",
    "nameZh": "命令面板",
    "nameEn": "Command",
    "desc": "⌘K 式命令搜索，输入即过滤。",
    "usage": "快速跳转、执行命令，替代复杂菜单。",
    "example": ""
  },
  {
    "cat": "overlay",
    "nameZh": "导航菜单",
    "nameEn": "Navigation Menu",
    "desc": "含子菜单浮层的复杂站点导航。",
    "usage": "产品/文档/资源等带下拉的内容型导航。",
    "example": ""
  },
  {
    "cat": "charts",
    "nameZh": "图表",
    "nameEn": "Chart",
    "desc": "柱状/折线/饼图等数据可视化封装。",
    "usage": "Dashboard、报表、分析页；向 AI 描述要说清类型、维度、配色。",
    "example": "<div class='demo-label'>柱状图占位</div>\n<div class='demo-row'>\n  <div class='chart-placeholder'>\n    <div class='chart-bar' style='height:40%'></div>\n    <div class='chart-bar' style='height:70%'></div>\n    <div class='chart-bar' style='height:55%'></div>\n    <div class='chart-bar' style='height:90%'></div>\n    <div class='chart-bar' style='height:65%'></div>\n    <div class='chart-bar' style='height:80%'></div>\n    <div class='chart-bar' style='height:45%'></div>\n    <span class='chart-label'>Bar Chart</span>\n  </div>\n  <div class='chart-placeholder'>\n    <div class='chart-bar' style='height:30%;background:var(--success)'></div>\n    <div class='chart-bar' style='height:60%;background:var(--success)'></div>\n    <div class='chart-bar' style='height:45%;background:var(--success)'></div>\n    <div class='chart-bar' style='height:85%;background:var(--success)'></div>\n    <div class='chart-bar' style='height:50%;background:var(--success)'></div>\n    <div class='chart-bar' style='height:75%;background:var(--success)'></div>\n    <span class='chart-label'>Line Chart</span>\n  </div>\n</div>"
  },
  {
    "cat": "chat",
    "nameZh": "附件",
    "nameEn": "Attachment",
    "desc": "对话中的文件附件卡片。",
    "usage": "聊天里发送/预览的文档、图片等。",
    "example": ""
  },
  {
    "cat": "chat",
    "nameZh": "对话气泡",
    "nameEn": "Bubble",
    "desc": "区分用户/助手的消息气泡容器。",
    "usage": "聊天界面单条消息的视觉封装。",
    "example": ""
  },
  {
    "cat": "chat",
    "nameZh": "消息",
    "nameEn": "Message",
    "desc": "头像 + 气泡 + 时间戳的组合消息。",
    "usage": "对话中一条完整消息的结构单元。",
    "example": ""
  },
  {
    "cat": "chat",
    "nameZh": "消息滚动区",
    "nameEn": "Message Scroller",
    "desc": "自动吸附最新的对话滚动容器。",
    "usage": "长对话列表，新消息自动滚到底部。",
    "example": ""
  },
  {
    "cat": "extra",
    "nameZh": "文件树",
    "nameEn": "File Tree",
    "desc": "可展开/折叠的层级树，展示文件与目录。",
    "usage": "IDE 侧栏、文件选择器、项目结构展示。",
    "example": "<div class='demo-label'>文件树示例</div>\n<div class='file-tree'>\n  <div class='tree-item' onclick='toggleTree(this)'><span class='tree-icon tree-toggle'>▼</span><span>src</span></div>\n  <div class='tree-children'>\n    <div class='tree-item' onclick='toggleTree(this)'><span class='tree-icon tree-toggle'>▼</span><span>components</span></div>\n    <div class='tree-children'>\n      <div class='tree-item active' onclick='selectTree(this)'><span class='tree-icon'>B</span><span>Button.tsx</span></div>\n      <div class='tree-item' onclick='selectTree(this)'><span class='tree-icon'>C</span><span>Button.module.css</span></div>\n    </div>\n    <div class='tree-item' onclick='toggleTree(this)'><span class='tree-icon tree-toggle'>▼</span><span>hooks</span></div>\n    <div class='tree-children'>\n      <div class='tree-item' onclick='selectTree(this)'><span class='tree-icon'>H</span><span>useAuth.ts</span></div>\n    </div>\n    <div class='tree-item' onclick='selectTree(this)'><span class='tree-icon'>P</span><span>package.json</span></div>\n  </div>\n</div>"
  },
  {
    "cat": "extra",
    "nameZh": "步骤条",
    "nameEn": "Steps",
    "desc": "引导按步骤完成复杂任务，显示进度。",
    "usage": "注册、下单、分步表单；让用户知道还有几步。",
    "example": "<div class='demo-label'>步骤条示例</div>\n<div class='steps'>\n  <div class='step completed'><span class='step-num'>1</span> Account</div>\n  <div class='step completed'><span class='step-num'>2</span> Profile</div>\n  <div class='step active'><span class='step-num'>3</span> Preferences</div>\n  <div class='step'><span class='step-num'>4</span> Review</div>\n</div>"
  },
  {
    "cat": "extra",
    "nameZh": "上传",
    "nameEn": "Upload",
    "desc": "拖拽 + 文件列表的上传组件。",
    "usage": "附件、头像、素材上传；含进度、预览、删除。",
    "example": "<div class='upload-dropzone' onmouseenter='dropHover(this, true)' onmouseleave='dropHover(this, false)' onclick='showToast(\"info\", \"已模拟选择文件\", \"真实上传需要后端接口支持\")'>\n  <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='var(--text-tertiary)' stroke-width='1.5'><path d='M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4'/><polyline points='17 8 12 3 7 8'/><line x1='12' y1='3' x2='12' y2='15'/></svg>\n  <div style='margin-top:8px;font-size:13px;color:var(--text-secondary)'>拖拽文件到此处，或 <span style='color:var(--accent);font-weight:500'>点击上传</span></div>\n  <div style='font-size:11px;color:var(--text-tertiary);margin-top:4px'>支持单个或多个文件，单个文件不超过 10MB</div>\n</div>\n<div class='demo-label' style='margin-top:20px'>已上传文件</div>\n<div style='display:flex;flex-direction:column;gap:8px'>\n  <div class='upload-file'>\n    <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='var(--accent)' stroke-width='2'><path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z'/><polyline points='14 2 14 8 20 8'/></svg>\n    <div style='flex:1'><div style='font-size:13px;font-weight:500'>design-system-v3.pdf</div><div style='font-size:11px;color:var(--text-tertiary)'>2.4 MB</div></div>\n    <span class='badge badge-success'><span class='badge-dot'></span>上传成功</span>\n    <button class='btn btn-ghost btn-sm' onclick='this.parentElement.remove()'>删除</button>\n  </div>\n  <div class='upload-file'>\n    <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='var(--accent)' stroke-width='2'><path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z'/><polyline points='14 2 14 8 20 8'/></svg>\n    <div style='flex:1'><div style='font-size:13px;font-weight:500'>icon-pack.zip</div><div style='font-size:11px;color:var(--text-tertiary)'>8.1 MB</div></div>\n    <span class='badge badge-warning'><span class='badge-dot'></span>上传中 68%</span>\n    <button class='btn btn-ghost btn-sm' onclick='this.parentElement.remove()'>取消</button>\n  </div>\n</div>"
  }
];

export const componentCategoryMeta: Record<ComponentCategory, string> = {
  "layout": "布局",
  "form": "表单",
  "navigation": "导航",
  "display": "数据展示",
  "feedback": "反馈",
  "overlay": "浮层",
  "charts": "图表",
  "chat": "对话",
  "extra": "扩展"
};

export const componentCategoryDesc: Record<ComponentCategory, string> = {
  "layout": "决定页面骨架和内容排布的基础组件：卡片、分隔线、侧边栏、标签页等。先搭好结构，再往里填东西。",
  "form": "收集用户输入的组件：按钮、输入框、下拉、开关等。凡是让用户「填东西、做选择」都归这一类。",
  "navigation": "帮用户在页面间或页面内移动的组件：菜单、面包屑、分页、步骤条。解决「怎么去到想去的地方」。",
  "display": "把数据清晰呈现出来的组件：表格、列表、徽章、头像、标签。核心是「看得清、不费脑」。",
  "feedback": "告诉用户「发生了什么」的组件：提示框、加载、进度条、空态。让操作有回应，减少不确定感。",
  "overlay": "临时盖在页面之上、不打断主流程的组件：弹窗、抽屉、下拉菜单、悬浮卡。用于次要或情境化操作。",
  "charts": "把数据画成图形的组件：折线、柱状、饼图等。适合需要一眼看出趋势和对比的场景。",
  "chat": "聊天气泡、输入区等对话界面组件。做 AI 助手、客服这类产品时直接套用。",
  "extra": "以上分类装不下的进阶组件：上传、日历、命令面板等。按需取用，不必全记。",
};

export const componentCategories: ComponentCategory[] = [
  "layout",
  "form",
  "navigation",
  "display",
  "feedback",
  "overlay",
  "charts",
  "chat",
  "extra",
];

export function componentsByCategory(cat: ComponentCategory): ComponentItem[] {
  return components.filter((c) => c.cat === cat);
}
