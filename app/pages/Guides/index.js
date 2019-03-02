import React, { Component } from 'react';
import { filterTypes, popupTypes, Routes } from '../../../settings';
import { array, string } from 'prop-types'
import { fetchData } from '../../../libs/fetchData'
import { LocalizationContext } from '../../../context'

/**
 * Actions
 */


/**
 * Components
 */
import GuidesList from './GuidesList';
import ViewMore from '../../common/ViewMore';
import GuideSort from '../../common/SortBlock/GuideSort';
import GuidesContent from './GuidesContent';

const LIST_MAX_COUNT_INIT = 12;
const LIST_MAX_COUNT_STEP = 6;

export default class GuidesContainer extends Component {

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
    filterLanguage: null,
    filterSpecialization: null,
    filterCostMin: null,
    filterCostMax: null,
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
      case filterTypes.region: {
        const filterRegion = value.value !== 'All regions' ? value.value : null;
        this.setState({filterRegion, listMaxCount}, () => this.requestList());
        break;
      }
      case 'language': {
        const filterLanguage = value.value !== 'All languages' ? value.value : null;
        this.setState({filterLanguage, listMaxCount}, () => this.requestList());
        break;
      }
      case 'specialization': {
        const filterSpecialization = value.value !== 'All specializations' ? value.value : null;
        this.setState({filterSpecialization, listMaxCount}, () => this.requestList());
        break;
      }
      case 'range': {
        this.setState({filterCostMin: value[0], filterCostMax: value[1], listMaxCount}, () => this.requestList());
        break;
      }
    }
  }

  requestList = () => {
    const { listMaxCount, filterRegion, filterLanguage, filterSpecialization, filterCostMin, filterCostMax } = this.state;
    
    let filter = `?input.count=${listMaxCount}`;
    if (filterRegion) filter += `&input.regionId=${filterRegion}`;
    if (filterLanguage) filter += `&input.languageId=${filterLanguage}`
    if (filterSpecialization) filter += `&input.specializationId=${filterSpecialization}`
    if (filterCostMin) filter += `&input.costFrom=${filterCostMin}`
    if (filterCostMax) filter += `&input.costTo=${filterCostMax}`
    
    const url = `/tripPub/GetAllGuides${filter}`;
    
    fetchData(null, url)
      .then(res => {
        const { totalCount, items: data } = res.result;
        
        this.setState({totalCount, data});
      })
      .catch(err => console.log(err));
  }
  
  requestItem = (id) => {
    fetchData(null, `/tripPub/GetGuide?id=${id}`)
      .then(res => {
        const item = res.result;
        
        this.setState({ item });
      })
      .catch(err => console.log(err));
    
    fetchData(null, `/tripPub/GetRoutesForOrganization?type=1&id=${id}`)
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

    return (
      slug ? <GuidesContent data={item} routes={routes} originalURL={originalURL}/> :
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="guides">
            <h1 className="content-title">{localization.guidesList}</h1>
            <GuideSort onChange={this.filterHandle}/>
            <GuidesList data={data} />
            {data && data.length < totalCount &&
              <ViewMore onClick={this.onClickViewMore} />
            }
          </div>
        )}
      </LocalizationContext.Consumer>
    )
  }
}
