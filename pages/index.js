import React, { Component, createContext } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Parallax } from 'react-scroll-parallax';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux';

import { fetchData } from '../libs/fetchData'

/**
 * Settings
 */
import { trendsSeasons } from '../settings';

/**
 * Actions
 */
import { setActiveArticle, setTrendsArticles, setSeason, setTrendsList } from '../store/actions/main-page.actions';

/**
 * Components
 */
import Wrapper from '../app/common/Wrapper';
import TopSlider from '../app/pages/MainPage/TopSlider';
import LinksBlock from '../app/pages/MainPage/ImageLinksBlock';
import DiscoverSection from '../app/pages/MainPage/Discover';
import WhereToGoSection from '../app/pages/MainPage/WhereToGo';
import TouristHelpSection from '../app/pages/MainPage/TouristHelp';
import HowToStart from '../app/pages/MainPage/HowToStart';
// import BestTours from '../app/pages/MainPage/BestTours';
// import Trending from '../app/pages/MainPage/Trending';
import Developments from '../app/pages/MainPage/Developments';
import PageShareLink from '../app/common/Socials/PageShareLink';

import { LocalizationContext } from '../context'

export const MainContext = createContext();

const mapStateToProps = ({ common: { viewport } }) => ({ viewport });

@connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class Index extends Component {
  static propTypes = {
    viewport: object
  }

  static async getInitialProps(ctx) {
    ctx.store.dispatch(showLoading())

    const slides = await fetchData(ctx, '/homePub/GetSlides')
    const topPublications = await fetchData(ctx, '/homePub/GetTopPublications')
    const nationalPublications = await fetchData(ctx, '/homePub/GetNationalPublications')
    const travelPublications = await fetchData(ctx, '/homePub/GetTravelPublications')
    const seasonPublications = await fetchData(ctx, '/homePub/GetSeasonPublications')
    const calendarEventBlocks = await fetchData(ctx, '/homePub/GetCalendarEventBlocks')
    const regionMap = await fetchData(ctx, '/homePub/GetRegionForMap')

    const REGION_MAP_CENTRALS = [{region: 4, center: 1}, {region: 6, center: 2}, {region: 17, center: 3}]

    let winterTrends = seasonPublications.result.filter(trend => trend.seasons === 0).map((trend, idx) => ({rank: idx+1, title: trend.title, id: trend.publicationId, type: 'winter'}))
    let springTrends = seasonPublications.result.filter(trend => trend.seasons === 1).map((trend, idx) => ({rank: idx+1, title: trend.title, id: trend.publicationId, type: 'spring'}))
    let summerTrends = seasonPublications.result.filter(trend => trend.seasons === 2).map((trend, idx) => ({rank: idx+1, title: trend.title, id: trend.publicationId, type: 'summer'}))
    let autumnTrends = seasonPublications.result.filter(trend => trend.seasons === 3).map((trend, idx) => ({rank: idx+1, title: trend.title, id: trend.publicationId, type: 'autumn'}))
    let trends = winterTrends.concat(springTrends).concat(summerTrends).concat(autumnTrends)
    let trendsArticles = seasonPublications.result.map(trendArticle => ({
      slug: 'events-in-astana',
      rankId: trendArticle.publicationId,
      image: trendArticle.imagePath,
      imageCaption: trendArticle.shortDescription,
      content: trendArticle.content
    }))

    let regionalCenter = regionMap.result.filter(region => REGION_MAP_CENTRALS.some(reg => reg.center === region.id)).map(region => ({
      title: region.name,
      id: region.id,
      description: region.description,
      gallery: region.gallery.map(img => ({title: img.description, image: img.imagePath}))
    }))

    let regionMapArray = regionMap.result.filter(region => !REGION_MAP_CENTRALS.some(reg => reg.center === region.id)).map(region => {
      let center, data = [
        {
          title: region.name,
          description: region.description,
          gallery: region.gallery.map(img => ({title: img.description, image: img.imagePath}))
        }
      ]

      let regionWithCenter = REGION_MAP_CENTRALS.find(reg => reg.region === region.id)

      if(regionWithCenter) {
        center = regionalCenter.find(reg => reg.id === regionWithCenter.center)
        data.push(center)
      }

      return {
        id: region.id,
        data
      }
    })

    await ctx.store.dispatch(setTrendsArticles(trendsArticles));
    await ctx.store.dispatch(setTrendsList(trends));
    await ctx.store.dispatch(setSeason(trendsSeasons[0]));
    ctx.store.dispatch(hideLoading())

    return {
      slides: slides.result,
      topPublications: topPublications.result,
      nationalPublications: nationalPublications.result,
      travelPublications: travelPublications.result,
      seasonPublications: seasonPublications.result,
      calendarEventBlocks: calendarEventBlocks.result,
      regionMapArray
    }
  }

  componentDidMount(){

  }

  render() {

    const {
      viewport,
      slides,
      topPublications,
      nationalPublications,
      travelPublications,
      calendarEventBlocks,
      regionMapArray,
      lang,
      originalURL,
    } = this.props;

    return (
      <Wrapper isIndex className="main--index" title="">
        <LocalizationContext.Consumer>
          {({localization}) => (
            <PageShareLink info={{url: originalURL, title: localization.aboutTitle, desc: localization.aboutWePresent, img: '/static/images/logo-dark.svg'}} />
          )}
        </LocalizationContext.Consumer>
        <Parallax
          offsetYMax="500px"
          offsetYMin="-500px"
          className="parallax-shape-1 parallax-shape"
        />

        {
          viewport.width > 1170 && (
            <Parallax
              offsetYMax={50}
              offsetYMin={-10}
              className="parallax-shape-bg"
              slowerScrollRate
            />
          )
        }



        <TopSlider lang={lang} slides={slides} viewport={viewport} />
        <LinksBlock lang={lang} topPublications={topPublications}  />
        <DiscoverSection lang={lang} nationalPublications={nationalPublications} />

        <WhereToGoSection regionMapArray={regionMapArray}/>



        <TouristHelpSection />
        <HowToStart lang={lang} travelPublications={travelPublications} viewport={viewport}/>

        {/* <BestTours /> */}

        {/* Temporarily disabled until content is ready */}
        {/* <Trending
          seasonPublications={this.props.seasonPublications}
          seasons={trendsSeasons}
        /> */}
        <Developments calendarEventBlocks={calendarEventBlocks}/>
      </Wrapper>
    );
  }
}
