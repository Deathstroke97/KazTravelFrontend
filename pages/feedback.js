import React, { Component } from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';

import { Routes } from '../settings';

/**
 * Components
 */
import Content from '../app/common/ContentSection';
import Wrapper from '../app/common/Wrapper';
import Feedback from '../app/pages/Feedback';

export default class FeedbackPage extends Component {
  render() {
    const { api, originalHost, lang, originalURL } = this.props

    return (
      <Wrapper className={classNames('main--shape')} title="Contacts">
        <Content>
          <Feedback 
            api={api} 
            originalHost={originalHost} 
            originalURL={originalURL}
            lang={lang}/>
        </Content>
      </Wrapper>
    );
  }
}
