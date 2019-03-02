import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import WOW from 'react-wow';
import ImageLink from './ImageLink';

export default class ImageLinksBlock extends Component {
  static propTypes = {
    topPublications: PropTypes.array,
    lang: PropTypes.string
  }

  render() {
    const { topPublications, lang } = this.props;
    return (

        <section className="image-links">
          {topPublications.map((el, i) => <ImageLink lang={lang} {...el} key={`link-${i}`} />)}
        </section>

    );
  }
}
