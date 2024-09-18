import './index.css'

const MovieCast = props => {
  const {castDetails} = props
  const {image, name, character} = castDetails

  return (
    <li className="cast-item">
      <img src={image} alt={name} className="profile-image" />
      <p className="profile-name">{name}</p>
      <p className="profile-character">{character}</p>
    </li>
  )
}
export default MovieCast
