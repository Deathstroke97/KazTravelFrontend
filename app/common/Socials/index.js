import React, { PureComponent, Fragment } from 'react';
import { bool, string, object } from 'prop-types';
import SVG from 'react-svg';
import {
  FacebookShareButton,
  TwitterShareButton,
  VKShareButton
} from 'react-share';
import Head from 'next/head'

export default class Socials extends PureComponent {
  static propTypes = {
    info: object
  }

  copyUrl = e => {
    const { info: {url} } = this.props;
    e.preventDefault();
    this.textarea.value = url;
    this.textarea.select();
    document.execCommand('copy');
  }



  render () {
    const { info: {url, title, desc, img} } = this.props;

    return (
      <Fragment>
        {/* <Head>
          <meta property="og:url" content={url}/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={title}/>
          <meta property="og:description" content={desc}/>
          <meta property="og:image" content={img}/>
        </Head> */}
        <div className="socials">
          <ul className="clearlist">
            {/* <li><a href=""><SVG src="/static/images/icons/icon-like.svg" /></a></li> */}
            <li>
              <FacebookShareButton url={url}>
                <a href=""><SVG src="/static/images/icons/icon-facebook.svg" /></a>
              </FacebookShareButton>
            </li>
            <li>
              <TwitterShareButton url={url}>
                <a href=""><SVG src="/static/images/icons/icon-twitter.svg" /></a>
              </TwitterShareButton>
            </li>
            <li>
              <VKShareButton title={title} description={desc} image={img} url={url}>
                <a href=""><SVG src="/static/images/icons/icon-vk.svg" /></a>
              </VKShareButton>
            </li>
            <li className="copy-link" onClick={this.copyUrl}>
              <a href="" >
                <SVG src="/static/images/icons/icon-link.svg" />
                <span>Copy link</span>
              </a>
            </li>

          </ul>
          <textarea ref={t => (this.textarea = t)} />

        </div>
      </Fragment>
    );
  }

};
