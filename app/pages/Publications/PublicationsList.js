import React, { Component } from 'react';
import { array, bool, string } from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import { Routes } from '../../../settings';
import PubSlide from './PublicationsSlider/PubSlide';
import moment from 'moment'

export default class PublicationsList extends Component {
  static propTypes = {
    data: array,
    filtered: bool,
    lang: string
  }

  render() {
    const { data, filtered, period, lang } = this.props;
    if (!data.length) {
      return <div className="publications-text"></div>

    }
    return (
      <div className={classNames('publications-list', {filtered})}>
        {
          data.map((el, i) => (
            filtered || period ? (
              <PubSlide lang={lang} {...el} key={`pub-${el.slug}`} path={Routes.publications} />
              ) : (
              <div className={classNames('publications-item', {
                'publications-item-color': i > 0
              })} key={`pub-${el.slug}`}>
                <Link as={`${Routes.publications}/${lang}/${el.slug}/${el.title}`} href={`${Routes.publications}?lang=${lang}&slug=${el.slug}&title=${el.title}`}>
                  <a>
                    <div className="publications-item-img"><img src={el.image} alt=""/></div>
                    <h4 className="publications-item-title">{el.title}</h4>
                    {el.isHot && <b className="publications-item-label">HOT</b>}
                    <time className="publications-item-date">{moment(el.date).format('DD MMMM')}</time>
                  </a>
                </Link>
              </div>
            )
          ))
        }
      </div>
    );
  }
}
