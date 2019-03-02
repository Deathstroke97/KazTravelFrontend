import React, { Component, Fragment } from 'react';

import Content from '../../common/ContentSection';

export default class UniversalTextPage extends Component {
  render() {
    const { article: { content, title }} = this.props;
    return (
      <Fragment>
        <h1 className="content-title content-title--bounded">{title}</h1>
        <div className="container--narrow">
          <article className="content-article" dangerouslySetInnerHTML={{__html: content}} />
        </div>




      </Fragment>
    )
  }
}
