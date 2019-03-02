import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ParallaxBanner } from 'react-scroll-parallax';

import { Routes } from '../../../settings';
import { LocalizationContext } from '../../../context'

/**
 * Components
 */
import Breadcrumbs from '../../common/Breadcrumbs';
import PageShareLink from '../../common/Socials/PageShareLink';

export default class BusinessContainer extends Component {
  static propTypes = {
    
  }

  render() {
    const { data, originalURL } = this.props;
    const regLink = Routes.auth.url + '/' + Routes.auth.reg;
    console.log(data)
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <PageShareLink info={{
              url: originalURL, 
              title: localization.bussinessNewOpportunities, 
              desc: localization.bussinessJoinOurService, 
              img: '/static/images/for-business-cover4.jpg'}} />
            <ParallaxBanner
              className="business-banner spot-banner"
              style={{height: '560px'}}
              layers={[
                {
                  image: '/static/images/for-business-cover4.jpg',
                  amount: 0.3,
                  slowerScrollRate: true,
                }
              ]}
            >
              <div className="container">
                <Breadcrumbs page={localization.menuForBusiness} path={Routes.business} />
                <h1 className="business-banner-title">{localization.bussinessNewOpportunities}</h1>
                <div className="business-banner-desc">{localization.bussinessJoinOurService}</div>
                <Link href={regLink}><a className="btn btn--blue">{localization.bussinessRegistration}</a></Link>
              </div>

            </ParallaxBanner>

            <div className="business-block business-block--color business-block-1">
              <div className="container">
                <div className="business-block-content">
                  <h3 className="content-title">{localization.bussinessTheLargestService}</h3>
                  <div className="content-text">{localization.bussinessNoAnalogues}</div>
                  <div className="content-article">
                    <ul>
                      <li>{localization.bussinessStats_1_1}{data.routes}{localization.bussinessStats_1_2}</li>
                      <li>{localization.bussinessStats_2_1}500{localization.bussinessStats_2_2}</li>
                      <li>{data.guides}{localization.bussinessStats_3}</li>
                      <li>{data.tourOperators}{localization.bussinessStats_4}</li>
                    </ul>
                  </div>

                </div>
                <div className="business-block-img">
                  <div className="business-block-img-1"><img src="/static/images/for business 2.png" alt=""/></div>
                  <div className="business-block-img-2" style={{transform: 'translate(10px,-30px)'}}><img src="/static/images/img-business-2.png" alt=""/></div>
                </div>
              </div>
            </div>

            <div className="business-block business-block--reverse business-block-2">
              <div className="container">
                <div className="business-block-content">
                  <h3 className="content-title">{localization.bussinessGuides}</h3>
                  <div className="content-text">{localization.bussinessHereYouCanFindGuide}</div>
                  <div className="content-article">
                    <ul>
                      <li>{localization.bussinessAdvantagesGuide_1}</li>
                      <li>{localization.bussinessAdvantagesGuide_2}</li>
                      <li>{localization.bussinessAdvantagesGuide_3}</li>
                    </ul>
                  </div>
                </div>
                <div className="business-block-img">
                <div className="business-block-img-3"><img src="/static/images/for business touroperator.png" alt=""/></div>
                  <div className="business-link">
                    <Link href={{ pathname: Routes.auth.url, query: {type: Routes.auth.reg,user: Routes.cabinet.guide}
                    }} as={`${regLink}?user=${Routes.cabinet.guide}`}><a className="btn btn--blue">{localization.bussinessRegistration}</a></Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="business-block business-block--color business-block-3">
              <div className="container">
                <div className="business-block-content">
                  <h3 className="content-title">{localization.bussinessOperator}</h3>
                  <div className="content-text">{localization.bussinessHereYouCanView}</div>
                  <div className="content-article">
                    <ul>
                      <li>{localization.bussinessAdvantagesOperator_1}</li>
                      <li>{localization.bussinessAdvantagesOperator_2}</li>
                      <li>{localization.bussinessAdvantagesOperator_3}</li>
                    </ul>
                  </div>
                </div>
                <div className="business-block-img">
                  <div className="business-block-img-4"><img src="/static/images/for business guides.png" alt=""/></div>
                  <div className="business-link">
                    <Link href={{
                      pathname: Routes.auth.url,
                      query: {
                        type: Routes.auth.reg,
                        user: Routes.cabinet.touroperator
                      }
                    }} as={`${regLink}?user=${Routes.cabinet.touroperator}`}><a className="btn btn--blue">{localization.bussinessRegistration}</a></Link>
                  </div>

                </div>
              </div>
            </div>

            <div className="business-block business-block--reverse business-block-4">
              <div className="container">
                <div className="business-block-content">
                  <h3 className="content-title">{localization.bussinessShop}</h3>
                  <div className="content-text">{localization.bussinessHereYouCanFindShop}</div>
                  <div className="content-article">
                    <ul>
                      <li>{localization.bussinessAdvantagesShop_1}</li>
                      <li>{localization.bussinessAdvantagesShop_2}</li>
                      <li>{localization.bussinessAdvantagesShop_3}</li>
                    </ul>
                  </div>

                </div>
                <div className="business-block-img">
                  <div className="business-block-img-5"><img src="/static/images/for business shops.png" alt=""/></div>
                  <div className="business-link">
                    <Link href={{
                      pathname: Routes.auth.url,
                      query: {
                        type: Routes.auth.reg,
                        user: Routes.cabinet.shop
                      }
                    }} as={`${regLink}?user=${Routes.cabinet.shop}`}><a className="btn btn--blue">{localization.bussinessRegistration}</a></Link>
                  </div>

                </div>
              </div>
            </div>

            <div className="business-block business-block--color business-block-5">
              <div className="container">
                <h3 className="content-title">{localization.bussinessHowToJoin}</h3>
                <ul className="clearlist business-how">
                  <li>
                    <h4>{localization.bussinessRegistration}</h4>
                    <p>{localization.bussinessSimpleRegistration}</p>
                  </li>
                  <li>
                    <h4>{localization.bussinessFillingProfile}</h4>
                    <p>{localization.bussinessWeWillHelp}</p>
                  </li>
                  <li>
                    <h4>{localization.bussinessReady}</h4>
                    <p>{localization.bussinessNowYouHaveProfile}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="business-block business-block--blue">
              <div className="container">
                <h3 className="content-title">{localization.bussinessRegisterNow}</h3>
                <div className="business-link"><Link href={regLink}><a className="btn">{localization.bussinessRegistration}</a></Link></div>
              </div>
            </div>

          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
