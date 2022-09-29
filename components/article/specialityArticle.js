import React, { useState, useEffect, useRef, useContext } from 'react';
import LazyLoad from 'react-lazyload';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import { ThemeContext } from '../../DarkModeContext'
import 'react-loading-skeleton/dist/skeleton.css';
import css from './article.module.scss';
import CarouselSpecialities from '../specialities/specialities';
import CaroselArticles from '../CaroselArticles/CaroselArticles';
import TableOfContent from './TableOfContent';


const SpecialityArticle = (article) => {
    const thisArticle = article.article;
    const [scroll, setScroll] = useState(0);
    const [active, setActive] = useState(true);
    const { darkMode } = useContext(ThemeContext);
    const elementRef = useRef(null);

    const loader = ({ src, width, quality }) => {
        const height = Math.ceil(width / 2);
        return `https://images.for9a.com/thumb/fit-${width}-${height}-${quality}-webp/${src}`;
    }
   
    useEffect(() => {
        const articleHeight = elementRef.current.clientHeight - 1500;
        let progressBarHandler = () => {

            let currentScrollPosition = `${(document.documentElement.scrollTop / articleHeight) * 100}%`;
            if (currentScrollPosition > 100) currentScrollPosition = '100%';
            setScroll(currentScrollPosition);
        }
        window.addEventListener("scroll", progressBarHandler);
        return () => window.removeEventListener("scroll", progressBarHandler);
    });

        const handleClick = () => {
            if (navigator.share) {
                navigator
                    .share({
                        title: thisArticle.title,
                        text: "Hello, please come visit my website",
                        url: `${thisArticle.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`,
                    })
                    .then(() => {
                        console.log("Successfully shared");
                    })
                    .catch((error) => {
                        console.error("Something went wrong", error);
                    });
            }
        };
        const addFavorite = () => {
            axios.put(`${process.env.api}/learn/favorite/${thisArticle.id}`, null,
                {
                    headers:
                        { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
                }
            );

        }
        const deleteFavorite = () => {

            axios.delete(`${process.env.api}/learn/favorite/${thisArticle.id}`,
                {
                    headers:
                        { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
                }
            ).catch(error => {
                console.error('There was an error!', error);
            })
        }


        return (
            <>
                <div className={`progressBarContainer fixed h-1 w-full z-100 top-0`}>
                    <div className={`progressBar h-1 origin-top-right bg-gradient-to-r
                 to-white from-orange-500 `}
                        style={{ transform: `scale(${scroll}, 1)` }}
                    />
                </div>
                <article className={`${darkMode ? css.dark : ''} ${css.top} 
             md:mt-12 md:flex md:flex-col md:items-center md:justify-center`}
                    ref={elementRef} >
                    <div className={`image md:w-3/4 md:mt-3 `}>
                        {thisArticle.images?.folder &&
                            <Image src={`${thisArticle.images.folder}/${thisArticle.images.name}`}
                                loader={loader}
                                className={`rounded-none md:rounded-md object-cover `}
                                width={375}
                                height={188}
                                quality={90}
                                priority={true}
                                alt={thisArticle.title}
                                layout='responsive'
                            />}
                    </div>
                    <div className={`all mt-3 md:w-3/4 md:flex md:relative`}>
                        <div className={`sharing hidden md:flex flex-col items-center sticky h-full top-16 mt-4 mb-12`}>
                            <button onClick={handleClick} className={`shareButton mt-4 bg-transparent border-0 cursor-pointer`}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width={25} height={25} viewBox="1 0 24 24">
                                    <path fill="gray" d="M18,16.08C17.24,16.08 16.56,16.38 
                                16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 
                                8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 
                                0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,
                                9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,
                                14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,
                                21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
                                </svg>
                            </button>
                            <Link href={"https://www.twitter.com"}>
                                <a className='pt-1'>
                                    <Image src="https://www.ida2at.com/wp-content/themes/ida2at/assets/images/icons/twitter.svg"
                                        width="30px" height="30px" alt="twitter" /></a></Link>
                            <Link href={"https://www.facebook.com"}>
                                <a className='pt-1'>
                                    <Image src="https://www.ida2at.com/wp-content/themes/ida2at/assets/images/icons/facebook.svg"
                                        width="30px" height="30px" alt="facbook" /> </a></Link>
                            <div className={`button flex`}>
                                {thisArticle.is_pinned === 0 ?
                                    active === true ?
                                        <button className={'heart'} onClick={() => { setActive(false); addFavorite() }}
                                            aria-label="اضافة للمفضلة">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24" width={30} height={30}>
                                                <path fill="#e7731d " d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                                    11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                                    6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                                    18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                                    3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                                    20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                            </svg>
                                        </button>
                                        :
                                        <button className={'heart'} onClick={() => { setActive(true); deleteFavorite() }}
                                            aria-label="محي من المفضلة">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                width="30px" height="30px" >
                                                <path fill="#e7731d " d="M12,21.35L10.55,20.03C5.4,15.36
                                    2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                                    5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                                    ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                            </svg>
                                        </button>
                                    :
                                    active === true ?
                                        <button className={'heart'} onClick={() => { setActive(false); deleteFavorite() }}
                                            aria-label="محي من المفضلة">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                width="30px" height="30px" >
                                                <path fill="#e7731d " d="M12,21.35L10.55,20.03C5.4,15.36
                                    2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                                    5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                                    ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                            </svg>
                                        </button>
                                        :
                                        <button className={'heart'} onClick={() => { setActive(true); addFavorite() }}
                                            aria-label="اضافة للمفضلة">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24" width="30px" height="30px" >
                                                <path fill="#e7731d " d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                                        11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                                        6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                                        18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                                        3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                                            20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                            </svg>
                                        </button>
                                }
                            </div>
                        </div>
                        <div className={` container article text-base leading-8`}>
                            <div className={`breadcrumb flex -mb-2.5`}>
                                <Link href={"/specialities"}><a className=' text-gray-500 no-underline hover:text-sky-700'>
                                    <h5 className='text-sm ml-2.5 mb-0 '> دليل التخصصات / </h5>
                                </a></Link>
                                {thisArticle.categories.map((category, i) =>
                                    <div className='flex' key={i}>
                                        <Link
                                            href={`${category.url.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                                            <a className='text-sm ml-2.5 mb-0 no-underline text-gray-500'
                                                href={`${category.url.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}
                                            >
                                                <h5 className='ml-2  hover:text-sky-700'>{category.title} </h5>
                                            </a>
                                        </Link>
                                    </div>
                                )}

                            </div>
                            <h1 className='text-2xl leading-8 my-4 text-orange-600 font-bold md:mt-3 md:text-3xl md:leading-9'>
                                {thisArticle.title || <Skeleton height={10} count={2} />}</h1>
                            <div className={`mobileSharing md:hidden flex items-center text-sm mx-0 my-4`}>
                                <div className={` share  whitespace-nowrap flex rounded-2xl py-1 px-4 
                            ${darkMode ? 'bg-zinc-600 ' : 'bg-slate-100'}`}>
                                    <button onClick={handleClick} className={`shareButton ml-1`}
                                        aria-label="مشاركة">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="14px" height="14px" viewBox="1 0 24 24">
                                            <path fill="gray" d="M18,16.08C17.24,16.08 16.56,16.38 
                                    16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 
                                    8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 
                                    0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,
                                    9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,
                                    14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,
                                    21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
                                        </svg>
                                    </button>
                                    <h4 className='white-space: nowrap;'>شاركها مع أصدقائك</h4>
                                </div>
                                <div className={`mobileHeart mr-4 flex rounded-2xl py-1 px-4 ${darkMode ? 'bg-zinc-600 ' : 'bg-slate-100'}`}>
                                    {thisArticle.is_pinned === 0 ?
                                        active === true ?
                                            <button className={'heart'} onClick={() => { setActive(false); addFavorite() }}
                                                aria-label="اضافة للمفضلة">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24" width="14px" height="14px">
                                                    <path fill="#e7731d" d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                                    11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                                    6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                                    18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                                    3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                                    20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                                </svg>
                                            </button>
                                            :
                                            <button className={'heart'} onClick={() => { setActive(true); deleteFavorite() }}
                                                aria-label="محي من المفضلة">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                    width="14px" height="14px">
                                                    <path fill="#e7731d" d="M12,21.35L10.55,20.03C5.4,15.36
                                    2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                                    5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                                    ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                                </svg>
                                            </button>
                                        :
                                        active === true ?
                                            <button className={'heart'} onClick={() => { setActive(false); deleteFavorite() }}
                                                aria-label="محي من المفضلة">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                    width="14px" height="14px">
                                                    <path fill="#e7731d" d="M12,21.35L10.55,20.03C5.4,15.36
                                    2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                                    5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                                    ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                                </svg>
                                            </button>
                                            :
                                            <button className={'heart'} onClick={() => { setActive(true); addFavorite() }}
                                                aria-label="اضافة للمفضلة">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24" width="14px" height="14px">
                                                    <path fill="#e7731d" d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                                        11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                                        6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                                        18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                                        3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                                            20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                                </svg>

                                            </button>
                                    }
                                    <h4 className='mr-1 white-space: nowrap;'> حفظ للمفضلة</h4>
                                </div>
                            </div>
                            {thisArticle.sections.map((section, i) =>
                                <div key={i}>
                                    <h2 id={`g${section.id}`}>{section.header}</h2>
                                    <div className={css.content} dangerouslySetInnerHTML={{ __html: section.body || <Skeleton count={100} /> }} />
                                </div>
                            )}
                        </div>
                        <TableOfContent thisArticle={thisArticle}/>
                    </div>
                    <div className={`${css.carosel} m-auto py-0 px-4 md:w-3/4`}>
                        <div className={`${css.related} mt-16 mx-0`}>
                            <h4 className='text-base mr-1 mb-1 md:text-lg'>مقالات قد تعجبك </h4>
                            <LazyLoad height={400} offset={100}>
                                <CaroselArticles />
                            </LazyLoad>
                        </div>
                        <div className={`${css.related}  mx-0`}>
                            <h4 className='text-base mr-1 mb-1 md:text-lg'>تخصصات قد تهمك</h4>
                            <LazyLoad height={400} offset={100}>
                                <CarouselSpecialities
                                    filter={{ type: thisArticle.categories.map((category) => category.id) }} />
                            </LazyLoad>
                        </div>
                    </div>
                </article>
            </>
        )
    }

    export default SpecialityArticle