import React, { Component } from 'react';
import { array } from 'prop-types';
import id from 'uniqid';
import Link from 'next/link'
import { Routes } from '../../../settings';

import ShopsItem from './ShopsItem';

export default class ShopsList extends Component {
  static propTypes = {
    data: array
  }
  
  render() {

    const { data } = this.props;
    if (!data) return null;
    
    return (
      <ul className="shops-list">
        {
          data.map( (el, i) => (
            <ShopsItem key={id()} {...el} />
          ))
        }
      </ul>
    );
  }
}
