import React from 'react'

const Search = props => {
  const {value, onChange} = props
  return (
    <input
      type="search"
      placeholder="Search movies"
      value={value}
      onChange={onChange}
    />
  )
}

export default Search
