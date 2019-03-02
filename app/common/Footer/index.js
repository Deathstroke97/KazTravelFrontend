import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Media from 'react-responsive';
import Link from 'next/link';
// import { parseCookies } from 'nookies';
import { locStrings } from '../../../static/localization'
import { Routes } from '../../../settings';
import { parseCookies } from '../../../libs/cookies';

export default class Footer extends PureComponent {
  render() {
    let cookies = parseCookies()
    let { culture } = cookies
    let localization = locStrings[culture]
    let linkToMinCulture

    if(culture === 'kk') linkToMinCulture = 'https://www.mks.gov.kz/kaz/'
    if(culture === 'ru') linkToMinCulture = 'https://www.mks.gov.kz/rus/'
    if(!linkToMinCulture) linkToMinCulture = 'https://www.mks.gov.kz/eng/'

    return localization ? (
      <footer className="footer">
        <div className="container">
          <div className="footer-block">
            <div className="footer-logo footer-logo--kt">
              <Link href="/">
                <a>
                  <Media maxDeviceWidth={767}>
                    <img src="/static/images/logo-dark-center.svg" alt=""/>
                  </Media>
                  <Media minDeviceWidth={768}>
                    <img src="/static/images/logo-dark.svg" alt=""/>
                  </Media>
                </a>
              </Link>
            </div>
            <Link href={Routes.feedback}>
              <button type="button" className="footer-feed">{localization.footerContactUs}</button>
            </Link>
            <div className="footer-socials">
              <a href="https://www.facebook.com/TraveltoKazakhstan/" target="_blank"><img src="/static/images/icons/icon-facebook.svg" alt=""/></a>
              <a href="https://twitter.com/qazaqstantravel" target="_blank"><img src="/static/images/icons/icon-twitter.svg" alt=""/></a>
              <a href="https://www.instagram.com/travel.kazakhstan/" target="_blank"><img src="/static/images/icons/icon-instagram.svg" alt=""/></a>
              <a href="https://vk.com/kazakhstan.travel" target="_blank"><img src="/static/images/icons/icon-vk-blue.svg" alt=""/></a>
            </div>
          </div>
          <nav className="footer-menu">
            <Link href={Routes.business}>
              <a className="footer-menu-link">{localization.footerForBusiness}</a>
            </Link>
            <Link href={`${Routes.help.url}/${Routes.help.resources}`}>
              <a className="footer-menu-link">{localization.footerUsefulWebRes}</a>
            </Link>
            <Link href={Routes.partners}>
              <a>
                <span className="footer-menu-link">{localization.footerPartners}</span>
              </a>
            </Link>

            <Link href={Routes.privacy}>
              <a>
                <span className="footer-menu-link">{localization.footerAgreement}</span>
              </a>
            </Link>

            <Link href={Routes.about}>
              <a>
                <span className="footer-menu-link">{localization.footerAbout}</span>
              </a>
            </Link>


            <Link href={Routes.contacts}>
              <a>
                <span className="footer-menu-link">{localization.footerContacts}</span>
              </a>
            </Link>
            <Link href={Routes.feedback}>
              <a>
                <span className="footer-menu-link">{localization.footerFeedback}</span>
              </a>
            </Link>
          </nav>
          <div className="footer-block">
            <a className="footer-menu-logo-link" href={linkToMinCulture} target="_blank">
              <div className="footer-logo footer-logo--small"><img src="/static/images/logo-part.png" alt=""/></div>
              <div className="footer-text">{localization.footerMinOfCulture}</div>
            </a>
          </div>
          <div className="footer-block">
            <a className="footer-menu-logo-link" href="http://qaztourism.kz/" target="_blank">
              <div className="footer-logo footer-logo--small"><img src="/static/images/logo-kt-full.png" alt=""/></div>
              <div className="footer-text">{localization.footerKazTourJSC}</div>
            </a>
          </div>
        </div>
      </footer>
    ) : null
  }
}
