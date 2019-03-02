import React, { Component } from 'react';
import Wrapper from '../../common/Wrapper';
import Container from '../../common/ContentSection';
import Link from 'next/link'
import { LocalizationContext } from '../../../context'

export default class ServerErrorPage extends Component {
  render() {
    return (
      <Wrapper isDev className="main--shape-1" title="Not Found">
        <LocalizationContext.Consumer>
          {({localization}) => (
            <Container>
              <div className="dev-page">
                <div className="dev-page-icon"><img src="/static/images/icons/icon-server-error.png" alt={localization.serverErrorPageTitle}/></div>
                <h3 className="content-title">{localization.serverErrorPageTitle}</h3>
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
