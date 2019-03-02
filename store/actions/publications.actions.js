import { createAction } from 'redux-actions';
import { SET_PUB_PAGE, SET_PUB_LIST, SET_PUB_POPULAR, SET_PUB_RECOMMENDED } from '../../constants';

export const setPublicationsList = createAction(SET_PUB_LIST);
export const setPublicationsPage = createAction(SET_PUB_PAGE);
export const setPublicationsPopular = createAction(SET_PUB_POPULAR);
export const setPublicationsRecommended = createAction(SET_PUB_RECOMMENDED);
