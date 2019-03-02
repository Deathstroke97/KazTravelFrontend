import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import { Routes } from '../../../settings';
import Link from 'next/link'

export default class extends PureComponent {
  static propTypes = {
    pubRecommendedList: PropTypes.array,
    lang: PropTypes.string
  }

  render() {
    return (
      <ul className="recommend-list clearlist">
        {
          this.props.pubRecommendedList.map((el, i) => (
            <li key={`item-${el.id}`}>
              <h4 className="recommend-list-title"><Link as={`${Routes.publications}/${this.props.lang}/${el.id}/${el.title}`} href={`${Routes.publications}?lang=${this.props.lang}&slug=${el.id}&title=${el.title}`}><a>{el.title}</a></Link></h4>
              <time className="recommend-list-date">{moment(el.publishDate).format('DD MMMM')}</time>
            </li>
          ))
        }
      </ul>
    );
  }
}
