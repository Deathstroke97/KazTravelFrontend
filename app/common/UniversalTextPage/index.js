import React, { Component, Fragment } from 'react';
import { Parallax } from 'react-scroll-parallax';

import Wrapper from '../Wrapper';
import Content from '../ContentSection';
// import Breadcrumbs from '../Breadcrumbs';
import ContentGallery from '../ContentGallery';

export default class UniversalTextPage extends Component {
    render() {
        const { article: { 
            gallery,
            content_4 
        }} = this.props;
        return (
            <Fragment>
                <Content isWide>
                    {/* <Breadcrumbs page='publications'/> */}
                    <h1 className="content-title content-title--bounded">Universal text page</h1>
                    <div className="publications-banner">
                        <Parallax
                        offsetYMax="100px"
                        offsetYMin="-180px"
                        slowerScrollRate
                        >
                            <img src="/static/images/text-page/top-banner.jpg" alt=""/>
                        </Parallax>
                    </div>
                    <article className="container container--narrow">
                        <h3 className="content-subtitle content-subtitle--line">H2Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</h3>
                        <div className="content-text">
                            The capital Astana, on the windswept northern steppe, has been transformed into a 21st-century showpiece with a profusion of bold futuristic architecture. But it's beyond the cities that you'll find the greatest travel adventures, whether hiking in the high mountains and green valleys of the Tian Shan, searching for wildlife on the lake-dotted steppe, enjoying homespun hospitality in village guesthouses, or jolting across the western deserts to remote underground mosques.
                        </div>
                        <blockquote className="content-blockquote">
                            <h4 className="content-subtitle">
                                Stroll Nurzhol Bulvar to spot Astana’s most striking contemporary constructions
                            </h4>
                            <div className="content-text">
                                The architecture-exhibition boulevard runs between the impressive Ak Orda – the imposing, palatial building where the president works – and Khan Shatyr, a wacky off-centre tent-like structure and one of Astana’s most incredible buildings.
                                A wacky off-centre tent-like structure and one of Astana’s most incredible buildings.  Wacky off-centre tent-like structure and one of Astana’s most incredible buildings.
                            </div>
                        </blockquote>
                        <div className="content-text">
                            The capital Astana, on the windswept northern steppe, has been transformed into a 21st-century showpiece with a profusion of bold futuristic architecture. But it's beyond the cities that you'll find the greatest travel adventures.
                        </div>
                    </article>
                    
                    <article className="container">
                        <ContentGallery list={gallery}/>
                    </article>

                    <article className="container container--narrow content-article" dangerouslySetInnerHTML={{__html: content_4}} />

                    <div className="container container--narrow">
                        <div className="publications-price-block">
                        <div className="publications-price-block-item publications-price-block-item--main">
                            10 000 KZT ≈
                        </div>
                        <div className="publications-price-block-item">23.45 EUR</div>
                        <div className="publications-price-block-item">27.15 USD</div>
                        <div className="publications-price-block-item">1 782.98 RUB</div>
                        <div className="publications-price-block-item">187.94 CNH</div>
                        <div className="publications-price-block-item">3 034.59 JPY</div>
                        </div>
                    </div>

                    <div className="container container--narrow">
                        <hr className="publications-divider"/>
                    </div>

                    <div className="container container--narrow">
                        <div className="publications-applications">
                        <a href="#" className="publications-applications-item">
                            <div className="publications-applications-item-icon yellow"></div>
                            <div className="publications-applications-item-description">
                            <div className="publications-applications-item-description-title">
                                Sample of filling in the migration card.pdf
                            </div>
                            <div className="publications-applications-item-description-size">
                                112 kb
                            </div>
                            </div>
                        </a>
                        <a href="#" className="publications-applications-item">
                            <div className="publications-applications-item-icon blue"></div>
                            <div className="publications-applications-item-description">
                            <div className="publications-applications-item-description-title">
                                Sample application for registration at the place of stay.doc
                            </div>
                            <div className="publications-applications-item-description-size">
                                8 kb
                            </div>
                            </div>
                        </a>
                        <a href="#" className="publications-applications-item">
                            <div className="publications-applications-item-icon green"></div>
                            <div className="publications-applications-item-description">
                            <div className="publications-applications-item-description-title">
                                Visa of a foreign citizen.ехеl
                            </div>
                            <div className="publications-applications-item-description-size">
                                14kb
                            </div>
                            </div>
                        </a>
                        </div>
                    </div>

                    <div className="container container--narrow">
                        <div className="publications-tags">
                        <a href="" className="tag-link">#Architectural sight</a>
                        <a href="" className="tag-link">#Oasis</a>
                        <a href="" className="tag-link">#TOP</a>
                        <a href="" className="tag-link">#Astana</a>
                        <a href="" className="tag-link">#Culturalheritage</a>
                        <a href="" className="tag-link">#Nature</a>
                        <a href="" className="tag-link">#Diving</a>
                        <a href="" className="tag-link">#Mountains</a>
                        <a href="" className="tag-link">#Food</a>
                        <a href="" className="tag-link">#Almaty</a>
                        <a href="" className="tag-link">#Hunt</a>
                        <a href="" className="tag-link">#Nomadic</a>
                        </div>
                    </div>



                </Content>
            </Fragment>
        )
    }
}