import React from "react";
import Head from "next/head";
import axios from "axios";
import CategoryName from "../../../components/catogeryName/categoryName";

const CategoryPage = ({ category, preLoadImages, articles, pages }) => {

    // console.log(preLoadImages)
    return (
        <>
            <Head>
                <title>{category.title}</title>
                <meta property="og:title" content={category.title} />
                <meta name="description" content={category.description.replace(/[<-\w*|"|=|;|:|&|/>]/g, "")} />
                <meta property="og:url" content={category.url} />
                <meta property="og:locale" content="ar_SA" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content={category.description.replace(/[<-\w*|"|=|;|:|&|/>]/g, "")} />
                {articles.map((article, i) => <link key={i} rel="preload"
                    href={`https://images.for9a.com/thumb/fit-600-400-80-webp/${article.images.folder}/${article.images.name}`}
                    as="image"
                    imageSrcSet={preLoadImages[i].toString()}
                    media="(min-width: 800px)" />
                ).slice(0, 4)}
                {articles.map((article, i) => <link key={i} rel="preload"
                    href={`https://images.for9a.com/thumb/fit-600-400-80-webp/${article.images.folder}/${article.images.name}`}
                    as="image"
                    imageSrcSet={preLoadImages[i].toString()}
                    media="(min-width: 200px)" />
                ).slice(0, 2)}
            </Head>
            <CategoryName
                catogeries={category}
                filter={{ type: category.id }}
                articles={articles}
                pages={pages}
            />
        </>
    )
}

export async function getStaticPaths() {
    const catogeries = await axios.get(`https://api.for9a.com/blog/category`)
    const paths = catogeries.data.result.map((catogery) => ({
        params: { catogeryName: catogery.slug },

    }))
    return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
    const categoryData = await axios.get(`${process.env.api}/blog/category`)
    const category = await categoryData.data.result.find((item) => {
        if (item.slug == context.params.catogeryName) {
            return item
        }
    })

    const articlesData = await axios.get(`${process.env.api}/learn/all?type=${category.id}&page=1&count=12`, {
        headers: {
            'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
        }
    })
    const ar = articlesData.data.result.items
    const pages = articlesData.data.result.total_pages;
    const widths = [390, 414, 640, 750, 828, 1200];
    let preLoadImages = [];
    ar.map((item, i) => {
        preLoadImages[i] = [widths.map((width) => {
            const height = Math.ceil(width / 2);
            return `https://images.for9a.com/thumb/fit-${width}-${height}-80-webp/${item.images.folder}/${item.images.name} ${width}w`
        })];
    })

    return {
        props: {
            category,
            articles: ar,
            preLoadImages,
            pages
        },
        revalidate: 18000,
    }
}

export default CategoryPage;
