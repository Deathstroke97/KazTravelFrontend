import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { connect } from 'react-redux';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';

import SpotSlider from '../../common/SpotSlider';
import SimilarSlider from '../Publications/PublicationsSlider';
import { LocalizationContext } from '../../../context'
import { Routes } from '../../../settings';
import PageShareLink from '../../common/Socials/PageShareLink';

@connect(({ common: { viewport } }) => ({ viewport }))
export default class SpotDetail extends PureComponent {
  static propTypes = {
    content: object,
    viewport: object,
  }

  render() {
    const { data, originalURL, similar, routes, path, spot, lang, viewport: { width } } = this.props;
    if (!data) return null;
    const {
      id, title, imagePath, description, visitTime, page, tourObjectType, info, gallery, location, latitude, longtitude, zoom, content, costInformation
    } = data;

    const mapLang = lang === 'ru' ? 'ru_RU' : 'en_RU';

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <PageShareLink info={{url: originalURL, title: data.title, desc: data.description, img: data.imagePath}} />
            <ParallaxBanner
              className="spot-banner"
              style={{
                height: width > 1190 ? '620px' : width > 760 ? '560px' : '360px',
              }}
              layers={[
                {
                  image: imagePath,
                  amount: width > 760 ? 0.6 : 0.1,
                  slowerScrollRate: true,
                }
              ]}
            >
              <div className="container">
                <div className="spot-banner-type">{tourObjectType}</div>
                <h1 className="spot-banner-title">{title}</h1>
                <div className="spot-banner-desc">{description}</div>
              </div>

            </ParallaxBanner>

            {/*<div className="spot-banner" style={{ backgroundImage: `url(${image})` }}>*/}
              {/*<div className="container">*/}
                {/*<div className="spot-banner-type">{type}</div>*/}
                {/*<h1 className="spot-banner-title">{title}</h1>*/}
                {/*<div className="spot-banner-desc">{description}</div>*/}
              {/*</div>*/}
            {/*</div>*/}

            <div className="spot-info">
              <div className="container">
                {visitTime && visitTime.trim() &&
                  <figure className="spot-info-item">
                    <div className="spot-info-icon"><img src="/static/images/icons/icon-time-left.svg" alt="Time left"/></div>
                    <figcaption className="spot-info-caption">
                      <h4>{localization.touristSpotTimeToVisit}</h4>
                      <p>{visitTime}</p>
                    </figcaption>
                  </figure>
                }
                <figure className="spot-info-item">
                  <div className="spot-info-icon"><img src="/static/images/icons/icon-cost.svg" alt="Time left"/></div>
                  <figcaption className="spot-info-caption">
                    <h4>{localization.touristSpotVisitCost}</h4>
                    <p>{costInformation}</p>
                  </figcaption>
                </figure>
                <figure className="spot-info-item">
                  <div className="spot-info-icon"><img src="/static/images/icons/icon-location.svg" alt="Time left"/></div>
                  <figcaption className="spot-info-caption">
                    <h4>{localization.touristSpotLocation}</h4>
                    <p>{location}</p>
                  </figcaption>
                </figure>
                {/* <figure className="spot-info-item">
                  <div className="spot-info-icon"><img src="/static/images/icons/icon-weather.svg" alt="Time left"/></div>
                  <figcaption className="spot-info-caption">
                    <h4>{localization.touristSpotWeather}</h4>
                    <p>{info.weather}</p>
                  </figcaption>
                </figure> */}
              </div>
            </div>

             <div className="spot-content">
              <div className="container">
                <h2 className="content-title">{title}</h2>
                <h3 className="content-subtitle content-subtitle--line">{description}</h3>
                <div className="content-text" dangerouslySetInnerHTML={{__html: content}} />

                {
                  !!gallery && !!gallery.length && <SpotSlider slides={gallery} />
                }



                {/* <div className="content-text" dangerouslySetInnerHTML={{__html: page.text_2}} /> */}
              </div>
             </div>

            {/* <div className="container">
              <div className="publications-tags publications-tags--border">
                <a href="" className="tag-link">#Architectural sight</a>
                <a href="" className="tag-link">#Oasis</a>
              </div>
            </div> */}

            {
              !!latitude && longtitude && (
                <div className="spot-location">
                  <div className="container">
                    <h3 className="content-title">{localization.touristSpotAtMmap}</h3>
                  </div>
                  <div className="spot-map">
                    <YMaps query={{lang: mapLang}}>
                      <Map defaultState={{center: [latitude, longtitude], zoom: zoom !== 0 ? zoom : 10}} width="100%" height="100%">
                        <Placemark geometry={[latitude, longtitude]} defaultOptions={{
                          iconLayout: 'default#image',
                          iconImageHref: '/static/images/icons/icon-pin-1.svg',
                          iconImageSize: [54, 67],
                          iconImageOffset: [-27, -67]
                        }} />
                      </Map>
                    </YMaps>
                  </div>
                </div>
              )
            }

            <div className="container">
              <SimilarSlider lang={lang} title={localization.touristSpotTouristsRoutes} path={`${Routes.tours}`} list={routes} />
              <SimilarSlider lang={lang} title={localization.touristSpotSimilarAttractions} path={path} list={similar} />
            </div>




          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
