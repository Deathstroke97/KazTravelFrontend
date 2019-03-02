import React from "react";
import { number, object, func } from "prop-types";
import { ErrorMessage, Field } from "formik";
import id from "uniqid";

import Select from "../../../../common/Forms/SelectField";
import Text from "../../../../common/Forms/TextareaField";

import { LocalizationContext } from "../../../../../context";

const RouteAttraction = ({
  form,
  push,
  remove,
  move,
  swap,
  tourObjects,
  routeTypes
}) => {
  const {
    values: { attractions }
  } = form;

  const itemsList = attractions || [];
  const len = itemsList.length;

  return (
    <LocalizationContext.Consumer>
      {({ localization }) => (
        <div className="cabinet-form cabinet-form--colored">
          <h3 className="cabinet-title">
            {localization.cabinetRoutesRouteConstructor}
          </h3>
          <div className="cabinet-message">
            {localization.cabinetInProcessMessage}
          </div>

          <ErrorMessage
            name="attractions"
            render={err => {
              return err[0] && err[0].error ? (
                <div className="form-block">
                  <div className="form-error form-error--rel">
                    {err[0].error}
                  </div>
                </div>
              ) : null;
            }}
          />
          {itemsList.map((el, index) => {
            return (
              <div className="route-attraction" key={index}>
                <div className="route-attraction-controls">
                  {index > 0 && (
                    <b className="top" onClick={() => swap(index, index - 1)}>
                      {localization.cabinetRoutesHigher}
                    </b>
                  )}
                  {index < len - 1 && (
                    <b
                      className="bottom"
                      onClick={() => swap(index, index + 1)}
                    >
                      {localization.cabinetRoutesBelow}
                    </b>
                  )}
                  <i className="delete" onClick={() => remove(index)} />
                </div>
                <h4 className="cabinet-subtitle">
                  {localization.cabinetRoutesTouristsAttraction} {index + 1}
                </h4>
                <div className="form-block">
                  <label className="label-control isRequired">
                    {localization.cabinetRoutesAttraction}
                  </label>
                  <Field
                    value={el.tourObjectId}
                    component={Select}
                    className="form-control"
                    name={`attractions[${index}]tourObjectId`}
                  >
                    {tourObjects.map(el => (
                      <option value={el.value} key={id()}>
                        {el.label}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="form-block">
                  <label className="label-control isRequired">
                    {localization.cabinetRoutesTypeOfMovement}
                  </label>
                  <Field
                    value={el.transportId}
                    component={Select}
                    name={`attractions[${index}]transportId`}
                  >
                    {routeTypes.map(el => (
                      <option value={el.value} key={id()}>
                        {el.label}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="form-block">
                  <label className="label-control isRequired">
                    {localization.cabinetRoutesDescription}
                  </label>
                  <Field
                    value={el.description}
                    component={Text}
                    name={`attractions[${index}]description`}
                  />
                </div>
              </div>
            );
          })}
          <button
            className="route-btn"
            type="button"
            onClick={() =>
              push({ tourObjectId: "", transportId: "", translations: [] })
            }
          >
            {localization.cabinetRoutesAdd}
          </button>
        </div>
      )}
    </LocalizationContext.Consumer>
  );
};

RouteAttraction.propTypes = {
  form: object,
  push: func,
  remove: func,
  move: func
};

export default RouteAttraction;
