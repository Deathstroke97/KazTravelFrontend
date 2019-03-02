import React, { Component } from 'react';
import { object } from 'prop-types';
import id from 'uniqid';
import Glide, { Anchors } from '@glidejs/glide';

export default class Slider extends Component {
  static propTypes = {
    settings: object
  }

  state = {
    slides: []
  }

  componentDidMount() {
    const { settings, children } = this.props;
    this.setState({
      slides: children.map((el, i) => (
        <li className="glide__slide" key={i}>{el}</li>
      ))
    }, () => {
      new Glide('.glide', {
        autoplay: 5000,
        animationDuration: 700,
        type: 'carousel',
        dragDistance: false,
        ...settings
      }).mount({Anchors});
    })

  }

  render() {
    const { slides } = this.state;
    const { widthArrows } = this.props;
    if (!slides.length) return null;
    return (
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            { slides }
          </ul>
        </div>
        {
          widthArrows && (
            <div className="glide__arrows" data-glide-el="controls">
              <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
              <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
            </div>
          )
        }
      </div>
    );
  }
}
