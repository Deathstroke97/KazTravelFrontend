import React, { Component } from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';

import { Routes } from '../settings';
import { fetchData } from '../libs/fetchData'

import { GuidesData } from '../app/pages/Guides/fixtures';

/**
 * Components
 */
import Content from '../app/common/ContentSection';
import Wrapper from '../app/common/Wrapper';
import GuidesContent from '../app/pages/Guides';

export default class Guides extends Component {

  static propTypes = {
    GuidesData: array
  }

  static async getInitialProps(ctx) {
    const { query: { slug } } = ctx;

    return { slug }
  }

  render() {
    const {
      props: { totalCount, data, slug, originalURL }
    } = this;

    return (
      <Wrapper className={classNames({
        'main--shape': !slug
      })} title="Guides">
        <Content isWide={false}>
          <GuidesContent data={data} totalCount={totalCount}  slug={slug} originalURL={originalURL} />
        </Content>
      </Wrapper>
    );
  }
}
