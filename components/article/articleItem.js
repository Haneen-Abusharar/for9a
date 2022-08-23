import React, { useContext, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import { ThemeContext } from '../../DarkModeContext';
import 'react-loading-skeleton/dist/skeleton.css'
import css from './articleImage.module.scss'
import Link from 'next/link'


const ArticleItem = ({ item, showDesc }) => {
    const { darkMode } = useContext(ThemeContext);
    const [active, setActive] = useState(true);
    const unixTime = item.published_at;
    const date = new Date(unixTime * 1000);

    const InlineWrapperWithMargin = ({ children }) => {
        return <span style={{ margin: '1rem' }}>{children}</span>
    }

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
        setActive(false);
        axios.put(`${process.env.api}/learn/favorite/${item.id}`, null,
            {
                headers:
                    { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
            }
        );
    }
    const deleteFavorite = () => {
        setActive(true);
        axios.delete(`${process.env.api}/learn/favorite/${item.id}`,
            {
                headers:
                    { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
            }
        ).catch(error => {
            console.error('There was an error!', error);
        })
    }
    const addFavorite2 = () => {
        setActive(true);
        axios.put(`${process.env.api}/learn/favorite/${item.id}`, null,
            {
                headers:
                    { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
            }
        ).catch(error => {
            console.error('There was an error!', error);
        });
    }
    const deleteFavorite2 = () => {
        setActive(false);
        axios.delete(`${process.env.api}/learn/favorite/${item.id}`,
            {
                headers:
                    { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
            }
        ).catch(error => {
            console.error('There was an error!', error);
        })
    }


    if (!item) return (<Skeleton
        count={5}
        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
        hight={500}
    />)


    return (

        <div className={`${darkMode ? css.dark : ''} ${css.articleCard} 
       flex flex-col max-w-sm h-full mx-1 mb-5 bg-white rounded-lg border border-gray-200 shadow-md  md:mb-0 hover:bg-gray-100 hover:transition ease-in-out`}>

            {item.images?.md &&
                <Link
                    href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                    <a> <Image className={`${css.move} rounded-t-lg`} src={item.images.md}
                        width="100px" height="50px"
                        alt={item.title} loading='lazy' placeholder='blurDataURL' layout='responsive' /></a>
                </Link>}

            <div className={`flex flex-row m-2 ${css.categories}`}>
                {item.categories.map((l, i) => (
                    <div className={`${css.category}  truncate`} key={i}>
                        <Link
                            href={`${l.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                            <a className='m-0'>
                                <h4 className=' border border-gray-300 bg-gray-100  ml-2 rounded-xl truncate p-1 text-sm hover:bg-gray-200 transition ease-in-out'>
                                    {l.title}
                                </h4>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>

            <Link
                href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                <a>
                    <h3 className="mx-2 mb-2 text-base font-bold tracking-tight text-gray-800  md:text-lg ">{item.title}</h3>
                </a>
            </Link>
            <Link
                href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                <a>
                    {showDesc && <p className=" m-2 mb-3 font-normal text-base text-gray-700 dark:text-gray-400">{item.short_description}</p>}
                </a>
            </Link>
            <div className={`${css.cardFooter} flex flex-row items-center mt-auto mb-1` }>
                <div className={`${css.imageFooter} mr-2 `}>
                    <Image src={`/h.jpg`} width={40} height={40} className="rounded-full" alt='auther picture' />
                </div>
                <div className={`${css.Author} flex-auto mr-2 text-sm `}>
                    <h5 className='whitespace-nowrap inline'>الكاتب</h5>
                    <h6 className='whitespace-nowrap m--1'>{date.toLocaleDateString("en-US")}</h6>
                </div>
                <div className={`${css.button} flex flex-row ml-2`}>
                    {item.is_pinned === 0 ?

                        active === true ?
                            <button className={`${css.heart}`} onClick={addFavorite}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px"
                                    viewBox="0 0 24 24" >
                                    <path fill="#eb751d" d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                         11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                          6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                          18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                          3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                           20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                </svg>
                            </button>
                            :
                            <button className={`${css.heart}`}  onClick={deleteFavorite}>
                                <svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#eb751d" d="M12,21.35L10.55,20.03C5.4,15.36
                             2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                             5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                             ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                </svg>
                            </button>

                        :
                        active === true ?
                            <button className={`${css.heart}`}  onClick={deleteFavorite2}>
                                <svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#eb751d" d="M12,21.35L10.55,20.03C5.4,15.36
                           2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                           5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                           ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                </svg>
                            </button>
                            :
                            <button className={`${css.heart}`}  onClick={addFavorite2}>
                                <svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path fill="#eb751d" d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                       11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                        6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                        18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                        3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                         20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                </svg>

                            </button>
                    }


                    <button id='btn' onClick={handleClick} className={`${css.shareButton}`}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            height="17px" width="18px" viewBox="1 0 24 24">
                            <path fill="gray" d="M18,16.08C17.24,16.08 16.56,16.38 
                   16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 
                   8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 
                   0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,
                   9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,
                   14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,
                   21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />

                        </svg>
                    </button>

                    <p className="result"></p>
                </div>
            </div>
        </div >
    )
}

export default ArticleItem;