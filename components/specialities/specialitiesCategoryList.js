import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Link from 'next/link';
import Specialities from './specialities';

const SpecialitiesCategoryList = () => {

    const { isLoading, error, data } = useQuery(['learn-category-home'], () =>
        axios.get(`${process.env.api}/speciality/list`).then(res => res.data))
    if (error || isLoading || !data)
        return (<div className='container'></div>)
    return (
        <div className='container'>
            {data.category.map((category, index) => (
                <div key={index}>
                    <Link href={{
                        pathname: '/specialities/category/[slug]',
                        query: { slug: category.slug },
                    }}
                    >
                        <a>
                            <h2>{category.name}</h2>
                        </a>
                    </Link>
                    <Specialities
                        filter={{ type: category.id }} />
                </div>
            ))}
        </div>
    )
}

export default SpecialitiesCategoryList