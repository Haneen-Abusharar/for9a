import { useContext } from 'react'
import { ThemeContext, ThemeProvider } from '../../DarkModeContext';
import Image from 'next/image';
import Nav from './nav'
import Footer from './footer'
import css from './main.module.scss'

export default function Layout({ children }) {

  const { darkMode } = useContext(ThemeContext);

  return (

    <div className={`${darkMode ? 'dark' : ''} ${css.layout}`}>
      <Nav />
      <div className={`ads bg-slate-200 w-full text-center mt-11`}>
        <Image src="/ads.PNG" alt="ads" className={`adpic !mt-1.5`} height="157" width="556" />
      </div>
      <main>{children}</main>
      <Footer />
    </div>


  )
}