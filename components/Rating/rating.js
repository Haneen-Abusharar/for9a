import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from '../../DarkModeContext';
import Image from "next/image"
import axios from "axios";
import css from "./rating.module.scss"

const StarRating = ({ item, id }) => {

    const { darkMode } = useContext(ThemeContext);
    const [active, setActive] = useState();

    const handleClick = async (r) => {
        await axios.post(`https://api.for9a.com/learn/add-rating`, {
            rate: r, id
        }, {
            headers:
                { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
        }).then(res => {
            console.log(r);
        })
            .catch(err => console.log(err))
    }

    return (
        <div className={`${darkMode ? css.dark : ''} ${css.starRating}`}>
            <div className={css.width}>
                <h4>كيف كان المقال  </h4>
                <div className={css.rating}>
                    {/* {console.log(item.rating.user.value)}
                    {console.log(item.rating.user.is_rated)} */}
                   
                        {
                            [1, 2, 3, 4, 5].map((e, i) => (
                    <div key={i} className={css.emojis} >
                        {item.rating.user.value == e &&
                                <div className={css.value} >
                                    <Image src={`/emojis/${e + "_active"}.svg`} height={45} width={45} />
                                </div>
                        }
                        <div className={active !== i ? css.none : css.emo1} >
                            <Image src={`/emojis/${e + "_active"}.svg`} height={45} width={45} />
                        </div>
                        <button className={active === i ? css.none : css.emo1}
                            onClick={() => { handleClick(e), setActive(i), item.rating.user.value = false }}>
                            <Image src={`/emojis/${e}.svg`} height={45} width={45} />
                        </button>
                    </div>
                    ))
                    }
                </div>
            </div>
        </div >
    );
};

export default StarRating;