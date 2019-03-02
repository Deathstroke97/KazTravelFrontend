import React, { Fragment } from 'react';
import { object, string } from 'prop-types';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import { LocalizationContext } from '../../../context'

const SelectField = ({ field, form: { touched, errors }, children, ...rest }) => {
  return (
    <LocalizationContext.Consumer>
      {({localization}) => (
        <Fragment>
          <select
            {...rest}
            {...field}
            // placeholder={label}
            className={classNames('form-control', {
              invalid: touched[field.name] && errors[field.name],
              [rest.className]: !!rest.className
            })}

            >
              <option value="" disabled>{rest.label || localization.cabinetRoutesSelectValue}</option>
              { children }
            </select>
          <ErrorMessage
            name={field.name}
            render={err => <div className="form-error">{ err }</div>}
          />
          {/*{touched[field.name] && errors[field.name] && <div className="form-error">{ errors[field.name] }</div>}*/}
        </Fragment>
      )}
    </LocalizationContext.Consumer>
  );
};

SelectField.propTypes = {
  field: object,
  type: string,
  form: object,
  className: string
};

export default SelectField;
