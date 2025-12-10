// src/components/common/FilterBar.jsx
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Select, Slider, Input, Button, Space } from "antd";
import {
  setCategory,
  setPriceRange,
  setSortBy,
  setSearchKeyword,
  resetFilters,
} from "../../store/productsSlice";

const { Option } = Select;
const { Search } = Input;

function FilterBar() {
  const dispatch = useDispatch();
  const { priceRange, category, sortBy, searchKeyword } = useSelector(
    (state) => state.products
  );

  const handleCategoryChange = useCallback(
    (value) => {
      dispatch(setCategory(value));
    },
    [dispatch]
  );

  const handlePriceChange = useCallback(
    (value) => {
      dispatch(setPriceRange(value));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (value) => {
      dispatch(setSortBy(value));
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    (value) => {
      dispatch(setSearchKeyword(value));
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <div
      style={{
        padding: "16px 20px",
        margin: "0 auto 16px",
        maxWidth: 1200,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        {/* 搜索框 */}
        <Col xs={24} md={8}>
          <span className="filter-label" style={{ marginRight: 8 }}>
            搜索：
          </span>
          <Search
            allowClear
            placeholder="搜索商品名称"
            defaultValue={searchKeyword}
            onSearch={handleSearch} // 回车/点击按钮时触发
            onChange={(e) => {
              if (e.target.value === "") {
                handleSearch("");
              }
            }}
            style={{ width: "70%" }}
            size="middle"
          />
        </Col>

        {/* 分类 */}
        <Col xs={24} md={6}>
          <span className="filter-label" style={{ marginRight: 8 }}>
            分类：
          </span>
          <Select
            value={category}
            style={{ width: "70%" }}
            onChange={handleCategoryChange}
            size="middle"
          >
            <Option value="all">全部</Option>
            <Option value="手机">手机</Option>
            <Option value="电脑">电脑</Option>
            <Option value="家电">家电</Option>
            <Option value="服饰">服饰</Option>
            <Option value="美妆">美妆</Option>
          </Select>
        </Col>

        {/* 排序 */}
        <Col xs={24} md={6}>
          <span className="filter-label" style={{ marginRight: 8 }}>
            排序：
          </span>
          <Select
            value={sortBy}
            style={{ width: "70%" }}
            onChange={handleSortChange}
            size="middle"
          >
            <Option value="default">默认</Option>
            <Option value="priceAsc">价格从低到高</Option>
            <Option value="priceDesc">价格从高到低</Option>
            <Option value="sales">销量优先</Option>
            <Option value="rating">评分优先</Option>
          </Select>
        </Col>

        {/* 重置按钮 */}
        <Col xs={24} md={4} style={{ textAlign: "right" }}>
          <Button onClick={handleReset}>重置筛选</Button>
        </Col>
      </Row>

      {/* 价格区间 */}
      <Row gutter={[16, 8]} align="middle" style={{ marginTop: 16 }}>
        <Col xs={24} md={18}>
          <span className="filter-label" style={{ marginRight: 8 }}>
            价格区间：
          </span>
          <Slider
            range
            min={0}
            max={20000}
            value={priceRange}
            onChange={handlePriceChange}
          />
        </Col>
        <Col xs={24} md={6} style={{ textAlign: "right" }}>
          <Space size={4}>
            <span style={{ fontSize: 12, color: "#999" }}>当前：</span>
            <span style={{ fontWeight: 500, color: "#333" }}>
              ￥{priceRange[0]} - ￥{priceRange[1]}
            </span>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(FilterBar);
