import React,{useContext} from 'react'
import useSWR from 'swr';
import axios from 'axios';
import { ThemeContext } from '../../DarkModeContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ArticleItem from '../article/articleItem';
import List from '../article/list';
import fetcher from '../../fetcher/fetcher';
import css from './featured.module.scss'


const Featured = () => {
    
    const { darkMode } = useContext(ThemeContext);  
    const { data, loading, error } = useSWR("https://api.for9a.com/learn/all", fetcher);
    
    const InlineWrapperWithMargin = ({ children }) => {
        return <span style={{ margin: '1rem' }}>{children}</span>
    }
    if (error ) return <div>failed to load</div>
    if (loading ) return (<Skeleton

        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
        hight={200}
    />)
    if (!data ) return (<Skeleton

        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
        hight={400}
    />)
   
    return (
        <div className={` ${darkMode ? css.dark : ''} container ${css.featured}`}>
            <div className={css.article}><ArticleItem item={data.result.items[0]} showDesc={true} /></div>
            <div className={css.list}>
                <List articles={data.result.items.slice(0,3)} />
                {/* {[0,1,2].map(()=>(<ArticleItem item={data.result.items[1]} />))} */}
            </div>
        </div>
    )
}
export default Featured;
