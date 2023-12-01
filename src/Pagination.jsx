// Pagination.js
import React from 'react';
import './App.css';

const Pagination = ({ currentPage, totalRows,selectedRows, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);
  

  return (
    <div className="pagination">
          <div>
        {`Showing ${startRow}-${endRow} of ${totalRows} rows | ${selectedRows?.length} selected`}
      </div>
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}> 
           Prev
        </button>
      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)} className={currentPage === page?'disable':''} disabled={currentPage === page}>
          {page}
        </button>
        
      ))}
        <button onClick={() => onPageChange(currentPage + 1)}  disabled={currentPage === 9}>
          Next >>
        </button>
    </div>
  );
};

export default Pagination;
