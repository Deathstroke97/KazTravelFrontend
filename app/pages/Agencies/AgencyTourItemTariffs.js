import React from 'react';
import {array} from 'prop-types';
import { LocalizationContext } from '../../../context';

const AgencyTourItemTariffs = ({ data }) => (
  <LocalizationContext.Consumer>
    {
      ( {localization} ) => (
        <ul className="agency-tours-item-content-tariffs">
        {
          Array.isArray(data) && data.map((el, i) => (
            <li className="agency-tours-item-content-tariffs-plan" key={i}>
              <div className="agency-tours-item-content-tariffs-plan-title">{el.category}</div>
              <div className="agency-tours-item-content-tariffs-plan-value">{el.cost} {localization.tourCostPerPerson}</div>
            </li>
          ))
        }
    
      </ul>
      )
    }
    </LocalizationContext.Consumer>
);

AgencyTourItemTariffs.propTypes = {
  data: array
};

export default AgencyTourItemTariffs;
