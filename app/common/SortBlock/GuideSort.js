import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { Range, Handle } from 'rc-slider';
import Select from 'react-select';
import id from 'uniqid';
import { parseCookies } from 'nookies';
import { locStrings } from '../../../static/localization'

import { fetchData } from '../../../libs/fetchData'
import { filterTypes } from '../../../settings';

let cookies = parseCookies()
let lang = cookies['culture'] ? cookies['culture'] : 'en'
let localization = locStrings[lang]

export default class GuideSort extends Component {
  static propTypes = {
    onChange: func,
  }

  state = {
    min: 0,
    max: 0,
    value: [0, 0],
    regions: [{ value: 'All regions', label: localization.filtersAllRegions }],
    languages: [{ value: 'All languages', label: localization.filtersAllLanguages }],
    specializations: [{ value: 'All specializations', label: localization.filtersAllSpecializations }],
  }

  componentDidMount() {
    fetchData(null, '/commonPub/GetRegions')
      .then(res => {
        let regions = res.result.map( reg => ({value: reg.id, label: reg.name}))

        this.setState(prevState => ({regions: prevState.regions.concat(regions)}))
      })
    fetchData(null, '/commonPub/GetAllLanguages')
      .then(res => {
        let languages = res.result.map( reg => ({value: reg.id, label: reg.displayName}))

        this.setState(prevState => ({languages: prevState.languages.concat(languages)}))
      })
    fetchData(null, '/commonPub/GetGuideSpecializations')
      .then(res => {
        let specializations = res.result.map( reg => ({value: reg.id, label: reg.title}))

        this.setState(prevState => ({specializations: prevState.specializations.concat(specializations)}))
      })
    fetchData(null, '/tripPub/GetMaxGuideCost')
      .then(res => {
        let max = res.result;

        this.setState({max, value: [0, max]})
      })
  }



  rangeChange = (value) => {
    this.setState({
      value,
    });


  }

  render() {
    const { max, min, value, regions, languages, specializations } = this.state;
    const { onChange } = this.props;

    return (
      <div className="sort-block sort-block--guides">
        <Select
          id="sel-1"
          instanceId="sel-1"
          options={regions}
          isSearchable={false}
          defaultValue={regions[0]}
          classNamePrefix="select"
          className="select"
          closeMenuOnScroll={true}
          placeholder="Regions and cities"
          onChange={e => onChange(e, filterTypes.region)}
        />
        <Select
          id="sel-2"
          instanceId="sel-1"
          options={languages}
          isSearchable={false}
          defaultValue={languages[0] }
          classNamePrefix="select"
          className="select"
          closeMenuOnScroll={true}
          placeholder="Language"
          onChange={e => onChange(e, 'language')}
        />
        <Select
          id="sel-3"
          instanceId="sel-1"
          options={specializations}
          isSearchable={false}
          defaultValue={specializations[0] }
          classNamePrefix="select"
          className="select"
          closeMenuOnScroll={true}
          placeholder="Specialization"
          onChange={e => onChange(e, 'specialization')}
        />
        <div className="sort-block-range">
          <Range
            min={min}
            max={max}
            value={value}
            step={100}
            // defaultValue={[min, max]}
            allowCross={false}
            className="range-slider"
            onChange={this.rangeChange}
            onAfterChange={value => this.props.onChange(value, 'range')}
            pushable={25}
            handle={props => {
              return (
                <Handle {...props} dragging="true" key={id()}>
                  <span>{props.value} {localization.guidesTenge}</span>
                </Handle>
              )
            }}
          />
        </div>
      </div>
    );
  }
}

