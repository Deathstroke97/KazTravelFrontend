import React, { Component } from 'react';
import { func, string } from 'prop-types';
import classNames from 'classnames';
import { fetchData } from '../libs/fetchData'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

/**
 * Actions
 */
import { setPublicationsList, setPublicationsPage, setPublicationsPopular, setPublicationsRecommended } from '../store/actions/publications.actions';

/**
 * Components
 */
import Wrapper from '../app/common/Wrapper';
import Content from '../app/common/ContentSection';
import PublicationsContent from '../app/pages/Publications';

@connect(null, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class Publications extends Component {

  static propTypes = {
    setTitle: func,
    slug: string
  }

  static async getInitialProps(ctx) {
    ctx.store.dispatch(showLoading())

    const { query: { lang, slug, categoryId }, pathname, store } = ctx

    let pubList = []
    let pubPopularList = []
    let pubRecommendedList = []
    let pubArticle
    let pubCategories = await fetchData(ctx, '/blogPub/GetBlogCategories')

    if (slug) {
      let pub = await fetchData(ctx, `/blogPub/GetBlog?id=${slug}`)

      let similarPubs = await fetchData(ctx, `/blogPub/GetSimilarBlogs?blogId=${slug}`)
      if(pub.result) {
        pubArticle = {
          title: pub.result.title,
          banner: pub.result.baseImagePath,
          subtitle_1: pub.result.description,
          text_1: pub.result.content,
          publishDate: pub.result.publishDate,
          category: pub.result.blogCategory,
          blogCategoryId: pub.result.blogCategoryId,
          prev: pub.result.previousPublicationId,
          next: pub.result.nextPublicationId,
          gallery: pub.result.gallery,

          similar: similarPubs.result.map(simPub => ({
            title: simPub.title,
            slug: simPub.id.toString(),
            image: simPub.baseImagePath,
            type: '',
            description: '',
            date: simPub.publishDate,
            city: '',
            region: ''
          })),

          // events: [{
          //   title: 'International Specialized exhibition Childhood',
          //   slug: '',
          //   image: '/static/images/publications/img-5.jpg',
          //   type: 'Conference',
          //   description: '',
          //   date: '5 august',
          //   city: 'Almaty',
          //   region: ''
          // },{
          //   title: 'International Specialized exhibition Childhood',
          //   slug: '',
          //   image: '/static/images/publications/img-2.jpg',
          //   type: 'Conference',
          //   description: '',
          //   date: '5 august',
          //   city: 'Almaty',
          //   region: ''
          // },{
          //   title: 'Central Asia Electricity World',
          //   slug: '',
          //   image: '/static/images/publications/img-4.jpg',
          //   type: 'Conference',
          //   description: '',
          //   date: '4 august',
          //   city: 'Almaty',
          //   region: ''
          // },{
          //   title: 'International Specialized exhibition Childhood',
          //   slug: '',
          //   image: '/static/images/publications/img-3.jpg',
          //   type: 'Conference',
          //   description: '',
          //   date: '5 august',
          //   city: 'Almaty',
          //   region: ''
          // }],
          //
          // spot: [{
          //   title: 'Four of the canyon of the river Charyn',
          //   slug: '',
          //   image: '/static/images/publications/img-5.jpg',
          //   type: 'Natural attraction',
          //   description: 'The route will pass through the Turgay valley, see the canyon of the river Temirlik.',
          //   date: '',
          //   city: '',
          //   region: 'Almaty region'
          // },{
          //   title: 'Four of the canyon of the river Charyn',
          //   slug: '',
          //   image: '/static/images/publications/img-2.jpg',
          //   type: 'Natural attraction',
          //   description: 'The route will pass through the Turgay valley, see the canyon of the river Temirlik.',
          //   date: '',
          //   city: '',
          //   region: 'Almaty region'
          // },{
          //   title: 'Four of the canyon of the river Charyn',
          //   slug: '',
          //   image: '/static/images/publications/img-4.jpg',
          //   type: 'Natural attraction',
          //   description: 'The route will pass through the Turgay valley, see the canyon of the river Temirlik.',
          //   date: '',
          //   city: '',
          //   region: 'Almaty region'
          // },{
          //   title: 'Four of the canyon of the river Charyn',
          //   slug: '',
          //   image: '/static/images/publications/img-3.jpg',
          //   type: 'Natural attraction',
          //   description: 'The route will pass through the Turgay valley, see the canyon of the river Temirlik.',
          //   date: '',
          //   city: '',
          //   region: 'Almaty region'
          // }]
        }
      }
    } else {
      let pubs = categoryId ?
        await fetchData(ctx, `/blogPub/GetAllBlogs?input.blogCategoryId=${categoryId}`)
        :
        await fetchData(ctx, '/blogPub/GetPublicatonPage')

      let popularPubs = await fetchData(ctx, '/blogPub/GetPopularBlogs?count=5')
      let recommendedPubs = await fetchData(ctx, '/blogPub/GetRecomendedBlogs')

      pubList = categoryId ? pubs.result.items.map(pub => ({
        title: pub.title,
        image: pub.baseImagePath,
        date: pub.publishDate,
        slug: pub.id.toString(),
        description: pub.description
      })) : pubs.result.map(pub => ({
        title: pub.title,
        image: pub.imagePath,
        date: pub.publishDate,
        slug: pub.publicationId.toString(),
        description: null
      }))

      pubRecommendedList = recommendedPubs.result
      pubPopularList = popularPubs.result.items
    }

    await store.dispatch(setPublicationsList(pubList));
    await store.dispatch(setPublicationsPage(pubArticle));
    await store.dispatch(setPublicationsPopular(pubPopularList));
    await store.dispatch(setPublicationsRecommended(pubRecommendedList));

    ctx.store.dispatch(hideLoading())

    return {
      pathname,
      slug,
      categoryId,
      pubCategories: pubCategories.result.map(cat => ({value: cat.id, label: cat.title}))
    }
  }

  render() {
    const {
      props: { slug, pathname, categoryId, pubCategories, originalURL, lang }
    } = this;
    return (

      <Wrapper className={classNames({'main--shape bg-white': !slug})} title="Publications">
        <Content isWide={!!slug}>
          <PublicationsContent
            lang={lang}
            slug={slug}
            originalURL={originalURL}
            pathname={pathname}
            categoryId={categoryId}
            pubCategories={pubCategories}/>
        </Content>
      </Wrapper>
    );
  }
}
