import React from 'react'
import Head from "next/head";
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'
import FavoriteItem from '../../components/favorite/favoriteItem';
import css from "./favorite.module.scss"
const Favorite = () => {

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

  const { data, error, loading } = useQuery(query, {
    variables: {
      first: 8,
      page: 1
    }
  });

  if (loading) return <>loading</>
  if (error || !data) return <>error</>

  return (
    <>
      <Head>
        <title>مفضلات</title>

      </Head>
      <div className={`container ${css.load}`}  >
        <h1>مفضلاتي</h1>
        <div className={css.articles}>

          {data.savedLearn.data.map((item, i) => (
            <> {console.log(item.categories)}
              <FavoriteItem item={item} key={i} />
            </>
          ))
          }
        </div>
      </div>
    </>
  )

}

export default Favorite

