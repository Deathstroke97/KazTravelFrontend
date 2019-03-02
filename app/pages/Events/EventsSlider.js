import React from 'react';
import PropTypes from 'prop-types';
import SlickSlider from 'react-slick';
import Link from 'next/link';
import { Routes } from '../../../settings';

import moment from 'moment'

const EventsSlider = props => {
  const slidesInfo = props.eventsSlider.map(event => ({
    title: event.title,
    date: moment.utc(event.startDate).format('DD MMMM YYYY'),
    place: event.address,
    slug: event.id,
    image: event.baseImagePath
  }));
  const settings = {
    className: 'events-slider',
    arrows: false,
    dots: true,
    dotsClass: 'events-slider-dots',
    autoplay: true
  };

  if (slidesInfo.length && slidesInfo.length < 2) {
    const el = slidesInfo[0];
    return (
      <div className="events-slider">
        <figure className="events-slider-item">
          <div className="events-slider-img"><img src={el.image} alt=""/></div>
          <figcaption>
            <Link href={`${Routes.events}?slug=${el.slug}&title=${el.title}`} as={`${Routes.events}/${el.slug}/${el.title}`}>
              <a>
                <h3 className="events-slider-title">{el.title}</h3>
              </a>
            </Link>
            <div className="events-slider-meta">
              <time>{el.date}</time>
              <span>{el.place}</span>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
  return (

    <SlickSlider {...settings}>
      {slidesInfo.map((el, i) => (
        <figure className="events-slider-item" key={`slide-${i}`}>
          <div className="events-slider-img"><img src={el.image} alt=""/></div>
          <figcaption>
            <Link href={`${Routes.events}?slug=${el.slug}&title=${el.title}`} as={`${Routes.events}/${el.slug}/${el.title}`}>
              <a>
                <h3 className="events-slider-title">{el.title}</h3>
              </a>
            </Link>
            <div className="events-slider-meta">
              <time>{el.date}</time>
              <span>{el.place}</span>
            </div>
          </figcaption>
        </figure>
      ))}
    </SlickSlider>
  );
};

EventsSlider.propTypes = {
};

export default EventsSlider;
