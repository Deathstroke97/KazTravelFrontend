import React, { Component } from 'react';
import { array } from 'prop-types';
import Link from 'next/link';
import { Routes } from '../../../settings';

import Socials from '../../common/Socials';

const AgencyDetails = ({ agency }) => {
  return (
    <div className="agency-details">
      <div className="agency-details-address">
        <span className="agency-details-address-text">Agency address 1 - 15</span>
      </div>
      <div className="agency-details-mail">
        <span className="agency-details-mail-text">agency@gmail.com</span>
      </div>
      <div className="agency-details-phone">
        <span className="agency-details-phone-text">8 777 444 33 22</span>
      </div>
      <Socials />
    </div>
  )
}

export default AgencyDetails
