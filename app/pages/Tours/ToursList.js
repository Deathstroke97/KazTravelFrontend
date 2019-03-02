import React from 'react';
import { array } from 'prop-types';
import id from 'uniqid';

import ToursItem from './ToursItem';

const ToursList = ({ data }) => {
  if (!data) return null;
  
  return (
    <ul className="tours-list">
      {
        data.map( (el, i) => (
          <ToursItem key={id()} {...el} />
        ))
      }
    </ul>
  )
};

ToursList.propTypes = {
  data: array
};

export default ToursList;
