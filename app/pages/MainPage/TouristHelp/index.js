import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WOW from 'react-wow';
import { Parallax } from 'react-scroll-parallax';
import Content from '../../../common/ContentSection';
import MainTitle from '../MainTitle/index';
import { LocalizationContext } from '../../../../context'
import Link from 'next/link';
import { Routes } from '../../../../settings';

export default class TouristHelpSection extends Component {
  static propTypes = {
  }

  render() {
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Content>
            <Parallax
              offsetYMax="500px"
              offsetYMin="-300px"
              className="parallax-shape-2 parallax-shape"
            />
            <MainTitle name={localization.mainPageUsefulInfo} />
            <WOW
              offset={-200}
            >
              <div className="tourist-help">
                <Link href={`${Routes.help.url}/${Routes.help.documents}`}>
                  <a className="tourist-help-link">
                    <div className="tourist-help-icon"><img src="/static/images/icons/icon-help-0.svg" alt=""/></div>
                    <div className="tourist-help-title">{localization.mainPageUsefulInfoPassports}</div>
                    <div className="tourist-help-text">{localization.mainPageUsefulInfoPassportsText}</div>
                  </a>
                </Link>
                <Link href={`${Routes.help.url}/${Routes.help.transport}`}>
                  <a className="tourist-help-link">
                    <div className="tourist-help-icon"><img src="/static/images/icons/icon-help-1.svg" alt=""/></div>
                    <div className="tourist-help-title">{localization.mainPageUsefulInfoHowToGetThere}</div>
                    <div className="tourist-help-text">{localization.mainPageUsefulInfoHowToGetThereText}</div>
                  </a>
                </Link>
                <Link href={`${Routes.help.url}/${Routes.help.money_exchange}`}>
                  <a className="tourist-help-link">
                    <div className="tourist-help-icon"><img src="/static/images/icons/icon-help-2.svg" alt=""/></div>
                    <div className="tourist-help-title">{localization.mainPageUsefulInfoCurrencyRate}</div>
                    <div className="tourist-help-text">{localization.mainPageUsefulInfoCurrencyRateText}</div>
                  </a>
                </Link>
                <Link href={`${Routes.help.url}/${Routes.help.weather}`}>
                  <a className="tourist-help-link">
                    <div className="tourist-help-icon"><img src="/static/images/icons/icon-help-3.svg" alt=""/></div>
                    <div className="tourist-help-title">{localization.mainPageUsefulInfoBestSeason}</div>
                    <div className="tourist-help-text">{localization.mainPageUsefulInfoBestSeasonText}</div>
                  </a>
                </Link>
              </div>
            </WOW>
          </Content>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
