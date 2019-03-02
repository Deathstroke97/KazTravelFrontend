import React from 'react';
import { string, bool } from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import {Routes} from '../../../../settings';
import moment from 'moment'
import { LocalizationContext } from '../../../../context'

const PubSlide = ({ title, slug, image, type, description, date, city, region, isTall, path, time, query, isHot, visitTime, visitTimeType, lang }) => {

  /* Зачем использовать title в роуте если slug для этого специально предназначен??? Slug должен гнерироваться из title на сервере при создании публикации - это уникальное поле взамен id чтобы в пути была чпу ссылка, а не /2 например если id юзать */
  return (
    <LocalizationContext.Consumer>
      {({localization}) => (
        <div className="pub-slide">

          <Link as={`${path}/${lang}/${slug}/${title}`} href={`${path}?lang=${lang}&slug=${slug}&title=${title}`}>
            <a className="pub-slide-link">
              <div className={classNames('pub-slide-img', {'is-tall': isTall})}><img src={image} alt=""/></div>
              <div className="pub-slide-caption">
                <h4 className="pub-slide-title">{title}</h4>

                {!!type && <div className="pub-slide-type">{type}</div>}
                {!!description && !isTall && <div className="pub-slide-desc agencies-item-text">{description}</div>}
                <div className="pub-slide-meta">
                  {isHot && <b className="publications-item-label">HOT</b>}
                  {!!date && <time className="date">{moment(date).format('DD MMMM')}</time>}
                  {!!time && <time className="time">{time}</time>}
                  {!!visitTime && <time className="time">{visitTime + ' ' + [localization.guidesHourShort, localization.guidesDayShort][visitTimeType - 1]}</time>}
                  {!!city && <span className="city">{city}</span>}
                  {!!region && <span className="region">{region}</span>}
                </div>
              </div>
            </a>
          </Link>
        </div>
      )}
    </LocalizationContext.Consumer>
  );
};

PubSlide.propTypes = {
  title: string,
  slug: string,
  images: string,
  type: string,
  description: string,
  date: string,
  city: string,
  region: string,
  isTall: bool,
  isHot: bool,
  route: string
};

export default PubSlide;
