import React from 'react';
import Head from "next/head";
import Article from "../../components/article/article";
import axios from 'axios';



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



        </>
    )
}

export const getServerSideProps = async (ctx) => {
    
    var uri = `https://api.for9a.com/learn/all?slug=${(ctx.query.id)}&full=1`;
    var res = encodeURI(uri);
    const articles = await axios.get(res, {
        headers: {
            'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
        }
    })
    
    if (articles.data.result.items.length == 0) return { notFound: true }

    return { props: { articles: articles.data.result.items } }
}

export default ArticleP;