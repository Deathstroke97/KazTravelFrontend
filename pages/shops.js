import React, { Component } from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';

import { Routes } from '../settings';

import { ShopsData } from '../app/pages/Shops/fixtures';

/**
 * Components
 */
import Content from '../app/common/ContentSection';
import Wrapper from '../app/common/Wrapper';
import ShopsContent from '../app/pages/Shops';

export default class Shops extends Component {

  static propTypes = {
    ShopsData: array
  }

  static async getInitialProps({ query: { slug } }) {
    return { data: ShopsData, slug }
  }

  render() {
    const {
      props: { data, originalURL, slug }
    } = this;

    return (
      <Wrapper className={classNames({
        'main--shape': !slug
      })} title="Shops">
        <Content isWide={!!slug}>
          <ShopsContent
            data={ data }
            slug={slug}
            originalURL={originalURL}
          />
        </Content>
      </Wrapper>
    );
  }
}
