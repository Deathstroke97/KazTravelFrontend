import React, { Fragment } from 'react';
import { string, func, bool } from 'prop-types';
import classNames from 'classnames';
// import { FormSection } from 'redux-form';
import { LocalizationContext } from '../../../../context';

const FormBlock = props => {
  return (
    <LocalizationContext.Consumer>
      {
        ( {localization} ) => (
          <div className={classNames('cabinet-form', {
            'cabinet-form--colored': props.isColored
          })}>
            {!props.isEdit && <div className="cabinet-edit" onClick={() => props.handleEdit(props.name, true)}>{localization.cabinetEdit}</div>}
            <h3 className="cabinet-title">{props.title}</h3>
            <Fragment>
              {props.children}
            </Fragment>
          </div>
        )
      }
    </LocalizationContext.Consumer>

  );
};

FormBlock.propTypes = {
  title: string,
  name: string,
  handleEdit: func,
  isEdit: bool,
  isColored: bool
};

export default FormBlock;
