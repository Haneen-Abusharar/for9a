import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../DarkModeContext';
import css from './learnHero.module.scss'

const SpecialitiesHero = () => {
    const { darkMode } = useContext(ThemeContext);;

    return (
        <div className={`${darkMode ? css.dark : ''} ${css.hero} border-b-2 pb-16 -mb-7`}>
            <div className='container'>
                <h1>دليل التخصصات الجامعية </h1>
                <h2 className='text-center text-sm text-orange-500'> دليل التخصصات الجامعية وتخصصات المستقبل</h2>
            </div>
        </div>
    )
}

export default SpecialitiesHero