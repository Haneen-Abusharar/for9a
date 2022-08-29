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
                <title>Learn</title>
                <meta name="description"
                    content="تحتوي بوابة تعلم على " />
            </Head>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>

                <LearnHero  />

                <LearnFilter />
                <Featured />
                <Category />

            </ThemeContext.Provider>

        </>
    )
}


export default Learn;