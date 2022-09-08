import React, { useContext, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import { ThemeContext } from '../../DarkModeContext';
import Link from 'next/link'


const ArticleItem = ({ item, showDesc }) => {
    const { darkMode } = useContext(ThemeContext);
    const [active, setActive] = useState(true);
    const unixTime = item.published_at;
    const date = new Date(unixTime * 1000);
    const loader = ({ src, width, quality }) => {
        const height = Math.ceil(width / 2);
        return `https://images.for9a.com/thumb/fit-${width}-${height}-${quality}-webp/${src}`;
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

        <div className={` articleCard flex flex-col  h-full mb-5 bg-white rounded-lg border border-gray-200 shadow-md 
        md:mb-0 hover:bg-gray-100 hover:transition ease-in-out ${darkMode ? 'bg-zinc-700 hover:bg-zinc-600  border-none ' : ''}`}>

            {item.images?.md &&
                <Link
                    href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                    <a>

                        <Image src={`${item.images.folder}/${item.images.name}`}
                            loader={loader}
                            quality={80}
                            className={`move rounded-t-lg object-cover ${darkMode ? ' hover:opacity-50 ease-in-out  ' : ''} `}
                            width="200px" height="130px"
                            alt={item.title} loading='lazy' placeholder='blurDataURL' layout='responsive' />
                    </a>
                </Link>}
               
            <div className={`categories flex flex-row m-2 `}>
                {item.categories.map((l, i) => (
                    <div className={`category truncate`} key={i}>
                        <Link
                            href={`${l.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                            <a className={`m-0 !no-underline ${darkMode ? ' !text-white ' : '!text-zinc-600'} `}>
                                <h4 className={` text-xs  border  
                                  ml-3 rounded-xl truncate p-1 md:text-sm transition ease-in-out 
                                  ${darkMode ? ' !text-white bg-zinc-600  hover:bg-zinc-500 ' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}>
                                    {l.title}
                                </h4>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>

            <Link
                href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                <a className='no-underline'>
                    <h3 className={` mx-2 mb-2 text-base font-bold tracking-tight  md:text-lg
                     ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.title}</h3>
                </a>
            </Link>
            <Link
                href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}>
                <a>
                    {showDesc && <p className={`line-clamp-3 m-2 mb-3 font-normal text-base  ${darkMode ?"text-gray-400": "text-gray-500" }`}>{item.short_description}</p>}
                </a>
            </Link>
            <div className={`cardFooter flex flex-row items-center mt-auto mb-1`}>
                <div className={`imageFooter mr-2 `}>
                    <Image src={`/h.jpg`} width={"40px"} height={"40px"} className="rounded-full" alt='auther picture' />
                </div>
                <div className={`Author flex-auto mr-2 text-sm `}>
                    <h5 className=' whitespace-nowrap inline'>الكاتب</h5>
                    <h6 className='text-xs whitespace-nowrap m--1'>{date.toLocaleDateString("en-US")}</h6>
                </div>
                <div className={`button flex flex-row ml-2`}>
                    {item.is_pinned === 0 ?
                        active === true ?
                            <button className={`heart`} onClick={()=>{setActive(false); addFavorite()}} aria-label="اضافة للمفضلة">
                                <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8 md:h-6 md:w-6'
                                    height="25px" width="25px" viewBox="0 0 24 24" >
                                    <path fill="#eb751d" d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                         11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                          6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                          18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                          3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                           20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                </svg>
                            </button>
                            :
                            <button className={`heart`} onClick={()=>{ setActive(true); deleteFavorite()}} aria-label="محي من المفضلة">
                                <svg height="25px" width="25px" className='h-8 w-8 md:h-6 md:w-6'
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#eb751d" d="M12,21.35L10.55,20.03C5.4,15.36
                             2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                             5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                             ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                </svg>
                            </button>

                        :
                        active === true ?
                        
                            <button className={`heart`} onClick={() => { setActive(false); deleteFavorite(); }}
                                aria-label="محي من المفضلة">
                                <svg height="25px" width="25px" className='h-8 w-8 md:h-6 md:w-6'
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#eb751d" d="M12,21.35L10.55,20.03C5.4,15.36
                           2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,
                           5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22
                           ,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                </svg>
                            </button>
                            :
                            <button className={`heart `} onClick={() => { setActive(true); addFavorite() }}
                                aria-label="اضافة للمفضلة">
                                <svg height="25px" width="25px" className='h-8 w-8 md:h-6 md:w-6'
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#eb751d" d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4
                       11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46
                        6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 
                        18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 
                        3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45
                         20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                                </svg>

                            </button>
                    }


                    <button  onClick={handleClick} className={`shareButton mr-2 ml-1 `} aria-label="نشر">
                        <svg xmlns="http://www.w3.org/2000/svg" className=' h-7 w-7 md:h-5 md:w-5'
                            height="20px" width="20px" viewBox="1 0 24 24">
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