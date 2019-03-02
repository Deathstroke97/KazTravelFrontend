import React, { PureComponent } from 'react';
import { string, number, oneOfType } from 'prop-types';
import id from 'uniqid';
import classNames from 'classnames';


export default class CabinetWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }

  static propTypes = {
    type: string,
    userId: oneOfType([number, string])
  }

  handleTabClick = active => this.setState({ active })

  render() {
    const { children } = this.props;
    const { active } = this.state;
    return (
      <div className="cabinet">
        <div className="cabinet-container">
          <ul className="clearlist cabinet-tabs">
            {
              children.map((el, i) => <li key={id()} className={classNames([el.props.tabClass], {
                active: i === active,
              })} onClick={() => this.handleTabClick(i)}>{el.props.name}</li>)
            }
          </ul>
          <div className="cabinet-body">
            <div className="cabinet-content">
              {children[active]}
            </div>

          </div>
        </div>

      </div>
    );
  }
}

