import React, { Component } from 'react';
import { string, array } from 'prop-types';

/**
 * Components
 */
import Wrapper from '../app/common/Wrapper';
import Content from '../app/common/ContentSection';
import EventsContent from '../app/pages/Events';
import classNames from "classnames";

import { fetchData } from '../libs/fetchData'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

@connect(null, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class Events extends Component {
  static propTypes = {
    slug: string,
    title: string,
    eventsData: array
  }

  static async getInitialProps(ctx) {
    ctx.store.dispatch(showLoading())

    const { query: { slug, title, region }, pathname } = ctx

    let eventContent,
        similarEvents = [],
        eventsList = [],
        eventsSlider = await fetchData(ctx, '/calendarEventPub/GetEventSlide'),
        eventTypes = await fetchData(ctx, '/calendarEventPub/GetEventTypes')

    if (!slug || slug === 'bytag') {
      let events = await fetchData(ctx, '/calendarEventPub/GetAll')
      eventsList = events.result.items.map(event => ({
        title: event.title,
        slug: event.id,
        type: event.eventType,
        image: event.baseImagePath,
        date: event.startDate,
        place: event.city,
        description: event.description
      }))
    } else {
      let event = await fetchData(ctx, `/calendarEventPub/GetById?id=${slug}`)
      let similar = await fetchData(ctx, `/calendarEventPub/GetSimilarEvents?eventId=${slug}`)

      eventContent = event.result
      similarEvents = similar.result.map(event => ({
        title: event.title,
        slug: event.id.toString(),
        image: event.baseImagePath,
        type: event.eventType,
        description: '',
        date: event.startDate,
        city: event.city,
        region: ''
      }))
    }

    ctx.store.dispatch(hideLoading())

    return {
      slug,
      title,
      region,
      pathname,
      eventsList,
      eventContent,
      similarEvents,
      eventsSlider: eventsSlider.result,
      eventTypes: eventTypes.result.map(cat => ({value: cat.id, label: cat.title}))
    }
  }

  render() {
    const {
      props: { slug, title, region, eventsData, pathname, eventContent, eventsList, eventsSlider, eventTypes, similarEvents, originalURL, lang }
    } = this;

    const isWide = slug ? slug != 'bytag' : false;

    return (
      <Wrapper className={classNames({'main--shape': !isWide})} title="Events">
        <Content isWide={isWide}>
          <EventsContent
            slug={slug}
            title={title}
            region={region}
            originalURL={originalURL}
            list={eventsList}
            event={eventContent}
            pathname={pathname}
            eventsSlider={eventsSlider}
            eventTypes={eventTypes}
            similarEvents={similarEvents}
            lang={lang}
          />
        </Content>
      </Wrapper>
    );
  }
}
