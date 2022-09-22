import React, { useRef } from 'react'
import axios from 'axios';
import css from './comments.module.scss'

const CommentReplyForm = ({ article_id, comment_id, setNewReply, showButtons, i, show, hide }) => {

    const replyRef = useRef();
    const handleReply = (value) => {
        console.log(value)
        setNewReply(current => [...current, { body:value, name: "haneen", image: '/h.jpg', created_at: Date.now() }])
        axios.post(`${process.env.api}/learn/post-comment`, { id: article_id, body:value, main_id: comment_id },
            { headers: { 'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou' } })
        replyRef.current.value = ""
    }

    return (
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
    )
}

export default CommentReplyForm