import React, { Component, Fragment } from 'react';
import { array, string } from 'prop-types';
import Link from 'next/link';
import { LocalizationContext } from '../../../context'

export default class SpotsTypes extends Component {
  static propTypes = {
    data: array,
    fullList: array,
    path: string
  }

  render() {
    const { data, fullList, path } = this.props;
    if (!data) return null;
    
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <h1 className="content-title">{localization.touristSpot}</h1>
            <div className="spots-types">
              {
                data.map((el,index) => (
                  // <Link href={`${path}?spot=${el.id}1`} as={`${path}/${el.id}`} key={index}>
                  <Link href={`${path}/category?id=${el.id}`} as={`${path}/category?id=${el.id}`} key={index}>
                    <a className="spots-types-item">
                      <div className="spots-types-img"><img src={el.imagePath} alt=""/></div>
                      <h4 className="spots-types-name">{el.title}</h4>
                      <p className="spots-types-desc">{el.description}</p>
                    </a>
                  </Link>

                ))
              }
            </div>

            <h2 className="content-title content-title--bold">{localization.touristSpotFullList}</h2>

            <div className="spots-types">
              <ul className="clearlist">
                { 
                  fullList.map(el => (
                    <li key={el.id}>
                      <h4 className="spots-types-title">{el.title}</h4>
                      <ul className="spots-types-parts clearlist">
                        {
                          el.tourObjectTypeDtos.map((part, i) => (
                            <li key={`part-${i}`}>
                              <Link
                                prefetch
                                // href={`${path}?spot=${el.id}&filter=${part.id}`}
                                href={`${path}/category?id=${el.id}&filter=${part.id}`}
                                as={`${path}/category?id=${el.id}&filter=${part.id}`}
                              >
                                <a>{part.title}</a>
                              </Link>
                              <span>({part.count})</span>
                            </li>
                          ))
                        }
                      </ul>

                    </li>
                  ))
                }
              </ul>
            </div>



          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}

