import React, { Component, Fragment } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import PropTypes from 'prop-types';
import { LocalizationContext } from '../../../context'


import { Routes } from '../../../settings';
import Breadcrumbs from '../../common/Breadcrumbs';
import SocialsUser from '../../common/Socials/SocialsUser';
import { contentGallery } from './fixtures';
import SpotSlider from '../../common/SpotSlider';

export default class ShopsContent extends Component {
  static propTypes = {
  }

  render() {
    const { data, originalURL } = this.props;
    if (!data) return null;
    data.gallery.forEach((item, index, array) => {
      array[index].image = item.imagePath;
      array[index].caption = item.description;
    });
    
    const center = data.latitude && data.longtitude ? [data.latitude, data.longtitude] : null;
    const placemark = center;
    
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <div className="container">
              <Breadcrumbs page={localization.shopSouvenirShops} path={Routes.shops}/>
              <div className="agency-img"><img src={`${data.profileImagePath}`} /></div> 
              <h1 className="content-title text-center">{data.name}</h1>
              <div className="agency-details">
                <div className="agency-details-address">{data.address}</div>
                <div className="agency-details-mail">{data.email}</div>
                <div className="agency-details-phone">{data.phones.map((el, key) => <span key={key}>{el.number}</span>)}</div>
                <SocialsUser 
                  info={{
                    facebook: data.facebook,
                    instagram: data.instagram,
                    telegram: data.telegram,
                    twitter: data.twitter,
                    youTube: data.youTube,
                    url: originalURL,
                    title: data.name,
                    desc: data.description,
                    img: data.profileImagePath,
                  }} 
                />
              </div>
              <div className="guide-about">
                <h2 className="content-subtitle">{localization.shopAboutSouvenirShop}</h2>
                <p className="agency-about-text">{data.description}</p>
              </div>

              <SpotSlider slides={data.gallery}/>
              
              { data.additionalInfo &&
                <div className="agency-about">
                  <h2 className="content-subtitle">{localization.shopAdditionalInformation}</h2>
                  <p className="agency-about-text">{data.additionalInfo}</p>
                </div>
              }

              {center && 
                <h3 className="content-subtitle">{localization.shopShopAtMap}</h3>
              }
            </div>
            
            {center &&
              <div className="shops-map">
                <YMaps>
                  <Map defaultState={{
                    center: center,
                    zoom: 17
                  }} width="100%" height="100%">
                    <Placemark geometry={placemark} defaultOptions={{
                      iconLayout: 'default#image',
                      iconImageHref: '/static/images/icons/icon-pin-1.svg',
                      iconImageSize: [54, 67],
                      iconImageOffset: [-27, -67]
                    }} />
                  </Map>
                </YMaps>
              </div>
            }


          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}

