import Head from "next/head";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton'
import ArticleItem from "../../../components/article/articleItem";
import css from "../../../components/catogeryName/categoryName.module.scss"
import LearnFilter from "../../../components/filters/learn/learnFilter";
import c from './search.module.scss'
import fetcher from "../../../utilities/fetcher";

const SearchPage = () => {

    const { query } = useRouter();
    const { data, loading, error } = useSWR(`${process.env.api}/learn/all?term=${query.term}`, fetcher);
    if (error) return <div>failed to load</div>
    if (loading) return (<Skeleton width={400} />)
    if (!data) return (<Skeleton width={400} />)

    return (
        <>
            <Head>
                <title>بحث</title>

            </Head>
           
            <div className={c.learnsearch}><LearnFilter /></div>

            <div className={`container ${css.load}`} >
            
                <h2 className="mb-3
                ">نتائج البحث عن : {query.term} </h2>
                <div className={css.articles}>

                    {
                        data?.result?.items.length ?
                            data.result.items.map((item, index) => {
                                return <Fragment key={index}>
                                    <ArticleItem item={item} showDesc={true} />
                                </Fragment>
                            }) : <h3>لا يوجد نتائج</h3>
                    }

                </div>

            </div>
        </>
    )

}

export default SearchPage;