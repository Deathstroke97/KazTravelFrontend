import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../common/Wrapper';
import Container from '../../common/ContentSection';
import classNames from "classnames";
import Link from 'next/link'
import { LocalizationContext } from '../../../context'

export default class DevPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <Wrapper isDev className="main--shape-1" title="Section in development">
        <LocalizationContext.Consumer>
          {({localization}) => (
            <Container>
              <div className="dev-page">
                <div className="dev-page-icon"><img src="/static/images/icons/icon-dev.svg" alt=""/></div>
                <h3 className="content-title">{localization.devPageTitle}</h3>
                <p>{localization.devPageText}</p>
                <Link href="/" passHref>
                  <button className="btn btn--blue">{localization.devPageButton}</button>
                </Link>
              </div>
            </Container>
          )}
        </LocalizationContext.Consumer>
      </Wrapper>
    );
  }
}
