import React, { useContext } from 'react'
import { ThemeContext } from '../../DarkModeContext';
import Image from 'next/image'
import NightMode from '../header/nightMode'
import Link from 'next/link'
import css from './nav.module.scss'


const Nav = () => {
    const { darkMode } = useContext(ThemeContext);
    return (
        <header>
            <div className={`${darkMode ? css.dark : ''} container ${css.navbar}`} > 
                    <div className={css.menu}><h4>خيارات</h4>
                        <div className={css.dropdown}  >
                            <a href="#">الرئيسية</a>
                            <a href="#">مقالات</a>
                            <a href="#">من نحن</a>
                        </div>
                    </div>
                    <div className={css.logo}>
                        <Link href={"http://localhost:3000/learn"}><a><Image src={'https://www.for9a.com/images/logo.svg'} width={50} height={50} alt='logo' /></a></Link>
                    </div>
                    <div className={css.nightmode}>
                        <NightMode/>
                    </div>


                </div>
            
        </header >
    )
}

export default Nav
