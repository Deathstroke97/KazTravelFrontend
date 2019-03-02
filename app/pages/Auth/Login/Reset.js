import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { email } from '../../../../libs/formValidators';
import Input from '../../../common/Forms/InputText';
import { LocalizationContext } from '../../../../context'

export default class ResetPassword extends Component {
  state = {
    resetLinkSent: false
  }

  static propTypes = {
    submit: func,
    toggle: func,
  }

  render() {
    const { resetLinkSent } = this.state
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <Fragment>
            <h1 className="content-title">{localization.authResetPassword}</h1>
            <div className="auth-text">{localization.authSendPasswordReset}</div>
            <Formik
              initialValues={{
                email: ''
              }}
              onSubmit={(values, {setFieldError, setFieldTouched, setSubmitting}) => {
                let submit = this.props.submit(values)
                submit.then(() => this.setState({resetLinkSent: true}))
                      .catch(err =>
                        setFieldError('resetError', err.response.data.error.message) ||
                        setFieldTouched('resetError', true, false) ||
                        setSubmitting(false)
                      )
              }}
              render={({ isValid, isSubmitting }) => (
                <Form>
                  <div className="form-block">
                    <label className="label-control isRequired">{localization.authEmail}</label>
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      validate={email}
                    />
                    <ErrorMessage name="resetError" render={err => <div className="form-error form-error--rel">{err}</div>} />
                    {resetLinkSent ? <div className="auth-text">Please check your email for password reset link</div> : null}
                  </div>
                  <div className="form-block">
                    <button className="btn btn--submit" type="submit" disabled={!isValid || isSubmitting}>{localization.authSend}</button>
                    <a href="" className="btn" onClick={e => this.props.toggle(e, false)}>{localization.authBack}</a>
                  </div>
                </Form>
              )}
            />
          </Fragment>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
