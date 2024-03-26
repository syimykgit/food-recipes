import { View } from './view.js';

import previewViewClass from './previewView.js';

class ResultViewClass extends View {
  _parentElement = document.querySelector('.results');
  _succesMsg = '';
  _errorMsg = 'could not find recipe';
  _generateMarkup() {
    return this._data.map(previewViewClass._murkup).join('');
  }
}

export default new ResultViewClass();
