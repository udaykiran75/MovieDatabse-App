import React from 'react'

const movieContext = React.createContext({
  searchInput: '',
  activeTab: 'POPULAR',
  onChangeActiveTab: () => {},
  onChangeSearchInput: () => {},
  onTriggerSearchingQuery: () => {},
  searchApiStatus: 'INPROGRESS',
  searchResponseData: [],
})
export default movieContext
