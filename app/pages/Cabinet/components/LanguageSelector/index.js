import React, { Component, Fragment } from 'react';
import { func, object, oneOfType, string } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Select from 'react-select';
import differenceBy from 'lodash/differenceBy';
import { Field, Formik, Form, FieldArray } from 'formik';
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { setCookie } from '../../../../../libs/cookies'

import Input from '../../../../common/Forms/InputText';
import {required} from '../../../../../libs/formValidators';
import { LocalizationContext } from '../../../../../context';
import Textarea from '../../../../common/Forms/TextareaField';

import { setLang } from '../../../../../store/actions/common.actions';

@connect(null, { setLang, hideLoading, showLoading })
export default class LangSelector extends Component {
  static propTypes = {
    selectLanguage: func,
    lang: oneOfType([object, string])
  }

  state = {
    active: 'en',
    add: false,
    langList: [
      {label: 'English', value: 'en', flag: 'icon-en.svg' },
      {label: 'Russian', value: 'ru', flag: 'icon-ru.svg'},
      {label: 'Kazakh', value: 'kk', flag: 'icon-kz.svg'},
      {label: 'China', value: 'zh-CN', flag: 'icon-ch.svg'},
      {label: 'German', value: 'de', flag: 'icon-de.svg'},
      {label: 'France', value: 'fr', flag: 'icon-fr.svg'},
    ],
    readyLangs: [
      {label: 'English', value: 'en', flag: 'icon-en.svg'},
      {label: 'Russian', value: 'ru', flag: 'icon-ru.svg'},
      {label: 'Kazakh', value: 'kk', flag: 'icon-kz.svg'},
      {label: 'China', value: 'zh-CN', flag: 'icon-ch.svg'},
      {label: 'German', value: 'de', flag: 'icon-de.svg'},
      {label: 'France', value: 'fr', flag: 'icon-fr.svg'},
    ]
  }

  componentWillMount() {
    const { lang } = this.props

    this.setState({active: lang})
  }

  componentDidMount(){
    this.props.hideLoading()
  }

  addLang = e => {
    e.preventDefault();
    this.setState({ add: true });
  }

  changeLang = (e, active) => {
    e.preventDefault();
    let lang

    this.setState({ active }, () => this.props.showLoading())
    setCookie(this, 'culture', active, {
      path: '/',
    })

    switch(active) {
      case 'en': lang = 'En'; break;
      case 'ru': lang = 'Ru'; break;
      case 'kk': lang = 'Kz'; break;
      case 'zh-CN': lang = 'Cn'; break;
      case 'fr': lang = 'Fr'; break;
      case 'de': lang = 'De'; break;
      default: break;
    }

    this.props.setLang(lang)
    location.reload();
  }

  cancelAdd = () => {
    this.setState({
      add: false
    }, () => this.props.selectLanguage(''))
  }

  render() {
    const { langList, add, readyLangs, active } = this.state;
    const { lang, selectLanguage, userTypes: {guide, tour, shop}, type, gallery} = this.props;


    return (
      <LocalizationContext.Consumer>
        {
          ({ localization }) => (
            <Fragment>
              <div className="lang-selector">
                <ul className="clearlist lang-selector-list">
                  {readyLangs.map((el, i) => <li key={i} className={classNames({active: el.value === active})}><a href="" onClick={e => this.changeLang(e, el.value)}><img src={`/static/images/icons/${el.flag}`} alt={el.value}/>{el.label}</a></li>)}
                  {
                    // !add && <li><a href="" onClick={this.addLang} className="add-lang">+ Another language</a></li>
                  }
                </ul>

                {/* {
                  add && (
                    <div className="lang-selector-add">
                      <h3 className="cabinet-title">Добавление другого языка</h3>
                      <Select
                        options={differenceBy(langList, readyLangs, 'value')}
                        isSearchable={false}
                        classNamePrefix="select"
                        className="select"
                        value={lang}
                        onChange={selectLanguage}
                      />
                    </div>
                  )
                } */}
              </div>
              {/* {
                lang && (
                  <Formik
                    onSubmit={values => console.log(values)}
                    render={({ isSubmitting, isValid }) => {
                      return (
                        <Form>
                          <div className="form-block">
                            <label htmlFor="organization.firstName" className="label-control isRequired">{localization.cabinetName}</label>
                            <Field
                              type="text"
                              name="organization.firstName"
                              component={Input}
                              validate={required}
                            />
                          </div>
                          <div className="form-block">
                            <label htmlFor="organization.surname" className="label-control isRequired">{localization.cabinetSurname}</label>
                            <Field
                              type="text"
                              name="organization.surname"
                              component={Input}
                              validate={required}
                            />
                          </div>
                          <div className="form-block">
                            <label htmlFor="description"
                                   className="label-control">{type === tour.slug || type === shop.slug ? localization.cabinetDescription : localization.cabinetGuideInformation}</label>
                            <Field
                              name="description"
                              className="form-control"
                              component={Textarea}
                            />
                          </div>

                          <div className="form-block">
                            <div className="cabinet-gallery-list">
                              <FieldArray
                                name="gallery"
                                render={() => (
                                  gallery.map((file, i) => (
                                    <figure className="cabinet-gallery-item" key={i}>
                                      <div className="cabinet-gallery-img">
                                        <img src={file.imagePath} alt=""/>
                                      </div>
                                      <figcaption className="cabinet-video-caption">
                                        <Field
                                          component="input"
                                          placeholder={localization.cabinetPhotoCaption}
                                          type="text"
                                          // value={file.description}
                                          name={`gallery.[${i}].description`}
                                        />

                                      </figcaption>

                                    </figure>
                                  ))
                                )}
                              />

                            </div>
                          </div>



                          <div className="form-block">
                            <label className="label-control">{localization.cabinetAdditionalInformation}</label>
                            <Field
                              name="additionalInfo"
                              className="form-control"
                              component={Textarea}
                            />
                          </div>



                          <div className="form-block">
                            <button
                              type="submit"
                              className="btn btn--submit"
                              disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Добавить'}</button>
                            <button
                              type="button"
                              className="btn"
                              onClick={this.cancelAdd}>{localization.cabinetRoutesCancel}</button>
                          </div>

                        </Form>
                      );
                    }}
                  />
                )
              } */}

            </Fragment>
          )
        }

      </LocalizationContext.Consumer>
    );
  }
}
