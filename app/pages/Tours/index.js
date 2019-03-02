import React, { Fragment, Component } from 'react';
import Link from "next/link";
import { filterTypes, popupTypes, Routes } from '../../../settings';
import { array, string, oneOfType, object } from 'prop-types'
import { fetchData } from '../../../libs/fetchData'

/**
 * Actions
 */


/**
 * Components
 */
import ToursList from './ToursList';
import ViewMore from '../../common/ViewMore';
import SortBlock from '../../common/SortBlock';
import ToursContent from './ToursContent';
import { LocalizationContext } from '../../../context';

const LIST_MAX_COUNT_INIT = 12;
const LIST_MAX_COUNT_STEP = 6;

export default class ToursContainer extends Component {

  static propTypes = {
    data: oneOfType([array, object]),
    slug: string
  }

  state = {
    data: null,
    item: null,
    totalCount: 0,
    listMaxCount: LIST_MAX_COUNT_INIT,
    filterCategory: null,
    filterRegion: null,
    categories: [],
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
        const filterCategory = value.value !== 'All categories' ? value.value : null;
        this.setState({filterCategory, listMaxCount}, () => this.requestList());
        break;
      }
      
      case filterTypes.region: {
        const filterRegion = value.value !== 'All regions' ? value.value : null;
        this.setState({filterRegion, listMaxCount}, () => this.requestList());
        break;
      }
    }
  }

  requestList = () => {
    const { listMaxCount, filterCategory, filterRegion } = this.state;
    
    fetchData(null, '/commonPub/GetTourCategories')
      .then(res => {
        const categories = res.result.map(el => {
          return {value: el.id, label: el.title}
        });
        
        this.setState({ categories });
      })
      .catch(err => console.log(err));
    
    let filter = `?count=${listMaxCount}`;
    if (filterCategory) filter += `&input.categoryId=${filterCategory}`;
    if (filterRegion) filter += `&input.regionId=${filterRegion}`;
    
    const url = `/tripPub/GetAllRoutes${filter}`;
    

    fetchData(null, url)
      .then(res => {
        const { totalCount, items: data } = res.result;
        
        this.setState({totalCount, data});
      })
      .catch(err => console.log(err));
    
  }
  
  requestItem = (id) => {
    fetchData(null, `/tripPub/GetRoute?id=${id}`)
      .then(res => {
        const item = res.result;
        
        this.setState({ item });
      })
      .catch(err => console.log(err));
  }

  onClickViewMore = () => {
    this.setState({listMaxCount: this.state.listMaxCount + LIST_MAX_COUNT_STEP}, () => this.requestList());
  }

  render() {
    
    const { slug, originalURL } = this.props;
    const { data, item, totalCount, categories } = this.state;

    return slug ? (
      <ToursContent 
        slug={slug}
        originalURL={originalURL}
        data={item}
      />
    ) : (
      <LocalizationContext.Consumer>
        {( {localization} ) => (
            <div className="tours">
              <h1 className="content-title">{localization.tours}</h1>
              { categories.length > 1 &&
                <SortBlock onChange={this.filterHandle} categories={categories} type={filterTypes.tours} />
              }
              <ToursList data={data}/>
              {data && data.length < totalCount &&
                <ViewMore onClick={this.onClickViewMore} />
              }
            </div>
        )}
        </LocalizationContext.Consumer>
            
    )
  }
}
