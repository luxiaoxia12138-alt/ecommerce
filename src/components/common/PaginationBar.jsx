import React from "react";
import { Pagination } from "antd";

function PaginationBar({ currentPage, pageSize, total, onChange }) {
  return (
    <div style={{ textAlign: "center", marginTop: 16 }}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default PaginationBar;
