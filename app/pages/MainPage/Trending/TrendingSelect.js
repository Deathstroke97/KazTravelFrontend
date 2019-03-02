import React from 'react';
import { array, func, object } from 'prop-types';
import Select, { components } from 'react-select';

const TrendingSelect = ({options, onChange, active}) => {


  const Option = props => (
    <components.Option {...props}>
      <i className="trending-select__icon"><img src={`/static/images/icons/${props.data.icon}`} alt=""/></i>
      {props.children}
    </components.Option>

  )

  const DropdownIndicator = props => {
    return components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <img src="/static/images/icons/icon-lang.svg" alt=""/>
      </components.DropdownIndicator>
    )
  }

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <i className="trending-select__value-icon"><img src={`/static/images/icons/${props.data.icon}`} alt=""/></i>
      {children}
    </components.SingleValue>
  )

  return (
    <Select
      // menuIsOpen={true}
      options={options}
      hideSelectedOptions={true}
      isSearchable={false}
      value={active}
      onChange={onChange}
      className="trending-select"
      classNamePrefix="trending-select"
      maxMenuHeight={500}
      components={{
        Option, DropdownIndicator, SingleValue
      }}
    />
  );
};

TrendingSelect.propTypes = {
  options: array.isRequired,
  onChange: func.isRequired,
  active: object.isRequired
};

export default TrendingSelect;
