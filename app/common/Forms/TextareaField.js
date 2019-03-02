import React, { Fragment } from 'react';
import { string, object } from 'prop-types';
import classNames from "classnames";
import { ErrorMessage } from 'formik';

const TextareaField = ({ field, form: { touched, errors }, ...rest}) => {
  return (
    <Fragment>
      <textarea {...field}  {...rest} className={classNames('form-control', {
        [rest.className]: !!rest.className,
        invalid: touched[field.name] && errors[field.name]
      })} />
      <ErrorMessage
        name={field.name}
        render={err => <div className="form-error">{ err }</div>}
      />
      {/*{touched[field.name] && errors[field.name] && <div className="form-error">{ errors[field.name] }</div>}*/}
    </Fragment>
  );
};

TextareaField.propTypes = {
  input: object,
  label: string,
  meta: object,
  className: string
};

export default TextareaField;
