import React from 'react';
import Link from 'next/link';
import { object } from 'prop-types';
import { Routes } from '../../../settings';

const AgenciesItem = ({ item }) => {
  return (
      <li className="agencies-item">
        <div className="agencies-item-title">
          <div className="agencies-item-title-img" style={{ backgroundImage: `url(${item.profileImage})` }} />

          <Link href={`${Routes.agencies}/${item.id}/${item.name}`} as={`${Routes.agencies}/${item.id}/${item.name}`}>
            <a><h3 className="agencies-item-title-text" style={{wordBreak:'normal'}}>
              <b>{item.name}</b>
            </h3></a>
          </Link>
        </div>

        <div className="agencies-item-text"><p>{item.description}</p></div>

        <div className="agencies-item-details">
          {item.region && <span className="agencies-item-details-city">{item.region}</span>}
          {item.phone && <span className="agencies-item-details-phone">{item.phone}</span>}
        </div>
      </li>
  )
}

export default AgenciesItem
