import React, { Fragment } from 'react';
import { array } from 'prop-types';
import { Parallax } from 'react-scroll-parallax';

import Breadcrumbs from '../../common/Breadcrumbs';
import AboutStatistics from './AboutStatistics';
import { LocalizationContext } from '../../../context'
import PageShareLink from '../../common/Socials/PageShareLink';

const AboutContent = ({numberListFirst, numberListSecond, numberListThird, docs, originalURL }) => (
  <LocalizationContext.Consumer>
    {({localization}) => (
      <Fragment>
        <PageShareLink info={{url: originalURL, title: localization.aboutTitle, desc: localization.aboutProject, img: '/static/images/logo-dark.svg'}} />
        <Breadcrumbs page={localization.aboutProject}/>
        <h1 className="content-title content-title--bounded">{localization.aboutProject}</h1>

        <div className="publications-banner">
          <Parallax
            offsetYMax="100px"
            offsetYMin="-420px"
            slowerScrollRate
          >
            <img src='/static/images/about-project-banner.jpg' alt={localization.aboutProject}/>
          </Parallax>
        </div>

        <article className="container container--narrow">
          <h2 className="content-subtitle content-subtitle--line">{localization.aboutWePresent}</h2>
          <div className="content-text">{localization.aboutWeHavebeen}</div>
          <AboutStatistics list={numberListFirst}/>
        </article>
        <div className="about-colored">
          <div className="about-colored-inner">
            <h2 className="content-subtitle">{localization.aboutReliableGuides}</h2>
            <div className="content-text">{localization.aboutGuidesAreSorted}</div>
            <AboutStatistics list={numberListSecond}/>
            <AboutStatistics list={numberListThird}/>
          </div>
        </div>
        <article className="container container--narrow">
          <h2 className="content-subtitle">{localization.aboutTheSymbolism}</h2>
          <div className="content-text"></div>
          <div className="about-docs">
            {
              !!docs && docs.map((el, key) => (
                <figure key={key} className="privacy-list-item">
                  <img src={el.icon}/>
                  <figcaption className="privacy-link">
                    <a href={el.link} download target="_blank">{el.title}</a>
                    <span>{el.size}</span>
                  </figcaption>
                </figure>
              ))
            }
          </div>
        </article>
      </Fragment>
    )}
  </LocalizationContext.Consumer>
);

AboutContent.propTypes = {
  docs: array
};

export default AboutContent;
