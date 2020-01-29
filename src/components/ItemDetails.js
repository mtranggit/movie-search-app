import React, {useState, useEffect} from 'react'
import {searchMoviesById} from '../api'

const ItemDetails = props => {
  const {id = ''} = props
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const movieData = await searchMoviesById(id)
        setLoading(false)
        setMovie(movieData)
      } catch (error) {
        setError(error)
        setLoading(false)
        setMovie(null)
      }
    }
    fetchData()
  }, [id])

  if (error) {
    return <p>{error}</p>
  }

  if (loading) {
    return <p>Loading, please wait...</p>
  }

  if (movie) {
    const {
      Title: title,
      Genre: genre,
      Plot: plot,
      Language: language,
      Director: director,
      Actors: actors,
      Runtime: duration,
      Poster: poster,
    } = movie
    return (
      <div>
        <div>
          <p>{genre}</p>
          <p>Movie plot - {plot}</p>
          <p>Language: {language}</p>
          <p>Diretor: {director}</p>
          <p>Actors: {actors}</p>
          <p>Duration: {duration}</p>
        </div>
        <div>
          <img src={poster} alt={title} />
        </div>
      </div>
    )
  }

  return null
}

export default ItemDetails
