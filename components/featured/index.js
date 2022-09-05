import React, { useContext } from 'react'
import useSWR from 'swr';
import { ThemeContext } from '../../DarkModeContext';
import ArticleItem from '../article/articleItem';
import List from '../article/list';
import fetcher from '../../utilities/fetcher';
import ArticleCardLoad from '../skeleton/articleCard';
import ListLoading from '../skeleton/listLoading';


const Featured = () => {

    const { darkMode } = useContext(ThemeContext);
    const { data, loading, error } = useSWR(`${process.env.api}/learn/all`, fetcher);

       if (!data || loading || error)
    return (
        <div className='container flex flex-col md:flex-row '>
            <div className='w-full mb-2 ml-2 h-full'><ArticleCardLoad /></div >
            <div className='w-full  '><ListLoading /></div>
        </div>
    )

    return (
        <div className={`featured flex flex-col md:grid grid-cols-2 gap-4 md:mb-7 container `}>
            <div className={'article'}>
                <ArticleItem item={data.result.items[0]} showDesc={true} />
            </div>
            <div className={`list ${darkMode ? 'bg-zinc-800' : ''}`}>
                <List articles={data.result.items.slice(0, 3)} />
            </div>

        </div>
    )
}
export default Featured;
