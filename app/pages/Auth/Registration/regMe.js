import React, {Component, Fragment} from 'react';
import { object, string, func } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import {Form, Formik, Field, ErrorMessage} from 'formik';
import Link from 'next/link';

/**
 * Actions
 */
import { registrationActionSimple } from '../../../../store/actions/auth.actions';

/**
 * Components
 */
import UserTypeSelector from './UserTypeSelector';
import InputField from '../../../common/Forms/InputText';

/**
 * Utils
 */
import { regFormValidator } from '../../../../libs/formValidators';
import { LocalizationContext } from '../../../../context'

@connect(null, { registrationActionSimple })
export default class Registration extends Component {
  constructor(props) {
    super(props);
    const selected = props.user && (props.user === props.types.tour.slug || props.user === props.types.shop.slug || props.user === props.types.guide.slug) ? props.user : props.types.tour.slug;
    this.state = {
      selectedType: selected,
      phone: null,
      email: null,
      guid: null
    };
  }

  static propTypes = {
    routes: object,
    types: object,
    password: string,
    lastName: string,
    firstName: string,
    email: string,
    phone: string,
    confirm: string,
    registrationActionSimple: func
  }

  submitRegistration = ({ lastName, firstName, password, email, confirm, phone }, actions) => {
    const {  registrationActionSimple, types, api } = this.props;
    const { selectedType, guid } = this.state;

    registrationActionSimple({
      api, lastName, firstName, email, password, type: selectedType, phone, guid
    });
  }

  handleTypeSelect = selectedType => this.setState({ selectedType })

  render() {
    const {
      props: { routes, types, originalHost, lang },
      state: { selectedType },
      handleTypeSelect,
      submitRegistration
    } = this;

    const getUrl1 = () => {
      switch (lang) {
        case 'ru':    return `${originalHost}files/public/201812/19/ffde1a94bc574fcc960c2a925bcf119e/Пользовательско~.pdf`;
        case 'en':    return `${originalHost}files/public/201812/19/257a07a47ffd4afb8e50934f4546e163/Пользовательско~.pdf`;
        case 'zh-CN': return  `${originalHost}files/public/201812/19/257a07a47ffd4afb8e50934f4546e163/Пользовательско~.pdf`;
        case 'fr':    return  `${originalHost}files/public/201812/19/257a07a47ffd4afb8e50934f4546e163/Пользовательско~.pdf`;
        case 'de':    return  `${originalHost}files/public/201812/19/257a07a47ffd4afb8e50934f4546e163/Пользовательско~.pdf`;
        case 'kk':    return  `${originalHost}files/public/201812/19/c90df497b5c940a0b7adf1c10790aa30/Пользовательско~.pdf`;
      }
    }
    const getUrl2 = () => {
      switch (lang) {
        case 'ru':    return `${originalHost}files/public/201812/19/61094fa7a9ae4fb2b55e01744f69dcda/Соглашение_об_и~.pdf`;
        case 'en':    return `${originalHost}files/public/201812/19/334f469928e4452ab5fee0acf2b177c9/Соглашение_об_и~.pdf`;
        case 'zh-CN': return `${originalHost}files/public/201812/19/334f469928e4452ab5fee0acf2b177c9/Соглашение_об_и~.pdf`;
        case 'fr':    return `${originalHost}files/public/201812/19/334f469928e4452ab5fee0acf2b177c9/Соглашение_об_и~.pdf`;
        case 'de':    return `${originalHost}files/public/201812/19/334f469928e4452ab5fee0acf2b177c9/Соглашение_об_и~.pdf`;
        case 'kk':    return `${originalHost}files/public/201812/19/a20405cda19c42a2b28ab1855a032198/Соглашение_об_и~.pdf`;
      }
    }

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="auth reg">
            <h1 className="content-title">
              {localization.authRegister}
              <Link href={`${routes.url}?type=${routes.login}`} as={`${routes.url}/${routes.login}`}><a>{localization.authLoginLabel}</a></Link>
            </h1>
            <UserTypeSelector selected={selectedType} handleSelect={handleTypeSelect} types={types} />
            <div className="auth-form">
              <Formik
                onSubmit={submitRegistration}
                initialValues={{
                  lastName: '',
                  firstName: '',
                  email: '',
                  password: '',
                  confirm: '',
                  phone: ''
                }}
                validate={regFormValidator}
                render={({ isValid, isSubmitting, setFieldTouched, validateForm, setFieldError, ...rest }) => (
                  <Form>
                    <div className="form-block">
                      <label htmlFor="lastName" className="label-control isRequired">{localization.authLastName}</label>
                      <Field
                        type="text"
                        name="lastName"
                        component={InputField}
                      />
                    </div>
                    <div className="form-block">
                      <label htmlFor="firstName" className="label-control isRequired">{localization.authFirstName}</label>
                      <Field
                        type="text"
                        name="firstName"
                        component={InputField}
                      />
                    </div>
                    <div className="form-block">
                      <label htmlFor="phone" className="label-control isRequired">{localization.authPhoneNumber}</label>
                      <Field
                        name="phone"
                        render={({field, form, ...props}) => (
                          <Fragment>
                            <InputMask
                              {...props}
                              {...field}
                              className={classNames('form-control', {
                                invalid: form.touched.phone && form.errors.phone,
                                success: rest.touched.phone && !rest.errors.phone
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
                      <label htmlFor="email" className="label-control isRequired">{localization.authEmail}</label>
                      <Field
                        type="email"
                        name="email"
                        render={({field, ...props}) => (
                          <Fragment>
                            <input
                              {...field}
                              {...props}
                              className={classNames('form-control', {
                                invalid: props.form.touched.email && props.form.errors.email,
                                success: rest.touched.email && !rest.errors.email
                              })}
                            />
                            <ErrorMessage name="email" render={err => <div className="form-error">{err}</div>} />
                          </Fragment>
                        )}
                      />
                    </div>
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

                      <label className="auth-text">
                        <Field
                          name="info"
                          component="input"
                          type="checkbox"
                          validate={value => !value}
                        />
                        {localization.authReadAreement_1} <a href={getUrl1()} download className="link" target="_blank">{localization.authReadAreement_2}</a> {localization.authReadAreement_3} <a href={getUrl2()} download className="link" target="_blank">{localization.authReadAreement_4}</a> {localization.authReadAreement_5}
                        </label>
                    </div>
                    <div className="form-block">
                      <button className="btn btn--submit" type="submit" disabled={!isValid || isSubmitting}>{localization.authSignUp}</button>
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
