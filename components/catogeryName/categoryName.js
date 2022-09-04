import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ArticleItem from '../article/articleItem';
import LearnFilter from '../filters/learn/learnFilter';
import css from "./categoryName.module.scss";
import ArticleCardLoad from '../skeleton/articleCard';

const CategoryName = ({ catogeries, filter }) => {

    const observer = useRef();
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);



    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const result = await axios.get(`${process.env.api}/learn/all?type=${filter.type}&page=${page}&count=12`, {
                headers: {
                    'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
                }
            })
            if (!data)
                setData(result.data.result.items)
            else
                setData(current => [...current, ...result.data.result.items]);
            setHasMore(result.data.result.total_pages > page);
            setLoading(false)
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const lastItem = useCallback(async node => {

        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, hasMore]);

    if (!data)
    return (<div className='container mt-36'>

        <Skeleton width={200} />
        <Skeleton count={3} />
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

                    {data && data.map((item, index) => {
                        return <ArticleItem item={item} showDesc={true} key={index} />
                    })}
                </div>
                <div ref={lastItem} />

            </div>

        </>
    )
}

export default CategoryName;