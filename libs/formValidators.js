// import { parseCookies } from 'nookies';
import { locStrings } from '../static/localization';
import { parseCookies } from './cookies';

let cookies = parseCookies();
let { culture } = cookies;
let localization = locStrings[culture];

export const required = value => {
  if (Array.isArray(value)) {
    return value.reduce((acc, el) => {

      for (let key in el) {
        if(typeof el[key] === 'number') {
          if (!el[key].toString().length) {
            acc = localization.formValidatorRequired || '';
            break;
          }
        } else {
          if (!el[key].length) {
            acc = localization.formValidatorRequired || '';
            break;
          }
        }
      }
      return acc;
    }, undefined);
  }
  if (typeof value === 'object') {
    return (
      !Object.keys(value).length ? localization.formValidatorRequired : undefined
    )
  }

  if (typeof value === 'number') {
    return (
      !value || !value.toString().length? localization.formValidatorRequired : undefined
    )
  }

  return (
    !value || !value.length
      ? localization.formValidatorRequired
      : undefined
  )
}

export const phoneRequired = value =>
  !value || value && !/\+7\(\d\d\d\)\d\d\d-\d\d-\d\d/g.test(value) ? localization.formValidatorRequired : undefined;

export const smsCodeValidator = value =>
  !value || value && !/\d\d\d\d/g.test(value) ? 'Code is invalid' : undefined;

export const email = value =>
  !value ? localization.formValidatorRequired : value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? localization.formValidatorEmail
    : undefined;

export const minValue = min => value =>
  value && value.length < min ? `Must be at least ${min}` : undefined;

export const passwordValidation = data => value => {
  if(value && !(/^(?=.*\d)(?=.*[a-z]).{6,}$/gm.test(value))) return `Must be at least 6 and contain at least one digit and one lowercase letter`
  if(data.password && data.confirm && data.password !== data.confirm) return 'Fields do not match'

  return (
    !value || !value.length
      ? localization.formValidatorRequired
      : undefined
  )
}

export const matching = (value, allValues) =>
  allValues.password !== allValues.confirm
    ? 'Fields do not match' : undefined;

export const onlyNumbers = value =>
  value && isNaN(+value) ? 'Only numbers' : undefined;

export const regFormValidator = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = localization.formValidatorRequired;
  }
  if (!values.lastName) {
    errors.lastName = localization.formValidatorRequired;
  }
  if (!values.email) {
    errors.email = localization.formValidatorRequired;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = localization.formValidatorEmail;
  }
  if (!values.phone || !/\+7\(\d\d\d\)\d\d\d-\d\d-\d\d/g.test(values.phone)) {
    errors.phone = localization.formValidatorRequired;
  }
  if (!values.password) {
    errors.password = localization.formValidatorRequired;
  } else if (!(/^(?=.*\d)(?=.*[a-z]).{6,}$/gm.test(values.password))) {
    errors.password = `Must be at least 6 and contain at least one digit and one lowercase letter`
  }
  if (!values.confirm) {
    errors.confirm = localization.formValidatorRequired;
  } else if (values.password && values.confirm && values.confirm !== values.password) {
    errors.confirm = 'Passwords do not match'
  }
  if (!values.info) {
    errors.info = 'Confirm policy'
  }
  return errors;
};

export const resetFormValidator = values => {
  const errors = {};

  if (!values.password) {
    errors.password = localization.formValidatorRequired;
  } else if (!(/^(?=.*\d)(?=.*[a-z]).{6,}$/gm.test(values.password))) {
    errors.password = `Must be at least 6 and contain at least one digit and one lowercase letter`
  }
  if (!values.confirm) {
    errors.confirm = localization.formValidatorRequired;
  } else if (values.password && values.confirm && values.confirm !== values.password) {
    errors.confirm = 'Passwords do not match'
  }
  return errors;
};

