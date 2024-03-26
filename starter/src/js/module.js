import { API_URL, RESULT_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    data: [],
    resultsPerPage: RESULT_PER_PAGE,
    pageNumber: 1,
  },
  bookmarks: [],
};
export const loadRecipe = async function (id) {
  try {
    const data1 = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data1.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imgUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      title: recipe.title,
      sourceUrl: recipe.source_url,
      publisher: recipe.publisher,
    };
    if (state.bookmarks.some(e => e.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err} 1@@@@@@@@@@@@@@@@@@@@@@@2`);
    throw err;
  }
};
export const searchRecipe = async function (query) {
  try {
    const data1 = await getJSON(`${API_URL}?search=${query}`);

    state.search.data = data1.data.recipes.map(recipe => ({
      id: recipe.id,
      imgUrl: recipe.image_url,
      title: recipe.title,
      publisher: recipe.publisher,
    }));
    state.search.pageNumber = 1;
  } catch (err) {
    console.error(`${err} 2@@@@@@@@@@@@@@@@@@@@@@@2`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.pageNumber) {
  state.search.pageNumber = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.data.slice(start, end);
};

export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

const setLocalStorageBookmarks = function () {
  localStorage.setItem('storeBookmark', JSON.stringify(state.bookmarks));
};

export const markBookmark = function (recideInput) {
  state.bookmarks.push(recideInput);

  if (recideInput.id === state.recipe.id) state.recipe.bookmarked = true;

  setLocalStorageBookmarks();
};
export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  setLocalStorageBookmarks();
};

const getLocalStorageBookmarks = function () {
  const data = localStorage.getItem('storeBookmark');
  const finalData = JSON.parse(data);
  if (!finalData) return;
  state.bookmarks = finalData;
};
getLocalStorageBookmarks();
