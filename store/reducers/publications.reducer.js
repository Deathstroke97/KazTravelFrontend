import { handleActions } from 'redux-actions';
import { SET_PUB_LIST, SET_PUB_PAGE, SET_PUB_POPULAR, SET_PUB_RECOMMENDED } from '../../constants';

export default handleActions({
  [SET_PUB_LIST]: (state, {payload}) => ({
    ...state,
    list: payload
  }),

  [SET_PUB_PAGE]: (state, { payload }) => ({
    ...state,
    page: payload
  }),

  [SET_PUB_POPULAR]: (state, { payload }) => {
    return {
      ...state,
      popularList: payload
    }
  },

  [SET_PUB_RECOMMENDED]: (state, { payload }) => {
    return {
      ...state,
      recommendedList: payload
    }
  },
}, {
  list: [],
  page: {},
  popularList: [],
  recommendedList: []
});
