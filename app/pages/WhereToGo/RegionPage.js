import React, { Component, Fragment } from 'react';
import { array } from 'prop-types';

import SpotSlider from '../../common/SpotSlider';
import MapWithAttractions from '../../common/MapWithAttractions';
import { Routes } from '../../../settings';
import Slider from "../Publications/PublicationsSlider";
import { LocalizationContext } from '../../../context'
import PageShareLink from '../../common/Socials/PageShareLink';

export default class RegionPage extends Component {
  static propTypes = {
    data: array
  }
  render() {
    const { data, lang, originalURL }  = this.props;
    if (!data) return null;
    const { id, title, baseImagePath, description, content, gallery, timeZone, centralCity, tourObjectCount,
            latitude, longtitude, zoom, logoPath, site, link, spots, spots1, events, publications} = data;

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <PageShareLink info={{url: originalURL, title: title, desc: description, img: baseImagePath}} />
            <div className="spot-banner region-banner" style={{ backgroundImage: `url(${baseImagePath})` }}>
              <div className="container">
                <h1 className="spot-banner-title">{title}</h1>
                <div className="spot-banner-desc">{description}</div>
                {/* <div className="region-map">
                  <img src="/static/images/regions/almaty-region-map.svg" alt=""/>
                </div> */}
              </div>
            </div>

            <div className="spot-info">
              <div className="container">
                <figure className="spot-info-item">
                  <div className="spot-info-icon"><img src="/static/images/icons/icon-time-left.svg" alt="Time left"/></div>
                  <figcaption className="spot-info-caption">
                    <h4>{localization.visitCardTimeZone}</h4>
                    <p>{timeZone}</p>
                  </figcaption>
                </figure>
                { title !== centralCity &&
                  <figure className="spot-info-item">
                    <div className="spot-info-icon"><img src="/static/images/icons/icon-location.svg" alt="Center"/></div>
                    <figcaption className="spot-info-caption">
                      <h4>{centralCity}</h4>
                      <p>{localization.visitCardRegionCentre}</p>
                    </figcaption>
                  </figure>
                }
                <figure className="spot-info-item">
                  <div className="spot-info-icon"><img src="/static/images/icons/icon-spots.svg" alt="Spots"/></div>
                  <figcaption className="spot-info-caption">
                    <h4>{tourObjectCount}</h4>
                    <p>{localization.visitCardTouristSpot}</p>
                  </figcaption>
                </figure>
                {/* <figure className="spot-info-item">
                  <div className="spot-info-icon"><img src="/static/images/icons/icon-weather.svg" alt="Time left"/></div>
                  <figcaption className="spot-info-caption">
                    <h4>{localization.visitCardWeather}</h4>
                    <p>{info.weather}</p>
                  </figcaption>
                </figure> */}
              </div>
            </div>

            <div className="region-content spot-content">
              <div className="container">
                <h2 className="content-title">{title}</h2>
                <article className="content-article">
                  {/* <h4>{description}</h4> */}
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </article>
                <div className="region-link">
                  <img src={logoPath} alt=""/>
                  {/* <a href={site} className="under-link"><b>{link.title}</b></a> */}
                  <a href={site} className="under-link" target="_blank"><b>{site}</b></a>
                </div>
              </div>

            </div>

            {Array.isArray(spots) && spots.length > 0 &&
              <MapWithAttractions
              center={[latitude, longtitude]}
              zoom={zoom}
              spots={spots}
              lang={lang}
            />
          }

            {Array.isArray(gallery)  && gallery.length > 0 &&
              <div className="container">
                <h3 className="content-title">{localization.visitCardPhotoGallery}</h3>
                <SpotSlider slides={gallery} />
              </div>
            }

            {/* <div className="spot-content spot-content--color region-content">
              <div className="container">
                <Slider list={spots} title="Tourists spot of Almaty" path={Routes.spot}/>
              </div>

            </div> */}

            <div className="container">
              {/* <Slider list={spots1} title="Tourists routes" path={Routes.spot} allLink="All routes"/> */}
              {events && events.length > 0 &&
                <Slider lang={lang} list={events} region={id} title={localization.visitCardEvents} isTall path={Routes.events} allLink={localization.visitCardAllEvents}/>
              }
              {publications && publications.length > 0 &&
                <Slider lang={lang} list={publications} region={id} title={localization.visitCardPublications} path={Routes.publications} allLink={localization.visitCardAllPublications}/>
              }
            </div>

          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
