import React, {Fragment, Component} from 'react';
import Link from 'next/link';
import {array} from 'prop-types';
import {Map, Placemark, YMaps} from 'react-yandex-maps';
import Media from 'react-responsive';
import {connect} from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { fetchData } from '../../../libs/fetchData'
import {Routes} from '../../../settings';
import moment from 'moment'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
// import {reduxForm, Form, Field} from 'redux-form';

import Input from '../../common/Forms/InputText';
import { LocalizationContext } from '../../../context';



@connect(state => state, { hideLoading, showLoading })
export default class SearchContent extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      request: props.request || ''
    }

    this.state = {
      results: null,
      request: ''
    }
  }

  componentWillMount() {
    const { data, request } = this.props
    this.setState({results: request ? data : null, request})
  }

  submitSearch = ({ request }) => {
    if (request) {
      this.props.showLoading()
      fetchData(null, `/homePub/Search?text=${request}`).then(res => this.setState({results: res.result, request}, () => this.props.hideLoading()))
    }

  }

  render() {
    const {data, slug, lang} = this.props;
    const {results, request} = this.state;
    const publications = results ? results.filter( res => res.searchType === 1) : []
    const tourObjects = results ? results.filter( res => res.searchType === 2) : []



    return (
      <LocalizationContext.Consumer>
        {
          ({localization}) => (

            <div className="contacts">
            <div className="container">
              <div className="content-section">
                <h1 className="content-title">{request == undefined ? localization.searchOnSite
                :  localization.searchFirstPart + localization.searchSecondPart + `«${request}»` + localization.searchThirdPart} </h1>

                <div className="search-form__container">
                  <div className="search-form">
                    <Formik
                      initialValues={this.initialValues}
                      onSubmit={this.submitSearch}
                      render={props => (
                        <Form  className="form">
                          <Field
                            type="text"
                            name="request"
                            component={Input}
                          />
                          <button className="btn--search" type='submit' />
                        </Form>
                      )}
                    />

                  </div>
                  {results ? !results.length ?
                    <p>{localization.searchNotFound}</p>
                    :
                    <Fragment>
                      <p>{localization.searchNumResults}{results.length} </p>
                      <div className="search-results">
                        {!!tourObjects.length && (
                          <Fragment>
                            <h3 className="content-title">{localization.searchNatureAttractions}</h3>
                            <div className="results-list">
                              {tourObjects.map(obj => (
                                <div key={obj.id} className="results-list-item">
                                  <Link as={`${Routes.spot}/${obj.id}/${obj.title}`} href={`${Routes.spot}?slug=${obj.id}&title=${obj.title}`}>
                                    <a>
                                      <img className="results-list-image" src={obj.baseImagePath} alt={obj.title}/>
                                      <div className="results-list-content">
                                        <div className="results-list-title">
                                          {obj.title}
                                        </div>
                                        {/* <div className="results-list-description">
                                          Reserves and zakazniks
                                        </div> */}
                                        <div className="results-list-text">
                                          {obj.description}
                                        </div>
                                        <div className="results-list-location">
                                          <img src="/static/images/icons/icon-location-small.svg" alt={obj.regionName}/> {obj.regionName}
                                        </div>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </Fragment>
                        )}
                        {!!publications.length && (
                          <div className="publications-content">
                            <section className="publications-popular">
                              <h3 className="content-title">{localization.menu1Publications}</h3>
                              <ul className="popular-list clearlist">
                                {publications.map(pub => (
                                  <li key={pub.id}>
                                    <div className="popular-list-img">
                                      <img
                                        src={pub.baseImagePath}
                                        alt={pub.title}/>
                                    </div>
                                    <div className="popular-list-content">
                                      <h4 className="popular-list-title">
                                        <Link as={`${Routes.publications}/${lang}/${pub.id}/${pub.title}`} href={`${Routes.publications}?lang=${lang}&slug=${pub.id}&title=${pub.title}`}>
                                          <a>{pub.title}</a>
                                        </Link>
                                      </h4>
                                      <time className="popular-list-date">{moment(pub.publishDate).format('DD MMMM')}</time>
                                      <p className="popular-list-text">{pub.description}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </section>
                          </div>
                        )}
                      </div>
                    </Fragment>
                    :
                    null
                  }
                </div>
              </div>
            </div>
          </div>
          )


        }
        </LocalizationContext.Consumer>

    )
  }
}
