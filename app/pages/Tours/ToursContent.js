import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';
// import { Map, Placemark, YMaps } from 'react-yandex-maps';

import { Routes } from '../../../settings';

import Breadcrumbs from '../../common/Breadcrumbs';

import AgencyTourItemRoadMap from '../Agencies/AgencyTourItemRoadMap';
import ContentSlider from '../../common/ContentSlider';
import AgencyTourItemTariffs from '../Agencies/AgencyTourItemTariffs';
import { LocalizationContext } from '../../../context'
import PageShareLink from '../../common/Socials/PageShareLink';

export default class ToursContent extends Component {
  static propTypes = {
    data: object
  }

  state = {
    unfolded: false,
    mapReady: false,
    mapDistance: []
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ unfolded: true });
    }, 500);
    if (this.props.data) {
      window.addEventListener('resize', this.resize);
      this.resize();
    };
  }
  componentWillUnmount() {
		window.removeEventListener('resize', this.resize)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data && this.props.data) {
      window.addEventListener('resize', this.resize);
      this.resize();
    }
  }
  
  resize() {
		this.mapPanel.style.height = '100%';
		this.mapPanel.style.width = '100%';
		
    if (!this.state.mapReady) {
      this.setState({mapReady: true});
      ymaps.ready(() => {
        this.myMap = new ymaps.Map("mapToursContent", {
          center: [0,0],
          zoom: 13
        });
        
        this.showRoad();
      })
    }
	}
  
  showRoad = () => {
    // single route
    const { attraction } = this.props.data;
    const points = attraction.map(el => el.latitude + ',' + el.longtitude);
    
    const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: points,
        params: {
          results: 1,
          avoidTrafficJams: true
        }
      },
      {
        boundsAutoApply: true
      });
    multiRoute.model.events.add("requestsuccess", () => {
      this.myMap.geoObjects.add(multiRoute);
      this.myMap.setBounds(this.myMap.geoObjects.getBounds(), { checkZoomRange: false });
    });
    multiRoute.events.add("update", () => {
      multiRoute.getRoutes().each( (route) => {
        let mapDistance = [];
        route.getPaths().each((path) => {
          const pathProps = path.properties.getAll();
          mapDistance.push(pathProps.distance.text);
          this.setState({mapDistance});
        });
      });
    });
    ///////////////////
    // multiroute
    // const { attraction } = this.props.data;
    
    // attraction.forEach((item, index, array) => {
    //   if (index === 0) return;
    //   console.log(item)
    //   const points = [
    //     array[index-1].latitude  + ',' +   array[index-1].longtitude,
    //     array[index].latitude    + ',' +   array[index].longtitude,
    //   ];
    //   let routingMode = 'driving';
    //   console.log(item.transportId)
    //   switch (item.transportId) {
    //     case 1: routingMode = 'pedestrian'; break;
    //     case 2: routingMode = 'driving'; break;
    //     case 3: routingMode = 'masstransit'; break;
    //     case 4: routingMode = 'masstransit'; break;
    //     case 5: routingMode = 'driving'; break;
    //   }
    //   console.log(routingMode)
    //   const multiRoute = new ymaps.multiRouter.MultiRoute({
    //       referencePoints: points,
    //       params: {
    //         results: 1,
    //         avoidTrafficJams: true,
    //         routingMode: routingMode,
    //       }
    //     },
    //     {
    //       boundsAutoApply: true
    //     });
    //   multiRoute.model.events.add("requestsuccess", () => {
    //     this.myMap.geoObjects.add(multiRoute);
    //     console.log(this.myMap.geoObjects.getBounds());
    //     this.myMap.setBounds(this.myMap.geoObjects.getBounds(), { checkZoomRange: false });
    //   });
    //   multiRoute.events.add("update", () => {
    //     multiRoute.getRoutes().each( (route) => {
    //       let mapDistance = [];
    //       route.getPaths().each((path) => {
    //         const pathProps = path.properties.getAll();
    //         mapDistance.push(pathProps.distance.text);
    //         this.setState({mapDistance});
    //       });
    //     });
    //   });
    // })
  }
  render() {
    const { data, originalURL } = this.props;
    const { mapDistance } = this.state;
    if (!data) return null;
    
    data.gallery.forEach((item, index, array) => {
      array[index].image = item.imagePath;
      array[index].caption = item.description;
      array[index].thumb = item.imagePath;
    });
    
    data.attraction.forEach((item, index, array) => {
      if (index === 0) {
        array[index].routeLenght = '';
      } else if (mapDistance.length > index - 1) {
        array[index].routeLenght = mapDistance[index-1];
      }
    });
    
    let managerHref = '/'
    switch (data.type) {
      case 1: managerHref = `${Routes.guides}/${data.organizationId}/${data.fullName}`; break;
      case 2: managerHref = `${Routes.agencies}/${data.organizationId}/${data.fullName}`; break;
    }
    
    return (
      <LocalizationContext.Consumer>
        {
          ( {localization} ) => (
            <Fragment>
              <PageShareLink info={{url: originalURL, title: data.name, desc: data.tourCategory, img: data.baseImagePath}} />
              <div className="container">
                <Breadcrumbs page={localization.tours} path={Routes.tours} className="mt0" />
                <h1 className="content-title text-center">{data.name}</h1>
                <div className="tours-meta">
                  <span>{data.visitTime} {[localization.guidesHour, localization.guidesDay][data.visitTimeType-1]}</span>
                  <span>{data.tourCategory}</span>
                  <span>{data.region}</span>
                </div>
                <div className="tours-roadmap">
                  <AgencyTourItemRoadMap unfolded={this.state.unfolded} data={data.attraction}/>
                </div>
                <div className="tours-manager">
                  { data.type !== 0 &&
                    <div className="tours-manager">
                      <div className="tours-manager-img" style={{ backgroundImage: `url(${data.profileImagePath})` }} />
                      <a href={managerHref} target="_blank">
                        <h3 className="tours-manager-name">{data.fullName}</h3>
                      </a>
                      <div className="tours-manager-type">{localization.tourManager}</div>
                    </div>
                  }
                </div>
                <h3 className="content-subtitle text-center ">{localization.tourPhotoAndVideoOfTour}</h3>
                <ContentSlider slides={data.gallery} className="content-slider--arrows mt0" reinit={this.state.unfolded} />
      
                {Array.isArray(data.costs) && data.costs.length > 0 &&
                  <>
                    <h3 className="content-subtitle text-center">{localization.tourCost}</h3>
                    <AgencyTourItemTariffs data={data.costs} />
                  </>
                }
                <h2 className="content-subtitle text-center">{localization.tourAbout}</h2>
                <div className="content-text">{data.description}</div>
              </div>
              <div className="shops-map tours-map">
                <div id="mapToursContent" ref={(el) => this.mapPanel = el }></div>
              </div>
      
            </Fragment>
          )
        }
        </LocalizationContext.Consumer>
    );
  }
}
