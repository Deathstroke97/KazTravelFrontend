import React, { Component, Fragment } from 'react';
import { string, bool, func, number, array, oneOfType, object } from 'prop-types';
import { connect } from 'react-redux';
import id from 'uniqid';
import MapPopup from './MapPopup';

import { locStrings } from '../../../../../static/localization';
import { parseCookies } from '../../../../../libs/cookies';

let cookies = parseCookies();
let lang = cookies['culture'] ? cookies['culture'] : 'en';



import data from './mapData';

@connect(({ common: { viewport } }) => ({ viewport }))
export default class MapKZComponent extends Component {
  static propTypes = {
    id: string,
    isSmall: bool,
    isZoom: bool,
    withData: bool,
    active: oneOfType([array, number]),
    rollOver: func,
    viewport: object
  }

  state = {
    id: null,
    region: null,
    mapObject: null,
    tab: 0,
    position: {
      clientX: 0,
      clientY: 0,
      mapPosition: {
        top: 0
      }
    },

  }


  componentDidMount(){
    this.map.click();
    if (AmCharts) {
      if (window) {
        this.setState({
          id: id(this.props.id)
        }, this.initMap)
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { active, viewport: { width } } = this.props;
    const { hovered } = this.state;
    const { active: prevActive } = prevProps;

    if (width !== prevProps.viewport.width) {
      this.closePopupOnClick();
    }

    if (width > 760) {
      if (prevActive) {
        if (Array.isArray(prevActive)) {
          prevActive.forEach(id => {
            const prevRegion = this.readyMap.getObjectById(id);
            if (prevRegion && prevRegion.objectType === 'MapImage') {
              const obj = this.map.querySelector(`.map-kz-map-image-label-${id}`);
              obj.removeAttribute('style');
              return null;
            }
            const area = this.map.querySelector(`.map-kz-map-area-${id}`);
            if (area) area.removeAttribute('style');
          })

        } else {
          const prevRegion = this.readyMap.getObjectById(prevActive);
          if (prevRegion && prevRegion.objectType === 'MapImage') {
            const obj = this.map.querySelector(`.map-kz-map-image-label-${prevActive}`);
            obj.removeAttribute('style');
            return null;
          }
          const area = this.map.querySelector(`.map-kz-map-area-${prevActive}`);
          if (area) area.removeAttribute('style');
        }

      }
      if (active) {
        // console.log(this.readyMap);
        if (Array.isArray(active)) {
          active.forEach(id => {
            const region = this.readyMap.getObjectById(id);
            if (region && region.objectType === 'MapImage') {
              const obj = this.map.querySelector(`.map-kz-map-image-label-${id}`);
              obj.style.fill = '#00CC00';
              return null;
            }
            const area = this.map.querySelector(`.map-kz-map-area-${id}`);
            if (area) area.style.fill = '#FBE08A';
          })

        } else {
          const region = this.readyMap.getObjectById(active);
          if (region && region.objectType === 'MapImage') {
            const obj = this.map.querySelector(`.map-kz-map-image-label-${active}`);
            obj.style.fill = '#00CC00';
            return null;
          }
          const area = this.map.querySelector(`.map-kz-map-area-${active}`);
          if (area) area.style.fill = '#FBE08A';
        }

      }
    }

  }

  initMap = () => {
    const { isSmall, isZoom, withData, regionData, viewport: { width } } = this.props;
    // console.log(regionData);
    const commonCityProps = {
      labelShiftX: isSmall ? -5 : 5,
      labelShiftY: -2,
      width: isSmall ? 16 : 24,
      height: isSmall ? 18 : 28,
      imageURL: '/static/images/icons/map-city-pin.svg',
      selectable: true
    };
    const commonLakesProps = {
      labelShiftY: -5,
      width: isSmall ? 20 : 39,
      height: isSmall ? 20 : 39,
      labelFontSize: 10,
      labelPosition: 'bottom',
      imageURL: '/static/images/icons/map-lake-pin.svg'
    };
    AmCharts.maps.kazakhstanHigh = data;
    this.readyMap = AmCharts.makeChart(this.state.id, {
      type: "map",
      // forceNormalize: true,
      addClassNames: true,
      classNamePrefix: 'map-kz',
      dragMap: false,
      showBalloonOnSelectedObject: false,
      showDescriptionOnHover: false,
      // preventDragOut: true,
      zoomDuration: 0.3,
      // showDescriptionOnHover: true,
      // mouseWheelZoomEnabled: true,
      areasSettings: {
        outlineThickness:0.5,
        autoZoom: false,
        selectable: true,
        color: '#F7F5F2',
        rollOverColor: '#FBE08A',
        colorSolid: '#000000',
        outlineColor: '#979797',
        selectedColor: '#FBE08A',
        rollOverOutlineColor: '#979797'
      },

      balloon: {
        enabled: !isZoom
      },

      zoomControl: {
        zoomControlEnabled: false,
        homeButtonEnabled: false,
        // top: 0
      },

      imagesSettings: {
        labelFontSize: isSmall ? 12 : 18,
        labelColor: '#13355B',
        color: '#fff',

      },

      dataProvider: {
        getAreasFromMap: true,
        map: "kazakhstanHigh",
        images: [{
          ...commonCityProps,
          label: locStrings[lang].Astana,
          latitude: 51.1605227,
          longitude: 71.4703558,
          id: 1
        }, {
          ...commonCityProps,
          label: locStrings[lang].Almaty,
          latitude: 43.249739,
          longitude: 76.941622,
          id: 2
        }, {
          ...commonCityProps,
          label: locStrings[lang].Shymkent,
          latitude: 42.326911,
          longitude: 69.589956,
          id: 3
        }, {
          ...commonLakesProps,
          label: locStrings[lang].CaspianSea,
          latitude: 45.350768,
          longitude: 50.591119
        }, {
          ...commonLakesProps,
          label: locStrings[lang].AralSea,
          latitude: 45.3475288,
          longitude: 60.288578
        },{
          ...commonLakesProps,
          label: locStrings[lang].LakeBalkhash,
          latitude: 45.895109,
          longitude: 74.516144
        },{
          ...commonLakesProps,
          label: locStrings[lang].LakeZaysan,
          latitude: 48.055968,
          longitude: 83.860981
        }, {
          ...commonLakesProps,
          label: locStrings[lang].LakeAlakol,
          latitude: 46.103530,
          longitude: 81.699014
        }]
      },

      listeners: [{
        event: 'clickMapObject',
        method: e => {
          // console.log('clickMapObject Event');
          clearTimeout(this.timeout);
          const { mapObject, event } = e;
          const { mapObject: prevObject } = this.state;
          const commonEvent = event.clientX ? event : event.changedTouches[0];

          const position = !mapObject.showAsSelected ?
            { clientX: commonEvent.clientX, clientY: commonEvent.clientY, mapPosition: this.map.getBoundingClientRect() } :
            this.state.position;

          if (prevObject && mapObject.id !== prevObject.id) {
            prevObject.showAsSelected = false;
            e.chart.returnInitialColor(prevObject);
          }

          if (mapObject.objectType === 'MapImage') {
            let data = null;
            for (let i = 0; i < regionData.length; i++) {
              if (regionData[i].data.length <= 1) continue;
              const city = regionData[i].data.find(el => el.id === mapObject.id);
              if (city) {
                this.setState({
                  mapObject,
                  region: regionData[i],
                  position,
                  tab: 1
                });
                break;
              }
            }
            // console.timeEnd();
          } else {
            this.setState({
              mapObject,
              position,
              tab: 0,
              region: !mapObject.showAsSelected ? regionData.find(el => el.id === mapObject.id) : null
            })
          }

          if (mapObject.objectType !== 'MapArea') return null;
          mapObject.showAsSelected = !mapObject.showAsSelected;
          e.chart.returnInitialColor(mapObject);
        }
      }, {
        event: 'click',
        method: e => {
          clearTimeout(this.timeout);
          // console.log('clickEvent');
          if (width > 1170) this.closePopupOnClick();

          //
        }
      }]
    });

    if (isSmall && !withData) {
      this.readyMap.addListener('rollOverMapObject', this.mouseOverHandler);
      this.readyMap.addListener('rollOutMapObject', this.mouseOutHandler);
    }
  }

  closePopupOnClick = () => {
    // console.log('close on click');
    // const { viewport: { width } } = this.props;
    // console.log(width);
    this.timeout = setTimeout(() => {
      this.setState({
        region: null
      }, () => {
        const { mapObject } = this.state;
        if (mapObject) {
          mapObject.showAsSelected = false;
          this.readyMap.returnInitialColor(mapObject)
        }
      })
    }, 500)
  }

  mouseOverHandler = e => {
    const { mapObject: { id } } = e;
    if (id) {
      this.props.rollOver(id);
    }
  }

  mouseOutHandler = e => {
    const { mapObject } = e;
    this.props.rollOver(null);
    this.readyMap.returnInitialColor(mapObject);
  }

  clickHandle = e => {
    const { viewport: { width } } = this.props;
    if (width > 1170) this.closePopupOnClick();
  }

  touchHandle = e => {
    const { viewport: { width } } = this.props;
    if (width > 760 && width < 1000) this.closePopupOnClick();
  }

  closePopup = e => {
    e.stopPropagation();
    // e.preventDefault();
    const { mapObject } = this.state;
    mapObject.showAsSelected = false;
    this.setState({
      region: null
    }, () => {
      this.readyMap.returnInitialColor(mapObject)
    })
  }

  componentWillUnmount() {
    this.readyMap.removeListener('rollOverMapObject', this.mouseOverHandler);
    this.readyMap.removeListener('rollOutMapObject', this.mouseOutHandler);
  }

  render() {
    return this.props.withData ? (
      <Fragment>
        <div className="map-kz-rel" onTouchStart={this.touchHandle} >
          <div className="map-kz" id={this.state.id} ref={m => { this.map = m; }} />
          {this.state.region &&
            <MapPopup
              region={this.state.region}
              position={this.state.position}
              closeHandle={this.closePopup}
              tab={this.state.tab}
              viewport={this.props.viewport}
            />
          }
        </div>

      </Fragment>
    ) : <div className="map-kz" id={this.state.id} ref={m => { this.map = m; }} />;
  }
}
