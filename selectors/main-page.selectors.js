import { createSelector } from 'reselect';

// const mainPageSelector = ({ mainPage }) => mainPage;

export const trendingSelector = createSelector(
  [(trending) => trending.trendsList, (trending) => trending.trendsActiveSeason],
  (list, season) => list.filter(el => el.type === season.value)
)

