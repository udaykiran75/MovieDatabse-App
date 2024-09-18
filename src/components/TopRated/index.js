import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

import Navbar from '../Navbar'
import MovieContext from '../../context/MovieContext'
import MovieCards from '../MovieCards'
import Pagination from '../Pagination'

class TopRated extends Component {
  state = {isLoading: true, topRatedMoviesData: []}

  componentDidMount = () => {
    this.getTopRatedMoviesResponse()
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

  getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = '897e7c1682b57e93bd52914e219a3d30'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, topRatedMoviesData: newData})
  }

  renderTopRatedMovies = () => {
    const {topRatedMoviesData} = this.state
    const {results} = topRatedMoviesData

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
    const {isLoading, topRatedMoviesData} = this.state

    return (
      <MovieContext.Consumer>
        {value => {
          const {activeTab} = value

          if (activeTab === 'POPULAR') {
            return <Redirect to="/" />
          }

          return (
            <>
              <Navbar />
              {isLoading
                ? this.renderLoadingView()
                : this.renderTopRatedMovies()}
              <Pagination
                totalPages={topRatedMoviesData.totalPages}
                apiCallback={this.getTopRatedMoviesResponse}
              />
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}
export default TopRated
