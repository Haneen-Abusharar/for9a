import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import ArticleCardLoad from '../skeleton/articleCard';
import fetcher from '../../utilities/fetcher';
import ArticleItem from './../article/articleItem'
import css from "../category/category.module.scss";


const CaroselArticles = ({ filter }) => {


  const { data, loading, error } =
    useSWR(`${process.env.api}/learn/all?type=${filter.type}`, fetcher);


  if (!data || loading || error) 
  //
  return (
    <div className=' grid grid-cols-3  gap-1 '>
      <div className=''><ArticleCardLoad /></div>
      <div className=''><ArticleCardLoad /></div>
      <div className=' '><ArticleCardLoad /></div>
    </div>)


  return (

    <Swiper
      breakpoints={{
        200: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        800: {
          slidesPerView: 3,
          slidesPerGroup: 3,

        },

      }}

      loop={true}
      loopFillGroupWithBlank={true}
      pagination={{ clickable: true }}
      //navigation={true}
      modules={[Pagination, Navigation]}
      className={css.swiper2}
    >
      {
        data?.result?.items
          .map((article, index) => (
            <div key={index}>
              <SwiperSlide key={article.url + index} >
                <ArticleItem item={article} />
              </SwiperSlide>
            </div>
          ))
      }
    </Swiper>

  )

}
export default CaroselArticles;