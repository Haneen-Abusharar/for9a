import React from 'react'
import CatogriesList from '../../categoriesList/categoriesList'
import SearchBox from '../../searchBox/searchBox'
import css from './learnFilter.module.scss';

const LearnFilter = () => {
    return (
        <div className={` container ${css.learnFilter}`}>
            <div className={css.list}> <CatogriesList /></div>
            <div className={css.searchbox}> <SearchBox /></div>
        </div>
    )
}

export default LearnFilter
