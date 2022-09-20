import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ArticleItem from '../article/articleItem';
import LearnFilter from '../filters/learn/learnFilter';
import css from "./categoryName.module.scss";
import ArticleCardLoad from '../skeleton/articleCard';

const CategoryName = ({ catogeries, filter, articles, pages }) => {

    const observer = useRef();
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(articles)
        setHasMore(pages > page)
    }, [router.asPath])

    useEffect(() => {
        if (page > 1) {
            setLoading(true);
            async function fetchData() {
                const result = await axios.get(`${process.env.api}/learn/all?type=${filter.type}&page=${page}&count=12`, {
                    headers: {
                        'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
                    }
                })
                setData(current => [...current, ...result.data.result.items]);
                setHasMore(result.data.result.total_pages > page);
                setLoading(false)
            }
            fetchData();
        }
    }, [page]);

    const lastItem = useCallback(async node => {
        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(() => {
            if (hasMore)
                setPage(page++);
        }, {
            root: null,
            rootMargin: '20px',
            threshold: 0
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [loading, hasMore]);

    if (!data)
        return (
            <div className='container md:mt-28 xs:mt-36'>
                <Skeleton width={200} className="mb-5" />
                <Skeleton count={4} />
                <div className='  md:grid md:grid-cols-3 gap-1 mt-5 '>
                    <ArticleCardLoad /> <ArticleCardLoad />  <ArticleCardLoad />
                    <ArticleCardLoad />  <ArticleCardLoad />  <ArticleCardLoad />
                    <ArticleCardLoad />  <ArticleCardLoad />  <ArticleCardLoad />
                </div>
            </div>
        )


    return (
        <>
            <div className={css.learnsearch}><LearnFilter /></div>
            <div className={`container ${css.name_description}`}>
                <h1 className=''>{catogeries.title} </h1>
                <p className='text-base'>{catogeries.description
                    .replace(/[<-\w*|"|=|;|:|&|/>]/g, "")}
                </p>
            </div>
            <div className={`container ${css.load}`}   >
                <div className={css.articles}>
                    {data && data.map((item) => {
                        return <ArticleItem item={item} showDesc={true}
                            key={item.id} priority={true} />
                    })}
                </div>
                <div ref={lastItem} />
            </div>
        </>
    )
}
export default CategoryName;

