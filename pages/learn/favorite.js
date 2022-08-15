import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from "next/head";
import Link from 'next/link'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'
import FavoriteItem from '../../components/favorite/favoriteItem';
import css from "./favorite.module.scss"
const Favorite = () => {
  const observer = useRef();
  const [loading2, setLoading] = useState(true);
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
            rate
            image {
              small
              medium
              large
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

  const { data, error, fetchMore, updateQuery, loading } = useQuery(query, {
    variables: {
      first: 12,
      page: 1
    }
  });
  console.log(data?.savedLearn.paginatorInfo.hasMorePages)
  useEffect(() => {
    setLoading(true);
      fetchMore({
        variables: {
          first: 12,
          page: pagee,
        },
        updateQuery: (pv, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pv
          }
          return {
            savedLearn: {
              __typename: 'BlogPaginator',
              data: [...pv.savedLearn.data,
              ...fetchMoreResult.savedLearn.data],
              paginatorInfo: fetchMoreResult.savedLearn.paginatorInfo

            }
          }
        }
      });
      
    console.log(data?.savedLearn.paginatorInfo.hasMorePages)
    setHasMore(data?.savedLearn.paginatorInfo.hasMorePages);
    setLoading(false)

  }, [pagee]);

  const lastItem = useCallback(async node => {

    if (loading2) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      // console.log(hasMore)
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

  if (loading) return <>loading</>
  if (error || !data) return <>error</>

  return (
    <>
      <Head>
        <title>مفضلات</title>
      </Head>
      <div className={`container ${css.load}`}  >
        <div className={css.breadcrumb}>
          <Link href={"/learn"}><a><h5> تعلم / </h5></a></Link>
          <Link
            href={`/learn/favorite`}>
            <a><h5>مفضلة</h5></a>
          </Link>
        </div>

        <h1>مفضلاتي</h1>
        <div className={css.articles}>
          {data && data.savedLearn.data.
            map((item, i) => (
              <FavoriteItem item={item} key={i} />
            ))}
        </div>
        <div ref={lastItem} />
      </div>
    </>
  )
}

export default Favorite

