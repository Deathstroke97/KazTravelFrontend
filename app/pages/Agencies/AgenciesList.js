import React, { Component } from 'react';
import { array } from 'prop-types';
import id from 'uniqid';

import AgenciesItem from './AgenciesItem';

const AgenciesList = ({ data }) => {
  if (!data) return null;
  
  return (
    <ul className="agencies-list">
      {
        data.map( (el, i) => (
          <AgenciesItem key={id()} item={el} />
        ))
      }
    </ul>
  );
};

AgenciesList.propTypes = {
  data: array
};

export default AgenciesList;
