import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SlickSlider from 'react-slick';
import Link from 'next/link';
import Media from 'react-responsive';

/**
 * Components
 */
import Content from '../../../common/ContentSection';
import MainTitle from '../MainTitle/index';
import ViewMore from '../../../common/ViewMore';

export default class BestTours extends Component {
  static propTypes = {
  }

  render() {

    const settings = {
      arrows: false,
      slidesToShow: 1,
      variableWidth: true,
      autoplay: true,
      centerMode: true,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 470,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            variableWidth: false,
          }
        }
      ]
    };

    return (
      <Fragment>

        <Content className="content-section--white">
          <MainTitle name="Best itineraries" text="Enjoy new tours every week! Visit new places along with the guide, imbue with the power of Kazakhstan nature." />
        </Content>
        <Content isWide className="content-section--white">
          <Media maxWidth={559}>
            {
              Array(3).fill().map((el, i) => (
                <div className="best-tours" key={`slide-${i}`}>
                  <div className="best-tours-img"><img src={`/static/images/publications/img-${i}.jpg`} alt=""/></div>
                  <h4 className="best-tours-title">
                    <Link href="">
                      <a>Photo Tour in Chinki Ustyurt Plateau</a>
                    </Link>
                  </h4>
                  <time className="best-tours-date">8 days</time>
                </div>
              ))
            }
            <ViewMore isPadding text="See more" />
          </Media>
          <Media minWidth={560}>

              <SlickSlider {...settings} className="best-tours-slider">
                {
                  Array(5).fill().map((el, i) => (
                    <div className="best-tours" key={`slide-${i}`}>
                      <div className="best-tours-img"><img src={`/static/images/publications/img-${i}.jpg`} alt=""/></div>
                      <h4 className="best-tours-title">
                        <Link href="">
                          <a>Photo Tour in Chinki Ustyurt Plateau</a>
                        </Link>
                      </h4>
                      <time className="best-tours-date">8 days</time>
                    </div>
                  ))
                }
              </SlickSlider>

          </Media>

        </Content>
      </Fragment>

    );
  }
}
