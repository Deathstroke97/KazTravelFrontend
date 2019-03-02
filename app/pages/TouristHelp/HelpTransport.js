import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { number } from 'prop-types';
import Select from 'react-select';

export default class HelpTransport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            activeCity: null,
            activeValue: 0
        }
    }

    _renderTabsButtons() {
        const buttons = [
            {
                icon: '/static/images/icons/icon-tabs-plane.svg',
                icon_active: '/static/images/icons/icon-tabs-plane-active.svg',
                label: 'By airplane'
            },
            // {
            //     icon: '/static/images/icons/icon-tabs-train.svg',
            //     icon_active: '/static/images/icons/icon-tabs-train-active.svg',
            //     label: 'By train'
            // }
        ];
        const {activeTab} = this.state;
        return buttons.map((el, k) => (
            <figure key={k}
                className={classNames('tabs-button', {'tabs-button--active': activeTab === k})}
                onClick={() => this.setState({activeTab: k})}
            >
                {activeTab === k ? <img src={el.icon_active} /> : <img src={el.icon} />}
                <span className="tabs-label">{el.label}</span>
            </figure>
        ))
    }

    _renderDestinationsList() {
        const {activeCity, activeValue} = this.state;
        const {article} = this.props;
        return article.destinationsList.map((element, key) => (
            <Fragment key={key}>
                {   activeValue === key &&
                    <Fragment>
                        <h3 className="destinations-board-title">To {element.city}</h3>
                        <div className="destinations-board-header">
                            <span>Where</span>
                            <span>Travel time</span>
                        </div>
                        {element.destinations.map((el, k) => {
                            return (
                                <div key={k} className="destinations-board-item">
                                    <span>{el.city_from}</span>
                                    <span className="destinations-board-arrow"></span>
                                    <span>{element.city}</span>
                                    <span>≈ {el.duration} h</span>
                                </div>
                            )
                        })}
                        <figure className="destinations-board-map">
                            <div className="img">
                                <img src={element.map} />
                            </div>
                            <figcaption>
                                Direct flights to {element.city}
                            </figcaption>
                        </figure>
                    </Fragment>
                }
            </Fragment>
        ))
    }

    _renderTransportBriefInfo() {
        const {article} = this.props;
        return article.list.map((el, k) => (
            <figure className="transport-brief-item">
                <figcaption className="transport-brief-header">
                    <img src={el.icon}/>
                    <h2 className="transport-brief-title">{el.title[this.culture]}</h2>
                </figcaption>
                <p className="transport-brief-desc">{el.description[this.culture]}</p>
            </figure>
        ))
    }

    render() {
        const {article} = this.props;
        if (!article) return null;

        // const citiesSelect = [
        //     {value: '0', label: 'Almaty'},
        //     {value: '1', label: 'Aktau'},
        //     {value: '2', label: 'Astana'},
        //     {value: '4', label: 'Atyrau'},
        //     {value: '5', label: 'Kostanai'},
        //     {value: '6', label: 'Oral'},
        //     {value: '7', label: 'Shymkent'},
        // ];
        const {activeCity, activeValue} = this.state;
        return (
            <Fragment>
                <h1 className="content-title content-title--bounded">{article.title}</h1>
                <div className="content-text content-text--centered">
                    {article.description}
                </div>
                {/* {this._renderTransportBriefInfo.apply(this)} */}
                {/* <h2 className="content-subtitle">{article.subtitle[culture]}</h2> */}
                <div dangerouslySetInnerHTML={{__html: article.content}} />
                    {/* <p>{article.text1[culture]}</p>
                </div> */}

                <div className="tabs">
                    {this._renderTabsButtons.apply(this)}
                    <span className="tabs-text">To city:</span>
                    <Select
                        classNamePrefix="tabs-selectTransport"
                        options={article.destinationsList.map((el,idx) => {return {value: idx, label:el.city}})}
                        value={activeCity !== null ? activeCity : {value: '0', label: 'Almaty'}}
                        onChange={(e) => {
                            this.setState({
                                activeCity: e,
                                activeValue: parseInt(e.value)
                            })
                        }}
                    />
                </div>

                {this._renderDestinationsList.apply(this)}
            </Fragment>
        )
    }
}
