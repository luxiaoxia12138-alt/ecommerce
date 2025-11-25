import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  Typography,
  Button,
  InputNumber,
  Card,
  Spin,
  Carousel,
  Rate,
} from "antd";

import { fetchProductById } from "../api/mock";
import SpecSelector from "../components/product/SpecSelector";
import { addToCart, setCartOpen } from "../store/cartSlice";

const { Title, Paragraph } = Typography;

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSpecs, setSelectedSpecs] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  // 计算当前已选规格下的价格
  const calcPrice = () => {
    if (!product) return 0;

    // 默认从 basePrice 开始（如果没有就退回列表价）
    let finalPrice = product.basePrice ?? product.price;

    if (product.priceRules && selectedSpecs) {
      Object.entries(selectedSpecs).forEach(([specName, optionValue]) => {
        const add = product.priceRules[specName]?.[optionValue] ?? 0;
        finalPrice += add;
      });
    }

    return finalPrice;
  };

  const handleAddCart = () => {
    // 简单校验：所有规格选择完整
    if (product.specs && product.specs.length > 0) {
      const unselected = product.specs.some((s) => !selectedSpecs[s.name]);
      if (unselected) {
        alert("请先选择所有规格");
        return;
      }
    }

    const finalPrice = calcPrice();

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        // 购物车里存当前配置的价格
        price: finalPrice,
        specs: selectedSpecs,
        quantity,
      })
    );
    dispatch(setCartOpen(true));
  };

  if (loading || !product) {
    return <Spin />;
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "24px auto",
      }}
    >
      <Card
        style={{
          borderRadius: 12,
        }}
      >
        <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
          返回
        </Button>

        <Row gutter={[24, 24]}>
          {/* 左侧图片区域 */}
          <Col xs={24} md={10}>
            <Carousel autoplay dots style={{ marginBottom: 16 }}>
              {images.map((img, index) => (
                <div key={index}>
                  <Image
                    src={img}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: 360,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>

          {/* 右侧商品信息 */}
          <Col xs={24} md={14}>
            <Title level={3}>{product.name}</Title>

            {/* 评分 */}
            <div style={{ marginBottom: 8 }}>
              <Rate allowHalf disabled value={product.rating || 0} />
              <span style={{ marginLeft: 8, color: "#999" }}>
                {product.rating?.toFixed(1) || "0.0"} 分
              </span>
            </div>

            {/* 价格 */}
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#e1251b",
                marginBottom: 8,
              }}
            >
              ￥{calcPrice()}
            </div>

            <div style={{ marginBottom: 8 }}>销量：{product.sales}</div>

            <Paragraph>{product.description}</Paragraph>

            {product.specs && product.specs.length > 0 && (
              <SpecSelector
                specs={product.specs}
                selectedSpecs={selectedSpecs}
                onChange={setSelectedSpecs}
              />
            )}

            <div style={{ margin: "16px 0" }}>
              数量：
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
              />
            </div>

            <Button type="primary" size="large" onClick={handleAddCart}>
              加入购物车
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default ProductDetailPage;
