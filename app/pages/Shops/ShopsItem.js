import React from 'react';
import Link from 'next/link';
import { object } from 'prop-types';
import { Routes } from '../../../settings';

const ShopsItem = ({ name, profileImage, galleryImagePath, id, description, address, phone }) => {
  return (
    <li className="shops-item">
      <Link href={`${Routes.shops}/${id}/${name}`} as={`${Routes.shops}/${id}/${name}`}>
        <a>
          <div className="shops-item-cover">
            <img src={galleryImagePath} alt=""/>
          </div>
          <div className="shops-item-wrapper shops-item-wrapper--first">

            <div className="shops-item-title">
              <div className="shops-item-title-img">
                <img src={profileImage} alt="Title Image"/>
              </div>
              <h3 className="shops-item-title-text"> {name}</h3>
            </div>
            <p className="shops-item-text">{description}</p>
          </div>
          <div className="shops-item-wrapper shops-item-wrapper--second">
            <div className="shops-item-details">
              <span className="shops-item-details-city">{address}</span>
              <span className="shops-item-details-phone">{phone}</span>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default ShopsItem
