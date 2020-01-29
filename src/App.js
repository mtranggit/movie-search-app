import React, {useState, useEffect} from 'react'
import Search from './components/Search'
import ItemList from './components/ItemList'
import ItemDetails from './components/ItemDetails'
import useDebounce from './utils/useDebounce'

function App() {
  const [items, setItems] = useState([])
  const [selectedItemId, setSelectedItemId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searching, setSearching] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const debounceSearchTerm = useDebounce(searchTerm, 500)

  const handleSearchTermChange = e => setSearchTerm(e.target.value)
  const handleSelectedItem = id => {
    console.log('selected item id ', id)
    setSelectedItemId(id)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setSearching(false)
        setSelectedItemId('')
        if (debounceSearchTerm) {
          setSearching(true)
          setLoading(true)
          // const movies = await searchMovies(debounceSearchTerm)
          const movies = [
            {id: '1231', title: 'Movie 1', year: '2011'},
            {id: '1232', title: 'Movie 2', year: '2012'},
            {id: '1233', title: 'Movie 3', year: '2013'},
            {id: '1234', title: 'Movie 4', year: '2014'},
            {id: '1235', title: 'Movie 5', year: '2015'},
          ]
          setLoading(false)
          setItems(movies)
        }
      } catch (e) {
        console.warn('Error on fetching movies ', e)
        setError('Error on searching movies.')
        setSearching(false)
        setLoading(false)
      }
    }
    fetchData()
  }, [debounceSearchTerm])

  return (
    <div className="app">
      <h1>Movie search app</h1>

      <div className="content-side">
        <Search onChange={handleSearchTermChange} value={searchTerm} />

        {searching && (
          <ItemList
            loading={loading}
            error={error}
            items={items}
            onSelectedItem={handleSelectedItem}
          />
        )}
      </div>
      <div className="content-main">
        {selectedItemId && <ItemDetails id={selectedItemId} />}
      </div>
    </div>
  )
}

export default App
