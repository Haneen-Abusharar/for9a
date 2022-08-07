import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeContext } from '../../DarkModeContext';
import css from './searchBox.module.scss';

const SearchBox = ({ }) => {
    const { darkMode } = useContext(ThemeContext);
    const { query } = useRouter();
    const [value, setValue] = useState(query.term)
    const { push } = useRouter();


    const handleChange = event => {
        setValue(event.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        push(`/learn/s/${e.target[0].value}`);


    }

    return (<>
        <form onSubmit={submit} className={`${darkMode ? css.dark : ''} ${css.search}`} >
            <input type="text" placeholder="ابحث.." name="term"
                value={value || ''} autoComplete="term"
                onChange={handleChange}

            />
            

        </form>
    </>
    )
}
export default SearchBox;