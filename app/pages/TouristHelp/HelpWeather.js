import React, { Component, Fragment } from 'react';
import { parseCookies } from 'nookies';

export default class HelpWeather extends Component {

    _renderWeatherList() {
        const {article} = this.props;
        return article.list.map((el, i) => (
            <figure className="weather-list-item">
                <figcaption className="weather-list-info">
                    <div className="weather-list-header">
                        <img src={el.icon} />
                        <h2>{el.title[this.culture]}</h2>
                    </div>
                    <p className="weather-list-desc">{el.description[this.culture]}</p>
                </figcaption>
                <div className="weather-list-img">
                    <img src={el.image} />
                </div>
            </figure>
        ))
    }

    render() {
        const {article} = this.props;
        if (!article) return null;

        const cookies = parseCookies()
        const { culture } = cookies
        this.culture = culture;

        return (
            <div className="container container-help">
                <h1 className="content-title content-title--bounded">{article.title}</h1>
                <div dangerouslySetInnerHTML={{__html: article.content}}/>
            </div>
        )
    }
}
