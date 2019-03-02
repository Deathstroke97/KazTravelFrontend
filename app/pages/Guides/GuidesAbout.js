import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';

import SocialsUser from "../../common/Socials/SocialsUser";
// import {contentGallery} from "../Agencies/fixtures";
import SpotSlider from '../../common/SpotSlider';
import { contentGallery } from './fixtures';
import id from "uniqid";
import { LocalizationContext } from '../../../context'

export default class GuidesAbout extends Component {
  static propTypes = {
    data: object
  }

  render() {
    const { data, originalURL } = this.props;
    if (!data) return null;
    data.gallery.forEach((item, index, array) => {
      array[index].image = item.imagePath;
      array[index].caption = item.description;
    })
    const styleLogo = {
      width: '63px',
      height: '63px',
      background: `url(${data.profileImagePath}) no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      borderRadius: '50%',
    };

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>

            <div className="agency-img" style={styleLogo} />
            {/* <div className="agency-img"><img src={`${data.profileImagePath}`} /></div> */}
            <h1 className="content-title content-title--bounded">{data.name}</h1>

            <div className="agency-details">
              <div className="agency-details-address">{data.region}</div>
              <div className="agency-details-mail">{data.email}</div>
              <div className="agency-details-phone">{data.phones.map((el, key) => <span key={key}>{el.number}</span>)}</div>
              <SocialsUser
                info={{
                  facebook: data.facebook,
                  instagram: data.instagram,
                  telegram: data.telegram,
                  twitter: data.twitter,
                  youTube: data.youTube,
                  url: originalURL,
                  title: data.name,
                  desc: data.description,
                  img: data.profileImagePath,
                }}
              />
            </div>

            <div className="guide-about">
              <h2 className="content-subtitle">{localization.guidesAboutGuide}</h2>
              <p className="agency-about-text">{data.description}</p>
            </div>

            <div className="guide-info">
              <div className="guide-info-block guide-info-lang">
                <span>{localization.guidesLanguages}</span>
                {
                  data.languages.map((el, i) => {
                    if (i === 0) {
                      return <Fragment key={i}><b key={i}>{ el.language } <i>{el.level}</i></b><br /></Fragment>;
                    }
                    return <b key={i}>{ el.language } <i>{el.level}</i></b>;
                  })
                }

              </div>
              <div className="guide-info-block guide-info-cost">
                <span>
                  {localization.guidesCost}: <b>{localization.guidesFrom} {data.cost} {localization.guidesTenge} / {[localization.guidesHour, localization.guidesDay][data.costType-1]}</b>
                </span>
              </div>
              <div className="guide-info-block guide-info-work">
                <span>{localization.guidesGuideAge} <b>{data.age}</b></span>
                <span>{localization.guidesWorkExperience} <b>{data.experience}</b></span>
              </div>
            </div>

            <SpotSlider slides={data.gallery}/>

            { data.additionalInfo &&
              <div className="guide-about">
                <h2 className="content-subtitle">{localization.guidesAdditionalInformation}</h2>
                <p className="agency-about-text">{data.additionalInfo}</p>
              </div>
            }

            {/* <div className="publications-tags">
              {data.tags.map((el, key) => <a key={key} href="" className="tag-link" id={id()}>{el}</a>)}
            </div> */}
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
