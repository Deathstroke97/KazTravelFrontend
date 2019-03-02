import React, { Component } from 'react';
import { array } from 'prop-types';
import EventItem from './EventItem';


export default class EventsList extends Component {
  static propTypes = {
    list: array
  }

  render() {
    const { list } = this.props;
    if (!list) return null;
    return (
      <div className="events-list">
        {this.props.list.map((el, i) => <EventItem key={`event-${i}`} data={el} />)}
      </div>
    );
  }
}

