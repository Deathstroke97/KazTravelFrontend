import React, { Fragment, Component } from 'react';
import { string, array, func } from 'prop-types';
import { connect } from 'react-redux';
import Link from "next/link";
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import Media from 'react-responsive';
import { Parallax } from 'react-scroll-parallax';
import { filterTypes, popupTypes, Routes } from '../../../settings';

/**
 * Actions
 */
import { toggleModal } from '../../../store/actions/common.actions';

/**
 * Components
 */
import SortBlock from '../../common/SortBlock';
import ViewMore from '../../common/ViewMore';
import EventsSlider from './EventsSlider';
import EventsList from './EventsList';
import Breadcrumbs from '../../common/Breadcrumbs';
import SimilarSlider from '../Publications/PublicationsSlider';
import ContentSlider from '../../common/ContentSlider';
import Socials from '../../common/Socials';
import Popup from '../../common/Popup';
import Datepicker from '../../common/Datepicker';

import { LocalizationContext } from '.z./../../context'
import { fetchData } from '../../../libs/fetchData'
import moment from 'moment';

import { Component as ICSComponent, Property } from 'immutable-ics'

const getPeriod = (a, b) => {
  let period = {},
      startPeriod = moment.utc().add(1, a).startOf(b).format().replace(/:/g, '%3A').replace(/\+/g, '%2B'),
      endPeriod = moment.utc().add(1, a).endOf(b).format().replace(/:/g, '%3A').replace(/\+/g, '%2B')

  period.start = startPeriod
  period.end = endPeriod

  return period
}

@connect(({ common }) => ({ viewport: common.viewport }), { toggleModal })
export default class EventsContent extends Component {
  static propTypes = {
    slug: string,
    pathname: string,
    list: array,
    toggleModal: func
  }

  state = {
    openCalendar: false,
    eventsLength: 6,
    list: [],
    eventType: '',
    startPeriod: '',
    endPeriod: '',
    region: '',
    showViewMoreButton: true,
    totalEventsListLength: 0,
    reinit: false
  }

  componentDidMount() {
    this.setState({list: this.props.list}, () => {
      fetchData(null, '/calendarEventPub/GetAll')
        .then(e => this.setState({totalEventsListLength: e.result ? e.result.totalCount : 0, showViewMoreButton: e.result ? e.result.totalCount > 6 : false}))
    })
    if (this.props.region) {
      this.setState({region: this.props.region})
    }
    setTimeout(() => {
      this.setState({ reinit: true });
    }, 500);
  }

  componentDidUpdate(prevProps, prevState) {
    const { eventType, startPeriod, endPeriod, region, eventsLength } = this.state
    const pre = {
      eventType: prevState.eventType,
      startPeriod: prevState.startPeriod,
      endPeriod: prevState.endPeriod,
      region: prevState.region,
      eventsLength: prevState.eventsLength
    }

    if(pre.eventType !== eventType || pre.startPeriod !== startPeriod || pre.endPeriod !== endPeriod || pre.region !== region || pre.eventsLength !== eventsLength) {
      let link = '/calendarEventPub/GetAll?'
      if(eventType) link = link.concat(`input.eventTypeId=${eventType}&`)
      if(startPeriod && endPeriod) link = link.concat(`input.startDate=${startPeriod}&input.endDate=${endPeriod}&`)
      if(region) link = link.concat(`input.regionId=${region}&`)
      if(eventsLength) link = link.concat(`input.count=${eventsLength}`)

      fetchData(null, link)
        .then(catEvents => {
          let list = catEvents.result.items.map(event => ({
            title: event.title,
            slug: event.id,
            type: event.eventType,
            image: event.baseImagePath,
            date: event.startDate,
            place: event.city,
            description: event.description
          }))

          this.setState({list})
        })
    }
  }

