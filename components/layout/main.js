import { useContext } from 'react'
import { ThemeContext, ThemeProvider } from '../../DarkModeContext';
import Nav from './nav'
import Footer from './footer'
import css from './main.module.scss'

export default function Layout({ children }) {

  const { darkMode } = useContext(ThemeContext);

  return (

    <div className={`${darkMode ? 'dark' : ''} ${css.layout}`}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>


  )
}