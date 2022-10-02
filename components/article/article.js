import React, { useState, useEffect, useRef, useContext } from 'react';
import LazyLoad from 'react-lazyload';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import { ThemeContext } from '../../DarkModeContext';
import 'react-loading-skeleton/dist/skeleton.css';
import css from './article.module.scss';
import CaroselArticles from '../CaroselArticles/CaroselArticles';
import StarRating from '../Rating/rating';
import Comments from '../comments/comments';

const Article = ({ item }) => {

    const [scroll, setScroll] = useState(0);
    const [active, setActive] = useState(true);
    const { darkMode } = useContext(ThemeContext);
    const elementRef = useRef(null);
    const audioRef = useRef(null);
    const date = new Date(item.published_at).toLocaleDateString('ar-EG', { month: "long" });
    const loader = ({ src, width, quality }) => {
        const height = Math.ceil(width / 2);
        return `https://images.for9a.com/thumb/fit-${width}-${height}-${quality}-webp/${src}`;
    }

    useEffect(() => {
        const audio = new Audio();
        audioRef = audio;
        audio.addEventListener('playing', () => {
            audio.play()
        });
        audio.addEventListener('canplay', () => {
            audio.play()
        });
        audio.addEventListener('ended', (e) => {
            audio.src = '';
            const elements = document.getElementsByClassName("isplay")
            Array.from(elements).map(element => {
                element.classList.remove("isplay")
            })
        });
        return () => {
            audio.removeEventListener('ended', () => setIsPlaying(false));
        };
    }, [])

    function playAudio(e) {
        e.preventDefault();
        const audioUrl = this.getAttribute("href");

        if (audioRef.src != audioUrl) {
            this.classList.add("isplay")
            audioRef.src = audioUrl;
        }
        else if (audioRef.currentTime > 0 && audioRef.paused && !audioRef.ended) {
            this.classList.add("isplay")
            audioRef.play();
        }
        else {
            this.classList.remove("isplay")
            audioRef.pause();
        }
    }

    useEffect(() => {
        const elements = document.getElementsByClassName("player")
        Array.from(elements).map(element => element.addEventListener("click", playAudio, false))
    }, [])

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
                    title: item.title,
                    text: "Hello, please come visit my website",
                    url: `${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`,
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
        axios.put(`${process.env.api}/learn/favorite/${item.id}`, null,
            {
                headers:
                    { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
            }
        );

    }
    const deleteFavorite = () => {

        axios.delete(`${process.env.api}/learn/favorite/${item.id}`,
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
                <div className={`progressBar h-1 origin-top-right bg-gradient-to-r to-white from-orange-500 `}
                    style={{ transform: `scale(${scroll}, 1)` }}
                />
            </div>
            <article className={`${darkMode ? css.dark : ''} ${css.top}  md:mt-12 md:flex md:flex-col md:items-center md:justify-center`} ref={elementRef} >
                <div className={`image md:w-3/4 md:mt-3 `}>
                    {item.images?.folder &&
                        <Image src={`${item.images.folder}/${item.images.name}`}
                            loader={loader}
                            className={`rounded-none md:rounded-md object-cover `}
                            width={375}
                            height={188}
                            quality={90}
                            priority={true}
                            alt={item.title}
                            // sizes="(min-width: 250px) calc(calc(100vw - 72px) / 3),
                            // (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw"
                            layout='responsive'
                        />}
                </div>
                <div className={`Section  m-auto py-0 md:pr-8 mb-6 md:w-3/4  `}>
                    <div className=' container flex items-center justify-between'>
                        <div className={`author md:w-full -mt-4 flex items-center  md:-mt-5`}>
                            <Image className={`pic object-cover rounded-full`}
                                src={"https://images.for9a.com/thumb/fit-90-90-100-webp/user/268-nadine-burzler-fsxq3xu72bs-unsplash.jpg"}
                                width={90} height={90} alt="profile picture" />
                            <div className={`${css.authName} mt-5 mr-3  w-32 whitespace-nowrap`}>
                                <h5 className='text-base'> أ.أيمن العتوم</h5>
                                <h6 className='mt-0.5 text-xs text-gray-500 '> نشرت في {date}
                                </h6>
                            </div>
                        </div>
                        <div className={`namePublished flex flex-col mt-3 text-gray-500 md:flex-row md:items-start md:justify-end md:w-full md:-mt-3`}>
                            <div className={`time flex items-center text-xs mb-1`}>
                                <svg className={'icon'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="14px" width="14px">
                                    <path fill="#929090" d="M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14M17,12A5,5 0 0,0 12,17A5
                            ,5 0 0,0 17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12M17,10A7,7 0 0,1 24,17A7,7 0 0,1 17,24C14.21,24 11.8,22.36
                             10.67,20H1V17C1,14.34 6.33,13 9,13C9.6,13 10.34,13.07 11.12,13.2C12.36,11.28 14.53,10 17,10M10,17
                            C10,16.3 10.1,15.62 10.29,15C9.87,14.93 9.43,14.9 9,14.9C6.03,14.9 2.9,16.36 2.9,17V18.1H10.09C10.03,
                            17.74 10,17.37 10,17M9,4A4,4 0 0,1 13,8A4,4 0 0,1 9,12A4,4 0 0,1 5,8A4,4 0 0,1 9,4M9,5.9A2.1,2.1 0 0,
                            0 6.9,8A2.1,2.1 0 0,0 9,10.1A2.1,2.1 0 0,0 11.1,8A2.1,2.1 0 0,0 9,5.9Z" />
                                </svg>
                                <h6 className='mr-1'>
                                    {item.est_time} دقيقة
                                </h6>
                            </div>
                            <div className={`rate text-gray-500 flex items-center text-xs mb-1 md:mr-4`}>
                                <svg width="13px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  >
                                    <path fill="#666666" d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 
                            8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069
                             3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z"/>
                                </svg>
                                <h6 className='mr-1'>{item.rating.average_rating}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`all md:w-3/4 md:flex md:relative`}>
                    <div className={`sharing hidden md:flex flex-col items-center sticky h-full top-16 mt-4 mb-12`}>
                        <div className={`interactions my-2 mx-0 border-gray-500 border-2 p-1 text-base rounded`}>
                            <h5 className='m-0'>{item.rating.count} تفاعل </h5>
                        </div>
                        <button onClick={handleClick} className={`shareButton bg-transparent border-0 cursor-pointer`}>
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
                            {item.is_pinned === 0 ?
                                active === true ?
                                    <button className={'heart'} onClick={() => { setActive(false); addFavorite() }} aria-label="اضافة للمفضلة">
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
                                    <button className={'heart'} onClick={() => { setActive(true); deleteFavorite() }} aria-label="محي من المفضلة">
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
                            <Link href={"/learn"}><a className=' text-gray-500 no-underline hover:text-sky-700'>
                                <h5 className='text-sm ml-2.5 mb-0 '> تعلم / </h5></a></Link>
                            <Link
                                href={`${item.category.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                                <a className='text-sm ml-2.5 mb-0 no-underline text-gray-500 hover:text-sky-700'
                                    href={`${item.category.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                                    <h5>{item.category.title}</h5></a>
                            </Link>
                        </div>
                        <h1 className='text-2xl leading-8 my-4 text-orange-600 font-bold md:mt-3 md:text-3xl md:leading-9'>
                            {item.title || <Skeleton height={10} count={2} />}</h1>
                        <div className={`mobileSharing md:hidden flex items-center text-sm mx-0 my-4`}>
                            <div className={` share  whitespace-nowrap flex rounded-2xl py-1 px-4 
                            ${darkMode ? 'bg-zinc-600 ' : 'bg-slate-100'}`}>
                                <button onClick={handleClick} className={`shareButton ml-1`} aria-label="مشاركة">
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
                            <div className={`mobileHeart mr-4 flex rounded-2xl py-1 px-4 
                            ${darkMode ? 'bg-zinc-600 ' : 'bg-slate-100'}`}>
                                {item.is_pinned === 0 ?
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
                                        <button className={'heart'} onClick={() => { setActive(true); deleteFavorite() }} aria-label="محي من المفضلة">
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
                        <div className={css.content} dangerouslySetInnerHTML={{ __html: item.body || <Skeleton count={100} /> }} />
                        <StarRating item={item} id={item.id} />
                    </div>
                </div>
                <div className={`${css.carosel} m-auto mb-5 py-0 px-4 md:w-3/4`}>
                    <div className={`${css.related} my-2.5 mx-0`}>
                        <h4 className='text-base mr-1 md:text-lg'>مقالات مشابهة</h4>
                    </div>
                    <LazyLoad height={200} offset={100}>
                        <CaroselArticles input={item} filter={{
                            type: item.category.id
                        }} />
                    </LazyLoad>
                </div>
            </article>
            <LazyLoad height={300} >
                <Comments id={item.id} />
            </LazyLoad>
        </>
    )
}

export default Article;