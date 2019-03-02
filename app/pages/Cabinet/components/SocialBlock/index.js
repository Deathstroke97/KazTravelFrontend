import React, { Component } from 'react';
// import { FormSection } from 'redux-form';
import { func, object, bool } from 'prop-types';
import { ErrorMessage } from 'formik'

import SocialItem from './SocialItem';
import { LocalizationContext } from '../../../../../context';

export default class CabinetSocial extends Component {
  static propTypes = {
    data: object,
    isEdit: bool
  }

  clearFiled = name => {
    const {isEdit} = this.props
    if(isEdit) this.props.change(`organization.${name}`, '')
  }

  render() {
    const { isEdit, data: { facebook, twitter, instagram, youTube, telegram }, validateSocials } = this.props;
    return (
      <LocalizationContext.Consumer>
        {
          ( {localization} ) => (
            <div className="form-block">
            <div className="label-control">{localization.cabinetNetworkProfiles}</div>
            <div className="cabinet-socials">
              <SocialItem validateSocials={validateSocials} name="facebook" title="Facebook" isEdit={isEdit} value={facebook} cancel={this.clearFiled} />
              <SocialItem validateSocials={validateSocials} name="twitter" title="Twitter" isEdit={isEdit} value={twitter} cancel={this.clearFiled}  />
              <SocialItem validateSocials={validateSocials} name="instagram" title="Instagram" isEdit={isEdit} value={instagram} cancel={this.clearFiled} />
              <SocialItem validateSocials={validateSocials} name="youTube" title="Youtube" isEdit={isEdit} value={youTube} cancel={this.clearFiled} />
              <SocialItem validateSocials={validateSocials} name="telegram" title="Telegram" isEdit={isEdit} value={telegram} cancel={this.clearFiled} />
            </div>
            <ErrorMessage name="socials" render={err => <div className="form-error">{err}</div>} />
          </div>
          )
        }
        </LocalizationContext.Consumer>

    );
  }
}
