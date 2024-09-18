import './index.css'

const MovieDetails = props => {
  const {movieDetailsData} = props
  const {
    movieName,
    posterImage,
    voteAverage,
    duration,
    genres,
    releaseDate,
    overview,
  } = movieDetailsData

  const convertRuntime = () => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}h ${minutes}m`
  }

  const rating = Math.round(voteAverage * 10) / 10
  const genresString = genres.map(genre => genre.name).join(', ')

  return (
    <div className="movie-details-container">
      <img src={posterImage} alt={movieName} className="movie-image" />
      <div className="medium-above-container">
        <h1 className="movie-title">{movieName}</h1>
        <div className="movie-details-section">
          <p className="text">
            Rating: <span className="span-text">{rating}</span>
          </p>
          <p className="text">
            Release Date: <span className="span-text">{releaseDate}</span>
          </p>
          <p className="text">
            Duration: <span className="span-text">{convertRuntime()}</span>
          </p>
          <p className="text">
            Genres: <span className="span-text">{genresString}</span>
          </p>
          <p className="text">
            Overview: <span className="span-text">{overview}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default MovieDetails
