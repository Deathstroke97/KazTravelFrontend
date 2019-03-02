import React from 'react';
import Link from 'next/link'
import { string } from 'prop-types';
// import { Parallax } from 'react-scroll-parallax';
import { Routes } from '../../../../settings';
import { LocalizationContext } from '../../../../context';

const Slide = ({imagePath, title, shortDescription, publicationId, lang}) => {
  return (
    <LocalizationContext.Consumer>
      {({localization}) => (
        <div className="top-slide">
          <Link as={`${Routes.publications}/${lang}/${publicationId}/${title}`} href={`${Routes.publications}?lang=${lang}&slug=${publicationId}&title=${title}`}>
            <a href="" className="top-slide-link">
              <div className="top-slide-name">{localization.mainPageWhatToDo}</div>
              <h3 className="top-slide-title">{title}</h3>
              <div className="top-slide-text">{shortDescription}</div>
            </a>
          </Link>
          <div className="top-slide-img">
            <img src={imagePath} alt={title}/>
          </div>
          {/*<Parallax*/}
            {/*className="top-slide-img"*/}
            {/*offsetYMax={20}*/}
            {/*offsetYMin={-30}*/}
            {/*slowerScrollRate*/}
            {/*// disabled={disabled}*/}
          {/*>*/}

              {/*<img src={imagePath} alt={title}/>*/}

          {/*</Parallax>*/}
        </div>)}
    </LocalizationContext.Consumer>
  );
};

Slide.propTypes = {
  slide: string,
  title: string,
  text: string
};

export default Slide;
