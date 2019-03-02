import { createAction } from 'redux-actions';
import { TOGGLE_MODAL, SET_LANG, SET_VIEWPORT_SIZE } from '../../constants';

export const toggleModal = createAction(TOGGLE_MODAL);
export const setLang = createAction(SET_LANG);
export const setViewport = createAction(SET_VIEWPORT_SIZE);
