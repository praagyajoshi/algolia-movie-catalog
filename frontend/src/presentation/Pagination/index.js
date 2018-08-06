import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class Pagination extends Component {
  onPageNumberClick(pageNumber, e) {
    e.preventDefault();
    console.log('clicked numer = ' + pageNumber);
    this.props.pageNumberSelectedCallback(pageNumber - 1);
  }

  onPreviousClick() {
    if (this.props.currentPage > 0) {
      this.props.pageNumberSelectedCallback(this.props.currentPage - 1);
    }
  }

  onNextClick() {
    this.props.pageNumberSelectedCallback(this.props.currentPage + 1);
  }

  getPageNumbersToRender() {
    const { currentPage, totalPageCount } = this.props;
    const currentPageValue = currentPage + 1;
    var startPage, endPage;

    // TODO: refactor and reduce to 5 pages
    if (totalPageCount <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPageCount;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPageValue <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPageValue + 4 >= totalPageCount) {
        startPage = totalPageCount - 9;
        endPage = totalPageCount;
      } else {
        startPage = currentPageValue - 5;
        endPage = currentPageValue + 4;
      }
    }

    return [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
  }

  getPaginationList() {
    const pageList = this.getPageNumbersToRender();

    // TODO: Add first and last links as well
    return pageList.map((page) => {
      const linkClasses = ClassNames({
        "pagination-link": true,
        "is-current": (this.props.currentPage === (page - 1))
      });

      return (
        <li key={"page-number-" + page}>
          <a
            className={linkClasses}
            aria-label={"Goto page " + page}
            onClick={(e) => this.onPageNumberClick(page, e)}>
            {page}
          </a>
        </li>
      );
    });
  }

  render() {
    const { currentPage, totalPageCount } = this.props;

    if (totalPageCount === 0) {
      return (null);
    }

    return (
      <div className="field">
        <div className="control">
          <nav className="pagination is-centered" aria-label="pagination">
            <a
              className="pagination-previous is-disabled"
              onClick={(e) => this.onPreviousClick(e)}
              disabled={(currentPage === 0)} >
              Previous
            </a>

            <a
              className="pagination-next"
              onClick={(e) => this.onNextClick(e)}
              disabled={(currentPage === (totalPageCount - 1))} >
              Next page
            </a>

            <ul className="pagination-list">
              {this.getPaginationList()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPageCount: PropTypes.number.isRequired,
  pageNumberSelectedCallback: PropTypes.func.isRequired
}

export default Pagination;
