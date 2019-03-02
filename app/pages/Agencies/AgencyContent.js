import React, { Fragment, Component } from 'react';
import { filterTypes, popupTypes, Routes } from '../../../settings';
import { array, string, object } from 'prop-types';
import { LocalizationContext } from '../../../context'

/**
 * Components
 */
import Breadcrumbs from '../../common/Breadcrumbs';
import AgencyAbout from './AgencyAbout';
import AgencyTours from './AgencyTours';

export default class AgencyContent extends Component {

  static propTypes = {
    slug: string,
    data: object
  }

  render() {
    const {props: { data, routes, originalURL}} = this;
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <Breadcrumbs page={localization.agencyList} path={Routes.agencies}/>
            <AgencyAbout data={data} originalURL={originalURL}/>
            { Array.isArray(routes) && routes.length > 0 &&
              <>
                <h2 className="content-subtitle">{localization.agencyTouristsRoutes}</h2>
                <AgencyTours data={routes}/>
              </>
            }
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    )
  }
}
