import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Select, Slider } from "antd";
import {
  setCategory,
  setPriceRange,
  setSortBy,
} from "../../store/productsSlice";

const { Option } = Select;

function FilterBar() {
  const dispatch = useDispatch();
  const { priceRange, category, sortBy } = useSelector(
    (state) => state.products
  );

  return (
    <div
      style={{
        padding: "16px",
        marginBottom: "16px",
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <Row gutter={[16, 16]}>
        {/* 分类 */}
        <Col xs={24} md={8}>
          <span className="filter-label">分类：</span>
          <Select
            value={category}
            style={{ width: "70%" }}
            onChange={(value) => dispatch(setCategory(value))}
          >
            <Option value="all">全部</Option>
            <Option value="手机">手机</Option>
            <Option value="电脑">电脑</Option>
            <Option value="家电">家电</Option>
            <Option value="服饰">服饰</Option>
            <Option value="美妆">美妆</Option>
          </Select>
        </Col>

        {/* 价格区间 */}
        <Col xs={24} md={8}>
          <span className="filter-label">价格区间：</span>
          <Slider
            range
            min={0}
            max={20000}
            value={priceRange}
            onChange={(value) => dispatch(setPriceRange(value))}
          />
        </Col>

        {/* 排序 */}
        <Col xs={24} md={8}>
          <span className="filter-label">排序：</span>
          <Select
            value={sortBy}
            style={{ width: "70%" }}
            onChange={(value) => dispatch(setSortBy(value))}
          >
            <Option value="default">默认</Option>
            <Option value="priceAsc">价格从低到高</Option>
            <Option value="priceDesc">价格从高到低</Option>
            <Option value="sales">销量优先</Option>
            <Option value="rating">评分优先</Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
}

export default FilterBar;
