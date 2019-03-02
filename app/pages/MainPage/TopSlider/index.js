import React, { Component } from 'react';
import { array, string } from 'prop-types';
import SlickSlider from 'react-slick';
import WOW from 'react-wow';
import Slide from './Slide';
import SliderControls from './Controls';

export default class TopSlider extends Component {
  static propTypes = {
    slides: array,
    lang: string
  }

  state = {
    activeSlide: 0
  }

  goToSlide = slide => {
    this.setState({
      activeSlide: slide
    }, () => this.slider.slickGoTo(slide))
  }

  setActiveSlide = activeSlide => this.setState({activeSlide})

  render() {
    const {
      state: { activeSlide },
      props: { slides, viewport, lang },
      goToSlide
    } = this;
    // const { slides } = this.props

    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      touchMove: false,
      arrows: false,
      fade: true,
      swipe: false,
      infinite: false,
      // autoplay: true,
      dots: false,
      afterChange: this.setActiveSlide,
      responsive: [
        {
          breakpoint: 1170,
          settings: {
            dots: true,
            swipe: true,
            touchMove: true,
            fade: true,
          }
        },
        {
          breakpoint: 760,
          settings: {
            dots: true,
            swipe: true,
            touchMove: true,
            // fade: false,
          }
        }
      ]
    }

    return (
        <div className="top-slider">
          <SlickSlider {...settings} ref={s => (this.slider = s)}>
            {
              slides.map((el, i) => <Slide lang={lang} key={`slide-${i}`} {...el} width={viewport.width} />)
            }
          </SlickSlider>
          <SliderControls data={slides.map(slide => ({slide: slide.imagePath, title: slide.title, text: slide.shortDescription }))} handler={goToSlide} active={activeSlide} />
        </div>

    );
  }
}
