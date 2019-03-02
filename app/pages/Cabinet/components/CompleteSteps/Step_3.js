import React, { Component, PureComponent, Fragment } from 'react';
import { func, object } from 'prop-types';
// import { Field, FormSection } from 'redux-form';
import { Field } from 'formik';

import Input from '../../../../common/Forms/InputField';
import PhotoLoader from '../PhotoLoader';
import VideoBlock from '../VideoLinkComponent';
import Textarea from '../../../../common/Forms/TextareaField';

export default class TourStep3 extends PureComponent {

  static propTypes = {
    change: func,
    data: object
  };

  render() {
    const { change, data, title, isGuide, gallery } = this.props;
    // const { video: {link} } = data;
    // console.log('render');

    return (
      <Fragment>
        <h3 className="content-title">{ title }</h3>

        {!isGuide && <VideoBlock label="Youtube video about company" isEdit={true} link={null} change={change} />}

        <PhotoLoader label="Upload photos to tell travelers more" change={change} isEdit={true} gallery={gallery || {list: [], cover: ''}}/>

        <div className="form-block">
          <label className="label-control">Additional information</label>
          <Field
            name="additional"
            className="form-control"
            component={Textarea}
          />
        </div>
      </Fragment>
    );
  }

};

