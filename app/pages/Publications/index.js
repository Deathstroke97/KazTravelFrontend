import React, { Fragment, Component } from 'react';
import { array, object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Parallax } from 'react-scroll-parallax';
import {Routes, filterTypes, popupTypes} from '../../../settings';
import { fetchData } from '../../../libs/fetchData'
import moment from 'moment'
import { LocalizationContext } from '../../../context'
import Head from 'next/head'

/**
 * Actions
 */
import { toggleModal } from '../../../store/actions/common.actions';
import { setPublicationsList, setPublicationsPopular } from '../../../store/actions/publications.actions';

/**
 * Components
 */
import PublicationsList from "./PublicationsList";
import PopularList from './PopularList';
import RecommendList from './RecommendList';
import ViewMore from '../../common/ViewMore';
import Breadcrumbs from '../../common/Breadcrumbs';
import Gallery from '../../common/ContentGallery';
import Slider from './PublicationsSlider';
import SortBlock from '../../common/SortBlock';
import Socials from '../../common/Socials';
import Datepicker from '../../common/Datepicker';
import Popup from '../../common/Popup';
import ContentSlider from '../../common/ContentSlider';
import UniversalTextPage from '../../common/UniversalTextPage'

import { publicationsSelector } from '../../../selectors/publications.selector';

import fixtures from './fixtures'

import PageShareLink from '../../common/Socials/PageShareLink';

const mapStateToProps = ({ publications, common }, props) => ({
  ...publicationsSelector(publications),
  viewport: common.viewport
});

@connect(mapStateToProps, { toggleModal, setPublicationsList, setPublicationsPopular })
export default class PublicationsContent extends Component {
  static propTypes = {
    list: array,
    article: object,
    toggleModal: func,
    lang: string
  }

  state = {
    filtered: false,
    currentCategory: '',
    period: '',
    startPeriod: '',
    endPeriod: '',
    categoryPubs: [],
    popularPubsLength: 5,
    showViewMoreButton: true,
    totalPopularPubsListLength: 0,
    reinit: false
  }

  componentDidMount() {
    if(this.props.categoryId && this.props.categoryId !== '0') {
      let currentCategory = this.props.pubCategories.find(cat => cat.value.toString() === this.props.categoryId)
      this.setState({filtered: true, currentCategory})
    } else if(this.props.categoryId === '0'){
      Router.replace(Routes.publications)
    }

    fetchData(null, '/blogPub/GetPopularBlogs')
      .then(e => this.setState({totalPopularPubsListLength: e.result ? e.result.totalCount : 0, showViewMoreButton: e.result ? e.result.totalCount > 5 : false}))
    setTimeout(() => {
      this.setState({ reinit: true });
    }, 500);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.categoryId && prevProps.categoryId !== this.props.categoryId || this.state.period && prevState.period !== this.state.period){
      let link = '/blogPub/GetAllBlogs?'
      if(this.props.categoryId) link = `/blogPub/GetAllBlogs?input.blogCategoryId=${this.props.categoryId}&`
      if(this.state.startPeriod && this.state.endPeriod)
        link = link.concat(`&input.startDate=${this.state.startPeriod}&input.endDate=${this.state.endPeriod}`)

      let currentCategory = this.props.pubCategories.find(cat => cat.value.toString() === this.props.categoryId)

      this.setState({filtered: true, currentCategory: currentCategory ? currentCategory : ''})

      fetchData(null, link)
        .then(catPubs => this.props.setPublicationsList(catPubs.result.items.map(pub => ({
          title: pub.title,
          image: pub.baseImagePath,
          date: pub.publishDate,
          slug: pub.id.toString(),
          description: pub.description
        }))))
    }

