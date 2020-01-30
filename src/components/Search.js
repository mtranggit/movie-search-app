import React from 'react'
import styled from '@emotion/styled'

const Input = styled.input`
  outline: 0;
  padding: 0.6rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  min-width: 300px;
  &:focus,
  &:active {
    border-color: #85b7d9;
  }
`
const Search = props => {
  const {value, onChange} = props

  return (
    <Input
      type="search"
      placeholder="Search movies"
      value={value}
      onChange={onChange}
    />
  )
}

export default Search
