import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
// import { parseCookies } from 'nookies';
import classNames from 'classnames';
import MainTitle from '../../../../pages/MainPage/MainTitle';
import { HeaderContext } from '../../../Header';
import KZMap from '../../../../pages/MainPage/WhereToGo/MapKZ';
import { fetchData } from '../../../../../libs/fetchData';
import { parseCookies } from '../../../../../libs/cookies';
import { Routes } from '../../../../../settings';




export default class MenuType_0 extends Component {
  static propTypes = {
  }

  state = {
    tabs: [this.props.localization.menu0RegionsCities, this.props.localization.menu0TripIdeas],
    activeTab: 0,
    activeRegion: null,
    publications: []
  }

  componentDidMount() {
    fetchData(null, '/blogPub/GetAllBlogs?input.count=2').then(res => this.setState({publications: res.result.items}))
  }

  changeTab = activeTab => this.setState({ activeTab });

  mouseEnterHandler = id => {
    // console.log(id);
    // console.dir(e.target);

    this.setState({ activeRegion: id });

  }

  mouseLeaveHandler = () => this.setState({ activeRegion: null });

  render() {
    const { tabs, activeTab, publications, activeRegion } = this.state;
    let cookies = parseCookies()

    let lang = cookies['culture'] ? cookies['culture'] : 'en'

    return (
      <Fragment>
        <ul className="main-tabs clearlist">
          {tabs.map((el, i) => <li key={`tab-${i}`} className={classNames({active: activeTab === i })} onClick={() => this.changeTab(i)}><span>{el}</span></li>)}
        </ul>

        <div className="submenu-panes">
          {
            this.state.activeTab === 0 ? (
              <div className="pane">
                <div className="pane-half">

                  <ul className="clearlist submenu-list submenu-list--columns">
                    <HeaderContext.Consumer>
                      {({ data: { regions }, routes: { whereToGo } }) => (
                        regions.map(({ slug, title, id }) => {
                          return (
                            <li key={`item-${slug}`} className={classNames({
                              active: id === activeRegion
                            })}>
                              <Link
                                as={`${whereToGo.url}/${whereToGo.region}/${id}/${title[lang]}`}
                                href={{
                                  pathname: whereToGo.url,
                                  query: {
                                    type: whereToGo.region,
                                    slug: id
                                  }
                                }}
                              >
                                <a onMouseEnter={() => this.mouseEnterHandler(id)} onMouseLeave={this.mouseLeaveHandler}>{title[lang]}</a>
                              </Link>
                            </li>
                          )
                        })
                      )}
                    </HeaderContext.Consumer>
                  </ul>
                </div>
                <div className="pane-half">
                  <div className="pane-map">
                    <KZMap id="map-1" isSmall active={activeRegion} rollOver={this.mouseEnterHandler}/>
                  </div>
                  <ul className="clearlist pane-links">
                    {Array.isArray(publications) && publications.map( pub => (
                      <li key={pub.id}>
                        <Link as={`${Routes.publications}/${lang}/${pub.id}/${pub.title}`} href={`${Routes.publications}?lang=${lang}&slug=${pub.id}&title=${pub.title}`}>
                          <a>
                            <span className="pane-links-img">
                              <img src={pub.baseImagePath} alt={pub.title}/>
                            </span>
                            <span className="pane-links-name">{pub.title}</span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="pane">
                <div className="pane-half">
                  <ul className="clearlist submenu-list">
                    <HeaderContext.Consumer>
                      {({ data: { trip }, routes: { whereToGo }, lang }) => (
                        trip[lang].map(({ slug, title, desc, id }) => (
                          <li key={`item-${slug}`} className={classNames({
                            active: id === activeRegion
                          })}>
                            <h4>
                              <Link as={`${whereToGo.url}/${whereToGo.trip}/${slug}/${title}`} href={{pathname: whereToGo.url, query: { type: whereToGo.trip, slug,}}}>
                                <a onMouseEnter={() => this.mouseEnterHandler(id)} onMouseLeave={this.mouseLeaveHandler}>{title}</a>
                              </Link>
                            </h4>
                            <p>{desc}</p>
                          </li>
                        ))
                      )}
                    </HeaderContext.Consumer>
                  </ul>

                </div>
                <div className="pane-half">
                  <div className="pane-map">
                    <KZMap id="map-2" isSmall active={activeRegion} rollOver={this.mouseEnterHandler} isAreas />
                  </div>
                  <ul className="clearlist pane-links">
                    {Array.isArray(publications) && publications.map( pub => (
                      <li key={pub.id}>
                        <Link as={`${Routes.publications}/${lang}/${pub.id}/${pub.title}`} href={`${Routes.publications}?lang=${lang}&slug=${pub.id}&title=${pub.title}`}>
                          <a>
                            <span className="pane-links-img">
                              <img src={pub.baseImagePath} alt={pub.title}/>
                            </span>
                            <span className="pane-links-name">{pub.title}</span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          }
        </div>

      </Fragment>
    );
  }
}
