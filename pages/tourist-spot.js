import React, { Component } from 'react';
import { func, string } from 'prop-types';
import classNames from 'classnames';
import { fetchData } from '../libs/fetchData'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

/**
 * Components
 */
import Wrapper from '../app/common/Wrapper';
import Content from '../app/common/ContentSection';
import TouristSpotComponent from '../app/pages/TouristSpot';

import { spotTypes, spotList, spotDetail } from '../app/pages/TouristSpot/fixtures';
import { LocalizationContext } from '../context'

@connect(null, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class TouristSpot extends Component {

  static propTypes = {
    slug: string,
    spot: string

  }

  static async getInitialProps(ctx) {
    ctx.store.dispatch(showLoading())

    const { query: { slug, spot, title, filter }, pathname } = ctx;

    const income1 = await fetchData(ctx, '/tourObjectPub/GetCategoryList');
    let data = null;
    data = income1 && income1.result;

    if (slug) {
      const income1 = await fetchData(ctx, `/tourObjectPub/GetById?id=${slug}`);
      let spotDetail = null;
      spotDetail = income1 && income1.result;

      const income3 = await fetchData(ctx, `/tourObjectPub/GetSimilarTourObjects?id=${slug}`);
      let spotList = null;
      spotList = income3 && income3.result;
      spotList = spotList.map(el => {
        el.slug = String(el.id);
        el.image = el.imagePath;
        return el;
      })

      const income2 = await fetchData(ctx, `/tourObjectPub/GetSimilarRoutes?id=${slug}`);
      let routesList = null;
      routesList = income2 && income2.result;
      routesList = routesList.map(el => {
        el.slug = String(el.id);
        el.image = el.imagePath;
        el.type = el.tourCategory;
        el.title = el.name;
        return el;
      })

      ctx.store.dispatch(hideLoading())

      return {
        slug,
        spot,
        title,
        data: spotDetail,
        similar: spotList,
        routes: routesList,
      }
    }

    if (spot) {
      ctx.store.dispatch(hideLoading())

      return {
        title: data.find(el => el.id === parseInt(spot)).title,
        filter,
        spot
      }
    }

    const income2 = await fetchData(ctx, '/tourObjectPub/GetTypeList');
    let fullList = null;
    fullList = income2 && income2.result;

    ctx.store.dispatch(hideLoading())

    return {
      data, fullList
    }
  }

  render() {
    const {
      props: { slug, spot, filter, data, fullList, title, similar, routes, lang, originalURL }
    } = this;

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Wrapper
            className={classNames({
              'main--shape': !slug
            })}
            title={localization.touristSpot}
            isIndex={!!slug}
          >
            <Content isWide={!!slug}>
              <TouristSpotComponent
                slug={slug}
                spot={spot}
                filter={filter}
                data={data}
                fullList={fullList}
                spotTitle={title}
                itemTitle={title}
                similar={similar}
                routes={routes}
                lang={lang}
                originalURL={originalURL}
              />
            </Content>
          </Wrapper>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
