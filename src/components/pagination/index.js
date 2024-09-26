import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function Pagination({ totalItems, number, link, onChangePage }) {
  const [currentPage, setCurrentPage] = useState(number);
  const totalPages = Math.ceil(totalItems / 10);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(number);
  }, [number]);

  const getNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const middleIndex = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - middleIndex, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    if (endPage - startPage + 1 < maxVisiblePages) {
      endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 2) {
      pageNumbers.unshift('...');
    }
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    if (!pageNumbers.includes(1)) {
      pageNumbers.unshift(1);
    }
    if (!pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const changePage = (e, pageNumber) => {
    e.preventDefault();
    if (pageNumber === '...' || pageNumber === currentPage) {
      return;
    }
    setCurrentPage(pageNumber);
    onChangePage(pageNumber);
    navigate(`${link}${pageNumber}`);
  };

  return (
    <div className="pagination">
      {getNumbers().map((pageNumber, index) => (
        <Link
          className={`pagination-btn ${pageNumber === currentPage ? 'pagination-btn--active' : ''}`}
          to={`${link}${pageNumber}`}
          onClick={e => changePage(e, pageNumber)}
          key={index}
        >
          {pageNumber}
        </Link>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  totalItems: 0,
  number: 1,
  link: '/',
  onChangePage: () => {},
};

export default React.memo(Pagination);
