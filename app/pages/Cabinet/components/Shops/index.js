import React, { Component } from "react";
import { object, func } from "prop-types";
import { connect } from "react-redux";

import {
  deleteShopAction,
  editItemAction
} from "../../../../../store/actions/cabinet.actions";
import { LocalizationContext } from "../../../../../context";
/**
 * Components
 */
import EditShop from "./EditShop";
import ShopList from "./ShopsList";
import classNames from "classnames";

@connect(
  ({ cabinet }) => ({ cabinet }),
  { editItemAction, deleteShopAction }
)
export default class ShopsContainer extends Component {
  static propTypes = {
    cabinet: object,
    editItemAction: func,
    deleteShopAction: func
  };

  render() {
    const {
      cabinet: { items, edit, editItem },
      editItemAction,
      deleteShopAction,
      api,
      lang,
      userTypes,
      user,
      commonData
    } = this.props;

    if (!items)
      return (
        <LocalizationContext.Consumer>
          {({ localization }) => (
            <div className="routes">
              <h2 className="cabinet-title">{localization.cabinetShopList}</h2>
              <div className="routes-text">Fetching shops...</div>
            </div>
          )}
        </LocalizationContext.Consumer>
      );
    const shopsLen = items.length;
    return edit ? (
      <EditShop
        lang={lang}
        api={api}
        shopItem={editItem}
        userTypes={userTypes}
        user={user}
        commonData={commonData}
      />
    ) : (
      <LocalizationContext.Consumer>
        {({ localization }) => (
          <div
            className={classNames("routes", {
              "is-empty": !shopsLen
            })}
          >
            <h2 className="cabinet-title">
              {localization.cabinetShopList}{" "}
              {!!shopsLen && (
                <span>
                  <strong>
                    {localization.cabinetRoutesCount}: {shopsLen}
                  </strong>
                </span>
              )}
            </h2>
            {shopsLen ? (
              <ShopList
                api={api}
                commonData={commonData}
                user={user}
                shops={items}
                editHandler={editItemAction}
                deleteHandler={deleteShopAction}
              />
            ) : (
              <div className="routes-text">{localization.cabinetShopStatusMessage}</div>
            )}
            <button className="btn btn--blue" onClick={() => editItemAction()}>
              {localization.cabinetAddShop}
            </button>
          </div>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