export const routeFormValidator = values => {
  const errors = {};
  if (!values.tourCategoryId) {
    errors.tourCategoryId = localization.formValidatorRequired;
  }

  if (!values.attractions || !values.attractions.length) {
    errors.attractions = [{ error: 'At least one attraction must be added'}];
  } else {
    const attractionsArrayErrors = [];
    values.attractions.forEach((attract, index) => {
      const attractionErrors = {};
      if (!attract || !attract.tourObjectId) {
        attractionErrors.tourObjectId = localization.formValidatorRequired;
        attractionsArrayErrors[index] = attractionErrors;
      }
      if (!attract || !attract.transportId) {
        attractionErrors.transportId = localization.formValidatorRequired;
        attractionsArrayErrors[index] = attractionErrors;
      }
      if (!attract || !attract.description) {
        attractionErrors.description = localization.formValidatorRequired;
        attractionsArrayErrors[index] = attractionErrors;
      }
    });
    if (attractionsArrayErrors.length) {
      errors.attractions = attractionsArrayErrors;
    }
  }
  if (!values.time.value) {
    errors.time = {
      value: localization.formValidatorRequired
    }
  }
  if (!values.name) {
    errors.name = localization.formValidatorRequired;
  }
  if (!values.regionId) {
    errors.regionId = localization.formValidatorRequired;
  }
  // if (values.video && values.video.link === null) {
  //   errors.video = {
  //     link: 'Invalid YouTube link. Copy link paste here'
  //   }
  // }
  if(!values.gallery || !values.gallery.length) {
    errors.mediaSectionError = 'At least one image must be added'
  } else if(!values.gallery.some(item => item.cover)) {
    errors.mediaSectionError = 'Cover is required'
  } else {
    const galleryArrayErrors = values.gallery.some(item => item.translations.some(translation => !translation.description))
    if (galleryArrayErrors) {
      errors.mediaSectionError = 'Description is required'
    }
  }

  if (!values.cost || !values.cost.length) {
    errors.cost = [{ error: 'At least one visitor must be added' }];
  } else {
    const visitorsArrayErrors = [];
    values.cost.forEach((visitor, index) => {
      const visitorsErrors = {};
      if (!visitor || !visitor.categoryId) {
        visitorsErrors.categoryId = localization.formValidatorRequired;
        visitorsArrayErrors[index] = visitorsErrors;
      }
      if (!visitor || !visitor.cost) {
        visitorsErrors.cost = localization.formValidatorRequired;
        visitorsArrayErrors[index] = visitorsErrors;
      }
    });
    if (visitorsArrayErrors.length) {
      errors.visitors = visitorsArrayErrors;
    }
  }

  if (!values.description) {
    errors.description = localization.formValidatorRequired;
  }

  return errors;
}

export const shopFormValidator = values => {
  const errors = {};
  if (!values.list || !values.list.length) {
    errors.list = [{ error: 'At least one shop must be added' }];
  } else {
    const shopsArrayErrors = [];
    values.list.forEach((shop, index) => {
      const shopErrors = {};
      if (!shop.regionId) {
        shopErrors.regionId = localization.formValidatorRequired;
        shopsArrayErrors[index] = shopErrors;
      }
      if (!shop.phone.length || shop.phone.some(el => !/\+7\(\d\d\d\)\d\d\d-\d\d-\d\d/g.test(el.number))) {
        shopErrors.phone = localization.formValidatorRequired;
        shopsArrayErrors[index] = shopErrors;
      }
      if (!shop.address) {
        shopErrors.address = localization.formValidatorRequired;
        shopsArrayErrors[index] = shopErrors;
      }
      if (!shop.map.place) {
        shopsArrayErrors[index] = shopErrors;
      }
    });
    if (shopsArrayErrors.length) {
      errors.list = shopsArrayErrors;
    }
  }
  return errors;
}

export const completeFormValidator = values => {
  const errors = {};
  if (!values.main.title) {
    errors.title = localization.formValidatorRequired;
  }
  if (!values.main.region) {
    errors.region = localization.formValidatorRequired;
  }
  return errors;
}
