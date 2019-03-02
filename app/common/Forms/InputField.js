import React, { Fragment } from 'react';
import { object, string } from 'prop-types';
import classNames from "classnames";

const InputField = ({ input, label, meta: { touched, error }, ...rest}) => (
  <Fragment>
    <input {...input} placeholder={label} {...rest} className={classNames('form-control', {
      invalid: touched && error,
      success: touched && !error && input.value,
      [rest.className]: !!rest.className
    })} />
    {touched && error && <div className="form-error">{ error }</div>}
  </Fragment>
)

InputField.propTypes = {
  input: object,
  label: string,
  type: string.isRequired,
  meta: object,
  className: string
};

export default InputField;
