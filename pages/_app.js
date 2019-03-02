import React from 'react';
import { Provider, connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';
import App, { Container } from 'next/app';
import moment from 'moment';
import { LocalizationContext } from '../context';
import NotFoundPage from '../app/pages/NotFoundPage';

import { fetchData } from '../libs/fetchData';
import { parseCookies, setCookie } from '../libs/cookies';
import { setUser } from '../store/actions/auth.actions';

import '../app/styles/main.scss';

let cookies = parseCookies()
let lang = cookies['culture'] ? cookies['culture'] : 'en'

moment.locale(lang);

@connect(null, dispatch => ({
  setUser
}))
export default withRedux(initStore)(
  class KazTravelApp extends App {
    static async getInitialProps({ Component, ctx }) {
      const ctxCookies = parseCookies(ctx),
            token = ctxCookies['KazTravel.loginToken'],
            userType = ctxCookies.userType,
            queryLang = ctx.query.lang

      let ctxLang = ctxCookies.culture

      if(queryLang) ctxLang = queryLang

      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

      let test = ctx.isServer ? ctx.req.get('host').includes('demo') ||  ctx.req.get('host').includes('localhost') : window.location.host.includes('demo') || window.location.host.includes('localhost') || window.localStorage.getItem('isDev');

      let originalURL = ctx.isServer ? `http://${ctx.req.get('host')}${ctx.req.originalUrl}` : `http://${window.location.host}${ctx.asPath}`;
      let originalHost = test ? 'http://test.kazakhstan.travel/' : 'http://admin.kazakhstan.travel/';
      let api = test ? 'http://test.kazakhstan.travel/api' : 'http://admin.kazakhstan.travel/api';

      const state = ctx.store.getState();
      let { auth: { user } } = state;

      if (!user) {
        if(token && userType) {
          const options = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }

          try {
            switch(userType) {
              case '1': {
                let data = await fetchData(ctx, '/guidePub/Get', options)
                let translatePos = data.result ? data.result.organization.translations.map(data => data.language).indexOf(ctxLang) : null

                user = {
                  ...data.result,
                  type: 'guide',
                  complete_registration: true,
                  guideSpecializations: data.result.guideSpecializations.length ? data.result.guideSpecializations.map(spec => ({value: spec.id, label: spec.title})) : [],
                  birthDate: {
                    day: data.result.birthDate ? moment(data.result.birthDate).format('DD') : '',
                    month: data.result.birthDate ? moment(data.result.birthDate).format('MMMM') : '',
                    year: data.result.birthDate ? moment(data.result.birthDate).format('YYYY') : ''
                  },
                  experience: moment().diff(data.result.experienceDate, 'years'),
                  description: typeof translatePos === 'number' && translatePos !== -1 ? data.result.organization.translations[translatePos].description : '',
                  additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? data.result.organization.translations[translatePos].additionalInfo : ''
                }
                break;
              }
              case '2': {
                let data = await fetchData(ctx, '/tourOperatorPub/Get', options)
                let translatePos = data.result ? data.result.organization.translations.map(data => data.language).indexOf(ctxLang) : null

                user = {
                  ...data.result,
                  type: 'tour-operator',
                  complete_registration: true,
                  description: typeof translatePos === 'number' && translatePos !== -1 ? data.result.organization.translations[translatePos].description : '',
                  additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? data.result.organization.translations[translatePos].additionalInfo : ''
                };
                break;
              }
              case '3': {
                let data = await fetchData(ctx, '/souvenirShopPub/Get', options)
                let translatePos = data.result ? data.result.translations.map(data => data.language).indexOf(ctxLang) : null

                user = {
                  organization: {
                    ...data.result
                  },
                  description: typeof translatePos === 'number' && translatePos !== -1 ? data.result.translations[translatePos].description : '',
                  type: 'shop',
                  complete_registration: true
                };
                break;
              }
              default: user = null
            }
          } catch(e) {
            if(ctx && ctx.isServer) {
              setCookie(ctx, 'userType', '', {maxAge: -1, path: '/'})
              setCookie(ctx, 'KazTravel.loginToken', '', {maxAge: -1, path: '/'})
            } else {
              setCookie(null, 'userType', '', {maxAge: -1, path: '/'})
              setCookie(null, 'KazTravel.loginToken', '', {maxAge: -1, path: '/'})
            }
          }
        }

        if (user) await ctx.store.dispatch(setUser(user))
      }

      pageProps.api = api;
      pageProps.originalURL = originalURL;
      pageProps.originalHost = originalHost;
      pageProps.lang = ctxLang ? ctxLang : 'en';

      return {pageProps};
    }

    render() {
      const { Component, pageProps, store } = this.props;

      if(pageProps.statusCode === 404) {
        return (
          <Container>
            <Provider store={store}>
              <NotFoundPage/>
            </Provider>
          </Container>
        )
      }

      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      );
    }
  }
)
