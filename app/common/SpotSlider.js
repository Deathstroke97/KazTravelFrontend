import React from 'react';
import { array } from 'prop-types';
import SlickSlider from 'react-slick';

const SpotSlider = ({ slides }) => {
  const settings = {
    className: 'spot-slider',
    dots: true,
    dotsClass: 'spot-slider-dots',
    responsive: [
      {
        breakpoint: 760,
        settings: {
          arrows: false
        }
      }
    ]
  };
  return (
    <SlickSlider {...settings}>
      {slides.map((el, i) => (
        <figure className="spot-slider-item" key={`slide-${i}`}>
          <div className="spot-slider-image"><img src={el.imagePath} alt=""/></div>
          <figcaption className="spot-slider-caption">{el.caption}</figcaption>
        </figure>
      ))}
    </SlickSlider>
  );
};

SpotSlider.propTypes = {
  slides: array
};

export default SpotSlider;
