import React from "react";
import Head from "next/head";
import CategoryName from "../../../components/catogeryName/categoryName";

const CategoryPage = ({ catogeries }) => {
    return (
        <>
            <Head>
                <title>{catogeries.title}</title>
                <meta property="og:title" content={catogeries.title} />
                <meta name="description" content={catogeries.description.replace(/[<-\w*|"|=|;|:|&|/>]/g, "")} />
                <meta property="og:url" content={catogeries.url} />
                <meta property="og:locale" content="ar_SA" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content={catogeries.description.replace(/[<-\w*|"|=|;|:|&|/>]/g, "")} />


            </Head>
            <CategoryName
                catogeries={catogeries} filter={{
                    type: catogeries.id
                }}
            />

        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`https://api.for9a.com/blog/category`)
    const articles = await res.json()
    const paths = articles.result.map((article) => ({
        params: { catogeryName: article.slug },

    }))
    return { paths, fallback: false }
}

export const getStaticProps = async (context) => {

    const res = await fetch(`https://api.for9a.com/blog/category`)
    const data = await res.json();

    let catogeries = await data.result.find((item) => {
        if (item.slug == context.params.catogeryName)
            return item
    })

    return {
        props: {
            catogeries
        }
    }
}

export default CategoryPage;
