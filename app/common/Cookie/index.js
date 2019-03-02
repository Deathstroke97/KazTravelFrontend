import React, { Component } from 'react';
import classNames from 'classnames';
import { parseCookies, setCookie } from '../../../libs/cookies'

export default class Cookie extends Component {
  state = {
    render: false,
    show: false
  }

  componentDidMount() {
    if (window) {
      const agreeCookie = window.sessionStorage.getItem('agreeCookie');
      const cookies = parseCookies(),
            cookieConsent = cookies.CookieConsent

      if (!agreeCookie && !cookieConsent) {
        this.setState({
          render: true
        }, () => {
          setTimeout(() => {
            this.setState({ show: true });
          }, 1000);
        })
      }
    }
  }

  agreeCookie = e => {
    e.preventDefault();
    setCookie(null, 'CookieConsent', true, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    window.sessionStorage.setItem('agreeCookie', true);
    this.setState({
      show: false
    }, () => {
      setTimeout(() => {
        this.setState({ render: false });
      }, 600);
    })
  }

  render() {
    return this.state.render ?  (
      <div className={classNames('cookie-popup', {
        show: this.state.show
      })}>
        <div className="container">
          <h3 className="cookie-popup-title">
            Мы используем файлы cookie
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </h3>
          <div className="cookie-popup-text">
            Подробные сведения об использовании файлов cookie смотрите <a href="/cookies.pdf" target="_blank">здесь</a>. <br/>
            Если вы согласны использовать файлы cookie, нажмите «Я согласен».
          </div>
          <a href="" className="cookie-popup-btn" onClick={this.agreeCookie}>Я согласен</a>
        </div>
      </div>
    ) : null;
  }
}
