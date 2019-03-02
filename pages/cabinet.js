import React, { Component } from 'react';
import { object } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Router from 'next/router';
import { bindActionCreators } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
// import { parseCookies } from 'nookies';
import moment from 'moment';

import { fetchData } from '../libs/fetchData';
import { parseCookies } from '../libs/cookies';
import { Routes, userTypes } from '../settings';

/**
 * Actions
 */
import { setUser } from '../store/actions/auth.actions';

/**
 * Components
 */
import Wrapper from '../app/common/Wrapper';
import Container from '../app/common/ContentSection';
import CabinetContainer from '../app/pages/Cabinet';

import { userSelector } from '../selectors/auth.selectors';

@connect(state => ({
  user: userSelector(state),
  viewport: state.common.viewport
}), dispatch => ({
  setUser,
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class Cabinet extends Component {
  static propTypes = {
    user: object,
    viewport: object,
  }

  static async getInitialProps(ctx) {
    const cookies = parseCookies(ctx)
    const lang = cookies.culture

    const { store, query: { type, userId }, req, res } = ctx
    const state = store.getState();
    const wrongType = !type || (type !== Routes.cabinet.guide && type !== Routes.cabinet.shop && type !== Routes.cabinet.touroperator );

    store.dispatch(showLoading())

    const redirect = type => {
      if (res) {
        res.redirect(`${Routes.cabinet.url}/${type}`);
        return null;
      }
      Router.push(`${Routes.cabinet.url}?type=${type}`, `${Routes.cabinet.url}/${type}`, { shallow: true });
    }

    let token = cookies['KazTravel.loginToken']
    let userType = cookies.userType
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Language': lang
      }
    }

    let regionsData = await fetchData(ctx, '/commonPub/GetRegions')
    let guideSpecsData = await fetchData(ctx, '/commonPub/GetGuideSpecializations')
    let langsData = await fetchData(ctx, '/commonPub/GetAllLanguages')
    let langLevelData = await fetchData(ctx, '/commonPub/GetLanguageLevels')
    let tourCatsData = await fetchData(ctx, '/commonPub/GetTourCategories')
    let tourObjData = await fetchData(ctx, '/commonPub/GetTourObjects')
    let routeTypeData = await fetchData(ctx, '/routePub/GetTransports', options)
    let costCatsData = await fetchData(ctx, '/routePub/GetCostCategories', options)

    let { auth: { user } } = state;
    if (!user) {
      // get await User from server
      //user = null; //403 not Authorized
      if(token && userType) {
        switch(userType) {
          case '1': {
            let data = await fetchData(ctx, '/guidePub/Get', options)
            let translatePos = data.result ? data.result.organization.translations.map(data => data.language).indexOf(lang) : null

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
            let translatePos = data.result ? data.result.organization.translations.map(data => data.language).indexOf(lang) : null

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
            let translatePos = data.result ? data.result.translations.map(data => data.language).indexOf(lang) : null

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
      }

      // if success (user has active session)
      if (user) {
        await store.dispatch(setUser(user));
        if (wrongType || type !== user.type) redirect(user.type)
        store.dispatch(hideLoading())
        return {
          commonData: {
            regions: regionsData.result.map(region => ({value: region.id, label: region.name})),
            specs: guideSpecsData.result.map(spec => ({value: spec.id, label: spec.title})),
            langList: langsData.result.map(lang => ({value: lang.id, label: lang.displayName})),
            levelsList: langLevelData.result.map(lvl => ({value: lvl.id, label: lvl.level})),
            tourCategories: tourCatsData.result.map(cat => ({value: cat.id, label: cat.title})),
            tourObjects: tourObjData.result.map(obj => ({value: obj.id, label: obj.title})),
            routeTypes: routeTypeData.result.map(obj => ({value: obj.id, label: obj.title})),
            costCategories: costCatsData.result.map(cost => ({value: cost.id, label: cost.title})),
          },
          type,
          user,
          lang
        };
      } else { // not authorized
        if (res) {
          res.redirect(`${Routes.auth.url}/${Routes.auth.login}`);
          return null;
        }
        Router.push(`${Routes.auth.url}/${Routes.auth.login}`);
      }
    } else { // if user already in store
      if (wrongType || type !== user.type) redirect(user.type);
      store.dispatch(hideLoading())
      return {
        commonData: {
          regions: regionsData.result.map(region => ({value: region.id, label: region.name})),
          specs: guideSpecsData.result.map(spec => ({value: spec.id, label: spec.title})),
          langList: langsData.result.map(lang => ({value: lang.id, label: lang.displayName})),
          levelsList: langLevelData.result.map(lvl => ({value: lvl.id, label: lvl.level})),
          tourCategories: tourCatsData.result.map(cat => ({value: cat.id, label: cat.title})),
          tourObjects: tourObjData.result.map(obj => ({value: obj.id, label: obj.title})),
          routeTypes: routeTypeData.result.map(obj => ({value: obj.id, label: obj.title})),
          costCategories: costCatsData.result.map(cost => ({value: cost.id, label: cost.title})),
        },
        type,
        user,
        lang
      };
    }

    return {
      type,
      user
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const { user: prevUser } = prevProps;
    if(!user) {
      Router.replace(`${Routes.auth.url}/${Routes.auth.login}`);
    }
  }

  render() {
    const {user, type, viewport: { width }, api, commonData, lang} = this.props;

    if (!user) return null

    return (
      <Wrapper title="Cabinet" className={classNames({
        'main--shape': user && !user.complete_registration || width < 1170
      })}>
        {
          user.complete_registration ? <CabinetContainer lang={lang} commonData={commonData} api={api} user={user} usertypes={userTypes} /> : (
            <Container>
              <CabinetContainer lang={lang} commonData={commonData} api={api} user={user} usertypes={userTypes} />
            </Container>
          )
        }
      </Wrapper>
    );

  }
}
