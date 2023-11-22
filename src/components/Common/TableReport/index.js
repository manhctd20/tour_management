import React from "react";
import TableView from "../TableView";
import PaginationBox from "../PaginationBox";
import './style.scss'

export default function TableReport({
  columns,
  className = "",
  configs = {},
  loading={},
  dataSource={},
  pagination={},
  isShowPagination = false,
}) {
  return (
    <div className={`table-view-wrapper ${className}`}>
      <TableView
        // rowSelection={isAllowSelection ? rowSelection : null}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        // onChange={handleTableChange}
        // rowKey={(record) => record.id}
        // onRow={configs.onRow}
        // className={configs.className}
      />
      {isShowPagination && <br />}
      {isShowPagination 
      // && !!data.totalCount
       && (
        <div className="pagination-box">
          <PaginationBox
            // {...paginationConfig}
            // total={data.totalCount}
            // pageSize={params.pageSize}
            // current={params.pageNum}
            // onChange={onPaginationChange}
            showSizeChanger={true}
          />
        </div>
      )}
    </div>
  );
}