  handleSort = ({value, label}, type) => {
    switch (type) {
      case filterTypes.category: {
        const str1 = value === 'All categories' ? '' : value;
        this.setState({eventType: str1})

        break;
      }

      case filterTypes.date: {
        if (value.toLowerCase() === 'period') {
          this.props.toggleModal(true);
        } else {
          let period

          if(value.toLowerCase() === 'next week') period = getPeriod('weeks', 'isoWeek')

          if(value.toLowerCase() === 'next month') period = getPeriod('months', 'month')

          if(value.toLowerCase() === 'next year') period = getPeriod('years', 'year')

          this.setState({startPeriod: period ? period.start : '', endPeriod: period ? period.end : ''})
        }

        break;
      }

      case filterTypes.events: {
        this.setState({region: value === 'All regions' ? '' : value})

        break;
      }

      default: return null;

    }
  }

  applyDatePeriod = period => {
    let startPeriod = moment.utc(period.from).format().replace(/:/g, '%3A').replace(/\+/g, '%2B'),
        endPeriod = moment.utc(period.to).format().replace(/:/g, '%3A').replace(/\+/g, '%2B')

    this.setState({startPeriod, endPeriod})
    this.props.toggleModal(false);
  }

  handleViewMore = () => {
    this.setState({eventsLength: this.state.eventsLength + 6}, () => {
      if(this.state.totalEventsListLength < this.state.eventsLength) this.setState({showViewMoreButton: false})
    })
  }

