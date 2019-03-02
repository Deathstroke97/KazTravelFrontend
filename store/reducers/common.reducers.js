import { handleActions } from 'redux-actions';
import { TOGGLE_MODAL, SET_LANG, SET_VIEWPORT_SIZE } from '../../constants';

export default handleActions({
  [TOGGLE_MODAL]: (state, {payload}) => ({
    ...state, modalIsOpen: payload
  }),

  [SET_LANG]: (state, { payload }) => ({
    ...state, activeLang: payload
  }),

  [SET_VIEWPORT_SIZE]: (state, {payload}) => ({
    ...state, viewport: payload
  })
}, {
  modalIsOpen: false,
  activeLang: '',
  viewport: {
    width: 0,
    height: 0
  }
})

