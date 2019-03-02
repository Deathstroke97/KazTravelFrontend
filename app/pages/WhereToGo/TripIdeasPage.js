import React, { PureComponent, Fragment } from 'react';
import { string, object } from 'prop-types';
import Breadcrumbs from '../../common/Breadcrumbs';

/**
 * Components
 */
import Socials from '../../common/Socials';
import Gallery from "../../common/ContentGallery";
import ContentSlider from '../../common/ContentSlider';

export default class TripIdeasPage extends PureComponent {
  static propTypes = {
    pathname: string,
    content: object
  }

  render() {
    const data = this.props.content
    const { originalURL } = this.props;

    if (!data) return null;

    const {
      baseImagePath,
      content,
      description,
      title,
      blogCategory,
    } = data;

    return (
      <Fragment>
        <Breadcrumbs page={blogCategory}/>
        <h1 className="content-title content-title--bounded">{title}</h1>
        <div className="publications-banner"><img src={baseImagePath} alt={title}/></div>
        <article className="container container--narrow">
          <Socials info={{url: originalURL, title, desc: description, img: baseImagePath}}/>
          <h2 className="content-subtitle content-subtitle--line">{description}</h2>
        </article>

        {content && content.split(/(<img[^\>]*>)/g,).map((splittedText, i) => {
          if(splittedText.includes('img')){
            let splittedImgAttr = splittedText.split(/"/g)
            let src = splittedImgAttr.find(attr => attr.includes('http'))
            return <Gallery key={i} list={{image: src, caption: '', size: 1}}/>
          }

          return (
            <div key={i} className="container container--narrow">
              <div className="content-article" dangerouslySetInnerHTML={{__html: splittedText.replace('content-text', '')}}/>
            </div>
          )
        })}


          {/* <div className="content-text" dangerouslySetInnerHTML={{__html: text_1}}/> */}

          {/* <ul className="content-info clearlist">
            {
              info.map(({ type, value }) => (
                <li key={type}>
                  <h4>{value}</h4>
                  <p>{type}</p>
                </li>
              ))
            }
          </ul> */}
        {/* </article> */}

        {/* <Gallery list={gallery_1}/> */}

        {/* <article className="container container--narrow content-article"
                 dangerouslySetInnerHTML={{__html: text_2}}/>

        <Gallery list={gallery_2}/>

        <article className="container container--narrow content-article"
                 dangerouslySetInnerHTML={{__html: text_3}}/>

        <Gallery list={gallery_3}/>

        <article className="container container--narrow content-article"
                 dangerouslySetInnerHTML={{__html: text_4}}/> */}

        {/* <div className="container container--narrow">

          <h3 className="content-subtitle content-subtitle--line">{subtitle_1}</h3>

          <div className="content-text">
            <p>All these integration processes could not but affect the appearance capital of Kazakhstan. Oriental flavor, presented in European modern and pedantic, immediately enthralls and amazes everyone who decide to travel to one of the coldest capitals in the world. </p>
          </div>

          <ContentSlider slides={gallery_4}/>

          <div className="content-text">
            <p>But despite Astana is always warm due to its «capricious» climate for its harsh fame meets his guests. Changing its appearance in the light of the sun, in heat, cold, rain or frost.she is beautiful. Sparkling with their majestic and unusual buildings, shady parks, shaking wide alleys and streets, Astana forever imprinted in the heart. Perhaps because of this (in addition to its geopolitical position), it is one of the most popular international venues, along with new York, Vienna, Geneva and others. OSCE, OIC, SCO, EurAsEC summits, leaders ' congresses world and traditional religions - all these serious events, from the outcome of which often depends on the fate of millions of people, oftenheld here. Can we now argue that Astana is the heart Eurasia?</p>
          </div>

          <div className="content-video">
            <div className="content-video-player">
              <img src="/static/images/img-video.jpg" alt=""/>
              <div className="content-video-play"/>
            </div>

            <div className="content-video-caption">Astana: video report</div>
          </div>
        </div> */}

      </Fragment>
    );
  }
}
