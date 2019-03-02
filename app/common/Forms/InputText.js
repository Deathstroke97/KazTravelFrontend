import React, { Fragment } from 'react';
import classNames from "classnames";
import { ErrorMessage } from 'formik';

const InputText = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <Fragment>
      <input {...field} {...props} className={classNames('form-control', {
        invalid: touched[field.name] && errors[field.name] && field.name !== 'address',
        success: touched[field.name] && !errors[field.name] && field.value && field.name !== 'address',
        [props.className]: !!props.className
      })} />
      <ErrorMessage
        name={field.name}
        render={err => <div className="form-error">{ err }</div>}
      />
    </Fragment>
  );
};

export default InputText;
