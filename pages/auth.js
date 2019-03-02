import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, string } from 'prop-types';
import Router from 'next/router';
import { bindActionCreators } from 'redux'
import { Routes, userTypes } from '../settings';
// import { parseCookies } from 'nookies';
import { fetchData } from '../libs/fetchData';
import { parseCookies } from '../libs/cookies';
import moment from 'moment';

/**
 * Components
 */
import Wrapper from '../app/common/Wrapper';
import Container from '../app/common/ContentSection';
import AuthContainer from '../app/pages/Auth';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { userSelector } from '../selectors/auth.selectors';

import { setUser } from '../store/actions/auth.actions';

@connect(state => ({
  user: userSelector(state)
}), dispatch => ({
  setUser,
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class Auth extends Component {
  static propTypes = {
    user: object,
    type: string
  }

  static async getInitialProps(ctx) {
    const { store, query: { type, user, userId, resetCode }, res } = ctx;
    const state = store.getState();
    if (!type || (type !== Routes.auth.reg && type !== Routes.auth.login && type !== Routes.auth.reset && type !== Routes.auth.regMe)) {
      if (res) {
        res.redirect(`${Routes.auth.url}/${Routes.auth.login}`);
        return null;
      }
      Router.push(`${Routes.auth.url}?type=${Routes.auth.login}`, `${Routes.auth.url}/${Routes.auth.login}`, { shallow: true });
    }
    // const wrongType = !type || (type !== Routes.cabinet.guide && type !== Routes.cabinet.shop && type !== Routes.cabinet.touroperator );
    store.dispatch(showLoading())
    const redirect = type => {
      if (res) {
        res.redirect(`${Routes.cabinet.url}/${type}`);
        return null;
      }
      Router.push(`${Routes.cabinet.url}?type=${type}`, `${Routes.cabinet.url}/${type}`, { shallow: true });
    }
    let loginUser = state.auth.user;
    if (!loginUser) {
      // get await User from server
      //user = null; //403 not Authorized
      let cookies = parseCookies(ctx)
      let token = cookies['KazTravel.loginToken']
      let userType = cookies.userType
      if(token && userType) {
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        const lang = cookies.culture

        switch(userType) {
          case '1': {
            let data = await fetchData(ctx, '/guidePub/Get', options)
            let translatePos = data.result ? data.result.organization.translations.map(data => data.language).indexOf(lang) : null

            loginUser = {
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
            let translatePos = data.result ? data.result.organization.translations.map(data => data.language).indexOf(lang) : null

            loginUser = {
              ...data.result,
              type: 'tour-operator',
              complete_registration: true,
              description: typeof translatePos === 'number' && translatePos !== -1 ? data.result.organization.translations[translatePos].description : '',
              additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? data.result.organization.translations[translatePos].additionalInfo : ''
            }
            break;
          }
          case '3': {
            let data = await fetchData(ctx, '/souvenirShopPub/Get', options)
            let translatePos = data.result ? data.result.translations.map(data => data.language).indexOf(lang) : null

            loginUser = {
              organization: {
                ...data.result
              },
              description: typeof translatePos === 'number' && translatePos !== -1 ? data.result.translations[translatePos].description : '',
              type: 'shop',
              complete_registration: true
            }
            break;
          }
          default: loginUser = null
        }
      }

      // if success (user has active session)
      if (loginUser) {
        await store.dispatch(setUser(loginUser));
        redirect(loginUser.type)
        store.dispatch(hideLoading())
        return {
          type,
          loginUser,
          userId,
          resetCode
        };
      }
    }

    store.dispatch(hideLoading())
    return {
      type,
      userType: user,
      userId,
      resetCode
    }

  }

  componentDidUpdate() {
    const { user } = this.props;
    if (user) { // after success login or reg - redirect to cabinet
      Router.replace(`${Routes.cabinet.url}`);
    }
  }

  render() {

    const { type, userType, api, userId, resetCode, originalHost, lang } = this.props;

    return (
      <Wrapper className="main--shape" title="Auth">
        <Container>
          <AuthContainer userId={userId} resetCode={resetCode} type={type} user={userType} api={api} originalHost={originalHost} lang={lang}/>
        </Container>
      </Wrapper>
    );
  }
}
