import React, { useContext } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ThemeContext } from '../../DarkModeContext';
import css from './categoriesList.module.scss'
import fetcher from '../../utilities/fetcher';
// const fetcher = (...args) => fetch(...args).then((res) => res.json())

const CatogriesList = ({ }) => {
    const { darkMode } = useContext(ThemeContext);
    const { data, loading, error } = useSWR("https://api.for9a.com/blog/category", fetcher);

    const InlineWrapperWithMargin = ({ children }) => {
        return <span style={{ margin: '1rem' }}>{children}</span>
    }
    if (error) return <div>failed to load</div>
    if (loading) return (<Skeleton
        count={5}
        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
    />)
    if (!data) return (<Skeleton
        count={5}
        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
    />
    )

    return (
        <div className={`${darkMode ? css.dark : ''} ${css.div}`}>
            <Swiper
                breakpoints={{
                    400: {
                        slidesPerView: 2.5,
                        spaceBetween: 0,
                        slidesPerGroup: 3,
                        navigation: false
                    },
                    768: {
                        slidesPerView: 4,

                        spaceBetween: 0,
                        slidesPerGroup: 1,
                        navigation: true
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                        slidesPerGroup: 1,
                        navigation: true
                    },
                }}
                navigation={true}
                loop={true}
                loopFillGroupWithBlank={true}
                slidesPerView={3}
                pagination={{ clickable: true }}
                modules={[Navigation]}
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