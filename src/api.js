import axios from 'axios'

// the OMDB api end point
const API = 'http://www.omdbapi.com/?apikey=301444a6'

export const searchMoviesByTitle = async (search, page) => {
  try {
    const currentPage = parseFloat(page) || 1
    const result = await axios.get(
      `${API}&s=${encodeURIComponent(search)}&page=${encodeURIComponent(page)}`,
    )

    return {
      ...result.data,
      page: currentPage,
    }
  } catch (error) {
    return {
      Response: false,
      Error: `Unable to search for movies with title ${search}`,
    }
  }
}

export const searchMoviesById = async id => {
  try {
    const result = await axios.get(
      `${API}&i=${encodeURIComponent(id)}&plot=full`,
    )
    return result.data
  } catch (error) {
    return {
      error: `Unable to search for movie with id=${id}`,
    }
  }
}
