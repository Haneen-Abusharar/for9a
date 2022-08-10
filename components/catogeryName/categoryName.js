import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import ArticleItem from '../article/articleItem';
import css from "./categoryName.module.scss";
import LearnFilter from '../filters/learn/learnFilter';
const CategoryName = ({ catogeries, filter }) => {

    const observer = useRef();
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);



    const InlineWrapperWithMargin = ({ children }) => {
        return <div style={{ margin: '50px', marginTop: "70px" }}>{children}</div>
    }

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const result = await axios.get(`https://api.for9a.com/learn/all?type=${filter.type}&page=${page}&count=12`)
            if (!data)
                setData(result.data.result.items)
            else
                setData(current => [...current, ...result.data.result.items]);
            setHasMore(result.data.result.total_pages > page);
            setLoading(false)
        }
        fetchData();
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
    }, [loading, hasMore]);



    if (!data) return (<Skeleton
        count={5}
        wrapper={InlineWrapperWithMargin}
        inline
        width={500}
        hight={400}
    />)

    return (
        <>
            <div className={css.learnsearch}><LearnFilter /></div>
            <div className={`container ${css.name_description}`}>
                <h1>{catogeries.title} </h1>
                <p>{catogeries.description
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