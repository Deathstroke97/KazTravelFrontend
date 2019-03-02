import React, { Component } from 'react'
import { fetchData } from '../libs/fetchData'

/**
 * Components
 */

import Wrapper from '../app/common/Wrapper'
import Content from '../app/common/ContentSection'
import AboutContent from '../app/pages/About'

import {numberListFirst, numberListSecond, docsList} from '../app/pages/About/fixtures'

class AboutProject extends Component {

    static async getInitialProps(ctx) {
        const income = await fetchData(ctx, '/homePub/AboutProject');
        const data = income.result;

        const numberListFirst = [
            {number: '14', title: 'aboutRegions'},
            {number: '3', title: 'aboutCities'},
            {number: data.clusters, title: 'aboutClusters'},
            {number: data.blogs, title: 'aboutPublications'},
            {number: data.calendarEvents, title: 'aboutEvents'},
        ]
        const numberListSecond = [
            {number: data.routes, title: 'aboutRoutes'},
            {number: data.tourismType, title: 'aboutTravelByTheme'},
            {number: data.tourObjects, title: 'aboutTouristSpot'},
        ]
        const numberListThird = [
            {number: data.guides, title: 'aboutGuides'},
            {number: data.souvenirShops, title: 'aboutSovenirShops'},
            {number: data.tourOperators, title: 'aboutTourOperators'},
        ]
        return {
            numberListFirst, numberListSecond, numberListThird
        }
    }

    render() {
        const { numberListFirst, numberListSecond, numberListThird, originalHost, originalURL } = this.props

        const docs = docsList.map((el) => ({
          ...el,
          link: `${originalHost}${el.link}`
        }));
        return (
            <Wrapper title="About">
                <Content isWide>
                    <AboutContent
                        docs={docs}
                        numberListFirst={numberListFirst}
                        numberListSecond={numberListSecond}
                        numberListThird={numberListThird}
                        originalURL={originalURL}
                    />
                </Content>
            </Wrapper>
        )
    }
}

export default AboutProject
