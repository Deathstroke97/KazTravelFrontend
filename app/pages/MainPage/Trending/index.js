import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';

/**
 * Components
 */
import Content from '../../../common/ContentSection';
import MainTitle from '../MainTitle/index';
import TrendingList from './TrendingList';
import TrendingArticle from './TrendingArticle';

/**
 * Actions
 */
import { setSeason, setActiveTrend } from '../../../../store/actions/main-page.actions';
/**
 * Selectors
 */
import { trendingSelector } from '../../../../selectors/main-page.selectors';



const mapStateToProps = ({mainPage: { trending }}) => {
  // console.log(trending);
  return {
    ...trending,
    trendsActiveList: trendingSelector(trending)
  };
};

@connect(mapStateToProps, { setSeason, setActiveTrend })
export default class Trending extends Component {
  static propTypes = {
    trendsActiveList: array,
    seasons: array,
    setSeason: func,
    setActiveTrend: func
  };

  componentDidMount() {
    const { setActiveTrend, trendsActiveList } = this.props;
    setActiveTrend(trendsActiveList[0]);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trendsActiveSeason.value !== this.props.trendsActiveSeason.value) {
      this.selectTrend(this.props.trendsActiveList[0]);
    }
  }

  onSelectChange = val => this.props.setSeason(val);

  selectTrend = trend => this.props.setActiveTrend(trend);

  render() {
    const { seasons, trendsActiveList, trendsActiveSeason, trendsActiveArticle, trendsActiveTrend } = this.props;

    return trendsActiveTrend ? (
      <Content className="content-section--shape">
        <MainTitle name="Trending this" type="select" options={seasons} onSelectChange={this.onSelectChange} activeSeason={trendsActiveSeason} />
        {trendsActiveTrend ?
          <div className="trending-content">
            <TrendingList
              list={trendsActiveList}
              active={trendsActiveTrend.id}
              handler={this.selectTrend}
            />
            <TrendingArticle article={trendsActiveArticle} />
          </div>
          :
          null
        }
      </Content>
    ) : null
  }
}
