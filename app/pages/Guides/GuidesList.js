import React, { Component } from 'react';
import { array } from 'prop-types';
import id from 'uniqid';
import Link from 'next/link'
import { Routes } from '../../../settings';

import GuidesItem from './GuidesItem';

export default class GuidesList extends Component {
  static propTypes = {
    data: array
  }

  render() {
    const { data } = this.props;
    if (!data) return null;
    
    return (
      <ul className="guides-list">
        {
          data.map( (el, i) => (
            <GuidesItem key={id()} {...el} />
          ))
        }
      </ul>
    );
  }
}
