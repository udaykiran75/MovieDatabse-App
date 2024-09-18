import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import Navbar from '../Navbar'
import MovieCards from '../MovieCards'
import Pagination from '../Pagination'

class Popular extends Component {
  state = {
    isLoading: true,
    popularMoviesData: [],
  }

  componentDidMount() {
    this.getPopularMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMoviesResponse = async (page = 1) => {
    const API_KEY = '897e7c1682b57e93bd52914e219a3d30'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const formatedData = this.getUpdatedData(data)
    this.setState({popularMoviesData: formatedData, isLoading: false})
  }

  renderPopularMovies = () => {
    const {popularMoviesData} = this.state
    const {results} = popularMoviesData

    return (
      <ul className="movies-list-container">
        {results.map(movie => (
          <MovieCards key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  render() {
    const {popularMoviesData, isLoading} = this.state

    return (
      <>
        <Navbar />
        {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
        <Pagination
          totalPages={popularMoviesData.totalPages}
          apiCallback={this.getPopularMoviesResponse}
        />
      </>
    )
  }
}
export default Popular
