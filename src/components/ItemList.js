import React from 'react'
import Item from './Item'
import Pagination from './Pagination'

const ItemList = props => {
  if (props.error) {
    return <p>{props.error}</p>
  }

  if (props.loading) {
    return <p>Loading...</p>
  }

  if (props.items.length === 0) {
    return <p>No results.</p>
  }

  const handleItemClick = id => props.onSelectedItem(id)

  return (
    <div>
      {props.items.map(item => (
        <div onClick={() => handleItemClick(item.id)} key={item.id}>
          <Item {...item} />
        </div>
      ))}
      <Pagination />
    </div>
  )
}

export default ItemList
