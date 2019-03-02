import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
// import { Field, FormSection } from 'redux-form';
import { Field, Formik, Form } from 'formik';
import id from 'uniqid';

import { required } from '../../../../../libs/formValidators';

import Input from '../../../../common/Forms/InputText';
import Select from '../../../../common/Forms/SelectField';
import Textarea from '../../../../common/Forms/TextareaField';
import PhotoLoader from '../PhotoLoader';


export default class ShopComplete extends Component {
  static propTypes = {
    submit: func
  }

  state = {
    preview: null
  }

  handleUpload = (e, change) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    this.setState({
      preview,
    }, () => change('logo', {file, preview}))

  }

  render() {
    const { region, submit } = this.props;
    return (
      <Formik
        onSubmit={submit}
        render={({ setFieldValue, isValid, values }) => {
          console.log(values);
          return (
            <Form className="cabinet-complete-form">
              <h3 className="content-title">Information about shop</h3>
              <div className="form-block cabinet-complete-flex">
                <label className="label-control isRequired">Name</label>
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
                  <input type="file" onChange={e => this.handleUpload(e, setFieldValue)}/>
                  <span>Upload logo</span>
                </div>
              </div>
              <div className="form-block">
                <label className="label-control isRequired">Regions/Cities</label>
                <Field
                  component={Select}
                  defaultValue=""
                  name="region"
                  validate={required}
                  label="Choose region"

                >
                  {region.map(el => <option value={el.value} key={id()}>{el.value}</option>)}
                </Field>
              </div>
              <div className="form-block">
                <label htmlFor="description" className="label-control">Description</label>
                <Field
                  name="description"
                  className="form-control"
                  component={Textarea}
                />
              </div>
              <PhotoLoader label="Upload photos to tell travelers more" change={setFieldValue} isEdit={true} gallery={values.gallery || {list: [], cover: ''}} />
              <div className="form-block">
                <button
                  disabled={!isValid}
                  type="submit"
                  className="btn btn--blue btn--submit"
                >Save information</button>
              </div>
            </Form>
          );
        }}
      />

    );
  }
}

