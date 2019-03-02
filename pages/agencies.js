import React, { Component } from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';

import { Routes } from '../settings';

import { AgenciesData } from '../app/pages/Agencies/fixtures';

/**
 * Components
 */
import Content from '../app/common/ContentSection';
import Wrapper from '../app/common/Wrapper';
import AgenciesContent from '../app/pages/Agencies';

export default class Agencies extends Component {

  // static propTypes = {
  //   AgenciesData: array
  // }

  static async getInitialProps(ctx) {
    const {query: {slug}} = ctx;
    const data = AgenciesData;
    if (slug) {
      return {
        data: AgenciesData.filter( el => el.slug === slug),
        slug
      }

    }
    return { slug, data }
  }

  render() {
    const {
      props: { slug, data, originalURL }
    } = this;

    return (
      <Wrapper className={classNames({'main--shape ': !slug})} title="Agencies">
        <Content isWide={false}>
          <AgenciesContent
            slug={slug}
            originalURL={originalURL}
            data={data} />
        </Content>
      </Wrapper>
    );
  }
}
