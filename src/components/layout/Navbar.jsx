import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Space, Input } from "antd";
import { setCartOpen } from "../../store/cartSlice";
import { setSearchKeyword } from "../../store/productsSlice";

const { Search } = Input;

function Navbar() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "64px",
      }}
    >
      {/* 左侧 标题/Logo 区域（用文字代替具体平台名） */}
      <div
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          marginRight: 40,
        }}
      >
        电商平台 Demo
      </div>

      {/* 中间搜索框 */}
      <div style={{ flex: 1, maxWidth: 600 }}>
        <Search
          placeholder="搜索商品名称"
          enterButton="搜索"
          size="middle"
          onSearch={(value) => dispatch(setSearchKeyword(value))}
          allowClear
        />
      </div>

      {/* 右侧购物车入口 */}
      <div style={{ marginLeft: 32 }}>
        <Space>
          <Badge count={totalCount} showZero>
            <div
              onClick={() => dispatch(setCartOpen(true))}
              style={{
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ShoppingCartOutlined style={{ fontSize: 22 }} />
              <span>我的购物车</span>
            </div>
          </Badge>
        </Space>
      </div>
    </div>
  );
}

export default Navbar;
