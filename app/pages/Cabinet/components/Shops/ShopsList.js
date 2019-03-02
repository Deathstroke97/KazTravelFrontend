import React from 'react';
import { array } from 'prop-types';
import id from 'uniqid';
import ShopItem from './ShopItem';

const ShopsList = ({ shops, editHandler, deleteHandler, api, user, commonData }) => {
  return (
    <div className="routes-list">
      {shops.map(el => <ShopItem user={user} commonData={commonData} api={api} data={el} key={id()} editHandler={editHandler} deleteHandler={deleteHandler}/>)}
    </div>
  );
};

ShopsList.propTypes = {
  shops: array
};

export default ShopsList;
