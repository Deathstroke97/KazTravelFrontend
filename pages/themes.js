import React, { Component } from 'react';
import { string, array } from 'prop-types';
import { fetchData } from '../libs/fetchData'

/**
 * Components
 */
import Wrapper from '../app/common/Wrapper';
import Content from '../app/common/ContentSection';
// import EventsContent from '../app/pages/Events';
import classNames from "classnames";
import ThemesContent from '../app/pages/Themes';


export default class Themes extends Component {


  static propTypes = {
    slug: string
  }

    static async getInitialProps(ctx) {
        const {query: {slug}, pathname} = ctx;
        let getAll, itemById, item, similarTourObjects, attractions,
        similarEvents, events, similarBlogs, publications, similarRoutes, routes;

        if(slug) {
            itemById = await fetchData(ctx, `/tourismTypePub/GetById?id=${slug}`);

            item = itemById.result

            similarTourObjects = await fetchData(ctx, `/tourismTypePub/GetSimilarTourObjects?id=${slug}`);

            attractions = {
                result: similarTourObjects.result.map(item => ({
                    ...item,
                    image: item.imagePath,
                    slug: item.id.toString()
                }))
            }
            similarEvents = await fetchData(ctx,`/tourismTypePub/GetSimilarEvents?id=${slug}`);



            events = {
                result: similarEvents.result.map(item => ({
                    ...item,
                    image: item.baseImagePath,
                    slug: item.id.toString(),
                    type: item.eventType,
                    date: item.startDate,

                }))
            }


            similarBlogs = await fetchData(ctx, `/tourismTypePub/GetSimilarBlogs?id=${slug}`);

            publications = {
                result: similarBlogs.result.map(item => ({
                    ...item,
                    image: item.baseImagePath,
                    slug: item.id.toString(),
                    date: item.publishDate,
                }))
            }

            similarRoutes = await fetchData(ctx, `/tourismTypePub/GetSimilarRoutes?id=${slug}`);

            routes = {
                result: similarRoutes.result.map(item => ({
                    ...item,
                    image: item.imagePath,
                    slug: item.id.toString(),
                    title: item.name,
                }))
            }

        }
        getAll = await fetchData(ctx, '/tourismTypePub/GetAll');

        return {
            slug,
            item,
            pathname,
            data: getAll.result.map(item => ({
                title: item.title,
                slug: item.id,
                image: item.iconBefore,
                image_hover: item.iconAfter,
                description: item.description
            })),
            attractions: slug && attractions.result,
            events: slug && events.result,
            publications: slug && publications.result,
            routes: slug && routes.result,
        }
  }

    render() {
        const {
            props: { slug, pathname, data, item , attractions, events, publications, routes, lang, originalURL}
        } = this;
        return (
            <Wrapper className={classNames({
                'main--shape': !slug
                })}
                title='Themes'
                isIndex={!!slug}
            >
                <Content isWide={!!slug}>
                    <ThemesContent
                        lang={lang}
                        slug={slug}
                        events={events}
                        routes={routes}
                        list={data}
                        pathname={pathname}
                        attractions={attractions}
                        publications={publications}
                        item = {item}
                        originalURL={originalURL}
                    />
                </Content>
            </Wrapper>
        )
    }
}