    if(this.props.categoryId === '0' && this.state.filtered) {
      Router.replace(Routes.publications);
      this.setState({filtered: false, currentCategory: '', period: '', startPeriod: '', endPeriod: ''})
    }
  }

  handleSort = ({value, label}, type) => {
    switch (type) {
      case filterTypes.category: {
        Router.replace(`${Routes.publications}?categoryId=${value}`)

        // let currentCategory = this.props.pubCategories.find(cat => cat.value === value)
        // this.setState({ filtered: true, currentCategory, period: '', startPeriod: '', endPeriod: ''});

        break;
      }

      case filterTypes.date: {
        if (value.toLowerCase() === 'period') {
          this.props.toggleModal(true);
        } else {
          let startPeriod = ''
          let endPeriod = ''

          if(value.toLowerCase() === 'last week') {
            startPeriod = moment().subtract(1, 'weeks').startOf('isoWeek').format().replace(/:/g, '%3A').replace(/\+/g, '%2B')
            endPeriod = moment().subtract(1, 'weeks').endOf('isoWeek').format().replace(/:/g, '%3A').replace(/\+/g, '%2B')
          }

          if(value.toLowerCase() === 'last month') {
            startPeriod = moment().subtract(1, 'months').startOf('month').format().replace(/:/g, '%3A').replace(/\+/g, '%2B')
            endPeriod = moment().subtract(1, 'months').endOf('month').format().replace(/:/g, '%3A').replace(/\+/g, '%2B')
          }

          if(value.toLowerCase() === 'last year') {
            startPeriod = moment().subtract(1, 'years').startOf('year').format().replace(/:/g, '%3A').replace(/\+/g, '%2B')
            endPeriod = moment().subtract(1, 'years').endOf('year').format().replace(/:/g, '%3A').replace(/\+/g, '%2B')
          }

          this.setState({
            filtered: true,
            period: {
              value,
              label: value
            },
            startPeriod,
            endPeriod
          });
        }

        break;
      }

      default: return null;

    }
  }

  handleViewMore = () => {
    this.setState(prevState => ({popularPubsLength: prevState.popularPubsLength + 5}), () => {
      fetchData(null, `/blogPub/GetPopularBlogs?count=${this.state.popularPubsLength}`)
        .then(popPubs => {
          this.props.setPublicationsPopular(popPubs.result.items)
          if(this.state.totalPopularPubsListLength < this.state.popularPubsLength) this.setState({showViewMoreButton: false})
        })
    })
  }

  applyDatePeriod = period => {
    this.setState({
      startPeriod: moment(period.from).format().replace(/:/g, '%3A').replace(/\+/g, '%2B'),
      endPeriod: moment(period.to).format().replace(/:/g, '%3A').replace(/\+/g, '%2B'),
      period: {
        value: 'Period',
        label: 'Period'
      }
    })
    this.props.toggleModal(false);
  }

  render() {
    const { slug, list, article, pathname, pubCategories, popularList, recommendedList, originalURL, viewport: { width }, lang } = this.props;

    const { filtered, showViewMoreButton, reinit } = this.state;
    let contentGallery = []
    if (article) contentGallery = article.gallery ? article.gallery.map(img => ({image: img.imagePath, caption: img.description, thumb: img.imagePath })) : []

    const { pubArticle } = fixtures;

    if (slug === 'universal') {
      return (
        <UniversalTextPage article={pubArticle}/>
      )
    }

    return <LocalizationContext.Consumer>
      {({localization}) => slug && article ?

       (
        <Fragment>
          <PageShareLink info={{url: originalURL, title: article.title, desc: article.subtitle_1, img: article.banner}} />
          <Head>
            <title key="title">{article.title}</title>
            <link key="enHreflang" rel="alternate" hreflang="en" href={originalURL.replace(lang, 'en')}/>
            <link key="kkHreflang" rel="alternate" hreflang="kk" href={originalURL.replace(lang, 'kk')}/>
            <link key="ruHreflang" rel="alternate" hreflang="ru" href={originalURL.replace(lang, 'ru')}/>
            <link key="frHreflang" rel="alternate" hreflang="fr" href={originalURL.replace(lang, 'fr')}/>
            <link key="deHreflang" rel="alternate" hreflang="de" href={originalURL.replace(lang, 'de')}/>
            <link key="zhCNHreflang" rel="alternate" hreflang="zh-CN" href={originalURL.replace(lang, 'zh-CN')}/>
          </Head>
          <Breadcrumbs page={localization.pubBreadcrumbPub} path={pathname}/>
          <h1 className="content-title content-title--bounded">{article.title}</h1>
          <div className="publications-meta">
            <time>{moment(article.publishDate).format('DD MMMM')}</time>
            <span>{article.category}</span>
          </div>

          <div className="publications-banner">
            <Parallax
              offsetYMax={width > 760 ? '100px' : 10}
              offsetYMin={width > 760 ? '-280px' : -50}
              slowerScrollRate
            >
              <img src={article.banner} alt=""/>
            </Parallax>
          </div>

          <article className="container container--narrow">
            <Socials info={{url: originalURL, title: article.title, desc: article.subtitle_1, img: article.banner}}/>
            <h2 className="content-subtitle content-subtitle--line">{article.subtitle_1}</h2>
          </article>

          {article.text_1 && article.text_1.split(/(<img[^\>]*>)/g,).map((splittedText, i) => {
            if(splittedText.includes('img')){
              let splittedImgAttr = splittedText.split(/"/g)
              let src = splittedImgAttr.find(attr => attr.includes('http'))
              return <Gallery key={i} list={{image: src, caption: '', size: 1}}/>
            }

            return (
              <div key={i} className="container container--narrow">
                <div className="content-article" dangerouslySetInnerHTML={{__html: splittedText.replace('content-text', '')}}/>
              </div>
            )
          })}

          {/*<div className="publications-map_link">*/}
          {/*<h3 className="content-subtitle is-white">Auto road to Astana</h3>*/}
          {/*<a href="" className="btn btn--white">See on map</a>*/}
          {/*</div>*/}

          {/* <h3 className="content-subtitle">{article.subtitle_2}</h3>

            <div className="content-text" dangerouslySetInnerHTML={{__html: article.text_2}}/>

            <blockquote className="content-blockquote">
              <h4 className="content-subtitle">{article.blockquote.title}</h4>
              <div className="content-text">{article.blockquote.text}</div>
            </blockquote>

            <h3 className="content-subtitle">{article.subtitle_3}</h3>

          <div className="content-text" dangerouslySetInnerHTML={{__html: article.text_3}}/> */}

          {/* <div className="container container--narrow">
            <div className="publications-tags publications-tags--border">
              <a href="" className="tag-link">#Architectural sight</a>
              <a href="" className="tag-link">#Oasis</a>
              <a href="" className="tag-link">#TOP</a>
              <a href="" className="tag-link">#Astana</a>
              <a href="" className="tag-link">#Culturalheritage</a>
              <a href="" className="tag-link">#Nature</a>
              <a href="" className="tag-link">#Diving</a>
              <a href="" className="tag-link">#Mountains</a>
              <a href="" className="tag-link">#Food</a>
              <a href="" className="tag-link">#Almaty</a>
              <a href="" className="tag-link">#Hunt</a>
              <a href="" className="tag-link">#Nomadic</a>
            </div>
          </div> */}
          <article className="container">
            <ContentSlider slides={contentGallery} reinit={reinit}/>
          </article>


          <div className="container">
            {article.similar.length ? <Slider lang={lang} list={article.similar} title={localization.pubSimilarPubs} path={Routes.publications}/> : null}

            {/* <Slider list={article.events} title="Events" isTall path={Routes.events}/>
            <Slider list={article.spot} title="Tourists spot" path={Routes.spot}/> */}

            <div className="publications-controls">
              {article.prev ?
                <Link as={`${Routes.publications}/${lang}/${article.prev}/${article.title}`} href={`${Routes.publications}?lang=${lang}&slug=${article.prev}&title=${article.title}`}>
                  <a><img src="/static/images/icons/icon-prev-1.svg"/> {localization.prev}</a>
                </Link>
                :
                null
              }
              <Link href={{ pathname: Routes.publications, query: { categoryId: article.blogCategoryId } }}>
                <a>{localization.pubAllPublications}</a>
              </Link>
              {article.next ?
                <Link as={`${Routes.publications}/${lang}/${article.next}/${article.title}`} href={`${Routes.publications}?lang=${lang}&slug=${article.next}&title=${article.title}`}>
                  <a>{localization.next}<img src="/static/images/icons/icon-next-1.svg"/></a>
                </Link>
                :
                null
              }
            </div>
          </div>
        </Fragment>
      ) : (
        /**
         * Publication list
         */
         <Fragment>
           <h1 className="content-title">{localization.pubPublications}</h1>
           <SortBlock onChange={this.handleSort} categories={pubCategories}/>
           <div className="publications">
             <PublicationsList lang={lang} data={list} filtered={filtered} period={this.state.period} />

             {
               !filtered && (
                 <div className="publications-content">
                   <section className="publications-popular">
                     <h3 className="content-title">{localization.pubPopular}</h3>
                     <PopularList lang={lang} pubPopularList={popularList}/>
                   </section>
                   <aside className="publications-recommend">
                     <h3 className="content-title">{localization.pubRecommended}</h3>
                     <RecommendList lang={lang} pubRecommendedList={recommendedList}/>
                   </aside>
                 </div>
               )
             }
             {!filtered && showViewMoreButton ? <ViewMore onClick={this.handleViewMore}/> : null}
           </div>

           <Popup type={popupTypes.datepicker} render={open => (
             open && <Datepicker handleSelect={this.applyDatePeriod} toMonth />
           )} />
         </Fragment>
      )}
    </LocalizationContext.Consumer>
  }
};
