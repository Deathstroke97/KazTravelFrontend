import React, { Component } from "react";
import { object, string, func } from "prop-types";
import { connect } from "react-redux";
import { parseCookies } from "nookies";

import {
  fetchUserRoutesAction,
  fetchUserShopsAction
} from "../../../store/actions/cabinet.actions";

import CabinetWrapper from "./components/CabinetWrapper";
import Profile from "./components/Profile";
import Routes from "./components/Routes";
import Shops from "./components/Shops";
import CompleteSteps from "./components/CompleteSteps";
import { LocalizationContext } from "../../../context";

@connect(
  ({ cabinet }) => ({ cabinet }),
  { fetchUserRoutesAction, fetchUserShopsAction }
)
export default class CabinetContainer extends Component {
  static propTypes = {
    user: object,
    usertypes: object,
    fetchUserRoutesAction: func,
    cabinet: object
  };

  componentDidMount() {
    const {
      cabinet: { items },
      user,
      fetchUserRoutesAction,
      fetchUserShopsAction,
      api
    } = this.props;
    const cookies = parseCookies(),
      token = cookies["KazTravel.loginToken"];

    if (!items && user.complete_registration) {
      if (this.isShop()) {
        fetchUserShopsAction(api, token, user);
      } else {
        fetchUserRoutesAction(api, token);
      }
    }
  }

  isShop = () => this.props.user.type === this.props.usertypes.shop.slug;

  render() {
    const {
      user: { complete_registration, type, id },
      usertypes,
      api,
      commonData: {
        regions,
        specs,
        langList,
        levelsList,
        tourCategories,
        tourObjects,
        routeTypes,
        costCategories
      },
      lang
    } = this.props;
    //const routeName = type === usertypes.shop.slug ? 'Shops' : 'Tourists routes';
    const routeClass = type === usertypes.shop.slug ? "tab-shop" : "tab-routes";
    return (
      <LocalizationContext.Consumer>
        {({ localization }) => (
          <CabinetWrapper>
            <Profile
              lang={lang}
              commonData={{ regions, specs, langList, levelsList }}
              api={api}
              name={localization.cabinetProfile}
              tabClass="tab-profile"
              user={this.props.user}
              userTypes={usertypes}
            />
            {this.isShop() ? (
              <Shops
                api={api}
                lang={lang}
                userTypes={usertypes}
                user={this.props.user}
                commonData={{ regions }}
                name={localization.cabinetShop}
                tabClass="tab-shop"
              />
            ) : (
              <Routes
                api={api}
                lang={lang}
                commonData={{
                  tourCategories,
                  regions,
                  tourObjects,
                  routeTypes,
                  costCategories
                }}
                userTypes={usertypes}
                name={localization.cabinetRoutes}
                tabClass="tab-routes"
              />
            )}
          </CabinetWrapper>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
