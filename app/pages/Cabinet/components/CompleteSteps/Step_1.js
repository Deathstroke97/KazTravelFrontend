import React, { Component, PureComponent, Fragment } from 'react';
import { object, func } from 'prop-types';
import id from 'uniqid';
import { ErrorMessage, Field } from 'formik';
import MultiSelect from 'react-select';

import Input from '../../../../common/Forms/InputText';
import Select from '../../../../common/Forms/SelectField';

import { required } from '../../../../../libs/formValidators';

export default class TourStep1 extends PureComponent {

  static propTypes = {
    data: object,
    change: func
  }

  state = {
    preview: null,
    specs: [
      {value: 'Guide', label: 'Guide'},
      {value: 'Personal driver', label: 'Personal driver'},
      {value: 'Translator', label: 'Translator'},
      {value: 'Photographer', label: 'Photographer'},
      {value: 'Shopping guide', label: 'Shopping guide'}
    ]
  }

  handleUpload = e => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    this.setState({
      preview,
    }, () => this.props.change('logo', {preview, file}))
  }

  render() {

    const { isGuide, region, cost } = this.props;
    const { specs } = this.state;

    const nameLabel = isGuide ?  'Name' : 'Company name';

    return (
      <div className="cabinet-complete-form">
        <h3 className="content-title">Main information</h3>
        <div className="form-block cabinet-complete-flex">
          <label className="label-control isRequired">{nameLabel}</label>
          <Field
            component={Input}
            type="text"
            name="title"
            validate={required}
          />
          <div className="cabinet-logo-loader">
            <div className="cabinet-info-img">
              <div className="cabinet-info-upload">
                <img src={this.state.preview} alt=""/>
              </div>
            </div>
            <input type="file" onChange={this.handleUpload}/>
            <span>Upload logo</span>
          </div>
        </div>
        <div className="form-block">
          <label className="label-control isRequired">Regions/Cities</label>
          <Field
            component={Select}
            name="region"
            validate={required}
            label="Choose region"
          >
            {region.map(el => <option value={el.value} key={id()}>{el.value}</option>)}
          </Field>
        </div>
        {
          isGuide ? (
            <Fragment>
              <div className="form-block">
                <label className="label-control isRequired">Specialization</label>
                <Field
                  name="specialization"
                  validate={required}
                  render={({field, form, ...props}) => (
                    <MultiSelect
                      name={field.name}
                      placeholder="Select specialization"
                      className="multi"
                      classNamePrefix="multi"
                      options={specs}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      isSearchable={false}
                      onChange={option => form.setFieldValue(field.name, option)}
                      onBlur={() =>form.setFieldTouched(field.name, true, true)}
                      value={field.value}
                    />
                  )}
                />
                <ErrorMessage name="specialization" render={err => <div className="form-error">{err}</div>} />
              </div>
              <div className="form-block form-block--selector">
                <label className="label-control">Сost</label>
                <Field
                  component={Input}
                  type="number"
                  placeholder="Input a number"
                  name="cost.value"
                  // validate={required}
                />
                <ul className="selector clearlist">
                  <li>
                    <Field
                      type="radio"
                      name="cost.time"
                      checked={cost.time === 'h'}
                      id="hours"
                      component="input"
                    />
                    <label htmlFor="hours">In hour</label>

                  </li>
                  <li>
                    <Field
                      type="radio"
                      name="cost.time"
                      checked={cost.time === 'd'}
                      id="days"
                      component="input"
                    />
                    <label htmlFor="days">In day</label>

                  </li>
                </ul>
              </div>
            </Fragment>
          ) : (
            <div className="form-block">
              <label className="label-control isRequired">Company address</label>
              <Field
                name="address"
                validate={required}
                component={Input}
                type="text"
              />
            </div>
          )
        }
      </div>
    );
  }


}
