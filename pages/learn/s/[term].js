import Head from "next/head";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton'
import ArticleItem from "../../../components/article/articleItem";
import css from "../../../components/catogeryName/categoryName.module.scss"
import LearnFilter from "../../../components/filters/learn/learnFilter";
import c from './search.module.scss'

const SearchPage = () => {

    const { query } = useRouter();
    const { isLoading, error, data } = useQuery('repoData', () =>
        axios.get(`${process.env.api}/learn/all?term=${query.term}`, {
            headers: {
                'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
            }
        }).then(res => res.data))
   
    if (error || isLoading || !data) return (<Skeleton width={400} />)

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