import React, { Component } from 'react';
import { object, array } from 'prop-types';
import Media from 'react-responsive';
import { LocalizationContext } from '../../../../context'

/**
 * Components
 */
import Content from '../../../common/ContentSection';
import MainTitle from '../MainTitle/index';
import MainTabs from './TabPanes';
import MainMap from './MapKZ';

export default class WhereToGoSection extends Component {
  static propTypes = {
    viewport: object,
    regionMapArray: array
  }

  state = {
    activeTab: 0,
    tabs: ['WhereToGo and cities', 'Kazakhstan on the globe']
  }

  changeTab = activeTab => this.setState({ activeTab });

  render() {
    return (
      <Content isWide>
        <LocalizationContext.Consumer>
          {({localization}) => <MainTitle name={localization.mainPageWhereToGo} isDiff />}
        </LocalizationContext.Consumer>
        <Media maxWidth={767}>
          <MainMap id="mapdiv" isSmall isZoom withData regionData={this.props.regionMapArray} />
        </Media>
        <Media minWidth={768}>
          <MainMap id="mapdiv" withData regionData={this.props.regionMapArray}/>
        </Media>

      </Content>
    );
  }
}
