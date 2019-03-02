import React from 'react';
import id from 'uniqid';
import { Field } from 'formik';
import Input from '../../../../common/Forms/InputText';
import Select from '../../../../common/Forms/SelectField';
import { LocalizationContext } from '../../../../../context'

const Visitors = ({form: { values: { cost } }, push, costCategories}) => (
  <LocalizationContext.Consumer>
    {({localization}) => (
      <div className="form-block">
        <div className="cabinet-add" onClick={() => push({categoryId: '', cost: ''})}>+ {localization.cabinetAddMore}</div>

        <label className="label-control isRequired">{localization.cabinetRoutesCategoryOfVisitorsAndCost}</label>
        {
          cost ? cost.map((el, index) => (
            <div className="route-form-visitor" key={index}>
              <Field
                value={el.first}
                component={Select}
                className="form-control"
                name={`cost[${index}]categoryId`}
                label={localization.cabinetRoutesForExampleChildren}
              >
                {costCategories.map(el => <option value={el.value} key={id()}>{el.label}</option>)}
              </Field>
              <Field
                // value={el.cost}
                type="number"
                name={`cost[${index}]cost`}
                component={Input}
                placeholder={localization.cabinetCost}
              />
            </div>
          )) : null
        }

      </div>
    )}
  </LocalizationContext.Consumer>
)

export default Visitors;
