import React, { Component, Fragment } from 'react';
import { object, func } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import axios from 'axios'

import InputText from '../../../common/Forms/InputText';
import ResetEmail from './Reset';
import { email, required } from '../../../../libs/formValidators';
import { loginAction } from '../../../../store/actions/auth.actions';
import { LocalizationContext } from '../../../../context'

@connect(null, { loginAction })
export default class Login extends Component {
  static propTypes = {
    routes: object,
    loginAction: func
  }

  state = {
    reset: false
  }

  toggleReset = (e, reset) => {
    e.preventDefault();
    this.setState({ reset });
  }

  submitLogin = (values, actions) => {
    const { loginAction, api } = this.props;
    return loginAction({api, ...values});
  }

  submitReset = ({email}) => {
    const { api } = this.props

    return axios.post(`${api}/services/app/settings/ResetPassword?email=${email}`)
  }

  render() {
    const { routes, valid } = this.props;
    const { reset } = this.state;
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="auth login">
            {reset ? <ResetEmail submit={this.submitReset} toggle={this.toggleReset} /> : (
              <Fragment>
                <h1 className="content-title">
                  {localization.authLoginLabel}
                  <Link href={`${routes.url}?type=${routes.reg}`} as={`${routes.url}/${routes.reg}`}><a>{localization.authRegister}</a></Link>
                </h1>
                <div className="auth-form">
                  <Formik
                    initialValues={{
                      email: '',
                      password: ''
                    }}
                    onSubmit={(values, {setFieldError, setFieldTouched, setSubmitting}) => {
                      let submitLogin = this.submitLogin(values)
                      submitLogin.catch(err =>
                        setFieldError('error', `${err.response.data.error.message} ${err.response.data.error.details}`) ||
                        setFieldTouched('error', true, false) ||
                        setSubmitting(false)
                      )
                    }}
                    render={({isValid, isSubmitting}) => (
                      <Form className="form">
                        <div className="form-block">
                          <label htmlFor="email" className="label-control isRequired">{localization.authEmail}</label>
                          <Field
                            type="email"
                            name="email"
                            component={InputText}
                            className="form-control"
                            validate={email}
                          />
                        </div>
                        <div className="form-block">
                          <label htmlFor="password" className="label-control isRequired">{localization.authPassword}</label>
                          <Field
                            type="password"
                            name="password"
                            component={InputText}
                            className="form-control"
                            validate={required}
                          />
                        </div>
                        <div className="form-block">
                          <ErrorMessage name="error" render={err => <div className="form-error form-error--rel">{err}</div>} />
                          <div className="form-block-text">
                            <a href="" onClick={e => this.toggleReset(e, true)}>{localization.authForgotPassword}</a>
                          </div>
                        </div>
                        <div className="form-block">
                          <button className="btn btn--submit" type="submit" disabled={!isValid || isSubmitting}>{localization.authLoginButton}</button>
                        </div>
                      </Form>
                    )}
                  />
                </div>
              </Fragment>
            )}

          </div>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
