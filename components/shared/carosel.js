import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import css from "../category/category.module.scss";


const Carousel = (Component) => {
    const [swipe, setSwipe] = useState();

    return (
        <>
            <div className="xs:hidden sm:hidden  md:flex justify-between -mb-52">
                <button type="button" onClick={() => swipe?.slidePrev()}
                    className="-mr-14 mt-44 text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white
           ring-4 outline-none ring-orange-300 
           font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 15 15">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 
            .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                </button>
                <button onClick={() => swipe?.slideNext()}
                    className="-ml-14 mt-44 text-orange-500 border border-orange-500 hover:bg-orange-500
          hover:text-white ring-4 outline-none ring-orange-300  rounded-full 
          p-2.5 text-center inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 15 15">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 
            .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
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
                    1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                }}
                spaceBetween={10}
                loop={true}
                loopFillGroupWithBlank={true}
                modules={[Pagination, Navigation]}
                className={css.swiper2}
            >
                <Component />

            </Swiper >
        </>
    )

}
export default Carousel;


// {
//     data?.result?.items
//       .map((article, index) => (
//         <div key={index}>
//           <SwiperSlide key={article.url + index} >
//             <ArticleItem item={article} />
//           </SwiperSlide>
//         </div>
//       ))
//   }