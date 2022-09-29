import React, { useContext } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ThemeContext } from '../../DarkModeContext';
import CaroselArticles from '../CaroselArticles/CaroselArticles';
import css from './category.module.scss';

const Category = () => {
    const { darkMode } = useContext(ThemeContext);
    const { isLoading, error, data } = useQuery(['learn-category-home'], () =>
        fetch(`${process.env.api}/blog/category`).then(res => res.json()))
    if (error || isLoading || !data)
        return (<div className='container'></div>)

    return (
        <>
            {data.result.map((catogery, index) => (
                <div className={`${darkMode ? css.dark : ''} container ${css.catogery}`} key={`category-${index}`}>
                    <Link href={{
                        pathname: '/learn/category/[catogeryName]',
                        query: { catogeryName: catogery.slug },
                    }}
                    >
                        <a>
                            <h2 className=''>{catogery.title}</h2>
                        </a>
                    </Link>
                    <CaroselArticles filter={{type: catogery.id}} />
                </div>
            ))}
        </>
    )
}
export default Category;