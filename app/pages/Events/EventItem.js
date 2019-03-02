import React from 'react';
import Link from 'next/link';
import { object } from 'prop-types';
import { Routes } from '../../../settings';
import { LocalizationContext } from '../../../context'
import moment from 'moment'

import FileSaver from 'file-saver'
import { Component as ICSComponent, Property } from 'immutable-ics'

const EventItem = ({ data }) => {
  const { image, title, date, place, slug, description, type, city } = data;
  const area = city || place;

  const handleAddToCalendar = e => {
    e.preventDefault()

    let stampDate = new Date()
    let startDate = new Date(date)

    let utcDate = new Date(stampDate.getUTCFullYear(), stampDate.getUTCMonth(), stampDate.getUTCDate(), stampDate.getUTCHours(), stampDate.getUTCMinutes(), stampDate.getUTCSeconds())
    let utcStartDate = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds())

    let uid = `${Date.now()}@kazakhstan.travel.kz`

    const calendar = new ICSComponent({
      name: 'VCALENDAR',
      properties: [
        new Property({ name: 'PRODID', value: "/Kazakhstan Travel/KZ" }),
        new Property({ name: 'VERSION', value: 2 })
      ],
      components: [
        new ICSComponent({
          name: 'VEVENT',
          properties: [
            new Property({
              name: 'UID',
              parameters: { VALUE: 'TEXT' },
              value: uid
            }),
            new Property({
              name: 'DTSTAMP',
              parameters: { VALUE: 'DATE-TIME' },
              value: utcDate
            }),
            new Property({
              name: 'DTSTART',
              parameters: { VALUE: 'DATE-TIME' },
              value: utcStartDate
            }),
            new Property({
              name: 'SUMMARY',
              parameters: { VALUE: 'TEXT' },
              value: title
            }),
            new Property({
              name: 'DESCRIPTION',
              parameters: { VALUE: 'TEXT' },
              value: description
            }),
            new Property({
              name: 'LOCATION',
              parameters: { VALUE: 'TEXT' },
              value: area ? area : ''
            })
          ]
        })
      ]
    })

    window.open( "data:text/calendar;charset=utf8," + calendar.toString())
  }

  return (
    <LocalizationContext.Consumer>
      {({localization}) => (
        <figure className="events-list-item">
          <div className="events-list-img"><img src={image} alt=""/></div>
          <figcaption>
            <h4 className="events-list-title">
              <Link href={`${Routes.events}?slug=${slug}&title=${title}`} as={`${Routes.events}/${slug}/${title}`}><a>{title}</a></Link>
            </h4>
            <div className="events-list-type">{type}</div>
            <div className="events-list-text">
              <div className="scroll">{description}</div>
            </div>
            <div className="events-list-meta">
              <time className="date">{moment.utc(date).format('DD MMMM')}</time>
              <span className="place">{area}</span>
            </div>
            <div className="developments-slide-link"><a href="" onClick={handleAddToCalendar}><span>{localization.eventsAddToCalendar}</span></a></div>
          </figcaption>
        </figure>
      )}
    </LocalizationContext.Consumer>
  );
};

EventItem.propTypes = {
  data: object
};

export default EventItem;
