# 电商平台商品列表页开发文档

项目名称：ecommerce-demo  
技术栈：React + Vite + Ant Design + Redux Toolkit  
作者：舒英杰

---

## 一、项目概述

本项目实现了电商平台的核心功能模块，包括商品展示、筛选、排序、搜索、无限下拉、详情页与购物车系统。所有页面功能均基于 React 和 Ant Design 开发，状态管理采用 Redux Toolkit，实现数据集中管理与可扩展性设计。

通过 Mock.js 构造模拟后端数据，提供伪接口与异步加载体验。  
商品列表页经过性能与用户体验优化，支持图片懒加载、无限下拉加载、吸顶筛选条、回到顶部按钮等功能。

---

## 二、技术栈

- **React 18**
- **Vite**（极速开发 & 构建工具）
- **Ant Design 6**（UI 组件库）
- **Redux Toolkit + React Redux**（全局状态管理）
- **React Router DOM 7**（路由管理）
- **Mock.js**（模拟商品接口）
- **IntersectionObserver**（实现无限滚动加载）

---

## 三、项目结构

项目源代码位于 `src` 目录下，其结构如下：

```
src/
├─ api/
│ └─ mock.js # Mock.js 用于生成商品数据 & 提供伪接口
│
├─ assets/ # 静态资源（banner 图片等）
│
├─ components/
│ ├─ common/
│ │ └─ FilterBar.jsx # 筛选、排序、搜索组件
│ │
│ ├─ layout/
│ │ └─ Navbar.jsx # 顶部导航栏
│ │
│ └─ product/
│ ├─ ProductCard.jsx # 单个商品卡片（含懒加载图片）
│ ├─ CartDrawer.jsx # 购物车抽屉
│ └─ SpecSelector.jsx # 商品规格选择（用于详情页）
│
├─ pages/
│ ├─ ProductListPage.jsx # 商品列表页（轮播图 + 筛选条 + 无限下拉）
│ └─ ProductDetailPage.jsx# 商品详情页
│
├─ store/
│ ├─ productsSlice.js # 商品列表筛选、排序、搜索逻辑
│ ├─ cartSlice.js # 购物车数据管理
│ └─ index.js # Redux store 配置
│
├─ styles/
│ └─ global.css # 全局样式
│
├─ App.jsx # 路由配置 + 全局布局
└─ main.jsx # React 入口文件
```

> 注：传统分页组件 PaginationBar 已弃用，改为无限下拉。

---

## 四、核心功能说明

### 1. 商品列表页（ProductListPage）

**功能：**

- 展示所有商品
- 分类筛选、价格筛选
- 搜索功能（输入商品名称）
- 排序（默认 / 价格升序 / 降序 / 销量 / 评分）
- 无限下拉加载更多商品
- 图片懒加载
- 回到顶部按钮 (`BackTop`)
- 顶部吸顶筛选条

**实现思路：**

- Redux 提供筛选好的 `filtered` 列表
- 页面本地状态 `visibleCount` 决定显示多少条商品
- 通过 `IntersectionObserver` 监听底部元素触发加载更多
- 商品图片使用 `<img loading="lazy">` 提升性能
- 使用 AntD `Row + Col` 布局网格

---

### 2. 商品详情页（ProductDetailPage）

**功能：**

- 展示商品详细信息（名称、价格、图片、销量、评分等）
- 提供规格选择（SpecSelector）
- 加入购物车

**实现：**

- 通过路由参数获取商品 ID
- 从 Redux store 中查找对应商品
- 点击“加入购物车”触发 `addToCart` 并打开购物车抽屉

---

### 3. 购物车模块（CartDrawer）

**功能：**

- 抽屉形式展示购物车商品
- 修改数量 / 删除商品
- 自动统计总价
- 加入购物车后有轻提示（message.success）

---

## 五、状态管理（Redux）

### 1. `productsSlice.js`

负责：

- 加载商品（通过 Mock API）
- 分类筛选
- 价格区间筛选
- 搜索关键词过滤
- 排序（价格 / 销量 / 评分）
- 维护 `all` 和 `filtered` 两份数据

> 不再管理分页逻辑，分页与加载更多由页面负责。

### 2. `cartSlice.js`

负责：

- 购物车商品列表 `items`
- 添加、删除、修改数量
- 控制购物车抽屉开关
- 计算购物车总价（在 selector 或组件中完成）

---

## 六、路由结构

主要路由：

- `/` → 商品列表页 ProductListPage
- `/product/:id` → 商品详情页 ProductDetailPage

在 App.jsx 中统一配置。

---

## 七、核心组件

### `ProductCard`

- 商品图片（懒加载）
- 悬浮变大动画
- 名称 / 价格 / 销量 / 评分
- “加入购物车”按钮（含 message.success 提示）

### `FilterBar`

提供：

- 搜索框（名称搜索）
- 分类选择
- 价格区间（Slider）
- 排序选项
- 重置筛选按钮

被放置在 sticky 容器中，滚动时保持在顶部。

### `CartDrawer`

- 显示购物车商品
- 数量编辑
- 删除商品
- 结算提示

---

## 八、Mock API

位于 `src/api/mock.js`：

- 使用 Mock.js 生成随机商品数据
- 提供 `fetchProducts()` 作为模拟 API
- Redux 在 `loadProducts` 中调用此 API

---

## 九、运行与构建

### 安装依赖

```bash
npm install

```

### 开发环境

```bash
npm run dev
```

### 打包构建

```bash
npm run build
npm run preview
```
