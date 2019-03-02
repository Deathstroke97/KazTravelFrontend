import { handleActions } from 'redux-actions';
import { TRENDS__SET_ARTICLES, TRENDS__SET_SEASON, TRENDS__SET_TRENDS_LIST, TRENDS__SET_ACTIVE_TREND } from '../../../constants';

export default handleActions({
  [TRENDS__SET_SEASON]: (state, { payload }) => ({
    ...state,
    trendsActiveSeason: payload,
  }),

  [TRENDS__SET_ARTICLES]: (state, { payload }) => ({
    ...state,
    trendsArticles: payload
  }),

  // [TRENDS__ACTIVE_ARTICLE]: (state, { payload }) => ({
  //   ...state,
  //   trendsActiveArticle: payload
  // }),

  [TRENDS__SET_TRENDS_LIST]: (state, { payload }) => ({
    ...state,
    trendsList: payload
  }),

  [TRENDS__SET_ACTIVE_TREND]: (state, { payload }) => ({
    ...state,
    trendsActiveTrend: payload,
    trendsActiveArticle: state.trendsArticles.find(el => el.rankId === payload.id)
  })

}, {
  trendsActiveSeason: {},
  trendsArticles: [],
  trendsActiveArticle: {},
  trendsList: [],
  trendsActiveTrend: {}

});
