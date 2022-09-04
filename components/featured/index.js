import React, { useContext } from 'react'
import useSWR from 'swr';
import { ThemeContext } from '../../DarkModeContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ArticleItem from '../article/articleItem';
import List from '../article/list';
import fetcher from '../../utilities/fetcher';
import css from './featured.module.scss'
import ArticleCardLoad from '../skeleton/articleCard';
import ListLoading from '../skeleton/listLoading';


const Featured = () => {

    const { darkMode } = useContext(ThemeContext);
    const { data, loading, error } = useSWR(`${process.env.api}/learn/all`, fetcher);

       if (!data || loading || error)
    return (
        <div className=
            // 'md:grid grid-cols-2 gap-4 md:mb-7  container'
            'container flex flex-col md:flex-row '
        >
            <div className='w-full mb-2 ml-2 h-full'><ArticleCardLoad /></div >
            <div className='w-full  '><ListLoading /></div>
        </div>
    )

    return (
        <div className={` md:grid grid-cols-2 gap-4 md:mb-7 container ${css.featured}`}>
            <div className={css.article}>
                <ArticleItem item={data.result.items[0]} showDesc={true} />
            </div>
            <div className={`${css.list}  ${darkMode ? 'bg-zinc-800' : ''}`}>
                <List articles={data.result.items.slice(0, 3)} />
            </div>

        </div>
    )
}
export default Featured;
