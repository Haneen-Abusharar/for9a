import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form";
import { arrayToUrl } from '../../utilities/helper';
import Skeleton from 'react-loading-skeleton';

const SpecialitiesFilter = () => {
    const { query, push } = useRouter()
    const router = useRouter()
    const { register, handleSubmit, control } = useForm();
    const { isLoading, error, data } = useQuery(['repoData'], () =>
        axios.get(`${process.env.api}/speciality/list`).then(res => res.data))

    // useEffect(() => {
    //     if (router.isReady && query) onSubmit(query);
    // }, [query.type, router.isReady, router.asPath]);

    const onSubmit = (data) => {
        const urlData = {};
         
        if (data.skills && Array.isArray(data.skills)) urlData['skills'] = data.skills.map((skill) => skill.id)
        if (data.cost) urlData['cost'] = data.cost;
        if (data.type) urlData['type'] = data.type;
        if (data.market) urlData['market'] = data.market;
        if (data.term) urlData['term'] = data.term;
        // console.log(arrayToUrl(urlData))
         push(`/specialities/s?${arrayToUrl(urlData)}`)
    }

    if (error || isLoading || !data) return (<div className='container' ><Skeleton className='w-full h-20' /></div>)

    return (
        <>
            <form className='container border mb-16 shadow-md rounded-md bg-white flex flex-col md:flex-row justify-center items-end md:items-center'
                onSubmit={handleSubmit(onSubmit)}>
                <select
                    className='border-l appearance-none outline-0 text-base p-1 my-2 w-full md:w-36  rounded-md'
                    id='type'
                    type="text"
                    placeholder='فئة التخصص'
                    {...register("type")}
                >
                    <option label='فئة التخصص' />
                    {data.category.map((category) =>
                        <option
                            value={category.id}
                            label={category.name}
                            key={category.id} />
                    )}
                </select>
                <Controller
                    name={"skills"}
                    control={control}
                    render={({ field: { value, onChange } }) => {
                        return (
                            <Select
                                className='text-base border-l appearance-none w-full mr-5 my-2 md:w-36 rounded-md'
                                closeMenuOnSelect={false}
                                placeholder="المهارات"
                                isMulti
                                options={data.skills}
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id}
                                onChange={onChange}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'gray',
                                    },
                                })}
                            />
                        )
                    }}
                />

                <select
                    className='border-l appearance-none outline-0 text-base p-1 my-2 mr-5  w-full md:w-36 rounded-md'
                    id='cost'
                    type="text"
                    placeholder='تكاليف الدراسة'
                    {...register("cost")}
                >
                    <option label="تكاليف الدراسة" />
                    {data.cost.map((cost) =>
                        <option
                            value={cost.id}
                            label={cost.name}
                            key={cost.id} />
                    )}
                </select>
                <select
                    className='border-l appearance-none outline-0 text-base p-1 my-2 mr-5 w-full md:w-32 rounded-md'
                    id='need'
                    type="text"
                    placeholder='حاجة السوق'
                    {...register("market")}
                >
                    <option label="حاجة السوق" />
                    {data.market.map((market) =>
                        <option
                            value={market.id}
                            label={market.name}
                            key={market.id} />
                    )}
                </select>
                <input
                    className='border-l appearance-none outline-0 text-base w-full mr-5 md:w-44 p-2 pl-6 my-2 rounded-md'
                    id='term'
                    type="text"
                    autoComplete="off"
                    placeholder='البحث بواسطة كلمة'
                    {...register("term")}
                />
                <button type='submit' className='w-9 h-10 mr-5 mt-3 bg-[url("https://img.icons8.com/windows/32/000000/search--v1.png")] bg-no-repeat' />
            </form>

        </>
    )
}

export default SpecialitiesFilter