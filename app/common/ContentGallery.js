import React, { PureComponent } from 'react';
import { oneOf, func, oneOfType, shape, arrayOf, string, number } from 'prop-types';
import classNames from 'classnames';
import id from 'uniqid';
import { connect } from 'react-redux';
import SlickSlider from 'react-slick';

import { toggleModal } from '../../store/actions/common.actions';

import { popupTypes } from '../../settings';
import Popup from './Popup';

const galleryItemShape = shape({
  image: string.isRequired,
  caption: string,
  size: oneOf([1, 2, 3])
});

@connect(null, { toggleModal })
export default class ContentGallery extends PureComponent {
  static propTypes = {
    list: oneOfType([arrayOf(galleryItemShape), galleryItemShape]).isRequired,
    toggleModal: func
  };

  state = {
    activeImage: 0
  }

  showPopup = index => {
    this.setState({ activeImage: index }, () => this.props.toggleModal(true))
  }

  render() {
    const { list } = this.props;
    const { activeImage } = this.state;

    const settings = {
      fade: true,
      initialSlide: activeImage
    };
    return (
      <div className="container">
        <div className="content-gallery">
          {Array.isArray(list) ? list.map((el, i) => (
            <figure
              key={id()}
              // onClick={() => this.showPopup(i)}
              className={classNames('content-gallery-item', {
                'col-1': el.size === 1 || !el.size,
                'col-2': el.size === 2,
                'col-3': el.size === 3
            })}>
              <div className="content-gallery-img">
                <a href={el.image} data-loghtbox="gallery" data-title={el.caption || ''}>
                  <img src={el.image} alt={el.caption || ''}/>
                </a>
              </div>
              {el.caption && <figcaption className="content-gallery-caption">{el.caption}</figcaption>}
            </figure>
          )) : (
            <figure
              // onClick={() => this.showPopup(0)}
              className={classNames('content-gallery-item', {
                'col-1': list.size === 1 || !list.size,
                'col-2': list.size === 2,
                'col-3': list.size === 3
              })}
            >
              <div className="content-gallery-img">
                <a href={list.image} data-lightbox="gallery" data-title={list.caption || ''}>
                  <img src={list.image} alt={list.caption || ''}/>
                </a>
              </div>
              {list.caption && <figcaption className="content-gallery-caption">{list.caption}</figcaption>}
            </figure>
          )}
        </div>
        <Popup type={popupTypes.gallery} render={open => (
          open && (
            Array.isArray(list) ? (
              <SlickSlider {...settings} className="popup-slider">
                {
                  list.map((el, i) => (
                    <figure className="popup-slider-item" key={id()}>
                      <img src={el.image} alt={el.caption || ''}/>
                      <figcaption>{el.caption}</figcaption>
                    </figure>
                  ))
                }
              </SlickSlider>
            ) : (
              <div className="popup-slider">
                <figure className="popup-slider-item">
                  <img src={list.image} alt={list.caption || ''}/>
                  {list.caption && <figcaption>{list.caption}</figcaption>}
                </figure>
              </div>
            )
          )
        )} />
      </div>

    );
  }
};
