import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from '../../DarkModeContext';
import Image from "next/image"
import axios from "axios";
import css from "./rating.module.scss"

const StarRating = ({ id }) => {

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
                    {
                        [1, 2, 3, 4, 5].map((e, i) => (

                            <div key={i} className={css.emojis} 
                            //style={{ position: 'relative', width: '45px' }}
                            >
                                <div className={active !== i ? css.none : css.emo1 } 
                                //style={{ position: 'absolute', width: '45px', top: 0, left: 0 }}
                                >
                                    <Image src={`/emojis/${e + "_active"}.svg`} height={50} width={50} />
                                </div>
                                <button className={active === i ? css.none : css.emo1} onClick={() => { handleClick(i+1), setActive(i); }}
                                // style={{ position: 'absolute', width: '45px', top: 0, left: 0, padding: '0'}}
                                >
                                    <Image src={`/emojis/${e}.svg`} height={50} width={50} />
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