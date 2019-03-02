import React, { PureComponent } from 'react';
import { arrayOf, shape, string, bool } from 'prop-types';
import SlickSlider from 'react-slick';
import id from 'uniqid';
import classNames from 'classnames';
import Media from 'react-responsive';

export default class ContentSlider extends PureComponent {
  static propTypes = {
    slides: arrayOf(shape({
      image: string.isRequired,
      caption: string,
      thumb: string
    })),
    className: string,
    reinit: bool
  }

  state = {
    slider: null,
    thumbs: null,
    active: 0,
    slidesAmount: null
  }

  componentDidMount(){
    this.setState({
      slider: this.slider1,
      thumbs: this.slider2,
      slidesAmount: this.props.slides.length
    })
  }

  componentDidUpdate(props) {
    if (props.reinit !== this.props.reinit) {
      this.forceUpdate();
    }
  }

  thumbClickHandler = slide => {
    // if (this.state.slidesAmount <= 4) {
    //
    // }
    this.setState({
      active: slide
    }, () => this.slider1.slickGoTo(slide));

  }

  mainChangeHandler = slide => {
    // if (!this.slider2) {
    //
    //   return null;
    // }
    this.setState({
      active: slide
    }, () => {
      if (this.slider2) this.slider2.slickGoTo(slide)
    });
  }



  render() {

    const { slides, className } = this.props;
    if (!slides || !Array.isArray(slides) || !slides.length) return null;

    const { slidesAmount } = this.state;

    const mainSettings = {
      // fade: true,
      // asNavFor: slidesAmount > 4 ? this.state.thumbs : null,
      // className: 'main-slider',
      // adaptiveHeight: true,
      afterChange: this.mainChangeHandler,
      infinite: slidesAmount > 4,
      autoplay: true,

      // responsive: [
      //   {
      //     breakpoint: 760,
      //     settings: {
      //       fade: false,
      //       // arrows: false,
      //       // autoplay: true
      //     }
      //   }
      // ]
    };

    const thumbSettings = {
      // asNavFor: slidesAmount > 4 ? this.state.slider : null,
      slidesToShow: 4,
      swipeToSlide: true,
      focusOnSelect: true,
      arrows: false,
      className: 'thumb-slider',
      infinite: slidesAmount > 4,

      // centerMode: slides.length < 4

    }

    return (
      <div className={classNames("content-slider", className)}>
        <SlickSlider
          {...mainSettings}
          ref={s => (this.slider1 = s)}
          className="content-slider-main"

        >
          {slides.map((el, i) => (
            <figure className="content-slider-slide" key={id()}>
              <div className="content-slider-img">
                <img src={el.image} alt={el.caption || ''}/>
              </div>
              {el.caption && <figcaption>{el.caption}</figcaption>}
            </figure>
          ))}
        </SlickSlider>
        <Media minWidth={760}>
          {
            slidesAmount <= 4 ? (
              <div className="thumb-slider">
                {slides.map((el, i) => (
                  <div className={classNames('slick-slide', { 'slick-current': this.state.active === i })} key={i}>
                    <figure className="content-slider-thumb" key={`slide-${i}`} onClick={() => this.thumbClickHandler(i)}>
                      <img src={el.thumb} alt=""/>
                    </figure>
                  </div>
                ))}
              </div>

              ) : (
              <SlickSlider {...thumbSettings} ref={s => (this.slider2 = s)}>
                {slides.map((el, i) => (
                  <figure className="content-slider-thumb" key={i} onClick={() => this.thumbClickHandler(i)}>
                    <img src={el.thumb} alt=""/>
                  </figure>
                ))}
              </SlickSlider>
            )
          }

        </Media>


      </div>
    );
  }
}
