import React from 'react';
import { array, bool } from 'prop-types';
import { Field, FieldArray } from 'formik';
import Input from '../../../common/Forms/InputText';
import InputMask from "react-input-mask";
import { LocalizationContext } from '../../../../context';
import classNames from "classnames";

const PonesList = ({ phones, isEdit, name, isRequired }) => {
  const items = phones || [];

  return (
    <LocalizationContext.Consumer>
    {
      ({ localization }) => (
        <FieldArray
        name={name}
        render={({ push, remove }) => (
          <div className="cabinet-group">
            <div className="cabinet-add" onClick={() => isEdit && push({number: ''})}>+ {localization.cabinetAddMore}</div>
            {
              items.map((el, i) => (
                <div className="form-block" key={i}>
                  <label className={classNames('label-control', {
                    isRequired: isRequired
                  })}>{localization.cabinetPhone} {i + 1}</label>
                  <Field
                    name={`${name}.${i}.number`}
                    render={({field, ...props}) => (
                      <InputMask
                        {...props}
                        {...field}
                        className="form-control"
                        mask="+7(999)999-99-99"
                        maskChar={null}
                        placeholder="+7(___)___-__-__"
                        alwaysShowMask
                        disabled={!isEdit}
                      />
                    )}
                  />
                  {isEdit && i > 0 && <i className="cabinet-remove" onClick={() => remove(i)} />}
                </div>
              ))
            }
          </div>
        )}
      />
      )
    }
    </LocalizationContext.Consumer>
  );
};

PonesList.propTypes = {
  phones: array,
  isEdit: bool
};

export default PonesList;
