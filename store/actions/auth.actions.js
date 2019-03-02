import { createAction } from 'redux-actions';
import { SET_USER, CHECK_EMAIL, CHECK_PHONE, DONE, FAIL } from '../../constants';

// import { setCookie, parseCookies } from 'nookies';
import axios from 'axios';
import moment from 'moment';

import { userTypes } from '../../settings';
import { setCookie, parseCookies } from '../../libs/cookies';

// export const getUser = createAction(GET_USER);
// const registerSuccessAction = createAction(REGISTRATION + DONE);
// const registerFailAction = createAction(REGISTRATION + FAIL);
export const setUser = createAction(SET_USER);
const validatePhoneDoneAction = createAction(CHECK_PHONE + DONE);
const validatePhoneFailAction = createAction(CHECK_PHONE + FAIL);
const validateEmailDoneAction = createAction(CHECK_EMAIL + DONE);
const validateEmailFailAction = createAction(CHECK_EMAIL + FAIL);

export const updateUserAction = (api, token, data) => dispatch => {
  data.organization.regionId = parseInt(data.organization.regionId)
  const cookies = parseCookies(),
        lang = cookies.culture

  switch(data.type) {
    case 'guide': {
      const dispatchData = {...data}

      let translation = {
        description: data.description,
        additionalInfo: data.additionalInfo,
        language: lang
      }
      let experienceDate = data.experience ? moment().subtract(data.experience, 'years').format() : null

      if(data.organization.translations.map(data => data.language).indexOf(lang) !== -1){
        let pos = data.organization.translations.map(data => data.language).indexOf(lang)
        data.organization.translations[pos] = translation
      } else {
        data.organization.translations = [...data.organization.translations, translation]
      }

      data.organization.name = `${data.organization.surname} ${data.organization.firstName}`
      data.organization.regionId = isNaN(data.organization.regionId) ? null : data.organization.regionId

      delete data.description
      delete data.additionalInfo
      delete data.experience

      const finalData = {
        ...data,
        languages: data.languages.some(lang => lang.languageId && lang.levelType) ? data.languages : [],
        birthDate: data.birthDate.day && data.birthDate.month && data.birthDate.year ? moment.utc(`${data.birthDate.day} ${data.birthDate.month} ${data.birthDate.year}`, "DD MMMM YYYY").format() : null,
        experienceDate,
        costType: parseInt(data.costType),
        guideSpecializations: data.guideSpecializations.map( spec => spec.value )
      }

      return new Promise((resolve, reject) => {
        axios.post(`${api}/services/app/guidePub/UpdateGuide`, finalData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(res => {
          dispatch(setUser(dispatchData))
          resolve()
        }).catch(reject)
      })
      break;
    };
    case 'tour-operator': {
      const dispatchData = {...data}

      let translation = {
        description: data.description,
        additionalInfo: data.additionalInfo,
        language: lang
      }

      if(data.organization.translations.map(data => data.language).indexOf(lang) !== -1){
        let pos = data.organization.translations.map(data => data.language).indexOf(lang)
        data.organization.translations[pos] = translation
      } else {
        data.organization.translations = [...data.organization.translations, translation]
      }

      data.organization.regionId = isNaN(data.organization.regionId) ? null : data.organization.regionId
      data.address = data.address.label

      delete data.description
      delete data.additionalInfo

      return new Promise((resolve, reject) => {
        axios.post(`${api}/services/app/tourOperatorPub/Update`, data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(res => {
          dispatch(setUser(dispatchData))
          resolve()
        }).catch(reject)
      })
      break;
    };
    case 'shop': {
      let translation = {
        description: data.description,
        additionalInfo: data.additionalInfo,
        language: lang
      }

      if(data.organization.translations.map(data => data.language).indexOf(lang) !== -1){
        let pos = data.organization.translations.map(data => data.language).indexOf(lang)
        data.organization.translations[pos] = translation
      } else {
        data.organization.translations = [...data.organization.translations, translation]
      }

      const finalData = {
        name: data.organization.name,
        regionId: isNaN(data.organization.regionId) ? null : data.organization.regionId,
        facebook: data.organization.facebook,
        twitter: data.organization.twitter,
        instagram: data.organization.instagram,
        youTube: data.organization.youTube,
        telegram: data.organization.telegram,
        phones: data.organization.phones,
        translations: data.organization.translations
      }

      return new Promise((resolve, reject) => {
        axios.post(`${api}/services/app/souvenirShopPub/Update`, finalData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(res => {
          dispatch(setUser(data))
          resolve()
        }).catch(reject)
      })
      break;
    };
  }
}

export const loginAction = authData => dispatch => {
  const data = {
    usernameOrEmailAddress: authData.email,
    password: authData.password
  }

  const cookies = parseCookies(),
        lang = cookies.culture

  return new Promise((resolve, reject) => {
    axios.post(`${authData.api}/Account`, data)
    .then(response => {
      setCookie(null, 'KazTravel.loginToken', response.data.result.token, {maxAge: 30 * 24 * 60 * 60, path: '/'})
      setCookie(null, 'userType', response.data.result.type, {maxAge: 30 * 24 * 60 * 60, path: '/'})
      let user = {}
      switch(response.data.result.type) {
        case 1: {
          axios(`${authData.api}/services/app/guidePub/Get`, {
              headers: {
                'Authorization': `Bearer ${response.data.result.token}`
              }
          }).then(res => {
            let translatePos = res.data.result ? res.data.result.organization.translations.map(data => data.language).indexOf(lang) : null
            user = {
              ...res.data.result,
              type: 'guide', // required
              complete_registration: true, // required
              guideSpecializations: res.data.result.guideSpecializations.length ? res.data.result.guideSpecializations.map(spec => ({value: spec.id, label: spec.title})) : [],
              birthDate: {
                day: res.data.result.birthDate ? moment(res.data.result.birthDate).format('DD') : '',
                month: res.data.result.birthDate ? moment(res.data.result.birthDate).format('MMMM') : '',
                year: res.data.result.birthDate ? moment(res.data.result.birthDate).format('YYYY') : ''
              },
              experience: moment().diff(res.data.result.experienceDate, 'years'),
              description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].description : '',
              additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].additionalInfo : ''
            }
            dispatch(setUser(user))
          }).catch( err => dispatch(setUser(null)))
          break;
        };
        case 2: {
          axios(`${authData.api}/services/app/tourOperatorPub/Get`, {
              headers: {
                'Authorization': `Bearer ${response.data.result.token}`
              }
          }).then(res => {
            let translatePos = res.data.result ? res.data.result.organization.translations.map(data => data.language).indexOf(lang) : null
            user = {
              ...res.data.result,
              type: 'tour-operator',
              complete_registration: true,
              description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].description : '',
              additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].additionalInfo : ''
            }
            dispatch(setUser(user))
          }).catch( err => dispatch(setUser(null)))
          break;
        };
        case 3: {
          axios(`${authData.api}/services/app/souvenirShopPub/Get`, {
              headers: {
                'Authorization': `Bearer ${response.data.result.token}`
              }
          }).then(res => {
            let translatePos = res.data.result ? res.data.result.translations.map(data => data.language).indexOf(lang) : null

            user = {
              organization: {
                ...res.data.result
              },
              description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.translations[translatePos].description : '',
              type: 'shop', // required
              complete_registration: true // required
            }
            dispatch(setUser(user))
          }).catch( err => dispatch(setUser(null)))
          break;
        };
        default: dispatch(setUser(null))
      }
      resolve()
    })
    .catch(error => {
      dispatch(setUser(null))
      reject(error)
    });
  })
}

