import React from 'react'

const Item = props => {
  const {Title: title, Year: year} = props
  return (
    <div style={{border: '1px solid blue', cursor: 'pointer'}}>
      <div>{title}</div>
      <div>{year}</div>
    </div>
  )
}

export default Item
