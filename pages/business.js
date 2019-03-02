import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Wrapper from '../app/common/Wrapper';
import Container from '../app/common/ContentSection';
import BusinessContainer from '../app/pages/Business';

import { userSelector } from '../selectors/auth.selectors';
import { fetchData } from '../libs/fetchData'

export default class Business extends Component {
  static propTypes = {
  }

  static async getInitialProps(ctx) {

    const income = await fetchData(ctx, '/homePub/AboutProject');
    const data = income.result;
    
    return {
      data
    }

  }

  render() {
    const { data, originalURL } = this.props;

    return (
      <Wrapper title="For business" isIndex>
        <Container isWide>
          <BusinessContainer data={data} originalURL={originalURL} />
        </Container>
      </Wrapper>
    );
  }
}
