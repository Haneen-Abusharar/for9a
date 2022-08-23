import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { ThemeContext } from '../../DarkModeContext';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '../../utilities/fetcher';
import css from './comments.module.scss'

const Comments = ({ id }) => {
    const { darkMode } = useContext(ThemeContext);
    const [showButtons, setShowButtons] = useState([]);
    const { data, loading, error } = useSWR(`${process.env.api}/learn/comments?page=1&count=5&id=${id}`, fetcher);
    const [value, setValue] = useState()
   
    const setBody = async (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }
   
    const handleClick = async (value ,main_id) => {
       
        await axios.post(`${process.env.api}/learn/post-comment`, {
             id,body:value , main_id
            
        }, {
            headers:
                { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' }
        }).then(res => {
            console.log(res);
        })
            .catch(err => console.log(err))
    }

    const show = (i) => {

        let s = showButtons;
        s[i] = 1;
        setShowButtons([...showButtons, s])

    }

    const hide = (i) => {
        let s = showButtons;
        s[i] = 0;
        setShowButtons([...showButtons, s])
    }

    const convertTime = (time) => {
        const event = new Date(time);
        return event.toLocaleTimeString("en-US")
    }

    if (error) return <div>failed to load</div>
    if (loading) return <div>loading</div>
    if (!data) return <div>no data</div>

    return (
        <div className={`${darkMode ? css.dark : ''} ${css.comments}`} >

            <div className={css.commentsTop}>


                <div className={css.commentsNum} >
                    <h4> التعليقات {data.result.items.length}</h4>
                </div>
                <div className={css.filter}>
                    <h4>فرز حسب</h4>
                    <select>
                        <option>الأقدم</option>
                        <option>الأحدث</option>
                    </select>
                </div>
            </div>
            <div className={css.mainComments}>
                <div className={css.pic}>
                    <Image src="/h.jpg" height={50} width={50} alt="profilepic" />
                </div>
                <div className={css.input}>
                    <form onChange={setBody}>
                        <input type="text"
                          
                            onChange={(e) => {
                                show(0),
                                    setBody(e)
                            }}
                            name="comment"
                            placeholder='أضف تعليق' />
                    </form>
                    {showButtons[0] == 1 && <div className={css.publish} >

                        <button onClick={() => { hide(0) }} type='button'>اخفاء</button>
                        <button type='submit' onClick={() => handleClick(value)} >نشر</button>

                    </div>}
                </div>


            </div>
            {data.result.items.map((item, i) => (
                <div className={css.pastComments} key={i}>

                    <div className={css.pic}>
                        <Image src={item.user.images.md} height={50} width={50} alt="profilepic" className='object-cover rounded-full' />
                    </div>

                    <div className={css.past}>
                        <h5>{item.user.first_name}</h5>
                        <h6>{convertTime(item.created_at)}</h6>
                        <p>{item.body}</p>
                        {item.replies.map((reply, x) => (

                            <div className={css.past} key={x}>
                                <div className={css.leftreply}>
                                    <div className={css.pic}>
                                        <Image src={reply.user.images.md} height={45} width={45} alt="profilepic" className='object-cover' />

                                    </div>
                                    <div className={css.left}>
                                        <h5>{reply.user.first_name}</h5>
                                        <h6>{convertTime(reply.created_at)}</h6>
                                        <p> {reply.body}</p>
                                    </div>
                                </div>

                            </div>

                        ))}

                        <div className={css.replys}>

                            <div className={css.pic}>
                                <Image src={'/h.jpg'} height={50} width={50}  alt="profile pic"/>
                            </div>
                            <div className={css.publish} >
                                <form onChange={setBody}>
                                    <input 
                                    type="text"
                                    
                                    onChange={(e) => {
                                        show(i + 2),
                                        setBody(e)
                                    }}
                                        name="reply"
                                        placeholder='أضف رد' />
                                </form>
                                {showButtons[i + 2] == 1 && <div className={css.replyPublish} >

                                    <button onClick={() => { hide(i + 2) }} type='button'>اخفاء</button>
                                    <button type='submit' onClick={()=> handleClick(value, item.id)} >نشر</button>
                                </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>


            ))
            }
        </div >
    )
}


export default Comments