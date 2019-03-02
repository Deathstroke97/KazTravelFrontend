import React, { Component, Fragment } from 'react';
import Link from "next/link";
import Router from "next/router";
import { string } from 'prop-types';
// import isEqual from 'lodash/isEqual';


import { Routes } from '../../../settings';
import Breadcrumps from '../../common/Breadcrumbs';
import { LocalizationContext } from '../../../context'
import PageShareLink from '../../common/Socials/PageShareLink';

import HelpAboutKazakhstan from './HelpAboutKazakhstan';
import HelpDocuments from './HelpDocuments';
import HelpCustoms from './HelpCustoms';
import HelpMoneyExchange from './HelpMoneyExchange';
import HelpTimeZones from './HelpTimeZones';
import HelpLanguage from './HelpLanguage';
import HelpWeather from './HelpWeather';
import HelpCommunications from './HelpCommunications';
import HelpTransport from './HelpTransport';
import HelpPhones from './HelpPhones';
import HelpUnits from './HelpUnits';
import HelpPlugs from './HelpPlugs';

// const UniversalPage = ({article: { content, title }}) => (
//   <Fragment>
//     <h1 className="content-title content-title--bounded">{title}</h1>
//     <div className="container--narrow">
//       <article className="content-article" dangerouslySetInnerHTML={{__html: content}} />
//     </div>
//   </Fragment>
// )

import HelpWebResources from './HelpWebResources';

export default class TouristHelpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: Object.values(Routes.help).filter(key => key !== Routes.help.url),
      nextLink: {
        href: '',
        as: '',
        title: ''
      },
      prevLink: {
        href: '',
        as: '',
        title: ''
      }
    }
  }

  static propTypes = {
    type: string
  }

  componentDidMount() {
    this.setNavLinks();
  }

  componentDidUpdate(props) {
    if (props.type !== this.props.type) {
      this.setNavLinks();
    }
  }

  renderHelpBody = () => {
    const { data, type } = this.props;

    switch (type) {
      case Routes.help.about_kazakhstan:      return <HelpAboutKazakhstan article={data} />
      case Routes.help.documents:             return <HelpDocuments article={data} />
      case Routes.help.customs:               return <HelpCustoms article={data} />
      case Routes.help.money_exchange:        return <HelpMoneyExchange article={data} />
      case Routes.help.time_zones:            return <HelpTimeZones article={data} />
      case Routes.help.language:              return <HelpLanguage article={data} />
      case Routes.help.weather:               return <HelpWeather article={data} />
      case Routes.help.communications:        return <HelpCommunications article={data} />
      case Routes.help.transport:             return <HelpTransport article={data} />
      case Routes.help.phones:                return <HelpPhones article={data} />
      case Routes.help.units:                 return <HelpUnits article={data} />
      case Routes.help.electrical_connector:  return <HelpPlugs article={data} />
      case Routes.help.resources:             return <HelpWebResources article={data} />
      // default: return <UniversalPage article={data} />
    }
  }

  setNavLinks = () => {
    this.setState((state, props) => {
      const { routes } = state;
      const { type } = props;
      const routesLen = routes.length;
      const currRouteIndex = routes.indexOf(type);
      if (currRouteIndex === 0) {
        return {
          ...state,
          nextLink: {
            href: `${Routes.help.url}?type=${routes[currRouteIndex + 1]}`,
            as: `${Routes.help.url}/${routes[currRouteIndex + 1]}`,
            title: routes[currRouteIndex + 1]
          },
          prevLink: {
            href: `${Routes.help.url}?type=${routes[routesLen - 1]}`,
            as: `${Routes.help.url}/${routes[routesLen - 1]}`,
            title: routes[routesLen - 1]
          }
        }
      }
      if (currRouteIndex === routesLen - 1) {
        return {
          ...state,
          nextLink: {
            href: `${Routes.help.url}?type=${routes[0]}`,
            as: `${Routes.help.url}/${routes[0]}`,
            title: routes[0]
          },
          prevLink: {
            href: `${Routes.help.url}?type=${routes[currRouteIndex - 1]}`,
            as: `${Routes.help.url}/${routes[currRouteIndex - 1]}`,
            title: routes[currRouteIndex - 1]
          }
        }
      }
      return {
        ...state,
        nextLink: {
          href: `${Routes.help.url}?type=${routes[currRouteIndex + 1]}`,
          as: `${Routes.help.url}/${routes[currRouteIndex + 1]}`,
          title: routes[currRouteIndex + 1]
        },
        prevLink: {
          href: `${Routes.help.url}?type=${routes[currRouteIndex - 1]}`,
          as: `${Routes.help.url}/${routes[currRouteIndex - 1]}`,
          title: routes[currRouteIndex - 1]
        }
      }
    });
  }

  render() {
    const {phonesList, weatherList, transportList, destinationsList, webResourcesList, type, originalURL, data} = this.props;
    const { nextLink, prevLink } = this.state;

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <Breadcrumps page={localization.webresourcesHeader} />

            <div className="help">
              {type === Routes.help.resources ?
                <PageShareLink info={{url: originalURL, title: localization.webresourcesHeader, desc: localization.webresourcesTitle, img: '/static/images/logo-dark.svg'}} />
              : 
                <PageShareLink info={{url: originalURL, title: localization.webresourcesHeader, desc: data.title, img: '/static/images/logo-dark.svg'}} />
              }
              { this.renderHelpBody() }
            </div>



            <div className="publications-controls">
              <Link href={prevLink.href} as={prevLink.as}>
                <a title={prevLink.title}><img src="/static/images/icons/icon-prev-1.svg"/>{localization.webresourcesPrevious}</a>
              </Link>

              <Link href={nextLink.href} as={nextLink.as}>
                <a title={nextLink.title}>{localization.webresourcesNext}<img src="/static/images/icons/icon-next-1.svg"/></a>
              </Link>

            </div>

          </Fragment>
        )}
      </LocalizationContext.Consumer>
    )
  }
}
