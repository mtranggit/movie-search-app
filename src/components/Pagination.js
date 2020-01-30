import React from 'react'
import styled from '@emotion/styled'

const StyledPagination = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(3, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 1rem 0;
  border: 1px solid lightgrey;
  border-radius: 10px;
  .prev,
  .next {
    cursor: pointer;
  }
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid lightgrey;
    &:last-child {
      border-right: 0;
    }
  }
  span[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`

const PER_PAGE = 10

const Pagination = props => {
  const {total, page, onPagination} = props
  const pages = Math.ceil(total / PER_PAGE)

  if (pages <= 1) {
    return null
  }

  return (
    <StyledPagination>
      <span
        className="prev"
        role="img"
        onClick={() => onPagination(page - 1)}
        aria-label="Previous page"
        aria-disabled={page <= 1}
      >
        ◀️
      </span>

      <span>
        Page {page}
        <br />
        {total} results
      </span>
      <span
        className="next"
        role="img"
        onClick={() => onPagination(page + 1)}
        aria-label="Next page"
        aria-disabled={page >= pages}
      >
        ▶️
      </span>
    </StyledPagination>
  )
}

export default Pagination
