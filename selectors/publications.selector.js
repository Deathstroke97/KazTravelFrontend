import { createSelector } from 'reselect';

export const publicationsSelector = createSelector(
  [publications => publications.list, publications => publications.page, publications => publications.popularList, publications => publications.recommendedList],
  (list, page, popularList, recommendedList) => ({ list, article: page, popularList, recommendedList })
);
