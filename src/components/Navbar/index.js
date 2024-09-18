import {Link, withRouter} from 'react-router-dom'
import './index.css'
import MovieContext from '../../context/MovieContext'

const Navbar = props => (
  <MovieContext.Consumer>
    {value => {
      const {
        searchInput,
        activeTab,
        onChangeActiveTab,
        onChangeSearchInput,
        onTriggerSearchingQuery,
      } = value

      const popularClsName =
        activeTab === 'POPULAR' ? 'activeTabItem' : 'nav-btn'
      const topratedClsName =
        activeTab === 'TOPRATED' ? 'activeTabItem' : 'nav-btn'
      const upcomingClsName =
        activeTab === 'UPCOMING' ? 'activeTabItem' : 'nav-btn'

      const changePopularTab = () => onChangeActiveTab('POPULAR')
      const changeTopRatedTab = () => onChangeActiveTab('TOPRATED')
      const changeUpcomigTab = () => onChangeActiveTab('UPCOMING')

      const onUpdateSearchInput = event =>
        onChangeSearchInput(event.target.value)

      const onSearchHandler = event => {
        event.preventDefault()
        const {history} = props
        onTriggerSearchingQuery()
        history.push('/search')
        onChangeActiveTab('SEARCH')
      }

      return (
        <div className="nav-container">
          <Link to="/" className="decoration">
            <h1 className="nav-heading">movieDB</h1>
          </Link>
          <ul className="unorder-navlinks">
            <li>
              <Link className="nav-link" to="/">
                <button
                  className={popularClsName}
                  type="button"
                  onClick={changePopularTab}
                >
                  Popular
                </button>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/top-rated">
                <button
                  className={topratedClsName}
                  type="button"
                  onClick={changeTopRatedTab}
                >
                  Top Rated
                </button>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/upcoming">
                <button
                  className={upcomingClsName}
                  type="button"
                  onClick={changeUpcomigTab}
                >
                  Upcoming
                </button>
              </Link>
            </li>
          </ul>
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={onUpdateSearchInput}
            />
            <button
              className="search-btn"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        </div>
      )
    }}
  </MovieContext.Consumer>
)
export default withRouter(Navbar)
