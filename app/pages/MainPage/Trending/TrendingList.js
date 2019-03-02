import React from 'react';
import { array, func } from 'prop-types';
import classNames from 'classnames';

const TrendingList = ({ list, handler, active }) => {
  return (
    <aside className="trending-list">
      <ul className="clearlist">
        {list.map((el, i) => (
          <li className={classNames({active: active === el.id})} key={`li-${i}`} onClick={() => handler(el)}><span><b>{el.rank < 10 ? `0${el.rank}` : el.rank}</b>{el.title}</span></li>
        ))}
      </ul>
    </aside>
  );
};

TrendingList.propTypes = {
  list: array,
  handler: func
};

export default TrendingList;
