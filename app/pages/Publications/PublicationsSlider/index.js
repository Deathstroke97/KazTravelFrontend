import React from 'react';
import { string, array, bool } from 'prop-types';
import Link from 'next/link';
import SlickSlider from 'react-slick';
import Slide from './PubSlide';

const PublicationsSlider = ({ title, list, region, isTall, path, allLink, query, lang }) => {
  const listLen = list.length;
  if (!listLen) return null;
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    infinite: listLen > 2,
    centerMode: listLen === 1,
    arrows: false,
    className: 'pub-slider',
    dots: false,
    responsive: [{
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
      }
    }, {
      breakpoint: 560,
      settings: {
        centerMode: false,
        slidesToShow: 1,
        dots: true
      }
    }]
  };
  let slider = null;



  const pathAll = region ? `${path}?region=${region}` : path;

  return (
    <div className="publications-slider">
      <h3 className="content-title">
        <span>{title}</span>
        {
          allLink ? <Link href={pathAll}><a className="under-link under-link--arr"><b>{allLink}</b></a></Link> : (
            listLen > 2 && <div className="publications-slider-controls">
              <i className="prev" onClick={() => slider.slickPrev()}/>
              <i className="next" onClick={() => slider.slickNext()}/>
            </div>
          )
        }
      </h3>
      {
        listLen === 1 ? (
          <div className="pub-slider">
            <Slide lang={lang} isTall={isTall} {...list[0]} path={path} />
          </div>
          ) : (
          <SlickSlider {...settings} ref={s => (slider = s)}>
            {list.map((el, i) => <Slide lang={lang} isTall={isTall} key={`slide-${i}`} {...el} path={path} />)}
          </SlickSlider>
        )
      }

    </div>
  );
};

PublicationsSlider.propTypes = {
  title: string,
  list: array,
  path: string,
  isTall: bool,
  isLink: string
};

export default PublicationsSlider;
