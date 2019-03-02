import React, { Component, Fragment } from 'react';
import { array } from 'prop-types';

import AgencyDetails from './AgencyDetails';
import AgencyPhotos from './AgencyPhotos';
import SocialsUser from '../../common/Socials/SocialsUser';
import SpotSlider from '../../common/SpotSlider'
import id from "uniqid";
import { contentGallery } from './fixtures'
import { LocalizationContext } from '../../../context'

export default class AgencyAbout extends Component {
  render() {
    const {props: { data, originalURL }} = this;
    if (!data) return null;
    data.gallery.forEach((item, index, array) => {
      array[index].image = item.imagePath;
      array[index].caption = item.description;
    });

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <div className="agency-img" style={{ backgroundImage: `url(${data.profileImagePath})` }} />
            <h1 className="content-title text-center">{data.name}</h1>

            {
              data.website && (
                <div className="agency-website">
                  <a href={data.website} target="_blank" rel="noreferrer nofollow" className="under-link"><span>{data.website}</span></a>
                </div>
              )
            }

            <div className="agency-details">
              <div className="agency-details-address">{data.region ? `${data.region}, ${data.address}` : data.address}</div>
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
                  desc: '',
                  img: data.profileImagePath,
                }}
              />
            </div>

            <div className="agency-about">
              <h2 className="content-subtitle">{localization.agencyAboutCompany}</h2>
              <p className="agency-about-text">{data.description}</p>
            </div>

            <SpotSlider slides={data.gallery}/>

            { data.additionalInfo &&
              <div className="agency-about">
                <h2 className="content-subtitle">{localization.agencyAdditionalInformation}</h2>
                <p className="agency-about-text">{data.additionalInfo}</p>
              </div>
            }

            {/* <div className="publications-tags">
              {data.tags.map((el, key) => <a key={key} href="" className="tag-link" id={id()}>{el}</a>)}
            </div> */}

          </Fragment>
        )}
      </LocalizationContext.Consumer>
    )
  }
}
