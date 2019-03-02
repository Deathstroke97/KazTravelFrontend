import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps';
import id from 'uniqid';
import AsyncSelect from 'react-select/lib/Async';
import { parseCookies } from '../../../../../libs/cookies';
import { Form, Field, Formik, FieldArray, ErrorMessage } from 'formik';
import axios from 'axios'

import { shopFormValidator } from '../../../../../libs/formValidators';
import { LocalizationContext } from "../../../../../context";

/**
 * Actions
 */
import { saveShopAction, cancelEditAction, updateRouteAction } from '../../../../../store/actions/cabinet.actions';


/**
 * Components
 */
import Input from "../../../../common/Forms/InputText";
import Select from "../../../../common/Forms/SelectField";
import Text from "../../../../common/Forms/TextareaField";
import PhotoLoader from "../PhotoLoader";
import PhonesList from '../PhonesList';
import InputMask from "react-input-mask";
import classNames from "classnames";


@connect(null, { cancelEditAction, updateRouteAction, saveShopAction })
export default class EditShop extends Component {
  constructor(props) {
    super(props);
    this.initShopObject = {
      name: props.user.organization.name,
      regionId: '',
      phone: [{number: '+7('}],
      address: '',
      map: {
        zoom: 13,
        center: [43.24717038310359,76.91861669666831],
        place: null,
        ref: null
      },
      description: props.user.description,
    }
    this.initialValues = props.shopItem ? {
      list: [{...props.shopItem, address: {value: 0, label: typeof props.shopItem.address === 'object' ? props.shopItem.address.label : props.shopItem.address}}]
    } : {
      list: []
    };
    this.state = {
      ymaps: null,
      inputValue: ''
    };
  }
  static propTypes = {
    cancelEditAction: func
  }

  submitShop = values => {
    const { shopItem, saveShopAction, updateRouteAction, api, user } = this.props;
    let cookies  = parseCookies(),
        token = cookies['KazTravel.loginToken']
    saveShopAction(values.list, api, token, user.organization.gallery);
  }

  findAddress = (address, index, change, map) => {
    if (this.state.ymaps) {
      this.state.ymaps.geocode(address, { results: 1 })
        .then(res => {
          const place = res.geoObjects.get(0).geometry.getCoordinates();
          change(`list[${index}].map.place`, place);
          map.setCenter(place);
          map.setZoom(16);
        })
    }
  }

  handleInputChange = inputValue => {
    this.setState({ inputValue });
    return inputValue;
  };

