import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';
import classNames from 'classnames';
import SlickSlider from 'react-slick';
import id from 'uniqid';
import Link from 'next/link'
import { Routes } from '../../../../../settings'
import { LocalizationContext } from '../../../../../context';

import { MainContext } from '../../../../../pages/index';

export default class MapPopup extends Component {
  static propTypes = {
    region: object,
    position: object,
    viewport: object
  }

  state = {
    active: 0,
    height: 1,
    local: false
  }

  componentDidMount(){


  }

  componentDidUpdate(prevProps, prevState) {
    let height = 1;
    const { viewport: { width }, region } = this.props;

    if (this.popup) {
      height = this.popup.getBoundingClientRect().height / 2;
    }

    if (prevProps.region && region && prevProps.region.id !== region.id) {
      this.setState({ active: this.props.tab, local: false })
    }
    if (this.state.active !== this.props.tab && !this.state.local) {
      this.setState({
        active: this.props.tab
      })
    }
    if (this.state.height !== height) {
      this.setState({ height })
    }
    if (width < 760) {
      if (region) {
        document.body.classList.add('overflow');
      } else {
        document.body.classList.remove('overflow');
      }
    }
  }

  clickHandle = active => this.setState({ active, local: true })

  renderPopupDialog = () => {
    const { region, position, tab, viewport: { width }, closeHandle } = this.props;
    const content = !!region && region.data[this.state.active];
    const regionId = !!region && this.state.active ? region.data[this.state.active] ? region.data[this.state.active].id : null : !!region ? region.id : null;

    return (
      <div
        className={classNames('map-kz-popup', {
          'is-open': !!region,
          'is-left': position.clientX < 310
        })}
        style={width > 767 ? {
          top: position.clientY - position.mapPosition.top - this.state.height,
          left: position.clientX < 310 ? position.clientX + 10: position.clientX - 320
        } : null}
        ref={p => (this.popup = p)}

      >
        <div className="map-kz-popup-close" onClick={closeHandle} />
        <div className="map-kz-popup-dialog">
          <ul className="map-kz-popup-tabs clearlist"
              onClick={e => e.stopPropagation()}
              onTouchStart={e => e.stopPropagation()}
          >
            {
              !!region && region.data.map((el, i) => <li key={id()} className={classNames({
                active: i === this.state.active
              })} onClick={() => this.clickHandle(i)}>{el.title}</li>)
            }
          </ul>
          <div className="map-kz-popup-panes"
               onClick={e => e.stopPropagation()}
               onTouchStart={e => e.stopPropagation()}
          >
            {
              content && (
                <LocalizationContext.Consumer>
                  {
                    ( {localization} ) => (
                      <Fragment>
                      <div className="map-kz-popup-desc">{ content.description }</div>
                      <div className="map-kz-popup-readmore">
                        <Link
                          as={`${Routes.whereToGo.url}/${Routes.whereToGo.region}/${regionId}/${content.title}`}
                          href={{
                            pathname: Routes.whereToGo.url,
                            query: {
                              type: Routes.whereToGo.region,
                              slug: regionId
                            }
                          }}>
                          <a><span>Подробнее</span></a>
                        </Link>
                      </div>
                      {content.gallery && content.gallery.length > 0 && (
                        <Fragment>
                          <h4 className="map-kz-popup-title">{localization.menu0WhereToGo}</h4>
                          {content.gallery.length > 1 ? (
                            <SlickSlider
                              className="map-kz-popup-gallery"
                              arrows={true}
                            >
                              {content.gallery.map(el => (
                                <div key={id()}>
                                  <figure >
                                    <img src={el.image} alt=""/>
                                    <figcaption>{el.title}</figcaption>
                                  </figure>
                                </div>
                              ))}
                            </SlickSlider>
                          ) : (
                            <div className="map-kz-popup-gallery">
                              <figure>
                                <img src={content.gallery[0].image} alt=""/>
                                <figcaption>{content.gallery[0].title}</figcaption>
                              </figure>
                            </div>
                          )}
                        </Fragment>
                      )}
                    </Fragment>
                    )
                  }
                  </LocalizationContext.Consumer>
              )
            }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { region, position, tab, viewport: { width }, closeHandle } = this.props;

    return (
      width < 760 ? (
        <div onClick={closeHandle} className={classNames('map-kz-popup-wrapper', {
          'is-open': !!region,
        })}>
          { this.renderPopupDialog() }
        </div>
      ) : (
        this.renderPopupDialog()
      )

    );
  }
}
