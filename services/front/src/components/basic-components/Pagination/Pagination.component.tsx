import React from 'react';

import classNames from 'classnames';

import { PaginationProps } from '@components/Pagination/Pagination.interface';
import { PaginationButton, PaginationContainer, PaginationInfo, PaginationWrapper } from '@styles/Pagination.style';

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <PaginationContainer>
      <PaginationWrapper>
        <PaginationButton
          className={classNames({ disabled: currentPage === 1 })}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt; Prev
        </PaginationButton>

        <PaginationInfo>Page {currentPage} of {totalPages}</PaginationInfo>

        <PaginationButton
          className={classNames({ disabled: currentPage === totalPages })}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next &gt;
        </PaginationButton>
      </PaginationWrapper>
    </PaginationContainer>
  );
};

export default Pagination;
