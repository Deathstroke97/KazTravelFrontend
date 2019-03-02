import React, { Fragment, PureComponent } from 'react';
import { string, oneOf, func, array, object, bool } from 'prop-types';
import classNames from 'classnames';
import WOW from 'react-wow';

import TrendingSelect from '../Trending/TrendingSelect';

export default class MainTitle extends PureComponent {

  static propTypes = {
    name: string,
    text: string,
    isDiff: bool,
    tabHandler: func,
    tabs: array,
    type: oneOf(['white', 'tabs', 'select']),
    options: array,
    onSelectChange: func,
    activeSeason: object
  }

  render() {
    const { isDiff, name, text, type, tabHandler, tabs, activeTab, options, onSelectChange, activeSeason } = this.props;


    return (
      <WOW
        offset={-200}
      >
        <article className={classNames('main-title', {
          'main-title--diff': type === 'tabs' || type === 'select' || isDiff,
          'main-title--white': type === 'white',
        })}>
          {
            !!name && <h3 className="main-title-name">{name}</h3>
          }

          {
            !type || type === 'white' ? text && <div className="main-title-text">{text}</div> : (
              <Fragment>
                {
                  type === 'tabs' && (
                    <ul className="main-tabs clearlist">
                      {tabs.map((el, i) => <li key={`tab-${i}`} className={classNames({active: activeTab === i })} onClick={() => tabHandler(i)}><span>{el}</span></li>)}
                    </ul>
                  )
                }
                {type === 'select' && <TrendingSelect options={options} onChange={onSelectChange} active={activeSeason} />}
              </Fragment>

            )
          }

        </article>
      </WOW>
    );
  }
}
