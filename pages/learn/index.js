import React from "react";
import Head from "next/head";
import Category from "../../components/category/category";
import LearnHero from "../../components/hero/learnHero";
import LearnFilter from "../../components/filters/learn/learnFilter";
import Featured from "../../components/featured";

const Learn = ({ }) => {
   
    return (
        <>
            <Head>
                <title>تعلم تطوير الذات وبناء القدرات</title>
                <meta name="description" content="الموقع العربي الأول المختص في عرض المنح الدراسية وفرص التدريب والعمل
                  والدراسة في الخارج يساعدك موقع فرصة على تحقيق شغفك وطموحك
                  من خلال توفير الفرص التعليمية والتدريبية المتميزة والممولة
                  والتي تتضمن الزمالات والتبادلات الثقافية وفرص التدريب العملي."/>
                <meta content="jo" name="country_meta" id="country_meta" />
                <meta content="ar" name="Lang" id="Lang" />
                <meta property="og:title" content="اكتشف التحدي القادم! | فرصة" />
                <meta property="og:description" content="الموقع العربي الأول المختص في عرض المنح الدراسية وفرص التدريب والعمل
                 والدراسة في الخارج يساعدك موقع فرصة على تحقيق شغفك وطموحك 
                من خلال توفير الفرص التعليمية والتدريبية المتميزة والممولة
                 والتي تتضمن الزمالات والتبادلات الثقافية وفرص التدريب العملي."/>
                <meta property="og:image" content="https://s3-eu-west-1.amazonaws.com/staticfor9a/ban3-06.jpg" />
            </Head>
                <LearnHero />
                <LearnFilter />
                <Featured />
                <Category />
        </>
    )
}


export default Learn;