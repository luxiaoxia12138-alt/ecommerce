// src/components/product/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, setCartOpen } from "../../store/cartSlice";
import { Card, Button, Rate, message } from "antd";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        specs: {},
        quantity: 1,
      })
    );
    dispatch(setCartOpen(true));

    // 轻提示：操作反馈
    message.success({
      content: "已加入购物车",
      duration: 1.2,
    });
  };

  const handleGoDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      hoverable
      className="brand-card"
      styles={{ body: { padding: 12 } }}
      cover={
        <div
          style={{
            padding: 8,
            background: "#fff",
          }}
          onClick={handleGoDetail}
        >
          <img
            alt={product.name}
            src={product.thumbnail}
            loading="lazy" // 懒加载图片
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderRadius: 4,
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>
      }
      onClick={handleGoDetail}
    >
      <div className="product-name">{product.name}</div>

      <div style={{ margin: "8px 0" }}>
        <span className="brand-price">￥{product.price}</span>
      </div>

      <div style={{ marginBottom: 4 }}>
        <Rate
          allowHalf
          disabled
          value={product.rating || 0}
          style={{ fontSize: 14 }}
        />
        <span style={{ fontSize: 12, marginLeft: 4 }}>
          {product.rating?.toFixed(1) || "0.0"} 分
        </span>
      </div>

      <div className="product-sales">销量：{product.sales}</div>

      <Button
        type="primary"
        size="small"
        shape="round"
        style={{ marginTop: 8, width: "100%" }}
        onClick={(e) => {
          e.stopPropagation();
          handleAddCart();
        }}
      >
        加入购物车
      </Button>
    </Card>
  );
}

// 避免列表刷新时不必要的重复渲染
export default React.memo(ProductCard);
