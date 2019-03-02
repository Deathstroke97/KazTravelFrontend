import React from 'react';
import { array, func } from 'prop-types';
import id from 'uniqid';
import RouteItem from './RouteItem';

const RoutesList = ({ routes, deleteHandler, editHandler, commonData, lang, api }) => (
  <div className="routes-list">
    {routes.map(el => <RouteItem api={api} lang={lang} commonData={commonData} data={el} key={id()} deleteHandler={deleteHandler} editHandler={editHandler} />)}
  </div>
);

RoutesList.propTypes = {
  routes: array,
  deleteHandler: func,
  editHandler: func,
};

export default RoutesList;
