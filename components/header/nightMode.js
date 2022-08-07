import React, { useState } from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../DarkModeContext'
import css from './nightMode.module.scss'



const NightMode = ({setDarkMode}) => {
  const {darkMode , toggleDarkMode}= useContext(ThemeContext);

  const changeDarkMode= (e) =>{
    const darkmodeValue = e.target.checked 
    console.log(darkmodeValue)
    setDarkMode(darkmodeValue)
  }

const handlecLICK = () =>{
  toggleDarkMode(!darkMode);
 
}
  return (
   
    <div className={css.toggle}>
      <label>
        <input onChange={ handlecLICK } type='checkbox' />
        <span className={css.slider} />
      </label>
    </div>

  )
}

export default NightMode