import React, { Component, Fragment } from 'react';
import { func, object } from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import classNames from 'classnames';
import id from "uniqid";
import InputMask from "react-input-mask";
import axios from 'axios'
// import { parseCookies } from 'nookies';
import { LocalizationContext } from '../../../../../context';
import { required, phoneRequired } from '../../../../../libs/formValidators';
import { parseCookies } from '../../../../../libs/cookies';

import FormBlock from '../FormBlock';
import MainInfo from '../MainInfoBlock';
import Input from '../../../../common/Forms/InputText';
import Select from '../../../../common/Forms/SelectField';

export default class ProfileMain extends Component {
  static propTypes = {
    submitSection: func,
    change: func,
    data: object,
    userTypes: object
  }

  setImageFile = file => {
    const { api, data: {type}, userTypes: {tour, guide, shop} } = this.props
    let cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    const formData = new FormData();
    formData.append("image", file);

    switch(type) {
      case guide.slug: {
        axios.post(`${api}/services/app/guidePub/UploadProfileImage`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(res => this.props.change('organization.profileImagePath', URL.createObjectURL(file)))

        break;
      };
      case tour.slug: {
        axios.post(`${api}/services/app/tourOperatorPub/UploadProfileImage`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(res => this.props.change('organization.profileImagePath', URL.createObjectURL(file)))

        break;
      };
      case shop.slug: {
        axios.post(`${api}/services/app/souvenirShopPub/UploadProfileImage`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then(res => this.props.change('organization.profileImagePath', URL.createObjectURL(file)))

        break;
      };
      default: break;
    }
  }

  render() {
    const {
      data,
      userTypes: { tour, guide, shop },
      isEdit,
      handleEdit,
      submitSection,
      deleteUser,
      sendSMS,
      smsIsSending,
      phoneTouched,
      isValid,
      phoneValid
    } = this.props;
    const { name, phoneNumber, profileImagePath, emailAddress } = data;

    return (
      <LocalizationContext.Consumer>
        {
        ( {localization} ) => (
        <FormBlock
          title={localization.cabinetMainInformation}
          handleEdit={handleEdit}
          isEdit={isEdit}
          name="main"
        >
          <MainInfo title={name} text={emailAddress} isEdit={isEdit} upload={this.setImageFile} photo={profileImagePath}/>
          <div className="form-block">
            <label htmlFor="organization.firstName" className="label-control isRequired">{localization.cabinetName}</label>
            <Field
              type="text"
              name="organization.firstName"
              component={Input}
              validate={isEdit && required}
              disabled={!isEdit}
            />
          </div>
          <div className="form-block">
            <label htmlFor="organization.surname" className="label-control isRequired">{localization.cabinetSurname}</label>
            <Field
              type="text"
              name="organization.surname"
              component={Input}
              validate={isEdit && required}
              disabled={!isEdit}
            />
          </div>
          <div className="form-block">
            <label className="label-control isRequired">{localization.cabinetPhone}</label>
            <Field
              name="organization.phoneNumber"
              validate={isEdit && phoneRequired}
              render={({field, form, ...props}) => {
                const { setFieldTouched } = form;
                const onChange = (e) => {
                  if (!phoneTouched) setFieldTouched('organization.phoneNumber', true, true);
                  field.onChange(e);
                };

                return (
                  <Fragment>
                    <InputMask
                      {...props}
                      {...field}
                      onChange={onChange}
                      className={classNames('form-control', {
                        invalid: form.touched.organization ? form.touched.organization.phoneNumber && form.errors.phone : false
                      })}
                      mask="+7(999)999-99-99"
                      maskChar={null}
                      placeholder="+7(___)___-__-__"
                      alwaysShowMask
                      disabled={!isEdit}
                    />
                    <ErrorMessage name="organization.phoneNumber" render={err => <div className="form-error">{err}</div>} />
                  </Fragment>
                )
              }}
            />
            {!smsIsSending && isEdit && phoneTouched && <button type="button" className="btn--check" onClick={() => sendSMS(phoneNumber)}>{localization.authCheck}</button>}

          </div>

          {
            isEdit && (
              <div className="form-block">
                <button type="button" className="btn btn--submit" onClick={submitSection} disabled={!isValid || (phoneTouched && !phoneValid)}>{localization.cabinetSaveChanges}</button>
                <button type="button" className="btn" onClick={() => handleEdit('main', false)}>{localization.cabinetRoutesCancel}</button>
                <button type="button" className="btn btn--remove" onClick={deleteUser}>{localization.cabinetDeleteUser}</button>
              </div>
            )
          }

        </FormBlock>
  )

        }
      </LocalizationContext.Consumer>


    );
  }
}
