import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import { Routes } from '../../../../../settings';

export default class MenuType_2 extends PureComponent {
  static propTypes = {
  }

  render() {
    const { localization } = this.props
    const r = Routes.help;

    return (
      <Fragment>
        <h3 className="submenu-title">{localization.menu2PlanYourTrip}</h3>
        <aside className="submenu-sidebar">
          <nav className="submenu-nav">
            <Link as={`${r.url}/${r.about_kazakhstan}`} href={`${r.url}/${r.about_kazakhstan}`} >
              <a className="submenu-nav-link">{localization.menu2AboutKazakhstan}</a>
            </Link>
            <Link as={`${r.url}/${r.documents}`} href={`${r.url}/${r.documents}`} >
              <a className="submenu-nav-link">{localization.menu2GetVisa}</a>
            </Link>
            <Link as={`${r.url}/${r.customs}`} href={`${r.url}/${r.customs}`} >
              <a className="submenu-nav-link">{localization.menu2CustomRules}</a>
            </Link>
            <Link as={`${r.url}/${r.money_exchange}`} href={`${r.url}/${r.money_exchange}`} >
              <a className="submenu-nav-link">{localization.menu2CurrencyRate}</a>
            </Link>
            <Link as={`${r.url}/${r.time_zones}`} href={`${r.url}/${r.time_zones}`} >
              <a className="submenu-nav-link">{localization.menu2TimeZone}</a>
            </Link>
            <Link as={`${r.url}/${r.language}`} href={`${r.url}/${r.language}`} >
              <a className="submenu-nav-link">{localization.menu2Lang}</a>
            </Link>
            <Link as={`${r.url}/${r.weather}`} href={`${r.url}/${r.weather}`} >
              <a className="submenu-nav-link">{localization.menu2Weather}</a>
            </Link>
            <Link as={`${r.url}/${r.communications}`} href={`${r.url}/${r.communications}`} >
              <a className="submenu-nav-link">{localization.menu2Communication}</a>
            </Link>
            <Link as={`${r.url}/${r.transport}`} href={`${r.url}/${r.transport}`} >
              <a className="submenu-nav-link">{localization.menu2TransportInfrastr}</a>
            </Link>
            <Link as={`${r.url}/${r.phones}`} href={`${r.url}/${r.phones}`} >
              <a className="submenu-nav-link">{localization.menu2UsefulNumbers}</a>
            </Link>
            <Link as={`${r.url}/${r.units}`} href={`${r.url}/${r.units}`} >
              <a className="submenu-nav-link">{localization.menu2Measurement}</a>
            </Link>
            <Link as={`${r.url}/${r.electrical_connector}`} href={`${r.url}/${r.electrical_connector}`} >
              <a className="submenu-nav-link">{localization.menu2Plugs}</a>
            </Link>
            <Link as={`${r.url}/${r.resources}`} href={`${r.url}/${r.resources}`} >
              <a className="submenu-nav-link">{localization.menu2UsefulWebRes}</a>
            </Link>
          </nav>
        </aside>
        <div className="submenu-helps">
          <Link href={Routes.guides}>
            <a className="submenu-helps-link">
              <span>
                <img src="/static/images/icons/icon-guides.png" width={102}/>
                <img src="/static/images/icons/icon-guides-hover.png" width={102} className="hover"/>
              </span>
              {localization.menu2Guides}
            </a>
          </Link>
          <a href={Routes.agencies} className="submenu-helps-link">
            <span>
              <img src="/static/images/icons/icon-plane.png" width={108} />
              <img src="/static/images/icons/icon-plane-hover.png" width={108} className="hover" />
            </span>
            {localization.menu2TravelAgency}
          </a>
          <Link href={Routes.spot}>
            <a className="submenu-helps-link">
              <span>
                <img src="/static/images/icons/icon-spot.png" alt="" width={102}/>
                <img src="/static/images/icons/icon-spot-hover.png" alt="" width={102} className="hover"/>
              </span>
              {localization.menu2TouristSpot}
            </a>
          </Link>
          <Link href={Routes.shops}>
            <a className="submenu-helps-link">
              <span>
                <img src="/static/images/icons/icon-souv.png" alt="" width={98} />
                <img src="/static/images/icons/icon-souv-hover.png" alt="" width={98} className="hover" />
              </span>
              {localization.menu2SouvenirShop}
            </a>
          </Link>
        </div>
      </Fragment>
    );
  }
}