  render() {

    const {
      state: { regionsOptions, coordinates },
      props: { shopItem, handleSubmit, cancelEditAction, api, lang, userTypes: { guide, tour, shop }, user, commonData: { regions } },
      submitShop
    } = this;
    return (
        <LocalizationContext.Consumer>
          {
            ( {localization} ) => (
              <div className="route-form">
              <h2 className="cabinet-title">{localization.cabinetAddingShop}</h2>
      
              <Formik
                validate={shopFormValidator}
                onSubmit={submitShop}
                initialValues={this.initialValues}
                render={({ setFieldValue, setFieldError, setFieldTouched, isValid, isSubmitting, values: { list }, ...rest }) => {
                  const len = list.length;
                  return (
                    <Form>
                      <div className="cabinet-form cabinet-form--colored">
                        <FieldArray
                          name="list"
                          render={({ remove, push, move }) => {
                            return (
                              <Fragment>
                                {/*<ErrorMessage*/}
                                  {/*name="list"*/}
                                  {/*render={err => {*/}
                                    {/*return err[0] && err[0].error ? (*/}
                                      {/*(*/}
                                        {/*<div className="form-block">*/}
                                          {/*<div className="form-error form-error--rel">{ err[0].error }</div>*/}
                                        {/*</div>*/}
                                      {/*)*/}
                                    {/*) : null*/}
                                  {/*}}*/}
                                {/*/>*/}
                                {
                                  list && list.map((el, index) => {
                                      return (
                                        <div className="route-attraction" key={index}>
                                          <div className="route-attraction-controls">
                                            {index > 0 && <b className="top" onClick={() => move(index, index - 1)}>{localization.cabinetShopHigher}</b>}
                                            {index < len - 1 && <b className="bottom" onClick={() => move(index, index + 1)}>{localization.cabinetShopBelow}</b>}
                                            {
                                              !shopItem && <i className="delete" onClick={() => remove(index)} />
                                            }
      
                                          </div>
                                          <h4 className="cabinet-subtitle">{shopItem ? shopItem.name : `Shop ${index + 1}`}</h4>
                                          {/* <div className="form-block">
                                            <label className="label-control isRequired">Name</label>
                                            <Field
                                              type="text"
                                              name={`list.${index}.name`}
                                              component={Input}
                                            />
                                          </div> */}
                                          <div className="form-block">
                                            <label className="label-control isRequired">{localization.cabinetShopRegionOrCity}</label>
                                            <Field
                                              component={Select}
                                              name={`list.${index}.regionId`}
                                            >
                                              {regions.map(el => <option value={el.value} key={id()}>{el.label}</option>)}
                                            </Field>
                                          </div>
      
                                          <PhonesList isRequired name={`list.${index}.phone`} change={setFieldValue} isEdit phones={el.phone} />
                                          {/* <div className="form-block">
                                            <label className="label-control isRequired">Phone</label>
                                            <Field
                                              name={`list.${index}.phone`}
                                              render={({field, form, ...props}) => {
                                                // console.log(field);
                                                return (
                                                  <Fragment>
                                                    <InputMask
                                                      {...props}
                                                      {...field}
                                                      className={classNames('form-control', {
                                                        invalid: form.touched.list &&
                                                          form.touched.list[index] &&
                                                          form.touched.list[index].phone &&
                                                          form.errors.list &&
                                                          form.errors.list[index] &&
                                                          form.errors.list[index].phone
                                                      })}
                                                      mask="+7 (999) 999-99-99"
                                                      maskChar={null}
                                                      placeholder="+7 (___) ___-__-__"
                                                      alwaysShowMask
                                                    />
                                                    <ErrorMessage name={`list.${index}.phone`} render={err => <div className="form-error">{err}</div>} />
                                                  </Fragment>
                                                );
                                              }}
                                            />
                                          </div> */}
      
                                          {/*<FieldArray component={renderPhones} name={`${el}.phones`} rerenderOnEveryChange={false} props={{isFull: true, isRequired: true}} />*/}
      
                                          <div className="form-block form-block--address">
                                            <label className="label-control isRequired">{localization.cabinetAddress}</label>
                                            {/* <Field
                                              type="text"
                                              name={`list.${index}.address`}
                                              component={Input}
                                            /> */}
                                            <Field
                                              name={`list.${index}.address`}
                                              render={({field, form, ...props}) => (
                                                <AsyncSelect
                                                  name={field.name}
                                                  cacheOptions
                                                  loadOptions={(inputValue, callback) => {
                                                    if(inputValue) {
                                                      axios(`https://geocode-maps.yandex.ru/1.x/?apikey=cb2c1793-1b46-40a9-86d8-db17926dab9f&format=json&geocode=${inputValue}&results=7`)
                                                        .then(({data: { response }}) => {
                                                          callback(response.GeoObjectCollection.featureMember.map(({GeoObject: {Point, name, description}}) => {
                                                            return ({value: Point.pos, label: `${name}, ${description}`})
                                                          }))
                                                        })
                                                    }
                                                  }}
                                                  placeholder={localization.cabinetShopTypeAddress}
                                                  className="single"
                                                  classNamePrefix="single"
                                                  onInputChange={this.handleInputChange}
                                                  onChange={option => form.setFieldValue(field.name, option) || this.findAddress(option.label, index, setFieldValue, el.map.ref)}
                                                  onBlur={() =>form.setFieldTouched(field.name, true, true)}
                                                  value={field.value}
                                                />
                                              )}
                                            />
                                            {/* <button type="button" className="btn" disabled={!el.address} onClick={() => }>Add to map</button> */}
                                          </div>
                                          <div className="form-block">
                                            <div className="form-map">
                                              {!this.state.ymaps && <p>Wait map ready</p>}
                                              <YMaps
                                                query={{
                                                  load: "geocode"
                                                }}
                                              >
                                                <Map
                                                  onLoad={ymaps => {
                                                    if(!this.state,ymaps) this.setState({ymaps})
                                                  }}
                                                  width="100%"
                                                  height="200px"
                                                  instanceRef={map => (list[index].map.ref = map)}
                                                  defaultState={{
                                                    zoom: el.map.zoom ? el.map.zoom : 16,
                                                    center: el.map.place ? el.map.place : el.map.center,
                                                  }}
                                                >
                                                  {el.map.place && <Placemark geometry={el.map.place} />}
                                                </Map>
      
                                              </YMaps>
                                            </div>
                                          </div>
      
                                          {/* <div className="form-block">
                                            <label className="label-control isRequired">Description</label>
                                            <Field
                                              component={Text}
                                              name={`list.${index}.description`}
                                            />
                                          </div> */}
      
                                        </div>
                                      )
                                  })
                                }
                                {
                                  !shopItem && <button className="route-btn" type="button" onClick={() => push(this.initShopObject)}>{localization.cabinetAddMoreShops}</button>
                                }
                              </Fragment>
      
                            );
                          }}
                          // component={props => <ShopFormItem list={list} {...props} props={{ deleteShop, goTo, regionsOptions, shopItem }} change={setFieldValue} />}
                        />
      
      
                      </div>
                      <div className="form-block">
                        <button className="btn btn--blue" type="submit" disabled={isSubmitting || !isValid }>{isSubmitting ? localization.waitMessage : shopItem ? localization.cabinetSaveShop : localization.cabinetAddShop }</button>
                        <button className="btn" type="button" onClick={cancelEditAction}>{localization.cabinetRoutesCancel}</button>
                      </div>
                    </Form>
                  );
                }}
              />
      
            </div>
          
            )
          }
          </LocalizationContext.Consumer>
    )
  }
}