export const registrationAction = regData => dispatch => {
  let type
  switch(regData.type) {
    case 'guide':
      type = 1;
      break;
    case 'tour-operator':
      type = 2;
      break;
    case 'shop':
      type = 3;
      break;
    default: type = 0
  }

  const data = {
    name: regData.firstName,
    surname: regData.lastName,
    emailAddress: regData.email,
    phoneNumber: regData.phone,
    password: regData.password,
    userGuid: regData.guid,
    type
  }

  const cookies = parseCookies(),
        lang = cookies.culture

  axios.post(`${regData.api}/Register`, data)
  .then(function (response) {
    setCookie(null, 'KazTravel.loginToken', response.data.result.token, {path: '/'})
    setCookie(null, 'userType', response.data.result.type, {path: '/'})
    let user = {}
    switch(response.data.result.type) {
      case 1: {
        axios(`${regData.api}/services/app/guidePub/Get`, {
            headers: {
              'Authorization': `Bearer ${response.data.result.token}`
            }
        }).then(res => {
          let translatePos = res.data.result ? res.data.result.organization.translations.map(data => data.language).indexOf(lang) : null
          user = {
            ...res.data.result,
            type: 'guide', // required
            complete_registration: true, // required
            guideSpecializations: res.data.result.guideSpecializations.length ? res.data.result.guideSpecializations.map(spec => ({value: spec.id, label: spec.title})) : [],
            birthDate: {
              day: res.data.result.birthDate ? moment(res.data.result.birthDate).format('DD') : '',
              month: res.data.result.birthDate ? moment(res.data.result.birthDate).format('MMMM') : '',
              year: res.data.result.birthDate ? moment(res.data.result.birthDate).format('YYYY') : ''
            },
            experience: moment().diff(res.data.result.experienceDate, 'years'),
            description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].description : '',
            additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].additionalInfo : ''
          }
          dispatch(setUser(user))
        }).catch( err => dispatch(setUser(null)))
        break;
      };
      case 2: {
        axios(`${regData.api}/services/app/tourOperatorPub/Get`, {
            headers: {
              'Authorization': `Bearer ${response.data.result.token}`
            }
        }).then(res => {
          let translatePos = res.data.result ? res.data.result.organization.translations.map(data => data.language).indexOf(lang) : null

          user = {
            ...res.data.result,
            type: 'tour-operator',
            complete_registration: true,
            description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].description : '',
            additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].additionalInfo : ''
          }
          dispatch(setUser(user))
        }).catch( err => dispatch(setUser(null)))
        break;
      };
      case 3: {
        axios(`${regData.api}/services/app/souvenirShopPub/Get`, {
            headers: {
              'Authorization': `Bearer ${response.data.result.token}`
            }
        }).then(res => {
          let translatePos = res.data.result ? res.data.result.translations.map(data => data.language).indexOf(lang) : null
          
          user = {
            organization: {
              ...res.data.result
            },
            description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.translations[translatePos].description : '',
            type: 'shop', // required
            complete_registration: true // required
          }
          dispatch(setUser(user))
        }).catch( err => dispatch(setUser(null)))
        break;
      };
      default: dispatch(setUser(null))
    }
  })
  .catch(function (error) {
    dispatch(setUser(null))
  });
}

