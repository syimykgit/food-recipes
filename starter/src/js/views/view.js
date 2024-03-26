import { Fraction } from 'fractional';
import iconsFile from 'url:../../img/icons.svg';
export class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorMessage();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      if (
        !curEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!curEl.isEqualNode(newEl)) {
        [...newEl.attributes].forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  successMessage(msg = this._succesMsg) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${iconsFile}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>;`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  errorMessage(msg = this._errorMsg) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${iconsFile}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>;`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _mapIungradients(ing) {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${iconsFile}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing.quantity ? new Fraction(ing.quantity).toString() : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
      </li>`;
  }

  renderSpiner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${iconsFile}#icon-loader"></use>
            </svg>
          </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
