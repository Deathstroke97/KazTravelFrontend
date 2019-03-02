import React, { Component, Fragment} from 'react';
import { array, object } from 'prop-types';
import id from 'uniqid';
import Link from 'next/link';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import Select from 'react-select'

import { Routes } from '../../../settings';
import Breadcrumps from '../../common/Breadcrumbs';
import SortBlock from '../../common/SortBlock';
import SimilarSlider from '../Publications/PublicationsSlider';
import ContentSlider from '../../common/ContentSlider';
import { fetchData } from '../../../libs/fetchData';
import { LocalizationContext } from '../../../context';
import PageShareLink from '../../common/Socials/PageShareLink';

export default class ThemesContent extends Component {
  state = {
    item: null,
    region: {},

    listOfAttractions: [],
    listOfRoutes: [],
    listOfPublications: [],
    listOfEvents: [],

  }

  handleChange = async (event, category) => {
    let attractions, events, publications, routes;

    if (event.value !== 'All regions') {
      attractions = await fetchData(null, `/tourismTypePub/GetSimilarTourObjects?id=${this.props.slug}&regionId=${event.value}`);
      events = await fetchData(null,`/tourismTypePub/GetSimilarEvents?id=${this.props.slug}&regionId=${event.value}`);
      publications = await fetchData(null, `/tourismTypePub/GetSimilarBlogs?id=${this.props.slug}&regionId=${event.value}`);
      routes = await fetchData(null, `/tourismTypePub/GetSimilarRoutes?id=${this.props.slug}&regionId=${event.value}`);
    }

    else {
      attractions = await fetchData(null, `/tourismTypePub/GetSimilarTourObjects?id=${this.props.slug}`);
      events = await fetchData(null,`/tourismTypePub/GetSimilarEvents?id=${this.props.slug}`);
      publications = await fetchData(null, `/tourismTypePub/GetSimilarBlogs?id=${this.props.slug}`);
      routes = await fetchData(null, `/tourismTypePub/GetSimilarRoutes?id=${this.props.slug}`);
    }
    attractions = {
      result: attractions.result.map(item => ({
        ...item,
        image: item.imagePath,
        slug: item.id.toString()
      }))
    }
    events = {
      result: events.result.map(item => ({
        ...item,
        image: item.baseImagePath,
        slug: item.id.toString(),
        type: item.eventType,
        date: item.startDate,
      }))
    }
    publications = {
      result: publications.result.map(item => ({
        ...item,
        image: item.baseImagePath,
        slug: item.id.toString(),
        date: item.publishDate,
      }))
    }
    routes = {
      result: routes.result.map(item => ({
        ...item,
        image: item.imagePath,
        slug: item.id.toString(),
        title: item.name,
      }))
    }
    this.setState({
      listOfAttractions: attractions.result,
      listOfEvents: events.result,
      listOfPublications: publications.result,
      listOfRoutes: routes.result,
    })


  }

  componentDidMount() {
    this.setState({
      listOfAttractions: this.props.attractions,
      listOfRoutes: this.props.routes,
      listOfPublications: this.props.publications,
      listOfEvents: this.props.events})
  }

  renderList = () => {
    const {list} = this.props;
    return (
      <LocalizationContext.Consumer>
        {
          ({ localization}) => (
            <Fragment>
              <h1 className="content-title">{localization.menu1TravelByTheme}</h1>
              <div className="themes-list">
                {list.map((el, key) => {
                  return (
                    <Link
                      key={id()}
                      href={`${Routes.themes}?slug=${el.slug}&title=${el.title}`}
                      as={`${Routes.themes}/${el.slug}/${el.title}`}
                    >
                      <figure className="themes-list-item">
                        <div className="themes-list-img">
                          <img src={el.image} />
                          <img src={el.image_hover} className="hover" />
                        </div>
                        <figcaption className="themes-list-figcaption">
                          <h4 className="themes-list-title">
                            {el.title}
                          </h4>
                          <div className="themes-list-desc">
                            {el.description}
                          </div>
                        </figcaption>
                      </figure>
                    </Link>
                  )
                })}
              </div>
            </Fragment>
          )
        }
      </LocalizationContext.Consumer>

    )
  }

  renderItem = () => {
    const {
      pathname,
      item,
      originalURL,
    } = this.props;

    let contentGallery = []
    if (item) contentGallery = item.gallery ? item.gallery.map(img => ({image: img.imagePath, caption: img.description, thumb: img.imagePath })) : []


    return (
      <LocalizationContext.Consumer>
        {
          ( {localization} ) => (
            <Fragment>
              <PageShareLink info={{url: originalURL, title: item.title, desc: item.description, img: item.baseImagePath}} />
              <div className="theme-item-top">
                <figure className="theme-item-img">
                  <img src={item.baseImagePath}/>
                </figure>
                <div>
                  <Breadcrumps page={localization.menu1TravelByTheme} path={pathname} isWhite />
                  <h1 className="top-slide-title" style={{color: '#FFF'}}>{item.title}</h1>
                  <SortBlock type="region" onChange = {this.handleChange} isWide/>
                </div>
              </div>
              <article className="container">
                <h2 className="content-subtitle content-subtitle--line">{item.description}</h2>
                <div className="content-text">
                  {item.content}
                </div>
                <ContentSlider slides={contentGallery} />
                <SimilarSlider lang={this.props.lang} list={this.state.listOfAttractions} title={localization.touristSpotSimilarAttractions} path={Routes.spot} allLink={localization.menu1SeeAll}/>
                <SimilarSlider lang={this.props.lang} list={this.state.listOfRoutes} title={localization.touristSpotTouristsRoutes} path={Routes.tours} allLink={localization.menu1SeeAll}/>
                <SimilarSlider lang={this.props.lang} list={this.state.listOfPublications} title={localization.pubPublications} path={Routes.publications} allLink={localization.menu1SeeAll}/>
                <SimilarSlider lang={this.props.lang} list={this.state.listOfEvents} title={localization.events} isTall path={Routes.events} allLink = {localization.menu1SeeAll}/>
              </article>
            </Fragment>
          )
        }</LocalizationContext.Consumer>)
  }

  render() {
    const {slug} = this.props;
    if (slug) {
      return this.renderItem()
    } else {
      return this.renderList()
    }
  }
}
