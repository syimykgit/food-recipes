import { View } from './view.js';
import previewViewClass from './previewView.js';

class BookmarksViewClass extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _succesMsg = '';
  _errorMsg = 'no bookmarks yet';
  _generateMarkup() {
    return this._data.map(re => previewViewClass._murkup(re)).join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksViewClass();
