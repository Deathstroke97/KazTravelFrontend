import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { object } from 'prop-types';
import Link from 'next/link'
import { Routes } from '../../../../settings';

export default class TrendingArticle extends PureComponent {
  static propTypes = {
    article: object
  }

  state = {
    read: false
  }

  render() {
    const { article } = this.props;
    if (!article) return null;

    let text = article.content ? article.content.replace(/<img[^\>]*>/g, "") : ''
    text = text.replace(/<article[^\>]*>/g, "")
    text = text.replace(/<\/article>/g, "")

    return (
      <section className="trending-article">
        <figure className="trending-article-img"><img src={article.image} alt=""/>
          <figcaption>{article.imageCaption}</figcaption>
        </figure>
        <article
          className={classNames('trending-article-text', {
            'read-all': this.state.read
          })}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <div className="trending-article-read">
          <Link as={`${Routes.publications}/${article.rankId}/${article.imageCaption}`} href={`${Routes.publications}?slug=${article.rankId}&title=${article.imageCaption}`}>
            <a href="" className="under-link under-link--arr">
              <b>{this.state.read ? 'Read less' : 'Read more'}</b>
            </a>
          </Link>
        </div>
      </section>
    );
  }
};
