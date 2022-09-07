import React from 'react';
import Head from "next/head";
import Article from "../../components/article/article";
import axios from 'axios';
import { useQuery } from 'react-query'


const ArticleP = ({ articles }) => {

    let preloadImages = [];
    [640, 750, 828, 1080, 1200, 1920, 2048, 3840].map((width) => {
        const height = Math.ceil(width / 2)
        preloadImages.push(`https://images.for9a.com/thumb/fit-${width}-${height}-100-webp/${articles[0].images.folder}/${articles[0].images.name} ${width}w`)
    })

    return (
        <>
            <Head>
                <title>{articles[0].title}</title>
                <meta name="description" content={articles[0].short_description} />
                <meta property="og:title" content={articles[0].title} />
                <meta property="og:url" content={articles[0].url} />
                <meta property="og:locale" content="ar_SA" />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={`https://images.for9a.com/thumb/fit-1200-630-100-webp/${articles[0].images.folder}/${articles[0].images.name}`} />
                <meta property="og:description" content={articles[0].short_description} />
                <link rel="preload" href={`https://images.for9a.com/thumb/fit-640-250-320-webp/${articles[0].images.folder}/${articles[0].images.name}`}
                    as="image" imageSrcSet={preloadImages.toString()} />
                {/* <link rel="preload" href={"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg"} as="image" /> */}

            </Head>
            <Article item={articles[0]} filter={{
                type: articles[0].category.id
            }} />

        </>
    )
}

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

export default ArticleP;