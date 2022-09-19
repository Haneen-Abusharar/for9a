import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../DarkModeContext';
import css from './learnHero.module.scss'

const SpecialitiesHero = () => {
    const { darkMode } = useContext(ThemeContext);;

    return (
        <div className={`${darkMode ? css.dark : ''} ${css.hero}`}>
            <div className='container'>
                <h1>دليل التخصصات الجامعية </h1>
                <h2 className='text-center'> دليل التخصصات الجامعية وتخصصات المستقبل</h2>
            </div>
        </div>
    )
}

export default SpecialitiesHero