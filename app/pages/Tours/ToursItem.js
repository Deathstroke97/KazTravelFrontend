import React from 'react';
import Link from 'next/link';
import { object } from 'prop-types';
import { Routes } from '../../../settings';
import { LocalizationContext } from '../../../context';

const ToursItem = ({ name, id, region, visitTime, description, visitTimeType, transports, baseImagePath, cost, tourCategory }) => {
  const getIconFileName = (index) => {
    return [ '', 'icon-afoot.svg','icon-car.svg','icon-bus.svg','icon-afoot.svg','icon-afoot.svg',][index];
  }
  if (Array.isArray(transports) && transports.length > 3) {
    transports = transports.slice(0,3)
  }
  return (
    <LocalizationContext.Consumer>
      {
        ({localization}) => (
          <li className="tours-item">
          <div className="tours-item-img">
            <img src={baseImagePath} />
          </div>
  
          <div className="tours-item-wrapper">
            <div className="tours-item-title">
            <Link href={`${Routes.tours}/${id}/${name}`} as={`${Routes.tours}/${id}/${name}`}>
                <a><h3 className="tours-item-title-text">{name}</h3></a>
              </Link>
            </div>
            <div className="tours-item-info">
              <span className="tours-item-info-tag">{tourCategory}</span>
              <span className="tours-item-info-region">{region}</span>
            </div>
            <p className="tours-item-text">{description}</p>
          </div>
  
          <div className="tours-item-details">
            <table>
              <tbody>
              <tr>
                <td>{localization.tourCost}: </td>
                <td>
                  <span className="tours-item-details-duration">{visitTime} {[localization.guidesHour, localization.guidesDay][visitTimeType -1]}</span>
                </td>
              </tr>
              <tr>
                <td>{cost}</td>
                <td>
                  <span>
                    { Array.isArray(transports) && transports.map((el, idx) => {
                        return <img key={idx} src={`/static/images/icons/${getIconFileName(el.id)}`} alt="" style={{paddingRight:'10px'}}/>
                      })
                    }
                  </span>
                </td>
              </tr>
              </tbody>
  
            </table>
          </div>
        </li>
        )
      }
      </LocalizationContext.Consumer>
  )
}

export default ToursItem
