import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import './index.css'

import MovieContext from '../../context/MovieContext'
import Navbar from '../Navbar'
import MovieCards from '../MovieCards'
import Pagination from '../Pagination'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h2 className="not-found-heading">No results found.</h2>
      <p className="not-found-text">Do not get worried, Try to search again.</p>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  const renderMoviesList = value => {
    const {searchResponseData, onTriggerSearchingQuery} = value
    const {results} = searchResponseData

    return (
      <>
        <ul className="movies-list-container">
          {results.map(movie => (
            <MovieCards key={movie.id} movieDetails={movie} />
          ))}
        </ul>
        <Pagination
          totalPages={searchResponseData.totalPages}
          apiCallback={onTriggerSearchingQuery}
        />
      </>
    )
  }

  const renderApiStatusView = value => {
    const {searchApiStatus} = value

    switch (searchApiStatus) {
      case 'INPROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(value)
      case 'FAILURE':
        return renderEmptyView()
      default:
        return null
    }
  }

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
            {renderApiStatusView(value)}
          </>
        )
      }}
    </MovieContext.Consumer>
  )
}
export default SearchQuery
