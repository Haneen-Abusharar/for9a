import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link"
import axios from 'axios';
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeContext } from '../../DarkModeContext';
import css from './searchBox.module.scss';




const fetcher = (...args) => fetch(...args).then((res) => res.json());
const SearchBox = ({ }) => {
    const { darkMode } = useContext(ThemeContext);
    const { query } = useRouter();
    const [data, setData] = useState([])
    const [value, setValue] = useState(query.term)
    const { push } = useRouter();


    const handleChange = async (event) => {
        setValue(event.target.value);

    }
    const autoComplete = async (event) => {
        // event.preventDefault();
        const auto = await axios.get(`https://api.for9a.com/learn/all?term=${event.target.value}`).then(
            res => {
                {
                    console.log(event.target.value.length)
                    if (event.target.value.length === 0) {
                        setData();
                    }
                    else { setData(res.data.result.items) }
                }

            })
    }

    const submit = (e) => {
        e.preventDefault();
        push(`/learn/s/${e.target[0].value}`);
    }

    return (<div className={css.searchAndrec}>
        <form onSubmit={submit} onChange={handleChange} className={`${darkMode ? css.dark : ''} ${css.search}`} autoComplete="off" >
            <input type="text" placeholder="ابحث.." name="term"
                value={value || ''}
                onChange={(e) => { handleChange(e), autoComplete(e) }}
                autoComplete="off"

            />
        </form>

        <div className={css.show} >
            {data && data.map((item, index) => {
                // console.log(item)
                return (<div className={css.searchRes} key={index}>
                    <Link  href={`${item.url?.replace("https://www.for9a.com/", "http://localhost:3000/")}`}><a> {item.title}</a></Link>
                </div>)
            })}
        </div>

    </div>
    )
}
export default SearchBox;