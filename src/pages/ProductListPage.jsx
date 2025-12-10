// src/pages/ProductListPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spin, Empty, Carousel, BackTop } from "antd";

import FilterBar from "../components/common/FilterBar";
import ProductCard from "../components/product/ProductCard";
import { loadProducts } from "../store/productsSlice";

// 广告轮播图
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

function ProductListPage() {
  const dispatch = useDispatch();
  const loaderRef = useRef(null);

  const { filtered, status, error } = useSelector((state) => state.products);

  const [visibleCount, setVisibleCount] = useState(12); // 一次展示多少商品
  const pageSize = 12;

  const banners = [banner1, banner2, banner3];

  const hasMore = visibleCount < filtered.length;
  const visibleProducts = filtered.slice(0, visibleCount);

  // 首次加载商品数据
  useEffect(() => {
    if (status === "idle") {
      dispatch(loadProducts());
    }
  }, [status, dispatch]);

  // 当筛选条件变化导致 filtered 变化时，重置可见数量
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [filtered, pageSize]);

  // IntersectionObserver：监听底部占位元素，实现无限下拉
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const target = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && status !== "loading") {
          setVisibleCount((prev) => prev + pageSize);
        }
      },
      {
        root: null,
        rootMargin: "200px", // 提前 200px 触发加载
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasMore, status, pageSize]);

  // 加载失败
  if (status === "failed") {
    return <div>加载失败：{error}</div>;
  }

  // 首屏加载中
  if (status === "loading" && filtered.length === 0) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div>
      {/* 顶部广告轮播 */}
      <div
        style={{
          margin: "0 auto 20px",
          maxWidth: 1200,
          padding: "0 40px",
        }}
      >
        <Carousel autoplay dots>
          {banners.map((src, index) => (
            <div key={index}>
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  width: "100%",
                  height: 300,
                }}
              >
                <img
                  src={src}
                  alt={`banner-${index + 1}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 吸顶筛选条 */}
      <div
        style={{
          position: "sticky",
          top: 64, // 如果有 Navbar，高度按实际调整；如果没有，可以改成 0
          zIndex: 100,
          background: "rgba(245,245,245,0.9)",
          backdropFilter: "blur(4px)",
        }}
      >
        <FilterBar />
      </div>

      {/* 结果统计 */}
      <div
        style={{
          margin: "0 auto 12px",
          maxWidth: 1200,
          padding: "0 20px",
          fontSize: 14,
          color: "#666",
        }}
      >
        共 {filtered.length} 件商品
      </div>

      {filtered.length === 0 ? (
        <Empty description="暂无商品" />
      ) : (
        <div
          style={{
            margin: "0 auto",
            maxWidth: 1200,
            padding: "0 20px 40px",
          }}
        >
          <Row gutter={[16, 16]}>
            {visibleProducts.map((product) => (
              <Col key={product.id} xs={12} sm={8} md={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* 底部占位元素：用于触发 IntersectionObserver */}
          <div ref={loaderRef} style={{ height: 1 }} />

          {/* 加载更多时，在底部提示加载中 */}
          {status === "loading" && visibleProducts.length > 0 && (
            <div style={{ textAlign: "center", padding: 16 }}>
              <Spin />
            </div>
          )}

          {/* 没有更多数据的提示 */}
          {!hasMore && filtered.length > 0 && (
            <div style={{ textAlign: "center", padding: 16, color: "#999" }}>
              已经到底啦～
            </div>
          )}
        </div>
      )}

      {/* 回到顶部按钮 */}
      <BackTop visibilityHeight={400} />
    </div>
  );
}

export default ProductListPage;
