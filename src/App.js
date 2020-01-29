import React, {useState, useEffect} from 'react'
import Search from './components/Search'
import ItemList from './components/ItemList'
import ItemDetails from './components/ItemDetails'
import Header from './components/Header'
import Footer from './components/Footer'
import useDebounce from './utils/useDebounce'

import styled from '@emotion/styled'
import {searchMoviesByTitle} from './api'

const Container = styled.div`
  display: grid;
  grid-template-rows: 22% auto 22%;
  grid-gap: 1rem;
  padding: 1rem;
`

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 1rem;
`

function App() {
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
    <Container>
      {/* <Header />` */}
      <SearchContainer>
        <div className="content-side">
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
              onPagination={handlePagination}
            />
          )}
        </div>

        <div className="content-main">
          {selectedItemId && <ItemDetails id={selectedItemId} />}
        </div>
      </SearchContainer>
      {/* <Footer /> */}
    </Container>
  )
}

export default App
