import React , {useContext} from'react'
import Link from 'next/link'
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeContext } from '../../DarkModeContext';
import CaroselArticles from '../CaroselArticles/CaroselArticles';
import css from './category.module.scss';
import fetcher from '../../utilities/fetcher';
import ArticleCardLoad from '../skeleton/articleCard';

const Category = ({ input }) => {
    const { darkMode } = useContext(ThemeContext);
    const { data, loading, error } = useSWR(`${process.env.api}/blog/category`, fetcher);

    
    if (error || loading || !data) return (<ArticleCardLoad/>)
    

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

                    <CaroselArticles input={input} filter={{
                        type: catogery.id
                    }} />

                </div>
            ))}
        </>
    )
}
export default Category;