import React, { useContext } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import css from './list.module.scss'
import { ThemeContext } from '../../DarkModeContext';

const List = ({ articles }) => {
    const { darkMode } = useContext(ThemeContext);
    return (
        articles.map((item, index) => (
            <div className={`${darkMode ? css.dark : ''} ${css.list}`} key={index}>
                <div className={css.image}> {
                    item.images?.md && <Link
                        href={`${item.url?.replace("https://www.for9a.com/", "http://localhost:3000/")}`}>
                        <a><Image src={item.images.md}
                            width="80px" height="90px"
                            alt={item.title} loading='lazy' placeholder='blurDataURL' layout='fixed' /></a>
                    </Link>
                }
                    <Link
                        href={`${item.url?.replace("https://www.for9a.com/", "http://localhost:3000/")}`}>
                        <a> <h4>{item.title}</h4></a></Link>
                </div>
            </div>
        )
        )
    )
}
export default List;
