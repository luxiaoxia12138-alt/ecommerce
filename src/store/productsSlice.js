// src/store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../api/mock";

// 异步加载商品列表
export const loadProducts = createAsyncThunk("products/load", async () => {
  const data = await fetchProducts(); // 要求返回一个商品数组
  return data;
});

const initialState = {
  all: [], // 所有商品（原始数据）
  filtered: [], // 筛选之后的商品（用于列表渲染）

  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,

  // 筛选 / 排序 / 搜索条件
  category: "all",
  priceRange: [0, 20000],
  sortBy: "default", // 'default' | 'priceAsc' | 'priceDesc' | 'sales' | 'rating'
  searchKeyword: "", // 搜索关键字
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      applyFilterAndSort(state);
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
      applyFilterAndSort(state);
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      applyFilterAndSort(state);
    },
    setSearchKeyword(state, action) {
      state.searchKeyword = action.payload;
      applyFilterAndSort(state);
    },
    // 一键重置所有筛选
    resetFilters(state) {
      state.category = "all";
      state.priceRange = [0, 20000];
      state.sortBy = "default";
      state.searchKeyword = "";
      applyFilterAndSort(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.all = action.payload;
        // 初次加载数据时，根据当前筛选条件生成 filtered
        applyFilterAndSort(state);
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "加载商品失败";
      });
  },
});

// 内部使用的函数：根据条件筛选 + 排序
function applyFilterAndSort(state) {
  const { all, category, priceRange, sortBy, searchKeyword } = state;

  let result = [...all];

  // 分类筛选
  if (category !== "all") {
    result = result.filter((item) => item.category === category);
  }

  // 价格筛选
  result = result.filter(
    (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
  );

  // 搜索过滤（按名称模糊匹配）
  if (searchKeyword && searchKeyword.trim()) {
    const kw = searchKeyword.trim().toLowerCase();
    result = result.filter((item) =>
      String(item.name).toLowerCase().includes(kw)
    );
  }

  // 排序
  if (sortBy === "priceAsc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceDesc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === "sales") {
    result.sort((a, b) => b.sales - a.sales);
  } else if (sortBy === "rating") {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  state.filtered = result;
}

export const {
  setCategory,
  setPriceRange,
  setSortBy,
  setSearchKeyword,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