export const registrationActionSimple = regData => dispatch => {
  let type
  switch(regData.type) {
    case 'guide':
      type = 1;
      break;
    case 'tour-operator':
      type = 2;
      break;
    case 'shop':
      type = 3;
      break;
    default: type = 0
  }

  const data = {
    name: regData.firstName,
    surname: regData.lastName,
    emailAddress: regData.email,
    phoneNumber: regData.phone,
    password: regData.password,
    userGuid: regData.guid,
    type
  }

  const cookies = parseCookies(),
        lang = cookies.culture

  axios.post(`${regData.api}/RegisterWithoutConfirmation`, data)
  .then(function (response) {
    setCookie(null, 'KazTravel.loginToken', response.data.result.token, {path: '/'})
    setCookie(null, 'userType', response.data.result.type, {path: '/'})
    let user = {}
    switch(response.data.result.type) {
      case 1: {
        axios(`${regData.api}/services/app/guidePub/Get`, {
            headers: {
              'Authorization': `Bearer ${response.data.result.token}`
            }
        }).then(res => {
          let translatePos = res.data.result ? res.data.result.organization.translations.map(data => data.language).indexOf(lang) : null
          user = {
            ...res.data.result,
            type: 'guide', // required
            complete_registration: true, // required
            guideSpecializations: res.data.result.guideSpecializations.length ? res.data.result.guideSpecializations.map(spec => ({value: spec.id, label: spec.title})) : [],
            birthDate: {
              day: res.data.result.birthDate ? moment(res.data.result.birthDate).format('DD') : '',
              month: res.data.result.birthDate ? moment(res.data.result.birthDate).format('MMMM') : '',
              year: res.data.result.birthDate ? moment(res.data.result.birthDate).format('YYYY') : ''
            },
            experience: moment().diff(res.data.result.experienceDate, 'years'),
            description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].description : '',
            additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].additionalInfo : ''
          }
          dispatch(setUser(user))
        }).catch( err => dispatch(setUser(null)))
        break;
      };
      case 2: {
        axios(`${regData.api}/services/app/tourOperatorPub/Get`, {
            headers: {
              'Authorization': `Bearer ${response.data.result.token}`
            }
        }).then(res => {
          let translatePos = res.data.result ? res.data.result.organization.translations.map(data => data.language).indexOf(lang) : null

          user = {
            ...res.data.result,
            type: 'tour-operator',
            complete_registration: true,
            description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].description : '',
            additionalInfo: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.organization.translations[translatePos].additionalInfo : ''
          }
          dispatch(setUser(user))
        }).catch( err => dispatch(setUser(null)))
        break;
      };
      case 3: {
        axios(`${regData.api}/services/app/souvenirShopPub/Get`, {
            headers: {
              'Authorization': `Bearer ${response.data.result.token}`
            }
        }).then(res => {
          let translatePos = res.data.result ? res.data.result.translations.map(data => data.language).indexOf(lang) : null
          
          user = {
            organization: {
              ...res.data.result
            },
            description: typeof translatePos === 'number' && translatePos !== -1 ? res.data.result.translations[translatePos].description : '',
            type: 'shop', // required
            complete_registration: true // required
          }
          dispatch(setUser(user))
        }).catch( err => dispatch(setUser(null)))
        break;
      };
      default: dispatch(setUser(null))
    }
  })
  .catch(function (error) {
    dispatch(setUser(null))
  });
}

