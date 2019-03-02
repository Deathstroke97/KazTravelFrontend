import React from 'react';
import { bool, func } from 'prop-types';
import Link from 'next/link';
import Media from 'react-responsive';
import Langs from '../Langs';
import { HeaderContext } from '../../index';
// import {langList} from "../../../../../settings";

const HeaderMenu = ({submenuHandler, localization, routes, user, submitSearch}) => {
  return (
    <div className="header-menu">
      <nav className="nav">
        <a className="nav-link" href="" onClick={e => submenuHandler(e, 0)}>{localization.menu0WhereToGo}</a>
        <a className="nav-link" href="" onClick={e => submenuHandler(e, 1)}>{localization.menu1WhatToDo}</a>
        <a className="nav-link" href="" onClick={e => submenuHandler(e, 2)}>{localization.menu2PlanYourTrip}</a>
      </nav>
      <nav className="header-links">
        <Link href={routes.business}><a>{localization.menuForBusiness}</a></Link>
        {/* <Link href=""><a>MICE</a></Link> */}
        <Media maxWidth={999}>
          {user ? <Link href={routes.cabinet.url}><a>Cabinet</a></Link> : <Link href={routes.auth.url}><a>Login</a></Link>}
          <form className="header-search-form" onSubmit={submitSearch}>
            <input type="text" className="form-control" placeholder="Search" />
            <input type="submit"/>
          </form>
        </Media>

      </nav>
      <Media maxWidth={1000}>
        <HeaderContext.Consumer>
          {({langList, activeLang, changeLang}) => <Langs list={langList} active={activeLang} changeLang={changeLang} />}
        </HeaderContext.Consumer>

      </Media>
    </div>

  );
};

HeaderMenu.propTypes = {
  isOpen: bool,
  submitSearch: func
};

export default HeaderMenu;
