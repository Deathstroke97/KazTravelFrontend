import React, { Component, Fragment } from 'react';
import Collapsible from 'react-collapsible';
import { LocalizationContext } from '../../../context'

export default class HelpWebResources extends Component {

  _renderCollapsible = (localization) => {
    const {article} = this.props;
    if (!article) return null;

    return article.map((element, i) => (
      <Collapsible
        key={i}
        contentOuterClassName="web-list"
        triggerOpenedClassName="Collapsible__trigger_open"
        trigger={
          <div className="Collapsible__trigger__title">
            <h2 className="Collapsible__trigger__name">{element.category}</h2>
            <span className="Collapsible__trigger__total">({element.webResources.length} {localization.webresourcesTotal})</span>
          </div>
        }
      >
        {element.webResources.map((el, key) => {
          return (
            <a href={el.webReference} className="web-link" target="_blank" rel="noreferrer nofollow" key={key}>
              <figure key={key} className="web-list-item">
                <div className="web-list-icon"><img src={el.logoPath}  /></div>


                <figcaption>
                  <h4>{el.name}</h4>
                  <div className="web-list-source">
                    <img src="/static/images/icons/icon-source.svg" className="origin" />
                    <img src="/static/images/icons/icon-source-hover.svg" className="hover" />
                    <span>{el.webReference}</span>
                  </div>
                </figcaption>
              </figure>
            </a>
          )
        })}
      </Collapsible>
    ))
  }

  render() {
    return (
      <LocalizationContext.Consumer>
      {({localization}) => (
        <div className="container-help">
          <h1 className="content-title content-title--bounded">{localization.webresourcesTitle}</h1>
          {this._renderCollapsible(localization)}
        </div>
        )}
      </LocalizationContext.Consumer>
    )
  }
}
