class SearchViewClass {
  _searchInput = document.querySelector('.search');
  renderSearch() {
    const inputValue = this._searchInput.querySelector('.search__field').value;
    this._clearInput();
    return inputValue;
  }

  _clearInput() {
    this._searchInput.querySelector('.search__field').value = '';
  }
  addHendlerSearch(handler) {
    this._searchInput.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchViewClass();
