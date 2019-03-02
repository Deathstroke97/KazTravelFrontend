import React, { Component, Fragment } from 'react';

import Content from '../../common/ContentSection';

export default class UniversalTextPage extends Component {
  render() {
    const { article: { content, title }} = this.props;
    return (
      <Fragment>

          <h1 className="content-title content-title--bounded" style={{marginBottom:'80px'}}>{title}</h1>
          <article className="container container--narrow content-article" dangerouslySetInnerHTML={{__html: content}} />

      </Fragment>
    )
  }
}
