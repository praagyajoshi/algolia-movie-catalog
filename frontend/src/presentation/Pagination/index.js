import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { addUrlProps } from 'react-url-query';

import { urlPropsQueryConfig } from '../../dataProviders/urlState';

import './style.css';

class Pagination extends Component {
  onPageNumberClick(pageNumber, e) {
    e.preventDefault();
    this.props.onChangePage(pageNumber);
  }

  onPreviousClick() {
    if (this.props.currentPage > 1) {
      this.props.onChangePage(this.props.currentPage - 1);
    }
  }

  onNextClick() {
    this.props.onChangePage(this.props.currentPage + 1);
  }

  getPageNumbersToRender() {
    const { currentPage, totalPageCount } = this.props;
    let startPage, endPage;

    /**
     * Flags to decide whether we should explicitly
     * include the first or last page.
     */
    let includeFirstPage = false;
    let includeLastPage = false;

    /**
     * If we have <= 5 pages to display, then just show
     * all of them.
     */
    if (totalPageCount <= 5) {
      startPage = 1;
      endPage = totalPageCount;
    } else {
      if (currentPage <= 3) {
        /**
         * If we're close to the first page, then show
         * the first 5 pages.
         */
        startPage = 1;
        endPage = 5;

        includeLastPage = true;
      } else if (currentPage + 2 >= totalPageCount) {
        /**
         * If we're close to the last page, then show
         * the last 5 pages.
         */
        startPage = totalPageCount - 4;
        endPage = totalPageCount;

        includeFirstPage = true;
      } else {
        /**
         * If not close to either the first or last page,
         * then show the neighbouring 2 pages on each side.
         */
        startPage = currentPage - 2;
        endPage = currentPage + 2;

        includeFirstPage = true;
        includeLastPage = true;
      }
    }

    let pagesArray = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
    return { includeFirstPage, includeLastPage, pagesArray };
  }

  getPaginationList() {
    const { includeFirstPage, includeLastPage, pagesArray } = this.getPageNumbersToRender();
    let renderArray = []

    renderArray = pagesArray.map((page) => {
      return this.getPaginationLink(page);
    });

    /**
     * Adding the first page along with
     * an ellipsis element.
     */
    if (includeFirstPage) {
      renderArray.unshift(this.getPaginationLink(0, true, 'first-page-ellipsis'));
      renderArray.unshift(this.getPaginationLink(1));
    }

    /**
     * Adding the last page along with
     * an ellipsis element.
     */
    if (includeLastPage) {
      renderArray.push(this.getPaginationLink(0, true, 'last-page-ellipsis'));
      renderArray.push(this.getPaginationLink(this.props.totalPageCount));
    }

    return renderArray;
  }

  getPaginationLink(page, isEllipsis = false, ellipsisKey = '') {
    if (isEllipsis) {
      return (
        <li key={ellipsisKey}><span className="pagination-ellipsis">&hellip;</span></li>
      );
    }

    const linkClasses = ClassNames({
      "pagination-link": true,
      "is-current": (this.props.currentPage === page)
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
  }

  render() {
    const { currentPage, totalPageCount } = this.props;

    if (totalPageCount === 0) {
      return (null);
    }

    return (
      <div className="field pagination-field">
        <div className="control">
          <nav className="pagination is-centered is-rounded" aria-label="pagination">
            <button
              className="pagination-previous is-disabled"
              onClick={(e) => this.onPreviousClick(e)}
              disabled={(currentPage === 1)} >
              Previous
            </button>

            <button
              className="pagination-next"
              onClick={(e) => this.onNextClick(e)}
              disabled={(currentPage === totalPageCount)} >
              Next page
            </button>

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
  page: PropTypes.number,
  onChangePage: PropTypes.func
}

export default addUrlProps({ urlPropsQueryConfig })(Pagination);