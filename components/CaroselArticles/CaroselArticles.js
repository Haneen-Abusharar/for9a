import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import fetcher from '../../utilities/fetcher';
import ArticleItem from './../article/articleItem'
import css from "../category/category.module.scss";

const CaroselArticles = ({ filter }) => {
 

  const { data, loading, error } =
    useSWR(`https://api.for9a.com/learn/all?type=${filter.type}`,
      fetcher);



  const InlineWrapperWithMargin = ({ children }) => {
    return <span style={{ margin: '1rem' }}>{children}</span>
  }
  if (error) return <div>failed to load</div>
  if (loading) return (<Skeleton
    count={5}
    wrapper={InlineWrapperWithMargin}
    inline
    width="200px"
    hight="200px"
  />)
  if (!data) return (<Skeleton
    count={5}
    wrapper={InlineWrapperWithMargin}
    inline
    width={100}
    hight={300}
  />)


  return (
    <>
      <Swiper
        slidesPerView={2}
        slidesPerGroup={3}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}

        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={css.swiper2}
      >
        {
          data?.result?.items
            .map((article, index) => (
              <SwiperSlide key={article.url} >
                <ArticleItem item={article} />
              </SwiperSlide>
            ))
        }
      </Swiper>
    </>
  )

}
export default CaroselArticles;