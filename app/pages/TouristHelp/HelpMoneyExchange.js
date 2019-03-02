import React, { Component, Fragment } from 'react';

import Content from '../../common/ContentSection';

export default class UniversalTextPage extends Component {
  render() {
    const { article: { content, title, rates }} = this.props;

    const currencies = {EUR: '', USD: '', RUB: '', CNY: '',}
    rates.forEach(el => currencies[el.code] = (10000 / el.value).toFixed(2));
    
    return (
      <Fragment>
        <Content isWide>
          <h1 className="content-title content-title--bounded">{title}</h1>
          <article className="container container--narrow content-article" dangerouslySetInnerHTML={{__html: content}} />
          <div className="container container--narrow">
              <div className="publications-price-block">
              <div className="publications-price-block-item publications-price-block-item--main">
                  10 000 KZT ≈
              </div>
              <div className="publications-price-block-item">{currencies.EUR} EUR</div>
              <div className="publications-price-block-item">{currencies.USD} USD</div>
              <div className="publications-price-block-item">{currencies.RUB} RUB</div>
              <div className="publications-price-block-item">{currencies.CNY} CNY</div>
              {/* <div className="publications-price-block-item">3 034.59 JPY</div> */}
              </div>
          </div>
        </Content>
      </Fragment>
    )
  }
}
