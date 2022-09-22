import React from 'react'
import Head from "next/head";
import axios from 'axios';
import SpecialityArticle from '../../components/article/specialityArticle';

function SpecialityPage(articles) {

    let preloadImages = [];
    [390, 414, 500, 615, 768, 800, 900].map((width) => {
        const height = Math.ceil(width / 2)
        preloadImages.push(`https://images.for9a.com/thumb/fit-${width}-${height}-100-webp/${articles.articles.images.folder}/${articles.articles.images.name} ${width}w`)
    })

    return (
        <>
            <Head>
                <title>{articles.articles.title}</title>
                <meta name="theme-color" content="#317EFB" />
                <meta name="description" content={articles.articles.short_description} />
                <meta property="og:title" content={articles.articles.title} />
                <meta property="og:url" content={articles.articles.url} />
                <meta property="og:locale" content="ar_SA" />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={`https://images.for9a.com/thumb/fit-1200-630-100-webp/${articles.articles.images.folder}/${articles.articles.images.name}`} />
                <meta property="og:description" content={articles.articles.short_description} />
                <link rel="preload" href={`https://images.for9a.com/thumb/fit-415-205-320-webp/${articles.articles.images.folder}/${articles.articles.images.name}`}
                    as="image" imageSrcSet={preloadImages.toString()} />
            </Head>
            <SpecialityArticle article={articles.articles}
              
            />

        </>
    )
}

export default SpecialityPage
export const getServerSideProps = async (ctx) => {
    var uri = `${process.env.api}/speciality/details?slug=${(ctx.query.slug)}`;
    var res = encodeURI(uri);
    const articles = await axios.get(res, {
        headers: {
            'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
        }
    })

    if (articles.data.length == 0) return { notFound: true }

    return { props: { articles: articles.data } }
}