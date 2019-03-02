import React from 'react';
import PropTypes from 'prop-types';
import id from 'uniqid';
import Dropzone from "react-dropzone";
import { FieldArray, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import { parseCookies } from 'nookies';
import { LocalizationContext } from '../../../../context';

const PhotoUploader = ({ setFieldError, setFieldTouched, label, gallery, change, isEdit, name, maxSize, lang, api, type, userTypes: { guide, tour, shop } }) => {
  const listItems = gallery || [];

  function onDrop (files) {
    setFieldTouched('mediaSectionError', true, false)

    const normalizeFiles = files.map(file => ({ file, imagePath: URL.createObjectURL(file), cover: false, 'translations': [{description: '', language: lang}] }));
    change(name ? `${name}` : 'organization.gallery', [...listItems, ...normalizeFiles]);
  }

  const getName = index => {
    let indexOfFile = gallery[index].translations.map(item => item.language).indexOf(lang)

    if(indexOfFile === -1){
      // if(name) return `${name}[${index}]caption`
      change(name ? `${name}.${index}.translations` : `organization.gallery.${index}.translations`, [...gallery[index].translations, {description: '', language: lang}])
      return name ? `${name}[${index}]translations.${gallery[index].translations + 1}.description` : `organization.gallery[${index}]translations.${gallery[index].translations + 1}.description`
    }

    return name ? `${name}[${index}]translations.${indexOfFile}.description` : `organization.gallery[${index}]translations.${indexOfFile}.description`
  };
  const getCoverName = index => name ? `${name}.${index}.cover` : `organization.gallery.${index}.cover`;

  const removeFromGallery = async(i) => {
    const cookies = parseCookies(),
        token = cookies['KazTravel.loginToken']

    let item = gallery[i]

    switch (type) {
      case guide.slug: {
        return new Promise((resolve, reject) => {
          if(item && item.id) {
            axios.post(`${api}/services/app/guidePub/DeleteGallery?id=${item.id}`, null, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            }).then(resolve)
              .catch(reject)
          } else {
            resolve()
          }
        })

        break;
      };
      case tour.slug: {
        return new Promise((resolve, reject) => {
          if(item && item.id) {
            axios.post(`${api}/services/app/tourOperatorPub/DeleteGallery?id=${item.id}`, null, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            }).then(resolve)
              .catch(reject)
          } else {
            resolve()
          }
        })

        break;
      };
      case shop.slug: {
        return new Promise((resolve, reject) => {
          if(item && item.id) {
            axios.post(`${api}/services/app/souvenirShopPub/DeleteGallery?id=${item.id}`, null, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            }).then(resolve)
              .catch(reject)
          } else {
            resolve()
          }
        })

        break;
      };
      default: break;
    }
  }

  // console.log(gallery);

  return (
    <LocalizationContext.Consumer>
      {
        ( {localization} ) => (
                <div className="form-block">
      <label className="label-control isRequired">{label}</label>
      <div className="cabinet-gallery">
        <Dropzone
          accept="image/*"
          className="cabinet-gallery-drop"
          onDropAccepted={onDrop}
          style={null}
          disabled={!isEdit}
          disabledClassName="disabled"
          maxSize={maxSize}
          onDropRejected={e => setFieldTouched('mediaSectionError', true, false) || setFieldError('mediaSectionError', 'File must be less than 5 MB')}
        />
        <div className="cabinet-gallery-list">
          <FieldArray name={name ? `${name}` : 'organization.gallery'} render={({ remove }) => (
            listItems.map((file, i, arr) => {
              const radioId = id();
              return (
                <figure className="cabinet-gallery-item" key={i}>
                  {type === guide.slug || type === tour.slug || type === shop.slug ?
                    null
                    :
                    <div className="cabinet-gallery-cover">
                      <input
                        type="radio"
                        id={radioId}
                        name={getCoverName(i)}
                        checked={file.cover}
                        onChange={e => {
                          gallery.forEach((_, idx) => idx === i ? change(getCoverName(i), true) : change(getCoverName(idx), false))
                        }}
                      />
                      <label htmlFor={radioId}>Cover</label>
                    </div>
                  }
                  {isEdit ?
                    <div className="cabinet-gallery-delete" onClick={e => {
                      if (file.cover) {
                        change(getCoverName(i), false);
                      }
                      let fileRemove = removeFromGallery(i)
                      fileRemove.then(() => remove(i))
                    }} />
                    :
                    null
                  }
                  <div className="cabinet-gallery-img">
                    <img src={file.imagePath} alt=""/>
                  </div>
                  <figcaption className="cabinet-video-caption">
                    <Field
                      component="input"
                      placeholder={localization.cabinetPhotoCaption}
                      type="text"
                      name={getName(i)}
                    />

                  </figcaption>
                </figure>
              );
            })
          )} />

        </div>
      </div>
      <ErrorMessage name="mediaSectionError" render={err => <div className="form-error">{err}</div>} />
    </div>
        )
      }
      </LocalizationContext.Consumer>
  );

};

PhotoUploader.propTypes = {
};

export default PhotoUploader;
