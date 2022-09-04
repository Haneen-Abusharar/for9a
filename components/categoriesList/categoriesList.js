import React, { useContext } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { ThemeContext } from '../../DarkModeContext';
import css from './categoriesList.module.scss'
import fetcher from '../../utilities/fetcher';


const CatogriesList = ({ }) => {
    const { darkMode } = useContext(ThemeContext);
    const { data, loading, error } = useSWR(`${process.env.api}/blog/category`, fetcher);

    const InlineWrapperWithMargin = ({ children }) => {
        return <div
            style={{
                display: 'inline',
                lineHeight: 2,
                padding: '.5rem',
               

            }}
        >
            {children}
        </div>
    }

    if (!data || loading || error)
        return (<>
        <div className='mb-14 mt-6 hidden md:block'>
            <Skeleton
                count={4}
                wrapper={InlineWrapperWithMargin}
                inline
                height={30}
                width={100}
            />
            </div>
            <div className=' md:hidden mb-10 mt-6 '>
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
                    400: {
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