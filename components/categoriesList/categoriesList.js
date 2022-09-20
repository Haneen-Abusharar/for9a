import React, { useContext } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { ThemeContext } from '../../DarkModeContext';
import css from './categoriesList.module.scss'



const CatogriesList = ({ }) => {
    const { darkMode } = useContext(ThemeContext);
    const { isLoading, error, data } = useQuery(['learn-category-home'], () =>
        fetch(`${process.env.api}/blog/category`).then(res => res.json()))
    if (error || isLoading || !data)
        return (<div className='container'></div>)

    const InlineWrapperWithMargin = ({ children }) => {
        return <div
            style={{
                display: 'inline',
                padding: '.6rem',
            }}
        >
            {children}
        </div>
    }

    if (!data || isLoading || error)
        return (<>
            <div className='hidden md:block'>
                <Skeleton
                    count={4}
                    wrapper={InlineWrapperWithMargin}
                    inline
                    height={36}
                    width={100}
                />
            </div>
            <div className=' md:hidden  '>
                <Skeleton
                    count={3}
                    wrapper={InlineWrapperWithMargin}
                    inline
                    height={25}
                    width={110}
                />
            </div>
        </>
        )


    return (
        <div className={`${darkMode ? css.dark : ''} ${css.div}`}>
            <Swiper
                breakpoints={{
                    200: {
                        slidesPerView: 2.5,
                        spaceBetween: 0,
                        slidesPerGroup: 2,

                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                        slidesPerGroup: 2,

                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                        slidesPerGroup: 2,

                    },
                }}
                navigation={true}
                loop={true}
                loopFillGroupWithBlank={true}
                modules={[Navigation, Pagination]}
                className={css.swiper}
            >
                {
                    data.result.map((category) => (
                        <div key={category.id} >
                            <SwiperSlide key={category.id}>
                                <Link
                                    href={{
                                        pathname: '/learn/category/[catogeryName]',
                                        query: { catogeryName: category.slug },
                                    }}><a className={css.link}> {category.title || <Skeleton />}</a>
                                </Link>
                            </SwiperSlide>
                        </div>
                    ))
                }
            </Swiper >


        </div >
    )
}


export default CatogriesList;