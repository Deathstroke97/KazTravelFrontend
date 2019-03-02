import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../common/Wrapper';
import Container from '../../common/ContentSection';
import classNames from "classnames";
import Link from 'next/link'
import { LocalizationContext } from '../../../context'

export default class NotFoundPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <Wrapper isDev className="main--shape-1" title="Not Found">
        <LocalizationContext.Consumer>
          {({localization}) => (
            <Container>
              <div className="dev-page">
                <div className="dev-page-icon"><img src="/static/images/icons/icon-notfound.svg" alt=""/></div>
                <h3 className="content-title">{localization.notFoundPageTitle}</h3>
                {/* <p>{localization.notFoundPageText}</p> */}
                <Link href="/" passHref>
                  <button className="btn btn--blue">{localization.notFoundPageButton}</button>
                </Link>
              </div>
            </Container>
          )}
        </LocalizationContext.Consumer>
      </Wrapper>
    );
  }
}
