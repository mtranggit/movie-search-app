import React from 'react'
import styled from '@emotion/styled'

const StyledItem = styled.div`
  background: white;
  border: 1px solid #ededed;
  margin-top: 20px;
  cursor: pointer;
  .year {
    text-align: right;
    padding: 5px;
  }
`

const StyledTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 5px;
`
const StyledYear = styled.div`
  text-align: right;
  padding: 5px;
`
const Item = props => {
  const {Title: title, Year: year, selected = false} = props
  return (
    <StyledItem>
      <StyledTitle>
        <div>{title}</div>
        {selected && (
          <div>
            <span role="img" aria-label={`${title} selected`}>
              ⭐️
            </span>
          </div>
        )}
      </StyledTitle>
      <StyledYear>{year}</StyledYear>
    </StyledItem>
  )
}

export default Item
