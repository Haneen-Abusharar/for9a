import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link"
import axios from 'axios';
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeContext } from '../../DarkModeContext';
import css from './searchBox.module.scss';

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
      
        if (!event?.target?.value || event.target.value.length < 3 || event.target.value.trim() == ''){
            setData();
            return;
        }

        await axios.get(`${process.env.api}/learn/all?term=${event?.target?.value}`).then(
            res => {
                {
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

    return (<div className={`${darkMode ? css.dark : ''} ${css.searchAndrec} `}>
        <form onSubmit={submit} onChange={handleChange} className={` ${css.search}`} autoComplete="off" >
            <input type="text" placeholder="ابحث.." name="term" className='p-1'
                value={value || ''}
                onChange={(e) => { handleChange(e), autoComplete(e) }}
                autoComplete="off"

            />
        </form>

        <div className={css.show} >
            {data && data.map((item, index) => {
                return (<div className={css.searchRes} key={index}>
                    <Link href={`${item.url?.replace("https://www.for9a.com/", `${process.env.domain}/`)}`}><a> {item.title}</a></Link>
                </div>)
            })}
        </div>

    </div>
    )
}
export default SearchBox;