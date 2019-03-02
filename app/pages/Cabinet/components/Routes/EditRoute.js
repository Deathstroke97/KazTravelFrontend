import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import id from 'uniqid';
import { parseCookies } from '../../../../../libs/cookies';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import axios from 'axios'
// import {reduxForm, Field, Form, FieldArray, formValueSelector, FormSection} from 'redux-form';

import { routeFormValidator } from '../../../../../libs/formValidators';


/**
 * Actions
 */
import { saveRouteAction, cancelEditAction, updateRouteAction } from '../../../../../store/actions/cabinet.actions';

/**
 * Components
 */
import Input from '../../../../common/Forms/InputText';
import Select from '../../../../common/Forms/SelectField';
import Text from '../../../../common/Forms/TextareaField';
import RouteAttraction from './RouteAttraction';
import VideoLinkBlock from '../VideoLinkComponent';
import PhotoUploader from '../PhotoLoader';
import Visitors from './Visitors';
import { LocalizationContext } from '../../../../../context'


@connect(null, { saveRouteAction, cancelEditAction, updateRouteAction })
export default class EditTourRoute extends Component {
  constructor(props) {
    super(props);
    this.initialValues = props.route ? props.route : {
      tourCategoryId: '',
      attractions: [{ tourObjectId: '', transportId: '', translations: [] }],
      time: {
        type: 1,
        value: ''
      },
      name: '',
      regionId: '',
      cost: [{categoryId: '', cost: ''}],
      description: '',
      gallery: [],
      translations: []
    };
  }
  static propTypes = {
    saveRouteAction: func,
    cancelEditAction: func,
    updateRouteAction: func,
  }

  componentDidMount(){
    if (window) {
      window.scrollTo(0, 0);
    }
  }

  submitRoute = values => {
    const { route, saveRouteAction, updateRouteAction, api } = this.props;
    let cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    return saveRouteAction(values, api, token);
  }

  uploadImages = async (id, gallery) => {
    const { api, lang, userTypes: { guide, tour, shop } } = this.props
    const cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']

    for ( const item of gallery) {
      await new Promise((resolve, reject) => {
        if(item.id) {
          let translation = item.translations.length ? item.translations.find( translation => translation.language === lang) : null,
              description = translation ? translation.description : ''

          axios.post(`${api}/services/app/routePub/UpdateGalleryDescription?id=${id}&galleryId=${item.id}&description=${description}&language=${lang}&isCover=${item.cover}`, null, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
          }).then(resolve)
            .catch(reject)
        } else {
          const formData = new FormData();
          formData.append("image", item.file);
          let translation = item.translations.length ? item.translations.find( translation => translation.language === lang) : null,
              description = translation ? translation.description : ''

          axios.post(`${api}/services/app/routePub/UploadImageGallery?id=${id}&description=${description}&language=${lang}&isCover=${item.cover}`, formData, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
          }).then(resolve)
            .catch(reject)
        }
      });
    }


  }

  render() {
    const {
      props: { cancelEditAction, route, userTypes: { guide, tour, shop }, commonData: {tourCategories, regions, tourObjects, routeTypes, costCategories}, api, lang, langList },
      submitRoute
    } = this;

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="route-form">
            <h2 className="cabinet-title">{route ? localization.cabinetRoutesAddingRoute : localization.cabinetRoutesAddingRoute}</h2>
            <Formik
              onSubmit={(values, {setFieldError, setFieldTouched, setTouched, setSubmitting}) => {
                let submitRoute = this.submitRoute(values)
                submitRoute.then(id => this.uploadImages(id, values.gallery)).catch(err =>
                  setFieldError('routeError', `${err.response.data.error.message} ${err.response.data.error.details}`) ||
                  setFieldTouched('routeError', true, false) ||
                  setSubmitting(false)
                )
              }}
              initialValues={this.initialValues}
              validate={routeFormValidator}
              render={({ values, setFieldValue, isValid, setFieldTouched, setFieldError, isSubmitting, ...props }) => {
                const { gallery, video, time } = values;
                return (
                  <Form>
                    <div className="form-block">
                      <label className="label-control isRequired">{localization.cabinetRoutesRouteName}</label>
                      <Field
                        component={Input}
                        type="text"
                        name="name"
                      />
                    </div>

                    <div className="form-block">
                      <label className="label-control isRequired">{localization.cabinetRoutesRoutCategory}</label>
                      <Field
                        component={Select}
                        name="tourCategoryId"
                      >
                        {tourCategories.map(el => <option value={el.value} key={id()}>{el.label}</option>)}
                      </Field>
                    </div>

                    <div className="form-block">
                      <label className="label-control isRequired">{localization.cabinetRoutesRegionCity}</label>
                      <Field
                        component={Select}
                        name="regionId"
                      >
                        {regions.map(el => <option value={el.value} key={id()}>{el.label}</option>)}
                      </Field>
                    </div>

                    <FieldArray
                      name="attractions"
                      render={props => <RouteAttraction routeTypes={routeTypes} tourObjects={tourObjects} {...props} />}
                    />

                    <div className="form-block form-block--selector">
                      <label className="label-control isRequired">{localization.cabinetRoutesTimeToVisit}</label>
                      <Field
                        component={Input}
                        type="number"
                        placeholder={localization.cabinetRoutesInputNumber}
                        name="time.value"
                        // validate={[required, onlyNumbers]}

                      />
                      <ul className="selector clearlist">
                        <li>
                          <Field
                            value={1}
                            type="radio"
                            name="time.type"
                            checked={parseInt(time.type) === 1}
                            id="hours"
                            component="input"
                          />
                          <label htmlFor="hours">{localization.cabinetRoutesInHour}</label>

                        </li>
                        <li>
                          <Field
                            value={2}
                            type="radio"
                            name="time.type"
                            checked={parseInt(time.type) === 2}
                            id="days"
                            component="input"
                          />
                          <label htmlFor="days">{localization.cabinetRoutesInDay}</label>

                        </li>
                      </ul>

                    </div>

                    <FieldArray
                      name="cost"
                      render={props => <Visitors costCategories={costCategories} {...props} />}
                    />

                    {/* <VideoLinkBlock label="Youtube video about rout" link={video ? video.link : ''} isEdit={true} change={setFieldValue} /> */}

                    <PhotoUploader
                      isEdit
                      name="gallery"
                      api={api}
                      lang={lang}
                      setFieldTouched={setFieldTouched}
                      setFieldError={setFieldError}
                      userTypes={{ guide, tour, shop }}
                      label={localization.cabinetRoutesUploadPhotos}
                      change={setFieldValue}
                      gallery={gallery || []}
                      maxSize={2000000} />

                    <div className="form-block">
                      <label className="label-control isRequired">{localization.cabinetRoutesDescription}</label>
                      <Field
                        component={Text}
                        name="description"
                      />
                    </div>

                    <div className="form-block">
                      <ErrorMessage name="routeError" render={err => <div className="form-error">{err}</div>} />
                      <button className="btn btn--blue" type="submit" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : route ? localization.cabinetRoutesSave : localization.cabinetRoutesAdd}</button>
                      <button className="btn" type="button" onClick={cancelEditAction}>{localization.cabinetRoutesCancel}</button>
                    </div>


                  </Form>
                );
              }}
            />


          </div>
        )}
        </LocalizationContext.Consumer>
      );
  }
}
