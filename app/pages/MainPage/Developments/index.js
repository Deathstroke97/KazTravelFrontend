import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import id from 'uniqid';
// import SlickSlider from 'react-slick';
import Media from 'react-responsive';
import moment from 'moment'
import { LocalizationContext } from '../../../../context'

import Slider from '../../../common/Slider';
import Content from '../../../common/ContentSection';
import MainTitle from '../MainTitle/index';
import ViewMore from '../../../common/ViewMore';
import {Parallax} from "react-scroll-parallax";
import { Routes } from '../../../../settings';

import FileSaver from 'file-saver'
import { Component as ICSComponent, Property } from 'immutable-ics'

export default class Developments extends Component {
  static propTypes = {
  }

  handleClick = (e, el) => {
    e.preventDefault()

    let date = new Date()
    let startDate = new Date(el.startDate)

    let utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
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
              value: el.title
            }),
            new Property({
              name: 'DESCRIPTION',
              parameters: { VALUE: 'TEXT' },
              value: el.shortDescription
            }),
            new Property({
              name: 'LOCATION',
              parameters: { VALUE: 'TEXT' },
              value: el.city ? el.city : ''
            })
          ]
        })
      ]
    })
    window.open( "data:text/calendar;charset=utf8," + calendar.toString())
  }

  render() {
    const { calendarEventBlocks } = this.props;
    if (!calendarEventBlocks || !calendarEventBlocks.length) return null;
    const dataLength  = calendarEventBlocks.length;
    const settings = {
      startAt: 2,
      perView: 5,
      peek: 120,
      gap: 0,
      focusAt: 'center',
      breakpoints: {
        1440: {
          perView: 4,
          peek: 74,
        },
        1280: {
          perView: 4,
          peek: 30,
        },
        1170: {
          perView: 3,
          peek: 61
        },
        1000: {
          peek: 0,
          perView: 3
        },
        760: {
          perView: 1,
          peek: 0
        }
      }

    };

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <Content className="content-section--white">
              <Parallax
                offsetYMax={100}
                offsetYMin={-300}
                className="parallax-shape-3 parallax-shape"
              />
              <MainTitle name={localization.mainPageEvents} text={localization.mainPageEventsText} />
            </Content>

            <Content isWide className="developments content-section--white">
              <div className="developments-slider">
              {
                dataLength < 5 ? (
                  calendarEventBlocks.map((el, i) => (
                    <div className="developments-slide" key={id()}>
                      <div className="developments-slide-img"><img src={el.imagePath} alt={el.title}/></div>
                      <div className="developments-slide-content">
                        <h4 className="developments-slide-title">
                          <Link href={`${Routes.events}?slug=${el.calendarEventId}&title=${el.title}`} as={`${Routes.events}/${el.calendarEventId}/${el.title}`}>
                            <a>{el.title}</a>
                          </Link>
                        </h4>
                        <div className="developments-slide-type">{el.eventType}</div>
                        <div className="developments-slide-text">{el.shortDescription}</div>
                        <div className="developments-slide-meta">
                          <time>{moment.utc(el.startDate).format('MMMM DD, YYYY.')}</time>
                          <span>{el.city}</span>
                        </div>
                        <div className="developments-slide-link">
                          <a href="" onClick={e => this.handleClick(e, el)}><span>{localization.eventsAddToCalendar}</span></a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Slider settings={settings}>
                    {
                      calendarEventBlocks.map((el, i) => (
                        <div className="developments-slide" key={id()}>
                          <div className="developments-slide-img"><img src={el.imagePath} alt={el.title}/></div>
                          <div className="developments-slide-content">
                            <h4 className="developments-slide-title">
                              <Link href={`${Routes.events}?slug=${el.calendarEventId}&title=${el.title}`} as={`${Routes.events}/${el.calendarEventId}/${el.title}`}>
                                <a>{el.title}</a>
                              </Link>
                            </h4>
                            <div className="developments-slide-type">{el.eventType}</div>
                            <div className="developments-slide-text">{el.shortDescription}</div>
                            <div className="developments-slide-meta">
                              <time>{moment.utc(el.startDate).format('MMMM DD, YYYY.')}</time>
                              <span>{el.city}</span>
                            </div>
                            <div className="developments-slide-link">
                              <a href="" onClick={e => this.handleClick(e, el)}><span>{localization.eventsAddToCalendar}</span></a>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </Slider>
                )
              }
              </div>


              <Media maxWidth={760}>
                <ViewMore isPadding text={localization.allEvents} />
              </Media>
            </Content>
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
