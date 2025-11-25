import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spin, Empty, Carousel } from "antd";
import FilterBar from "../components/common/FilterBar";
import ProductCard from "../components/product/ProductCard";
import PaginationBar from "../components/common/PaginationBar";
import { loadProducts, setCurrentPage } from "../store/productsSlice";

// 广告轮播图
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

function ProductListPage() {
  const dispatch = useDispatch();
  const { filtered, status, error, currentPage, pageSize } = useSelector(
    (state) => state.products
  );
  const banners = [banner1, banner2, banner3];

  // 首次加载时请求商品数据
  useEffect(() => {
    if (status === "idle") {
      dispatch(loadProducts());
    }
  }, [status, dispatch]);

  const start = (currentPage - 1) * pageSize;
  const currentPageData = filtered.slice(start, start + pageSize);

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed") {
    return <div>加载失败：{error}</div>;
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

      {/* 筛选条 */}
      <FilterBar />

      {/* 结果统计 */}
      <div
        style={{
          marginBottom: 12,
          fontSize: 14,
          color: "#666",
        }}
      >
        共 {filtered.length} 件商品
      </div>

      {filtered.length === 0 ? (
        <Empty description="暂无商品" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {currentPageData.map((product) => (
              <Col key={product.id} xs={12} sm={8} md={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          <PaginationBar
            currentPage={currentPage}
            pageSize={pageSize}
            total={filtered.length}
            onChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </div>
  );
}

export default ProductListPage;
