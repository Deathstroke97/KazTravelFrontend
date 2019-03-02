import React, { Component } from 'react';
import { string } from 'prop-types';
import Router from 'next/router';
import { fetchData } from '../libs/fetchData'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { Routes } from '../settings';

import Wrapper from '../app/common/Wrapper';
import Content from '../app/common/ContentSection';
import TouristHelpComponent from '../app/pages/TouristHelp';
import UniversalTextPage from '../app/common/UniversalTextPage'

import {destinationsList, webResourcesList} from '../app/pages/TouristHelp/fixtures';
import {phonesList, weatherList, transportList} from '../app/pages/TouristHelp/fixtures2';

@connect(null, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class TouristHelp extends Component {

  static propTypes = {
    type: string
  }

  static async getInitialProps(ctx) {
    ctx.store.dispatch(showLoading())

    const {query: { type }, res} = ctx;

    // if (!type || (type !== Routes.help.phones && type !== Routes.help.resources && type !== Routes.help.transport && type !== Routes.help.weather)) {
    const types = Object.entries(Routes.help).map(([key]) => key);
    const defaultRoute = `${Routes.help.url}/${Routes.help.about_kazakhstan}`;
    if (!type || types.indexOf(type) < 0) {
      ctx.store.dispatch(hideLoading())
      if (res) {
        res.redirect(defaultRoute);
        return null;
      }
      Router.push(defaultRoute, defaultRoute, { shallow: true });
    }

    // const data = {phonesList, weatherList, transportList, destinationsList, webResourcesList};
    let data;
    let title;
    switch (type) {
      case 'about_kazakhstan': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${91}`);
        data = income.result;
        title="About Kazakhstan"
        break;
      }
      case 'communications': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${90}`);
        data = income.result;
        title="Communication information"
        break;
      }
      case 'documents': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${79}`);
        data = income.result;
        title="How to get visa"
        break;
      }
      case 'customs': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${80}`);
        data = income.result;
        title="Customs rules"
        break;
      }
      case 'money_exchange': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${81}`);
        data = income.result;
        const rates = await fetchData(ctx, `/externalPub/GetExchangeData`);
        data.rates = rates.result;
        title="Currency rate"
        break;
      }
      case 'units': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${82}`);
        data = income.result;
        title="Measurement"
        break;
      }
      case 'time_zones': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${83}`);
        data = income.result;
        title="Time zones"
        break;
      }
      case 'language': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${84}`);
        data = income.result;
        title="Language"
        break;
      }
      case 'phones': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${87}`);
        data = income.result;
        title="Useful numbers"
        break;
      }
      case 'weather': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${85}`);
        data = income.result;
        // data = weatherList;
        title="Weather"
        break;
      }
      case 'transport': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${86}`);
        data = income.result;
        // data = transportList;
        data.destinationsList = destinationsList;
        title="Transport infrastructure"
        break;
      }
      case 'resources': {
        const income = await fetchData(ctx, '/homePub/GetWebResources');
        data = income.result;
        title="Useful web resources"
        break;
      }
      case 'electrical_connector': {
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${88}`);
        data = income.result;
        title="Plugs"
        break;
      }
    }

    ctx.store.dispatch(hideLoading())
    return { type, data, title };
  }

  render() {
    const { data, type, title, originalURL } = this.props;
    
    return (
      <Wrapper
        title={title}
      >
        <Content>
          <TouristHelpComponent
            data={data}
            type={type}
            originalURL={originalURL}
          />
        </Content>
        {/* <Content isWide>
                    <UniversalTextPage />
                </Content> */}
      </Wrapper>
    )
  }

}
