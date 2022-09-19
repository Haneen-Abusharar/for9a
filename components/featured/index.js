import React, { useContext } from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ThemeContext } from '../../DarkModeContext';
import ArticleItem from '../article/articleItem';
import List from '../article/list';
import ArticleCardLoad from '../skeleton/articleCard';
import ListLoading from '../skeleton/listLoading';



const Featured = () => {

    const { darkMode } = useContext(ThemeContext);
    const { isLoading, error, data } = useQuery(['repoData'], () =>
        axios.get(`${process.env.api}/learn/all?&page=1&count=10`, {
            headers: {
                'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
            }
        }).then(res => res.data))
  
    if (!data || isLoading || error)
        return (
            <div className='container flex flex-col md:flex-row '>
                <div className='w-full mb-5 ml-5 h-full'><ArticleCardLoad /></div >
                <div className='w-full sm:mt-5 md:mt-0'><ListLoading /></div>
            </div>
        )

    return (
        <div className={`featured  flex flex-col md:grid grid-cols-2 md:gap-5 md:mb-7 container`}>
            <div className={'article '}>
                <ArticleItem item={data.result.items[0]} showDesc={true} />
            </div>
            <div className={`list ${darkMode ? 'bg-zinc-800' : ''}`}>
                <List articles={data.result.items.slice(0, 4)} />
            </div>

        </div>
    )
}
export default Featured;
