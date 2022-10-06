import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from "next/router";
import { QueryCache, useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { arrayToUrl } from '../../../components/utilities/helper';
import SpecialitiesFilter from '../../../components/filters/specialities/specialitiesFilter'
import ArticleItem from '../../../components/article/articleItem';
import css from '../../../components/catogeryName/categoryName.module.scss'

const FilterPage = () => {
    const observer = useRef();
    const { query } = useRouter();
    const router = useRouter()
    const [resultData, setResultData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [currentPage, setPage] = useState(1);

    useEffect(() => {
        console.log(query);
        if (!(router.isReady && query)) return;
        setPage(1);
        setResultData([]);
        getData();


    }, [router.isReady, query.type, query.skills, query.cost, query.market, query.term]);


    useEffect(() => {
        if (query && currentPage > 1) getData()
    }, [currentPage]);

    const getData = async () => {
        if (!currentPage)
            return;

        setLoading(true);
        const urlData = {
            count: 12,
            page: currentPage,

        };

        if (query.type) urlData.type = query.type;
        if (query.cost) urlData.cost = query.cost;

        if (query.skills) urlData.skills = query.skills;
        
        if (query.market) urlData.market = query.market;
        if (query.term) urlData.term = query.term;
        // console.log(query.skills.map(skill => skill))
        await axios.get(`${process.env.api}/speciality?${arrayToUrl(urlData)}`)
            .then(res => {
                setHasMore(res?.data.result.total_pages > currentPage);
                setResultData(current => [
                    ...current,
                    ...res?.data.result.items])
            });

        setLoading(false)
    }

    const lastItem = useCallback(async node => {
        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(() => {
            if (hasMore)
                setPage(currentPage++);
        }, {
            root: null,
            rootMargin: '20px',
            threshold: 0
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [loading, hasMore]);

    return (
        <>
            <SpecialitiesFilter />
            <div className={`container ${css.load}`}   >
                <div className={css.articles}>
                    {resultData?.length ?
                        resultData?.map((item, i) =>
                            <ArticleItem
                                key={i}
                                item={item}
                                author={false}
                            />
                        )
                        : <h3>لا يوجد نتائج</h3>
                    }
                </div>
                <div ref={lastItem} />
            </div>
        </>
    )
}

export default FilterPage