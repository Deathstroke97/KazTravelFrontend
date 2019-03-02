import React from 'react';
import { string, bool } from 'prop-types';
import classNames from "classnames";
import Link from "next/link";

const SpotItem = ({ title, slug, id, imagePath, type, description, date, city, region, isTall, path, time, query, isHot }) => {
  /* Зачем использовать title в роуте если slug для этого специально предназначен??? Slug должен гнерироваться из title на сервере при создании публикации - это уникальное поле взамен id чтобы в пути была чпу ссылка, а не /2 например если id юзать */
  return (
    <div className="pub-slide">

      <Link as={`${path}/${id}/${title}`} href={`${path}/${id}/${title}`}>
        <a className="pub-slide-link">
          <div className={classNames('pub-slide-img', {'is-tall': isTall})}><img src={imagePath} alt=""/></div>
          <div className="pub-slide-caption">
            <h4 className="pub-slide-title">{title}</h4>

            {!!type && <div className="pub-slide-type">{type}</div>}
            {!!description && !isTall && <div className="pub-slide-desc">{description}</div>}
            <div className="pub-slide-meta">
              {isHot && <b className="publications-item-label">HOT</b>}
              {!!date && <time className="date">{date}</time>}
              {!!time && <time className="time">{time}</time>}
              {!!city && <span className="city">{city}</span>}
              {!!region && <span className="region">{region}</span>}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

SpotItem.propTypes = {
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

export default SpotItem;
