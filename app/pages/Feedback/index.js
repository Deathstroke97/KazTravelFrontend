import React, { Component, Fragment } from 'react';
import {object, func} from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Link from 'next/link';
import InputMask from 'react-input-mask';
import smoothscroll from 'smoothscroll-polyfill'

import Container from '../../common/ContentSection';
import InputField from '../../common/Forms/InputText';
import TextareaField from '../../common/Forms/TextareaField';
import {email, phoneRequired, required} from '../../../libs/formValidators';
import {loginAction} from '../../../store/actions/auth.actions';
import { LocalizationContext } from '../../../context'
import PageShareLink from '../../common/Socials/PageShareLink';

import axios from 'axios'

@connect(null, { loginAction })
export default class FeedbackForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sentForm: false,
      formSuccess: null
    };
  }

  static propTypes = {}

  sendMessage = values => {
    // e.preventDefault();
    const { api } = this.props
    let data = {
      userFullName: values.fullname,
      userEmail: values.email,
      userPhone: values.phone,
      body: values.description
    }
    const that = this;
    axios.post(`${api}/services/app/homePub/FeedBack`, data)
      .then(function (response) {
        that.setState({
          sentForm: true, formSuccess: response.data.success
        })
        smoothscroll.polyfill();
        window.scrollTo({
          'top': 0,
          'left': 0,
          'behavior': 'smooth'
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  resendForm = e => {
    e.preventDefault();
    this.setState({
      sentForm: false, formSuccess: null //or false
    })
  }

  render() {
    const { originalHost, lang, originalURL } = this.props;
    const {sentForm, formSuccess} = this.state

    const getUrl = () => {
      switch (lang) {
        case 'ru':      return `${originalHost}files/public/201812/19/45ca8d40668342288495f68125d8753f/Соглашение_об_и~.pdf`;
        case 'en':      return `${originalHost}files/public/201812/19/c39b4e1a36cc4e87aa7d36f522aae57a/Соглашение_об_и~.pdf`;
        case 'zh-CN':   return `${originalHost}files/public/201812/19/c39b4e1a36cc4e87aa7d36f522aae57a/Соглашение_об_и~.pdf`;
        case 'fr':      return `${originalHost}files/public/201812/19/c39b4e1a36cc4e87aa7d36f522aae57a/Соглашение_об_и~.pdf`;
        case 'de':      return `${originalHost}files/public/201812/19/c39b4e1a36cc4e87aa7d36f522aae57a/Соглашение_об_и~.pdf`;
        case 'kk':      return `${originalHost}files/public/201812/19/b354326e428d4b3f893f4b862e093ac7/Соглашение_об_и~.pdf`;
      }
    }

    return ((!sentForm)
        ? (
          <LocalizationContext.Consumer>
            {({localization}) => (
              <div className="auth feedback">
                <PageShareLink info={{url: originalURL, title: localization.aboutTitle, desc: localization.footerFeedback, img: '/static/images/logo-dark.svg'}} />
                <h1 className="content-title">
                  {localization.footerFeedback}
                </h1>
                <p>{localization.feedbackGreeting_1}</p>
                <p>{localization.feedbackGreeting_2}</p>
                <div className="feedback-form">
                  <Formik
                    initialValues={{
                      fullname: '',
                      phone: '',
                      email: '',
                      description: ''
                    }}
                    onSubmit={this.sendMessage}
                    render={({isValid}) => {
                      return (
                        <Form className="form">
                          <div className="form-block">
                            <label htmlFor="fullname" className="label-control isRequired">{localization.feedbackName}</label>
                            <Field
                              type="text"
                              name="fullname"
                              component={InputField}
                              localization={localization}
                              validate={required}/>
                          </div>
                          <div className="form-block">
                            <label htmlFor="phone" className="label-control isRequired">{localization.feedbackPhone}</label>
                            <Field
                              name="phone"
                              validate={phoneRequired}
                              render={({field, form, ...props}) => (
                                <Fragment>
                                  <InputMask
                                    {...props}
                                    {...field}
                                    className={classNames('form-control', {
                                      invalid: form.touched.phone && form.errors.phone
                                    })}
                                    mask="+7(999)999-99-99"
                                    maskChar={null}
                                    placeholder="+7(___)___-__-__"
                                    alwaysShowMask
                                  />
                                  <ErrorMessage name="phone" render={err => <div className="form-error">{err}</div>} />
                                </Fragment>
                              )}
                            />
                          </div>
                          <div className="form-block">
                            <label htmlFor="email" className="label-control isRequired">{localization.feedbackEmail}</label>
                            <Field
                              type="email"
                              name="email"
                              component={InputField}
                              validate={email}/>
                          </div>
                          <div className="form-block">
                            <label htmlFor="description" className="label-control isRequired">{localization.feedbackMessage}</label>
                            <Field
                              name="description"
                              component={TextareaField}
                              validate={required}/>
                          </div>

                          <div className="form-block">
                            <label className="auth-text">
                              <Field
                                name="info"
                                component="input"
                                type="checkbox"
                                validate={value => !value}
                              />
                              {localization.feedbacReadAreement_1} <a href={getUrl()} download className="link" target="_blank">{localization.feedbacReadAreement_2}</a> {localization.feedbacReadAreement_3}
                              </label>
                          </div>

                          <div className="form-block">
                            <button className="btn btn--submit" disabled={!isValid}>{localization.feedbackSend}</button>
                          </div>
                        </Form>
                      );
                    }}
                  />

                </div>
              </div>
            )}
          </LocalizationContext.Consumer>
        ) : (sentForm && formSuccess) ? (

          // сообщение об успешной отправке
          <LocalizationContext.Consumer>
            {({localization}) => (
              <Container>
                <div className="dev-page">
                  <div className="dev-page-icon"><img src="/static/images/icons/icon-success.svg" alt=""/></div>
                  <h3 className="content-title">{localization.successMessageTitle}</h3>
                  <p>{localization.successMessageText}</p>
                  <Link href="/" passHref>
                    <button className="btn btn--blue">{localization.successMessageButton}</button>
                  </Link>
                </div>
              </Container>
            )}
          </LocalizationContext.Consumer>
        ) : (
          // сообщение об ошибке при отправке
          <LocalizationContext.Consumer>
            {({localization}) => (
              <Container>
                <div className="dev-page">
                  <div className="dev-page-icon"><img src="/static/images/icons/icon-error.svg" alt=""/></div>
                  <h3 className="content-title">{localization.errorMessageTitle}</h3>
                  <p>{localization.errorMessageText}</p>
                  <button onClick={this.resendForm} className="btn btn--blue">{localization.errorMessageButton}</button>
                </div>
              </Container>
            )}
          </LocalizationContext.Consumer>
        )

    );
  }
}
