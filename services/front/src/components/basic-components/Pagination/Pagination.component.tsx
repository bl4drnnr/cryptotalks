import React from 'react';

import classNames from 'classnames';

import { PaginationProps } from '@components/Pagination/Pagination.interface';
import {
  PageSizeInput,
  PaginationButton,
  PaginationContainer,
  PaginationInfo,
  PaginationWrapper
} from '@styles/Pagination.style';

const Pagination = ({
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (pageSize: number) => {
    onPageSizeChange(pageSize);
  };

  return (
    <PaginationContainer>
      <PaginationWrapper>

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

        <PaginationWrapper>
          <PageSizeInput
            value={pageSize}
            type={'number'}
            min={'1'}
            onChange={(e) => handlePageSizeChange(e.target.value as unknown as number)}
          />
        </PaginationWrapper>

      </PaginationWrapper>
    </PaginationContainer>
  );
};

export default Pagination;
