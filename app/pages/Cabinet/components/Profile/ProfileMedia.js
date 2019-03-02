import React, { Component } from 'react';
import { func } from 'prop-types';
// import { Field, FormSection } from 'redux-form';
import { Field } from 'formik';

import FormBlock from '../FormBlock';
import Textarea from '../../../../common/Forms/TextareaField';
import PhotoLoader from '../PhotoLoader';
import VideoBlock from '../VideoLinkComponent';
import { LocalizationContext } from '../../../../../context';

export default class ProfileMedia extends Component {
  static propTypes = {
    submit: func,
    change: func
  }

  render() {
    const {
      change,
      data,
      userTypes: { guide, tour, shop },
      isEdit,
      handleEdit,
      submitSection,
      lang,
      api,
      isSubmitting,
      setFieldError,
      setFieldTouched
    } = this.props;
    if (!data) return null;
    const { video, gallery, type } = data;

    return (
      <LocalizationContext.Consumer>
        {
          ( {localization} ) => (
            <FormBlock
            isEdit={isEdit}
            name="media"
            title={localization.cabinetPhotogallery}
            handleEdit={handleEdit}
          >

            {/* {
              type === tour.slug && (
                <VideoBlock label={localization.cabinetYoutube} link={video ? video.link : ''} isEdit={isEdit} change={change} />
              )
            } */}
            <PhotoLoader
              setFieldTouched={setFieldTouched}
              setFieldError={setFieldError}
              maxSize={2000000}
              userTypes={{ guide, tour, shop }}
              type={type}
              api={api}
              lang={lang}
              label={localization.cabinetTellMoreToTravellers}
              change={change}
              isEdit={isEdit}
              gallery={gallery || {list: [], cover: ''}}
            />

            {
              isEdit && (
                <div className="form-block">
                  <button type="button" className="btn btn--submit" onClick={submitSection} disabled={isSubmitting}>{isSubmitting ? 'Wait...' : localization.cabinetSaveChanges}</button>
                  <button type="button" className="btn" onClick={() => handleEdit('media', false)}>{localization.cabinetRoutesCancel}</button>
                </div>
              )
            }

          </FormBlock>
          )
        }
      </LocalizationContext.Consumer>

    );
  }
}
