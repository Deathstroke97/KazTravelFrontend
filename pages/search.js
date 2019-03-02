import React, { Component } from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchData } from '../libs/fetchData'

import { Routes } from '../settings';

import { ContactsData } from '../app/pages/Contacts/fixtures';

/**
 * Components
 */
import Content from '../app/common/ContentSection';
import Wrapper from '../app/common/Wrapper';
import SearchContent from '../app/pages/Search';

@connect(null, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class Search extends Component {

  // static propTypes = {
  //   AgenciesData: array
  // }

  static async getInitialProps(ctx) {
    ctx.store.dispatch(showLoading())

    const {query: { request }} = ctx

    let data = await fetchData(ctx, `/homePub/Search?text=${request}`)

    ctx.store.dispatch(hideLoading())
    return { data: data.result, request }
  }

  render() {
    const {
      props: { data, request, lang }
    } = this;

    return (
      <Wrapper className={classNames('main--shape isWide')} title="Contacts">
        <Content isWide>
          <SearchContent
            lang={lang}
            request={request}
            data={data} />
        </Content>
      </Wrapper>
    );
  }
}
