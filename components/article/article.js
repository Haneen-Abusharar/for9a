import React, { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import { ThemeContext } from '../../DarkModeContext';
import 'react-loading-skeleton/dist/skeleton.css';
import css from './article.module.scss';
import CaroselArticles from '../CaroselArticles/CaroselArticles';
import StarRating from '../Rating/rating';
import Comments from '../comments/comments';

const Article = ({ item, filter }) => {

    const [scroll, setScroll] = useState(0);
    const { darkMode } = useContext(ThemeContext);
    const elementRef = useRef(null);
    const date = new Date(item.published_at * 1000);


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
                    url: `${item.url?.replace("https://www.for9a.com/", "http://localhost:3000/")}`,
                })
                .then(() => {
                    console.log("Successfully shared");
                })
                .catch((error) => {
                    console.error("Something went wrong", error);
                });
        }
    };


    return (<>

        <div className={css.progressBarContainer}>
            <div className={css.progressBar} style={{
                transform: `scale(${scroll}, 1)`
                //, opacity: `${scroll}` 
            }} />

        </div>

        <article className={`${darkMode ? css.dark : ''} ${css.top}`} ref={elementRef} >
            <div className={css.ads}>
                <Image src="/ads.png" className={css.adpic} height="157" width="556px" />
            </div>

            <div className={css.image}>
                <div className={css.breadcrumb}>
                    <Link href={"/learn"}><a><h5> تعلم / </h5></a></Link>
                    <Link
                        href={`${item.category.url?.replace("https://www.for9a.com/", "http://localhost:3000/")}`}>
                        <a href={`${item.category.url?.replace("https://www.for9a.com/", "http://localhost:3000/")}`}><h5>{item.category.title}</h5></a>
                    </Link>

                </div>
                {item.images?.md && <Image className={css.move} src={item.images.md}
                    width={90} height={50}
                    alt={item.title} placeholder='blurDataURL' layout='responsive' />}
            </div>
            <div className={css.all}>
                <div className={css.sharing}>
                    <div className={css.interactions}>
                        <h5>{item.rating.count} تفاعل </h5>
                    </div>
                    <button id='btn' onClick={handleClick} className={css.shareButton}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width={25} hight={20} viewBox="1 0 24 24">
                            <path fill="gray" d="M18,16.08C17.24,16.08 16.56,16.38 
                   16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 
                   8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 
                   0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,
                   9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,
                   14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,
                   21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />

                        </svg>
                    </button>
                    <Link href={""}><a><Image src="https://www.ida2at.com/wp-content/themes/ida2at/assets/images/icons/twitter.svg" width={30} height={30} /></a></Link>
                    <Link href={""}><a><Image src="https://www.ida2at.com/wp-content/themes/ida2at/assets/images/icons/facebook.svg" width={30} height={30} /> </a></Link>
                    <Link href={""}><a><Image src="https://www.ida2at.com/wp-content/themes/ida2at/assets/images/icons/permalink.svg" width={30} height={30} /></a></Link>
                </div>
                <div className={` container ${css.article}`}>

                    <h1>{item.title || <Skeleton />}</h1>
                    <div className={css.mobileSharing}>
                        <button id='btn' onClick={handleClick} className={css.shareButton}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width={25} hight={20} viewBox="1 0 24 24">
                                <path fill="gray" d="M18,16.08C17.24,16.08 16.56,16.38 
                   16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 
                   8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 
                   0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,
                   9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,
                   14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,
                   21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />

                            </svg>
                        </button>
                    </div>
                    <div className={css.Section}>
                        <div className={css.author}>
                            <h6>الكاتب</h6>
                            <div className={css.authPub}>
                                <Image className={css.pic}
                                    src={"https://images.unsplash.com/photo-1552080084-f86b99bd1d29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                                    width={40} height={40} />
                                <h6> أ.أيمن العتوم</h6>

                            </div>
                        </div>
                        <div className={css.publish}>
                            <h6>تاريخ النشر</h6>
                            <h6>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} >
                                    <path fill="gray" d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" />
                                </svg>
                                {date.toLocaleDateString("en-US")}

                            </h6>
                        </div>
                        <div className={css.time}>
                            <h6>مدة القراءة</h6>
                            <h6><svg className={css.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={20} width={20}>
                                <path fill="gray" d="M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14M17,12A5,5 0 0,0 12,17A5
                            ,5 0 0,0 17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12M17,10A7,7 0 0,1 24,17A7,7 0 0,1 17,24C14.21,24 11.8,22.36
                             10.67,20H1V17C1,14.34 6.33,13 9,13C9.6,13 10.34,13.07 11.12,13.2C12.36,11.28 14.53,10 17,10M10,17
                            C10,16.3 10.1,15.62 10.29,15C9.87,14.93 9.43,14.9 9,14.9C6.03,14.9 2.9,16.36 2.9,17V18.1H10.09C10.03,
                            17.74 10,17.37 10,17M9,4A4,4 0 0,1 13,8A4,4 0 0,1 9,12A4,4 0 0,1 5,8A4,4 0 0,1 9,4M9,5.9A2.1,2.1 0 0,
                            0 6.9,8A2.1,2.1 0 0,0 9,10.1A2.1,2.1 0 0,0 11.1,8A2.1,2.1 0 0,0 9,5.9Z" />
                            </svg>

                                {item.est_time} دقيقة
                            </h6>
                        </div>
                        <div className={css.rate}>
                            <h6>التقييم</h6>
                            <h6><span className="fa fa-star checked" ></span>
                                {item.rating.average_rating}
                            </h6>
                        </div>

                    </div>

                    <div className={css.content} dangerouslySetInnerHTML={{ __html: item.body || <Skeleton count={100} /> }} />

                    <StarRating id={item.id} />
                   

                </div>
            </div>
            <div className={css.carosel}>
            <div className={css.related}>
                        <h4>مقالات مشابهة</h4>
                    </div>
            <CaroselArticles input={item} filter={{
                type: item.category.id
            }} />
        </div>
        </article>
       


        <Comments />
    </>
    )
}

export default Article;