import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import axios from 'axios';

import { updateUserAction, validatePhoneAction, validateCabinetPhoneAction, setUser } from '../../../../../store/actions/auth.actions';
import { parseCookies, setCookie } from '../../../../../libs/cookies';
import {smsCodeValidator} from "../../../../../libs/formValidators";

/**
 * Components
 */
import MainBlock from './ProfileMain';
import AboutBlock from './ProfileAbout';
import MediaBlock from './ProfileMedia';
import SafetyBlock from './ProfileSafety';
import LangSelector from '../LanguageSelector';

@connect(({ auth: { phone_valid } }) => ({ phone_valid }), { updateUserAction, validatePhoneAction, validateCabinetPhoneAction, setUser })
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      smsIsSending: false,
      // addLanguage: '',
      editBlocks: {
        main: false,
        about: false,
        safety: false,
        media: false
      },
      phone: '',
      resendTimeout: 0
    };
  }

  static propTypes = {
    about: object,
    main: object,
    media: object,
    user: object,
    userTypes: object
  }

  componentDidUpdate(prevProps, prevState) {
    const { phone_valid } = this.props;
    const { smsIsSending } = prevState;
    if (phone_valid && smsIsSending) {
      this.setState({
        smsIsSending: false
      })
    }
  }

  submitNewPassword = async ({current_password, password, confirm}) => {
    const { api } = this.props
    let cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    const data = {
      currentPassword: current_password,
      newPassword: password,
      newPasswordRepeat: confirm
    }

    return new Promise((resolve, reject) => {
      axios.post(`${api}/services/app/settings/ChangePassword`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
      }).then(resolve)
        .catch(reject)
    })
  }

  submitForm = values => {
    const { api } = this.props;
    let cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    return this.props.updateUserAction(api, token, {
      ...this.props.user,
      ...values
    })
  }

  handleEdit = (block, edit, optional) => {
    this.setState({
      editBlocks: {
        ...this.state.editBlocks,
        [block]: edit
      }
    })
  }

  uploadImages = async (gallery, touch, setError, setSubmitting, type) => {
    const { api, lang, userTypes: { guide, tour, shop } } = this.props
    const cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken'],
        uploadErrors = {}

    for ( const item of gallery) {
      await new Promise((resolve, reject) => {
        if(item.id) {
          let translation = item.translations.length ? item.translations.find( translation => translation.language === lang) : null,
              description = translation ? translation.description : ''

          switch (type) {
            case guide.slug: {
              axios.post(`${api}/services/app/guidePub/UpdateGalleryDescription?id=${item.id}&description=${description}&language=${lang}`, null, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
              }).then(resolve)
                .catch(err => setSubmitting(false) || setError('mediaSectionError', `${err.response.data.error.message} ${err.response.data.error.details}`) || touch('mediaSectionError', true, false) || reject())

              break;
            };
            case tour.slug: {
              axios.post(`${api}/services/app/tourOperatorPub/UpdateGalleryDescription?id=${item.id}&description=${description}&language=${lang}`, null, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
              }).then(resolve)
                .catch(err => setSubmitting(false) || setError('mediaSectionError', `${err.response.data.error.message} ${err.response.data.error.details}`) || touch('mediaSectionError', true, false) || reject())

              break;
            };
            case shop.slug: {
              axios.post(`${api}/services/app/souvenirShopPub/UpdateGalleryDescription?id=${item.id}&description=${description}&language=${lang}`, null, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
              }).then(resolve)
                .catch(err => setSubmitting(false) || setError('mediaSectionError', `${err.response.data.error.message} ${err.response.data.error.details}`) || touch('mediaSectionError', true, false) || reject())

              break;
            };
            default: break;
          }
        } else {
          const formData = new FormData();
          formData.append("image", item.file);
          let translation = item.translations.length ? item.translations.find( translation => translation.language === lang) : null,
              description = translation ? translation.description : ''

          switch (type) {
            case guide.slug: {
              axios.post(`${api}/services/app/guidePub/UploadGallery?description=${description}&language=${lang}`, formData, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
              }).then(resolve)
                .catch(err => setSubmitting(false) || setError('mediaSectionError', `${err.response.data.error.message} ${err.response.data.error.details}`) || touch('mediaSectionError', true, false) || reject())

              break;
            };
            case tour.slug: {
              axios.post(`${api}/services/app/tourOperatorPub/UploadGallery?description=${description}&language=${lang}`, formData, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
              }).then(resolve)
                .catch(err => setSubmitting(false) || setError('mediaSectionError', `${err.response.data.error.message} ${err.response.data.error.details}`) || touch('mediaSectionError', true, false) || reject())

              break;
            };
            case shop.slug: {
              axios.post(`${api}/services/app/souvenirShopPub/UploadGallery?description=${description}&language=${lang}`, formData, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
              }).then(resolve)
                .catch(err => setSubmitting(false) || setError('mediaSectionError', `${err.response.data.error.message} ${err.response.data.error.details}`) || touch('mediaSectionError', true, false) || reject())

              break;
            };
            default: break;
          }
        }
      });
    }

    setSubmitting(false)
    this.handleEdit('media', false);
  }

  sendSMS = phoneNumber => {
    const { phone } = this.state
    const { api } = this.props,
          cookies  = parseCookies(),
          token = cookies['KazTravel.loginToken']

    return new Promise((resolve, reject) => {
      let url = `${api}/services/app/settings/ChangePhoneCheck?phone=${phone.replace(/\+/g, '%2B')}`

      axios.post(url, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(resolve).catch(reject)
    })
  }

  validatePhone = ({code}) => {
    const { phone } = this.state
    const { api } = this.props,
          cookies  = parseCookies(),
          token = cookies['KazTravel.loginToken']

    return this.props.validateCabinetPhoneAction(code, phone, api, token);
  }

  closeModalSms = () => this.setState({ smsIsSending: false, resendTimeout: 0 })

  submitUserInfo = (type, data, setFieldValue) => {
    const { api } = this.props,
        cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    switch (type) {
      case 'guide': {
        axios.post(`${api}/services/app/guidePub/UpdateUserInfo`, data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(() => setFieldValue('organization.name', `${data.surname} ${data.name}`, false))
        break;
      };
      case 'tour-operator': {
        axios.post(`${api}/services/app/tourOperatorPub/UpdateUserInfo`, data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        break;
      };
      case 'shop': {
        axios.post(`${api}/services/app/souvenirShopPub/UpdateUserInfo`, data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        break;
      };
      default: break;
    }
  }

  deleteUser = e => {
    e.preventDefault()
    const { api } = this.props,
        cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    axios.post(`${api}/services/app/settings/DeleteOrganization`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      setCookie(null, 'userType', '', {maxAge: -1, path: '/'})
      setCookie(null, 'KazTravel.loginToken', '', {maxAge: -1, path: '/'})
      this.props.setUser(null)
    })
  }

  // addNewLanguage = lang => {
  //   this.setState({ addLanguage: lang });
  // }

  render() {
    const { user, userTypes, phone_valid, api, commonData, lang } = this.props;
    const { editBlocks: { main, about, media, safety }, smsIsSending, serverErrorMessage, resendTimeout } = this.state;

    const initialValues = {
      ...user,
      organization: {
        ...user.organization,
        name: user.organization.name ? user.organization.name : '',
        facebook: user.organization.facebook ? user.organization.facebook : '',
        twitter: user.organization.twitter ? user.organization.twitter : '',
        instagram: user.organization.instagram ? user.organization.instagram : '',
        youTube: user.organization.youTube ? user.organization.youTube : '',
        telegram: user.organization.telegram ? user.organization.telegram : '',
        regionId: user.organization.regionId ? user.organization.regionId : ''
      },
      address: user.address && user.latitude && user.longtitude ? {value: `${user.longtitude} ${user.latitude}`, label: typeof user.address === 'object' ? user.address.label : user.address} : '',
      additionalInfo: user.additionalInfo ? user.additionalInfo : '',
      description: user.description ? user.description : '',
      current_password: '',
      password: '',
      confirm: '',
      experience: user.experience ? user.experience : '',
      webSite: user.webSite ? user.webSite : ''
    }

    return (
      <Fragment>
        <LangSelector
          lang={lang}
          // selectLanguage={this.addNewLanguage}
          userTypes={userTypes}
          type={user.type}
          gallery={user.organization.gallery || []}
        />
        {
          (
            <Formik
              onSubmit={(values, {setFieldError, setFieldTouched, setTouched, setSubmitting}) => {
                let submitForm = this.submitForm(values)
                submitForm.then(() => {
                  this.handleEdit('about', false)

                  if (values.type === 'guide') setTouched({languages: values.languages.map(lang => ({languageId: false}))})

                  setSubmitting(false)
                }).catch(err =>
                  setFieldError('aboutSectionError', `${err.response.data.error.message} ${err.response.data.error.details}`) ||
                  setFieldTouched('aboutSectionError', true, false) ||
                  setSubmitting(false)
                )
              }}
              initialValues={initialValues}
              render={({values, setFieldValue, setTouched, submitForm, isValid, touched, setFieldError, resetForm, setFieldTouched, isSubmitting, setSubmitting, setValues, ...rest}) => {
                const {
                  organization: {
                    emailAddress,
                    firstName,
                    surname,
                    profileImagePath,
                    gallery,
                    name,
                    phoneNumber,
                    phones,
                    facebook,
                    twitter,
                    youTube,
                    telegram,
                    instagram
                  },
                  webSite,
                  password,
                  confirm,
                  languages,
                  cost,
                  costType,
                  type,
                  description
                } = values;

                return (
                  <Form>

                    <MainBlock
                      api={api}
                      data={{name, phoneNumber, profileImagePath, emailAddress, type}}
                      change={setFieldValue}
                      userTypes={userTypes}
                      submitSection={() => {
                        if (isValid) {
                          this.handleEdit('main', false);

                          const mainInfoData = {
                            name: firstName,
                            surname,
                            phoneNumber
                          }

                          this.submitUserInfo(type, mainInfoData, setFieldValue)
                        }
                      }}
                      deleteUser={this.deleteUser}
                      isEdit={main}
                      phoneTouched={touched.organization ? touched.organization.phoneNumber : false}
                      handleEdit={(name, state) => {
                        this.handleEdit(name, state)
                        if (!state) resetForm()
                      }}
                      sendSMS={(phone) => {
                        this.setState({phone, smsIsSending: true}, () => {
                          let sendSMS = this.sendSMS(phone)
                          sendSMS.catch(err => this.setState({smsIsSending: false}) || setFieldError('organization.phoneNumber', `${err.response.data.error.message}`))
                        })
                      }}
                      smsIsSending={smsIsSending}
                      isValid={isValid}
                      phoneValid={phone_valid}
                    />

                    <hr/>

                    <SafetyBlock
                      submitSection={() => {
                        if (isValid) {
                          setSubmitting(true)
                          let passwordChange = this.submitNewPassword(values)
                          passwordChange.then(() => this.handleEdit('safety', false) || setValues({
                            ...values,
                            current_password: '',
                            password: '',
                            confirm: ''
                          }) || setSubmitting(false))
                            .catch(err => setFieldError('current_password', err.response.data.error.message) || setSubmitting(false))
                        }
                      }}
                      isSubmitting={isSubmitting}
                      data={{password, confirm}}
                      isEdit={safety}
                      isValid={isValid}
                      handleEdit={(name, state) => {
                        this.handleEdit(name, state)
                        if (!state) resetForm()
                      }}
                    />

                    <hr/>

                    <AboutBlock
                      submitSection={() => {
                        if (isValid) {
                          submitForm();
                        }
                      }}
                      isSubmitting={isSubmitting}
                      commonData={commonData}
                      data={{
                        socials: {facebook, twitter, youTube, telegram, instagram},
                        phones,
                        languages,
                        costType,
                        type
                      }}
                      change={setFieldValue}
                      setTouched={setTouched}
                      validateSocials={() => {
                        const socials = {facebook, twitter, youTube, telegram, instagram}

                        for (let key in socials) {
                          if (socials[key] && !/^(http|https):\/\//g.test(socials[key])) {
                            setFieldTouched('socials', true, false)
                            setFieldError('socials', `Invalid link format: ${key}`)
                          }
                        }
                      }}
                      validateWeb={() => {
                        if (webSite && !/^(http|https):\/\//g.test(webSite)) {
                          setFieldTouched('webSite', true, false)
                          setFieldError('webSite', `Invalid web format`)
                        }
                      }}
                      userTypes={userTypes}
                      isEdit={about}
                      name="about"
                      handleEdit={(name, state) => {
                        this.handleEdit(name, state)
                        if (!state) resetForm()
                      }}
                      isValid={isValid && description && phones && !phones.some(el => !/\+7\(\d\d\d\)\d\d\d-\d\d-\d\d/g.test(el.number))}
                    />

                    <hr/>

                    <MediaBlock
                      submitSection={() => {
                        let sendRequestError = gallery.some(item => item.translations.some(translation => !translation.description))
                        if (!gallery.length || sendRequestError) {
                          setFieldTouched('mediaSectionError', true, false)
                          setFieldError('mediaSectionError', 'Photo and Photo caption are required')
                        }

                        if (isValid && !sendRequestError) {
                          setSubmitting(true)
                          this.uploadImages(gallery, setFieldTouched, setFieldError, setSubmitting, type)
                        }
                      }}
                      api={api}
                      data={{gallery, type}}
                      lang={lang}
                      change={setFieldValue}
                      userTypes={userTypes}
                      isEdit={media}
                      name="media"
                      setFieldTouched={setFieldTouched}
                      setFieldError={setFieldError}
                      isSubmitting={isSubmitting}
                      handleEdit={(name, state) => {
                        this.handleEdit(name, state)
                        if (!state) resetForm()
                      }}
                    />

                  </Form>
                );
              }}
            />
          )
        }
        <div className={classNames('auth-modal', {
          'is-open': smsIsSending
        })}>
          <div className="auth-modal-dialog" >
            <i className="auth-modal-close" onClick={this.closeModalSms} />
            <h3 className="cabinet-title">Phone change</h3>
            <div className="cabinet-text">Enter the code from SMS to confirm phone</div>
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
                      <button type="submit" className="btn btn--blue" disabled={!isValid}>Confirm</button>
                    </div>
                  </Form>
                )
              }}
            />
            <div className="cabinet-text">
              No code? {smsIsSending && resendTimeout && resendTimeout !== 25 ? resendTimeout : <a href="" onClick={e => {
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
              }}>Resend</a>}
            </div>

          </div>
        </div>
      </Fragment>

    );
  }
}
