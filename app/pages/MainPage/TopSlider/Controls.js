import React from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';

const SliderControls = ({ data, handler, active }) => {
  return (
    <ul className="top-slider-controls clearlist">
      {data.map((el, i) => (
        <li
          className={classNames({active: active === i})}
          key={`itme-${i}`}
          onClick={() => handler(i)}
        >{el.title}</li>
      ))}
    </ul>
  );
};

SliderControls.propTypes = {
  data: array
};

export default SliderControls;
