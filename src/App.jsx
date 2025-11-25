import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartDrawer from "./components/product/CartDrawer";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header
        className="brand-header"
        style={{ background: "#e1251b", paddingInline: 40 }}
      >
        <Navbar />
      </Header>
      <Content style={{ padding: "16px 40px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Content>
      <CartDrawer />
    </Layout>
  );
}

export default App;
