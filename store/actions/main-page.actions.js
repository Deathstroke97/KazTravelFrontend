import { createAction } from 'redux-actions';
import { TRENDS__ACTIVE_ARTICLE, TRENDS__SET_ARTICLES, TRENDS__SET_SEASON, TRENDS__SET_TRENDS_LIST, TRENDS__SET_ACTIVE_TREND } from '../../constants';

export const setSeason = createAction(TRENDS__SET_SEASON);
export const setTrendsList = createAction(TRENDS__SET_TRENDS_LIST);
export const setTrendsArticles = createAction(TRENDS__SET_ARTICLES);
export const setActiveArticle = createAction(TRENDS__ACTIVE_ARTICLE);
export const setActiveTrend = createAction(TRENDS__SET_ACTIVE_TREND);

