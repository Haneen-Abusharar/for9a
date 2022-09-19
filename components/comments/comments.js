import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { ThemeContext } from '../../DarkModeContext';
import axios from 'axios';
import css from './comments.module.scss'
import CommentLoad from '../skeleton/commentLoad';


const Comments = ({ id }) => {
    const { darkMode } = useContext(ThemeContext);
    const [showButtons, setShowButtons] = useState([]);
     const [value, setValue] = useState('');
    const [values, setValues] = useState([])
    const [newComment, setNewComment] = useState([]);
    const [newReply, setNewReply] = useState([]);

    const { isLoading, error, data } = useQuery(['id', id], () =>
        axios.get(`${process.env.api}/learn/comments?page=1&count=5&id=${id}`, {
            headers: {
                'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
            }
        }).then(res => res.data))


    const setBody = async (e) => {
        e.preventDefault()
         setValue(e.target.value)
        // setValues((value) =>
        //     value.map((val, ind) =>
        //         ind === i ? { ...val, value: e.target.value } : val
        //     ))
    }

    const handleClick = (value) => {
        setNewComment(current => [...current, { body: value, name: "haneen", image: '/h.jpg', created_at: Date.now() }])
        axios.post(`${process.env.api}/learn/post-comment`, { id, body: value },
            { headers: { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' } }).then(
                () => {
                    return value
                })

         setValue("")

    }
    const handleReply = (value, main_id) => {
        console.log(value)
        setNewReply(current => [...current, { body: value, name: "haneen", image: '/h.jpg', created_at: Date.now() }])
        axios.post(`${process.env.api}/learn/post-comment`, { id, body: value, main_id },
            { headers: { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' } }).then(
                () => {
                    return value
                })

         setValues("")
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

    if (!data || isLoading || error)
        return (
            <div className='container flex flex-col'>
                <CommentLoad />
                <CommentLoad />
                <CommentLoad />
            </div>
        )

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
                    <Image src="/h.jpg" height="50px" width="50px" alt="profilepic" />
                </div>
                <div className={css.input}>
                    <form onChange={setBody}>
                        <input type="text"
                            onChange={(e) => {
                                show(0),
                                    setBody(e)
                            }}
                            name="comment"
                            value={value}
                            placeholder='أضف تعليق' />
                    </form>
                    {showButtons[0] == 1 && <div className={css.publish} >
                        <button onClick={() => { hide(0) }} type='button'>اخفاء</button>
                        <button type='submit' onClick={() => handleClick(value)} >نشر</button>
                    </div>}
                </div>
            </div>
            {newComment && newComment.map((item, i) => (
                <div className={css.pastComments} key={i}>
                    <div className={css.pic}>
                        <Image src={item.image} height="50px" width="50px"
                            alt="profilepic" className='object-cover rounded-full' />
                    </div>
                    <div className={css.past}>
                        <h5>{item.name}</h5>
                        <h6>{convertTime(item.created_at)}</h6>
                        <p>{item.body}</p>

                    </div>
                </div>
            ))}

            {data.result.items.map((item, i) => (
                <div className={css.pastComments} key={i}>
                    <div className={css.pic}>
                        {item.user.images?.md &&
                            <Image src={item.user.images.md} height="50px" width="50px"
                                alt="profilepic" className='object-cover rounded-full' />}
                    </div>
                    <div className={css.past}>
                        <h5>{item.user.first_name}</h5>
                        <h6>{convertTime(item.created_at)}</h6>
                        <p>{item.body}</p>
                        {item.replies.map((reply, x) => (
                            <div className={css.past} key={x}>
                                <div className={css.leftreply}>
                                    <div className={css.pic}>
                                        <Image src={reply.user.images.md} height="50px" width="50px"
                                            alt="profilepic" className='object-cover' />
                                    </div>
                                    <div className={css.left}>
                                        <h5>{reply.user.first_name}</h5>
                                        <h6>{convertTime(reply.created_at)}</h6>
                                        <p> {reply.body}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                        {newReply && newReply.map((rep, y) => (
                            <div className={css.past} key={y}>
                                <div className={css.leftreply}>
                                    <div className={css.pic}>
                                        <Image src={rep.image} height="50px" width="50px"
                                            alt="profilepic" className='object-cover' />
                                    </div>
                                    <div className={css.left}>
                                        <h5>{rep.name}</h5>
                                        <h6>{convertTime(rep.created_at)}</h6>
                                        <p> {rep.body}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className={css.replys}>
                            <div className={css.pic}>
                                <Image src={'/h.jpg'} height="50px" width="50px" alt="profile pic" />
                            </div>
                            <div className={css.publish} >
                                <form >
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            show(i + 2),
                                                setBody(e,i)
                                        }}
                                        value={value}
                                        name="reply"
                                        placeholder='أضف رد' />
                                </form>
                                {showButtons[i + 2] == 1 && <div className={css.replyPublish} >
                                    <button onClick={() => { hide(i + 2) }} type='button' aria-label="اخفاء">اخفاء</button>
                                    <button type='submit' onClick={() =>{ handleReply(values[i], item.id)}} aria-label="نشر" >نشر</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default Comments