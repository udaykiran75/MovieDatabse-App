import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  state = {pageNo: 1}

  onNextPage = () => {
    const {apiCallback, totalPages} = this.props

    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onPrevPage = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state

    return (
      <div className="pagination-container">
        <button
          className="previous-button"
          onClick={this.onPrevPage}
          type="button"
        >
          Prev
        </button>
        <p className="page-number">{pageNo}</p>
        <button className="next-button" onClick={this.onNextPage} type="button">
          Next
        </button>
      </div>
    )
  }
}
export default Pagination
