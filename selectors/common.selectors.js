import { createSelector } from 'reselect';

export const modalSelector = createSelector(
  state => state.common,
  ({modalIsOpen}) => modalIsOpen
);

export const langSelector = createSelector(
  state => state.common,
  ({ activeLang }) => activeLang
);
