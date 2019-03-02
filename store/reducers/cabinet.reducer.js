import { handleActions } from 'redux-actions';
import { FETCH_SHOPS, FETCH_ROUTES, DONE, SAVE_ROUTE, SAVE_SHOP, UPDATE_ROUTE, UPDATE_SHOP, EDIT_ITEM, DELETE_ITEM, CANCEL_EDIT } from '../../constants';

export default handleActions({
  [EDIT_ITEM]: (state, { payload }) => ({
    ...state, edit: true, editItem: payload || null
  }),

  [CANCEL_EDIT]: state => ({ ...state, edit: false }),

  [SAVE_SHOP + DONE]: (state, { payload }) => ({
    ...state,
    items: Array.isArray(payload) ? [...state.items,  ...payload ] : [...state.items, payload],
    edit: false
  }),

  [SAVE_ROUTE + DONE]: (state, { payload }) => ({
    ...state,
    items: Array.isArray(payload) ? [...state.items,  ...payload ] : [...state.items, payload],
edit: false
  }),

  [UPDATE_SHOP + DONE]: (state, { payload }) => ({
    ...state,
    edit: false,
    editShop: null,
    items: state.items.map(item => {
      if (item.id === payload.id) {
        return { ...item, ...payload }
      }
      return item;
    })
  }),

  [UPDATE_ROUTE + DONE]: (state, { payload }) => ({
    ...state,
    edit: false,
    editRoute: null,
    items: state.items.map(item => {
      if (item.id === payload.id) {
        return { ...item, ...payload }
      }
      return item;
    })
  }),

  [FETCH_ROUTES + DONE]: (state, { payload }) => ({
    ...state, items: [...payload]
  }),

  [FETCH_SHOPS + DONE]: (state, { payload }) => ({
    ...state, items: [...payload]
  }),



  [DELETE_ITEM]: (state, { payload }) => ({
    ...state, items: state.items.filter(item => +item.id !== +payload)
  })

}, {
  edit: false,
  editItem: null,
  items: null
});