export const validatePhoneAction = (code, guid, phone, api) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/services/app/settings/VerifyPhone?guid=${guid}&phone=${phone.replace(/\+/g, '%2B')}&code=${code}`)
    .then(response => {
      dispatch(validatePhoneDoneAction())
      resolve()
    })
    .catch(error => {
      dispatch(validatePhoneFailAction())
      reject(error)
    });
  })
}

export const validateCabinetPhoneAction = (code, phone, api, token) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/services/app/settings/ChangePhoneVerify?phone=${phone.replace(/\+/g, '%2B')}&code=${code}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      dispatch(validatePhoneDoneAction())
      resolve()
    })
    .catch(error => {
      dispatch(validatePhoneFailAction())
      reject(error)
    });
  })
}

export const validateEmailAction = (code, guid, email, api) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/services/app/settings/VerifyEmail?guid=${guid}&email=${email.replace(/\@/g, '%40')}&code=${code}`)
    .then(response => {
      dispatch(validateEmailDoneAction())
      resolve()
    })
    .catch(error => {
      dispatch(validateEmailFailAction())
      reject(error)
    });
  })
}

const userSuccessData = { // this obj must be received from server if reg or login is success
  id: 27, // required
  email: 'name@email.com', // required
  first_name: 'Name',
  last_name: 'Surname',
  type: userTypes.tour.slug, // required
  complete_registration: true // required
  //... other fields
}

//FIXME Replace this to real server request
function asyncSampleRegistration(regData) {
  userSuccessData.type = regData.type;
  return new Promise(resolve => {
    setTimeout(() => resolve(userSuccessData), 1000);
  })
}

function asyncSampleLogin({ email, password }) {
  return new Promise(resolve => {
    setTimeout(() => resolve(userSuccessData), 1000)
  })
}

function asyncUpdateUserProfile(profile) {
  // update user profile by id
  const user = {
    ...userSuccessData,
    complete_registration: true,
    profile
  }
  return new Promise(resolve => {
    setTimeout(() => resolve(user), 1000)
  })
}

function sampleValidatePhone(code) {
  return new Promise(resolve => setTimeout(() => resolve(), 1000));
}
