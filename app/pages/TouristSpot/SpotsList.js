import React, { Component, Fragment } from 'react';
import { array, string } from 'prop-types';
import SortBlock from '../../common/SortBlock';
// import SpotItem from '../Publications/PublicationsSlider/PubSlide';
import SpotItem from './SpotItem';
import ViewMore from '../../common/ViewMore';
import { filterTypes } from '../../../settings';
import { fetchData } from '../../../libs/fetchData'

const LIST_MAX_COUNT_INIT = 12;
const LIST_MAX_COUNT_STEP = 6;

export default class SpotsList extends Component {
  state = {
    fullList: [],
    categories: [],
    spotFilter: [],
    data: [],
    filterRegion: '',
    filterCategory: null,
    filterType: null,
    listMaxCount: LIST_MAX_COUNT_INIT,
    listTotalCount: 0,
  }
  static propTypes = {
    data: array,
    path: string,
    title: string
  }

  componentDidMount() {
    const { spot, filter } = this.props;
    fetchData(null, '/tourObjectPub/GetTypeList')
      .then(res => {
        let data = {}
        data.fullList = res && res.result ? res.result : []
        data.categories = data.fullList.map(el => { return {value: el.id, label: el.title}});

        if (spot) {
          const categoryItem = data.fullList.find(el => el.id === parseInt(spot))
          data.filterCategory = {value: categoryItem.id, label: categoryItem.title};
          if (filter) {
            const typeItem = categoryItem.tourObjectTypeDtos.find(el => el.id === parseInt(filter))
            data.filterType = {value: typeItem.id, label: typeItem.title};;
          }
          data.spotFilter = categoryItem.tourObjectTypeDtos.map(el => {
            return {value: el.id, label: el.title}
          });
        }

        this.setState({...data}, () => this.requestItems());
      });
  }

  filterHandle = (value, type) => {
    const listMaxCount = LIST_MAX_COUNT_INIT;
    switch (type) {
      case filterTypes.region: {
        const filterRegion = value.value === 'All regions' ? null : value;

        this.setState({ filterRegion, listMaxCount }, () => this.requestItems())
        break;
      }
      case filterTypes.category: {
        const {fullList} = this.state;
        const filterCategory = value;
        const filterType = null;
        const category = fullList.find(el => el.id === filterCategory.value)
        const spotFilter = category.tourObjectTypeDtos.map(el => {
          return {value: el.id, label: el.title}
        });

        this.setState({ spotFilter, filterCategory, filterType, listMaxCount }, () => this.requestItems())
        break;
      }
      case filterTypes.spots: {
        const filterType = value;

        this.setState({ filterType, listMaxCount }, () => this.requestItems())
        break;
      }
    }
  }

  onClickViewMore = () => {
    this.setState({listMaxCount: this.state.listMaxCount + LIST_MAX_COUNT_STEP}, () => this.requestItems());
  }

  requestItems = () => {
    const { filterRegion, filterCategory, filterType, listMaxCount } = this.state;
    let url = '/tourObjectPub/GetAll';
    let filter = `?input.count=${listMaxCount}`;
    if (filterRegion) filter += `&input.regionId=${filterRegion.value}`;
    if (filterCategory) filter += `&input.categoryId=${filterCategory.value}`
    if (filterType) filter += `&input.typeId=${filterType.value}`
    if (filter) url +=filter;

    fetchData(null, url)
      .then(res => {
        const data = res.result && res.result.items ? res.result.items : [];
        this.setState({data, listTotalCount: res.result.totalCount});
      });
  }

  render() {
    const {title, path, spot, filter, lang} = this.props;
    const {categories, data, listMaxCount, listTotalCount, spotFilter, filterCategory, filterType} = this.state;
    if (!categories.length) return null;

    return (
      <Fragment>
        <h1 className="content-title">{title}</h1>
        <SortBlock
          type={filterTypes.spots}
          categories={categories}
          spotFilter={spotFilter}
          onChange={this.filterHandle}
          filterCategory={filterCategory ? filterCategory : ''}
          filterType={filterType ? filterType : ''}
        />
        <div className="spots-list">
          {
            data.map((el, i) => <SpotItem lang={lang} key={`item-${i}`} {...el} path={path} />)
          }
        </div>
        {data && data.length < listTotalCount &&
          <ViewMore onClick={this.onClickViewMore}/>
        }

      </Fragment>
    );
  }
}
