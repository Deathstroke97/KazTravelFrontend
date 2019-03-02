import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from "../../common/Breadcrumbs";
import {Routes} from '../../../settings';
import GuidesAbout from './GuidesAbout';
import AgencyTours from '../Agencies/AgencyTours';
import { LocalizationContext } from '../../../context'

export default class GuidesContent extends Component {
  static propTypes = {
  }
  
  render() {
    const { data, routes, originalURL } = this.props;
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <Breadcrumbs page={localization.guidesList} path={Routes.guides}/>
            <GuidesAbout data={data} originalURL={originalURL} />
            { Array.isArray(routes) && routes.length > 0 &&
              <>
                <h2 className="content-subtitle">{localization.guidesTouristsRoutes}</h2>
                <AgencyTours data={routes}/>
              </>
            }
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}

