import React, { PureComponent } from 'react';
import { object, string, func } from 'prop-types';
import classNames from 'classnames';
import Media from 'react-responsive';

export default class Langs extends PureComponent {
  static propTypes = {
    list: object.isRequired,
    active: string,
    changeLang: func
  }

  state = {
    open: false
  }

  toggleLangMenu = open => {
    if (open) {
      this.setState({ open });
    } else {
      setTimeout(() => {
        this.setState({ open });
      }, 150)
    }
  }

  selectLang = (lang, langCode) => {
    this.setState({open: false}, () => this.props.changeLang(lang, langCode))
  }

  render() {
    const { list, active } = this.props;
    return (
      <div className={classNames('langs', { 'langs--open': this.state.open })}>
        <div className="langs-current" onFocus={() => this.toggleLangMenu(true)}><input onBlur={() => this.toggleLangMenu(false)} type="text" readOnly value={active} /></div>
        <ul className="clearlist langs-select">
          <Media minWidth={1000}>
            {
              Object.keys(list).filter(el => list[el] !== active).map(el => <li key={`lang-${list[el]}`} onClick={() => this.selectLang(list[el], el)}>{list[el]}</li>)
            }
          </Media>
          <Media maxWidth={999}>
            {
              Object.keys(list).map(el => <li className={classNames({ active: active === list[el] })} key={`lang-${list[el]}`} onClick={() => this.selectLang(list[el], el)}>{list[el]}</li>)
            }
          </Media>

        </ul>
      </div>
    );
  }
}
