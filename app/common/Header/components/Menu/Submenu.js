import React, { Component } from 'react';
import { number, func, object } from 'prop-types';
import classNames from 'classnames';
// import { parseCookies } from 'nookies';

import MenuType_0 from './MenuType_0';
import MenuType_1 from './MenuType_1';
import MenuType_2 from './MenuType_2';

export default class Submenu extends Component {
  static propTypes = {
    type: number,
    closeMenu: func,
    data: object,

  }

  state = {
    animate: false
  }

  componentDidMount() {
    setTimeout(() => this.setState({ animate: true }), 500);
  }

  renderMenuContent = type => {
    const { localization } = this.props

    switch(type) {
      case 0: return <MenuType_0 localization={localization} data={this.props.data} />;
      case 1: return <MenuType_1 />;
      case 2: return <MenuType_2 localization={localization}/>;

      default: return null
    }

  }

  render() {
    const { type, closeMenu } = this.props;
    return (
      <div onClick={e => e.stopPropagation()} className={classNames('header-submenu', {
        'header-submenu--type-0': type === 0,
        'header-submenu--type-1': type === 1,
        'header-submenu--type-2': type === 2,
        'header-submenu-animate': this.state.animate
      })}>
        <div className="submenu-back" onClick={closeMenu}>Back</div>
        <div className="submenu-content">
          {
            this.renderMenuContent(type)
          }
        </div>

      </div>
    );
  }
}
