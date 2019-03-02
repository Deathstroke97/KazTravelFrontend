import React, { Component } from 'react';
import id from 'uniqid';

import AgencyTourItem from './AgencyTourItem';
import AgencyTourListTags from './AgencyTourListTags';
import { Routes } from '../../../settings';

export default class AgencyTours extends Component {
  render() {
    const {props: {data}} = this;
    if (!data) return null;

    return (
      <div className="agency-tours">

        <ul className="agency-tours-list">
          {data.map((el, i) => <AgencyTourItem data={el} key={i} />)}

          {/*<AgencyTourItem data={data} />*/}
          {/*<AgencyTourItem data={data} />*/}
          {/*<AgencyTourItem data={data} />*/}
        </ul>
      </div>
    )
  }
}
