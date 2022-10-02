import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import ArticleItem from '../article/articleItem'
import ArticleCardLoad from '../skeleton/articleCard';
import css from "../category/category.module.scss";

const CarouselSpecialities = ({ filter }) => {
    const [swipe, setSwipe] = useState();
    const { isLoading, error, data } = useQuery(['speciality-category-home', filter.type], () =>
        axios.get(`${process.env.api}/speciality?count=12&page=1&type=${filter.type}`, {
            headers: {
                'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
            }
        }).then(res => res.data))

    if (!data || isLoading || error)
        return (<>
            <div className='mb-16 mt-5 xs:block sm:hidden md:hidden lg:hidden'>
                <ArticleCardLoad />
            </div>
            <div className='mb-16 mt-5 xs:hidden sm:grid sm:grid-cols-2 gap-1 md:hidden lg:hidden '>
                <ArticleCardLoad />
                <ArticleCardLoad />
            </div>
            <div className='mb-16 mt-5 xs:hidden sm:hidden lg:hidden md:grid grid-cols-3 gap-3 '>
                <ArticleCardLoad />
                <ArticleCardLoad />
                <ArticleCardLoad />
            </div>
            <div className='mb-16 mt-5 xs:hidden sm:hidden md:hidden lg:grid grid-cols-4 gap-3 '>
                <ArticleCardLoad />
                <ArticleCardLoad />
                <ArticleCardLoad />
                <ArticleCardLoad />
            </div>
        </>
        )

    return (<>
        <div className="xs:hidden sm:hidden  md:flex justify-between -mb-52">
            <button type="button" onClick={() => swipe?.slidePrev()}
                className="-mr-14 mt-44 text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white
                 ring-2 outline-none ring-orange-300 
                 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
            </button>
            <button onClick={() => swipe?.slideNext()}
                className="-ml-14 mt-44 text-orange-500 border border-orange-500 hover:bg-orange-500
              hover:text-white ring-2 outline-none ring-orange-300  rounded-full 
                 p-2.5 text-center inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                </svg>
            </button>
        </div>
        <Swiper
            onBeforeInit={(swipper) => setSwipe(swipper)}
            breakpoints={{
                200: {
                    slidesPerView: 1.5,
                    slidesPerGroup: 1,
                },
                450: {
                    slidesPerView: 2.25,
                    slidesPerGroup: 2,
                },
                800: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                1200: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
            }}
            spaceBetween={15}
            loop={true}
            loopFillGroupWithBlank={true}
            modules={[Pagination, Navigation]}
            className={css.swiper2}
        >
            {
                data?.result?.items
                    .map((speciality, index) => (
                        <div key={index}>
                            <SwiperSlide key={speciality.url + index} >
                                <ArticleItem item={speciality} author={false} />
                            </SwiperSlide>
                        </div>
                    ))
            }

        </Swiper>

    </>
    )
}

export default CarouselSpecialities