import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form";
import Link from 'next/link';

const SpecialitiesFilter = () => {
    const { push } = useRouter();
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
    const { isLoading, error, data } = useQuery(['repoData'], () =>
        axios.get(`${process.env.api}/speciality/list`).then(res => res.data))

    if (error || isLoading || !data) return (<div >no data</div>)

    const onchange = (data) => {
        console.log(data);
        //
        axios.get(`${process.env.api}/speciality?count=12&page=1&type=${data.specialityCategory}&skills=${data.skills}&cost=${data.cost}&market=${data.need}&term=${data.search}`)
        // if (data.specialityCategory == "فئة التخصص")
        //     return
        // else
        //     push(`/specialities/category/${data.specialityCategory}`);
    }

    return (
        <form className='container mt-6 mb-16 flex justify-between'
            onClick={handleSubmit(onchange)}>
            {/* <Controller
                name="specialityCategory"
                control={control}
                register={register}
                render={() => (
                    <select name="specialityCategory"
                        className='border-2 outline-0 appearance-none text-base p-2 rounded-md'>
                        {data.category.map((category) => (
                            <option key={category.id}
                                value={category.id}
                                label={category.name} />
                        ))}
                    </select>
                )}

            /> */}
            <select
                className='border-2 outline-0 appearance-none text-base p-2 rounded-md'
                id='specialityCategory'
                type="text"
                placeholder='فئة التخصص'
                {...register("specialityCategory")}
            >
                <option value='فئة التخصص' label='فئة التخصص' />
                {data.category.map((category) =>
                    <option value={category.id} label={category.name}
                     key={category.id} />
                )}

            </select>
            {errors.func && <p style={{ color: 'red' }}> {errors.func.message}</p>}
            <select
                className='border-2 outline-0 appearance-none text-base p-2 rounded-md'
                id='skills'
                type="text"
                placeholder='المهارات'
                {...register("skills")}
            >
                <option value="" label="المهارات" />

            </select>
            <select
                className='border-2 outline-0 appearance-none text-base p-2 rounded-md'
                id='cost'
                type="text"
                placeholder='تكاليف الدراسة'
                {...register("cost")}
            >
                <option value="" label="تكاليف الدراسة" />

            </select>
            <select
                className='border-2 outline-0 appearance-none text-base p-2 rounded-md'
                id='need'
                type="text"
                placeholder='حاجة السوق'
                {...register("need")}
            >
                <option value="" label="حاجة السوق" />

            </select>
            <input
                className='border-2 outline-0 text-base p-2 pl-6 rounded-md bg-no-repeat
                bg-[url("https://img.icons8.com/windows/32/000000/search--v1.png")] bg-left'
                id='search'
                type="text"
                autoComplete="off"
                placeholder='البحث بواسطة كلمة دالة'
                {...register("search")}
            />
        </form>
    )
}

export default SpecialitiesFilter