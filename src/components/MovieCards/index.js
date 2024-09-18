import {Link} from 'react-router-dom'
import './index.css'

const MovieCards = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-list-item">
      <img src={posterPath} alt={title} className="movie-poster-image" />
      <h1 className="movie-name">{title}</h1>
      <div className="voting-button-container">
        <p className="movies-votes">{voteAverage}</p>
        <Link to={`/movie/${id}`}>
          <button className="view-button" type="button">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}
export default MovieCards
