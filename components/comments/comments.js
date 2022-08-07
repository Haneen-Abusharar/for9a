import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { ThemeContext } from '../../DarkModeContext';
import css from './comments.module.scss'

const Comments = () => {
    const { darkMode } = useContext(ThemeContext);
    const [showButtons, setShowButtons] = useState([]);


    const list = [{
        id: 1,
        user: {
            name: "khaled",
            image: "https://images.unsplash.com/photo-1552080084-f86b99bd1d29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        },
        date: 1658906164,
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        replies: [
            {
                id: 1,
                user: {
                    name: "Ahmad",
                    image: "https://images.unsplash.com/photo-1552080084-f86b99bd1d29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                },
                date: 1658906164,
                text: "Lorem Ipsum is si lllmply "
            }, {
                id: 2,
                user: {
                    name: "حنين",
                    image: "https://images.unsplash.com/photo-1552080084-f86b99bd1d29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                },
                date: 1658906164,
                text: " حرب المستضعفين: كيف خاض الشيشانيون حروبهم ضد روسيا؟"
            }
        ]
    }, {
        id: 2,
        user: {
            name: "haneen",
            image: "https://images.unsplash.com/photo-1552080084-f86b99bd1d29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

        },
        date: 1658906164,
        text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        replies: []
    }
        ,
    {
        id: 3,
        user: {
            name: "maram",
            image: "https://images.unsplash.com/photo-1552080084-f86b99bd1d29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

        },
        date: 1658906164,
        text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        replies: []
    }
    ];


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

    return (
        <div className={`${darkMode ? css.dark : ''} ${css.comments}`} >

            <div className={css.commentsTop}>


                <div className={css.commentsNum} >
                    <h4> التعليقات {list.length}</h4>
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
                    <input
                        onChange={() => {
                            show(0);
                        }}
                        name="comment"
                        placeholder='أضف تعليق' />
                    {showButtons[0] == 1 && <div className={css.publish} >

                        <button onClick={() => { hide(0) }} type='button'>اخفاء</button>
                        <button type='submit' >نشر</button>

                    </div>}
                </div>


            </div>
            {list.map((item, i) => (
                <div className={css.pastComments} key={i}>

                    <div className={css.pic}>
                        <Image src={item.user.image} height={50} width={50} alt="profilepic"/>
                    </div>

                    <div className={css.past}>
                        <h5>{item.user.name}</h5>
                        <h6>{convertTime(item.date)}</h6>
                        <p>{item.text}</p>
                        {item.replies.map((reply, x) => (

                            <div className={css.past} key={x}>
                                <div className={css.leftreply}>
                                    <div className={css.pic}>
                                        <Image src={reply.user.image} height={45} width={45} alt="profilepic" />

                                    </div>
                                    <div className={css.left}>
                                        <h5>{reply.user.name}</h5>
                                        <h6>{convertTime(reply.date)}</h6>
                                        <p> {reply.text}</p>
                                    </div>
                                </div>

                            </div>

                        ))}

                        <div className={css.replys}>

                            <div className={css.pic}>
                                <Image src={'/h.jpg'} height={50} width={50} />
                            </div>
                            <div className={css.publish} >
                                <input onChange={() => {
                                    show(i + 2);
                                }}
                                    name="reply"
                                    placeholder='أضف رد' />

                                {showButtons[i + 2] == 1 && <div className={css.replyPublish} >

                                    <button onClick={() => { hide(i + 2) }} type='button'>اخفاء</button>
                                    <button type='submit' >نشر</button>
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