# 电商平台商品列表页开发文档

项目名称：ecommerce-demo  
技术栈：React + Vite + Ant Design + Redux Toolkit  
作者：舒英杰

---

## 一、项目概述

本项目实现了电商平台的核心功能模块，包括商品展示、筛选、排序、搜索、分页、详情页与购物车系统。所有页面功能均基于 React 和 Ant Design 开发，状态管理采用 Redux Toolkit，实现数据集中管理与可扩展性设计。

Mock.js 用于构造模拟后端数据，实现伪接口与异步数据加载的真实体验。

---

## 二、技术栈

- **React 18**
- **Vite**（构建工具）
- **Ant Design 6**（组件库）
- **Redux Toolkit + React Redux**（全局状态管理）
- **React Router DOM 7**（路由）
- **Mock.js**（模拟商品数据接口）

---

## 三、项目结构

项目的源代码位于 `src` 目录下，其结构如下：

```
src/
├─ api/
│ └─ mock.js # Mock.js 生成商品数据 & 提供“伪接口”
├─ assets/ # 静态图片（banner、图标等）
├─ components/
│ ├─ common/
│ │ ├─ FilterBar.jsx # 筛选 & 排序组件
│ │ └─ PaginationBar.jsx # 分页组件
│ ├─ layout/
│ │ └─ Navbar.jsx # 顶部导航栏（含搜索）
│ └─ product/
│ ├─ ProductCard.jsx # 单个商品卡片
│ ├─ CartDrawer.jsx # 购物车抽屉
│ └─ SpecSelector.jsx # 商品规格选择组件
├─ pages/
│ ├─ ProductListPage.jsx # 商品列表页
│ └─ ProductDetailPage.jsx # 商品详情页
├─ store/
│ ├─ productsSlice.js # 商品列表、筛选、排序、分页
│ ├─ cartSlice.js # 购物车数据
│ └─ index.js # store 配置
├─ styles/
│ └─ global.css
├─ App.jsx # 路由配置 & 全局布局
└─ main.jsx # React 入口文件
```

## 四、 核心功能

### 商品列表页 (`ProductListPage`)

- **功能**: 展示所有商品，并提供筛选和分页功能。
- **实现**:
  - 从 Redux store 中获取商品数据和筛选条件。
  - 使用 `ProductCard` 组件循环渲染商品列表。
  - `FilterBar` 组件提供按价格、分类等筛选功能。
  - `PaginationBar` 组件提供分页功能。

### 商品详情页 (`ProductDetailPage`)

- **功能**: 展示单个商品的详细信息。
- **实现**:
  - 从路由参数中获取商品 `id`。
  - 根据 `id` 从 Redux store 中查找并展示商品详情。
  - 提供将商品加入购物车的入口。

### 购物车 (`CartDrawer`)

- **功能**: 以抽屉形式展示已添加到购物车的商品列表。
- **实现**:
  - 全局组件，通过 Redux store 管理购物车状态。
  - 可以增、删、改购物车中的商品数量。

## 五、 状态管理 (Redux)

应用的状态通过 Redux 进行统一管理，主要包含两个 slice：

- **`productsSlice`**:
  - `products`: 存储从 API 获取的原始商品列表。
  - `filtered`: 存储根据筛选条件过滤后的商品列表。
  - `status`: 数据加载状态 (`idle`, `loading`, `failed`)。
  - `currentPage`, `pageSize`: 用于分页。
- **`cartSlice`**:
  - `items`: 存储购物车中的商品列表，每个商品包含 `id`, `name`, `price`, `quantity` 等信息。

## 六、 路由

应用使用 `react-router-dom` 进行路由管理，主要路由如下：

- `/`: 商品列表页 (`ProductListPage`)
- `/product/:id`: 商品详情页 (`ProductDetailPage`)

## 七、 组件

### 核心组件

- **`ProductCard`**: 商品卡片，用于在列表页展示商品基本信息。
- **`FilterBar`**: 筛选条，提供多种维度的商品筛选功能。
- **`PaginationBar`**: 分页组件。
- **`Navbar`**: 顶部导航栏。
- **`CartDrawer`**: 购物车抽屉。

## 八、 API (Mock)

项目当前使用 `Mock.js` 在 `src/api/mock.js` 文件中生成模拟数据，用于开发和演示。

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
