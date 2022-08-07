import React, { useContext } from 'react'
import { ThemeContext } from '../../DarkModeContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

import css from './learnHero.module.scss'
const LearnHero = ({ title, text, image }) => {
    const { darkMode } = useContext(ThemeContext);
    return (
        <div className={`${darkMode ? css.dark : ''} ${css.hero}`} style={{ backgroundImage: `${image ? image : 'none'}` }}>
            <div className='container'>
                <h1>{title || <Skeleton />}</h1>
                <p>{text || <Skeleton
                    count={5} />}</p>
            </div>
        </div>
    )
}

export default LearnHero
