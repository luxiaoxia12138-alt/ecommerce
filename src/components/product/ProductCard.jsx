import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, setCartOpen } from "../../store/cartSlice";
import { Card, Button, Rate } from "antd";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price, // 这里用的是列表显示价格
        specs: {}, // 列表页暂不选择规格
        quantity: 1,
      })
    );
    dispatch(setCartOpen(true));
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
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            alt={product.name}
            src={product.thumbnail}
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
      onClick={() => navigate(`/product/${product.id}`)}
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

export default ProductCard;
