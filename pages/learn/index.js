import Head from "next/head";
import React, { useState, createContext } from "react";
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
                <title>تعلم</title>
                <meta name="description" content="تحتوي بوابة تعلم على مجموعة مقالات تشكل حاجة أساسية لدى غالبية مستخدمي فرصة. وإيجاد ما يساعدهم في فئات فرص مختلفة
                 في جميع المجالات والمستويات التعليمية والجنسيات،" />
                <meta property="og:title" content="تعلم" />
                <meta property="og:locale" content="ar_SA" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="تحتوي بوابة تعلم على مجموعة مقالات تشكل حاجة أساسية لدى غالبية مستخدمي فرصة. وإيجاد ما يساعدهم في فئات فرص مختلفة في جميع
                 المجالات والمستويات التعليمية والجنسيات،"/>
            </Head>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>

                <LearnHero />
                <LearnFilter />
                <Featured />
                <Category />

            </ThemeContext.Provider>

        </>
    )
}


export default Learn;