import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import Link from 'next/link';
import { Routes } from '../../../../settings';
import { parseCookies } from '../../../../libs/cookies';
import moment from 'moment'

const GridSlide = ({slides}) => {
  const cookies = parseCookies(),
        lang = cookies.culture

  return (
    <div className="grid-slide">
      {
        slides.map((el, i) => (
          <Link key={el.publicationId} as={`${Routes.publications}/${lang}/${el.publicationId}/${el.title}`} href={`${Routes.publications}?lang=${lang}&slug=${el.publicationId}&title=${el.title}`}>
            <a className="grid-slide-item">
              <div className="grid-slide-img"><img src={el.imagePath} alt={el.title}/></div>
              {el.isHot && <b className="publications-item-label">HOT</b>}
              <h4 className="grid-slide-title">{el.title}</h4>
              <time className="grid-slide-date">{moment(el.publishDate).format('MMMM DD, YYYY')}</time>
            </a>
          </Link>
        ))
      }
    </div>
  );
};

GridSlide.propTypes = {
};

export default GridSlide;
