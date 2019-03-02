import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
// import { parseCookies } from 'nookies';
import { locStrings } from '../../../static/localization'

import { fetchData } from '../../../libs/fetchData';
import { parseCookies } from '../../../libs/cookies';

let cookies = parseCookies()
let lang = cookies['culture'] ? cookies['culture'] : 'en'
let localization = locStrings[lang]

import { filterTypes } from '../../../settings';

export default class SortBlock extends PureComponent {
  state = {
    categories:  [{ value: 0, label: localization.filtersAllCategories }],
    regions: [{ value: 'All regions', label: localization.filtersAllRegions }]
  }

  static propTypes = {
    type: string,
    onChange: func
  }

  componentDidMount() {
    if (this.select0) {
      this.fixBlurFunction(this.select0);
    }
    if (this.select1) {
      this.fixBlurFunction(this.select1);
    }
    if (this.select2) {
      this.fixBlurFunction(this.select2);
    }
    if (this.select3) {
      this.fixBlurFunction(this.select3);
    }


    fetchData(null, '/commonPub/GetRegions')
      .then(res => {
        let regions = res.result.map( reg => ({value: reg.id, label: reg.name}))

        this.setState(prevState => ({categories: prevState.categories.concat(this.props.categories), regions: prevState.regions.concat(regions)}))
      })
  }

  fixBlurFunction = rs => {
    const select = rs.select;
    if (!select.onInputBlurPatched) {
      const originalOnInputBlur = select.onInputBlur;
      select.onInputBlur = e => {
        if (select.menuListRef && select.menuListRef.contains(document.activeElement)) {
          select.inputRef.focus();
          return;
        }
        originalOnInputBlur(e);
      }
      select.onInputBlurPatched = true;
    }
  }

  render() {
    const previousDates = [
      { value: 'All publications', label: localization.filtersAllPub },
      { value: 'Last week', label: localization.filtersLastWeek },
      { value: 'Last month', label: localization.filtersLastMonth },
      { value: 'Last year', label: localization.filtersLastYear },
      { value: 'Period', label: localization.filtersPeriod }
    ];

    const nextDates = [
      { value: 'All Events', label: localization.filtersAllEve },
      { value: 'Next week', label: localization.filtersNextWeek },
      { value: 'Next month', label: localization.filtersNextMonth },
      { value: 'Next year', label: localization.filtersNextYear },
      { value: 'Period', label: localization.filtersPeriod }
    ];
    // const spotFilter = [
    //   { value: 'Seas, lakes, reservoirs', label: 'Seas, lakes, reservoirs' },
    //   { value: 'Rivers, springs, waterfalls', label: 'Rivers, springs, waterfalls' },
    //   { value: 'Circuses', label: 'Circuses' },
    //   { value: 'Mausoleums', label: 'Mausoleums' },
    //   { value: 'Sacred places', label: 'Sacred places' }
    // ];
    const customStyles = {
      option: (base, state) => ({
        ...base
      })
    };
    const { type,
      onChange, pubCategories, spotFilter, filterCategory, filterType, isWide } = this.props;
    const { categories, regions } = this.state;

    let defaultRegion;
    if (this.props.defaultRegion) {
      regions.forEach((item) => {
        if (String(item.value) === this.props.defaultRegion) {
          defaultRegion = item;
        }
      });
    }

    if (type === filterTypes.guide) return <GuideSort />;

    if (type === filterTypes.region) {

      return (
        <div className={classNames("sort-block", {"sort-block--wide": isWide})}>
          <Select
            ref={s => (this.select0 = s)}
            id="sel-0"
            instanceId="sel-0"
            options={regions}
            isSearchable={false}
            defaultValue={regions[0]}
            classNamePrefix="select"
            className="select"
            closeMenuOnScroll={true}
            placeholder="Region"
            onChange={e => onChange(e, filterTypes.category)}
          />
        </div>
      );
    }

    if (type === filterTypes.events && !defaultRegion) return null;

    return (
      <div className={classNames('sort-block', {'sort-block--three': type === filterTypes.events || type === filterTypes.spots})}>
        <Select
          ref={s => (this.select1 = s)}
          id="sel-1"
          instanceId="sel-1"
          options={type === filterTypes.spots ? regions : categories}
          isSearchable={false}
          defaultValue={type === filterTypes.spots ? regions[0] : categories[0]}
          classNamePrefix="select"
          className="select"
          closeMenuOnScroll={true}
          placeholder={type === filterTypes.spots ? 'Region' : `${localization.filtersCategory}...`}
          onChange={e => onChange(e, type === filterTypes.spots ? filterTypes.region : filterTypes.category)}
        />
        <Select
          ref={s => (this.select2 = s)}
          id="sel-2"
          instanceId="sel-2"
          options={type === filterTypes.spots ? categories.filter(el => el.value) : type === filterTypes.tours ? regions : type === filterTypes.events ? nextDates : previousDates}
          isSearchable={false}
          defaultValue={type === filterTypes.spots ? filterCategory : type === filterTypes.tours ? regions[0] : ''}
          classNamePrefix="select"
          className="select"
          closeMenuOnScroll={true}
          placeholder={type === filterTypes.spots ? localization.touristSpotCategory : type === filterTypes.tours ? '' : localization.filtersByDate}
          onChange={e => onChange(e, type === filterTypes.spots ? filterTypes.category : type === filterTypes.tours ? filterTypes.region : filterTypes.date)}
        />
        {
          (type === filterTypes.events || type === filterTypes.spots) && (
            <Select
              ref={s => (this.select3 = s)}
              id="sel-3"
              options={type === filterTypes.events ? regions : type === filterTypes.spots ? spotFilter : []}
              isSearchable={false}
              defaultValue={type === filterTypes.spots ? filterType : !!defaultRegion ? defaultRegion : ''}
              classNamePrefix="select"
              className="select"
              closeMenuOnScroll={true}
              placeholder={type === filterTypes.events ? localization.filtersByRegion : `${localization.touristSpotType}...`}
              onChange={e => onChange(e, type)}
            />
          )
        }
      </div>
    );
  }
}
