import React, {Component, Fragment} from 'react';
import {func, object} from 'prop-types';
// import classNames from 'classnames';
import id from 'uniqid';
// import InputMask from 'react-input-mask';
import {ErrorMessage, Field, FieldArray, FastField} from 'formik';
import MultiSelect from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
// import _ from 'lodash'
import axios from 'axios'
// import {fetchData} from '../../../../../libs/fetchData'
import {LocalizationContext} from '../../../../../context';

// import {required, phoneRequired} from '../../../../../libs/formValidators';

/**
 * Components
 */
import FormBlock from "../FormBlock";
import Input from "../../../../common/Forms/InputText";
import Textarea from "../../../../common/Forms/TextareaField";
import SocialBlock from "../SocialBlock/index";
import PhonesList from "../PhonesList";
import Select from "../../../../common/Forms/SelectField";
import Calendar from "../CalendarComponent";

export default class ProfileAbout extends Component {
  static propTypes = {
    submit: func,
    data: object,
    change: func
  };

  state = { inputValue: "" };

  renderLanguages = ({ push, remove }) => {
    const {
      data: { languages },
      isEdit,
      commonData
    } = this.props;
    const { langList, levelsList } = commonData;
    if (languages && !languages.length) push({ languageId: "", levelType: "" });

    return (
      <LocalizationContext.Consumer>
        {({ localization }) => (
          <div className="cabinet-group">
            <div
              className="cabinet-add"
              onClick={() => isEdit && push({ languageId: "", levelType: "" })}
            >
              + {localization.cabinetAddMore}
            </div>
            {languages.map((item, i) => (
              <div className="form-group" key={i}>
                {isEdit && i > 0 && (
                  <i className="cabinet-remove" onClick={() => remove(i)} />
                )}
                <div className="form-block">
                  <label className="label-control">
                    {localization.cabinetLanguage}
                  </label>
                  <FastField
                    label={localization.cabinetChooseLanguage}
                    component={Select}
                    disabled={!isEdit}
                    name={`languages.${i}.languageId`}
                  >
                    {langList.map(el => (
                      <option value={el.value} key={id()}>
                        {el.label}
                      </option>
                    ))}
                  </FastField>
                </div>
                <div className="form-block">
                  <label className="label-control">
                    {localization.cabinetLanguageLevel}
                  </label>
                  <Field
                    label={localization.cabinetChooseLevel}
                    disabled={!isEdit || !languages[i].languageId}
                    component={Select}
                    name={`languages.${i}.levelType`}
                  >
                    {levelsList.map(el => (
                      <option value={el.value} key={id()}>
                        {el.label}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </LocalizationContext.Consumer>
    );
  };

  handleInputChange = inputValue => {
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    const {
      data,
      change,
      userTypes: { guide, tour, shop },
      isEdit,
      handleEdit,
      isSubmitting,
      setTouched,
      submitSection,
      validateSocials,
      validateWeb,
      isValid,
      commonData
    } = this.props;
    const { addresses } = this.state;
    const { specs, regions } = commonData;

    if (!data) return null;
    const { socials, phones, costType, type, languages } = data;

    return (
      <LocalizationContext.Consumer>
        {({ localization }) => (
          <FormBlock
            isEdit={isEdit}
            title={
              type === tour.slug
                ? localization.cabinetAboutCompany
                : type === guide.slug
                ? localization.cabinetAboutGuide
                : localization.cabinetAboutShop
            }
            name="about"
            handleEdit={(name, state) => {
              if (languages && languages.length)
                setTouched({
                  languages: languages.map(lang => ({ languageId: true }))
                });
              handleEdit(name, state);
            }}
          >
            {type === tour.slug || type === shop.slug ? (
              <div className="form-block">
                <label className="label-control">
                  {localization.cabinetOrganizationName}
                </label>
                <Field
                  type="text"
                  name="organization.name"
                  component={Input}
                  disabled={!isEdit}
                />
              </div>
            ) : null}

            <div className="form-block">
              <label className="label-control">
                {localization.cabinetRegionOrCity}
              </label>
              <Field
                component={Select}
                name="organization.regionId"
                label={localization.cabinetChooseRegion}
                disabled={!isEdit}
              >
                {regions.map(el => (
                  <option value={el.value} key={id()}>
                    {el.label}
                  </option>
                ))}
              </Field>
            </div>
            {type === tour.slug && (
              <div className="form-block">
                <label className="label-control">
                  {localization.cabinetCompanyAddress}
                </label>
                <Field
                  name="address"
                  render={({ field, form, ...props }) => (
                    <AsyncSelect
                      name={field.name}
                      cacheOptions
                      loadOptions={(inputValue, callback) => {
                        if (inputValue) {
                          axios(
                            `https://geocode-maps.yandex.ru/1.x/?apikey=cb2c1793-1b46-40a9-86d8-db17926dab9f&format=json&geocode=${inputValue}&results=7`
                          ).then(({ data: { response } }) => {
                            callback(
                              response.GeoObjectCollection.featureMember.map(
                                ({
                                  GeoObject: { Point, name, description }
                                }) => {
                                  return {
                                    value: Point.pos,
                                    label: `${name}, ${description}`
                                  };
                                }
                              )
                            );
                          });
                        }
                      }}
                      placeholder="Type address"
                      className="single"
                      classNamePrefix="single"
                      isDisabled={!isEdit}
                      onInputChange={this.handleInputChange}
                      onChange={option => {
                        let longitude = option.value
                            ? option.value.split(" ")[0]
                            : 0,
                          latitude = option.value
                            ? option.value.split(" ")[1]
                            : 0;

                        form.setFieldValue(field.name, option);
                        form.setFieldValue("longtitude", parseFloat(longitude));
                        form.setFieldValue("latitude", parseFloat(latitude));
                      }}
                      onBlur={() =>
                        form.setFieldTouched(field.name, true, true)
                      }
                      value={field.value}
                    />
                  )}
                  disabled={!isEdit}
                />
              </div>
            )}
            <div className="form-block">
              <label htmlFor="description" className="label-control isRequired">
                {type === tour.slug || type === shop.slug
                  ? localization.cabinetDescription
                  : localization.cabinetGuideInformation}
              </label>
              <Field
                name="description"
                className="form-control"
                component={Textarea}
                disabled={!isEdit}
              />
            </div>

            {type === guide.slug && (
              <Fragment>
                <div className="form-block">
                  <label className="label-control">
                    {localization.cabinetSpecialization}
                  </label>
                  <Field
                    name="guideSpecializations"
                    render={({ field, form, ...props }) => (
                      <MultiSelect
                        name={field.name}
                        placeholder={localization.cabinetChooseSpecialization}
                        className="multi"
                        classNamePrefix="multi"
                        options={specs}
                        isDisabled={!isEdit}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        isSearchable={false}
                        onChange={option =>
                          form.setFieldValue(field.name, option)
                        }
                        onBlur={() =>
                          form.setFieldTouched(field.name, true, true)
                        }
                        value={field.value}
                      />
                    )}
                  />
                  <ErrorMessage
                    name="specialization"
                    render={err => <div className="form-error">{err}</div>}
                  />
                </div>
                <div className="form-block form-block--selector">
                  <label className="label-control">
                    {localization.cabinetCost}
                  </label>
                  <Field
                    render={({ field }) => (
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Input a number"
                        disabled={!isEdit}
                        {...field}
                        placeholder="lastName"
                      />
                    )}
                    name="cost"
                  />
                  <ul className="selector clearlist">
                    <li>
                      <Field
                        value={1}
                        type="radio"
                        name="costType"
                        checked={parseInt(costType) === 1}
                        id="hours"
                        component="input"
                        disabled={!isEdit}
                      />
                      <label htmlFor="hours">
                        {localization.cabinetRoutesInHour}
                      </label>
                    </li>
                    <li>
                      <Field
                        value={2}
                        type="radio"
                        name="costType"
                        checked={parseInt(costType) === 2}
                        id="days"
                        component="input"
                        disabled={!isEdit}
                      />
                      <label htmlFor="days">{localization.cabinetRoutesInDay}</label>
                    </li>
                  </ul>
                </div>
              </Fragment>
            )}

            {/* {
        type === tour.slug && (
          <div className="form-block">
            <label className="label-control isRequired">Main phone</label>
            <Field
              name="phone"
              validate={isEdit && phoneRequired}
              render={({field, form, ...props}) => (
                <Fragment>
                  <InputMask
                    {...props}
                    {...field}
                    className={classNames('form-control', {
                      invalid: form.touched.phone && form.errors.phone
                    })}
                    mask="+7 (999) 999-99-99"
                    maskChar={null}
                    placeholder="+7 (___) ___-__-__"
                    alwaysShowMask
                    disabled={!isEdit}
                  />
                  <ErrorMessage name="phone" render={err => <div className="form-error">{err}</div>} />
                </Fragment>
              )}
            />
            {isEdit && phoneTouched && <button type="button" className="btn--check" onClick={() => sendSMS(phone)}>Check</button>}
          </div>
        )
      } */}

            {type !== shop.slug && (
              <PhonesList
                name="organization.phones"
                change={change}
                isEdit={isEdit}
                phones={phones}
              />
            )}

            {type === guide.slug && (
              <Fragment>
                <div className="form-group form-group--date">
                  <div className="form-block">
                    <label className="label-control">
                      {localization.cabinetDateOfBirth}
                    </label>
                    <Calendar disabled={!isEdit} />
                  </div>
                  <div className="form-block">
                    <label className="label-control">
                      {localization.cabinetExperience}
                    </label>
                    <Field
                      type="number"
                      component={Input}
                      name="experience"
                      disabled={!isEdit}
                    />
                  </div>
                </div>

                <FieldArray render={this.renderLanguages} name="languages" />
              </Fragment>
            )}

            {type !== shop.slug && (
              <div className="form-block">
                <label className="label-control">
                  {localization.cabinetAdditionalInformation}
                </label>
                <Field
                  name="additionalInfo"
                  className="form-control"
                  component={Textarea}
                  disabled={!isEdit}
                />
              </div>
            )}

            <SocialBlock
              isEdit={isEdit}
              data={socials || {}}
              change={change}
              validateSocials={validateSocials}
            />
            {type === tour.slug && (
              <div className="form-block">
                <label className="label-control">
                  {localization.cabinetWebsite}
                </label>
                <Field
                  type="text"
                  name="webSite"
                  component={Input}
                  disabled={!isEdit}
                  onBlur={validateWeb}
                />
              </div>
            )}
            {isEdit && (
              <div className="form-block">
                <ErrorMessage
                  name="aboutSectionError"
                  render={err => <div className="form-error">{err}</div>}
                />
                <button
                  type="button"
                  className="btn btn--submit"
                  onClick={submitSection}
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? "Wait..." : localization.cabinetSaveChanges}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleEdit("about", false)}
                >
                  {localization.cabinetRoutesCancel}
                </button>
              </div>
            )}
          </FormBlock>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