  handleAddToCalendar = e => {
    e.preventDefault()
    const { event } = this.props;

    let date = new Date()
    let startDate = new Date(event.startDate)
    let endDate = new Date(event.endDate)

    let utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
    let utcStartDate = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds())
    let utcEndDate = new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate(), endDate.getUTCHours(), endDate.getUTCMinutes(), endDate.getUTCSeconds())

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
              name: 'URL',
              parameters: { VALUE: 'TEXT' },
              value: event.site ? event.site : ''
            }),
            new Property({
              name: 'DTSTART',
              parameters: { VALUE: 'DATE-TIME' },
              value: utcStartDate
            }),
            new Property({
              name: 'DTEND',
              parameters: { VALUE: 'DATE-TIME' },
              value: utcEndDate
            }),
            new Property({
              name: 'SUMMARY',
              parameters: { VALUE: 'TEXT' },
              value: event.title
            }),
            new Property({
              name: 'DESCRIPTION',
              parameters: { VALUE: 'TEXT' },
              value: event.description
            }),
            new Property({
              name: 'LOCATION',
              parameters: { VALUE: 'TEXT' },
              value: event.address ? event.address : ''
            })
          ]
        })
      ]
    })
    window.open( "data:text/calendar;charset=utf8," + calendar)
  }

  renderItem = () => {
    const settings = {
      className: 'content-slider'
    }
    const { slug, event, pathname, toggleModal, eventsSlider, eventTypes, similarEvents, originalURL, lang, viewport: { width } } = this.props;
    const { list, showViewMoreButton, reinit } = this.state
    let contentGallery = []
    if (event) contentGallery = event.gallery ? event.gallery.map(img => ({image: img.imagePath, caption: img.description, thumb: img.imagePath })) : []

    const center = event.latitude && event.longtitude ? [event.latitude, event.longtitude] : null;
    const placemark = center;
    const zoom = event.zoom !== 0 ? event.zoom : 16

    const mapLang = lang === 'ru' ? 'ru_RU' : 'en_RU';

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <Breadcrumbs page={localization.events} path={pathname}/>
            <h1 className="content-title content-title--bounded">{event.title}</h1>
            <div className="publications-meta">
              {/* <time>26 april ???</time> */}
              <span>{event.eventType}</span>
            </div>

            <div className="publications-banner">


              <Parallax
                offsetYMax={width > 760 ? '100px' : 10}
                offsetYMin={width > 760 ? '-290px' : -50}
                slowerScrollRate
              >
                <img src={event.baseImagePath} alt={event.title}/>
              </Parallax>
            </div>

            <article className="container container--narrow">
              <Socials info={{url: originalURL, title: event.title, desc: '', img: event.baseImagePath}}/>
              <h2 className="content-subtitle">{event.description}</h2>

              <div className="events-info">
                <div className="events-info-date">
                  <div className="top">{moment.utc(event.startDate).format('YYYY')}</div>
                  <div className="bottom">
                    <div className="days">
                      { moment.utc(event.startDate).format('DD MMM') === moment.utc(event.endDate).format('DD MMM') ?
                        <div className="to">
                          {moment.utc(event.startDate).format('DD MMM')}
                        </div>
                      :
                        <>
                          <div className="from">
                            {moment.utc(event.startDate).format('DD MMM')}
                          </div>
                          <div className="to">
                            {moment.utc(event.endDate).format('DD MMM')}
                          </div>
                        </>
                      }
                    </div>
                    <div className="time">{localization.eventsStart} {moment.utc(event.startDate).format('HH:mm')}</div>
                  </div>
                </div>
                <div className="events-info-content">
                  <div className="events-info-place">
                    {event.address}
                    <div className="events-info-link">
                      {/* <a href="" className="under-link"><b>{localization.eventsShowOnTheMap}</b></a> */}
                    </div>
                  </div>
                  {event.purchaseLink ?
                    <div className="events-info-buy">
                      <a href={event.purchaseLink} target="_blank" className="btn">{localization.eventsBuyTickets}</a>
                    </div>
                    :
                    null
                  }
                  <div className="events-info-link">
                    <a href="" onClick={this.handleAddToCalendar} className="under-link"><b>{localization.eventsAddToCalendar}</b></a>
                  </div>
                </div>
              </div>
            </article>

            {event.content && event.content.split(/(<img[^\>]*>)/g,).map((splittedText, i) => {
                if(splittedText.includes('img')){
                  let splittedImgAttr = splittedText.split(/"/g)
                  let src = splittedImgAttr.find(attr => attr.includes('http'))
                  return <Gallery key={i} list={{image: src, caption: '', size: 1}}/>
                }

                return (
                  <div className="container container--narrow" key={i}>
                    <div className="content-article" key={i} dangerouslySetInnerHTML={{__html: splittedText.replace('content-text', '') }}/>
                  </div>
                )
              })}

              {/*<div className="content-text">*/}
                {/**/}
              {/*</div>*/}
            <div className="container container--narrow">

              {event.pdfFilePath || event.site ?
                <div className="events-links">
                  {event.pdfFilePath ? <a href={event.pdfFilePath} download target="_blank" className="btn">{localization.eventsDownloadProgram}</a> : null}
                  {event.site ? <a href={event.site} target="_blank" className="under-link under-link--arr"><b>{localization.eventsVisitOffSite}</b></a> : null}
                </div>
                :
                null
              }

              <ContentSlider slides={contentGallery} reinit={reinit}/>

              {event.videoLink ?
                <div>
                  {/* <h3 className="content-title content-title--bold">How it be in last year: video report</h3> */}

                  <div className="content-video">
                    <div className="content-video-player">
                      <iframe
                        width="765"
                        height="420"
                        src={event.videoLink}
                        frameBorder={0}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                    </div>
                  </div>
                </div>
                :
                null
              }

            </div>
            {center &&
              <div className="events-map">
                <article className="events-map-info" style={{left: '40%'}}>
                  {event.address && <h3 className="events-map-title">{event.address}</h3>}
                  <div className="events-map-links">
                    {event.purchaseLink ?
                      <a href={event.purchaseLink} target="_blank" className="btn">{localization.eventsBuyTickets}</a>
                    :
                      null
                    }
                    <a href=""  onClick={this.handleAddToCalendar} className="under-link under-link--plus"><b>{localization.eventsAddToCalendar}</b></a>
                  </div>
                </article>
                <YMaps query={{lang: mapLang}}>
                  <Map
                    defaultState={{center, zoom }}
                    width="100%"
                    height={width > 1170 ? '600px' : width > 980 ? '500px' : '400px'}
                  >
                    <Media minWidth={760}>
                      <Placemark
                        geometry={placemark}
                        defaultOptions={{
                          iconLayout: 'default#image',
                          iconImageHref: '/static/images/icons/icon-pin-1.svg',
                          iconImageSize: [54, 67],
                          iconImageOffset: [-27, -67]
                        }}
                      />
                    </Media>
                    <Media maxWidth={759}>
                      <Placemark geometry={center} defaultOptions={{
                        iconLayout: 'default#image',
                        iconImageHref: '/static/images/icons/icon-pin-1.svg',
                        iconImageSize: [54, 67],
                        iconImageOffset: [-27, -67]
                      }}/>
                    </Media>

                  </Map>
                </YMaps>


              </div>
            }

            <article className="container ">
              {/* <div className="publications-tags">
                <Link href={`${Routes.events}/bytag/architectural_sight`}>
                  <a href={`${Routes.events}/bytag/architectural_sight`} className="tag-link">#Architectural_sight</a>
                </Link>
                <Link href={`${Routes.events}/bytag/oasis`}>
                  <a href={`${Routes.events}/bytag/oasis`} className="tag-link">#Oasis</a>
                </Link>
                <Link href={`${Routes.events}/bytag/top`}>
                  <a href={`${Routes.events}/bytag/top`} className="tag-link">#TOP</a>
                </Link> */}
                {/* <a href="" className="tag-link">#Astana</a>
                <a href="" className="tag-link">#Culturalheritage</a>
                <a href="" className="tag-link">#Nature</a>
                <a href="" className="tag-link">#Diving</a>
                <a href="" className="tag-link">#Mountains</a>
                <a href="" className="tag-link">#Food</a>
                <a href="" className="tag-link">#Almaty</a>
                <a href="" className="tag-link">#Hunt</a>
                <a href="" className="tag-link">#Nomadic</a> */}
              {/* </div> */}

              {similarEvents.length ? <SimilarSlider lang={lang} list={similarEvents} title={localization.eventsSimilar} isTall path={Routes.events} /> : null}

              <div className="publications-controls">
                {event.previousEventId ?
                  <Link as={`${Routes.events}/${event.previousEventId}/${event.title}`} href={`${Routes.events}?slug=${event.previousEventId}&title=${event.title}`}>
                    <a><img src="/static/images/icons/icon-prev-1.svg"/> {localization.prev}</a>
                  </Link>
                  :
                  null
                }
                <Link href="/events">
                  <a>{localization.allEvents}</a>
                </Link>
                {event.nextEventId ?
                  <Link as={`${Routes.events}/${event.nextEventId}/${event.title}`} href={`${Routes.events}?slug=${event.nextEventId}&title=${event.title}`}>
                    <a>{localization.next}<img src="/static/images/icons/icon-next-1.svg"/></a>
                  </Link>
                  :
                  null
                }
              </div>
            </article>
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }

  renderList = () => {
    const { event, region, eventsSlider, eventTypes } = this.props;
    const { list, showViewMoreButton } = this.state;
    const defaultRegion = region ? region : 'All regions';

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <h1 className="content-title">{localization.events}</h1>
            <SortBlock defaultRegion={defaultRegion} type={filterTypes.events} categories={eventTypes} onChange={this.handleSort}/>
            <EventsSlider eventsSlider={eventsSlider}/>
            <EventsList list={list}/>
            {showViewMoreButton ? <ViewMore onClick={this.handleViewMore}/> : null}
            <Popup type={popupTypes.datepicker} render={open => (
              open && <Datepicker handleSelect={this.applyDatePeriod} fromMonth />
            )} />
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }

  renderListByTag = () => {
    const { title } = this.props
    const { list, showViewMoreButton } = this.state

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <h1 className="content-title">{localization.events}</h1>
            <div className="publications-tags publications-tags--top">
              <Link href={`${Routes.events}/bytag/${title}`}>
                <a href={`${Routes.events}/bytag/${title}`} className="tag-link">{`#${title}`}</a>
              </Link>
            </div>
            <EventsList list={list}/>
            {showViewMoreButton ? <ViewMore onClick={this.handleViewMore}/> : null}
            <Popup type={popupTypes.datepicker} render={open => (
              open && <Datepicker handleSelect={this.applyDatePeriod} fromMonth />
            )} />
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }

  render() {
    const { slug } = this.props;
    if (slug === 'bytag') {
      return this.renderListByTag();
    } else if (slug) {
      return this.renderItem();
    } else {
      return this.renderList();
    }
  }
};
