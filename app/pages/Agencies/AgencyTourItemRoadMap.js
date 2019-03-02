import React, { Component } from 'react';
import { bool } from 'prop-types';
import Link from 'next/link';
import { Routes } from '../../../settings';

export default class AgencyTourItemRoadMap extends Component {
  static propTypes = {
    unfolded: bool,
  };
  state = {
    listItemsOffsets: [],
    height: 0,
    unfolded: false
  }
  componentDidMount() {
    this.calculateHeight();
    if (window !== undefined) {
      window.addEventListener('resize', this.calculateHeight);
    }
  }
  componentWillUnmount() {
    if (window !== undefined) {
      window.removeEventListener('resize', this.calculateHeight);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.unfolded != this.props.unfolded) {
      setTimeout(() => this.setState({
        unfolded: this.props.unfolded
      }), 350);
    }
  }
  calculateHeight = () => {
    const list = Array.from(this.list.children);
    // console.log(list);
    const firstItem = list[0];
    const lastItem = list[list.length - 1];
    const listItemsOffsets = list.map(item => item.offsetTop - firstItem.offsetTop);
    this.setState({
      listItemsOffsets,
      height: lastItem.offsetTop - firstItem.offsetTop,
      unfolded: this.props.unfolded
    });
  }
  getIconFileName = (index) => {
    return [ '', 'icon-afoot.svg','icon-car.svg','icon-bus.svg','public-transport-subway__1_.png', 'plane__3_.png'][index];
  }
  render() {
    const { listItemsOffsets, height, unfolded } = this.state;
    const { data } = this.props;

    return (
      <div className="agency-tours-item-content-roadmap">
        <div className="agency-tours-item-content-roadmap-progress" style={{ height }}>
          {
            listItemsOffsets.map((offset, key) => (
              <div
                key={key}
                className="agency-tours-item-content-roadmap-progress-dot"
                style={{
                  top: offset
                }}
              />
            ))
          }
        </div>
        <div className="agency-tours-item-content-roadmap-progress-container" style={{ height: unfolded ? height + 40 : 0 }}>
          <div className="agency-tours-item-content-roadmap-progress--highlight" style={{ height }}>
            {
              listItemsOffsets.map((offset, key) => (
                <div
                  key={key}
                  className="agency-tours-item-content-roadmap-progress--highlight-dot"
                  style={{
                    top: offset
                  }}
                />
              ))
            }
          </div>
        </div>
        <div className="agency-tours-item-content-roadmap-list" ref={list => (this.list = list)}>
          {
            Array.isArray(data) && data.map((el, i) => (
              <div className="agency-tours-item-content-roadmap-list-item" key={i}>
                {/*<Link href={`${Routes.spot}/${el.id}/${el.title}`} as={`${Routes.spot}/${el.id}/${el.title}`} >*/}
                  {/*<div className="agency-tours-item-content-roadmap-list-item-header">*/}
                    {/*<a href={`${Routes.spot}/${el.id}/${el.title}`}>{el.title}</a>*/}
                  {/*</div>*/}
                {/*</Link>*/}
                <div className="agency-tours-item-content-roadmap-list-item-header">
                  <Link href={`${Routes.spot}?slug=${el.tourObjectId}&title=${el.title}`} as={`${Routes.spot}/${el.tourObjectId}/${el.title}`} >
                    <a>{el.title}</a>
                  </Link>
                </div>

                <div className="agency-tours-item-content-roadmap-list-item-attributes">
                  <span className="type"><img src={`/static/images/icons/${this.getIconFileName(el.transportId)}`} alt=""/>{el.transportName}</span>
                  {
                    el.routeLenght && <span className="distance">{el.routeLenght}</span>
                  }

                </div>
                {
                  el.description && (
                    <div className="agency-tours-item-content-roadmap-list-item-description">
                      {el.description}
                    </div>
                  )
                }

              </div>
            ))
          }
          {/*<div className="agency-tours-item-content-roadmap-list-item">*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-header">*/}
              {/*Collection of tourists in Almaty*/}
            {/*</div>*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-attributes">*/}
              {/*<span className="afoot">Afoot</span>*/}
              {/*<span className="distance">1 km</span>*/}
            {/*</div>*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-description">*/}
              {/*This means generally better standards of accommodation, restaurants and transport than elsewhere in Central Asia. The biggest city, Almaty, is almost reminiscent of Europe with its leafy avenues.*/}
            {/*</div>*/}
          {/*</div>*/}
          {/*<div className="agency-tours-item-content-roadmap-list-item">*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-header">*/}
              {/*A trip to the Shymbulak*/}
            {/*</div>*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-attributes">*/}
              {/*<span className="oncar">On car</span>*/}
              {/*<span className="distance">1 km</span>*/}
            {/*</div>*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-description">*/}
              {/*This means generally better standards of accommodation, restaurants and transport.*/}
            {/*</div>*/}
          {/*</div>*/}
          {/*<div className="agency-tours-item-content-roadmap-list-item">*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-header">*/}
              {/*Trip to the lake*/}
            {/*</div>*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-attributes">*/}
              {/*<span className="onbus">On bus</span>*/}
              {/*<span className="distance">1 km</span>*/}
            {/*</div>*/}
            {/*<div className="agency-tours-item-content-roadmap-list-item-description">*/}
              {/*This means generally better standards of accommodation, restaurants and transport.*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
}
