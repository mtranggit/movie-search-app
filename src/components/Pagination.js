import React from 'react'

const PER_PAGE = 10

const Pagination = props => {
  const {total, page, onPagination} = props
  const pages = Math.ceil(total / PER_PAGE)
  return (
    <div>
      <span
        className="prev"
        onClick={() => onPagination(page - 1)}
        aria-disabled={page <= 1}
      >
        Prev
      </span>
      <p>Page {page}</p>
      <p>{total} results</p>
      <span
        className="next"
        onClick={() => onPagination(page + 1)}
        aria-disabled={page >= pages}
      >
        Next
      </span>
    </div>
  )
}

export default Pagination
