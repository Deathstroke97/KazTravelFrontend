import React, {Component, Fragment} from 'react';
import { object, string, func } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import {Form, Formik, Field, ErrorMessage} from 'formik';
import Link from 'next/link';
import axios from 'axios'

/**
 * Actions
 */
import { registrationAction, validatePhoneAction, validateEmailAction } from '../../../../store/actions/auth.actions';

/**
 * Components
 */
import UserTypeSelector from './UserTypeSelector';
// import InputField from '../../../common/Forms/InputField';
import InputField from '../../../common/Forms/InputText';

/**
 * Utils
 */
import { regFormValidator, smsCodeValidator, required, phoneRequired } from '../../../../libs/formValidators';
import { LocalizationContext } from '../../../../context'

@connect(({ auth: { phone_valid, email_valid } }) => ({ phone_valid, email_valid }), { registrationAction, validatePhoneAction, validateEmailAction })
export default class Registration extends Component {
  constructor(props) {
    super(props);
    const selected = props.user && (props.user === props.types.tour.slug || props.user === props.types.shop.slug || props.user === props.types.guide.slug) ? props.user : props.types.tour.slug;
    this.state = {
      selectedType: selected,
      smsIsSending: false,
      emailIsSending: false,
      phone: null,
      email: null,
      guid: null,
      resendTimeout: 0
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
    registrationAction: func,
    validatePhoneAction: func,
    validateEmailAction: func,
  }

  componentDidUpdate(prevProps, prevState) {
    const { phone_valid, email_valid } = this.props;
    const { smsIsSending, emailIsSending } = prevState;
    if (phone_valid && smsIsSending) {
      this.setState({
        smsIsSending: false
      })
    }
    if (email_valid && emailIsSending) {
      this.setState({
        emailIsSending: false
      })
    }

  }


  submitRegistration = ({ lastName, firstName, password, email, confirm, phone }, actions) => {
    const {  registrationAction, types, api, phone_valid, email_valid } = this.props;
    const { selectedType, guid } = this.state;

    if (phone_valid && email_valid) {
      registrationAction({
        api, lastName, firstName, email, password, type: selectedType, phone, guid
      });
    }
  }

  handleTypeSelect = selectedType => this.setState({ selectedType })

  sendSMS = () => {
    const { phone, guid } = this.state;
    const { api } = this.props

    return new Promise((resolve, reject) => {
      let url = `${api}/services/app/settings/CheckPhone?phone=${phone.replace(/\+/g, '%2B')}`
      if(guid) url = url.concat(`&guid=${guid}`)
      axios.post(url).then(response => this.setState({ guid: response.data.result }, () => resolve())).catch(reject)
    })
  }

  sendEmail = () => {
    const { email, guid } = this.state;
    const { api } = this.props

    return new Promise((resolve, reject) => {
      let url = `${api}/services/app/settings/CheckEmail?email=${email.replace(/\@/g, '%40')}`
      if(guid) url = url.concat(`&guid=${guid}`)
      axios.post(url).then(response => this.setState({ guid: response.data.result }, () => resolve())).catch(reject)
    })
  }

  validatePhone = ({ code }) => {
    const { guid, phone } = this.state
    const { api } = this.props
    return this.props.validatePhoneAction(code, guid, phone, api);
  }

  validateEmail = ({ code }) => {
    const { guid, email } = this.state
    const { api } = this.props
    return this.props.validateEmailAction(code, guid, email, api);
  }

  closeModalSms = () => this.setState({ smsIsSending: false, resendTimeout: 0 })

  closeModalEmail = () => this.setState({ emailIsSending: false, resendTimeout: 0 })

  render() {
    const {
      props: { routes, types, phone_valid, email_valid, originalHost, lang },
      state: { selectedType, smsIsSending, emailIsSending, resendTimeout },
      handleTypeSelect,
      submitRegistration,
      closeModalSms,
      closeModalEmail
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
    
    const styleUserManual = {
      color:'#FE9E2E', 
      marginTop:'-20px', 
      marginBottom: '30px', 
      fontSize:'24px', 
      fontWeight:'bold',
    }

    // console.log(resendTimeout);
    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="auth reg">
            <h1 className="content-title">
              {localization.authRegister}
              <Link href={`${routes.url}?type=${routes.login}`} as={`${routes.url}/${routes.login}`}><a>{localization.authLoginLabel}</a></Link>
            </h1>
            <span className="content-title" style={styleUserManual}>
              ? <a href="/instruction-registration.pdf" style={{marginLeft: 0}} target="_blank">{localization.authInstruction}</a>
            </span>
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
                                success: rest.touched.phone && !rest.errors.phone && phone_valid
                              })}
                              mask="+7(999)999-99-99"
                              maskChar={null}
                              placeholder="+7(___)___-__-__"
                              alwaysShowMask
                            />
                            <ErrorMessage name="phone" render={err => <div className="form-error">{err}</div>} />
                            {rest.touched.phone && !rest.errors.phone && !phone_valid && (
                              <div className="form-error">{localization.authConfirmPhone}</div>
                            )}
                          </Fragment>
                        )}
                      />
                      <button type="button" className="btn--check" onClick={() => {
                        validateForm()
                          .then(res => {
                            if (res.phone) {
                              setFieldTouched('phone', true, true);
                            } else if(!this.state.smsIsSending){
                              this.setState({phone: rest.values.phone, smsIsSending: true}, () => {
                                let sendSMS = this.sendSMS()
                                sendSMS.catch(err => this.setState({smsIsSending: false}) || setFieldError('phone', `${err.response.data.error.message}`))
                              })
                            }
                          })
                        // validateField('phone');
                      }}>{localization.authConfirm}</button>
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
                                success: rest.touched.email && !rest.errors.email && email_valid
                              })}
                            />
                            <ErrorMessage name="email" render={err => <div className="form-error">{err}</div>} />
                            {rest.touched.email && !rest.errors.email && !email_valid && (
                              <div className="form-error">{localization.authConfirmEmail}</div>
                            )}
                          </Fragment>
                        )}
                      />
                      <button type="button" className="btn--check" onClick={() => {
                        validateForm()
                          .then(res => {
                            if (res.email) {
                              setFieldTouched('email', true, true);
                            } else if(!this.state.emailIsSending){
                              this.setState({email: rest.values.email, emailIsSending: true}, () => {
                                let sendEmail = this.sendEmail()
                                sendEmail.catch(err => this.setState({emailIsSending: false}) || setFieldError('email', `${err.response.data.error.message}`))
                              })
                            }
                          })
                        // validateField('phone');
                      }}>{localization.authConfirm}</button>
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
                      <button className="btn btn--submit" type="submit" disabled={!isValid || !phone_valid || !email_valid || isSubmitting}>{localization.authSignUp}</button>
                    </div>
                  </Form>
                )}
              />

              <div className={classNames('auth-modal', {
                'is-open': smsIsSending
              })}>
                <div className="auth-modal-dialog" >
                  <i className="auth-modal-close" onClick={closeModalSms} />
                  <h3 className="cabinet-title">{localization.authPhoneChange}</h3>
                  <div className="cabinet-text">{localization.authEnterCodeFromSMS}</div>
                  <Formik
                    onSubmit={(values, {setFieldError}) => {
                      this.setState({resendTimeout: 0})
                      let validatePhone = this.validatePhone(values)
                      validatePhone.catch(err => setFieldError('code', err.response.data.error.message))
                    }}
                    initialValues={{
                      code: ''
                    }}
                    render={({ isValid }) => {
                      return (
                        <Form className="code-form">
                          <div className="form-block">
                            <Field
                              name="code"
                              validate={smsCodeValidator}
                              render={({field, form, ...rest}) => (
                                <InputMask
                                  {...field}
                                  {...rest}
                                  alwaysShowMask
                                  mask="9999"
                                  maskChar={null}
                                />
                              )}
                            />
                            <ErrorMessage name="code" render={err => <div className="form-error form-error--rel">{err}</div>} />
                          </div>
                          <div className="form-block">
                            <button type="submit" className="btn btn--blue" disabled={!isValid}>{localization.authConfirm}</button>
                          </div>
                        </Form>
                      )
                    }}
                  />
                  <div className="cabinet-text">
                    {localization.authNoCode} {smsIsSending && resendTimeout && resendTimeout !== 25 ? resendTimeout : <a href="" onClick={e => {
                      e.preventDefault()

                      if(!resendTimeout) {
                        this.setState({resendTimeout: 25}, () => {
                          this.sendSMS()

                          const resendInterval = setInterval(() => {
                            if(this.state.resendTimeout) {
                              this.setState(prevState => ({resendTimeout: prevState.resendTimeout - 1}))
                            } else {
                              this.setState({resendTimeout: 0})
                              clearInterval(resendInterval)
                            }
                          }, 1000)
                        })
                      }
                    }}>{localization.authResend}</a>}
                  </div>

                </div>
              </div>

              <div className={classNames('auth-modal', {
                'is-open': emailIsSending
              })}>
                <div className="auth-modal-dialog" >
                  <i className="auth-modal-close" onClick={closeModalEmail} />
                  <h3 className="cabinet-title">{localization.authEmailerifying}</h3>
                  <div className="cabinet-text">{localization.authEnterCodeEmail}</div>
                  <Formik
                    onSubmit={(values, {setFieldError}) => {
                      this.setState({resendTimeout: 0})
                      let validateEmail = this.validateEmail(values)
                      validateEmail.catch(err => setFieldError('code', err.response.data.error.message))
                    }}
                    initialValues={{
                      code: ''
                    }}
                    render={({ isValid }) => {
                      return (
                        <Form className="code-form">
                          <div className="form-block">
                            <Field
                              name="code"
                              validate={required}
                              type="text"
                              component="input"
                            />
                            <ErrorMessage name="code" render={err => <div className="form-error form-error--rel">{err}</div>} />
                          </div>
                          <div className="form-block">
                            <button type="submit" className="btn btn--blue" disabled={!isValid}>{localization.authConfirm}</button>
                          </div>
                        </Form>
                      )
                    }}
                  />
                  <div className="cabinet-text">
                    {localization.authNoCode} {emailIsSending && resendTimeout && resendTimeout !== 25 ? resendTimeout : <a href="" onClick={e => {
                      e.preventDefault()

                      if(!resendTimeout) {
                        this.setState({resendTimeout: 25}, () => {
                          this.sendEmail()

                          const resendInterval = setInterval(() => {
                            if(this.state.resendTimeout) {
                              this.setState(prevState => ({resendTimeout: prevState.resendTimeout - 1}))
                            } else {
                              this.setState({resendTimeout: 0})
                              clearInterval(resendInterval)
                            }
                          }, 1000)
                        })
                      }
                    }}>{localization.authResend}</a>}
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
