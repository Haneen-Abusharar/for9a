import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from '../../DarkModeContext';
import Image from "next/image"
import axios from "axios";

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
        <div className={`Rating m-auto text-center`}>
            <div className={` ${darkMode ? "bg-slate-500" : 'bg-slate-200'} my-12 w-full rounded pt-2 pb-16`}>
                <h4 className="text-lg mb-5">كيف كان المقال  </h4>
                <div className={`rating flex flex-row-reverse justify-center items-start`}>
                        {
                            [1, 2, 3, 4, 5].map((e, i) => (
                    <div key={i} className={`emojis relative w-16`} >
                        {item.rating.user.value == e &&
                                <div className={`value w-16 z-5 absolute top-0 left-0 ease-in-out `} >
                                    <Image className="rounded-full w-full text-center" src={`/emojis/${e + "_active"}.svg`} alt="emojie" height={45} width={45} />
                                </div>
                        }
                        <div className={`${active !== i ?"opacity-0 absolute w-16 top-0 left-0" : "absolute w-16 top-0 left-0 ease-in-out"}`} >
                            <Image className="rounded-full w-full text-center" src={`/emojis/${e + "_active"}.svg`} alt="emojie" height={45} width={45} />
                        </div>
                        <button className={`${active === i ?"opacity-0 absolute w-16 top-0 left-0" : "absolute w-16 top-0 left-0 ease-in-out"} bg-transparent border-none outline-none grayscale cursor-pointer `}
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