import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import {searchMoviesById} from '../api'

const StyledItemDetails = styled.div`
  .label {
    font-weight: bold;
  }
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 20px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

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
    if (id !== '') {
      fetchData()
    }
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
      <StyledItemDetails>
        <div>
          <h3>{title}</h3>
          <p>{genre}</p>
          <p>Movie plot - {plot}</p>
          <p>
            <span className="label">Language: </span>
            {language}
          </p>
          <p>
            <span className="label">Diretor: </span>
            {director}
          </p>
          <p>
            <span className="label">Actors: </span>
            {actors}
          </p>
          <p>
            <span className="label">Duration: </span>
            {duration}
          </p>
        </div>
        <div>
          <img src={poster} alt={title} />
        </div>
      </StyledItemDetails>
    )
  }

  return null
}

export default ItemDetails
