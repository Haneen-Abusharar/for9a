import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import axios from 'axios';
import { ThemeContext } from '../../DarkModeContext';


const List = ({ articles }) => {
    const { darkMode } = useContext(ThemeContext);
    const [active, setActive] = useState(true);
    const loader = ({ src, width }) => {
        return `https://images.for9a.com/thumb/fit-${width}-${width}-100-webp/${src}`;
    }

    useEffect(() => {
        const isPinned = [];
        articles.map((item) => {
            isPinned[item.id] = item.is_pinned
        })
        setActive(isPinned)
    }, []);

    const handleClick = (title, url) => {
        if (navigator.share) {
            navigator
                .share({
                    title: title,
                    text: "Hello, please come visit my website",
                    url: url,
                })
                .then(() => {
                    console.log("Successfully shared");
                })
                .catch((error) => {
                    console.error("Something went wrong", error);
                });
        }
    };

    const addFavorite = (id) => {
        active[id] = 1
        setActive(active.slice());
        axios.put(`${process.env.api}/learn/favorite/${id}`, null,
            {
                headers:
                    { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
            }
        );
    }
    const deleteFavorite = (id) => {
        active[id] = 0
        setActive(active.slice());
        axios.delete(`${process.env.api}/learn/favorite/${id}`,
            { headers: { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' } }
        ).catch(error => {
            console.error('There was an error!', error);
        })
    }

    return (
        <>
            {articles.map((item, index) => (
                <div className={`list flex flex-row mb-5 mt-5 lg:w-full rounded-lg 
            border shadow-md md:mb-5 md:mt-0 md:flex-row  hover:transition ease-in-out
             ${darkMode ? 'border-zinc-700 bg-zinc-700 hover:bg-zinc-600' :
                        'bg-white hover:bg-gray-100'} `}
                    key={index}>
                    <div className={`flex-none xs:w-2/5 sm:w-1/5 md:w-2/5 md:h-1/5 lg:w-1/4`}>
                        {
                            item.images?.md && <Link
                                href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                                <a>
                                    <Image
                                        src={`${item.images.folder}/${item.images.name}`}
                                        loader={loader}
                                        className={`${darkMode ? 'hover:opacity-50 ease-in-out' : ''} object-cover rounded-r-lg`}
                                        width={10}
                                        height={10}
                                        alt={item.title} loading='lazy' placeholder='blurDataURL' layout='responsive' />
                                </a>
                            </Link>
                        }
                    </div>
                    <div className={`flex-none flex flex-col xs:w-3/5 sm:w-4/5 md:w-3/5 lg:w-3/4 ${darkMode ? 'bg-zinc-700 hover:bg-zinc-600 ' : ''} `}>
                        <Link
                            href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                            <a> <h3 className={`xs:line-clamp-2 lg:line-clamp-none text-ellipsis px-3 pt-3 text-base font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.title}</h3>
                            </a></Link>

                        <div className={`button font-normal flex justify-end  ml-3 mt-auto mb-1`}>
                            {
                                active[item.id] == 1 ?
                                    <button className={'heart'} onClick={() => { deleteFavorite(item.id) }} aria-label="?????? ???? ??????????????">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8 md:h-6 md:w-6'
                                            viewBox="0 0 24 24" width="20px" height="20px">
                                            <path fill="#eb751d" d="M12,21.35L10.55,20.03C5.4,15.36
                                2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                                5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                                ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                        </svg>
                                    </button>
                                    :
                                    <button className={'heart'} onClick={() => { addFavorite(item.id) }} aria-label="?????????? ??????????????">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8 md:h-6 md:w-6'
                                            viewBox="0 0 24 24" width="20px" height="20px">
                                            <path fill="#eb751d" d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                                    11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                                    6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                                    18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                                    3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                                    20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                        </svg>
                                    </button>
                            }
                            <button aria-label="??????" onClick={() =>
                                handleClick(item.title, item.url.replace("https://www.for9a.com/", `${process.env.domain}/`))}
                                className={'shareButton mr-1 '}>
                                <svg xmlns="http://www.w3.org/2000/svg" className=' h-7 w-7 md:h-5 md:w-5'
                                    width="18px" height="17px" viewBox="1 0 24 24">
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
                </div>
            ))}
        </>
    )
}
export default List;
