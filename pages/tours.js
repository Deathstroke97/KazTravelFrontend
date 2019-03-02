import React, { Component } from 'react';
import { array, object, oneOfType } from 'prop-types';
import classNames from 'classnames';

import { ToursList, TourContent } from '../app/pages/Tours/fixtures';
/**
 * Components
 */
import Content from '../app/common/ContentSection';
import Wrapper from '../app/common/Wrapper';
import ToursContainer from '../app/pages/Tours';

export default class Tours extends Component {

  static propTypes = {
    data: oneOfType([array, object])
  }

  static async getInitialProps({ query: { slug } }) {
    return { data: slug ? TourContent : ToursList, slug }
  }

  render() {
    const {
      props: { data, slug, originalURL, lang }
    } = this;

    return (
      <Wrapper className="main--shape" title="Tours">
        <Content isWide={!!slug}>
          <ToursContainer data={data} slug={slug} originalURL={originalURL} />
        </Content>
        { lang === 'ru' ?
          <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
        :
          <script src="https://api-maps.yandex.ru/2.1/?lang=en_RU" type="text/javascript"></script>
        }
      </Wrapper>
    );
  }
}
