import React from 'react'
import Item from './Item'
import Pagination from './Pagination'

const ItemList = props => {
  const handleItemClick = id => props.onSelectedItem(id)

  if (!props.items || props.items.length === 0) {
    return null
  }

  return (
    <div>
      {props.items.map((item, index) => (
        <div
          onClick={() => handleItemClick(item.imdbID)}
          key={`item-${item.imdbID}-${index}`}
        >
          <Item {...item} />
        </div>
      ))}
      <Pagination
        page={props.page}
        total={props.total}
        onPagination={props.onPagination}
      />
    </div>
  )
}

export default ItemList
