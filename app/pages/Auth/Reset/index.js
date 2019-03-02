import React, { Component, Fragment } from 'react';
import { string } from 'prop-types';
import Link from 'next/link'
import { Field, Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios'

import InputField from '../../../common/Forms/InputText';
import { LocalizationContext } from '../../../../context'
import { Routes } from '../../../../settings'

import { resetFormValidator } from '../../../../libs/formValidators';

export default class Login extends Component {
  state = {
    passwordChanged: false
  }

  static propTypes = {
    userId: string,
    resetCode: string
  }

  submitNewPassword = ({password}) => {
    const { api, userId, resetCode } = this.props;
    const data = {
      userId,
      resetCode,
      password
    }

    return axios.post(`${api}/services/app/settings/ResetPasswordCheck`, data)
  }

  render() {
    const { passwordChanged } = this.state
    return (
      <LocalizationContext.Consumer>
        {({localization}) => passwordChanged ? (
          <div className="auth login">
            <div className="auth-text">Your password successfully has been changed, please login using your email and password</div>
            <div className="form-block">
              <Link href={`${Routes.auth.url}/${Routes.auth.login}`}><a className="btn">Login</a></Link>
            </div>
          </div>
        ) : (
          <div className="auth login">
            <h1 className="content-title">
              Password change
            </h1>
            <div className="auth-form">
              <Formik
                initialValues={{
                  password: '',
                  confirm: ''
                }}
                onSubmit={(values, {setFieldError, setFieldTouched, setSubmitting}) => {
                  let submitNewPassword = this.submitNewPassword(values)
                  submitNewPassword.then(() => this.setState({passwordChanged: true}))
                                   .catch(err =>
                                      setFieldError('error', `${err.response.data.error.message} ${err.response.data.error.details}`) ||
                                      setFieldTouched('error', true, false) ||
                                      setSubmitting(false)
                                    )
                }}
                validate={resetFormValidator}
                render={({isValid, isSubmitting}) => (
                  <Form className="form">
                    <div className="form-block">
                      <label htmlFor="password" className="label-control isRequired">{localization.authPassword6Characters}</label>
                      <Field
                        type="password"
                        name="password"
                        component={InputField}
                      />
                    </div>
                    <div className="form-block">
                      <label htmlFor="confirm" className="label-control isRequired">{localization.authRepeatPassword}</label>
                      <Field
                        type="password"
                        name="confirm"
                        component={InputField}
                      />
                    </div>
                    <div className="form-block">
                      <ErrorMessage name="error" render={err => <div className="form-error form-error--rel">{err}</div>} />
                      <button className="btn btn--submit" type="submit" disabled={!isValid || isSubmitting}>Change password</button>
                    </div>
                  </Form>
                )}
              />
            </div>
          </div>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
