import React, { Component } from 'react';
import Link from 'next/link';
import uniqid from 'uniqid';
import { object } from 'prop-types';
import { Routes } from '../../../settings';
import { LocalizationContext } from '../../../context'

export default class GuidesItem extends Component {

  state = {
    langs: {
      visible: [],
      hidden: []
    },
    specs: {
      visible: [],
      hidden: []
    }
  }

  componentDidMount() {
    const { language, guideSpecializations } = this.props;
    const langs = language.reduce((acc, el, i) => {
      if (i < 3) {
        acc.visible.push(el);
      } else {
        acc.hidden.push(el)
      }
      return acc;
    }, this.state.langs);
    const specs = guideSpecializations.reduce((acc, el, i) => {
      if (i < 2) {
        acc.visible.push(el);
      } else {
        acc.hidden.push(el)
      }
      return acc;
    }, this.state.specs)
    this.setState({ langs, specs });
  }

  showAllLangs = e => {
    e.preventDefault();
    const { language } = this.props;
    this.setState({
      langs: {
        visible: language,
        hidden: []
      }
    })
  }

  showAllSpecs = e => {
    e.preventDefault();
    const { guideSpecializations } = this.props;
    this.setState({
      specs: {
        visible: guideSpecializations,
        hidden: []
      }
    });
  }

  render() {
    const { name, surname, guideSpecializations, region, phone, cost, costType, id, profileImageId } = this.props;
    const { langs, specs } = this.state;
    const styleLogo = {
      width: '63px',
      height: '63px',
      background: `url(${profileImageId}) no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      borderRadius: '50%',
    };

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <li className="guides-item">

            <div className="guides-item-wrapper">
              <div className="guides-item-title">
                <div className="guides-item-title-img" style={styleLogo} />
                <Link href={`${Routes.guides}?slug=${id}&title=${surname}-${name}`} as={`${Routes.guides}/${id}/${surname}-${name}`}>
                  <a><h3 className="guides-item-title-text">{surname} {name}</h3></a>
                </Link>
              </div>
              <div className="guides-item-type">
                {specs.visible.map(val => <span className="guides-item-type-text" key={uniqid()}>{val.title}</span>)}
                {!!specs.hidden.length && <a href="" onClick={this.showAllSpecs}>{localization.guidesAnd} {specs.hidden.length} {localization.guidesMore}</a>}
              </div>
            </div>

            <div className="guides-item-wrapper">
              <div className="guides-item-cost">
                <span className="guides-item-cost-text">
                  {localization.guidesCost}: <b>{localization.guidesFrom} {cost} {localization.guidesTenge} / {[localization.guidesHour, localization.guidesDay][costType-1]}</b>
                </span>
              </div>
            </div>

            <div className="guides-item-wrapper">
              <div className="guides-item-language">
                <span className="guides-item-language-text">{localization.guidesLanguages}</span>
                {langs.visible.map(val => <span className="guides-item-language-text" key={uniqid()}>{val.title}</span>)}
                {!!langs.hidden.length && <a href="" onClick={this.showAllLangs}>{localization.guidesAnd} {langs.hidden.length} {localization.guidesMore}</a>}
              </div>
            </div>

            <div className="guides-item-wrapper">
              {region && <span className="guides-item-city">{region}</span>}
              { phone && <span className="guides-item-phone">{phone}</span> }

            </div>
          </li>
        )}
      </LocalizationContext.Consumer>
    )
  }

}
