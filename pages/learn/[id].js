import React, { } from 'react';
import Head from "next/head";
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Article from "../../components/article/article";
import Comments from '../../components/comments/comments';
import StarRating from '../../components/Rating/rating';
import CaroselArticles from '../../components/CaroselArticles/CaroselArticles';


const ArticleP = ({ articles }) => {

    return (
        <>
            <Head>
                <title>{articles[0].title}</title>
                <meta name="description"
                    content={articles[0].short_description} />
            </Head>
            <Article item={articles[0]} filter={{
                type: articles[0].category.id
            }} />

            {/* <StarRating id={articles[0].id} />

            <CaroselArticles input={articles[0]} filter={{
                type: articles[0].category.id
            }} />

            <Comments /> */}

        </>
    )
}

export const getServerSideProps = async (ctx) => {

    const res = await fetch(`https://api.for9a.com/learn/all?slug=${(ctx.query.id)}&full=1`)
    const articles = await res.json();

    return { props: { articles: articles.result.items } }

}

export default ArticleP;