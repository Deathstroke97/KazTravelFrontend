import React, { Component } from 'react';
import { array } from 'prop-types';
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import Link from 'next/link';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { LocalizationContext } from '../../../context'

@connect(null, dispatch => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
}))
export default class MapWithAttractions extends Component {
  static propTypes = {
    center: array,
    spots: array,
  }
  state = {
    width: 0,
    activeItemKey: -1,
    center: [51.128207, 71.430411],
    zoom: '10'
  }
  listItems = []
  componentDidMount() {
    if (window !== undefined) {
      this.getWidth();
      window.addEventListener('resize', this.getWidth);
    }
    const { center, zoom } = this.props;
    if (center && zoom) {
      this.setState({center, zoom})
    }
  }
  componentWillUpdate(nextProps) {
    const { center, zoom } = this.props;
    if (nextProps.center && nextProps.zoom && (nextProps.center !== center || nextProps.zoom !== zoom)) {
      this.setState({ center: nextProps.center, zoom: nextProps.zoom }, () => {
        this.map.setCenter(this.state.center, this.state.zoom);
      })
    }
  }
  componentWillUnmount() {
    if (window !== undefined) {
      window.removeEventListener('resize', this.getWidth);
    }
  }
  getWidth = () => {
    this.setState({
      width: window.innerWidth
    });
  }
  setActiveItem = (item, key) => {
    const { width } = this.state;
    if (width < 760) {
      this.redirect(item)
    } else {
      this.setState({ activeItemKey: key });
      this.goTo(item);
      this.itemsList.scrollTop(this.listItems[key].offsetTop)
    }
  }
  goTo = (item) => {
    const {latitude, longitude} = item;
    this.map.setCenter([latitude, longitude - 0.01], 14, {
      duration: 600,
      timingFunction: 'ease'
    });
  }
  redirect = (item) => {
    console.log(item)
    // window.location = item.slug
  }
  renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: '#67a1d6',
      width: '2px'
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }
  render() {
    const { spots, lang } = this.props;
    const { width, activeItemKey, center, zoom } = this.state;
    
    let spotsToView = []
    if (Array.isArray(spots)) {
      spots.forEach((item, index, array) => {
        array[index].longitude = item.longtitude;
      })
      spotsToView = spots.filter(el => !!el.latitude && !!el.longitude)
    };
    
    let mapLang = lang === 'ru' ? 'ru_RU' : 'en_RU';
    
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
        <div className="map-with-attractions">
          <div className="map-with-attractions-container">
            <div className="container">
              <Scrollbars
                className="map-with-attractions-list"
                ref={itemsList => (this.itemsList = itemsList)}
                renderThumbVertical={this.renderThumbVertical}
                style={{
                  width: width < 760 ? '100%' : '420px',
                  height: '540px',
                  padding: '25px 35px'
                }}
              >
                <div className="map-with-attractions-list">
                  <h3 className="map-with-attractions-list-title">{localization.visitCardTouristSpot}</h3>
                  <ul className="map-with-attractions-list-items">
                    {
                      spotsToView.map((item, key) => (
                        <li
                          key={key}
                          ref={listItem => (this.listItems[key] = listItem)}
                          className={ classNames(
                            "map-with-attractions-list-items-item",
                            { "map-with-attractions-list-items-item--active": +key === +activeItemKey }
                          )}
                        >
                          <a href={item.slug} onClick={ e => {
                            e.preventDefault();
                            this.setActiveItem(item, key);
                          }}>
                            <div className="map-with-attractions-list-items-item-preview">
                              <img
                                src={ item.imagePath }
                                alt={ item.title }
                              />
                            </div>
                            <div className="map-with-attractions-list-items-item-description">
                              <h4 className="map-with-attractions-list-items-item-description-title">
                                { item.title }
                              </h4>
                              <Link href={item.slug} as={item.slug}>
                                <span onClick={() => this.props.actions.showLoading()} className="map-with-attractions-list-items-item-description-link">
                                  {localization.visitCardViewMore}
                                </span>
                              </Link>
                              {/* <span
                                className="map-with-attractions-list-items-item-description-link"
                                onClick={() => this.redirect(item)}
                              >
                                <a href="">{localization.visitCardViewMore}</a>
                              </span> */}
                            </div>
                          </a>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </Scrollbars>
            </div>
          </div>
          <YMaps query={{
            lang: mapLang
          }}>
            <Map
              defaultState={{ center, zoom }}
              width={ width }
              height={ 540 }
              instanceRef={map => (this.map = map)}
            >
              {
                spotsToView.map((item, key) => (
                  <Placemark
                    key={key}
                    geometry={[item.latitude, item.longitude]}
                    defaultOptions={{
                      iconLayout: 'default#image',
                      iconImageHref: '/static/images/icons/icon-pin-1.svg',
                      iconImageSize: [24, 30],
                    }}
                    onClick={() => {
                      this.setActiveItem(item, key);
                    }}
                  />
                ))
              }
            </Map>
          </YMaps>
        </div>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
