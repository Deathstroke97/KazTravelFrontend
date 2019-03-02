import React, { PureComponent } from 'react';
import { array } from 'prop-types';
import SlickSlider from 'react-slick';
import Media from 'react-responsive';

export default class ContentSlider extends PureComponent {
  static propTypes = {
    slides: array
  }

  state = {
    slider: null,
    thumbs: null
  }

  componentDidMount(){
    this.setState({
      slider: this.slider1,
      thumbs: this.slider2
    })
  }



  render() {

    const {slides} = this.props;
    if (!slides || !Array.isArray(slides) || !slides.length) return null;

    const mainSettings = {
      fade: true,
      asNavFor: this.state.thumbs,
      // className: 'main-slider',
      responsive: [
        {
          breakpoint: 760,
          settings: {
            fade: false,
            arrows: false
          }
        }
      ]
    };

    const thumbSettings = {
      asNavFor: this.state.slider,
      slidesToShow: 4,
      swipeToSlide: true,
      focusOnSelect: true,
      arrows: false,
      className: 'thumb-slider'

    }

    return (
      <div className="content-slider">
        <SlickSlider
          {...mainSettings}
          ref={s => (this.slider1 = s)}
          className="content-slider-main"

        >
          {slides.map((el, i) => (
            <figure className="content-slider-slide" key={`slide-${i}`}>
              <div className="content-slider-img">
                <img src={el.image} alt=""/>
              </div>

              <figcaption>{el.caption}</figcaption>
            </figure>
          ))}
        </SlickSlider>
        <Media minWidth={760}>
          <SlickSlider {...thumbSettings} ref={s => (this.slider2 = s)}>
            {slides.map((el, i) => (
              <figure className="content-slider-thumb" key={`slide-${i}`}>
                <img src={el.thumb} alt=""/>
              </figure>
            ))}
          </SlickSlider>
        </Media>


      </div>
    );
  }
}
