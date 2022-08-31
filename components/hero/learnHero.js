import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../DarkModeContext';
import css from './learnHero.module.scss'

const LearnHero = () => {
    const { darkMode } = useContext(ThemeContext);
    const [show, setShow] = useState(false);

    return (
        <div className={`${darkMode ? css.dark : ''} ${css.hero}`}>
            <div className='container'>
                <h1 className=''>تعلم </h1>
                {/* <input type="checkbox" className={css.state} id="post-1" /> */}
                <p className={css.readMore}> تحتوي بوابة تعلم على مجموعة مقالات تشكل حاجة أساسية لدى غالبية مستخدمي فرصة.
                    وإيجاد ما يساعدهم في فئات فرص مختلفة في جميع المجالات والمستويات التعليمية والجنسيات،
                    إذ يحرص فريق العمل على جعل موقع فرصة منصة متكاملة توفر
                    <span className="target" style={{ display: !show ? "none" : "inline" }}>
                        للمسخدمين الحصول على هذه الفرص. ومن هنا جاءت فكرة بوابة تعلّم،
                        التي ستكمل ما بني عليه موقع فرصة. سيجد القارئ مقالات وافية تجيب على جميع تساؤلاته فيما يتعلق بالدراسة في الخارج،
                        المهارات اللازمة لتطوير الذات،
                    </span>
                    {!show && <button onClick={() => setShow(true)}>...اقرأ المزيد</button>}
                    {show && <button onClick={() => setShow(false)}>...اخفاء</button>}
                </p>
                {/* <label htmlFor="post-1" className={css.trigger}/> */}

            </div>
        </div>
    )
}

export default LearnHero
