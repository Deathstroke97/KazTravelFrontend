import React, { Component } from 'react';
import { string, oneOf, object } from 'prop-types';
import classNames from 'classnames';
import { fetchData } from '../libs/fetchData'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { Routes } from '../settings';

import { regionContent } from '../app/pages/WhereToGo/fixtures';

/**
 * Components
 */
import Content from '../app/common/ContentSection';
import Wrapper from '../app/common/Wrapper';
import RegionPage from '../app/pages/WhereToGo/RegionPage';
import TripIdeasPage from '../app/pages/WhereToGo/TripIdeasPage';

@connect(null, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class WhereToGo extends Component {
  static propTypes = {
    slug: string.isRequired,
    type: oneOf([Routes.whereToGo.region, Routes.whereToGo.trip]).isRequired,
    pathname: string
  }

  static async getInitialProps(ctx) {
    const {query: { slug, type }, pathname, req, res} = ctx
    ctx.store.dispatch(showLoading())

    //const tripIdeaContent = await fetchData(ctx, `/blogPub/GetBlog?id=${slug}`)

    if (!slug || (!type || (type !== Routes.whereToGo.trip && type !== Routes.whereToGo.region))) {
      res.redirect('/');
    }

    let tripIdeaContent = []
    if (type === Routes.whereToGo.trip) {
      const income = await fetchData(ctx, `/blogPub/GetBlog?id=${slug}`);
      tripIdeaContent = income.result;
    }
    let regionContent = [];
    if (type === Routes.whereToGo.region) {
      const income = await fetchData(ctx, `/regionPub/GetById?id=${slug}`);
      regionContent = income.result;

      const income2 = await fetchData(ctx, `/regionPub/GetSimilarTourObjects?id=${slug}`);
      regionContent.spots = income2.result;
      regionContent.spots.forEach((item, index, array) => {
        array[index].slug = `${Routes.spot}/${item.id}/${item.title}`;
      });

      const income3 = await fetchData(ctx, `/regionPub/GetSimilarEvents?id=${slug}&count=3`);
      regionContent.events = income3.result;
      regionContent.events.forEach((item, index, array) => {
        array[index].image = item.baseImagePath;
        array[index].slug = String(item.id);
        array[index].date = item.startDate;
        array[index].type = item.eventType;
      });

      const income4 = await fetchData(ctx, `/regionPub/GetSimilarBlogs?id=${slug}&count=3`);
      regionContent.publications = income4.result;
      regionContent.publications.forEach((item, index, array) => {
        array[index].image = item.baseImagePath;
        array[index].date = item.publishDate;
        array[index].slug = String(item.id);
      });

    }

    ctx.store.dispatch(hideLoading())
    return {
      slug,
      type,
      pathname,
      regionContent,
      tripIdeaContent: tripIdeaContent
    }
  }

  render() {

    const {
      slug,
      type,
      pathname,
      regionContent,
      tripIdeaContent,
      originalURL,
      lang,
    } = this.props;
    if (regionContent && regionContent.gallery) {
      regionContent.gallery.forEach((item, index, array) => {
        array[index].caption = item.description;
      })
    }

    return  (
      <Wrapper
        title={type === Routes.whereToGo.region ? 'Region' : 'Trip Idea'}
        isIndex={type === Routes.whereToGo.region}
      >
        <Content isWide>
          {
            type === Routes.whereToGo.region && <RegionPage data={regionContent} lang={lang} originalURL={originalURL} />
          }
          {
            type === Routes.whereToGo.trip && <TripIdeasPage content={tripIdeaContent} pathname={pathname} originalURL={originalURL} />
          }
        </Content>
      </Wrapper>
    );
  }
}
