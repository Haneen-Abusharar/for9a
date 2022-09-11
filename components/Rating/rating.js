import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from '../../DarkModeContext';
import Image from "next/image"
import axios from "axios";
import css from "./rating.module.scss"

const StarRating = ({ item, id }) => {

    const { darkMode } = useContext(ThemeContext);
    const [active, setActive] = useState();

    const handleClick = async (r) => {
        await axios.post(`${process.env.api}/learn/add-rating`, {
            rate: r, id
        }, {
            headers:
                { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
        }).catch(err => console.log(err))
    }

    return (
        <div className={`${darkMode ? css.dark : ''} ${css.starRating}`}>
            <div className={css.width}>
                <h4 className="text-lg">كيف كان المقال  </h4>
                <div className={css.rating}>
                   
                        {
                            [1, 2, 3, 4, 5].map((e, i) => (
                    <div key={i} className={css.emojis} >
                        {item.rating.user.value == e &&
                                <div className={css.value} >
                                    <Image className="rounded-full w-full text-center" src={`/emojis/${e + "_active"}.svg`} alt="emojie" height={45} width={45} />
                                </div>
                        }
                        <div className={active !== i ? css.none : css.emo1} >
                            <Image className="rounded-full w-full text-center" src={`/emojis/${e + "_active"}.svg`} alt="emojie" height={45} width={45} />
                        </div>
                        <button className={active === i ? css.none : css.emo1}
                            onClick={() => { handleClick(e), setActive(i), item.rating.user.value = false }}>
                            <Image className="rounded-full w-full text-center" src={`/emojis/${e}.svg`} alt="emojie" height={45} width={45} />
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