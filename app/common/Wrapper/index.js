import React, { Component, Fragment } from 'react';
import { string, bool, any, func } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';
import LoadingBar, { hideLoading, showLoading } from 'react-redux-loading-bar';
import Head from 'next/head';

import Header from '../Header';
import Footer from '../Footer';
import Cookie from '../Cookie';
// import Router from 'next/router';


import { setViewport } from '../../../store/actions/common.actions';

@connect(null, { setViewport, hideLoading, showLoading })
export default class Container extends Component {
  static propTypes = {
    className: string,
    isIndex: bool,
    isDev: bool,
    title: string.isRequired,
    children: any.isRequired,
    setViewport: func,
    hideLoading: func,
    showLoading: func,
  }

  componentDidMount() {
    if (lightbox) {
      lightbox.option({
        fadeDuration: 500,
        imageFadeDuration: 300,
        resizeDuration: 500

      })
    }
    if (window !== undefined) {
      this.updateViewportSize();
      window.addEventListener('resize', this.updateViewportSize);
    }
    //Router.router.events.on('routeChangeStart', this.routeChangeStart);
    //Router.router.events.on('routeChangeComplete', this.routeChangeComplete);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewportSize);
    //Router.router.events.off('routeChangeStart', this.routeChangeStart);
    //Router.router.events.off('routeChangeComplete', this.routeChangeComplete);
  }

  routeChangeStart = url => {
    // Router.router.events.off('routeChangeComplete', this.routeChangeComplete);
    this.props.showLoading();
  }

  routeChangeComplete = url => {
    // Router.router.events.off('routeChangeStart', this.routeChangeStart);
    this.props.hideLoading();
  }

  updateViewportSize = () => {
    this.props.setViewport({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  render() {
    const { title, className, isIndex, children, isDev } = this.props;
    return (
      <Fragment>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title key="title">{title ? `Kazakhstan Travel - ${title}` : 'Kazakhstan Travel'}</title>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600|Roboto:300,400,400i,500,700,900&amp;subset=cyrillic,cyrillic-ext" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.10.0/css/lightbox.min.css"/>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.10.0/js/lightbox-plus-jquery.min.js" />
          <script src="https://www.amcharts.com/lib/3/ammap.js" />
          <script dangerouslySetInnerHTML={{__html: `(function (d, w, c) {
              (w[c] = w[c] || []).push(function() {
                  try {
                      w.yaCounter50394163 = new Ya.Metrika2({
                          id:50394163,
                          clickmap:true,
                          trackLinks:true,
                          accurateTrackBounce:true,
                          webvisor:true
                      });
                  } catch(e) { }
              });

              var n = d.getElementsByTagName("script")[0],
                  s = d.createElement("script"),
                  f = function () { n.parentNode.insertBefore(s, n); };
              s.type = "text/javascript";
              s.async = true;
              s.src = "https://mc.yandex.ru/metrika/tag.js";

              if (w.opera == "[object Opera]") {
                  d.addEventListener("DOMContentLoaded", f, false);
              } else { f(); }
          })(document, window, "yandex_metrika_callbacks2");`}} />
          <noscript dangerouslySetInnerHTML={{__html: `<div><img src="https://mc.yandex.ru/watch/50394163" style="position:absolute; left:-9999px;" alt="" /></div>`}} />
        </Head>
        <div className={classNames('wrapper', {'wrapper--dev': isDev})}>

          <LoadingBar className="wrapper-loader"/>
          <Header isIndex={isIndex} />
          <div className={classNames('main', className)}>
            <ParallaxProvider>
              {children}
            </ParallaxProvider>
          </div>
        </div>
        {!isDev && <Footer />}
        <Cookie />
      </Fragment>
    );
  }
}
