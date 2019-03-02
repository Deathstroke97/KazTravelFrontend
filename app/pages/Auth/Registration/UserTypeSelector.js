import React from 'react';
import id from 'uniqid';
import classNames from 'classnames';
import { object, string, func } from 'prop-types';
import { LocalizationContext } from '../../../../context'

const getName = (title, localization) => {
  const list = {
    ['Tour Operator']:  localization.authTourOperator,
    ['Guide']:          localization.authGuide,
    ['Souvenir shop']:  localization.authSouvenirShop
  }
  return list[title];
}

const UserTypeSelector = ({ types, selected, handleSelect }) => {
  return (
    <LocalizationContext.Consumer>
      {({localization}) => (
        <div className="reg-select">
          <div className="reg-select-label isRequired">{localization.authTypeOfUser}</div>
          <ul className="clearlist reg-select-list">
            {
              Object.keys(types).map(item => {
                return (
                  <li 
                    key={id()} 
                    className={classNames({ active: types[item].slug === selected })} 
                    onClick={() => handleSelect(types[item].slug)}
                  >
                    {getName(types[item].title, localization)}
                  </li>
                )
              })
            }
          </ul>

        </div>
      )}
    </LocalizationContext.Consumer>
  );
};

UserTypeSelector.propTypes = {
  types: object.isRequired,
  selected: string,
  handleSelect: func
};

export default UserTypeSelector;
