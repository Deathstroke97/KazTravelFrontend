import React, { Component, Fragment } from 'react';
import { string, bool, func } from 'prop-types';
import classNames from 'classnames';
import { Field } from 'formik';
import { LocalizationContext } from '../../../../../context';
import {required} from '../../../../../libs/formValidators';

export default class SocialItem extends Component {
  static propTypes = {
    name: string.isRequired,
    title: string.isRequired,
    value: string,
    isEdit: bool,
    cancel: func
  }

  state = {
    edit: false
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isEdit && this.state.edit) {
      this.cancelField();
    }
  }

  handleEdit = edit => this.setState({ edit })

  cancelField = () => {
    this.setState({ edit: false }, () => {
      this.props.cancel(this.props.name);
    })
  }

  render() {
    const { name, title, value, isEdit, validateSocials } = this.props;
    const { edit } = this.state;
    return (
      <LocalizationContext.Consumer>
        {
          ( {localization} ) => (
            <div className="cabinet-socials-item">
            <div className="cabinet-socials-name">
              <div className={classNames('cabinet-socials-icon', { [name]: true })} />
              <h4 className="cabinet-socials-title">{title}</h4>
            </div>
            <Fragment>
              {
                edit && isEdit ? (
                  <div className="cabinet-socials-field">
                    <Field
                      component="input"
                      name={`organization.${name}`}
                      placeholder="Paste link at network"
                      value={value}
                      onBlur={validateSocials}/>
                  </div>
                ) : (
                  value ? (
                    <div className="cabinet-socials-value">{value}</div>
                  ) : (
                    <button type="button" disabled={!isEdit} className="btn btn--blue" onClick={() => this.handleEdit(true)}>{localization.cabinetAdd}</button>
                  )
                )
              }

              {
                (isEdit && (value || edit)) && <div className="cabinet-socials-cancel" onClick={this.cancelField}/>

              }
            </Fragment>
          </div>
          )
        }
        </LocalizationContext.Consumer>

    );
  }
}
