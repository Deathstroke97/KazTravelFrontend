import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlickSlider from 'react-slick';
import { Parallax } from 'react-scroll-parallax';
import Content from '../../../common/ContentSection';
import MainTitle from '../MainTitle/index';
import GridSlide from './GridSlide';
import { LocalizationContext } from '../../../../context'


export default class HowToStart extends Component {
  static propTypes = {
    travelPublications: PropTypes.array
  }

  render() {
    const { travelPublications, viewport } = this.props
    const settings = {
      slidesToShow: 1,
      fade: true,
      // autoplay: true,
      arrows: true,
      responsive: [{
        breakpoint: 1100,
        settings: {
          arrows: false,
          autoplay: false
        }
      }]
    };

    return (
      <Content className="content-section--blue overflow">
        {viewport.width > 1170 && (
          <Parallax
            offsetYMax="300px"
            offsetYMin="-300px"
            className="parallax-shape-4"
            slowerScrollRate
          />
        )}


        <LocalizationContext.Consumer>
          {({localization}) => <MainTitle name={localization.mainPageHowToStartDiscover} text={localization.mainPageHowToStartDiscoverText} type="white" />}
        </LocalizationContext.Consumer>
        {
          travelPublications.length / 5 > 1 ? (
            <SlickSlider {...settings} className="howto-slider">
              {Array(travelPublications.length / 5).fill().map((el, i) => <GridSlide key={`slide-${i}`} slides={this.props.travelPublications.slice(i*5, (i+1)*5)} />)}
            </SlickSlider>
          ) : (
            <div className="howto-slider">
              <GridSlide slides={this.props.travelPublications} />
            </div>
          )
        }
        {viewport.width > 1170 && (
          <Parallax
            offsetYMax="300px"
            offsetYMin="-300px"
            className="parallax-shape-5"
            slowerScrollRate
          />
        )}





      </Content>
    );
  }
}
