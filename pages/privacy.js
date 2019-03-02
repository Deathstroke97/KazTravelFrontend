import React, { Component } from 'react'
import { fetchData } from '../libs/fetchData'
import { parseCookies } from '../libs/cookies'

/**
 * Components
 */

import Wrapper from '../app/common/Wrapper'
import Content from '../app/common/ContentSection'
import PrivacyContent from '../app/pages/Privacy'

import { pdfList } from '../app/pages/Privacy/fixtures'

class Privacy extends Component {
    static async getInitialProps(ctx) {
        const cookies = parseCookies(ctx)
        const lang = cookies.culture

        const { pathname } = ctx;
        const income = await fetchData(ctx, `/blogPub/GetBlog?id=${93}`);
        const data = income.result;

        return {
            data, pathname, lang
        }
    }
    render() {
        const {data, pathname, lang, originalHost, originalURL} = this.props

        return (
            <Wrapper title="Privacy">
                <Content>
                    <PrivacyContent
                        data={data}
                        list={pdfList}
                        pathname={pathname}
                        culture={lang}
                        originalHost={originalHost}
                        originalURL={originalURL}
                    />
                </Content>
            </Wrapper>
        )
    }
}

export default Privacy
