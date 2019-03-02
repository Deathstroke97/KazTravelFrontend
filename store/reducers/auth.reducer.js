import { handleActions } from 'redux-actions';
import { SET_USER, CHECK_PHONE, CHECK_EMAIL, DONE, FAIL } from '../../constants';

export default handleActions({
  [SET_USER]: (state, { payload }) => ({
    ...state, user: payload, isAuth: !!payload
  }),

  [CHECK_PHONE + DONE]: (state, action) => ({
    ...state,
    phone_valid: true
  }),

  [CHECK_PHONE + FAIL]: (state, action) => ({
    ...state,
    phone_valid: false
  }),

  [CHECK_EMAIL + DONE]: (state, action) => ({
    ...state,
    email_valid: true
  }),

  [CHECK_EMAIL + FAIL]: (state, action) => ({
    ...state,
    email_valid: false
  })

}, {
  phone_valid: false,
  email_valid: false,
  user: null,
  isAuth: false
})
