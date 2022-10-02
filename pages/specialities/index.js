import Head from 'next/head'
import React from 'react'
import SpecialitiesFilter from '../../components/filters/specialities/specialitiesFilter'
import SpecialitiesHero from '../../components/hero/specialitiesHero'
import SpecialitiesCategoryList from '../../components/specialities/specialitiesCategoryList'


const Specialties = () => {
    return (<>
        <Head>
            <title>دليل التخصصات الجامعية | تخصصات المستقبل | افضل التخصصات الجامعية</title>
            <meta name="description" content="الموقع العربي الأول المختص في عرض المنح الدراسية وفرص التدريب
             والعمل والدراسة في الخارج يساعدك موقع فرصة على تحقيق شغفك 
            وطموحك من خلال توفير الفرص التعليمية والتدريبية المتميزة 
            والممولة والتي تتضمن الزمالات والتبادلات الثقافية وفرص التدريب العملي." />
            <meta content="ar" name="Lang" id="Lang" />
            <meta content="jo" name="country_meta" id="country_meta" />
            <meta property="og:title" content="دليل التخصصات الجامعية" />
            <meta property="og:locale" content="ar_SA" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="الموقع العربي الأول المختص في عرض المنح الدراسية وفرص التدريب
             والعمل والدراسة في الخارج يساعدك موقع فرصة على تحقيق شغفك 
            وطموحك من خلال توفير الفرص التعليمية والتدريبية المتميزة 
            والممولة والتي تتضمن الزمالات والتبادلات الثقافية وفرص التدريب العملي." />
            <meta property="og:image" content="https://staticfor9a.s3-eu-west-1.amazonaws.com/OG+all+specialties.jpg" />
        </Head>
        <SpecialitiesHero />
        <SpecialitiesFilter />
        <SpecialitiesCategoryList />
    </>
    )
}

export default Specialties