import React, { useMemo } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import ProductCard from "./ProductCard";

// 简单的窗口大小 Hook
function useWindowSize() {
  const [size, setSize] = React.useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  React.useEffect(() => {
    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}

/**
 * 虚拟网格列表
 * @param {Array} products 商品数组
 */
const ProductVirtualGrid = ({ products }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  // 计算网格宽度（居中显示，最大 1200）
  const gridWidth = useMemo(() => {
    const max = 1200;
    const padding = 40 * 2; // 两侧 padding
    return Math.min(windowWidth - padding, max);
  }, [windowWidth]);

  // 计算网格高度：大概扣掉顶部 banner / 筛选条 / 其它
  const gridHeight = useMemo(() => {
    const offset = 320 + 80; // 轮播图 + 筛选条区域大概高度
    return Math.max(windowHeight - offset, 400); // 至少给 400 高度
  }, [windowHeight]);

  // 根据宽度动态决定一行几个卡片（大致对齐你原来的 xs/sm/md/lg）
  const columnCount = useMemo(() => {
    if (gridWidth < 480) return 2; // 手机
    if (gridWidth < 768) return 3; // 小平板
    if (gridWidth < 992) return 4; // 平板 / 小屏
    return 6; // 大屏
  }, [gridWidth]);

  const rowCount = Math.ceil(products.length / columnCount);

  // 单元格宽高
  const columnWidth = gridWidth / columnCount;
  const rowHeight = 280; // 每行高度（卡片高度 + 间距），可视情况微调

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    const product = products[index];
    if (!product) return null;

    return (
      <div style={{ ...style, padding: 8 }}>
        <ProductCard product={product} />
      </div>
    );
  };

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: gridWidth,
      }}
    >
      <Grid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={gridHeight}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={gridWidth}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default ProductVirtualGrid;
