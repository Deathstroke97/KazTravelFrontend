import React, { Component } from 'react';
import Wrapper from '../../common/Wrapper';
import Container from '../../common/ContentSection';
import Link from 'next/link'
import { LocalizationContext } from '../../../context'

export default class DeployPage extends Component {
  render() {
    return (
      <Wrapper isDev className="main--shape-1" title="We are updating the site">
        <LocalizationContext.Consumer>
          {({localization}) => (
            <Container>
              <div className="dev-page">
                <div className="dev-page-icon"><img src="/static/images/icons/icon-deploy.png" alt={localization.deployPageTitle}/></div>
                <h3 className="content-title">{localization.deployPageTitle}</h3>
                <p>{localization.deployPageText}</p>
              </div>
            </Container>
          )}
        </LocalizationContext.Consumer>
      </Wrapper>
    );
  }
}
