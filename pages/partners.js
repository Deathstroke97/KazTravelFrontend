import React, { Component } from 'react'
import { string, array } from 'prop-types'
import classNames from 'classnames'
import { fetchData } from '../libs/fetchData'

/**
 * Components
 */

import Wrapper from '../app/common/Wrapper'
import Content from '../app/common/ContentSection'
import PartnersContent from '../app/pages/Partners'

// import { partnersList } from '../app/pages/Partners/fixtures'

class Partners extends Component {

    static async getInitialProps(ctx) {
        const { pathname } = ctx;
        return {
            pathname
        }
    }

    render() {
        const { pathname, originalURL } = this.props

        return (
            <Wrapper title="Partners">
                <Content>
                    <PartnersContent
                        pathname={pathname}
                        originalURL={originalURL}
                    />
                </Content>
            </Wrapper>
        )
    }
}

export default Partners
