import React, { useRef, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import css from './comments.module.scss'

const CommentReplyForm = ({ article_id, comment_id, showButtons, i, show, hide }) => {
    const [newReply, setNewReply] = useState([]);
    const replyRef = useRef();
    const handleReply = (value) => {
        setNewReply(current => [...current, { body: value, name: "haneen", image: '/h.jpg', created_at: Date.now() }])
        axios.post(`${process.env.api}/learn/post-comment`, { id: article_id, body: value, main_id: comment_id },
            { headers: { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' } })
        replyRef.current.value = ""
    }

    return (<>
        {newReply && newReply.map((rep, y) => (
            <div className={css.past} key={y}>
                <div className={css.leftreply}>
                    <div className={css.pic}>
                        <Image src={rep.image} height="50px" width="50px"
                            alt="profilepic" className='object-cover' />
                    </div>
                    <div className={css.left}>
                        <h5>{rep.name}</h5>
                        {/* <h6>{convertTime(rep.created_at)}</h6> */}
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
                <form onSubmit={(e) => (e.preventDefault(), handleReply(replyRef.current.value))}>
                    <input
                        ref={replyRef}
                        type="text"
                        name="reply"
                        placeholder='أضف رد'
                        onChange={() => show(i + 2)} />
                    {showButtons[i + 2] == 1 &&
                        <div className={css.replyPublish}>
                            <button onClick={() => { hide(i + 2) }} type='submit' aria-label="اخفاء">اخفاء</button>
                            <button type='submit' aria-label="نشر" >نشر</button>
                        </div>
                    }
                </form>
            </div>
        </div>
    </>
    )
}

export default CommentReplyForm