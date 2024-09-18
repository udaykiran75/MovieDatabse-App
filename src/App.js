import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieContext from './context/MovieContext'
import SearchQuery from './components/SearchQuery'
import SingleMovieDetails from './components/SingleMovieDetails'

class App extends Component {
  state = {
    searchInput: '',
    activeTab: 'POPULAR',
    searchResponseData: [],
    searchApiStatus: 'INPROGRESS',
  }

  onChangeActiveTab = tabId => {
    this.setState({activeTab: tabId})
  }

  changeSearchInput = value => {
    this.setState({searchInput: value})
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

  onTriggerSearchingQuery = async (page = 1) => {
    const {searchInput} = this.state
    const API_KEY = '897e7c1682b57e93bd52914e219a3d30'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    const result = data.results.length
    if (result !== 0) {
      const formatedData = this.getUpdatedData(data)
      this.setState({
        searchResponseData: formatedData,
        searchApiStatus: 'SUCCESS',
      })
    } else {
      this.setState({searchApiStatus: 'FAILURE'})
    }
  }

  render() {
    const {
      searchInput,
      activeTab,
      searchResponseData,
      searchApiStatus,
    } = this.state

    return (
      <MovieContext.Provider
        value={{
          searchInput,
          activeTab,
          searchApiStatus,
          searchResponseData,
          onChangeActiveTab: this.onChangeActiveTab,
          onChangeSearchInput: this.changeSearchInput,
          onTriggerSearchingQuery: this.onTriggerSearchingQuery,
        }}
      >
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/search" component={SearchQuery} />
          <Route exact path="/movie/:id" component={SingleMovieDetails} />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default App
