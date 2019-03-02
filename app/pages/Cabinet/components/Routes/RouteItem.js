import React, { Component } from 'react';
import { object, func } from 'prop-types';
import classNames from 'classnames';
import id from 'uniqid';
import Slider from 'react-slick';
import axios from 'axios'
import { parseCookies } from '../../../../../libs/cookies';

// import Slider from '../../../../common/Slider';
import { routeTransportOptions } from '../../../../../settings';
import { LocalizationContext } from '../../../../../context'

export default class RouteItem extends Component {
  static propTypes = {
    data: object,
    deleteHandler: func,
    editHandler: func,
  };

  state = {
    expand: false
  }

  expandText = e => {
    e.preventDefault();
    this.setState({ expand: !this.state.expand });
  }

  deleteRoute = e => {
    e.preventDefault();
    const { data: {id}, api } = this.props
    let cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    this.props.deleteHandler(id, api, token);
  }

  editRoute = e => {
    e.preventDefault();
    const { data: {id}, api, lang } = this.props
    let cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    axios(`${api}/services/app/routePub/Get?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }).then(({data: {result}}) => {
      const translation = result.translations.find(el => el.language === lang)

      const data = {
        ...result,
        attractions: result.attractions.map(el => {
          const attraction = el.translations.find(el => el.language === lang)

          return {
            ...el,
            description: attraction ? attraction.description : ''
          }
        }),
        name: translation ? translation.name : '',
        time: {
          type: result.visitTimeType,
          value: result.visitTime
        },
        description: translation ? translation.description : ''
      }
      this.props.editHandler(data);
    }).catch(e => console.error(e.response))
  }


  render() {
    const {
      data: { attractions, tourCategoryId, tourCategory, time, name, regionId, region, video, gallery, visitors, description },
      commonData: {routeTypes, tourCategories, regions},
      lang
    } = this.props;
    const { expand } = this.state;
    const category = tourCategories.find(cat => cat.value == tourCategoryId)
    const regionObj = regions.find(reg => reg.value == regionId)
    let slides = [];
    if (gallery && gallery.length) slides = [...gallery];
    if (video) slides = [...slides, video];

    const settings = {
      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 760,
          settings: {
            infinite: false,
            arrows: false,
            dots: true
          }
        }
      ]
    }

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="route-item">
            {slides.length && (
              <div className="route-item-slider">
                <Slider
                  {...settings}
                >
                  {slides.map(el => {
                    let caption = el.translations.find(translation => translation.language === lang)
                    // if (el.imagePath) {
                    //   return (
                    //     <figure key={id()}>
                    //       <div className="route-item-slider-img">
                    //         <iframe src={el.imagePath} frameBorder="0" />
                    //       </div>
                    //       {caption && caption.description && <figcaption>{caption.description}</figcaption>}
                    //
                    //     </figure>
                    //   )
                    // }
                    return (
                      <figure key={id()}>
                        <div className="route-item-slider-img">
                          <img src={el.imagePath} alt=""/>
                        </div>
                        {caption && caption.description && <figcaption>{caption.description}</figcaption>}
                      </figure>
                    );
                  })}
                </Slider>
              </div>
            )}
            <h3 className="route-item-title">{name}</h3>
            <div className="events-list-meta">
              <span>{tourCategory ? tourCategory : category ? category.label : ''}</span>
              <span className="place">{region ? region : regionObj ? regionObj.label : ''}</span>
            </div>
            {
              time && (
                <div className="route-item-meta">
                  <time>{time.value} {time.type === 1 ? 'h' : 'd'}</time>
                  <div className="route-item-transports">
                    {attractions.map(el => {
                      const item = routeTypes.find(_el => _el.value == el.transportId);
                      const icon = routeTransportOptions.find(_el => _el.id == el.transportId)
                      return (
                        <span key={id()}><img src={icon ? `/static/images/icons/${icon.name}` : ''} alt=""/>{item.label}</span>
                      );
                    })}
                  </div>
                </div>
              )
            }

            <div className={classNames('content-text route-item-description', {
              'route-item-description--expand': expand
            })}>
              {description}
            </div>
            <a href="" className="route-item-description-expand" onClick={this.expandText}>{localization.cabinetRoutesExpand}</a>
            <div className="route-item-controls">
              <a href="" className="route-item-delete" onClick={this.deleteRoute}>{localization.cabinetRoutesDelete}</a>
              <a href="" className="cabinet-edit" onClick={this.editRoute}>{localization.cabinetRoutesEdit}</a>
            </div>
          </div>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
