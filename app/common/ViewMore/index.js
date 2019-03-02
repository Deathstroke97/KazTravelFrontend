import React, { PureComponent } from 'react';
import { bool, string, func } from 'prop-types';
import classNames from 'classnames';
// import { parseCookies } from 'nookies';
import { locStrings } from '../../../static/localization';
import { parseCookies } from '../../../libs/cookies';

export default class ViewMore extends PureComponent {
  static propTypes = {
    isPadding: bool,
    text: string,
    onClick: func
  }

  render() {
    let cookies = parseCookies()
    let lang = cookies['culture'] ? cookies['culture'] : 'en'
    let localization = locStrings[lang]
    const { onClick } = this.props
    return (
      <div className={classNames('view-more', {'view-more--pad': this.props.isPadding})}>
        <button type="button" onClick={() => onClick()} className="btn">{this.props.text || localization.pubViewMore}</button>
      </div>
    );
  }
}
