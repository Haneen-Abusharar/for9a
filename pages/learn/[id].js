import React from 'react';
import Head from "next/head";
import axios from 'axios';
import Article from "../../components/article/article";

const ArticleP = ({ articles }) => {

    let preloadImages = [];
    [390,414,615].map((width) => {
        const height = Math.ceil(width / 2)
        preloadImages.push(`https://images.for9a.com/thumb/fit-${width}-${height}-100-webp/${articles[0].images.folder}/${articles[0].images.name} ${width}w`)
    })

    return (
        <>
            <Head>
                <title>{articles[0].title}</title>
                <meta name="theme-color" content="#317EFB"/>
                <meta name="description" content={articles[0].short_description} />
                <meta property="og:title" content={articles[0].title} />
                <meta property="og:url" content={articles[0].url} />
                <meta property="og:locale" content="ar_SA" />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={`https://images.for9a.com/thumb/fit-1200-630-100-webp/${articles[0].images.folder}/${articles[0].images.name}`} />
                <meta property="og:description" content={articles[0].short_description} />
                <link rel="preload" href={`https://images.for9a.com/thumb/fit-415-205-320-webp/${articles[0].images.folder}/${articles[0].images.name}`}
                    as="image" imageSrcSet={preloadImages.toString()} />

            </Head>
            <Article item={articles[0]} filter={{
                type: articles[0].category.id
            }} />

        </>
    )
}
export default ArticleP;
export const getServerSideProps = async (ctx) => {

    var uri = `${process.env.api}/learn/all?slug=${(ctx.query.id)}&full=1`;
    var res = encodeURI(uri);
    const articles = await axios.get(res, {
        headers: {
            'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
        }
    })
  
    if (articles.data.result.items.length == 0) return { notFound: true }
   
    return { props: { articles: articles.data.result.items } }
}

