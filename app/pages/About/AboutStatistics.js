import React, { Component } from 'react'
import { LocalizationContext } from '../../../context'

class AboutStatistics extends Component {
    render() {
        const {list} = this.props
        return (
            <LocalizationContext.Consumer>
                {({localization}) => (
                    <div className="about-statistics-list">
                        {list.map((el, key) => {
                            return (
                                <div className="about-statistics-item" key={key}>
                                    <span className="number">{el.number}</span>
                                    <span className="title">{localization[el.title]}</span>
                                </div>
                        )})}
                    </div>
                )}
            </LocalizationContext.Consumer>
        )
    }
}

export default AboutStatistics
