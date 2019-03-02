import React, { Fragment, Component } from 'react';
import { array, string } from 'prop-types';
import { filterTypes, popupTypes, Routes } from '../../../settings';
import { fetchData } from '../../../libs/fetchData'
import { LocalizationContext } from '../../../context'

/**
 * Actions
 */


/**
 * Components
 */
import AgenciesList from './AgenciesList';
import AgencyContent from './AgencyContent';
import ViewMore from '../../common/ViewMore';
import SortBlock from '../../common/SortBlock';

const LIST_MAX_COUNT_INIT = 12;
const LIST_MAX_COUNT_STEP = 6;

export default class AgenciesContent extends Component {

  static propTypes = {
    data: array,
    slug: string
  }

  state = {
    data: null,
    item: null,
    routes: null,
    totalCount: 0,
    listMaxCount: LIST_MAX_COUNT_INIT,
    filterRegion: null,
  }

  componentDidMount() {
    const { slug } = this.props;

    if (slug) {
      this.requestItem(slug);
    } else {
      this.requestList();
    }
  }

  componentDidUpdate(prevProps) {
    const { slug } = this.props;
    if (prevProps.slug === slug) return;
     
    if (slug) {
      this.requestItem(slug);
    } else {
      this.requestList();
    }
  }

  filterHandle = (value, type) => {
    const listMaxCount = LIST_MAX_COUNT_INIT;
    switch(type) {
      case filterTypes.category: {
        const filterRegion = value.value !== 'All regions' ? value.value : null;
        this.setState({filterRegion, listMaxCount}, () => this.requestList());
        break;
      }
    }
  }

  requestList = () => {
    const { listMaxCount, filterRegion } = this.state;
    
    let filter = `?count=${listMaxCount}`;
    if (filterRegion) filter += `&regionId=${filterRegion}`;
    
    const url = `/tripPub/GetAllTourOperators${filter}`;
    
    fetchData(null, url)
      .then(res => {
        const { totalCount, items: data } = res.result;
        
        this.setState({totalCount, data});
      })
      .catch(err => console.log(err));
  }
  
  requestItem = (id) => {
    fetchData(null, `/tripPub/GetTourOperator?id=${id}`)
      .then(res => {
        const item = res.result;
        
        this.setState({ item });
      })
      .catch(err => console.log(err));
    
    fetchData(null, `/tripPub/GetRoutesForOrganization?type=2&id=${id}`)
      .then(res => {
        const routes = res.result;
        
        this.setState({ routes });
      })
      .catch(err => console.log(err));
  }

  onClickViewMore = () => {
    this.setState({listMaxCount: this.state.listMaxCount + LIST_MAX_COUNT_STEP}, () => this.requestList());
  }
  
  render() {
    const { slug, originalURL } = this.props;
    const { data, item, routes, totalCount } = this.state;
    
    return slug ? (
      <div className="agency">
        <AgencyContent
          slug={slug}
          originalURL={originalURL}
          data={item}
          routes={routes}
        />
      </div>
    ) : (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="agencies">
            <h1 className="content-title">{localization.agencyList}</h1>
            <SortBlock type={filterTypes.region} onChange={this.filterHandle}/>
            <AgenciesList data={data}/>
            {data && data.length < totalCount &&
              <ViewMore onClick={this.onClickViewMore} />
            }
          </div>
        )}
      </LocalizationContext.Consumer>
    )
  }
}
