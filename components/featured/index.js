import React, { useContext } from 'react'
import useSWR from 'swr';
import axios from 'axios';
import { ThemeContext } from '../../DarkModeContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ArticleItem from '../article/articleItem';
import List from '../article/list';
import fetcher from '../../utilities/fetcher';
import css from './featured.module.scss'


const Featured = () => {

    const { darkMode } = useContext(ThemeContext);
    const { data, loading, error } = useSWR(`${process.env.api}/learn/all`, fetcher);

    const InlineWrapperWithMargin = ({ children }) => {
        return <span style={{ margin: '1rem' }}>{children}</span>
    }
    if (error) return <div>failed to load</div>
    if (loading) return (<Skeleton

        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
        hight={200}
    />)
    if (!data) return (<Skeleton

        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
        hight={400}
    />)

    return (
        <div className={` md:grid grid-cols-2 gap-4 ${darkMode ? css.dark : ''} container ${css.featured}`}>
            <div className={css.article}>
                <ArticleItem item={data.result.items[0]} showDesc={true} />
            </div>
            <div className={`${css.list}`}>
                <List articles={data.result.items.slice(0, 3)} />
            </div>

        </div>
    )
}
export default Featured;
