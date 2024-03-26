import { Fraction } from 'fractional';
import { View } from './view.js';

class PaginationViewClass extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const curPage = this._data.pageNumber;
    const totalPages = Math.ceil(
      this._data.data.length / this._data.resultsPerPage
    );

    if (curPage === 1 && totalPages > 1)
      return `
    <button class="btn--inline pagination__btn--next" data-num="${curPage + 1}">
      <span>${curPage + 1}</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>`;

    if (curPage === totalPages && curPage > 1)
      return `
    <button class="btn--inline pagination__btn--prev" data-num="${curPage - 1}">
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>${curPage - 1}</span>
    </button>`;

    if (curPage < totalPages && curPage > 1)
      return `
    <button class="btn--inline pagination__btn--prev" data-num="${curPage - 1}">
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>${curPage - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next" data-num="${curPage + 1}">
      <span>${curPage + 1}</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>`;

    return '';
  }
  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const btnData = +btn.dataset.num;
      handler(btnData);
    });
  }
}

export default new PaginationViewClass();
