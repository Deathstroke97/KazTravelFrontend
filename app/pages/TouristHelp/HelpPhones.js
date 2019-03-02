import React, { Component, Fragment } from 'react';

export default class HelpPhone extends Component {

    // _renderPhonesList() {
    //     const {article} = this.props;
    //
    //     return article.mainList.map((el, i) => (
    //         <figure className="phones-list-item">
    //             <img src={el.icon} className="phones-list-icon" />
    //             <figcaption className="phones-list-desc">
    //                 <h4 className="phones-list-title">{el.title[this.culture]}</h4>
    //                 <div>
    //                     <img src="/static/images/icons/icon-phone.svg" />
    //                     <span className="phones-list-number">{el.number}</span>
    //                 </div>
    //             </figcaption>
    //         </figure>
    //     ))
    // }

    render() {
        const {article} = this.props;
        if (!article) return null;

        return (
            <div className="container container-help">
                <h1 className="content-title content-title--bounded">{article.title}</h1>
                <div dangerouslySetInnerHTML={{__html: article.content}}/>
                {/* {this._renderPhonesList.apply(this)} */}
            </div>
        )
    }
}
