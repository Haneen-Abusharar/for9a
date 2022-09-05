import React from 'react';
import useSWR from 'swr';
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
    return (<>
      <div className=' hidden md:grid grid-cols-3  gap-1 '>
        <ArticleCardLoad />
        <ArticleCardLoad />
        <ArticleCardLoad />
      </div>
      <div className=' grid grid-cols-2 gap-1 md:hidden '>
        <ArticleCardLoad />
        <ArticleCardLoad />
      </div>

    </>
    )


  return (
    <Swiper
      breakpoints={{
        200: {
          slidesPerView: 1,
          slidesPerGroup: 1
        },
        450: {
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