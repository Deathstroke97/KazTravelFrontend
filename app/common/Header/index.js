import React, { PureComponent, createContext } from 'react';
import { bool, func, string, object } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';
import Media from 'react-responsive';
import { locStrings } from '../../../static/localization'
import { parseCookies, setCookie } from '../../../libs/cookies';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

import { langList, Routes } from '../../../settings';

import data from './fixtures';

/**
 * Header Context
 */

export const HeaderContext = createContext({
  routes: Routes
});

/**
 * Actions
 */
import { setLang } from '../../../store/actions/common.actions';
import { setUser } from '../../../store/actions/auth.actions';

/**
 * Components
 */
import Menu from './components/Menu';
import Submenu from './components/Menu/Submenu';
import Langs from './components/Langs';

import { langSelector } from '../../../selectors/common.selectors';
import { userSelector } from '../../../selectors/auth.selectors';

let cookies = parseCookies()
let lang = cookies['culture'] ? cookies['culture'] : 'en'

@connect(state => ({
  activeLang: langSelector(state),
  user: userSelector(state)
}), { setLang, setUser, hideLoading, showLoading })
export default class Header extends PureComponent {
  static propTypes = {
    isIndex: bool,
    setLang: func,
    activeLang: string,
    user: object,
    hideLoading: func,
    showLoading: func,
  }

  state = {
    menuIsOpen: false,
    subMenuIsOpen: false,
    submenuType: 0,
    show: false
  }

  componentDidMount() {
    this.setState({ show: true });
    Router.router.events.on('routeChangeStart', this.changeStartHandler);
    window.addEventListener('orientationchange', this.orientationHandler);
    window.addEventListener('click', this.documentClickHandler)
    this.props.setLang(langList[lang]);
  }

  closeSubmenu = () => this.setState({ subMenuIsOpen: false });

  toggleSubmenu = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    const {submenuType, subMenuIsOpen} = this.state;
    if (!subMenuIsOpen) {
      this.setState({ submenuType: type, subMenuIsOpen: true })
    } else {
      if (type === submenuType) {
        this.setState({ subMenuIsOpen: false })
      } else {
        this.setState({ submenuType: type })
      }
    }
  }

  changeStartHandler = () => {
    if (document.body.classList.contains('overflow')) {
      document.body.classList.remove('overflow');
    }
    if (this.state.subMenuIsOpen) this.setState({ subMenuIsOpen: false });
    if (this.state.menuIsOpen) this.setState({ menuIsOpen: false })
  }


  toggleMenu = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen }, () => {
      document.body.classList.toggle('overflow');
    });
  }

  orientationHandler = () => {
    if (document.body.classList.contains('overflow')) {
      document.body.classList.remove('overflow');
    }
    this.setState({menuIsOpen: false});
  }

  documentClickHandler = () => {
    this.setState({ subMenuIsOpen: false });
  }

  changeLang = (langPrefix, langCode) => {
    this.props.showLoading()

    const { query: {lang, slug, title}, route } = Router.router

    setCookie(this, 'culture', langCode, {
      path: '/',
    })
    this.props.setLang(langPrefix)
    if(lang) {
      Router.router.replace(`${route}/${langCode}/${slug}/${title}`);
    } else {
      location.reload();
    }
  }

  logout = () => {
    setCookie(null, 'userType', '', {maxAge: -1, path: '/'})
    setCookie(null, 'KazTravel.loginToken', '', {maxAge: -1, path: '/'})
    this.props.setUser(null)
  }

  submitSearch = e => {
    e.preventDefault();
    const {value} = e.target[0];
    if (value) {
      Router.router.push(`${Routes.search}?request=${value}`);
    }
  }

  componentWillUnmount(){
    window.removeEventListener('orientationchange', this.orientationHandler);
    window.removeEventListener('click', this.documentClickHandler);
    Router.router.events.off('routeChangeStart', this.changeStartHandler);
  }



  render() {
    const {
      props: { isIndex, activeLang, user },
      state: { menuIsOpen, subMenuIsOpen, submenuType, show },
      toggleMenu,
      toggleSubmenu,
      closeSubmenu,
      changeLang,
      submitSearch
    } = this;

    let localization = locStrings[lang]

    return (
      <header className={classNames('header', {
        'header--index': isIndex,
        'animated': show,
        'header--menu-open': menuIsOpen,
        'header--submenu-open': subMenuIsOpen
      })}>
        <div className="container">
          <div className="header-logo">
            <Link href="/">
              <a>
                {
                  isIndex ?
                    <img src="/static/images/logo.svg" alt=""/> :
                    <img src="/static/images/logo-dark.svg" alt=""/>
                }
              </a>
            </Link>
          </div>

          <div className="header-toggle" onClick={toggleMenu}><i /></div>

          <HeaderContext.Provider value={{langList, activeLang, changeLang}}>
            <Menu localization={localization} submenuHandler={toggleSubmenu} routes={Routes} user={user} submitSearch={submitSearch} />
          </HeaderContext.Provider>

          <HeaderContext.Provider value={{data, routes: Routes, lang}}>
            <Submenu localization={localization} type={submenuType} closeMenu={closeSubmenu} />
          </HeaderContext.Provider>

          <Media minWidth={1000}>
            <div className="header-controls">
              <Langs list={langList} active={activeLang} changeLang={changeLang} />
              <Link href={Routes.search}><a className="header-search"/></Link>
              <Link href={Routes.cabinet.url}><a className="header-user" /></Link>
              {user ? <div className="header-logout" onClick={this.logout} /> : null}
            </div>
          </Media>

        </div>
      </header>
    );
  }
}
