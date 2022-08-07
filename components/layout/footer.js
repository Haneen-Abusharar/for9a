import React, { useContext } from 'react'
import css from './footer.module.scss'
import { ThemeContext } from '../../DarkModeContext';

export default function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`${darkMode ? css.dark : ''} ${css.footer}`}>
      جميع الحقوق محفوظة © 2019
    </div>
  )
}


