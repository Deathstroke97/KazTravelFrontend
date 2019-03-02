import React, { Component } from 'react';
import { array, string } from 'prop-types';
import { fetchData } from '../../../libs/fetchData'
import { LocalizationContext } from '../../../context'
import PageShareLink from '../../common/Socials/PageShareLink';

import Breadcrumbs from '../../common/Breadcrumbs';
import ViewMore from '../../common/ViewMore';

const LIST_MAX_COUNT_INIT = 12;
const LIST_MAX_COUNT_STEP = 6;

class PartnersContent extends Component {
  
  state = {
    listMaxCount: LIST_MAX_COUNT_INIT,
    items: [],
  }
  
  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    const { listMaxCount } = this.state;
    const url = `/homePub/GetPartners?count=${listMaxCount}`;
    
    fetchData(null, url)
      .then(res => {
        const { totalCount, items } = res.result;
        
        this.setState({totalCount, items});
      })
      .catch(err => console.log(err));
  }

  onClickViewMore = () => {
    this.setState({listMaxCount: this.state.listMaxCount + LIST_MAX_COUNT_STEP}, () => this.requestList());
  }
  
  render() {
    const { pathname, originalURL } = this.props;
    const { items, totalCount } = this.state;

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="partners">
            <PageShareLink info={{url: originalURL, title: localization.aboutTitle, desc: localization.partnersHeader, img: '/static/images/logo-dark.svg'}} />
            <Breadcrumbs page={localization.partnersHeader} path={pathname}/>
            <h1 className="content-title content-title--bounded">{localization.partnersHeader}</h1>
            <div className="partners-list">
              {
                !!items && items.map((el, key) => (
                  <div className="partners-list-item" key={key}>
                    <figure className="preview">
                      <img src={el.logoPath}/>
                    </figure>
                    <div className="link">
                      <h3>{el.name}</h3>
                      <a className="link-button" href={el.webReference} target="_blank" rel="noreferrer nofollow">{localization.partnersLink}</a>
                    </div>
                  </div>
                ))
              }
            </div>
            {items && items.length < totalCount &&
              <ViewMore onClick={this.onClickViewMore} />
            }
          </div>
        )}
      </LocalizationContext.Consumer>
    );
  }
}

PartnersContent.propTypes = {
  list: array,
  pathname: string
};

export default PartnersContent;
