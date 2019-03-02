import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Routes } from '../../../settings';
import Link from 'next/link';
import moment from 'moment'

export default class PopularList extends PureComponent {
  static propTypes = {
    pubPopularList: PropTypes.array,
    lang: PropTypes.string
  }

  render() {
    return (
      <ul className="popular-list clearlist">
        {
          this.props.pubPopularList.map((el, i) => (
            <li key={`iten-${el.id}`}>
              <div className="popular-list-img"><img src={el.baseImagePath} alt={el.title}/></div>
              <div className="popular-list-content">
                <Link as={`${Routes.publications}/${this.props.lang}/${el.id}/${el.title}`} href={`${Routes.publications}?lang=${this.props.lang}&slug=${el.id}&title=${el.title}`}>
                  <h4 className="popular-list-title">
                    <a href="">
                      {el.title}
                    </a>
                  </h4>
                </Link>
                <time className="popular-list-date">{moment(el.publishDate).format('DD MMMM')}</time>
                <p className="popular-list-text">{el.description}</p>
              </div>
            </li>
          ))
        }

      </ul>
    );
  }
}
