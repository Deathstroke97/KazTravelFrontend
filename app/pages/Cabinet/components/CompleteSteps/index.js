import React, { Component, PureComponent } from 'react';
import { func, object } from 'prop-types';
import id from 'uniqid';
import { connect } from 'react-redux';
import classNames from 'classnames';
// import { reduxForm, Form, formValueSelector } from 'redux-form';
import { Formik, Form } from 'formik';

/**
 * Actions
 */
import { updateUserAction } from '../../../../../store/actions/auth.actions';

/**
 * Components
 */
import RegComplete from '../RegistrationComplete';
import ShopComplete from './ShopComplete';
import Step_1 from './Step_1';
import Step_2 from './Step_2';
import Step_3 from './Step_3';


@connect(null, { updateUserAction })
export default class CompleteSteps extends Component {
  static propTypes = {
    updateUserAction: func,
    user: object
  }

  state = {
    activeStep: 0,
    steps: 3
  }

  nextStep = e => {
    e.preventDefault();
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  }

  isGuide = () => this.props.user.type === this.props.userTypes.guide.slug;

  isShop = () => this.props.user.type === this.props.userTypes.shop.slug;

  submit = values => {
    const { updateUserAction, user } = this.props;
    updateUserAction(user, values);
  }

  render() {
    const { main, about, media, valid, change, handleSubmit } = this.props;

    const region = [
      { value: 'Almaty region', label: 'Almaty region' },
      { value: 'Astana region', label: 'Astana region' },
    ];

    const { activeStep, steps } = this.state;

    if (activeStep === 0) return <RegComplete handler={this.nextStep} />;

    const aboutTitle = this.isGuide() ? 'About guide' : 'About company';

    const mediaTitle = this.isGuide() ? 'Photogallery' : 'Photo and video';

    return (
      this.isShop() ? (
        <div className="cabinet-complete">
          <div className="cabinet-complete-panes">
            <ShopComplete region={region} submit={this.submit} />
          </div>
        </div>
      ) : (
        <div className="cabinet-complete">
          <ul className="clearlist cabinet-complete-steps">
            {
              Array(steps).fill().map((el, i) => <li key={id()} className={classNames({
                active: i === activeStep - 1,
                complete: i < activeStep - 1
              })}>Step {i+1}</li>)
            }
          </ul>
          <Formik
            onSubmit={this.submit}
            initialValues={{
              title: '',
              cost: {
                time: 'h',
                value: ''
              },
              birthDate: {
                day: '',
                month: '',
                year: ''
              },
              region: '',
              // phone: '',
              // phones: ['', ''],
              socials: {},
              languages: [{lang: '', level: ''}],
              gallery: {
                cover: '',
                list: []
              },
              video: {}
            }}
            render={({ values, isValid, setFieldValue }) => {
              return (
                <Form>
                  <div className="cabinet-complete-panes">
                    <div className={classNames('pane', { active: activeStep === 1 })}>
                      <Step_1 cost={values.cost} isGuide={this.isGuide()} region={region} change={setFieldValue}/>
                    </div>
                    <div className={classNames('pane', { active: activeStep === 2 })}>
                      <Step_2 title={aboutTitle} isGuide={this.isGuide()} activeStep={activeStep} />
                    </div>
                    <div className={classNames('pane', { active: activeStep === 3 })}>
                      <Step_3 gallery={values.gallery} title={mediaTitle} isGuide={this.isGuide()} change={setFieldValue} />
                    </div>

                    <div className="form-block">
                      {
                        activeStep < steps ?
                          <button
                            disabled={!isValid}
                            onClick={this.nextStep}
                            type="button"
                            className="btn btn--blue"
                          >Next</button> :
                          <button
                            type="submit"
                            className="btn btn--blue btn--submit"
                          >Save information</button>
                      }
                    </div>
                  </div>
                </Form>
              );
            }}
          />


        </div>
      )
    );
  }
}

