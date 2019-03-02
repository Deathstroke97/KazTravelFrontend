import React, { Component } from 'react';
import { number } from 'prop-types';
import classNames from 'classnames';

export default class MainTabsComponent extends Component {
  static propTypes = {
    activeTab: number
  }

  render() {
    const {activeTab, children} = this.props;
    return (
      <div className="main-panes">
        {
          Array.isArray(children) ?
            children.map((el, i) => <div key={`pane-${i}`} className={classNames('pane', {'pane--active': activeTab === i})}>{el}</div>) : children
        }
      </div>
    );
  }
}

