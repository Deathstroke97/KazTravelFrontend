import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Routes } from '../../../../../settings';
import { fetchData } from '../../../../../libs/fetchData'
import { LocalizationContext } from '../../../../../context'

@connect(null, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class MenuType_1 extends PureComponent {
  static propTypes = {
    blogCategories: PropTypes.array
  }

  state = {
    blogCategories: []
  }

  componentDidMount() {
    this.props.actions.showLoading()
    fetchData(null, '/blogPub/GetBlogCategories').then(res => {
      this.props.actions.hideLoading()
      this.setState({blogCategories: res.result})
    })
  }

  render() {
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <h3 className="submenu-title">{localization.menu1WhatToDo}</h3>
            <aside className="submenu-sidebar">
              <nav className="submenu-nav">
                <div className="submenu-nav-link--big">{localization.menu1Publications}</div>
                {this.state.blogCategories.map(cat =>
                  <Link key={cat.id} href={{ pathname: Routes.publications, query: { categoryId: cat.id } }}><a className="submenu-nav-link">{cat.title}</a></Link>
                )}
              </nav>
              <div className="submenu-all">
                <Link href={{ pathname: Routes.publications, query: { categoryId: 0 } }}><a><span>{localization.menu1SeeAll}</span></a></Link>
              </div>

            </aside>
            <div className="submenu-themes">
              <Link href={Routes.events}>
                <a className="submenu-themes-link">
                  <span><img src="/static/images/menu-events.jpg" alt="" /></span>
                  {localization.menu1Events}
                </a>
              </Link>
              <Link href={Routes.themes}>
                <a className="submenu-themes-link">
                  <span><img src="/static/images/menu-theme.jpg" alt="" /></span>
                  {localization.menu1TravelByTheme}
                </a>
              </Link>
              <Link href={Routes.tours}>
                <a className="submenu-themes-link">
                  <span><img src="/static/images/menu-tours.jpg" alt=""/></span>
                  {localization.menu1Tours}
                </a>
              </Link>
            </div>
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
