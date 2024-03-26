import 'regenerator-runtime/runtime';
import 'core-js/stable';
import recipeViewClass from './views/recipeView';
import searchViewClass from './views/searchView.js';
import * as model from './module.js';
import resultViewClass from './views/resultView.js';
import bookmarksViewClass from './views/bookmarksView.js';
import paginationViewClass from './views/paginationView.js';

const controlRecepies = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;
    recipeViewClass.renderSpiner();
    resultViewClass.update(model.getSearchResultPage());
    bookmarksViewClass.update(model.state.bookmarks);
    await model.loadRecipe(id);
    recipeViewClass.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeViewClass.errorMessage();
  }
};

const controlSearchs = async function () {
  try {
    const searchResult = searchViewClass.renderSearch();
    if (!searchResult) return;
    resultViewClass.renderSpiner();
    await model.searchRecipe(searchResult);
    resultViewClass.render(model.getSearchResultPage());
    paginationViewClass.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

function controlPagination(btnData) {
  resultViewClass.render(model.getSearchResultPage(btnData));
  paginationViewClass.render(model.state.search);
}

function controlServings(btnData) {
  model.updateServings(btnData);
  recipeViewClass.update(model.state.recipe);
}

function controlMarkBookmark() {
  // add / remove bookmark
  if (!model.state.recipe.bookmarked) model.markBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // render bookmark
  bookmarksViewClass.render(model.state.bookmarks);

  // update bookmark view
  recipeViewClass.update(model.state.recipe);
}

function controlbBookmarks() {
  bookmarksViewClass.render(model.state.bookmarks);
}

function init() {
  bookmarksViewClass.addHandlerRender(controlbBookmarks);
  recipeViewClass.addHandlerRender(controlRecepies);
  recipeViewClass.updateRecipeHandler(controlServings);
  recipeViewClass.addHandlerBookmark(controlMarkBookmark);
  searchViewClass.addHendlerSearch(controlSearchs);
  paginationViewClass.addHandlerPagination(controlPagination);
}
init();
