import React, { PureComponent, Fragment } from 'react';
import { bool, string, object } from 'prop-types';
import SVG from 'react-svg';
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
    const { info: {facebook, instagram, telegram, twitter, youTube, url, title, desc, img } } = this.props;

    return (
      <Fragment>
        <Head>
          <meta property="og:url" content={url}/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={title}/>
          <meta property="og:description" content={desc}/>
          <meta property="og:image" content={img}/>
        </Head>
        <div className="socials">
          <ul className="clearlist">
            {facebook &&
              <li>
                <a href={facebook} target="_blank"><SVG src="/static/images/icons/icon-facebook.svg" /></a>
              </li>
            }
            {twitter &&
              <li>
                <a href={twitter} target="_blank"><SVG src="/static/images/icons/icon-twitter.svg" /></a>
              </li>
            }
            {instagram &&
              <li>
                <a href={instagram} target="_blank"><SVG src="/static/images/icons/icon-twitter.svg" /></a>
              </li>
            }
            {youTube &&
              <li>
                <a href={youTube} target="_blank"><SVG src="/static/images/icons/icon-twitter.svg" /></a>
              </li>
            }
            {telegram &&
              <li>
                <a href={telegram} target="_blank"><SVG src="/static/images/icons/icon-twitter.svg" /></a>
              </li>
            }
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
