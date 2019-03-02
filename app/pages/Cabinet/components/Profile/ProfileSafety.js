import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Field } from 'redux-form';
import { Field } from 'formik';

import { required, passwordValidation } from '../../../../../libs/formValidators';
import FormBlock from '../FormBlock';
import Input from '../../../../common/Forms/InputText';
import { LocalizationContext } from '../../../../../context';

export default class ProfileSafety extends Component {
  static propTypes = {
  }





  render() {
    const {
      isEdit,
      handleEdit,
      isSubmitting,
      submitSection,
      isValid,
      data,
      errorMessageResponse
     } = this.props;

    return (
    <LocalizationContext.Consumer>
      {
        ( {localization} ) => (
          <FormBlock
        title={localization.cabinetSafety}
        isEdit={isEdit}
        handleEdit={handleEdit}
        name="safety"
      >
        <div className="form-block">
          <label className="label-control isRequired">{localization.cabinetCurrentPassword}</label>
          <Field
            type="password"
            component={Input}
            disabled={!isEdit}
            name="current_password"
            validate={isEdit && required}
          />
        </div>
        <div className="form-block">
          <label className="label-control isRequired">{localization.cabinetNewPassword}</label>
          <Field
            type="password"
            component={Input}
            disabled={!isEdit}
            name="password"
            validate={isEdit && passwordValidation(data)}
          />
        </div>
        <div className="form-block">
          <label className="label-control isRequired">{localization.cabinetRepeatNewPassword}</label>
          <Field
            type="password"
            component={Input}
            disabled={!isEdit}
            name="confirm"
            validate={isEdit && passwordValidation(data)}
          />
        </div>
        {
          isEdit && (
            <div className="form-block">
              <button type="button" className="btn btn--submit" onClick={submitSection} disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : localization.cabinetSaveChanges}</button>
              <button type="button" className="btn" onClick={() => handleEdit('safety', false)}>{localization.cabinetRoutesCancel}</button>
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
