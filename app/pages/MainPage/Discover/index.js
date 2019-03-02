import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import Content from '../../../common/ContentSection';
import WOW from 'react-wow';
import id from 'uniqid';
import MainTitle from '../MainTitle/index';
import { Routes } from '../../../../settings';
import { LocalizationContext } from '../../../../context'

export default class DiscoverSection extends Component {
  static propTypes = {
    nationalPublications: PropTypes.array
  }

  state = {
    scrollAmount: 0
  }

  componentDidMount() {
    if (window) {
      this.setState({
        scrollAmount: document.documentElement.clientWidth
      })
    }

  }

  scrollRight = e => {
    this.scrollTo('right', this.scroll, 30, this.state.scrollAmount);
  }

  scrollLeft = e => {
    this.scrollTo('left', this.scroll, 30,  this.state.scrollAmount);
  }

  scrollTo = (direction, el, step, distance) => {
    let amount = 0;
    const scrollAnimate = () => {
      if (direction === 'left') {
        el.scrollLeft -= step;
      } else {
        el.scrollLeft += step;
      }
      amount += step;
      if (amount <= distance) {
        requestAnimationFrame(scrollAnimate);
      }
    }
    requestAnimationFrame(scrollAnimate);


  }

  render() {

    const {nationalPublications, lang} = this.props;

    // const data = [...nationalPublications, ...nationalPublications, ...nationalPublications];

    const splitArrayIntoChunks = nationalPublications.reduce((acc, el, i) => {
      const ch = Math.floor(i/3);
      acc[ch] = [].concat((acc[ch] || []), el);
      return acc;
    }, []);

    // console.log(splitArrayIntoChunks);

    return (
      <Fragment>
        <Content isOverflow>
          <LocalizationContext.Consumer>
            {({localization}) => <MainTitle name={localization.mainPageDiscoverName} text={localization.mainPageDiscoverText}/>}
          </LocalizationContext.Consumer>
        </Content>

        <section className="content-section discover-overflow">
          <div className="discover-scroll" ref={s => (this.scroll = s)}>
            <div className="discover">
              <WOW
                offset={-200}
              >
                <div className="discover-img"><img src="/static/images/discover-1.png" alt=""/></div>
              </WOW>


              <div className="discover-list clearlist">
                {
                  splitArrayIntoChunks.map(col => (
                    <div className="discover-list-col" key={id()}>
                      {col.map(el => {
                        let title = el.title.split(/\s/g).reduce((acc, currentValue) => {
                          let arrayWithBrSplitted = acc.join('').split('<br/>')

                          if(arrayWithBrSplitted[arrayWithBrSplitted.length - 1].length > 8)
                            acc.push('<br/>')

                          acc.push(currentValue)
                          return acc
                        }, [])

                        return (
                          <WOW
                            offset={-200}
                            key={el.publicationId}
                          >
                            <div className="discover-list-cell">
                              <Link as={`${Routes.publications}/${lang}/${el.publicationId}/${el.title}`} href={`${Routes.publications}?lang=${lang}&slug=${el.publicationId}&title=${el.title}`}>
                                <a>
                                  <div className="discover-list-img">
                                    <span style={{ backgroundImage: `url(${el.imagePath})` }} />
                                    {/*<img src={el.imagePath} alt={el.title}/>*/}
                                  </div>
                                  <h4 className="discover-list-title" dangerouslySetInnerHTML={{__html: title.join(' ')}} />
                                </a>
                              </Link>
                            </div>
                          </WOW>
                        )
                      })}
                    </div>
                  ))
                }

              </div>
            </div>

          </div>
          <div className="discover-scroll-area next" onClick={this.scrollRight} />
          <div className="discover-scroll-area prev" onClick={this.scrollLeft} />
        </section>
      </Fragment>

    );
  }
}
