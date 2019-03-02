import React, { Component } from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';

import { Routes } from '../settings';

import { ContactsData } from '../app/pages/Contacts/fixtures';

/**
 * Components
 */
import Content from '../app/common/ContentSection';
import Wrapper from '../app/common/Wrapper';
import ContactsContent from '../app/pages/Contacts';

export default class Contacts extends Component {

  // static propTypes = {
  //   AgenciesData: array
  // }

  static async getInitialProps(ctx) {
    let data = ContactsData;
    return { data }
  }

  render() {
    const {
      props: { data, lang, originalURL }
    } = this;
    
    return (
      <Wrapper className={classNames('main--shape main--shape-1 isWide')} title="Contacts">
        <Content isWide>
          <ContactsContent
            data={data} 
            originalURL={originalURL}
            lang={lang} />
        </Content>
      </Wrapper>
    );
  }
}
