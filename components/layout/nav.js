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
            <div className={`${darkMode ? css.dark : ''}  ${css.navbar} `} >
                <div className={`${css.navContent} container`}>
                    <div className={css.menu}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24">
                            <path fill="#000000" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,
                            2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,
                            14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,
                            8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                        </svg>
                        <div className={css.dropdown}  >
                            <Link href={`${process.env.domain}/learn`}><a>الرئيسية</a></Link>
                            <Link href={`${process.env.domain}/learn/favorite`}><a>مفضلاتي</a></Link>
                        </div>
                    </div>
                    <div className={css.logo}>
                        <Link href={`${process.env.domain}/learn`}>
                            <a><Image src={'https://www.for9a.com/images/logo.svg'} width={"80px"} height={"50px"} alt='logo' /></a>
                        </Link>

                    </div>
                    <div className={css.nightmode}>
                        <NightMode />
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Nav
