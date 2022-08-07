import React,{useContext} from 'react'
import useSWR from 'swr';
import { ThemeContext } from '../../DarkModeContext';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ArticleItem from '../article/articleItem';
import List from '../article/list';
import css from './featured.module.scss'

const Featured = () => {
    const { darkMode } = useContext(ThemeContext);
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, loading, error } = useSWR("https://api.for9a.com/learn/all?id=938", fetcher);
    const { data:data2, loading:loading2, error:error2 } = useSWR("https://api.for9a.com/learn/all?&count=3", fetcher);

    const InlineWrapperWithMargin = ({ children }) => {
        return <span style={{ margin: '1rem' }}>{children}</span>
    }
    if (error || error2) return <div>failed to load</div>
    if (loading || loading2) return (<Skeleton

        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
        hight={200}
    />)
    if (!data || !data2) return (<Skeleton

        wrapper={InlineWrapperWithMargin}
        inline
        width={200}
        hight={400}
    />)


    return (
        <div className={` ${darkMode ? css.dark : ''} container ${css.featured}`}>
            <div className={css.article}><ArticleItem item={data.result.items[0]} showDesc={true} /></div>
            <div className={css.list}><List articles={data2.result.items} /></div>

        </div>
    )
}
export default Featured;
