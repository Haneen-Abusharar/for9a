
import Head from "next/head";
import React, { useEffect, useState, createContext } from "react";
import useSWR from 'swr';
import Category from "../../components/category/category";
import LearnHero from "../../components/hero/learnHero";
import LearnFilter from "../../components/filters/learn/learnFilter";
import Featured from "../../components/featured";

export const ThemeContext = createContext(null);

const Learn = ({ }) => {
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    }

    return (
        <>
            <Head>
                <title>Learn</title>
                <meta name="description"
                    content="تحتوي بوابة تعلم على " />
            </Head>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>

                <LearnHero title={'اهلا'} text={`تحتوي بوابة تعلم على مجموعة مقالات تشكل حاجة أساسية لدى غالبية مستخدمي فرصة.
                إذ يحرص فريق العمل على جعل موقع فرصة منصة متكاملة توفر للمسخدمين
                فئات فرص مختلفة في جميع المجالات والمستويات التعليمية والجنسيات، وإيجاد ما يساعدهم في
                الحصول على هذه الفرص. ومن هنا جاءت فكرة بوابة تعلّم،
                التي ستكمل ما بني عليه موقع فرصة. سيجد القارئ مقالات وافية تجيب على جميع تساؤلاته فيما يتعلق بالدراسة في الخارج،
                المهارات اللازمة لتطوير الذات،`} />

                <LearnFilter />
                <Featured />
                <Category />

            </ThemeContext.Provider>

        </>
    )
}


export default Learn;