import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from "next/head";
import Link from 'next/link'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import css from "./favorite.module.scss"
import ArticleCardLoad from '../../components/skeleton/articleCard';
import ArticleItem from '../../components/article/articleItem';
const Favorite = () => {
  const observer = useRef();
  const [loading2, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pagee, setPage] = useState(1);

  const query =
    gql`
      query savedLearn($first: Int!, $page: Int!) {
        savedLearn(first: $first, page: $page) {
          paginatorInfo {
            total
            currentPage
            hasMorePages
          }
          data {
            id
            name
            url
            image {
              name
              folder
              medium
            }
            categories {
              id
              titleLocale
              slug
            }
          }
        }
      }
    `;

  const { data, error, fetchMore, loading } = useQuery(query, {
    variables: {
      first: 12,
      page: 1
    }
  });

  useEffect(() => {
    setLoading(true);
    fetchMore({
      variables: {
        first: 12,
        page: pagee,
      },
      updateQuery: (pv, { fetchMoreResult }) => {
        setHasMore(fetchMoreResult.savedLearn.paginatorInfo.hasMorePages);
        setLoading(false);
        if (!fetchMoreResult) {
          return pv
        }
        if (pagee == 1) {
          return {
            savedLearn: {
              __typename: 'BlogPaginator',
              data: [...fetchMoreResult.savedLearn.data],
              paginatorInfo: fetchMoreResult.savedLearn.paginatorInfo

            }
          }
        }
        else {
          return {
            savedLearn: {
              __typename: 'BlogPaginator',
              data: [...pv.savedLearn.data, ...fetchMoreResult.savedLearn.data],
              paginatorInfo: fetchMoreResult.savedLearn.paginatorInfo

            }
          }
        }
      }
    });

  }, [pagee, fetchMore]);


  const lastItem = useCallback(async node => {
    if (loading2) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (hasMore) {
        setPage(pagee++);
      }
    }, {
      root: null,
      rootMargin: '20px',
      threshold: 0
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading2, hasMore]);


  if (loading || error || !data)
    return (<>
      <div className='container mt-16'>
        <Skeleton  width={80} />
       <div className='mt-1 mb-4'> <Skeleton  width={80} /></div>
      </div>
      <div className=' container md:grid md:grid-cols-3 gap-1 mt-5 '>
        <ArticleCardLoad /> <ArticleCardLoad />  <ArticleCardLoad />
        <ArticleCardLoad />  <ArticleCardLoad />  <ArticleCardLoad />
        <ArticleCardLoad />  <ArticleCardLoad />  <ArticleCardLoad />
      </div>
    </>
    )
  return (
    <>
      <Head>
        <title>مفضلات</title>
        <meta name="description"content="مفضلات" />
                <meta property="og:title" content="مفضلات" />
                <meta property="og:locale" content="ar_SA" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="مفضلات"/>
      </Head>
      <div className={`container ${css.load}`}  >
        <div className={`${css.breadcrumb} `}>
          <Link href={"/learn"}><a><h5> تعلم / </h5></a></Link>
          <Link
            href={`/learn/favorite`}>
            <a><h5 className=''>مفضلة</h5></a>
          </Link>
        </div>

        <h1 className='text-xl mb-4'>مفضلاتي</h1>
        <div className={css.articles}>
          {data && data.savedLearn.data.
            map((item, i) => (
              <ArticleItem item={item} key={i} />
            ))}
        </div>

      </div>
      <div ref={lastItem} />
    </>
  )
}

export default Favorite

