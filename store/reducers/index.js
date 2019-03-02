import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar'
import common from './common.reducers';
import mainPage from './MainPageReducers';
import publications from './publications.reducer';
import auth from './auth.reducer';
import cabinet from './cabinet.reducer';

export default combineReducers({
  auth,
  cabinet,
  common,
  form,
  loadingBar: loadingBarReducer,
  mainPage,
  publications,
});
