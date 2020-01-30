import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import Search from './Search'
import ItemList from './ItemList'
import ItemDetails from './ItemDetails'
import useDebounce from '../utils/useDebounce'

import {searchMoviesByTitle} from '../api'

const Wrapper = styled.div`
  .sidebar {
    grid-area: sidebar;
  }
  .content {
    grid-area: content;
    border-left: 1px solid lightgrey;
    padding: 20px;
    @media (max-width: 600px) {
      border-left: none;
    }
  }
  display: grid;
  grid-gap: 20px;
  margin: 20px auto;
  padding: 20px;
  grid-template-columns: 300px auto;
  grid-template-areas: 'sidebar content';
  @media (max-width: 600px) {
    grid-template-areas:
      'sidebar'
      'content';
  }
`

function FilteredMovies() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItemId, setSelectedItemId] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const debounceSearchTerm = useDebounce(searchTerm, 500)

  const handleSearchTermChange = e => setSearchTerm(e.target.value)
  const handleSelectedItem = id => setSelectedItemId(id)
  const handlePagination = page => setCurrentPage(page)

  useEffect(() => {
    async function fetchData() {
      try {
        setSelectedItemId('')
        setError(null)
        setItems([])
        setTotal(0)
        if (debounceSearchTerm) {
          setLoading(true)
          const results = await searchMoviesByTitle(
            debounceSearchTerm.trim(),
            currentPage,
          )
          const {
            Search: search,
            totalResults,
            Response: response,
            Error: error,
          } = results

          setLoading(false)

          if (response.toLowerCase() === 'true') {
            setItems(search)
            setTotal(totalResults)
          } else {
            setError(error)
          }
        }
      } catch (e) {
        console.warn('Error on fetching movies ', e)
        setError('Error on searching movies.')
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, debounceSearchTerm])

  return (
    <Wrapper>
      <div className="sidebar">
        <Search onChange={handleSearchTermChange} value={searchTerm} />

        {error && <p>{error}</p>}

        {loading && <p>Loading, please wait...</p>}

        {!error && debounceSearchTerm && items && (
          <ItemList
            loading={loading}
            items={items}
            page={currentPage}
            total={total}
            onSelectedItem={handleSelectedItem}
            selectedItemId={selectedItemId}
            onPagination={handlePagination}
          />
        )}
      </div>

      {selectedItemId && (
        <div className="content">
          <ItemDetails id={selectedItemId} />
        </div>
      )}
    </Wrapper>
  )
}

export default FilteredMovies
