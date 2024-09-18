import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import Navbar from '../Navbar'
import MovieDetails from '../MovieDetails'
import MovieCast from '../MovieCast'

class SingleMovieDetails extends Component {
  state = {
    isloadingMovieDetails: true,
    isloadingMovieCast: true,
    movieDetailsData: [],
    movieCastData: [],
  }

  componentDidMount() {
    this.getMovieDetailsResponse()
    this.getMovieCastResponse()
  }

  getUpdatedMovieDetails = data => ({
    movieName: data.title,
    posterImage: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    voteAverage: data.vote_average,
    duration: data.runtime,
    genres: data.genres,
    releaseDate: data.release_date,
    overview: data.overview,
  })

  getMovieDetailsResponse = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = '897e7c1682b57e93bd52914e219a3d30'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const formatedData = this.getUpdatedMovieDetails(data)
    this.setState({
      movieDetailsData: formatedData,
      isloadingMovieDetails: false,
    })
  }

  getcastdetailsData = data =>
    data.cast.map(eachCast => ({
      id: eachCast.id,
      image: `https://image.tmdb.org/t/p/w500${eachCast.profile_path}`,
      name: eachCast.original_name,
      character: eachCast.character,
    }))

  getMovieCastResponse = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = '897e7c1682b57e93bd52914e219a3d30'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const castFormatedData = this.getcastdetailsData(data)
    this.setState({movieCastData: castFormatedData, isloadingMovieCast: false})
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  render() {
    const {
      isloadingMovieDetails,
      isloadingMovieCast,
      movieDetailsData,
      movieCastData,
    } = this.state

    return (
      <>
        <Navbar />
        {isloadingMovieDetails || isloadingMovieCast ? (
          this.renderLoadingView()
        ) : (
          <>
            <MovieDetails movieDetailsData={movieDetailsData} />
            <div className="cast-details-container">
              <h1 className="cast-heading">Movie Cast</h1>
              <ul className="movie-cast-list">
                {movieCastData.map(castDetails => (
                  <MovieCast castDetails={castDetails} key={castDetails.id} />
                ))}
              </ul>
            </div>
          </>
        )}
      </>
    )
  }
}
export default SingleMovieDetails
