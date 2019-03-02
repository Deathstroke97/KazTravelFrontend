import React, { Component } from "react";
import { object, func } from "prop-types";
import id from "uniqid";
import Slider from "react-slick/lib";
import classNames from "classnames";
import axios from "axios";
import { parseCookies } from "../../../../../libs/cookies";
import { LocalizationContext } from "../../../../../context";

export default class ShopItem extends Component {
  static propTypes = {
    editHandler: func,
    deleteHandler: func,
    data: object
  };

  state = {
    expand: false
  };

  expandText = e => {
    e.preventDefault();
    this.setState({ expand: !this.state.expand });
  };

  editShop = e => {
    e.preventDefault();
    const {
      data: { id },
      api,
      lang
    } = this.props;
    let cookies = parseCookies(),
      token = cookies["KazTravel.loginToken"];

    axios(`${api}/services/app/souvenirShopPub/GetShopItem?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data: { result } }) => {
        const data = {
          ...result,
          regionId: result.cityId,
          phone: result.phones,
          address: {
            value: 0,
            label:
              typeof result.address === "object"
                ? result.address.label
                : result.address
          },
          map: {
            zoom: result.zoom ? result.zoom : 16,
            center: [result.latitude, result.longtitude],
            place: [result.latitude, result.longtitude],
            ref: null
          }
        };
        this.props.editHandler(data);
      })
      .catch(e => console.error(e.response));
  };

  deleteShop = e => {
    e.preventDefault();
    const {
      data: { id },
      api
    } = this.props;
    let cookies = parseCookies(),
      token = cookies["KazTravel.loginToken"];

    this.props.deleteHandler(id, api, token);
  };

  render() {
    const {
      data: { name, gallery, city, description, address, phone, regionId },
      commonData: { regions }
    } = this.props;
    const { expand } = this.state;

    let region
    if (regionId) region = regions.find(el => el.value == regionId);

    const settings = {
      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 760,
          settings: {
            infinite: false,
            arrows: false,
            dots: true
          }
        }
      ]
    };

    return (
      <LocalizationContext.Consumer>
        {({ localization }) => (
          <div className="route-item">
            {gallery && gallery.length && (
              <div className="route-item-slider">
                <Slider {...settings}>
                  {gallery.map(el => {
                    return (
                      <figure key={id()}>
                        <div className="route-item-slider-img">
                          <img src={el.imagePath} alt="" />
                        </div>
                        {el.description && (
                          <figcaption>{el.description}</figcaption>
                        )}
                      </figure>
                    );
                  })}
                </Slider>
              </div>
            )}

            <h3 className="route-item-title">{name}</h3>
            <div className="shop-item-meta">
              <span>{regionId ? region.label : city},</span>
              <span>{address}</span>
            </div>
            <ul className="shop-phones clearlist">
              {phone && phone.map(el => <li key={id()}>{el.number}</li>)}
            </ul>
            <div
              className={classNames("content-text route-item-description", {
                "route-item-description--expand": expand
              })}
            >
              {description}
            </div>
            <a
              href=""
              className="route-item-description-expand"
              onClick={this.expandText}
            >
              {localization.cabinetShopExpandAll}
            </a>
            <div className="route-item-controls">
              <a
                href=""
                className="route-item-delete"
                onClick={this.deleteShop}
              >
                {localization.cabinetRoutesDelete}
              </a>
              <a href="" className="cabinet-edit" onClick={this.editShop}>
                {localization.cabinetEdit}
              </a>
            </div>
          </div>
        )}
      </LocalizationContext.Consumer>
    );
  }
}
