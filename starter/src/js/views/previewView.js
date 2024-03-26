import { View } from './view.js';

class PreviewViewClass extends View {
  _parentElement = '';
  _murkup(value) {
    return ` 
    <li class="preview">
        <a class="preview__link ${
          document.location.hash.slice(1) === value.id
            ? 'preview__link--active'
            : ''
        }" href="#${value.id}">
          <figure class="preview__fig">
            <img src="${value.imgUrl}" alt="${value.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${value.title}</h4>
            <p class="preview__publisher">${value.publisher}</p>
          </div>
        </a>
    </li>`;
  }
}

export default new PreviewViewClass();
