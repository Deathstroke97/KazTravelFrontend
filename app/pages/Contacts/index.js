import React, {Fragment, Component} from 'react';
import {array} from 'prop-types';
import {Map, Placemark, YMaps} from 'react-yandex-maps';
import Media from 'react-responsive';
import { LocalizationContext } from '../../../context'
import Link from 'next/link';
import { Routes } from '../../../settings';
import PageShareLink from '../../common/Socials/PageShareLink';

export default class ContactsContent extends Component {

  // static propTypes = {   data: Object }

  render() {
    const {lang, originalURL} = this.props;
    // const {data, slug} = this.props;
    // console.log('contacts', data, slug)
    const center = [51.130864, 71.423836];
    const placemark = [51.130864, 71.423836];
    
    const mapLang = lang === 'ru' ? 'ru_RU' : 'en_RU';

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="contacts">
            <PageShareLink info={{url: originalURL, title: localization.aboutTitle, desc: localization.footerContacts, img: '/static/images/logo-dark.svg'}} />
            <div className="container">
              <div className="content-section">
                <h1 className="content-title">{localization.footerContacts}</h1>
                <div className="contacts-list">
                  <div className="contacts-list__phone">
                    <img src="/static/images/icons/icon-phone.svg" alt=""/>
                    +7 (7172) 47-60-12
                  </div>
                  <div className="contacts-list__adress">
                    <img src="/static/images/icons/icon-address.svg" alt=""/>
                    {localization.footerContactsAdress}
                  </div>
                  <div className="contacts-list__email">
                    <img src="/static/images/icons/icon-mail.svg" alt=""/>
                    info@qaztourism.kz
                  </div>
                  <Link href={Routes.feedback}>
                    <a className="btn btn--blue">
                      <img src="/static/images/icons/icon-bubble.svg" alt=""/>
                      {localization.footerContactsContactUs}
                    </a>
                  </Link>
                </div>
                {/* {data.name}   */}
              </div>
            </div>

            <YMaps query={{lang: mapLang}}>
              <div className="map-container">
                <Map
                  defaultState={{
                  center,
                  zoom: 16
                }}
                  width="100%"
                  height="100%">
                  <Placemark
                    geometry={placemark}
                    defaultOptions={{
                    iconLayout: 'default#image',
                    iconImageHref: '/static/images/icons/icon-pin-1.svg',
                    iconImageSize: [
                      38, 47
                    ],
                    iconImageOffset: [-19, -47]
                  }}/>
                </Map>
              </div>
            </YMaps>
          </div>
        )}
      </LocalizationContext.Consumer>

    )
  }
}
