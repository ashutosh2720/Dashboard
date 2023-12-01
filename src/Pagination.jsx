// Pagination.js
import React from 'react';
import './App.css';

const Pagination = ({ currentPage, totalRows, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}> 
           Prev
        </button>
      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)} className={currentPage === page?'disable':''} disabled={currentPage === page}>
          {page}
        </button>
        
      ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === 1}>
          Next >>
        </button>
    </div>
  );
};

export default Pagination;
