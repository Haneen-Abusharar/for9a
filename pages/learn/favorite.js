import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from "next/head";
import Link from 'next/link'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'
import FavoriteItem from '../../components/favorite/favoriteItem';
import css from "./favorite.module.scss"
const Favorite = () => {
  const observer = useRef();
  const [loading2, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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

  const { data, error, fetchMore, loading } = useQuery(query, {
    variables: {
      first: 12,
      page: 1
    }
  });

  useEffect(() => {
    console.log("log")
    setLoading(true);
    console.log(pagee)
    fetchMore({
      variables: {
        first: 12,
        page: pagee,
      },
      updateQuery: (pv, { fetchMoreResult }) => {
        setHasMore(fetchMoreResult.savedLearn.paginatorInfo.hasMorePages);
        setLoading(false)
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

  }, [pagee]);


  const lastItem = useCallback(async node => {
    console.log("lastitem")
    if (loading2) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      console.log("observer");
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
        {/* {hasMore && <button onClick={loadMore}>load more</button>} */}
      </div>
      <div ref={lastItem} />
    </>
  )
}

export default Favorite

