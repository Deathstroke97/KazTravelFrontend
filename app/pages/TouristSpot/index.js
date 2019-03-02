import React from 'react';
import { array, oneOfType, object } from 'prop-types';

import { Routes } from '../../../settings';

/**
 * Components
 */
import SpotsTypes from './SpotsTypes';
import SpotsList from './SpotsList';
import SpotDetail from './SpotDetail';

const TouristSpotComponent = ({ slug, spot, filter, data, fullList, spotTitle, similar, routes, lang, originalURL }) => {
  if (slug) return <SpotDetail data={data} similar={similar} routes={routes} path={Routes.spot} spot={spot} lang={lang} originalURL={originalURL} />;
  if (spot) return <SpotsList lang={lang} spot={spot} filter={filter} title={spotTitle} path={`${Routes.spot}`}/>;
  return <SpotsTypes data={data} fullList={fullList} path={Routes.spot} />
};

TouristSpotComponent.propTypes = {
  data: oneOfType([array, object])
};

export default TouristSpotComponent;
