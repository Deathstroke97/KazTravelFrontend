import React, { Component, PureComponent, Fragment } from 'react';
import { object, func, string } from 'prop-types';
// import classNames from 'classnames';
import { Field, FieldArray } from 'formik';
import id from "uniqid";
// import InputMask from 'react-input-mask';

import Input from '../../../../common/Forms/InputText';
import SocialBlock from '../SocialBlock/index';
import Textarea from '../../../../common/Forms/TextareaField';
import Select from '../../../../common/Forms/SelectField';
import Calendar from '../CalendarComponent';

// import { required } from '../../../../../libs/formValidators';


export default class TourStep2 extends PureComponent {
  static propTypes = {
    change: func,
    data: object,
    type: string,
    userTypes: object
  };

  state = {
    languages: [{ lang: '', level: '' }],
    langList: ['english', 'french', 'italian'],
    levelsList: ['Elementary', 'Intermediate', 'Advanced']
  }

  renderLanguages = (arrayHelpers) => {
    const { languages, langList, levelsList } = this.state;

    return (
      <div className="cabinet-group">
        <div className="cabinet-add" onClick={() => {
          this.setState({
            languages: [...this.state.languages, { lang: '', level: '' }]
          }, () => arrayHelpers.push({ lang: '', level: '' }))
        }}>+ Add more</div>
        {languages.map((item, i) => (
          <div className="form-group" key={i}>
            <div className="form-block">
              <label className="label-control">Language</label>
              <Field
                label="Choose language"
                component={Select}
                name={`languages.${i}.lang`}
              >
                {langList.map(el => <option value={el} key={id()}>{el}</option>)}
              </Field>
            </div>
            <div className="form-block">
              <label className="label-control">Level of ownership</label>
              <Field
                label="Choose level"
                component={Select}
                name={`languages.${i}.level`}
              >
                {levelsList.map(el => <option value={el} key={id()}>{el}</option>)}
              </Field>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render () {
    const { title, isGuide, change, activeStep } = this.props;

    return (
      <Fragment>
        <h3 className="content-title">{ title }</h3>

        {
          isGuide && (
            <Fragment>
              <div className="form-group form-group--date">
                <div className="form-block">
                  <label className="label-control">Date of birth</label>
                  <Calendar disabled={false} />
                </div>
                <div className="form-block">
                  <label className="label-control">Experience in years</label>
                  <Field
                    type="number"
                    component={Input}
                    name="experience"
                    // disabled={!isEdit}
                  />
                </div>
              </div>

              <FieldArray render={this.renderLanguages} name="languages" />
            </Fragment>
          )
        }

        <SocialBlock isEdit={true} data={{}} {...this.props} change={change} />

        <div className="form-block">
          <label htmlFor="description" className="label-control">{ isGuide ? 'Information about the guide' : 'Description'}</label>
          <Field
            name="description"
            className="form-control"
            component={Textarea}
          />
        </div>
      </Fragment>
    );
  }


};



