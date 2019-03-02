import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import differenceBy from 'lodash/differenceBy';
import { string, object, func } from 'prop-types';
import { LocalizationContext } from '../../../../../context'

/**
 * Actions
 */
import { editItemAction, deleteRouteAction } from '../../../../../store/actions/cabinet.actions';

/**
 * Components
 */
import RoutesList from './RoutesList';
import EditRoute from './EditRoute';

@connect(({cabinet}) => ({ cabinet }), { editItemAction, deleteRouteAction })
export default class TourRoutes extends Component {
  static propTypes = {
    name: string,
    cabinet: object,
    addNewRoute: func,
    deleteRouteAction: func,
  }

  state = {
    active: 'en',
    langList: [
      {label: 'English', value: 'en', flag: 'icon-en.svg' },
      {label: 'Russian', value: 'ru', flag: 'icon-ru.svg'},
      {label: 'Kazakh', value: 'kz', flag: 'icon-kz.svg'},
      {label: 'China', value: 'cn', flag: 'icon-ch.svg'},
      {label: 'German', value: 'de', flag: 'icon-de.svg'},
      {label: 'France', value: 'fr', flag: 'icon-fr.svg'},
    ],
    readyLangs: [
      {label: 'English', value: 'en', flag: 'icon-en.svg'},
      {label: 'Russian', value: 'ru', flag: 'icon-ru.svg'},
    ]
  }

  changeLang = (e, active) => {
    e.preventDefault();
    // logic for change lang
    this.setState({ active });
  }

  render() {
    const { cabinet: { items, edit, editItem }, name, editItemAction, deleteRouteAction, userTypes, commonData, api, lang } = this.props;
    const { langList, readyLangs, active } = this.state;
    if (!items) return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <div className="routes">
            <h2 className="cabinet-title">{name}</h2>
            <div className="routes-text">{localization.cabinetRoutesFetchingRoutes}...</div>
          </div>
        )}
      </LocalizationContext.Consumer>
    );
    const routesLen =  items.length;

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          edit ? <EditRoute lang={lang} api={api} commonData={commonData} userTypes={userTypes} route={editItem} langList={differenceBy(langList, readyLangs, 'value' )} /> : (
            <div className={classNames('routes', {
              'is-empty': !routesLen
            })}>

              {!!routesLen ?
                <div>
                  <h2 className="cabinet-title">{localization.cabinetRoutesCount}: {routesLen}</h2>
                  <RoutesList api={api} lang={lang} commonData={commonData} routes={items} deleteHandler={deleteRouteAction} editHandler={editItemAction} />
                </div>
              :
                <div className="routes-text">{localization.cabinetRoutesNoRoutesYes}</div>
              }
              <button className="btn btn--blue" onClick={() => editItemAction()}>{localization.cabinetRoutesAddRoute}</button>
            </div>
          )
        )}
      </LocalizationContext.Consumer>
    );
  }
}
