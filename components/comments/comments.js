import React, { useState, useContext, useRef, createRef } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { ThemeContext } from '../../DarkModeContext';
import axios from 'axios';
import css from './comments.module.scss'
import CommentLoad from '../skeleton/commentLoad';
import CommentReplyForm from './commentReplyForm';


const Comments = ({ id }) => {
    const commentRef = useRef();
    const { darkMode } = useContext(ThemeContext);
    const [showButtons, setShowButtons] = useState([]);
    const [value, setValue] = useState('');
    const [newComment, setNewComment] = useState([]);

    const { isLoading, error, data } = useQuery(['id', id], () =>
        axios.get(`${process.env.api}/learn/comments?page=1&count=5&id=${id}`, {
            headers: {
                'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
            }
        }).then(res => res.data))

    const setBody = async (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const handleClick = (value) => {

        setNewComment(current => [...current, { body: value, name: "haneen", image: '/h.jpg', created_at: Date.now() }])
        axios.post(`${process.env.api}/learn/post-comment`, { id, body: value },
            { headers: { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' } }).then(
                () => {
                    return value
                })
        commentRef.current.value = ""
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
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleClick(value)
                    }}>
                        <input
                            ref={commentRef}
                            type="text"
                            onChange={(e) => { show(0), setBody(e) }}
                            name="comment"
                            placeholder='أضف تعليق' />

                        {showButtons[0] == 1 && <div className={css.publish} >
                            <button onClick={() => { hide(0) }} type='button'>اخفاء</button>
                            <button type='submit'>نشر</button>
                        </div>}
                    </form>
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
                            <Image src={item.user.images?.md} height="50px" width="50px"
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
                                        <Image src={reply.user.images?.md} height="50px" width="50px"
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
                        <CommentReplyForm
                            article_id={id}
                            comment_id={item.id}
                            showButtons={showButtons}
                            setShowButtons={setShowButtons}
                            show={show}
                            hide={hide}
                            value={value}
                            i={i} />
                    </div>
                </div>
            ))}
        </div >
    )
}

export default Comments