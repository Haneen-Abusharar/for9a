import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import ArticleCardLoad from '../skeleton/articleCard';
import ArticleItem from './../article/articleItem'
import css from "../category/category.module.scss";
import axios from 'axios';
SwiperCore.use([Navigation]);

const CaroselArticles = ({ filter }) => {
  const [swipe, setSwipe] = useState();
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const { isLoading, error, data } = useQuery(['learn-category-home', filter.type], () =>
    axios.get(`${process.env.api}/learn/all?type=${filter.type}`, {
      headers: {
        'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
      }
    }).then(res => res.data))

  if (!data || isLoading || error)
    return (<>
      <div className=' xs:block sm:hidden md:hidden lg:hidden'>
        <ArticleCardLoad />
      </div>
      <div className=' xs:hidden sm:grid sm:grid-cols-2 gap-1 md:hidden lg:hidden '>
        <ArticleCardLoad />
        <ArticleCardLoad />
      </div>
      <div className=' xs:hidden sm:hidden lg:hidden md:grid grid-cols-3  gap-1 '>
        <ArticleCardLoad />
        <ArticleCardLoad />
        <ArticleCardLoad />
      </div>
      <div className=' xs:hidden sm:hidden md:hidden lg:grid grid-cols-4  gap-1 '>
        <ArticleCardLoad />
        <ArticleCardLoad />
        <ArticleCardLoad />
        <ArticleCardLoad />
      </div>

    </>
    )


  return (
    <>
      <button className='bg-black' onClick={() => swipe?.slidePrev()}>
        prev
      </button>
      <button onClick={() => swipe?.slideNext()}>
        next
      </button>
      <Swiper
        onBeforeInit={(swipper) => setSwipe(swipper)}
        breakpoints={{
          200: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10
          },
          450: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10
          },
          800: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 10,
            loop: false,
            pagination: {
              dynamicBullets: true,
              dynamicMainBullets: 8,
              clickable: true,
            }
          },
        }}

        loop={true}
        loopFillGroupWithBlank={true}

        //  navigation={true}
        modules={[Pagination, Navigation]}
        className={css.swiper2}

      // onInit={(swiper) => {

      //   swiper.params.navigation.prevEl = navigationPrevRef.current;
      //   swiper.params.navigation.nextEl = navigationNextRef.current;
      //   swiper.navigation.init();
      //   swiper.navigation.update();
      // }}
      // onSwiper={(swiper) => {
      //   // Delay execution for the refs to be defined
      //   setTimeout(() => {
      //     // Override prevEl & nextEl now that refs are defined
      //     swiper.params.navigation.prevEl = navigationPrevRef.current
      //     swiper.params.navigation.nextEl = navigationNextRef.current

      //     // Re-init navigation
      //     swiper.navigation.destroy()
      //     swiper.navigation.init()
      //     swiper.navigation.update()
      //   })
      // }}
      >
        {
          data?.result?.items
            .map((article, index) => (
              <div key={index}>
                <SwiperSlide key={article.url + index} >
                  <ArticleItem item={article} />
                </SwiperSlide>
                {/* <div ref={navigationPrevRef}  className="bg-red">PRRV</div>
        <div ref={navigationNextRef}>NEXT</div> */}
              </div>
            ))
        }
      </Swiper >
    </>
  )

}
export default CaroselArticles;