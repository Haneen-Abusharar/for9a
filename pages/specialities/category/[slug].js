import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import CategorySpeciality from '../../../components/categorySpeciality/categorySpeciality'
import SpecialitiesFilter from '../../../components/filters/specialities/specialitiesFilter'
import SpecialitiesHero from '../../../components/hero/specialitiesHero'

function SpecialtiesCategoryPage({ category, specialities, preLoadImages, pages }) {

  return (
    <>
      <Head>
        <title>{category.title}</title>
        <meta property="og:title" content={category.title} />
        <meta name="description" content={category.description.replace(/[<-\w*|"|=|;|:|&|/>]/g, "")} />
        <meta property="og:url" content={category.url} />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={category.description.replace(/[<-\w*|"|=|;|:|&|/>]/g, "")} />
        {specialities.map((speciality, i) => <link key={i} rel="preload"
          href={`https://images.for9a.com/thumb/fit-600-400-80-webp/${speciality.images.folder}/${speciality.images.name}`}
          as="image"
          imageSrcSet={preLoadImages[i].toString()}
          media="(min-width: 800px)" />
        ).slice(0, 4)}
        {specialities.map((speciality, i) => <link key={i} rel="preload"
          href={`https://images.for9a.com/thumb/fit-600-400-80-webp/${speciality.images.folder}/${speciality.images.name}`}
          as="image"
          imageSrcSet={preLoadImages[i].toString()}
          media="(min-width: 200px)" />
        ).slice(0, 2)}
      </Head>
      <SpecialitiesHero />
      <SpecialitiesFilter />
      <CategorySpeciality
        category={category}
        filter={{ type: category.id }}
        specialities={specialities}
        pages={pages} />
    </>

  )
}
export async function getStaticPaths() {
  const categories = await axios.get(`https://api.for9a.com/speciality/list`)
  const paths = categories.data.category.map((categery) => ({
    params: { slug: categery.slug },

  }))
  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
  const categoryData = await axios.get(`${process.env.api}/speciality/list`)
  const category = await categoryData.data.category.find((item) => {
    if (item.slug == context.params.slug) {
      return item
    }
  })

  const specialitiesData = await axios.get(`${process.env.api}/speciality?count=12&page=1&type=${category.id}`)
  const ar = specialitiesData.data.result.items
  const pages = specialitiesData.data.result.total_pages;
  const widths = [390, 414, 640, 750, 828, 1200];
  let preLoadImages = [];
  ar.map((item, i) => {
    preLoadImages[i] = [widths.map((width) => {
      const height = Math.ceil(width / 2);
      return `https://images.for9a.com/thumb/fit-${width}-${height}-80-webp/${item.images.folder}/${item.images.name} ${width}w`
    })];
  })

  return {
    props: {
      category,
      specialities: ar,
      preLoadImages,
      pages
    },
    revalidate: 18000,
  }
}
export default SpecialtiesCategoryPage