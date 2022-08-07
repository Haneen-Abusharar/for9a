import React, { useState, useEffect } from "react";
import Head from "next/head";
import CategoryName from "../../../components/catogeryName/categoryName";

const CategoryPage = ({ catogeries }) => {
    return (
        <>
            <Head>
                <title>{catogeries.title}</title>
                <meta name="description"
                    content={catogeries.description
                        .replace(/[<-\w*|"|=|;|:|&|/>]/g, "")
                    } />

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
    // const slug = context.params.CategoryName;
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