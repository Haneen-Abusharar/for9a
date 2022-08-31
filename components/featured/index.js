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
        return <div style={{ display: 'flex', }}>
            <div
                style={{

                    lineHeight: 1,
                    padding: '2rem',
                    marginBottom: '0.5rem',
                    width: 200,
                    height: 500
                }}
            ></div>
            <div
                style={{

                    display: 'flex',
                    flexDirection: 'column',
                    lineHeight: 1,
                    padding: '2rem',
                    marginBottom: '0.5rem',

                }}
            >
                <div style={{
                    lineHeight: 1,
                    padding: '2rem',
                    marginBottom: '0.5rem',
                    width: 200,
                    height: 100
                }}>
                </div>
                <div style={{
                    lineHeight: 1,
                    padding: '2rem',
                    marginBottom: '0.5rem',
                    width: 200,
                    height: 100
                }}>
                </div>
                <div style={{
                    lineHeight: 1,
                    padding: '2rem',
                    marginBottom: '0.5rem',
                    width: 200,
                    height: 100
                }}>
                </div>
                
             
            </div>
        </div>
    }

    if (!data || loading || error) return (<Skeleton
        // count={4}
        wrapper={InlineWrapperWithMargin}
    
     width={600}
    
    />)


    return (
        <div className={` md:grid grid-cols-2 gap-4 md:mb-7 ${darkMode ? css.dark : ''} container ${css.featured}`}>
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
