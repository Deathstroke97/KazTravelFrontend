import React, { Component } from 'react';
import Link from 'next/link';

// import ServerErrorPage from '../app/pages/ServerErrorPage';
import {LocalizationContext} from '../context';
import Container from '../app/common/ContentSection';

import Wrapper from '../app/common/Wrapper';

export default class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }
  render() {
    const { statusCode } = this.props;
    return (
      <Wrapper isDev className="main--shape-1" title="Error">
        <LocalizationContext.Consumer>
          {({localization}) => (
            <Container>
              <div className="dev-page">
                <div className="dev-page-icon"><img src="/static/images/icons/icon-server-error.png" alt={localization.serverErrorPageTitle}/></div>
                <h3 className="content-title">{ statusCode }{localization.serverErrorPageTitle}</h3>
                <p>{localization.serverErrorPageText}</p>
                <Link href="/" passHref>
                  <button className="btn btn--blue">{localization.serverErrorPageButton}</button>
                </Link>
              </div>
            </Container>
          )}
        </LocalizationContext.Consumer>
      </Wrapper>
    );
  }
}
